import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Products | Sellzy - Multivendor eCommerce Template",
  description: "Compare products side-by-side to find the best deals. Evaluate specifications, pricing, and ratings at a glance.",
  openGraph: {
    title: "Compare Products | Sellzy - Multivendor eCommerce Template",
    description: "Compare products side-by-side to find the best deals. Evaluate specifications, pricing, and ratings at a glance.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import ComparisonTable from "@/components/compare/comparison-table";

export default function ComparePage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Compare" }]} />
      <ComparisonTable />
    </div>
  );
}
