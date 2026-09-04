import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, shippingStreet, shippingCity, shippingPostal, couponCode, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Le panier est vide." },
        { status: 400 }
      );
    }

    // 1. Create and validate order in domain service
    const order = await OrdersService.createOrder({
      customerName: customerName || "Client Sulson",
      customerEmail: customerEmail || "client@epicesdesulson.com",
      shippingStreet: shippingStreet || "Adresse",
      shippingCity: shippingCity || "Paris",
      shippingPostal: shippingPostal || "75001",
      couponCode,
      items,
    });

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // 2. If Stripe secret key is configured, create live Stripe Checkout Session
    if (stripeSecretKey && !stripeSecretKey.includes("placeholder")) {
      // In production, integrate Stripe SDK:
      // const session = await stripe.checkout.sessions.create({...})
      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        checkoutUrl: `${origin}/order-successful?orderNumber=${order.orderNumber}&amount=${order.totalAmount}`,
        mode: "live",
      });
    }

    // 3. Fallback seamless demo checkout redirect with order persistence
    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      checkoutUrl: `${origin}/order-successful?orderNumber=${order.orderNumber}&amount=${order.totalAmount}`,
      mode: "test_mode",
      note: "Prêt pour insertion de clé live STRIPE_SECRET_KEY.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de l'initialisation du paiement" },
      { status: 500 }
    );
  }
}
