import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Account | Sellzy - Multivendor eCommerce Template",
  description: "Manage your vendor profile, update store settings, and track your marketplace performance from your account dashboard.",
  openGraph: {
    title: "Vendor Account | Sellzy - Multivendor eCommerce Template",
    description: "Manage your vendor profile, update store settings, and track your marketplace performance from your account dashboard.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import Features from "@/components/vendor/features";
import HowItWorks from "@/components/vendor/how-it-works";
import VendorAccountForm from "@/components/vendor/vendor-account-form";
import WhyChooseUs from "@/components/vendor/why-choose-us";

export default function VendorAccountPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "Sellers",
            href: "#",
          },
          {
            label: "Vendor Account",
          },
        ]}
      />
      <VendorAccountForm />
      <WhyChooseUs />
      <Features />
      <HowItWorks />
    </div>
  );
}
