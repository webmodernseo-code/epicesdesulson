import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Banner Left Sidebar 4 Column | Sellzy - Shop Layout",
  description: "A shop layout combining top promotional banners, sidebar filters, and a 4-column product grid.",
  openGraph: {
    title: "Top Banner Left Sidebar 4 Column | Sellzy - Shop Layout",
    description: "A shop layout combining top promotional banners, sidebar filters, and a 4-column product grid.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
