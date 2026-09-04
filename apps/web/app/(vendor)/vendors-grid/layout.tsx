import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendors Grid | Sellzy - Multivendor eCommerce Template",
  description: "Discover verified vendors in a grid layout. View store ratings, product counts, and follow your favorite sellers.",
  openGraph: {
    title: "Vendors Grid | Sellzy - Multivendor eCommerce Template",
    description: "Discover verified vendors in a grid layout. View store ratings, product counts, and follow your favorite sellers.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
