import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;
let lastKey: string | null = null;

export function getStripePromise(customPublishableKey?: string): Promise<Stripe | null> {
  const key = customPublishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  
  if (!key || key.includes("placeholder")) {
    return Promise.resolve(null);
  }

  if (!stripePromise || lastKey !== key) {
    stripePromise = loadStripe(key);
    lastKey = key;
  }

  return stripePromise;
}
