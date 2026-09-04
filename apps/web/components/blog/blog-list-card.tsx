"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogListCardProps {
  image: string;
  category: string;
  date: string;
  comments: number;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export default function BlogListCard({
  image,
  category,
  date,
  comments,
  title,
  description,
  href,
  delay = 0.2,
}: BlogListCardProps) {
  return (
    <motion.div
      className="col-span-1"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="border border-gray-300 rounded-2xl p-6 hover:transform hover:translate-y-[-5px] hover:transition-all hover:ease-[cubic-bezier(0.02,0.01,0.47,1)] hover:duration-250 transition-all ease-[cubic-bezier(0.02,0.01,0.47,1)] duration-250 blog-single-item">
        <div className="flex items-center flex-col lg:flex-row gap-10">
          <div className="w-full lg:max-w-[500px] h-[380px] blog-single-item-thumbnail relative">
            <Link href={href} className="block w-full h-full">
              <Image
                src={image}
                alt={title}
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-y-6 flex-1">
            <span className="w-fit text-warning-dark bg-[rgba(255,193,7,0.16)] px-2 py-px inline-flex rounded-full text-xs leading-[18px] blog-single-item-category">
              {category}
            </span>
            <div className="flex flex-col gap-y-3 md:flex-row divide-x-0 md:divide-x divide-[rgba(145,158,171,0.24)]">
              <p className="text-light-secondary-text text-sm leading-[22px] inline-flex items-center gap-x-2 pr-0 md:pr-3 blog-single-item-post-time">
                <span className="inline-flex items-center justify-center">
                  <i className="hgi hgi-stroke hgi-calendar-03 text-base leading-4 text-light-secondary-text" />
                </span>
                <span>{date}</span>
              </p>
              <p className="text-light-secondary-text text-sm leading-[22px] inline-flex items-center gap-x-2 pl-0 md:pl-3 blog-single-item-comment">
                <span className="inline-flex items-center justify-center">
                  <i className="hgi hgi-stroke hgi-chatting-01 text-base text-light-secondary-text" />
                </span>
                <span>Comment</span>
                <span>({comments})</span>
              </p>
            </div>
            <div>
              <Link href={href}>
                <h5 className="text-light-primary-text hover:text-primary transition-colors duration-300 ease-in-out cursor-pointer mb-3 blog-single-item-title">
                  {title}
                </h5>
              </Link>
              <p className="mb-5 line-clamp-6 blog-single-item-description">
                {description}
              </p>
              <Link
                href={href}
                className="btn btn-primary btn-large rounded-[60px] group py-2 pl-6 pr-3 gap-x-[18px] inline-flex items-center"
              >
                Read More
                <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl text-primary-darker" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
