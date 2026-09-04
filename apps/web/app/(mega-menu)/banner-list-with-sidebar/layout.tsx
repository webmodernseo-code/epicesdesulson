import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner List With Sidebar | Sellzy - Shop Layout",
  description: "View products in a detailed list format with sidebar filters and banner promotions for a comprehensive shopping view.",
  openGraph: {
    title: "Banner List With Sidebar | Sellzy - Shop Layout",
    description: "View products in a detailed list format with sidebar filters and banner promotions for a comprehensive shopping view.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
