import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 100 }).catch(() => []);
  return NextResponse.json({
    success: true,
    data: orders.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      discountAmount: Number(order.discountAmount),
      totalAmount: Number(order.totalAmount),
      items: order.items.map((item) => ({
        ...item,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
      })),
    })),
  });
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");
    const purgeAll = searchParams.get("purgeAll") === "true";

    if (purgeAll) {
      if (process.env.DATABASE_URL) {
        await prisma.orderItem.deleteMany();
        const deleted = await prisma.order.deleteMany();
        return NextResponse.json({
          success: true,
          message: `${deleted.count} commande(s) de test purgée(s) avec succès. La base est remise à zéro !`,
        });
      }
      return NextResponse.json({ success: true, message: "Commandes purgées." });
    }

    if (orderId) {
      if (process.env.DATABASE_URL) {
        await prisma.orderItem.deleteMany({ where: { orderId } });
        await prisma.order.delete({ where: { id: orderId } });
      }
      return NextResponse.json({ success: true, message: "Commande supprimée." });
    }

    return NextResponse.json({ error: "Paramètre manquant (id ou purgeAll)." }, { status: 400 });
  } catch (error: any) {
    console.error("Erreur suppression commande(s):", error);
    return NextResponse.json({ error: error.message || "Erreur lors de la suppression." }, { status: 500 });
  }
}

