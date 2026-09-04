import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner List Without Sidebar | Sellzy - Shop Layout",
  description: "Browse products in a clean 2-column list view without sidebar distractions, focused on product details.",
  openGraph: {
    title: "Banner List Without Sidebar | Sellzy - Shop Layout",
    description: "Browse products in a clean 2-column list view without sidebar distractions, focused on product details.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
