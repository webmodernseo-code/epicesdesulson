"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CustomFloatingSelect from "@/components/common/custom-floating-select";

interface FilterBarThreeProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onOpenFilter?: () => void;
  totalResults?: number;
  showingStart?: number;
  showingEnd?: number;
}

export default function FilterBarThree({
  viewMode,
  setViewMode,
  onOpenFilter,
  totalResults = 16,
  showingStart = 1,
  showingEnd = 12,
}: FilterBarThreeProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center justify-between pt-10 pb-12"
    >
      <div className="flex items-center gap-x-4 shrink-0 justify-start">
        {/* vendor-filter-button */}
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer transition-all",
              viewMode === "list"
                ? "btn-primary border-primary!"
                : "bg-white border border-[rgba(145,158,171,0.24)]",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <i
                className={cn(
                  "hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl leading-6",
                  viewMode === "list"
                    ? "text-white"
                    : "text-light-primary-text",
                )}
              />
            </span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer transition-all",
              viewMode === "grid"
                ? "btn-primary border-primary!"
                : "bg-white border border-[rgba(145,158,171,0.24)]",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <i
                className={cn(
                  "hgi hgi-stroke hgi-more-01 text-2xl leading-6",
                  viewMode === "grid"
                    ? "text-white"
                    : "text-light-primary-text",
                )}
              />
            </span>
          </button>
        </div>
        <div className="lg:flex hidden">
          <p className="text-light-secondary-text">
            Showing {showingStart}-{showingEnd} of {totalResults} results
          </p>
        </div>
      </div>
      {/* Sorting */}
      <CustomFloatingSelect
        label="Sorting"
        options={[
          { value: "popularity", label: "Popularity" },
          { value: "low-to-high-price", label: "Low to High Price" },
          { value: "high-to-low-price", label: "High to Low Price" },
          { value: "avarage-rating", label: "Avarage Rating" },
          { value: "a-z-order", label: "A-Z Order" },
          { value: "z-a-order", label: "Z-A Order" },
        ]}
        className="min-w-[140px]"
      />
    </motion.div>
  );
}
