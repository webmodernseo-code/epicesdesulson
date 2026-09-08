import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { getStripeServer } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Header stripe-signature manquant." },
        { status: 400 }
      );
    }

    // Retrieve Webhook Secret from DB or ENV
    let webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;
    try {
      if (process.env.DATABASE_URL) {
        const dbConfig = await prisma.paymentGatewayConfig.findUnique({
          where: { gateway: "stripe" },
        });
        if (dbConfig?.stripeWebhookSecret) {
          webhookSecret = dbConfig.stripeWebhookSecret;
        }
      }
    } catch {
      // Fallback to env
    }

    if (!webhookSecret || webhookSecret.includes("placeholder")) {
      console.warn("Stripe Webhook Secret is not configured.");
      return NextResponse.json(
        { success: false, error: "STRIPE_WEBHOOK_SECRET non configuré." },
        { status: 503 }
      );
    }

    const { stripe } = await getStripeServer();
    let event: any;

    if (stripe) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret.trim());
      } catch (err: any) {
        console.error("Erreur validation signature Stripe Webhook:", err.message);
        return NextResponse.json(
          { error: `Webhook Signature Error: ${err.message}` },
          { status: 400 }
        );
      }
    } else {
      // JSON parse fallback if stripe instance not initialized
      event = JSON.parse(rawBody);
    }

    // Idempotent Event Handlers
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const orderRef =
          paymentIntent.metadata?.orderId ||
          paymentIntent.metadata?.orderNumber ||
          paymentIntent.id;

        if (orderRef) {
          await OrdersService.markOrderPaid(orderRef, paymentIntent.id);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const orderRef =
          paymentIntent.metadata?.orderId ||
          paymentIntent.metadata?.orderNumber ||
          paymentIntent.id;

        if (orderRef) {
          await OrdersService.markOrderFailed(orderRef);
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object;
        const orderRef =
          session.metadata?.orderId ||
          session.metadata?.orderNumber ||
          session.client_reference_id;

        if (orderRef) {
          await OrdersService.markOrderPaid(
            orderRef,
            session.payment_intent ? String(session.payment_intent) : session.id
          );
        }
        break;
      }

      default:
        // Other events received and acknowledged
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Erreur serveur Webhook Stripe:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message || "Erreur interne"}` },
      { status: 400 }
    );
  }
}
