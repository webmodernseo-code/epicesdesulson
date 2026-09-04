import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details V3 | Sellzy - Multivendor eCommerce Template",
  description: "A tabbed product detail page featuring descriptions, additional info, and customer ratings in an organized layout.",
  openGraph: {
    title: "Product Details V3 | Sellzy - Multivendor eCommerce Template",
    description: "A tabbed product detail page featuring descriptions, additional info, and customer ratings in an organized layout.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import ProductDetailsThree from "@/components/product-details/product-details-three/product-details-three";
import ProductDetailsThreeTab from "@/components/product-details/product-details-three/product-details-three-tab";
import RelatedProductThree from "@/components/product-details/product-details-three/related-product-three";

export default function ProductDetails3Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Product Details 3" }]} />
      <ProductDetailsThree />
      <ProductDetailsThreeTab />
      <RelatedProductThree />
    </div>
  );
}
