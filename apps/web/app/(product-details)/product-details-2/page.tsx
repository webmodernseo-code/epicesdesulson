import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details V2 | Sellzy - Multivendor eCommerce Template",
  description: "An alternative product detail layout with enhanced image galleries and side-by-side product specifications.",
  openGraph: {
    title: "Product Details V2 | Sellzy - Multivendor eCommerce Template",
    description: "An alternative product detail layout with enhanced image galleries and side-by-side product specifications.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import CommonFeatureGrid from "@/components/common/common-feature-grid";
import ProductDetailsTwo from "@/components/product-details/product-details-two/product-details-two";
import RelatedProductTwo from "@/components/product-details/product-details-two/related-product-two";
import ProductDetailsTwoTab from "@/components/product-details/product-details-two/product-details-two-tab";

export default function ProductDetails2Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Product Details 2" }]} />
      <ProductDetailsTwo />
      <CommonFeatureGrid />
      <ProductDetailsTwoTab />
      <RelatedProductTwo />
    </div>
  );
}
