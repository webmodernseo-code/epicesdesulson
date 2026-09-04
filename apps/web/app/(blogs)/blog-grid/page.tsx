import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Grid | Sellzy - Multivendor eCommerce Template",
  description: "Explore the latest articles and insights on eCommerce trends, product reviews, and marketplace tips in a visually rich grid layout.",
  openGraph: {
    title: "Blog Grid | Sellzy - Multivendor eCommerce Template",
    description: "Explore the latest articles and insights on eCommerce trends, product reviews, and marketplace tips in a visually rich grid layout.",
  },
};

import BlogGridPost from "@/components/blog/blog-grid-post";
import Breadcrumb from "@/components/common/breadcrumb";

export default function BlogGridPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Blog Grid" }]} />
      <BlogGridPost />
    </div>
  );
}
