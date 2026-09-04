"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const RECENT_POSTS = [
  {
    image: "/images/home-3/nuts.png",
    title: "The Future of Industrial Design",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    href: "/blog-grid/1",
  },
  {
    image: "/images/home-3/hot-sauce-bg.jpg",
    title: "The Future of Industrial Design",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    href: "/blog-grid/1",
  },
  {
    image: "/images/home-3/corn-can-bg.png",
    title: "The Future of Industrial Design",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    href: "/blog-grid/1",
  },
];

export default function RecentPost() {
  return (
    <motion.div
      className="border border-gray-300 rounded-2xl category"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="px-6 py-4 bg-gray-200 rounded-t-2xl sidebar-title">
        <h5 className="text-light-primary-text">Recent Posts</h5>
      </div>
      <div className="recent-posts-content p-6">
        <div className="flex flex-col divide-y divide-gray-300">
          {/* posts */}
          {RECENT_POSTS.map((post, index) => (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <div className="p-4 border border-gray-300 rounded-2xl single-blog-post">
                <div className="flex items-center flex-row xl:flex-col 2xl:flex-row gap-3">
                  <div className="w-[88px] h-[88px] min-w-[88px] rounded-lg single-blog-post-thumbnail relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="88px"
                    />
                  </div>
                  <div className="flex flex-col 2xl:items-start xl:items-center gap-y-2 flex-1 single-blog-post-content">
                    <Link
                      href={post.href}
                      className="text-sm leading-[22px] text-light-primary-text font-medium cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out single-blog-post-content-title"
                    >
                      {post.title}
                    </Link>
                    <span className="w-fit text-success-dark bg-[rgba(84,214,44,0.16)] px-2 py-px inline-flex items-center rounded-full text-xs leading-[18px] single-blog-post-content-category-name">
                      {post.category}
                    </span>
                    <div className="flex flex-col gap-y-1 xl:flex-row md:flex-row divide-x-0 md:divide-x divide-[rgba(145,158,171,0.24)] single-blog-post-content-post-time">
                      <p className="inline-flex items-center gap-x-2 pr-0 md:pr-3">
                        <i className="hgi hgi-stroke hgi-calendar-03 text-base leading-4" />
                        <span className="text-xs leading-[18px]">
                          {post.date}
                        </span>
                      </p>
                      <p className="inline-flex items-center gap-x-2 pl-0 md:pl-3 mt-1 md:mt-0 xl:mt-0">
                        <i className="hgi hgi-stroke hgi-chatting-01 text-base leading-4" />
                        <span className="text-xs leading-[18px]">
                          ({post.comments})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
