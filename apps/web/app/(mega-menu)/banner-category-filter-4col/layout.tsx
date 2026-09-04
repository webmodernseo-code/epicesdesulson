import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Category Filter 4 Column | Sellzy - Shop Layout",
  description: "Explore products in a spacious 4-column grid with banner category filtering for a refined shopping experience.",
  openGraph: {
    title: "Banner Category Filter 4 Column | Sellzy - Shop Layout",
    description: "Explore products in a spacious 4-column grid with banner category filtering for a refined shopping experience.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
