"use client";

import { motion } from "framer-motion";

export default function PopularTags() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="border border-gray-300 rounded-2xl category"
    >
      <div className="px-6 py-4 bg-gray-200 rounded-t-2xl sidebar-title">
        <h5 className="text-light-primary-text">Popular Tags</h5>
      </div>
      <div className="popular-tags-content p-6">
        <div className="flex flex-wrap items-center gap-4">
          <button className="btn btn-default outline text-sm leading-[22px] font-normal py-1 px-3 rounded-[50px] cursor-pointer shadow-none">
            Best Sellers
          </button>
          <button className="btn btn-default outline text-sm leading-[22px] font-normal py-1 px-3 rounded-[50px] cursor-pointer shadow-none">
            Trends
          </button>
          <button className="btn btn-default outline text-sm leading-[22px] font-normal py-1 px-3 rounded-[50px] cursor-pointer shadow-none">
            TrendingNow
          </button>
          <button className="btn btn-default outline text-sm leading-[22px] font-normal py-1 px-3 rounded-[50px] cursor-pointer shadow-none">
            NewArrivals
          </button>
        </div>
      </div>
    </motion.div>
  );
}
