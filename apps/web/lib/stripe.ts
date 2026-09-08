import Stripe from "stripe";
import { prisma } from "./prisma";

let cachedStripe: Stripe | null = null;
let lastApiKey: string | null = null;

export async function getStripeServer(): Promise<{ stripe: Stripe | null; publishableKey: string | null }> {
  let secretKey = process.env.STRIPE_SECRET_KEY || null;
  let publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;

  try {
    if (process.env.DATABASE_URL) {
      const dbConfig = await prisma.paymentGatewayConfig.findUnique({
        where: { gateway: "stripe" },
      });
      if (dbConfig?.isEnabled && dbConfig.stripeSecretKey) {
        secretKey = dbConfig.stripeSecretKey;
        if (dbConfig.stripePublishableKey) {
          publishableKey = dbConfig.stripePublishableKey;
        }
      }
    }
  } catch (err) {
    // Fallback to env variables if DB query fails
  }

  if (!secretKey || secretKey.includes("placeholder")) {
    return { stripe: null, publishableKey };
  }

  if (!cachedStripe || lastApiKey !== secretKey) {
    cachedStripe = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia" as any,
      typescript: true,
    });
    lastApiKey = secretKey;
  }

  return { stripe: cachedStripe, publishableKey };
}
