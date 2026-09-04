import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Sellzy - Multivendor eCommerce Template",
  description: "Manage your account settings, view order history, update addresses, and control your marketplace preferences.",
  openGraph: {
    title: "My Account | Sellzy - Multivendor eCommerce Template",
    description: "Manage your account settings, view order history, update addresses, and control your marketplace preferences.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
