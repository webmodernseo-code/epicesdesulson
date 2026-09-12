import { NextRequest, NextResponse } from "next/server";
import { isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function mask(value?: string | null) { return value ? `${value.slice(0, 4)}••••${value.slice(-3)}` : ""; }

export async function GET(req: NextRequest) {
  if (!isSuperAdmin(req)) return NextResponse.json({ error: "Accès réservé au super administrateur." }, { status: 403 });
  const config = await prisma.mediaStorageConfig.findUnique({ where: { provider: "cloudinary" } }).catch(() => null);
  return NextResponse.json({ success: true, data: config ? { cloudName: config.cloudName, apiKey: mask(config.apiKey), apiSecret: mask(config.apiSecret), uploadFolder: config.uploadFolder, isEnabled: config.isEnabled, configured: true } : { cloudName: "", apiKey: "", apiSecret: "", uploadFolder: "les-epices-de-sulson/products", isEnabled: false, configured: false } });
}

export async function POST(req: NextRequest) {
  if (!isSuperAdmin(req)) return NextResponse.json({ error: "Accès réservé au super administrateur." }, { status: 403 });
  const body = await req.json(); const existing = await prisma.mediaStorageConfig.findUnique({ where: { provider: "cloudinary" } });
  const apiKey = body.apiKey?.includes("••••") ? existing?.apiKey : body.apiKey?.trim(); const apiSecret = body.apiSecret?.includes("••••") ? existing?.apiSecret : body.apiSecret?.trim();
  if (!body.cloudName?.trim() || !apiKey || !apiSecret) return NextResponse.json({ error: "Cloud name, API key et API secret sont requis." }, { status: 400 });
  const config = await prisma.mediaStorageConfig.upsert({ where: { provider: "cloudinary" }, update: { cloudName: body.cloudName.trim(), apiKey, apiSecret, uploadFolder: body.uploadFolder?.trim() || "les-epices-de-sulson/products", isEnabled: Boolean(body.isEnabled) }, create: { provider: "cloudinary", cloudName: body.cloudName.trim(), apiKey, apiSecret, uploadFolder: body.uploadFolder?.trim() || "les-epices-de-sulson/products", isEnabled: Boolean(body.isEnabled) } });
  if (body.action === "test") { const authorization = Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString("base64"); const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/resources/image?max_results=1`, { headers: { Authorization: `Basic ${authorization}` } }); if (!response.ok) return NextResponse.json({ success: false, error: "Identifiants Cloudinary invalides." }, { status: 400 }); }
  return NextResponse.json({ success: true, message: "Configuration Cloudinary enregistrée." });
}
