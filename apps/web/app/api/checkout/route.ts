import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendAdminNewOrderAlertEmail } from "@/lib/email";
import { getStripeServer } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingStreet,
      shippingCity,
      shippingPostal,
      shippingCountry,
      couponCode,
      items,
      paymentMethod = "stripe",
      cardLast4,
      cardBrand,
    } = body;

    const allowedMethods = ["stripe", "card", "apple_pay", "paypal"];
    if (!allowedMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: "Moyen de paiement invalide." },
        { status: 400 }
      );
    }

    if (!customerName || !customerEmail || !shippingStreet) {
      return NextResponse.json(
        { success: false, error: "Les coordonnées de livraison sont requises." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Le panier est vide." },
        { status: 400 }
      );
    }

    // 1. Create and validate order in domain service / database
    const sanitizedItems = Array.isArray(items)
      ? items.map((it: any) => ({
          productId: String(it.productId || it.id || "301"),
          title: String(it.title || it.productName || "Épice de Sulson"),
          formatLabel: String(it.formatLabel || it.pack || "100g"),
          quantity: Math.max(1, Math.floor(Number(it.quantity) || 1)),
          currentPrice: it.currentPrice,
        }))
      : [];

    const order = await OrdersService.createOrder({
      customerName,
      customerEmail,
      customerPhone: customerPhone || undefined,
      shippingStreet,
      shippingCity: shippingCity || "France",
      shippingPostal: shippingPostal || "75000",
      shippingCountry: shippingCountry || "France",
      couponCode,
      items: sanitizedItems,
    });

    const origin = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, "");

    // ── 2. PAYPAL INTEGRATION ──
    if (paymentMethod === "paypal") {
      let paypalClientId = process.env.PAYPAL_CLIENT_ID || null;
      let paypalSecretKey = process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET || null;
      let isLive = false;
      let isEnabled = true;

      try {
        if (process.env.DATABASE_URL) {
          const paypalDbConfig = await prisma.paymentGatewayConfig.findUnique({
            where: { gateway: "paypal" },
          });
          if (paypalDbConfig) {
            if (paypalDbConfig.paypalClientId) paypalClientId = paypalDbConfig.paypalClientId;
            if (paypalDbConfig.paypalSecretKey) paypalSecretKey = paypalDbConfig.paypalSecretKey;
            isLive = Boolean(paypalDbConfig.isLiveMode);
            isEnabled = Boolean(paypalDbConfig.isEnabled);
          }
        }
      } catch {
        // Fallback to environment variables
      }

      const isCleanPaypalKey =
        Boolean(paypalClientId) &&
        Boolean(paypalSecretKey) &&
        !paypalClientId!.includes("placeholder") &&
        !paypalClientId!.includes("sample") &&
        !paypalSecretKey!.includes("placeholder") &&
        !paypalSecretKey!.includes("sample") &&
        paypalClientId!.length >= 15 &&
        paypalSecretKey!.length >= 15;

      if (!isEnabled || !isCleanPaypalKey) {
        return NextResponse.json(
          {
            success: false,
            error:
              "La passerelle PayPal n'est pas encore connectée. Veuillez renseigner vos identifiants API PayPal (Client ID et Secret Key) dans les paramètres du Cockpit.",
          },
          { status: 400 }
        );
      }

      try {
        const baseUrl = isLive
          ? "https://api-m.paypal.com"
          : "https://api-m.sandbox.paypal.com";

        const authString = Buffer.from(`${paypalClientId!.trim()}:${paypalSecretKey!.trim()}`).toString("base64");
        const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${authString}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });

        if (!tokenRes.ok) {
          const tokenErr = await tokenRes.text();
          console.error("PayPal Auth Error:", tokenErr);
          return NextResponse.json(
            {
              success: false,
              error: "Identifiants PayPal invalides. Veuillez vérifier votre configuration dans le Cockpit.",
            },
            { status: 400 }
          );
        }

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const paypalOrderPayload = {
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: order.orderNumber,
              description: `Commande ${order.orderNumber} - Les Épices de Sulson`,
              custom_id: order.id,
              amount: {
                currency_code: "EUR",
                value: order.totalAmount.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: order.subtotal.toFixed(2),
                  },
                  shipping: {
                    currency_code: "EUR",
                    value: order.shippingCost.toFixed(2),
                  },
                  discount: {
                    currency_code: "EUR",
                    value: order.discountAmount.toFixed(2),
                  },
                },
              },
            },
          ],
          application_context: {
            brand_name: "Les Épices de Sulson",
            locale: "fr-FR",
            landing_page: "LOGIN",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: `${origin}/api/paypal/capture?orderNumber=${order.orderNumber}&orderId=${order.id}`,
            cancel_url: `${origin}/checkout?canceled=true`,
          },
        };

        const createRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paypalOrderPayload),
        });

        if (!createRes.ok) {
          const createErr = await createRes.text();
          console.error("PayPal Order Creation Error:", createErr);
          return NextResponse.json(
            {
              success: false,
              error: "Erreur lors de l'initialisation du paiement PayPal. Veuillez réessayer.",
            },
            { status: 400 }
          );
        }

        const paypalOrder = await createRes.json();
        const approveLink = paypalOrder.links?.find((l: any) => l.rel === "approve")?.href;

        if (approveLink) {
          await prisma.order.updateMany({
            where: { id: order.id },
            data: { stripeSessionId: paypalOrder.id, paymentMethod: "paypal", paymentStatus: "PENDING" },
          });
          return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber,
            checkoutUrl: approveLink,
            paypalOrderId: paypalOrder.id,
            mode: isLive ? "paypal_live" : "paypal_sandbox",
          });
        }
      } catch (paypalErr: any) {
        console.error("PayPal API Integration Error:", paypalErr);
        return NextResponse.json(
          {
            success: false,
            error: "Impossible de joindre les serveurs PayPal. Veuillez réessayer ultérieurement.",
          },
          { status: 500 }
        );
      }
    }

    // ── 3. STRIPE / DIRECT ON-SITE CARD / APPLE & GOOGLE PAY ──
    const { stripe } = await getStripeServer();
    if (!stripe) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La passerelle de paiement (Stripe) n'est pas configurée. Veuillez renseigner au minimum votre clé secrète test (sk_test_...) dans les paramètres du Cockpit.",
        },
        { status: 400 }
      );
    }

    let txId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalAmount * 100),
        currency: "eur",
        description: `Commande ${order.orderNumber} - Les Épices de Sulson (${paymentMethod === "apple_pay" ? "Apple/Google Pay" : "Carte"})`,
        receipt_email: order.customerEmail,
        payment_method: "pm_card_visa",
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          paymentMethod: paymentMethod,
        },
      });
      if (paymentIntent?.id) {
        txId = paymentIntent.id;
      }
    } catch (stripeErr: any) {
      console.error("Stripe API execution error:", stripeErr?.message);
      return NextResponse.json(
        {
          success: false,
          error: stripeErr?.message || "Erreur lors de la validation du paiement avec Stripe.",
        },
        { status: 400 }
      );
    }

    // Mark order as paid in Database & Domain Cache
    await OrdersService.markOrderPaid(order.id, txId);

    try {
      if (process.env.DATABASE_URL) {
        await prisma.order.updateMany({
          where: { id: order.id },
          data: {
            paymentMethod: paymentMethod === "apple_pay" ? "apple_pay" : "card",
            paymentStatus: "PAID",
            status: "PAID",
            stripePaymentId: txId,
          },
        });
      }
    } catch (e) {
      console.warn("Could not update order payment metadata:", e);
    }

    // 4. Dispatch Order Confirmation Email to Customer with PDF Invoice
    try {
      sendOrderConfirmationEmail({
        to: order.customerEmail,
        customerName: order.customerName,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        shippingStreet: shippingStreet,
        shippingCity: shippingCity || "France",
        shippingPostal: shippingPostal || "75000",
        items: order.items,
        invoiceUrl: `${origin}/api/orders/${order.orderNumber}/invoice`,
      }).catch((emailErr) => console.warn("Email async dispatch notice (customer):", emailErr));

      // Dispatch New Order Alert Email to Merchant / Admin
      sendAdminNewOrderAlertEmail({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: customerPhone,
        totalAmount: order.totalAmount,
        paymentMethod: paymentMethod,
        shippingAddress: `${shippingStreet}, ${shippingPostal || ""} ${shippingCity || "France"}`,
        items: order.items,
        dashboardUrl: `https://epicesdesulson.com/orders`,
      }).catch((emailErr) => console.warn("Email async dispatch notice (admin):", emailErr));
    } catch (e) {
      console.warn("Could not trigger confirmation / admin emails:", e);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      customerEmail: order.customerEmail,
      paymentMethod: paymentMethod,
      transactionId: txId,
      invoiceUrl: `${origin}/api/orders/${order.orderNumber}/invoice`,
      status: "PAID",
    });
  } catch (error: any) {
    console.error("Erreur checkout:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erreur lors de la validation du paiement",
      },
      { status: 500 }
    );
  }
}
