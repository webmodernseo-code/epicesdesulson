import BlogSearch from "./blog-search";
import CategoryContent from "./category-content";
import PopularTags from "./popular-tags";
import RecentPost from "./recent-posts";
import BlogGridCard from "./blog-grid-card";
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
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.2,
  },
  {
    image: "/images/home-3/corn-can-bg.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.3,
  },
  {
    image: "/images/home-3/hot-sauce-bg.jpg",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.4,
  },
  {
    image: "/images/home-3/tomato-ketchup-bg.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.2,
  },
  {
    image: "/images/home-3/hot-sauce-bg.jpg",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.3,
  },
  {
    image: "/images/home-3/nuts.png",
    category: "Category Name",
    date: "12:40 PM, 09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
    delay: 0.4,
  },
];

export default function BlogGridPost() {
  return (
    <div className="pb-12">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-9 col-span-12">
            <BlogFilterBar activeView="grid" />
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 pb-12">
              {BLOG_POSTS.map((post, index) => (
                <BlogGridCard key={index} {...post} />
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
