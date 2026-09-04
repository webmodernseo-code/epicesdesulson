import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details V6 | Sellzy - Multivendor eCommerce Template",
  description: "A gallery-focused product page with thumbnail navigation, color swatches, and real-time stock availability.",
  openGraph: {
    title: "Product Details V6 | Sellzy - Multivendor eCommerce Template",
    description: "A gallery-focused product page with thumbnail navigation, color swatches, and real-time stock availability.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import ProductDetailsSix from "@/components/product-details/product-details-six";

export default function ProductDetails6Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Product Details 6" }]} />
      <ProductDetailsSix />
    </div>
  );
}
