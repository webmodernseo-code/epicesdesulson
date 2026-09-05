import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks = {
    database: false,
    sessionSecret: Boolean(process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length >= 32),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
    paypal: Boolean(process.env.PAYPAL_CLIENT_ID && (process.env.PAYPAL_SECRET_KEY || process.env.PAYPAL_CLIENT_SECRET)),
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch { /* reported through the status only */ }

  const requiredHealthy = checks.database && checks.sessionSecret;
  return NextResponse.json(
    { status: requiredHealthy ? "ok" : "degraded", checks },
    { status: requiredHealthy ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
