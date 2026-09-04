import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful | Sellzy - Multivendor eCommerce Template",
  description: "Your order has been placed successfully. View your order confirmation details and estimated delivery timeline.",
  openGraph: {
    title: "Order Successful | Sellzy - Multivendor eCommerce Template",
    description: "Your order has been placed successfully. View your order confirmation details and estimated delivery timeline.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import FaqFeatureGrid from "@/components/faq/faq-feature-grid";
import OrderWrapper from "@/components/order/order-wrapper";
import RecentlyViewedProduct from "@/components/order/recently-viewed-product";
import SuccessScreen from "@/components/order/success-screen";

export default function OrderSuccessfulPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Order Successful" }]} />
      <SuccessScreen />
      <OrderWrapper />
      <div className="pt-17.5">
        <FaqFeatureGrid />
      </div>
      <RecentlyViewedProduct />
    </div>
  );
}
