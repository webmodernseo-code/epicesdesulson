import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist V2 | Sellzy - Multivendor eCommerce Template",
  description: "Manage your wishlist with an enhanced table view. Select multiple items, adjust quantities, and add to cart in bulk.",
  openGraph: {
    title: "Wishlist V2 | Sellzy - Multivendor eCommerce Template",
    description: "Manage your wishlist with an enhanced table view. Select multiple items, adjust quantities, and add to cart in bulk.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
