import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { id } = await context.params; const product = await prisma.product.findFirst({ where: { OR: [{ id }, { code: id }, { slug: id }] }, include: { category: true, formats: true } });
  if (!product) return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  return NextResponse.json({ success: true, data: product });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { id } = await context.params; const body = await req.json(); const existing = await prisma.product.findFirst({ where: { OR: [{ id }, { code: id }, { slug: id }] } });
  if (!existing) return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  const product = await prisma.product.update({ where: { id: existing.id }, data: { title: body.name?.trim(), description: body.description?.trim(), origin: body.origin?.trim(), basePrice: body.price == null ? undefined : Number(body.price), baseOldPrice: body.comparePrice === "" ? null : body.comparePrice == null ? undefined : Number(body.comparePrice), stockQuantity: body.stock == null ? undefined : Number(body.stock), isAvailable: body.isPublished == null ? undefined : Boolean(body.isPublished), imageRecto: body.image?.trim(), imageVerso: body.secondaryImage === "" ? null : body.secondaryImage?.trim() } });
  return NextResponse.json({ success: true, data: product });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { id } = await context.params; const existing = await prisma.product.findFirst({ where: { OR: [{ id }, { code: id }, { slug: id }] } });
  if (!existing) return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  await prisma.product.update({ where: { id: existing.id }, data: { isAvailable: false } });
  return NextResponse.json({ success: true, message: "Produit retiré de la boutique sans supprimer son historique." });
}
