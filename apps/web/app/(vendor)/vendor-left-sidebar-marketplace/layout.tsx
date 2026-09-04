import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Marketplace - Left Sidebar | Sellzy eCommerce Template",
  description: "Browse a vendor marketplace with left sidebar navigation, featuring vendor profiles, ratings, and curated product listings.",
  openGraph: {
    title: "Vendor Marketplace - Left Sidebar | Sellzy eCommerce Template",
    description: "Browse a vendor marketplace with left sidebar navigation, featuring vendor profiles, ratings, and curated product listings.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
