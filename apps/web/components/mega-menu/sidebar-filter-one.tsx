"use client";
import { motion } from "framer-motion";
import FilterCategory from "./filters/filter-category";
import FilterPriceRange from "./filters/filter-price-range";
import FilterRating from "./filters/filter-rating";
import FilterColor from "./filters/filter-color";
import FilterSize from "./filters/filter-size";
import FilterDiscount from "./filters/filter-discount";
import FilterBrand from "./filters/filter-brand";
import FilterPackSize from "./filters/filter-pack-size";

export default function SidebarFilterOne() {
  return (
    <div className="sidebar sticky top-20">
      <div className="border border-gray-300 rounded-2xl">
        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 py-4 bg-gray-200 rounded-t-2xl sidebar-title"
        >
          <div className="flex items-center justify-between">
            <h5 className="text-light-primary-text">Filters</h5>
            <a
              href="#"
              className="text-primary text-base leading-[26px] font-semibold hover:underline"
            >
              Clear All
            </a>
          </div>
        </motion.div>

        <div className="px-6 py-6">
          <FilterCategory />
          <FilterPriceRange />
          <FilterRating />
          <FilterColor />
          <FilterSize />
          <FilterDiscount />
          <FilterBrand />
          <FilterPackSize />
        </div>
      </div>
    </div>
  );
}
