import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Left Sidebar 4 Column | Sellzy - Shop Layout",
  description: "Browse products in a 4-column grid with left sidebar filtering for categories, price ranges, and brands.",
  openGraph: {
    title: "Shop Left Sidebar 4 Column | Sellzy - Shop Layout",
    description: "Browse products in a 4-column grid with left sidebar filtering for categories, price ranges, and brands.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
