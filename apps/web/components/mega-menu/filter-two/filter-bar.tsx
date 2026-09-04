"use client";

import { cn } from "@/lib/utils";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import { motion } from "framer-motion";

const sortingOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Low to High Price", value: "low-to-high-price" },
  { label: "High to Low Price", value: "high-to-low-price" },
  { label: "Avarage Rating", value: "avarage-rating" },
  { label: "A-Z Order", value: "a-z-order" },
  { label: "Z-A Order", value: "z-a-order" },
];

interface FilterBarProps {
  onOpenFilter: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function FilterBar({
  onOpenFilter,
  viewMode,
  setViewMode,
}: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-1">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between py-12"
        >
          <div className="flex items-center gap-x-4 shrink-0 justify-start">
            <div className="flex items-center gap-x-4">
              <div>
                <button
                  id="filter-menu-btn"
                  className="btn btn-default outline shadow-none text-[13px] leading-[22px] text-light-disabled-text font-normal py-[7px] px-[19px] rounded-[100px]"
                  data-state="close"
                  onClick={onOpenFilter}
                >
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-filter text-2xl leading-6 text-light-disabled-text" />
                  </span>
                  Filter
                </button>
              </div>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "w-10 h-10 rounded-full md:inline-flex hidden items-center justify-center cursor-pointer transition-all",
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "btn btn-default outline shadow-none text-gray-500",
                )}
              >
                <span className="inline-flex items-center justify-center">
                  <i
                    className={cn(
                      "hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl leading-6",
                      viewMode === "list" ? "text-white" : "text-gray-500",
                    )}
                  />
                </span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "w-10 h-10 rounded-full md:inline-flex hidden items-center justify-center cursor-pointer transition-all",
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "btn btn-default outline shadow-none text-gray-500",
                )}
              >
                <span className="inline-flex items-center justify-center">
                  <i
                    className={cn(
                      "hgi hgi-stroke hgi-more-01 text-2xl leading-6",
                      viewMode === "grid" ? "text-white" : "text-gray-500",
                    )}
                  />
                </span>
              </button>
            </div>
            <div className="lg:flex hidden">
              <p className="text-light-secondary-text">
                Showing 1-12 of 16 results
              </p>
            </div>
          </div>
          {/* Sorting */}
          <CustomFloatingSelect
            options={sortingOptions}
            label="Sorting"
            defaultValue="popularity"
            onChange={(value) => console.log("Sorted by:", value)}
          />
        </motion.div>
      </div>
    </div>
  );
}
