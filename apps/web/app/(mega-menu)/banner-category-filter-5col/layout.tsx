import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Category Filter 5 Column | Sellzy - Shop Layout",
  description: "Discover products in a dense 5-column grid with banner-driven category navigation and quick-view support.",
  openGraph: {
    title: "Banner Category Filter 5 Column | Sellzy - Shop Layout",
    description: "Discover products in a dense 5-column grid with banner-driven category navigation and quick-view support.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
