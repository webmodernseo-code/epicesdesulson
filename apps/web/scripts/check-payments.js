const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  const result = {
    database: false,
    stripe: { configured: false, enabledInDb: null, credentialsValid: false },
    paypal: { configured: false, enabledInDb: null, credentialsValid: false },
  };
  try {
    let configs = [];
    try {
      await prisma.$queryRawUnsafe("SELECT 1");
      result.database = true;
      configs = await prisma.paymentGatewayConfig.findMany();
    } catch (error) {
      result.databaseError = error?.code || error?.name || "DatabaseError";
    }
    const stripe = configs.find((item) => item.gateway === "stripe");
    const paypal = configs.find((item) => item.gateway === "paypal");

    const stripeKey = (stripe?.isEnabled && stripe.stripeSecretKey) || process.env.STRIPE_SECRET_KEY;
    result.stripe.configured = Boolean(stripeKey && !stripeKey.includes("placeholder"));
    result.stripe.enabledInDb = stripe?.isEnabled ?? null;
    if (result.stripe.configured) {
      const response = await fetch("https://api.stripe.com/v1/balance", {
        headers: { Authorization: `Bearer ${stripeKey.trim()}` },
      });
      result.stripe.credentialsValid = response.ok;
    }

    const paypalId = (paypal?.isEnabled && paypal.paypalClientId) || process.env.PAYPAL_CLIENT_ID;
    const paypalSecret = (paypal?.isEnabled && paypal.paypalSecretKey) || process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET;
    result.paypal.configured = Boolean(paypalId && paypalSecret);
    result.paypal.enabledInDb = paypal?.isEnabled ?? null;
    if (result.paypal.configured) {
      const host = paypal?.isLiveMode ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
      const credentials = Buffer.from(`${paypalId.trim()}:${paypalSecret.trim()}`).toString("base64");
      const response = await fetch(`${host}/v1/oauth2/token`, {
        method: "POST",
        headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: "grant_type=client_credentials",
      });
      result.paypal.credentialsValid = response.ok;
    }
  } catch (error) {
    result.error = error instanceof Error ? error.name : "UnknownError";
  } finally {
    await prisma.$disconnect();
  }
  console.log(JSON.stringify(result, null, 2));
  if (!result.database || !result.stripe.credentialsValid || !result.paypal.credentialsValid) process.exitCode = 1;
}

main();
