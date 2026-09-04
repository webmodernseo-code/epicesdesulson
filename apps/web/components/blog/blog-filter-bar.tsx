"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomFloatingSelect from "../common/custom-floating-select";

const SORTING_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
  { value: "rating", label: "Rating" },
  { value: "relevance", label: "Relevance" },
  { value: "comment-count", label: "Comment Count" },
];

interface BlogFilterBarProps {
  activeView: "list" | "grid";
}

export default function BlogFilterBar({ activeView }: BlogFilterBarProps) {
  const router = useRouter();

  const isListActive = activeView === "list";
  const isGridActive = activeView === "grid";

  return (
    <motion.div
      className="flex items-center justify-between mb-12"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center gap-x-4">
        <button
          onClick={isListActive ? undefined : () => router.push("/blog-list")}
          className={`w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer ${
            isListActive
              ? "bg-primary"
              : "btn btn-default outline shadow-none"
          }`}
        >
          <span className="inline-flex items-center justify-center">
            <i
              className={`hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl leading-6 ${
                isListActive ? "text-white" : "text-light-primary-text"
              }`}
            />
          </span>
        </button>
        <button
          onClick={isGridActive ? undefined : () => router.push("/blog-grid")}
          className={`w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer ${
            isGridActive
              ? "bg-primary"
              : "btn btn-default outline shadow-none"
          }`}
        >
          <span className="inline-flex items-center justify-center">
            <i
              className={`hgi hgi-stroke hgi-more-01 text-2xl leading-6 ${
                isGridActive ? "text-white" : "text-light-primary-text"
              }`}
            />
          </span>
        </button>
      </div>
      <CustomFloatingSelect
        label="Sorting"
        defaultValue="newest"
        options={SORTING_OPTIONS}
      />
    </motion.div>
  );
}
