import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Left Sidebar 5 Column | Sellzy - Shop Layout",
  description: "A high-density shop layout with left sidebar navigation and 5-column product grid for efficient browsing.",
  openGraph: {
    title: "Shop Left Sidebar 5 Column | Sellzy - Shop Layout",
    description: "A high-density shop layout with left sidebar navigation and 5-column product grid for efficient browsing.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
