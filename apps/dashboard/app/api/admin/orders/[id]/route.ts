import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const allowed: Record<string, OrderStatus[]> = {
  PAID: ["PROCESSING", "CANCELLED", "REFUNDED"],
  PROCESSING: ["SHIPPED", "CANCELLED", "REFUNDED"],
  SHIPPED: ["DELIVERED", "REFUNDED"],
  DELIVERED: ["REFUNDED"],
  PENDING: ["CANCELLED"],
};

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const { id } = await context.params;
  const { status } = await req.json();
  if (!Object.values(OrderStatus).includes(status)) return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  const current = await prisma.order.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  if (!(allowed[current.status] || []).includes(status)) return NextResponse.json({ error: `Transition ${current.status} → ${status} interdite.` }, { status: 409 });
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json({ success: true, data: order });
}
