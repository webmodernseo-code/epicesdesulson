import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Banner 5 Column Shop | Sellzy - Shop Layout",
  description: "A full-width banner shop with 5-column product grid for high-density product browsing and discovery.",
  openGraph: {
    title: "Full Banner 5 Column Shop | Sellzy - Shop Layout",
    description: "A full-width banner shop with 5-column product grid for high-density product browsing and discovery.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
