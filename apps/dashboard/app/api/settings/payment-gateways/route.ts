import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
const masked = (value?: string | null) => value ? `${value.slice(0, 7)}••••••••${value.slice(-4)}` : "";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  try {
    const configs = await prisma.paymentGatewayConfig.findMany(); const stripe = configs.find((c) => c.gateway === "stripe"); const paypal = configs.find((c) => c.gateway === "paypal");
    return NextResponse.json({ success: true, data: { stripe: { gateway: "stripe", isEnabled: stripe?.isEnabled || false, isLiveMode: stripe?.isLiveMode || false, publishableKey: stripe?.stripePublishableKey || "", secretKey: masked(stripe?.stripeSecretKey), webhookSecret: masked(stripe?.stripeWebhookSecret), hasSecretKey: Boolean(stripe?.stripeSecretKey) }, paypal: { gateway: "paypal", isEnabled: paypal?.isEnabled || false, isLiveMode: paypal?.isLiveMode || false, clientId: paypal?.paypalClientId || "", secretKey: masked(paypal?.paypalSecretKey), hasSecretKey: Boolean(paypal?.paypalSecretKey) } } });
  } catch {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const paypalSecret = process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET;
    return NextResponse.json({ success: true, setupRequired: true, data: {
      stripe: { gateway: "stripe", isEnabled: false, isLiveMode: Boolean(stripeSecret?.startsWith("sk_live_")), publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "", secretKey: masked(stripeSecret), webhookSecret: masked(process.env.STRIPE_WEBHOOK_SECRET), hasSecretKey: Boolean(stripeSecret) },
      paypal: { gateway: "paypal", isEnabled: false, isLiveMode: false, clientId: process.env.PAYPAL_CLIENT_ID || "", secretKey: masked(paypalSecret), hasSecretKey: Boolean(paypalSecret) },
    } });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const body = await req.json(); const gateway = body.gateway;
  if (!["stripe", "paypal"].includes(gateway)) return NextResponse.json({ error: "Passerelle inconnue." }, { status: 400 });
  const existing = await prisma.paymentGatewayConfig.findUnique({ where: { gateway } });
  const keepMasked = (next: unknown, current?: string | null) => typeof next === "string" && !next.includes("••••") ? next.trim() : current || null;
  if (body.action === "test") {
    if (gateway === "stripe") { const key = keepMasked(body.secretKey, existing?.stripeSecretKey); if (!key) return NextResponse.json({ success: false, error: "Clé secrète Stripe requise." }, { status: 400 }); const response = await fetch("https://api.stripe.com/v1/balance", { headers: { Authorization: `Bearer ${key}` } }); if (!response.ok) return NextResponse.json({ success: false, error: "Clé Stripe invalide." }, { status: 400 }); return NextResponse.json({ success: true, message: `Connexion Stripe validée (${key.startsWith("sk_live_") ? "production" : "test"}).` }); }
    const clientId = keepMasked(body.clientId, existing?.paypalClientId); const secret = keepMasked(body.secretKey, existing?.paypalSecretKey); if (!clientId || !secret) return NextResponse.json({ success: false, error: "Client ID et secret PayPal requis." }, { status: 400 }); const host = body.isLiveMode ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"; const auth = Buffer.from(`${clientId}:${secret}`).toString("base64"); const response = await fetch(`${host}/v1/oauth2/token`, { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials" }); if (!response.ok) return NextResponse.json({ success: false, error: "Identifiants PayPal invalides pour ce mode." }, { status: 400 }); return NextResponse.json({ success: true, message: `Connexion PayPal validée (${body.isLiveMode ? "production" : "sandbox"}).` });
  }
  if (gateway === "stripe") { const secret = keepMasked(body.secretKey, existing?.stripeSecretKey); const webhook = keepMasked(body.webhookSecret, existing?.stripeWebhookSecret); if (body.isEnabled && (!body.publishableKey?.trim() || !secret || !webhook)) return NextResponse.json({ error: "Clé publique, clé secrète et secret webhook Stripe requis pour activer." }, { status: 400 }); await prisma.paymentGatewayConfig.upsert({ where: { gateway }, update: { isEnabled: Boolean(body.isEnabled), isLiveMode: Boolean(body.isLiveMode), stripePublishableKey: body.publishableKey?.trim() || null, stripeSecretKey: secret, stripeWebhookSecret: webhook }, create: { gateway, isEnabled: Boolean(body.isEnabled), isLiveMode: Boolean(body.isLiveMode), stripePublishableKey: body.publishableKey?.trim() || null, stripeSecretKey: secret, stripeWebhookSecret: webhook } }); }
  else { const clientId = keepMasked(body.clientId, existing?.paypalClientId); const secret = keepMasked(body.secretKey, existing?.paypalSecretKey); if (body.isEnabled && (!clientId || !secret)) return NextResponse.json({ error: "Client ID et secret PayPal requis pour activer." }, { status: 400 }); await prisma.paymentGatewayConfig.upsert({ where: { gateway }, update: { isEnabled: Boolean(body.isEnabled), isLiveMode: Boolean(body.isLiveMode), paypalClientId: clientId, paypalSecretKey: secret }, create: { gateway, isEnabled: Boolean(body.isEnabled), isLiveMode: Boolean(body.isLiveMode), paypalClientId: clientId, paypalSecretKey: secret } }); }
  return NextResponse.json({ success: true, message: `${gateway === "stripe" ? "Stripe" : "PayPal"} enregistré dans Neon.` });
}
