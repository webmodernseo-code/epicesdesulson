import BlogPostDetails from "@/components/blog/blog-post-details";
import RelatedBlogPost from "@/components/blog/related-blog-post";
import Breadcrumb from "@/components/common/breadcrumb";

interface CommonBlogDetailsProps {
  breadcrumbLabel: string;
  breadcrumbHref: string;
  title?: string;
}

export default function CommonBlogDetails({
  breadcrumbLabel,
  breadcrumbHref,
  title = "Why Online Shopping Is the Future of Retail",
}: CommonBlogDetailsProps) {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: breadcrumbLabel, href: breadcrumbHref },
          { label: title },
        ]}
      />
      <BlogPostDetails />
      <RelatedBlogPost />
    </div>
  );
}
