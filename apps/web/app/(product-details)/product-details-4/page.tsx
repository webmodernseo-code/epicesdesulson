import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details V4 | Sellzy - Multivendor eCommerce Template",
  description: "A clean, modern product page with sticky add-to-cart functionality and detailed product breakdowns.",
  openGraph: {
    title: "Product Details V4 | Sellzy - Multivendor eCommerce Template",
    description: "A clean, modern product page with sticky add-to-cart functionality and detailed product breakdowns.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import ProductDetailsFour from "@/components/product-details/product-details-four/product-details-four";
import ProductDetailsTabFour from "@/components/product-details/product-details-four/product-details-tab-four";
import RelatedProductFour from "@/components/product-details/product-details-four/related-product-four";

export default function ProductDetails4Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Product Details 4" }]} />
      <ProductDetailsFour />
      <ProductDetailsTabFour />
      <RelatedProductFour />
    </div>
  );
}
