"use client";

import Image from "next/image";

const COLORS = [
  {
    id: "green",
    hex: "#088178",
    text: "green",
    img: "/images/product-details/color-selector-1.png",
    outOfStock: true,
  },
  {
    id: "blue",
    hex: "#3366FF",
    text: "blue",
    img: "/images/product-details/color-selector-2.png",
    outOfStock: false,
  },
  {
    id: "yellow",
    hex: "#FFC107",
    text: "yellow",
    img: "/images/product-details/color-selector-3.png",
    outOfStock: false,
  },
  {
    id: "red",
    hex: "#CB0233",
    text: "red",
    img: "/images/product-details/color-selector-4.png",
    outOfStock: false,
  },
];

interface ProductSixColorsProps {
  selectedColor: string | null;
  setSelectedColor: (id: string) => void;
}

export default function ProductSixColors({
  selectedColor,
  setSelectedColor,
}: ProductSixColorsProps) {
  const selectedColorObj = COLORS.find((c) => c.id === selectedColor);

  return (
    <div className="color-variation-section mb-6">
      <div className="color-variation-section-title mb-4">
        <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
          Color:
          <span
            className={`font-normal capitalize color-variation-selected-color ${
              selectedColorObj
                ? selectedColorObj.outOfStock
                  ? "text-error"
                  : "text-primary"
                : "text-error"
            }`}
          >
            {selectedColorObj
              ? selectedColorObj.outOfStock
                ? "Out of Stock"
                : selectedColorObj.text
              : "Out of Stock"}
          </span>
        </p>
      </div>
      <div className="color-variation-items flex items-center gap-x-2">
        {COLORS.map((color) => (
          <div key={color.id} className="color-variation-item">
            <button
              disabled={color.outOfStock}
              onClick={() => setSelectedColor(color.id)}
              className={
                color.outOfStock
                  ? "relative flex items-center justify-center rounded-full size-10 border border-gray-300 hover:bg-[rgba(145,158,171,0.08)] before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform after:absolute after:inset-x-0 after:-z-10 after:h-px after:rotate-45 after:bg-neutral-300 after:transition-transform cursor-not-allowed"
                  : "cursor-pointer flex items-center justify-center rounded-full size-10 border border-gray-300 hover:bg-[rgba(145,158,171,0.08)]"
              }
              style={
                selectedColor === color.id
                  ? { borderColor: color.hex, borderWidth: "1px" }
                  : {}
              }
            >
              <Image width={24} height={24} src={color.img} alt="color" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
