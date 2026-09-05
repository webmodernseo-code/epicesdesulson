import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";

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
    } = body;

    if (!["stripe", "paypal"].includes(paymentMethod)) {
      return NextResponse.json({ success: false, error: "Moyen de paiement invalide." }, { status: 400 });
    }
    if (!customerName || !customerEmail || !shippingStreet || !shippingCity || !shippingPostal) {
      return NextResponse.json({ success: false, error: "Les coordonnées de livraison sont requises." }, { status: 400 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Le panier est vide." },
        { status: 400 }
      );
    }

    // 1. Create and validate order in domain service / database
    const order = await OrdersService.createOrder({
      customerName,
      customerEmail,
      customerPhone: customerPhone || undefined,
      shippingStreet,
      shippingCity,
      shippingPostal,
      shippingCountry: shippingCountry || "France",
      couponCode,
      items,
    });

    const origin = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, "");

    // ── 2. PAYPAL INTEGRATION (STRICTEMENT PAIEMENT EN 1 FOIS) ──
    if (paymentMethod === "paypal") {
      let paypalClientId = process.env.PAYPAL_CLIENT_ID;
      let paypalSecretKey = process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET;
      let isLive = false;

      try {
        const paypalDbConfig = await prisma.paymentGatewayConfig.findUnique({
          where: { gateway: "paypal" },
        });
        if (paypalDbConfig?.isEnabled && paypalDbConfig.paypalClientId && paypalDbConfig.paypalSecretKey) {
          paypalClientId = paypalDbConfig.paypalClientId;
          paypalSecretKey = paypalDbConfig.paypalSecretKey;
          isLive = Boolean(paypalDbConfig.isLiveMode);
        }
      } catch {
        // Fallback to environment variables
      }

      // If valid PayPal API keys are provided
      if (
        paypalClientId &&
        paypalSecretKey &&
        !paypalClientId.includes("placeholder") &&
        !paypalSecretKey.includes("placeholder")
      ) {
        try {
          const baseUrl = isLive
            ? "https://api-m.paypal.com"
            : "https://api-m.sandbox.paypal.com";

          // Step 2.1: Get OAuth2 Access Token
          const authString = Buffer.from(`${paypalClientId.trim()}:${paypalSecretKey.trim()}`).toString("base64");
          const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${authString}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
          });

          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            const accessToken = tokenData.access_token;

            // Step 2.2: Create Order V2
            const paypalOrderPayload = {
              intent: "CAPTURE",
              purchase_units: [
                {
                  reference_id: order.orderNumber,
                  description: "Commande Les Épices de Sulson (Paiement en 1 fois)",
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
                  items: order.items.map((it) => ({
                    name: `${it.productName} (${it.formatLabel})`.slice(0, 127),
                    unit_amount: {
                      currency_code: "EUR",
                      value: it.unitPrice.toFixed(2),
                    },
                    quantity: it.quantity.toString(),
                    category: "PHYSICAL_GOODS",
                  })),
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

            if (createRes.ok) {
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
            } else {
              const errDetails = await createRes.json().catch(() => ({}));
              console.error("PayPal Create Order Error:", errDetails);
            }
          }
        } catch (paypalErr) {
          console.error("PayPal API Integration Error:", paypalErr);
        }
      }

      return NextResponse.json({ success: false, error: "PayPal n'est pas configuré ou est indisponible." }, { status: 503 });
    }

    // ── 3. STRIPE INTEGRATION (CARTE BANCAIRE & APPLE PAY) ──
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

    if (
      stripeSecretKey &&
      !stripeSecretKey.includes("placeholder") &&
      (stripeSecretKey.startsWith("sk_live") || stripeSecretKey.startsWith("sk_test"))
    ) {
      try {
        const stripeParams = new URLSearchParams();
        stripeParams.append("payment_method_types[0]", "card");
        stripeParams.append("mode", "payment");
        stripeParams.append("customer_email", customerEmail || "client@epicesdesulson.com");
        stripeParams.append(
          "success_url",
          `${origin}/order-successful?orderNumber=${order.orderNumber}&session_id={CHECKOUT_SESSION_ID}&provider=stripe`
        );
        stripeParams.append("cancel_url", `${origin}/checkout?canceled=true`);
        stripeParams.append("client_reference_id", order.id);
        stripeParams.append("metadata[orderNumber]", order.orderNumber);
        stripeParams.append("metadata[orderId]", order.id);

        order.items.forEach((item, idx) => {
          const unitPriceCents = Math.round(item.unitPrice * 100);
          stripeParams.append(`line_items[${idx}][price_data][currency]`, "eur");
          stripeParams.append(
            `line_items[${idx}][price_data][product_data][name]`,
            `${item.productName} (${item.formatLabel})`
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
            item.quantity.toString()
          );
        });

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
          await prisma.order.updateMany({
            where: { id: order.id },
            data: { stripeSessionId: session.id, paymentMethod: "stripe", paymentStatus: "PENDING" },
          });
          return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber,
            checkoutUrl: session.url,
            sessionId: session.id,
            mode: "stripe_live",
          });
        }
      } catch (stripeErr) {
        console.error("Stripe Checkout Error:", stripeErr);
      }
    }

    return NextResponse.json({ success: false, error: "Stripe n'est pas configuré ou est indisponible." }, { status: 503 });
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
