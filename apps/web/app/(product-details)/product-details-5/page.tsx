import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details V5 | Sellzy - Multivendor eCommerce Template",
  description: "A full-width product detail page with immersive image previews and comprehensive product comparison options.",
  openGraph: {
    title: "Product Details V5 | Sellzy - Multivendor eCommerce Template",
    description: "A full-width product detail page with immersive image previews and comprehensive product comparison options.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import FrequentlyBoughtItems from "@/components/product-details/product-details-five/frequently-bought-items";
import ProductDetailsFive from "@/components/product-details/product-details-five/product-details-five";
import ProductDetailsFiveFaq from "@/components/product-details/product-details-five/product-details-five-faq";
import RelatedProductFive from "@/components/product-details/product-details-five/related-product-five";

export default function ProductDetails5Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Product Details 5" }]} />
      <ProductDetailsFive />
      <FrequentlyBoughtItems />
      <ProductDetailsFiveFaq />
      <RelatedProductFive />
    </div>
  );
}
