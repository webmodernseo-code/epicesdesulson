import type { Metadata } from "next";
import CommonBlogDetails from "@/components/blog/common-blog-details";

export const metadata: Metadata = {
  title: "Blog Post | Sellzy - Multivendor eCommerce Template",
  description: "Read in-depth articles on eCommerce strategies, product guides, and marketplace trends from our expert contributors.",
  openGraph: {
    title: "Blog Post | Sellzy - Multivendor eCommerce Template",
    description: "Read in-depth articles on eCommerce strategies, product guides, and marketplace trends from our expert contributors.",
  },
};

export default function BlogDetailsPage() {
  return (
    <CommonBlogDetails
      breadcrumbLabel="Blog List"
      breadcrumbHref="/blog-list"
    />
  );
}
