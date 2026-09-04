import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";

export async function GET() {
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
