import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Filter 4 Column | Sellzy - Shop Layout",
  description: "Browse a 4-column product grid with a horizontal filter bar for streamlined product discovery.",
  openGraph: {
    title: "Horizontal Filter 4 Column | Sellzy - Shop Layout",
    description: "Browse a 4-column product grid with a horizontal filter bar for streamlined product discovery.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
