import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, subtotal = 0 } = body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { success: false, message: "Veuillez saisir un code promo." },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const parsedSubtotal = Number(subtotal) || 0;

    let dbCoupon = null;
    try {
      if (process.env.DATABASE_URL) {
        dbCoupon = await prisma.coupon.findUnique({
          where: { code: cleanCode },
        });
      }
    } catch (dbErr) {
      console.warn("DB coupon check fallback:", dbErr);
    }

    if (dbCoupon) {
      if (!dbCoupon.isActive) {
        return NextResponse.json({
          success: false,
          message: "Ce code promo n'est plus actif.",
        });
      }

      if (dbCoupon.expiresAt && new Date(dbCoupon.expiresAt) < new Date()) {
        return NextResponse.json({
          success: false,
          message: "Ce code promo est expiré.",
        });
      }

      const minOrder = dbCoupon.minOrderAmount ? Number(dbCoupon.minOrderAmount) : 0;
      if (parsedSubtotal < minOrder) {
        return NextResponse.json({
          success: false,
          message: `Ce code promo nécessite un panier d'au moins ${minOrder.toFixed(2)} €.`,
        });
      }

      const discountPercent = Number(dbCoupon.discountPercent);
      const discountAmount = parseFloat(((parsedSubtotal * discountPercent) / 100).toFixed(2));

      return NextResponse.json({
        success: true,
        data: {
          code: cleanCode,
          description: dbCoupon.description,
          discountPercent,
          discountAmount,
          message: `Code promo ${cleanCode} appliqué (-${discountPercent}%) !`,
        },
      });
    }

    // Default fallback if database is not reachable / initial setup
    if (cleanCode === "SULSON10") {
      const discountPercent = 10;
      const discountAmount = parseFloat(((parsedSubtotal * discountPercent) / 100).toFixed(2));
      return NextResponse.json({
        success: true,
        data: {
          code: "SULSON10",
          discountPercent: 10,
          discountAmount,
          message: "Code promo appliqué (-10%) !",
        },
      });
    }

    return NextResponse.json({
      success: false,
      message: "Code promo invalide ou expiré.",
    });
  } catch (error: any) {
    console.error("Erreur validation code promo:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la vérification du code promo." },
      { status: 500 }
    );
  }
}
