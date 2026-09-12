import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Coupon } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    let coupons: Coupon[] = [];
    if (process.env.DATABASE_URL) {
      coupons = await prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({
      success: true,
      data: coupons.map((c) => ({
        id: c.id,
        code: c.code,
        description: c.description,
        discountPercent: Number(c.discountPercent),
        isActive: c.isActive,
        minOrderAmount: c.minOrderAmount ? Number(c.minOrderAmount) : null,
        expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
        usageCount: c.usageCount,
        createdAt: c.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error("Erreur récupération codes promo:", error);
    return NextResponse.json(
      { success: false, error: "Impossible de charger les codes promo." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { code, discountPercent, description, minOrderAmount, expiresAt, isActive = true } = body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { success: false, error: "Le libellé du code promo est requis." },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const percent = parseFloat(Number(discountPercent).toFixed(2));

    if (isNaN(percent) || percent <= 0 || percent > 100) {
      return NextResponse.json(
        { success: false, error: "Le pourcentage de réduction doit être compris entre 1% et 100%." },
        { status: 400 }
      );
    }

    const newCoupon = await prisma.coupon.create({
      data: {
        code: cleanCode,
        discountPercent: percent,
        description: description?.trim() || null,
        minOrderAmount: minOrderAmount ? parseFloat(Number(minOrderAmount).toFixed(2)) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: newCoupon.id,
        code: newCoupon.code,
        discountPercent: Number(newCoupon.discountPercent),
        description: newCoupon.description,
        isActive: newCoupon.isActive,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Un code promo avec ce libellé existe déjà." },
        { status: 400 }
      );
    }
    console.error("Erreur création code promo:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors de la création du code promo." },
      { status: 500 }
    );
  }
}
