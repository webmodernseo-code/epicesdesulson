import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isValidStripeKey(key: string | null | undefined): boolean {
  if (!key) return false;
  const clean = key.trim();
  if (clean.includes("placeholder") || clean.includes("sample") || clean.length < 20) {
    return false;
  }
  return clean.startsWith("sk_test_") || clean.startsWith("sk_live_") || clean.startsWith("rk_test_") || clean.startsWith("rk_live_");
}

function isValidPaypalKey(clientId: string | null | undefined, secretKey: string | null | undefined): boolean {
  if (!clientId || !secretKey) return false;
  const c = clientId.trim();
  const s = secretKey.trim();
  if (c.includes("placeholder") || c.includes("sample") || c.length < 15) return false;
  if (s.includes("placeholder") || s.includes("sample") || s.length < 15) return false;
  return true;
}

export async function GET() {
  try {
    let stripeSecret = process.env.STRIPE_SECRET_KEY || null;
    let stripePublishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;
    let stripeLive = false;
    let stripeEnabled = true;

    let paypalClientId = process.env.PAYPAL_CLIENT_ID || null;
    let paypalSecret = process.env.PAYPAL_SECRET_KEY || null;
    let paypalLive = false;
    let paypalEnabled = true;

    try {
      if (process.env.DATABASE_URL) {
        const configs = await prisma.paymentGatewayConfig.findMany();
        const stripeDb = configs.find((c) => c.gateway === "stripe");
        const paypalDb = configs.find((c) => c.gateway === "paypal");

        if (stripeDb) {
          if (stripeDb.stripeSecretKey) stripeSecret = stripeDb.stripeSecretKey;
          if (stripeDb.stripePublishableKey) stripePublishable = stripeDb.stripePublishableKey;
          stripeLive = Boolean(stripeDb.isLiveMode);
          stripeEnabled = Boolean(stripeDb.isEnabled);
        }

        if (paypalDb) {
          if (paypalDb.paypalClientId) paypalClientId = paypalDb.paypalClientId;
          if (paypalDb.paypalSecretKey) paypalSecret = paypalDb.paypalSecretKey;
          paypalLive = Boolean(paypalDb.isLiveMode);
          paypalEnabled = Boolean(paypalDb.isEnabled);
        }
      }
    } catch {
      // Fallback
    }

    const stripeReady = stripeEnabled && isValidStripeKey(stripeSecret);
    const paypalReady = paypalEnabled && isValidPaypalKey(paypalClientId, paypalSecret);

    return NextResponse.json({
      success: true,
      data: {
        stripe: {
          isReady: stripeReady,
          isLive: stripeLive,
          mode: stripeLive ? "live" : "test",
          hasPublishableKey: Boolean(stripePublishable && !stripePublishable.includes("placeholder")),
        },
        paypal: {
          isReady: paypalReady,
          isLive: paypalLive,
          mode: paypalLive ? "live" : "sandbox",
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      data: {
        stripe: { isReady: false, isLive: false, mode: "test" },
        paypal: { isReady: false, isLive: false, mode: "sandbox" },
      },
    });
  }
}
