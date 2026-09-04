"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

export default function FilterSize() {
  const [activeSize, setActiveSize] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-size-picker"
    >
      <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-size-title">
          <h6>Size</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="sizes">
          <ul className="flex items-center flex-wrap gap-3">
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() =>
                  setActiveSize((prev) => (prev === size ? null : size))
                }
              >
                <button
                  type="button"
                  className={`btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px] ${
                    activeSize === size
                      ? "bg-primary text-white border-primary"
                      : ""
                  }`}
                >
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
