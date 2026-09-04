import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Sellzy - Multivendor eCommerce Template",
  description: "Something exciting is on the way. Stay tuned for our upcoming launch and be the first to experience our new features.",
  openGraph: {
    title: "Coming Soon | Sellzy - Multivendor eCommerce Template",
    description: "Something exciting is on the way. Stay tuned for our upcoming launch and be the first to experience our new features.",
  },
};

import ComingSoonSection from "@/components/common/coming-soon";

export default function ComingSoonPage() {
  return (
    <div>
      <ComingSoonSection />
    </div>
  );
}
