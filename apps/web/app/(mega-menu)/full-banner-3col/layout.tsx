import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Banner 3 Column Shop | Sellzy - Shop Layout",
  description: "A full-width banner shop layout with 3-column product grid, perfect for showcasing featured collections.",
  openGraph: {
    title: "Full Banner 3 Column Shop | Sellzy - Shop Layout",
    description: "A full-width banner shop layout with 3-column product grid, perfect for showcasing featured collections.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
