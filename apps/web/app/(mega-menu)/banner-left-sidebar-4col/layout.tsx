import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Left Sidebar 4 Column | Sellzy - Shop Layout",
  description: "Browse a 4-column product grid with left sidebar filtering and promotional banners for highlighted deals.",
  openGraph: {
    title: "Banner Left Sidebar 4 Column | Sellzy - Shop Layout",
    description: "Browse a 4-column product grid with left sidebar filtering and promotional banners for highlighted deals.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
