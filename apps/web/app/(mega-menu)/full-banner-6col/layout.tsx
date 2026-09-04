import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Banner 6 Column Shop | Sellzy - Shop Layout",
  description: "A full-banner shop page with 6-column product layout for maximum product visibility on large screens.",
  openGraph: {
    title: "Full Banner 6 Column Shop | Sellzy - Shop Layout",
    description: "A full-banner shop page with 6-column product layout for maximum product visibility on large screens.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
