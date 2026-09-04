"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const colors = [
  "bg-primary",
  "bg-info",
  "bg-info-darker",
  "bg-warning",
  "bg-error-light",
  "bg-error-dark",
];

export default function FilterColor() {
  const [activeColor, setActiveColor] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-color-picker"
    >
      <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-color-title">
          <h6>Color</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="colors">
          <ul className="flex items-center flex-wrap gap-5">
            {colors.map((color, idx) => (
              <li
                key={idx}
                onClick={() =>
                  setActiveColor((prev) => (prev === color ? null : color))
                }
                className={`inline-flex items-center justify-center cursor-pointer `}
              >
                <button
                  type="button"
                  className={` inline-flex items-center justify-center ${color} rounded-full ${activeColor === color ? "size-7" : "size-5"}`}
                >
                  <i
                    className={`hgi hgi-stroke hgi-tick-02 text-white text-sm leading-[12px] transition-all duration-300 ${
                      activeColor === color ? "opacity-100 " : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
