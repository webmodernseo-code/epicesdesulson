import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { getStripeServer } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, couponCode } = body;

    // 1. Validate Customer Information
    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Les informations de livraison sont requises." },
        { status: 400 }
      );
    }

    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      street = "",
      address2 = "",
      city = "",
      postalCode = "",
      country = "France",
    } = customer;

    if (!firstName.trim() || !lastName.trim()) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner votre prénom et votre nom." },
        { status: 400 }
      );
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Veuillez renseigner une adresse email valide." },
        { status: 400 }
      );
    }

    if (!street.trim() || !city.trim() || !postalCode.trim()) {
      return NextResponse.json(
        { success: false, error: "L'adresse, la ville et le code postal sont obligatoires." },
        { status: 400 }
      );
    }

    // 2. Validate Cart Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Votre panier est vide." },
        { status: 400 }
      );
    }

    // Map items to domain input
    const domainItems = items.map((it: any) => ({
      productId: String(it.productId || it.id || "101"),
      formatLabel: String(it.formatLabel || it.pack || "100g"),
      quantity: Math.max(1, Math.floor(Number(it.quantity) || 1)),
    }));

    const fullStreet = address2.trim() ? `${street.trim()}, ${address2.trim()}` : street.trim();
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // 3. Create order and recalculate authentic prices on server side
    const order = await OrdersService.createOrder({
      customerName: fullName,
      customerEmail: email.trim().toLowerCase(),
      customerPhone: phone.trim() || undefined,
      shippingStreet: fullStreet,
      shippingCity: city.trim(),
      shippingPostal: postalCode.trim(),
      shippingCountry: country || "France",
      couponCode: couponCode ? String(couponCode).trim() : undefined,
      items: domainItems,
    });

    // 4. Initialize Stripe & create PaymentIntent
    const { stripe, publishableKey } = await getStripeServer();

    if (!stripe) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La passerelle de paiement Stripe n'est pas encore configurée. Veuillez renseigner votre clé STRIPE_SECRET_KEY dans vos variables d'environnement.",
        },
        { status: 503 }
      );
    }

    // Amount in Euro cents (e.g. 23.50 € => 2350 cents)
    const amountInCents = Math.round(order.totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: order.customerEmail,
      description: `Commande ${order.orderNumber} - Les Épices de Sulson`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
      },
    });

    // Link PaymentIntent ID to order
    await OrdersService.updatePaymentIntent(order.id, paymentIntent.id);

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey: publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
      orderId: order.id,
      orderNumber: order.orderNumber,
      subtotal: order.subtotal,
      shippingCost: order.shippingCost,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
    });
  } catch (error: any) {
    console.error("Erreur create-intent Stripe:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Impossible d'initialiser le paiement sécurisé.",
      },
      { status: 500 }
    );
  }
}
