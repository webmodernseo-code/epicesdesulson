import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderRefundedEmail } from "@/lib/email";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { id } = await context.params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || order.paymentStatus !== "PAID" || !order.stripePaymentId) {
    return NextResponse.json({ error: "Cette commande n'est pas remboursable automatiquement." }, { status: 409 });
  }

  const config = await prisma.paymentGatewayConfig.findUnique({ where: { gateway: order.paymentMethod } });
  if (order.paymentMethod === "stripe" && config?.stripeSecretKey) {
    const form = new URLSearchParams({
      payment_intent: order.stripePaymentId,
      reason: "requested_by_customer",
      "metadata[orderNumber]": order.orderNumber,
    });
    const response = await fetch("https://api.stripe.com/v1/refunds", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": `refund-${order.id}`,
      },
      body: form,
    });
    if (!response.ok) return NextResponse.json({ error: "Stripe a refusé le remboursement." }, { status: 502 });
  } else if (order.paymentMethod === "paypal" && config?.paypalClientId && config.paypalSecretKey) {
    const host = config.isLiveMode ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
    const basic = Buffer.from(`${config.paypalClientId}:${config.paypalSecretKey}`).toString("base64");
    const tokenRes = await fetch(`${host}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    if (!tokenRes.ok) return NextResponse.json({ error: "Authentification PayPal impossible." }, { status: 502 });
    const token = (await tokenRes.json()).access_token;
    const response = await fetch(`${host}/v2/payments/captures/${order.stripePaymentId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": `refund-${order.id}`,
      },
      body: "{}",
    });
    if (!response.ok) return NextResponse.json({ error: "PayPal a refusé le remboursement." }, { status: 502 });
  } else {
    return NextResponse.json({ error: "Passerelle de paiement non configurée." }, { status: 503 });
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: "REFUNDED", paymentStatus: "REFUNDED" },
  });

  try {
    await sendOrderRefundedEmail({
      to: updatedOrder.customerEmail,
      customerName: updatedOrder.customerName,
      orderNumber: updatedOrder.orderNumber,
      refundAmount: Number(updatedOrder.totalAmount),
    });
  } catch (mailErr) {
    console.warn("Échec d'envoi de l'e-mail de confirmation de remboursement:", mailErr);
  }

  return NextResponse.json({ success: true, message: "Remboursement intégral effectué et e-mail client envoyé." });
}
