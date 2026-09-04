import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Filter 6 Column | Sellzy - Shop Layout",
  description: "View products in a dense 6-column grid with horizontal category and price filters for maximum efficiency.",
  openGraph: {
    title: "Horizontal Filter 6 Column | Sellzy - Shop Layout",
    description: "View products in a dense 6-column grid with horizontal category and price filters for maximum efficiency.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
