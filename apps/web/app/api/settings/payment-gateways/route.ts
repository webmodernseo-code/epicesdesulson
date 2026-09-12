import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isSuperAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Helper to mask secret keys
function maskSecret(key: string | null | undefined): string {
  if (!key) return "";
  if (key.length <= 8) return "••••••••";
  return `${key.slice(0, 7)}••••••••${key.slice(-4)}`;
}

// GET /api/settings/payment-gateways
export async function GET(req: NextRequest) {
  if (!(await isSuperAdmin(req))) return NextResponse.json({ success: false, error: "Accès réservé au super administrateur." }, { status: 403 });
  try {
    let stripeConfig = null;
    let paypalConfig = null;

    try {
      const configs = await prisma.paymentGatewayConfig.findMany();
      stripeConfig = configs.find((c) => c.gateway === "stripe") || null;
      paypalConfig = configs.find((c) => c.gateway === "paypal") || null;
    } catch {
      // Table might not exist yet before db push, fallback to env
    }

    // Default or fallback to process.env if not set in DB
    const stripeResponse = {
      gateway: "stripe",
      isEnabled: stripeConfig?.isEnabled ?? Boolean(process.env.STRIPE_SECRET_KEY),
      isLiveMode: stripeConfig?.isLiveMode ?? (process.env.STRIPE_SECRET_KEY?.startsWith("sk_live") ?? false),
      publishableKey: stripeConfig?.stripePublishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
      secretKey: maskSecret(stripeConfig?.stripeSecretKey || process.env.STRIPE_SECRET_KEY),
      webhookSecret: maskSecret(stripeConfig?.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET),
      hasSecretKey: Boolean(stripeConfig?.stripeSecretKey || process.env.STRIPE_SECRET_KEY),
    };

    const paypalResponse = {
      gateway: "paypal",
      isEnabled: paypalConfig?.isEnabled ?? Boolean(process.env.PAYPAL_CLIENT_ID),
      isLiveMode: paypalConfig?.isLiveMode ?? false,
      clientId: paypalConfig?.paypalClientId || process.env.PAYPAL_CLIENT_ID || "",
      secretKey: maskSecret(paypalConfig?.paypalSecretKey || process.env.PAYPAL_SECRET_KEY),
      hasSecretKey: Boolean(paypalConfig?.paypalSecretKey || process.env.PAYPAL_SECRET_KEY),
    };

    return NextResponse.json({
      success: true,
      data: {
        stripe: stripeResponse,
        paypal: paypalResponse,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de la récupération des passerelles" },
      { status: 500 }
    );
  }
}

// POST /api/settings/payment-gateways
export async function POST(req: NextRequest) {
  if (!(await isSuperAdmin(req))) return NextResponse.json({ success: false, error: "Accès réservé au super administrateur." }, { status: 403 });
  try {
    const body = await req.json();
    const { action, gateway, isEnabled, isLiveMode, publishableKey, secretKey, webhookSecret, clientId } = body;

    // 1. If testing connection
    if (action === "test") {
      if (gateway === "stripe") {
        let keyToTest = secretKey;
        // If key is masked or empty, get from DB or ENV
        if (!keyToTest || keyToTest.includes("••••")) {
          const dbConfig = await prisma.paymentGatewayConfig.findUnique({ where: { gateway: "stripe" } }).catch(() => null);
          keyToTest = dbConfig?.stripeSecretKey || process.env.STRIPE_SECRET_KEY;
        }

        if (!keyToTest) {
          return NextResponse.json({
            success: false,
            error: "Veuillez d'abord renseigner votre Clé Secrète Stripe (sk_live_... ou sk_test_...).",
          });
        }

        // Test Stripe connection via direct REST call
        const stripeRes = await fetch("https://api.stripe.com/v1/balance", {
          headers: {
            Authorization: `Bearer ${keyToTest.trim()}`,
          },
        });

        if (!stripeRes.ok) {
          const errData = await stripeRes.json().catch(() => ({}));
          return NextResponse.json({
            success: false,
            error: errData.error?.message || "Échec de validation de la clé Stripe. Vérifiez vos identifiants.",
          });
        }

        const balanceData = await stripeRes.json();
        const availableCurrencies = balanceData.available?.map((b: any) => b.currency.toUpperCase()).join(", ") || "EUR";

        return NextResponse.json({
          success: true,
          message: `Connexion Stripe établie avec succès ! (Devises actives : ${availableCurrencies})`,
          isLive: keyToTest.startsWith("sk_live"),
        });
      }

      if (gateway === "paypal") {
        return NextResponse.json({
          success: true,
          message: "Paramètres PayPal enregistrés.",
        });
      }
    }

    // 2. Save Gateway Settings
    if (gateway === "stripe") {
      const existing = await prisma.paymentGatewayConfig.findUnique({ where: { gateway: "stripe" } }).catch(() => null);

      // Only overwrite secret if a new unmasked value is provided
      let finalSecret = existing?.stripeSecretKey || null;
      if (secretKey && !secretKey.includes("••••")) {
        finalSecret = secretKey.trim();
      }

      let finalWebhook = existing?.stripeWebhookSecret || null;
      if (webhookSecret && !webhookSecret.includes("••••")) {
        finalWebhook = webhookSecret.trim();
      }

      await prisma.paymentGatewayConfig.upsert({
        where: { gateway: "stripe" },
        update: {
          isEnabled: Boolean(isEnabled),
          isLiveMode: Boolean(isLiveMode),
          stripePublishableKey: publishableKey ? publishableKey.trim() : existing?.stripePublishableKey,
          stripeSecretKey: finalSecret,
          stripeWebhookSecret: finalWebhook,
        },
        create: {
          gateway: "stripe",
          isEnabled: Boolean(isEnabled),
          isLiveMode: Boolean(isLiveMode),
          stripePublishableKey: publishableKey ? publishableKey.trim() : null,
          stripeSecretKey: finalSecret,
          stripeWebhookSecret: finalWebhook,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Configuration Stripe enregistrée avec succès !",
      });
    }

    if (gateway === "paypal") {
      const existing = await prisma.paymentGatewayConfig.findUnique({ where: { gateway: "paypal" } }).catch(() => null);

      let finalSecret = existing?.paypalSecretKey || null;
      if (secretKey && !secretKey.includes("••••")) {
        finalSecret = secretKey.trim();
      }

      await prisma.paymentGatewayConfig.upsert({
        where: { gateway: "paypal" },
        update: {
          isEnabled: Boolean(isEnabled),
          isLiveMode: Boolean(isLiveMode),
          paypalClientId: clientId ? clientId.trim() : existing?.paypalClientId,
          paypalSecretKey: finalSecret,
        },
        create: {
          gateway: "paypal",
          isEnabled: Boolean(isEnabled),
          isLiveMode: Boolean(isLiveMode),
          paypalClientId: clientId ? clientId.trim() : null,
          paypalSecretKey: finalSecret,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Configuration PayPal enregistrée avec succès !",
      });
    }

    return NextResponse.json({ success: false, error: "Passerelle non reconnue." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }
}
