import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const products = await prisma.product.findMany({ include: { category: true, formats: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: products.map((p) => ({ ...p, basePrice: Number(p.basePrice), baseOldPrice: p.baseOldPrice ? Number(p.baseOldPrice) : null, ratingScore: Number(p.ratingScore), formats: p.formats.map((f) => ({ ...f, multiplier: Number(f.multiplier), price: Number(f.price), oldPrice: f.oldPrice ? Number(f.oldPrice) : null })) })) });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const body = await req.json();
  const price = Number(body.price); const stock = Number(body.stock);
  if (!body.name?.trim() || !body.sku?.trim() || !body.image?.trim() || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) return NextResponse.json({ error: "Nom, SKU, image, prix et stock valides sont requis." }, { status: 400 });
  const slug = String(body.name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const category = body.category?.trim() ? await prisma.category.upsert({ where: { slug: String(body.category).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }, update: { name: body.category.trim() }, create: { name: body.category.trim(), slug: String(body.category).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } }) : null;
  const product = await prisma.product.create({ data: { slug, code: body.sku.trim().toUpperCase(), title: body.name.trim(), description: body.description?.trim() || body.name.trim(), origin: body.origin?.trim() || "Cameroun", basePrice: price, baseOldPrice: body.comparePrice ? Number(body.comparePrice) : null, imageRecto: body.image.trim(), imageVerso: body.secondaryImage?.trim() || null, stockQuantity: stock, isAvailable: body.isPublished !== false, categoryId: category?.id, formats: { create: { label: body.format || "100g", weightGrams: Number(body.weightGrams) || 100, multiplier: 1, price, oldPrice: body.comparePrice ? Number(body.comparePrice) : null, inStock: stock > 0 } } } });
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
