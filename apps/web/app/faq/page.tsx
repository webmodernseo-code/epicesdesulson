import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sellzy - Multivendor eCommerce Template",
  description: "Find answers to frequently asked questions about orders, payments, shipping, returns, and vendor onboarding.",
  openGraph: {
    title: "FAQ | Sellzy - Multivendor eCommerce Template",
    description: "Find answers to frequently asked questions about orders, payments, shipping, returns, and vendor onboarding.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import FaqFeatureGrid from "@/components/faq/faq-feature-grid";
import FaqHero from "@/components/faq/faq-hero";
import FaqTab from "@/components/faq/faq-tab";

export default function FaqPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "FAQ",
          },
        ]}
      />
      <FaqHero />
      <FaqTab />
      <FaqFeatureGrid />
    </div>
  );
}
