"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckboxItem } from "./checkbox-item";

const packSizes = [
  { name: "400 to 500 g", count: 40 },
  { name: "500 to 700 g", count: 20 },
  { name: "700 to 1 kg", count: 32 },
  { name: "120 - 150 g each vacuum", count: 20 },
  { name: "1 pc", count: "09" },
];

export default function FilterPackSize() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-pack-size"
    >
      <div className="flex flex-col gap-y-4 pt-8">
        <div className="flex items-center justify-between">
          <h6>Pack Size</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="pack-size-lists">
          <ul className="flex flex-col gap-y-2">
            {packSizes.map((packSize, index) => (
              <CheckboxItem
                key={index}
                name={packSize.name}
                count={packSize.count}
                listItemClass="pack-size-list-item"
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
