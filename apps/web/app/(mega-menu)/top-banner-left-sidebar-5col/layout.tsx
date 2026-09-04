import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Banner Left Sidebar 5 Column | Sellzy - Shop Layout",
  description: "A shop layout with top banner promotion, left sidebar filtering, and a 5-column product grid.",
  openGraph: {
    title: "Top Banner Left Sidebar 5 Column | Sellzy - Shop Layout",
    description: "A shop layout with top banner promotion, left sidebar filtering, and a 5-column product grid.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
