import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Banner Left Sidebar 3 Column | Sellzy - Shop Layout",
  description: "Shop with a prominent top banner, left sidebar filters, and 3-column product grid for a balanced browsing experience.",
  openGraph: {
    title: "Top Banner Left Sidebar 3 Column | Sellzy - Shop Layout",
    description: "Shop with a prominent top banner, left sidebar filters, and 3-column product grid for a balanced browsing experience.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
