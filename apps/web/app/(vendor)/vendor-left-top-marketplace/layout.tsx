import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Marketplace - Top Sidebar | Sellzy eCommerce Template",
  description: "Explore a vendor marketplace with top-aligned vendor info and sidebar filters for a focused shopping experience.",
  openGraph: {
    title: "Vendor Marketplace - Top Sidebar | Sellzy eCommerce Template",
    description: "Explore a vendor marketplace with top-aligned vendor info and sidebar filters for a focused shopping experience.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
