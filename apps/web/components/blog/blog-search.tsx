"use client";

import { motion } from "framer-motion";

export default function BlogSearch() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="input-group medium pl-4 py-4 pr-2.5 rounded-[100px] flex-1 lg:flex hidden"
    >
      <div
        className="input-group-addon inline-flex items-center justify-center leading-6"
        data-align="inline-start"
      >
        <span className="inline-flex items-center justify-center">
          <i className="hgi hgi-stroke hgi-search-01 text-2xl leading-6 text-light-primary-text" />
        </span>
      </div>
      <input
        type="text"
        className="peer form-control placeholder-transparent focus:placeholder-transparent"
        id="sidebar-search"
        placeholder="Search..."
      />
      <label
        htmlFor="sidebar-search"
        className="absolute left-12 peer-focus:left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
      >
        Search...
      </label>
    </motion.div>
  );
}
