import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog List | Sellzy - Multivendor eCommerce Template",
  description: "Browse through our curated list of blog posts covering eCommerce best practices, industry news, and expert guides.",
  openGraph: {
    title: "Blog List | Sellzy - Multivendor eCommerce Template",
    description: "Browse through our curated list of blog posts covering eCommerce best practices, industry news, and expert guides.",
  },
};

import BlogListPost from "@/components/blog/blog-list-post";
import Breadcrumb from "@/components/common/breadcrumb";

export default function BlogListPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Blog List" }]} />
      <BlogListPost />
    </div>
  );
}
