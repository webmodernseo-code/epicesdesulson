import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token"); // PayPal order ID
  const orderNumber = searchParams.get("orderNumber");
  const origin = new URL(req.url).origin;

  if (!orderNumber) {
    return NextResponse.redirect(`${origin}/checkout?error=order_not_found`);
  }

  // If token is present, attempt capture
  if (token) {
    try {
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
        // Fallback
      }

      if (paypalClientId && paypalSecretKey) {
        const baseUrl = isLive ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
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
          const { access_token } = await tokenRes.json();
          const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${token}/capture`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          });

          if (captureRes.ok) {
            const capture = await captureRes.json();
            const matchingOrder = await prisma.order.findFirst({
              where: { orderNumber, stripeSessionId: token, paymentMethod: "paypal" },
            });
            if (capture.status === "COMPLETED" && matchingOrder) {
              const captureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id;
              await OrdersService.markOrderPaid(orderNumber, captureId);
              return NextResponse.redirect(
                `${origin}/checkout/success?orderNumber=${encodeURIComponent(orderNumber)}&provider=paypal`
              );
            }
          }
        }
      }
    } catch (err) {
      console.error("PayPal Capture Error:", err);
    }
  }

  return NextResponse.redirect(`${origin}/checkout?error=payment_failed`);
}
