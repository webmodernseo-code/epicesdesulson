import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await context.params;
  const decodedId = decodeURIComponent(id);

  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id: decodedId },
        { code: decodedId },
        { code: decodedId.toUpperCase() },
        { slug: decodedId },
        { slug: decodedId.toLowerCase() },
      ],
    },
    include: { category: true, formats: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      ...product,
      basePrice: Number(product.basePrice),
      baseOldPrice: product.baseOldPrice ? Number(product.baseOldPrice) : null,
      ratingScore: Number(product.ratingScore),
      formats: product.formats.map((f) => ({
        ...f,
        multiplier: Number(f.multiplier),
        price: Number(f.price),
        oldPrice: f.oldPrice ? Number(f.oldPrice) : null,
      })),
    },
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, context);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, context);
}

async function handleUpdate(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await context.params;
  const decodedId = decodeURIComponent(id);
  const body = await req.json();

  const existing = await prisma.product.findFirst({
    where: {
      OR: [
        { id: decodedId },
        { code: decodedId },
        { code: decodedId.toUpperCase() },
        { slug: decodedId },
        { slug: decodedId.toLowerCase() },
      ],
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  let categoryId = existing.categoryId;
  if (body.category && typeof body.category === "string" && body.category.trim()) {
    const catName = body.category.trim();
    const catSlug = catName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const cat = await prisma.category.upsert({
      where: { slug: catSlug },
      update: { name: catName },
      create: { name: catName, slug: catSlug },
    });
    categoryId = cat.id;
  }

  const price = body.price != null && body.price !== "" ? Number(body.price) : undefined;
  const comparePrice =
    body.comparePrice === "" || body.comparePrice === null
      ? null
      : body.comparePrice != null
      ? Number(body.comparePrice)
      : undefined;
  const stock = body.stock != null && body.stock !== "" ? Number(body.stock) : undefined;
  const isAvailable =
    body.isPublished !== undefined
      ? Boolean(body.isPublished)
      : body.isAvailable !== undefined
      ? Boolean(body.isAvailable)
      : undefined;

  const updated = await prisma.product.update({
    where: { id: existing.id },
    data: {
      title: body.name?.trim() || body.title?.trim() || undefined,
      subtitle: body.subtitle?.trim() || undefined,
      code: body.sku?.trim()?.toUpperCase() || undefined,
      description: body.description?.trim() || undefined,
      origin: body.origin?.trim() || undefined,
      basePrice: price,
      baseOldPrice: comparePrice,
      stockQuantity: stock,
      isAvailable: isAvailable,
      imageRecto: body.image?.trim() || body.imageRecto?.trim() || undefined,
      imageVerso:
        body.secondaryImage === "" || body.imageVerso === ""
          ? null
          : body.secondaryImage?.trim() || body.imageVerso?.trim() || undefined,
      categoryId: categoryId,
    },
    include: { category: true, formats: true },
  });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await context.params;
  const decodedId = decodeURIComponent(id);

  const existing = await prisma.product.findFirst({
    where: {
      OR: [
        { id: decodedId },
        { code: decodedId },
        { code: decodedId.toUpperCase() },
        { slug: decodedId },
        { slug: decodedId.toLowerCase() },
      ],
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Produit introuvable." }, { status: 404 });
  }

  await prisma.product.update({
    where: { id: existing.id },
    data: { isAvailable: false },
  });

  return NextResponse.json({
    success: true,
    message: "Produit retiré de la boutique sans supprimer son historique.",
  });
}
