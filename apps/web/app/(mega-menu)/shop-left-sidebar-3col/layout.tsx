import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Left Sidebar 3 Column | Sellzy - Shop Layout",
  description: "A classic shop layout with left sidebar filters and a 3-column product grid with sort and pagination controls.",
  openGraph: {
    title: "Shop Left Sidebar 3 Column | Sellzy - Shop Layout",
    description: "A classic shop layout with left sidebar filters and a 3-column product grid with sort and pagination controls.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
