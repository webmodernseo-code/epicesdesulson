import BlogSearch from "./blog-search";
import CategoryContent from "./category-content";
import PopularTags from "./popular-tags";
import RecentPost from "./recent-posts";
import BlogListCard from "./blog-list-card";
import BlogPagination from "./blog-pagination";
import BlogFilterBar from "./blog-filter-bar";

const BLOG_POSTS = [
  {
    image: "/images/home-3/nuts.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine.",
    href: "/blog-list/1",
    delay: 0.2,
  },
  {
    image: "/images/home-3/corn-can-bg.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine.",
    href: "/blog-list/1",
    delay: 0.3,
  },
  {
    image: "/images/home-3/tomato-ketchup-bg.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine.",
    href: "/blog-list/1",
    delay: 0.4,
  },
  {
    image: "/images/home-3/hot-sauce-bg.jpg",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine.",
    href: "/blog-list/1",
    delay: 0.5,
  },
];

export default function BlogListPost() {
  return (
    <div className="pb-12">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-9 col-span-12">
            <BlogFilterBar activeView="list" />

            <div className="grid grid-cols-1 gap-y-6 pb-12">
              {BLOG_POSTS.map((post, index) => (
                <BlogListCard key={index} {...post} />
              ))}
            </div>

            {/* pagination */}
            <BlogPagination />
          </div>

          <div className="xl:col-span-3 col-span-12">
            <div className="sticky top-4">
              <div className="flex flex-col gap-y-6">
                <BlogSearch />
                {/* Category-content */}
                <CategoryContent />
                {/* Popular Tags */}
                <PopularTags />
                {/* Recent Posts */}
                <RecentPost />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
