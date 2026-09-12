import { NextRequest, NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, error: "Non autorisé." }, { status: 401 });
  }
  try {
    const orders = await OrdersService.listOrders();
    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to list orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = await OrdersService.createOrder(body);

    return NextResponse.json(
      {
        success: true,
        message: "Commande créée avec succès.",
        data: order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 400 }
    );
  }
}
