import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    include: { category: true, formats: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: products.map((p) => ({
      ...p,
      basePrice: Number(p.basePrice),
      baseOldPrice: p.baseOldPrice ? Number(p.baseOldPrice) : null,
      ratingScore: Number(p.ratingScore),
      formats: p.formats.map((f) => ({
        ...f,
        multiplier: Number(f.multiplier),
        price: Number(f.price),
        oldPrice: f.oldPrice ? Number(f.oldPrice) : null,
      })),
    })),
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json();
  const name = body.name?.trim() || body.title?.trim();
  const sku = (body.sku?.trim() || `SUL-${Math.floor(100 + Math.random() * 900)}`).toUpperCase();
  const price = Number(body.price);
  const stock = body.stock != null ? Number(body.stock) : 100;
  const image = body.image?.trim() || body.imageRecto?.trim() || "/images/products/epice-poulet-recto.jpg";

  if (!name || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock < 0) {
    return NextResponse.json(
      { error: "Nom, prix valide et stock valide sont requis." },
      { status: 400 }
    );
  }

  const slug = String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let categoryId: string | null = null;
  if (body.category?.trim()) {
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

  // Check if product with this SKU or slug already exists (upsert)
  const existing = await prisma.product.findFirst({
    where: {
      OR: [{ code: sku }, { slug: slug }],
    },
  });

  let product;
  if (existing) {
    product = await prisma.product.update({
      where: { id: existing.id },
      data: {
        title: name,
        subtitle: body.subtitle?.trim() || undefined,
        code: sku,
        slug: body.slug?.trim() || slug,
        description: body.description?.trim() || name,
        origin: body.origin?.trim() || "Cameroun (Recette Artisanale)",
        basePrice: price,
        baseOldPrice: body.comparePrice ? Number(body.comparePrice) : null,
        imageRecto: image,
        imageVerso: body.imageVerso?.trim() || body.secondaryImage?.trim() || null,
        stockQuantity: stock,
        isAvailable: body.isPublished !== false,
        categoryId: categoryId || existing.categoryId,
      },
      include: { category: true, formats: true },
    });
  } else {
    product = await prisma.product.create({
      data: {
        slug: body.slug?.trim() || slug,
        code: sku,
        title: name,
        subtitle: body.subtitle?.trim() || null,
        description: body.description?.trim() || name,
        origin: body.origin?.trim() || "Cameroun (Recette Artisanale)",
        basePrice: price,
        baseOldPrice: body.comparePrice ? Number(body.comparePrice) : null,
        imageRecto: image,
        imageVerso: body.imageVerso?.trim() || body.secondaryImage?.trim() || null,
        stockQuantity: stock,
        isAvailable: body.isPublished !== false,
        categoryId,
        formats: {
          create: {
            label: body.format || "100g",
            weightGrams: Number(body.weightGrams) || 100,
            multiplier: 1,
            price,
            oldPrice: body.comparePrice ? Number(body.comparePrice) : null,
            inStock: stock > 0,
          },
        },
      },
      include: { category: true, formats: true },
    });
  }

  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
