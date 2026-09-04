"use client";

import { motion } from "framer-motion";
export default function BlogPagination() {
  return (
    <motion.div
      className="grid grid-cols-12"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="col-span-12">
        <ul className="flex items-center justify-center gap-x-1.5 blog-pagination">
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] bg-white cursor-pointer border border-gray-300 group-hover:font-semibold group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-arrow-left-01 text-[20px] group-hover:font-semibold leading-5 text-light-primary-text group-hover:text-primary" />
              </span>
            </a>
          </li>
          <li className="group blog-pagination-item ">
            <a
              href="#"
              className="inline-flex active items-center justify-center md:size-10 size-9 rounded-[50px] "
            >
              1
            </a>
          </li>
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              2
            </a>
          </li>
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              3
            </a>
          </li>
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              4
            </a>
          </li>
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              5
            </a>
          </li>
          <li className="blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] bg-white"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-more-horizontal text-[20px] leading-5 text-light-primary-text" />
              </span>
            </a>
          </li>
          <li className="group blog-pagination-item">
            <a
              href="#"
              className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[#00AB5508] transition-colors duration-300 ease-in-out"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-arrow-right-01 text-[20px] leading-5 group-hover:font-semibold text-light-primary-text group-hover:text-primary" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
