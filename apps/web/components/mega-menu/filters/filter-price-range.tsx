"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CustomRangeSlider from "@/components/common/custom-range-slider";

export default function FilterPriceRange() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setPriceRange({ min: 0, max: 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-price-range"
    >
      <div className="flex flex-col gap-y-6 py-8 border-b border-gray-300 widget-price-range-title">
        <div className="flex items-center justify-between">
          <h6>Price Range</h6>
          <button
            onClick={handleReset}
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>

        <div>
          <CustomRangeSlider
            min={0}
            max={100}
            initialMin={priceRange.min}
            initialMax={priceRange.max}
            onChange={setPriceRange}
          />
        </div>

        <div className="price-range-values flex items-center justify-between gap-x-2">
          <div className="input-group small max-w-[147px] w-full rounded-[80px] py-2 px-3.5 border border-gray-200">
            <div
              className="input-group-addon inline-flex items-center justify-center leading-6 text-light-disabled-text mr-2"
              data-align="inline-start"
            >
              $
            </div>
            <input
              className="price-range-min-value form-control p-0! text-light-primary-text font-medium"
              readOnly
              type="text"
              value={priceRange.min}
            />
          </div>
          <span className="text-sm leading-[22px] text-light-disabled-text">
            To
          </span>
          <div className="input-group small max-w-[147px] w-full rounded-[80px] py-2 px-3.5 border border-gray-200">
            <div
              className="input-group-addon inline-flex items-center justify-center leading-6 text-light-disabled-text mr-2"
              data-align="inline-start"
            >
              $
            </div>
            <input
              className="price-range-max-value form-control p-0! text-light-primary-text font-medium"
              readOnly
              type="text"
              value={priceRange.max}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
