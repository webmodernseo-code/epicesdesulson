import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      shippingStreet,
      shippingCity,
      shippingPostal,
      couponCode,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Le panier est vide." },
        { status: 400 }
      );
    }

    // 1. Create and validate order in database / domain service
    const order = await OrdersService.createOrder({
      customerName: customerName || "Client Sulson",
      customerEmail: customerEmail || "client@epicesdesulson.com",
      shippingStreet: shippingStreet || "Adresse",
      shippingCity: shippingCity || "Paris",
      shippingPostal: shippingPostal || "75001",
      couponCode,
      items,
    });

    const origin = req.headers.get("origin") || "https://epicesdesulson.com";

    // 2. Retrieve dynamic Stripe Gateway Config from DB or ENV
    let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    try {
      const dbConfig = await prisma.paymentGatewayConfig.findUnique({
        where: { gateway: "stripe" },
      });
      if (dbConfig?.isEnabled && dbConfig.stripeSecretKey) {
        stripeSecretKey = dbConfig.stripeSecretKey;
      }
    } catch {
      // If table not yet present, fallback to env
    }

    // 3. If valid Stripe Secret Key is present, generate real Stripe Checkout Session
    if (
      stripeSecretKey &&
      !stripeSecretKey.includes("placeholder") &&
      (stripeSecretKey.startsWith("sk_live") || stripeSecretKey.startsWith("sk_test"))
    ) {
      try {
        // Build URL-encoded parameters for direct Stripe API request
        const stripeParams = new URLSearchParams();
        stripeParams.append("payment_method_types[0]", "card");
        stripeParams.append("mode", "payment");
        stripeParams.append("customer_email", customerEmail || "client@epicesdesulson.com");
        stripeParams.append(
          "success_url",
          `${origin}/order-successful?orderNumber=${order.orderNumber}&session_id={CHECKOUT_SESSION_ID}`
        );
        stripeParams.append("cancel_url", `${origin}/cart-single-vendor?canceled=true`);
        stripeParams.append("client_reference_id", order.id);
        stripeParams.append("metadata[orderNumber]", order.orderNumber);
        stripeParams.append("metadata[orderId]", order.id);

        // Add line items
        items.forEach((item: any, idx: number) => {
          const unitPriceCents = Math.round(
            (parseFloat(item.currentPrice.replace("€", "").replace(",", ".").trim()) || 6.9) * 100
          );
          stripeParams.append(`line_items[${idx}][price_data][currency]`, "eur");
          stripeParams.append(
            `line_items[${idx}][price_data][product_data][name]`,
            `${item.title} (${item.pack || "100g"})`
          );
          stripeParams.append(
            `line_items[${idx}][price_data][product_data][description]`,
            "Les Épices de Sulson — 100% Naturel"
          );
          stripeParams.append(
            `line_items[${idx}][price_data][unit_amount]`,
            unitPriceCents.toString()
          );
          stripeParams.append(
            `line_items[${idx}][quantity]`,
            (item.quantity || 1).toString()
          );
        });

        // Call Stripe REST API directly
        const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stripeSecretKey.trim()}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: stripeParams.toString(),
        });

        if (stripeRes.ok) {
          const session = await stripeRes.json();
          return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber,
            checkoutUrl: session.url,
            sessionId: session.id,
            mode: "stripe_live",
          });
        } else {
          const errData = await stripeRes.json().catch(() => ({}));
          console.error("Stripe Session Creation Error:", errData);
        }
      } catch (stripeErr) {
        console.error("Stripe Checkout Error:", stripeErr);
      }
    }

    // 4. Fallback demo checkout confirmation
    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      checkoutUrl: `${origin}/order-successful?orderNumber=${order.orderNumber}&amount=${order.totalAmount}`,
      mode: "test_mode",
      note: "Commande enregistrée avec succès.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erreur lors de l'initialisation du paiement",
      },
      { status: 500 }
    );
  }
}
