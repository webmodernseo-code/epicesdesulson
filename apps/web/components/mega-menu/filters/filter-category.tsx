"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckboxItem } from "./checkbox-item";

const categories = [
  { name: "Thermometers", count: 29 },
  { name: "Oximeters", count: 5 },
  { name: "BP Monitors", count: 1 },
  { name: "Personal Care", count: 1 },
  { name: "Personal Care", count: 1 },
  { name: "Personal Care", count: 1 },
  { name: "Personal Care", count: 1 },
];

export default function FilterCategory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-category"
    >
      <div className="flex flex-col gap-y-4 pb-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-category-title">
          <h6>Category</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="input-group medium pl-4 py-2 pr-2.5 rounded-[100px] widget-category-search relative w-full">
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
            id="search"
            className="peer form-control placeholder-transparent focus:placeholder-transparent focus:outline-none"
            placeholder="Search"
          />
          <label
            htmlFor="search"
            className="absolute left-12 top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:left-[14px] peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
          >
            Search
          </label>
        </div>
        <div className="widget-category-content-list">
          <div className="max-h-[170px] overflow-y-auto pr-2.5 category-scroll">
            <ul className="flex flex-col gap-y-2">
              {categories.map((category, index) => (
                <CheckboxItem
                  key={index}
                  name={category.name}
                  count={category.count}
                  listItemClass="widget-category-content-list-items"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
