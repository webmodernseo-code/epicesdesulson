"use client";
import React from "react";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

const ratings = [5, 4, 3, 2, 1];

export default function FilterRating() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="widget-rating"
    >
      <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
        <div className="flex items-center justify-between widget-rating-title">
          <h6 className="text-light-primary-text">Rating</h6>
          <a
            href="#"
            className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Reset
          </a>
        </div>
        <div className="ratings">
          <ul className="flex items-center flex-wrap gap-3">
            {ratings.map((rating) => (
              <li key={rating}>
                <a
                  href="#"
                  className="btn btn-default outline shadow-none gap-x-1.5 items-center text-base leading-6 px-2.5 py-1.5 rounded-[80px]"
                >
                  {rating}
                  <StarRating rating={rating} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
