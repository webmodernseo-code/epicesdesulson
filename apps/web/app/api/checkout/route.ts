import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendAdminNewOrderAlertEmail } from "@/lib/email";
import { getStripeServer } from "@/lib/stripe";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { maintenanceResponse } from "@/lib/maintenance";

export async function POST(req: Request) {
  try {
    const maintenance = await maintenanceResponse();
    if (maintenance) return NextResponse.json({ success: false, error: maintenance.message }, { status: 503 });
    const clientIp = getClientIp(req);
    const { success } = rateLimit(`checkout:${clientIp}`, 25, 60 * 1000);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Trop de requêtes de paiement. Veuillez patienter un instant." },
        { status: 429 }
      );
    }

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

      if (isEnabled && isCleanPaypalKey) {
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

          if (tokenRes.ok) {
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
            }
          }
        } catch (paypalErr: any) {
          console.warn("PayPal API Integration notice (falling back to direct test confirmation):", paypalErr);
        }
      }

      // A failed or unavailable provider must never be converted into a paid order.
      return NextResponse.json(
        { success: false, error: "PayPal est momentanément indisponible. Aucun débit n’a été effectué." },
        { status: 503 }
      );

      // Smooth direct confirmation for PayPal
      const paypalTxId = `tx_paypal_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      await OrdersService.markOrderPaid(order.id, paypalTxId);

      try {
        if (process.env.DATABASE_URL) {
          await prisma.order.updateMany({
            where: { id: order.id },
            data: {
              paymentMethod: "paypal",
              paymentStatus: "PAID",
              status: "PAID",
              stripePaymentId: paypalTxId,
            },
          });
        }
      } catch (e) {
        console.warn("Could not update paypal order status:", e);
      }

      // Dispatch confirmation emails
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
        }).catch((emailErr) => console.warn("Email async notice (customer):", emailErr));

        sendAdminNewOrderAlertEmail({
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: customerPhone,
          totalAmount: order.totalAmount,
          paymentMethod: "paypal",
          shippingAddress: `${shippingStreet}, ${shippingPostal || ""} ${shippingCity || "France"}`,
          items: order.items,
          dashboardUrl: `https://epicesdesulson.com/orders`,
        }).catch((emailErr) => console.warn("Email async notice (admin):", emailErr));
      } catch (e) {
        console.warn("Could not trigger emails:", e);
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        customerEmail: order.customerEmail,
        paymentMethod: "paypal",
        transactionId: paypalTxId,
        invoiceUrl: `${origin}/api/orders/${order.orderNumber}/invoice`,
        status: "PAID",
      });
    }

    // ── 3. STRIPE / DIRECT ON-SITE CARD / APPLE & GOOGLE PAY ──
    const { stripe } = await getStripeServer();

    if (!stripe) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La passerelle de paiement Stripe n'est pas encore configurée. Veuillez renseigner vos clés API Stripe dans le tableau de bord ou vos variables d'environnement.",
        },
        { status: 503 }
      );
    }

    try {
      const lineItems = sanitizedItems.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.title || item.productName || "Épice de Sulson"} (${item.formatLabel || "100g"})`,
          },
          unit_amount: Math.round(Number(item.currentPrice || item.unitPrice || 0) * 100),
        },
        quantity: item.quantity,
      }));

      // Ajout des frais de livraison si applicables
      if (order.shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: "Frais de livraison sécurisée",
            },
            unit_amount: Math.round(order.shippingCost * 100),
          },
          quantity: 1,
        });
      }

      // Gestion de la réduction / code promo si applicable
      let discounts: any[] = [];
      if (order.discountAmount > 0) {
        try {
          const coupon = await stripe.coupons.create({
            amount_off: Math.round(order.discountAmount * 100),
            currency: "eur",
            duration: "once",
            name: couponCode || "Remise Sulson",
          });
          discounts = [{ coupon: coupon.id }];
        } catch (couponErr) {
          console.warn("Coupon Stripe non créé:", couponErr);
        }
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: order.customerEmail,
        payment_method_types: ["card", "link"],
        line_items: lineItems,
        discounts: discounts.length > 0 ? discounts : undefined,
        mode: "payment",
        success_url: `${origin}/order-successful?orderNumber=${order.orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout?canceled=true`,
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          paymentMethod: paymentMethod,
        },
      });

      if (session.url) {
        if (process.env.DATABASE_URL) {
          await prisma.order.updateMany({
            where: { id: order.id },
            data: {
              stripeSessionId: session.id,
              paymentMethod: paymentMethod === "apple_pay" ? "apple_pay" : "card",
              paymentStatus: "PENDING",
            },
          });
        }

        return NextResponse.json({
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          checkoutUrl: session.url,
        });
      }

      return NextResponse.json(
        { success: false, error: "Impossible d'obtenir l'URL de paiement sécurisée Stripe." },
        { status: 500 }
      );
    } catch (stripeErr: any) {
      console.error("Erreur Stripe Checkout Session:", stripeErr);
      return NextResponse.json(
        {
          success: false,
          error: stripeErr.message || "Erreur de communication avec la passerelle Stripe.",
        },
        { status: 500 }
      );
    }
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
