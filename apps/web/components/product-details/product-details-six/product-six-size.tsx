"use client";

const SIZES = [
  { id: "S", text: "S", outOfStock: false, px: "px-10" },
  { id: "M", text: "M", outOfStock: false, px: "px-[38px]" },
  { id: "L", text: "L", outOfStock: false, px: "px-[38px]" },
  { id: "XL", text: "XL", outOfStock: true, px: "px-[38px]" },
  { id: "XXL", text: "XXL", outOfStock: false, px: "px-[38px]" },
  { id: "XXXL", text: "XXXL", outOfStock: false, px: "px-[38px]" },
];

interface ProductSixSizeProps {
  selectedSize: string | null;
  setSelectedSize: (id: string) => void;
  onOpenSizeChart: () => void;
}

export default function ProductSixSize({
  selectedSize,
  setSelectedSize,
  onOpenSizeChart,
}: ProductSixSizeProps) {
  const selectedSizeObj = SIZES.find((s) => s.id === selectedSize);

  return (
    <div className="size-variation-section mb-6">
      <div className="size-variation-section-title mb-4 flex items-center justify-between">
        <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
          Size:
          <span
            className={`font-normal capitalize size-variation-selected-size ${
              selectedSizeObj
                ? selectedSizeObj.outOfStock
                  ? "text-error"
                  : "text-primary"
                : "text-error"
            }`}
          >
            {selectedSizeObj
              ? selectedSizeObj.outOfStock
                ? "Out Of Stock"
                : "In Stock"
              : "Out Of Stock"}
          </span>
        </p>
        <button
          onClick={onOpenSizeChart}
          className="text-sm leading-[22px] hover:underline variation-size-guide-btn"
        >
          See size chart
        </button>
      </div>
      <div className="flex items-center gap-2 2xl:flex-nowrap flex-wrap">
        {SIZES.map((size) => (
          <button
            key={size.id}
            disabled={size.outOfStock}
            onClick={() => setSelectedSize(size.id)}
            className={
              size.outOfStock
                ? "flex items-center justify-center text-sm leading-6 px-[38px] py-1.5 font-semibold rounded-[100px] bg-[rgba(145,158,171,0.24)] text-[rgba(145,158,171,0.8)] cursor-not-allowed"
                : `cursor-pointer flex items-center justify-center text-sm leading-6 ${
                    size.px
                  } py-1.5 text-light-primary-text font-semibold border rounded-[100px] ${
                    selectedSize === size.id
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 hover:bg-[rgba(145,158,171,0.08)]"
                  }`
            }
          >
            {size.text}
          </button>
        ))}
      </div>
    </div>
  );
}
