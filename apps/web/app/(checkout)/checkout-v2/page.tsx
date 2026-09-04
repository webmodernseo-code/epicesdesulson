import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout V2 | Sellzy - Multivendor eCommerce Template",
  description: "Experience our enhanced checkout flow with a modern, step-by-step interface for a faster, more intuitive purchasing process.",
  openGraph: {
    title: "Checkout V2 | Sellzy - Multivendor eCommerce Template",
    description: "Experience our enhanced checkout flow with a modern, step-by-step interface for a faster, more intuitive purchasing process.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import CheckoutV2Page from "@/components/checkout/checkout-v2/checkout-v2-page";

export default function CheckoutV2() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Checkout v2" }]} />
      <CheckoutV2Page />
    </div>
  );
}
