import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Left Sidebar 5 Column | Sellzy - Shop Layout",
  description: "Explore a 5-column product grid with sidebar-based filtering and banner-driven promotional highlights.",
  openGraph: {
    title: "Banner Left Sidebar 5 Column | Sellzy - Shop Layout",
    description: "Explore a 5-column product grid with sidebar-based filtering and banner-driven promotional highlights.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
