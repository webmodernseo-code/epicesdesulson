import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Dashboard | Sellzy - Multivendor eCommerce Template",
  description: "Access your vendor control center with real-time analytics, order management, product listings, and revenue tracking.",
  openGraph: {
    title: "Vendor Dashboard | Sellzy - Multivendor eCommerce Template",
    description: "Access your vendor control center with real-time analytics, order management, product listings, and revenue tracking.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import VendorDashboardTab from "@/components/vendor-dashboard/vendor-dashboard-tab";

export default function VendorDashboardPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Vendor Dashboard" }]} />
      <VendorDashboardTab />
    </div>
  );
}
