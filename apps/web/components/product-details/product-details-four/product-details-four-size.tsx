"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SIZES = ["60 ML", "120 ML", "220 ML", "250 ML", "300 ML", "500 ML"];

export default function ProductDetailsFourSize() {
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);

  return (
    <div className="size-variation-section mb-6">
      <div className="size-variation-section-title mb-4 flex items-center justify-between">
        <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
          Pack Size:
          <span className="text-light-primary-text font-normal capitalize size-variation-selected-size">
            {selectedSize}
          </span>
        </p>
      </div>
      <div className="size-variation-items flex items-center gap-2 2xl:flex-nowrap flex-wrap">
        {SIZES.map((size) => (
          <div key={size} className="size-variation-item">
            <button
              onClick={() => setSelectedSize(size)}
              className={cn(
                "cursor-pointer flex items-center justify-center text-sm leading-6 px-5 py-1.5 font-semibold rounded-[100px] transition-colors duration-200 border",
                selectedSize === size
                  ? "border-primary bg-primary text-white hover:bg-primary-dark"
                  : "border-gray-300 text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]"
              )}
            >
              {size}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
