"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BlogGridCard from "@/components/blog/blog-grid-card";

const BLOGS = [
  {
    image: "/images/blog/blog-grid-4.png",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/1",
  },
  {
    image: "/images/blog/blog-grid-3.png",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/2",
  },
  {
    image: "/images/blog/blog-grid-2.png",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/3",
  },
  {
    image: "/images/blog/blog-grid-1.png",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/4",
  },
  {
    image: "/images/blog/blog-grid-4.png",
    category: "Category Name",
    date: "09 Feb 2027",
    comments: 10,
    title: "The Future of Industrial Design",
    description:
      "So you have heard about this site or you have been to it, but you cannot figure out.",
    href: "/blog-grid/5",
  },
];

export default function RelatedBlogPost() {
  return (
    <section className="mb-[70px]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-10">
            <h3>Related Article</h3>
            <div className="related-post-slider-nav flex items-center gap-x-6 z-10 pointer-events-none">
              <button className="related-post-slider-nav-prev size-12 inline-flex items-center bg-[rgba(145,158,171,0.08)] justify-center rounded-full  hover:bg-primary hover:text-white transition-all pointer-events-auto shadow-[0px_4px_10px_0px_transparent]">
                <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
              </button>
              <button className="related-post-slider-nav-next size-12 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-primary hover:text-white transition-all pointer-events-auto shadow-[0px_4px_10px_0px_transparent]">
                <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="related-post-slider-wrapper">
          <div className="-mx-3 sellzy-slider relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 7000 }}
              navigation={{
                nextEl: ".related-post-slider-nav-next",
                prevEl: ".related-post-slider-nav-prev",
              }}
              breakpoints={{
                480: { slidesPerView: 1 },
                769: { slidesPerView: 2 },
                1025: { slidesPerView: 4 },
                1441: { slidesPerView: 4 },
                1600: { slidesPerView: 4 },
              }}
            >
              {BLOGS.map((blog, index) => (
                <SwiperSlide key={index}>
                  <div className="px-3 pb-5 pt-2 h-full">
                    <BlogGridCard {...blog} delay={0.1 + index * 0.1} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
