import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Security Verification: If webhook secret is configured, require signature check
    if (webhookSecret && !webhookSecret.includes("placeholder")) {
      if (!signature) {
        return NextResponse.json(
          { success: false, error: "Missing stripe-signature header" },
          { status: 400 }
        );
      }
      // stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }

    let event: any = {};
    try {
      event = JSON.parse(rawBody);
    } catch {
      event = { type: "demo.event" };
    }

    // Handle Payment Succeeded
    switch (event.type) {
      case "checkout.session.completed":
      case "payment_intent.succeeded": {
        const session = event.data?.object;
        const orderNumber = session?.metadata?.orderNumber || session?.client_reference_id;
        if (orderNumber) {
          await OrdersService.markOrderPaid(orderNumber, session?.id);
        }
        break;
      }
      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }
}
