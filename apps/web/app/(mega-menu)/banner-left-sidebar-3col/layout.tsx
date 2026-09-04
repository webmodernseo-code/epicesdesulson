import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Left Sidebar 3 Column | Sellzy - Shop Layout",
  description: "Shop with a left sidebar filter and 3-column product grid, featuring banner promotions and easy navigation.",
  openGraph: {
    title: "Banner Left Sidebar 3 Column | Sellzy - Shop Layout",
    description: "Shop with a left sidebar filter and 3-column product grid, featuring banner promotions and easy navigation.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
