import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendors List | Sellzy - Multivendor eCommerce Template",
  description: "Browse all marketplace vendors in a detailed list view with store descriptions, ratings, and follower counts.",
  openGraph: {
    title: "Vendors List | Sellzy - Multivendor eCommerce Template",
    description: "Browse all marketplace vendors in a detailed list view with store descriptions, ratings, and follower counts.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
