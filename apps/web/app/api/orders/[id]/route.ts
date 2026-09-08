import { NextRequest, NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Identifiant de commande requis." },
        { status: 400 }
      );
    }

    const order = await OrdersService.getOrderById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Commande introuvable." },
        { status: 404 }
      );
    }

    // Mask sensitive phone or address if needed, return order summary
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        discountAmount: order.discountAmount,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        items: order.items,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Erreur serveur." },
      { status: 500 }
    );
  }
}
