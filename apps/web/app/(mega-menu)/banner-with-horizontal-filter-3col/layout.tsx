import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Filter 3 Column | Sellzy - Shop Layout",
  description: "Shop with a top horizontal filter bar and 3-column product grid for quick category and price filtering.",
  openGraph: {
    title: "Horizontal Filter 3 Column | Sellzy - Shop Layout",
    description: "Shop with a top horizontal filter bar and 3-column product grid for quick category and price filtering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
