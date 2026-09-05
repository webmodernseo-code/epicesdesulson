import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";

function validStripeSignature(body: string, header: string, secret: string): boolean {
  const fields = header.split(",").map((part) => part.split("="));
  const timestamp = fields.find(([key]) => key === "t")?.[1];
  const signatures = fields.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0 || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return signatures.some((signature) => {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature || "");
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    const dbConfig = await prisma.paymentGatewayConfig.findUnique({ where: { gateway: "stripe" } }).catch(() => null);
    const webhookSecret = dbConfig?.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
    if (!signature || !webhookSecret || webhookSecret.includes("placeholder")) {
      return NextResponse.json({ success: false, error: "Webhook Stripe non configuré." }, { status: 503 });
    }
    if (!validStripeSignature(rawBody, signature, webhookSecret.trim())) {
      return NextResponse.json({ success: false, error: "Signature Stripe invalide." }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
      const object = event.data?.object;
      const orderReference = object?.metadata?.orderId || object?.metadata?.orderNumber || object?.client_reference_id;
      if (orderReference) await OrdersService.markOrderPaid(orderReference, object?.payment_intent || object?.id);
    }
    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Requête invalide";
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }
}
