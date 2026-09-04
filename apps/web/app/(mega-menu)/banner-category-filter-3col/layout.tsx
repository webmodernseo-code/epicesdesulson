import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner Category Filter 3 Column | Sellzy - Shop Layout",
  description: "Browse products with a banner-style category filter in a 3-column grid layout with advanced sorting and filtering.",
  openGraph: {
    title: "Banner Category Filter 3 Column | Sellzy - Shop Layout",
    description: "Browse products with a banner-style category filter in a 3-column grid layout with advanced sorting and filtering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
