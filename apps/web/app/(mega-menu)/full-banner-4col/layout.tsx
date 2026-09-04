import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Banner 4 Column Shop | Sellzy - Shop Layout",
  description: "A full-banner shop page with 4-column grid layout featuring pagination, sorting, and product quick-view.",
  openGraph: {
    title: "Full Banner 4 Column Shop | Sellzy - Shop Layout",
    description: "A full-banner shop page with 4-column grid layout featuring pagination, sorting, and product quick-view.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
