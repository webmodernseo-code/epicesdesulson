import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const [orders, products, lowStock, currentRevenue, previousRevenue] = await Promise.all([
      prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" }, take: 8 }),
      prisma.product.count({ where: { isAvailable: true } }),
      prisma.product.count({ where: { isAvailable: true, stockQuantity: { lte: 15 } } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, _count: true, where: { paymentStatus: "PAID", createdAt: { gte: monthStart } } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: "PAID", createdAt: { gte: previousMonthStart, lt: monthStart } } }),
    ]);
    const revenue = Number(currentRevenue._sum.totalAmount || 0);
    const previous = Number(previousRevenue._sum.totalAmount || 0);
    const trend = previous > 0 ? ((revenue - previous) / previous) * 100 : null;
    const paidOrders = currentRevenue._count;
    return NextResponse.json({
      success: true,
      data: {
        revenue,
        revenueTrend: trend,
        paidOrders,
        averageOrder: paidOrders ? revenue / paidOrders : 0,
        activeProducts: products,
        lowStock,
        recentOrders: orders.map((order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          totalAmount: Number(order.totalAmount),
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          status: order.status,
          createdAt: order.createdAt.toISOString(),
          items: order.items.map((item) => `${item.quantity}× ${item.productName} (${item.formatLabel})`).join(", "),
        })),
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Base de données indisponible." }, { status: 503 });
  }
}
