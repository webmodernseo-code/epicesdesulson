import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const masked = (value?: string | null) =>
  value ? `${value.slice(0, 7)}••••••••${value.slice(-4)}` : "";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const configs = await prisma.paymentGatewayConfig.findMany().catch(() => []);
    const stripe = configs.find((c) => c.gateway === "stripe");
    const paypal = configs.find((c) => c.gateway === "paypal");

    return NextResponse.json({
      success: true,
      data: {
        stripe: {
          gateway: "stripe",
          isEnabled: stripe ? stripe.isEnabled : true,
          isLiveMode: stripe ? stripe.isLiveMode : false,
          publishableKey: stripe?.stripePublishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
          secretKey: masked(stripe?.stripeSecretKey || process.env.STRIPE_SECRET_KEY),
          webhookSecret: masked(stripe?.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET),
          hasSecretKey: Boolean(stripe?.stripeSecretKey || process.env.STRIPE_SECRET_KEY),
        },
        paypal: {
          gateway: "paypal",
          isEnabled: paypal ? paypal.isEnabled : false,
          isLiveMode: paypal ? paypal.isLiveMode : false,
          clientId: paypal?.paypalClientId || process.env.PAYPAL_CLIENT_ID || "",
          secretKey: masked(paypal?.paypalSecretKey || process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET),
          hasSecretKey: Boolean(paypal?.paypalSecretKey || process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET),
        },
      },
    });
  } catch (err: any) {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const paypalSecret = process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET;
    return NextResponse.json({
      success: true,
      setupRequired: true,
      data: {
        stripe: {
          gateway: "stripe",
          isEnabled: true,
          isLiveMode: Boolean(stripeSecret?.startsWith("sk_live_")),
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
          secretKey: masked(stripeSecret),
          webhookSecret: masked(process.env.STRIPE_WEBHOOK_SECRET),
          hasSecretKey: Boolean(stripeSecret),
        },
        paypal: {
          gateway: "paypal",
          isEnabled: false,
          isLiveMode: false,
          clientId: process.env.PAYPAL_CLIENT_ID || "",
          secretKey: masked(paypalSecret),
          hasSecretKey: Boolean(paypalSecret),
        },
      },
    });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const gateway = body.gateway;

    if (!["stripe", "paypal"].includes(gateway)) {
      return NextResponse.json({ error: "Passerelle de paiement inconnue." }, { status: 400 });
    }

    const existing = await prisma.paymentGatewayConfig.findUnique({
      where: { gateway },
    }).catch(() => null);

    const keepMasked = (next: unknown, current?: string | null) =>
      typeof next === "string" && !next.includes("••••") ? next.trim() : current || null;

    // Action = Test Connection
    if (body.action === "test") {
      if (gateway === "stripe") {
        const key = keepMasked(body.secretKey, existing?.stripeSecretKey) || process.env.STRIPE_SECRET_KEY;
        if (!key) {
          return NextResponse.json({ success: false, error: "Veuillez renseigner votre clé secrète Stripe (sk_test_... ou sk_live_...)." }, { status: 400 });
        }
        const response = await fetch("https://api.stripe.com/v1/balance", {
          headers: { Authorization: `Bearer ${key}` },
        });
        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          return NextResponse.json({
            success: false,
            error: errJson.error?.message || "Clé secrète Stripe invalide.",
          }, { status: 400 });
        }
        return NextResponse.json({
          success: true,
          message: `Connexion Stripe validée (${key.startsWith("sk_live_") ? "Production" : "Mode Test"}).`,
        });
      }

      if (gateway === "paypal") {
        const clientId = keepMasked(body.clientId, existing?.paypalClientId) || process.env.PAYPAL_CLIENT_ID;
        const secret = keepMasked(body.secretKey, existing?.paypalSecretKey) || process.env.PAYPAL_SECRET_KEY;
        if (!clientId || !secret) {
          return NextResponse.json({ success: false, error: "Client ID et Secret PayPal requis pour le test." }, { status: 400 });
        }
        const host = body.isLiveMode ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
        const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
        const response = await fetch(`${host}/v1/oauth2/token`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });
        if (!response.ok) {
          return NextResponse.json({
            success: false,
            error: "Identifiants PayPal invalides pour cet environnement.",
          }, { status: 400 });
        }
        return NextResponse.json({
          success: true,
          message: `Connexion PayPal validée (${body.isLiveMode ? "Production" : "Sandbox"}).`,
        });
      }
    }

    // Action = Save
    if (gateway === "stripe") {
      const pubKey = body.publishableKey?.trim() || null;
      const secret = keepMasked(body.secretKey, existing?.stripeSecretKey);
      const webhook = keepMasked(body.webhookSecret, existing?.stripeWebhookSecret);
      const isLive = secret ? secret.startsWith("sk_live_") : Boolean(body.isLiveMode);

      await prisma.paymentGatewayConfig.upsert({
        where: { gateway },
        update: {
          isEnabled: Boolean(body.isEnabled),
          isLiveMode: isLive,
          stripePublishableKey: pubKey,
          stripeSecretKey: secret,
          stripeWebhookSecret: webhook,
        },
        create: {
          gateway,
          isEnabled: Boolean(body.isEnabled),
          isLiveMode: isLive,
          stripePublishableKey: pubKey,
          stripeSecretKey: secret,
          stripeWebhookSecret: webhook,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Configuration Stripe enregistrée avec succès !",
      });
    } else {
      const clientId = keepMasked(body.clientId, existing?.paypalClientId);
      const secret = keepMasked(body.secretKey, existing?.paypalSecretKey);

      await prisma.paymentGatewayConfig.upsert({
        where: { gateway },
        update: {
          isEnabled: Boolean(body.isEnabled),
          isLiveMode: Boolean(body.isLiveMode),
          paypalClientId: clientId,
          paypalSecretKey: secret,
        },
        create: {
          gateway,
          isEnabled: Boolean(body.isEnabled),
          isLiveMode: Boolean(body.isLiveMode),
          paypalClientId: clientId,
          paypalSecretKey: secret,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Configuration PayPal enregistrée avec succès !",
      });
    }
  } catch (error: any) {
    console.error("Erreur enregistrement payment-gateways:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'enregistrement de la passerelle." },
      { status: 500 }
    );
  }
}
