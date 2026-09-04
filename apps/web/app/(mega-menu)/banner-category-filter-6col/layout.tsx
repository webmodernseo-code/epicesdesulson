import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Category Filter 6 Column | Sellzy - Shop Layout",
  description: "View products in a compact 6-column grid with banner-based category filters for maximum product visibility.",
  openGraph: {
    title: "Banner Category Filter 6 Column | Sellzy - Shop Layout",
    description: "View products in a compact 6-column grid with banner-based category filters for maximum product visibility.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
