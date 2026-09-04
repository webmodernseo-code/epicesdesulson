"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckboxItem } from "./checkbox-item";

const discounts = [
  { name: "upto 5%", count: 10 },
  { name: "5% - 10%", count: 8 },
  { name: "10% - 15%", count: 32 },
  { name: "15% - 25%", count: 12 },
  { name: "More than 25%", count: 12 },
];

export default function FilterDiscount() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-discount"
    >
      <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-discount-title">
          <h6>Discount</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="discount">
          <ul className="flex flex-col gap-y-2">
            {discounts.map((discount, index) => (
              <CheckboxItem
                key={index}
                name={discount.name}
                count={discount.count}
                listItemClass="discount-items"
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
