import { NextResponse } from "next/server";
import { ProductsService } from "@/lib/products-service";

export async function GET() {
  try {
    const products = await ProductsService.getAllProducts();
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
