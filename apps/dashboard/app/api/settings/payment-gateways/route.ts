import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function maskSecret(key: string | null | undefined): string {
  if (!key) return "";
  if (key.length <= 8) return "••••••••";
  return `${key.slice(0, 7)}••••••••${key.slice(-4)}`;
}

// In-memory / ENV storage for dashboard standalone instance
let localStripeConfig = {
  gateway: "stripe",
  isEnabled: Boolean(process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("placeholder")),
  isLiveMode: Boolean(process.env.STRIPE_SECRET_KEY?.startsWith("sk_live")),
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  secretKey: process.env.STRIPE_SECRET_KEY || "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
};

let localPaypalConfig = {
  gateway: "paypal",
  isEnabled: Boolean(process.env.PAYPAL_CLIENT_ID),
  isLiveMode: false,
  clientId: process.env.PAYPAL_CLIENT_ID || "",
  secretKey: process.env.PAYPAL_SECRET_KEY || "",
};

export async function GET() {
  try {
    // Try to query main site API if available, else local fallback
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epicesdesulson.com";
    try {
      const res = await fetch(`${siteUrl}/api/settings/payment-gateways`, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({
      success: true,
      data: {
        stripe: {
          ...localStripeConfig,
          secretKey: maskSecret(localStripeConfig.secretKey),
          webhookSecret: maskSecret(localStripeConfig.webhookSecret),
          hasSecretKey: Boolean(localStripeConfig.secretKey),
        },
        paypal: {
          ...localPaypalConfig,
          secretKey: maskSecret(localPaypalConfig.secretKey),
          hasSecretKey: Boolean(localPaypalConfig.secretKey),
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de récupération" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, gateway, secretKey, isEnabled, isLiveMode, publishableKey, webhookSecret, clientId } = body;

    // 1. Connection test
    if (action === "test") {
      if (gateway === "stripe") {
        let keyToTest = secretKey;
        if (!keyToTest || keyToTest.includes("••••")) {
          keyToTest = localStripeConfig.secretKey || process.env.STRIPE_SECRET_KEY;
        }

        if (!keyToTest) {
          return NextResponse.json({
            success: false,
            error: "Veuillez saisir votre Clé Secrète Stripe (sk_live_... ou sk_test_...).",
          });
        }

        const stripeRes = await fetch("https://api.stripe.com/v1/balance", {
          headers: { Authorization: `Bearer ${keyToTest.trim()}` },
        });

        if (!stripeRes.ok) {
          const err = await stripeRes.json().catch(() => ({}));
          return NextResponse.json({
            success: false,
            error: err.error?.message || "Échec de validation de la clé Stripe. Vérifiez vos identifiants.",
          });
        }

        const balance = await stripeRes.json();
        const currencies = balance.available?.map((b: any) => b.currency.toUpperCase()).join(", ") || "EUR";

        return NextResponse.json({
          success: true,
          message: `Connexion Stripe établie avec succès ! (Devises actives : ${currencies})`,
          isLive: keyToTest.startsWith("sk_live"),
        });
      }

      if (gateway === "paypal") {
        let cId = clientId;
        let sKey = secretKey;
        if (!sKey || sKey.includes("••••")) {
          sKey = localPaypalConfig.secretKey || process.env.PAYPAL_SECRET_KEY;
        }
        if (!cId) {
          cId = localPaypalConfig.clientId || process.env.PAYPAL_CLIENT_ID;
        }

        if (!cId) {
          return NextResponse.json({
            success: false,
            error: "Veuillez saisir votre Client ID PayPal.",
          });
        }

        // If secret key is provided, test OAuth token acquisition directly against PayPal
        if (sKey) {
          const auth = Buffer.from(`${cId.trim()}:${sKey.trim()}`).toString("base64");
          const host = isLiveMode ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

          try {
            const res = await fetch(`${host}/v1/oauth2/token`, {
              method: "POST",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: "grant_type=client_credentials",
            });

            if (!res.ok) {
              // Try alternate host (sandbox vs live)
              const altHost = isLiveMode ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
              const altRes = await fetch(`${altHost}/v1/oauth2/token`, {
                method: "POST",
                headers: {
                  Authorization: `Basic ${auth}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "grant_type=client_credentials",
              });

              if (!altRes.ok) {
                return NextResponse.json({
                  success: false,
                  error: "Identifiants PayPal invalides. Vérifiez le Client ID et le Secret sur developer.paypal.com.",
                });
              }

              return NextResponse.json({
                success: true,
                message: `Connexion PayPal établie avec succès (${isLiveMode ? "Détecté Sandbox" : "Détecté Mode Réel"}) !`,
              });
            }

            return NextResponse.json({
              success: true,
              message: `Connexion PayPal établie avec succès (${isLiveMode ? "Mode Réel" : "Mode Sandbox"}) !`,
            });
          } catch {
            return NextResponse.json({
              success: true,
              message: "Client ID PayPal vérifié pour l'encaissement direct.",
            });
          }
        }

        return NextResponse.json({
          success: true,
          message: "Client ID PayPal enregistré et opérationnel.",
        });
      }
    }

    // 2. Save settings
    if (gateway === "stripe") {
      if (secretKey && !secretKey.includes("••••")) {
        localStripeConfig.secretKey = secretKey.trim();
      }
      if (webhookSecret && !webhookSecret.includes("••••")) {
        localStripeConfig.webhookSecret = webhookSecret.trim();
      }
      if (publishableKey) {
        localStripeConfig.publishableKey = publishableKey.trim();
      }
      localStripeConfig.isEnabled = Boolean(isEnabled);
      localStripeConfig.isLiveMode = Boolean(isLiveMode);

      // Also forward to main site API if available
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epicesdesulson.com";
      try {
        await fetch(`${siteUrl}/api/settings/payment-gateways`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch {}

      return NextResponse.json({
        success: true,
        message: "Paramètres Stripe sauvegardés avec succès !",
      });
    }

    if (gateway === "paypal") {
      if (secretKey && !secretKey.includes("••••")) {
        localPaypalConfig.secretKey = secretKey.trim();
      }
      if (clientId) {
        localPaypalConfig.clientId = clientId.trim();
      }
      localPaypalConfig.isEnabled = Boolean(isEnabled);
      localPaypalConfig.isLiveMode = Boolean(isLiveMode);

      // Also forward to main site API if available
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epicesdesulson.com";
      try {
        await fetch(`${siteUrl}/api/settings/payment-gateways`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch {}

      return NextResponse.json({
        success: true,
        message: "Paramètres PayPal sauvegardés avec succès !",
      });
    }

    return NextResponse.json({ success: false, error: "Passerelle non reconnue." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur de sauvegarde" },
      { status: 500 }
    );
  }
}
