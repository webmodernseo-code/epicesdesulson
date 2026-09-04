"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckboxItem } from "./checkbox-item";

const brands = [
  { name: "Mediguard", count: 8 },
  { name: "HealthPlus", count: 7 },
  { name: "BioCare", count: 3 },
  { name: "SmartAid", count: 1 },
  { name: "Personal Care", count: 1 },
  { name: "SmartAid", count: 3 },
];

export default function FilterBrand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-brand"
    >
      <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-brand-title">
          <h6>Brand</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="brand-content-list">
          <div className="max-h-[170px] overflow-y-auto pr-2.5 category-scroll">
            <ul className="flex flex-col gap-y-2">
              {brands.map((brand, index) => (
                <CheckboxItem
                  key={index}
                  name={brand.name}
                  count={brand.count}
                  listItemClass="brand-list-item"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
