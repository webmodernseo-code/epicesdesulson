import StockProductTable from "@/components/products/stock-products/stock-product-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des Stocks Épices | Les Épices de Sulson",
  description: "Inventaire et niveaux de stock des épices et coffrets Sulson.",
};

export default function StockProductsPage() {
  return (
    <div className="space-y-6">
      <StockProductTable />
    </div>
  );
}
