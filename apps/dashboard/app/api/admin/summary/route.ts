import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MONTH_NAMES = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const monthStart = new Date(currentYear, currentMonth, 1);
    const previousMonthStart = new Date(currentYear, currentMonth - 1, 1);

    // Fetch live summary aggregates from PostgreSQL / Neon
    const [
      allOrders,
      productsCount,
      lowStockCount,
      currentRevenueAgg,
      previousRevenueAgg,
    ] = await Promise.all([
      prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: { isAvailable: true } }),
      prisma.product.count({ where: { isAvailable: true, stockQuantity: { lte: 15 } } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        _count: true,
        where: { paymentStatus: "PAID", createdAt: { gte: monthStart } },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: "PAID", createdAt: { gte: previousMonthStart, lt: monthStart } },
      }),
    ]);

    const revenue = Number(currentRevenueAgg._sum.totalAmount || 0);
    const previous = Number(previousRevenueAgg._sum.totalAmount || 0);
    const trend = previous > 0 ? ((revenue - previous) / previous) * 100 : null;
    const paidOrders = currentRevenueAgg._count;

    // Real status breakdown from live orders
    const statusCounts = {
      DELIVERED: 0,
      SHIPPED: 0,
      PROCESSING: 0,
      PAID: 0,
      PENDING: 0,
      CANCELLED: 0,
      REFUNDED: 0,
    };

    allOrders.forEach((o) => {
      const s = o.status as keyof typeof statusCounts;
      if (statusCounts[s] !== undefined) {
        statusCounts[s] += 1;
      }
    });

    const statusBreakdown = [
      { label: "Commandes Livrées", status: "DELIVERED", count: statusCounts.DELIVERED, color: "#059669" },
      { label: "Expédiées (En route)", status: "SHIPPED", count: statusCounts.SHIPPED, color: "#0284c7" },
      { label: "En préparation atelier", status: "PROCESSING", count: statusCounts.PROCESSING + statusCounts.PAID, color: "#d97706" },
      { label: "En attente de paiement", status: "PENDING", count: statusCounts.PENDING, color: "#6366f1" },
      { label: "Retours & Remboursements", status: "REFUNDED", count: statusCounts.REFUNDED + statusCounts.CANCELLED, color: "#e11d48" },
    ];

    // Real 12-month revenue progression
    const monthlyRevenue = MONTH_NAMES.map((monthName, mIdx) => {
      const isCurrent = mIdx === currentMonth;
      // Filter paid orders for this specific month in current year
      const monthlyTotal = allOrders
        .filter((o) => {
          if (o.paymentStatus !== "PAID") return false;
          const d = new Date(o.createdAt);
          return d.getFullYear() === currentYear && d.getMonth() === mIdx;
        })
        .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

      return {
        month: monthName,
        value: Number(monthlyTotal.toFixed(2)),
        full: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(monthlyTotal),
        isCurrent,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        revenue,
        revenueTrend: trend,
        paidOrders,
        averageOrder: paidOrders ? revenue / paidOrders : 0,
        activeProducts: productsCount,
        lowStock: lowStockCount,
        totalOrdersCount: allOrders.length,
        statusBreakdown,
        monthlyRevenue,
        recentOrders: allOrders.slice(0, 8).map((order) => ({
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
  } catch (error) {
    console.error("Erreur API Summary:", error);
    return NextResponse.json(
      { success: false, setupRequired: true, error: "Les données réelles sont indisponibles." },
      { status: 503 }
    );
  }
}
