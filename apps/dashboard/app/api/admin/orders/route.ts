import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data: orders.map((order) => ({ ...order, subtotal: Number(order.subtotal), shippingCost: Number(order.shippingCost), discountAmount: Number(order.discountAmount), totalAmount: Number(order.totalAmount), items: order.items.map((item) => ({ ...item, unitPrice: Number(item.unitPrice), totalPrice: Number(item.totalPrice) })) })) });
}
