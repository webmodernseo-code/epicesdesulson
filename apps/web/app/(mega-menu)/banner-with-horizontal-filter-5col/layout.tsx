import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Filter 5 Column | Sellzy - Shop Layout",
  description: "Explore a 5-column product grid with horizontal filtering for an efficient, space-optimized shopping experience.",
  openGraph: {
    title: "Horizontal Filter 5 Column | Sellzy - Shop Layout",
    description: "Explore a 5-column product grid with horizontal filtering for an efficient, space-optimized shopping experience.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
