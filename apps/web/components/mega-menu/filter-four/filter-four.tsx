"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import OffcanvasFilter from "@/components/mega-menu/filter-two/offcanvas-filter";
import StarRating from "@/components/common/star-rating";

// Custom hook to detect clicks outside of a component
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

interface FilterDropdownProps {
  label: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

function FilterDropdown({
  label,
  icon,
  isOpen,
  onToggle,
  onClose,
  children,
}: FilterDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  return (
    <div className="relative filter-dropdown" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "btn btn-default outline shadow-none text-[13px] leading-[22px] font-normal py-[7px] px-[15px] rounded-[100px] transition-colors",
          isOpen
            ? "border-primary text-primary"
            : "text-light-disabled-text border-[rgba(145,158,171,0.24)]",
        )}
      >
        <span className="inline-flex items-center justify-center">
          <i
            className={cn(
              "hgi hgi-stroke text-2xl leading-6",
              icon,
              isOpen ? "text-primary" : "text-light-disabled-text",
            )}
          />
        </span>
        {label}
        <span className="inline-flex items-center justify-center">
          <i
            className={cn(
              "hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6 transition-transform duration-300",
              isOpen ? "rotate-180 text-primary" : "text-light-disabled-text",
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="filter-dropdown-menu bg-white shadow-dark-z-24 rounded-3xl mt-5 px-6 py-6 z-40 absolute left-0 top-full w-[390px]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxListItem({ label, count }: { label: string; count: number }) {
  return (
    <li>
      <label className="group flex items-center justify-between w-full cursor-pointer">
        <span className="flex items-center gap-x-2">
          <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
            <span className="relative inline-flex w-5 h-5 items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out cursor-pointer"
              />
              <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none">
                <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
              </span>
            </span>
          </span>
          <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out select-none">
            {label}
          </span>
        </span>
        <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
          ({count})
        </span>
      </label>
    </li>
  );
}

interface FilterFourProps {
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
}

export default function FilterFour({
  viewMode = "grid",
  setViewMode,
}: FilterFourProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const CATEGORIES = [
    { label: "Thermometers", count: 29 },
    { label: "Oximeters", count: 5 },
    { label: "BP Monitors", count: 1 },
    { label: "Personal Care", count: 1 },
  ];

  const BRANDS = [
    { label: "Mediguard", count: 8 },
    { label: "HealthPlus", count: 7 },
    { label: "BioCare", count: 3 },
    { label: "SmartAid", count: 1 },
  ];

  const PACK_SIZES = [
    { label: "400 to 500 g", count: 40 },
    { label: "500 to 700 g", count: 20 },
    { label: "700 to 1 kg", count: 32 },
    { label: "120 - 150 g", count: 20 },
    { label: "1 pc", count: 9 },
  ];

  const COLORS = [
    "bg-primary",
    "bg-info",
    "bg-info-darker",
    "bg-warning",
    "bg-error-light",
    "bg-error-dark",
  ];

  const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

  return (
    <div className="py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between"
        >
          {/* Banner Filter for large screen */}
          <div className="2xl:flex items-center flex-wrap gap-y-4 md:gap-x-4 gap-x-1 hidden">
            {/* Category Filter */}
            <FilterDropdown
              label="Category"
              icon="hgi-archive-01"
              isOpen={openDropdown === "category"}
              onToggle={() => toggleDropdown("category")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Category</h6>
                  <button className="text-base leading-6 hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <div className="input-group medium pl-4 py-2 pr-2.5 rounded-[100px] widget-category-search relative w-full border border-gray-200">
                  <div className="input-group-addon inline-flex items-center justify-center leading-6">
                    <span className="inline-flex items-center justify-center">
                      <i className="hgi hgi-stroke hgi-search-01 text-2xl leading-6 text-light-primary-text" />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="peer form-control placeholder-transparent focus:placeholder-transparent focus:outline-none bg-transparent"
                    placeholder="Search"
                  />
                  <label
                    htmlFor="search"
                    className="absolute left-[48px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:left-[14px] peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1 pointer-events-none"
                  >
                    Search
                  </label>
                </div>
                <div className="max-h-[170px] overflow-y-auto pr-2.5 custom-scrollbar">
                  <ul className="flex flex-col gap-y-2">
                    {CATEGORIES.map((cat, idx) => (
                      <CheckboxListItem
                        key={idx}
                        label={cat.label}
                        count={cat.count}
                      />
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Price Range Filter */}
            <FilterDropdown
              label="Price Range"
              icon="hgi-bitcoin-money-02"
              isOpen={openDropdown === "price_range"}
              onToggle={() => toggleDropdown("price_range")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Price Range</h6>
                  <button className="text-base leading-6 hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                {/* Note: In a real implementation, you'd use a react slider component here like rc-slider */}
                <div className="w-full h-1 bg-gray-200 mt-2 rounded">
                  <div className="w-1/2 h-full bg-primary rounded"></div>
                </div>
                <div className="price-range-values flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-[80px] py-2 px-3.5 w-full max-w-[147px]">
                    <span className="mr-2 text-light-disabled-text">$</span>
                    <input
                      className="form-control focus:outline-none w-full bg-transparent"
                      type="number"
                      defaultValue={0}
                    />
                  </div>
                  <span className="text-sm text-light-disabled-text px-2">
                    To
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-[80px] py-2 px-3.5 w-full max-w-[147px]">
                    <span className="mr-2 text-light-disabled-text">$</span>
                    <input
                      className="form-control focus:outline-none w-full bg-transparent"
                      type="number"
                      defaultValue={100}
                    />
                  </div>
                </div>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Rating Filter */}
            <FilterDropdown
              label="Rating"
              icon="hgi-star"
              isOpen={openDropdown === "rating"}
              onToggle={() => toggleDropdown("rating")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Rating</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <ul className="flex flex-wrap gap-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <button className="btn btn-default outline shadow-none gap-x-1.5 items-center px-2.5 py-1.5 rounded-[80px] flex">
                        <span className="text-base font-medium">{rating}</span>
                        <StarRating rating={rating} />
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Colors Filter */}
            <FilterDropdown
              label="Colors"
              icon="hgi-cleaning-bucket"
              isOpen={openDropdown === "colors"}
              onToggle={() => toggleDropdown("colors")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Color</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <ul className="flex flex-wrap gap-5">
                  {COLORS.map((color, idx) => (
                    <li
                      key={idx}
                      className="inline-flex items-center justify-center"
                    >
                      <button className={cn("w-5 h-5 rounded-full", color)} />
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Size Filter */}
            <FilterDropdown
              label="Size"
              icon="hgi-tape-measure"
              isOpen={openDropdown === "size"}
              onToggle={() => toggleDropdown("size")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Size</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <ul className="flex flex-wrap gap-3">
                  {SIZES.map((size) => (
                    <li key={size}>
                      <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px] hover:border-primary hover:text-primary transition-colors">
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Brand Filter */}
            <FilterDropdown
              label="Brand"
              icon="hgi-honor"
              isOpen={openDropdown === "brand"}
              onToggle={() => toggleDropdown("brand")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Brand</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <div className="max-h-[170px] overflow-y-auto pr-2.5 custom-scrollbar">
                  <ul className="flex flex-col gap-y-2">
                    {BRANDS.map((item, idx) => (
                      <CheckboxListItem
                        key={idx}
                        label={item.label}
                        count={item.count}
                      />
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Discount Filter */}
            <FilterDropdown
              label="Discount"
              icon="hgi-discount-01"
              isOpen={openDropdown === "discount"}
              onToggle={() => toggleDropdown("discount")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Discount</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <div className="max-h-[170px] overflow-y-auto pr-2.5 custom-scrollbar">
                  <ul className="flex flex-col gap-y-2">
                    {/* Using categories mock for discounts just for representation as per original HTML */}
                    {BRANDS.map((item, idx) => (
                      <CheckboxListItem
                        key={idx}
                        label={item.label}
                        count={item.count}
                      />
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>

            {/* Pack Size Filter */}
            <FilterDropdown
              label="Pack Size"
              icon="hgi-package-moving"
              isOpen={openDropdown === "pack_size"}
              onToggle={() => toggleDropdown("pack_size")}
              onClose={() => setOpenDropdown(null)}
            >
              <div className="flex flex-col gap-y-6">
                <div className="flex items-center justify-between">
                  <h6>Pack Size</h6>
                  <button className="text-base hover:underline hover:text-primary transition-colors">
                    Reset
                  </button>
                </div>
                <div className="max-h-[170px] overflow-y-auto pr-2.5 custom-scrollbar">
                  <ul className="flex flex-col gap-y-2">
                    {PACK_SIZES.map((item, idx) => (
                      <CheckboxListItem
                        key={idx}
                        label={item.label}
                        count={item.count}
                      />
                    ))}
                  </ul>
                </div>
                <button className="btn btn-primary btn-large rounded-lg w-full">
                  Apply Now
                </button>
              </div>
            </FilterDropdown>
          </div>

          {/* Banner Filter for Small screen */}
          <div className="block 2xl:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-default outline shadow-none text-[13px] leading-[22px] text-light-disabled-text font-normal py-[7px] px-[15px] rounded-[100px] border-[rgba(145,158,171,0.24)] hover:border-primary hover:text-primary transition-colors group"
            >
              <span className="inline-flex items-center justify-center mr-1">
                <i className="hgi hgi-stroke hgi-filter text-2xl leading-6 text-light-disabled-text group-hover:text-primary transition-colors" />
              </span>
              Filter
            </button>
          </div>

          {/* View Toggles and Sorting */}
          <div className="flex items-center gap-x-4">
            <div className="order-2 2xl:order-1 relative min-w-[140px] z-20">
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
                defaultValue="popularity"
              />
            </div>

            <div className="order-1 2xl:order-2 hidden md:block">
              <div className="flex items-center gap-x-4">
                <button
                  onClick={() => setViewMode && setViewMode("list")}
                  className={cn(
                    "w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer transition-all border",
                    viewMode === "list"
                      ? "btn-primary text-white border-primary"
                      : "bg-white text-light-disabled-text hover:text-black border-[rgba(145,158,171,0.24)]",
                  )}
                >
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl leading-6" />
                  </span>
                </button>
                <button
                  onClick={() => setViewMode && setViewMode("grid")}
                  className={cn(
                    "w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer transition-all border",
                    viewMode === "grid"
                      ? "btn-primary text-white border-primary"
                      : "bg-white text-light-disabled-text hover:text-black border-[rgba(145,158,171,0.24)]",
                  )}
                >
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-more-01 text-2xl leading-6 tracking-[0px]" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <OffcanvasFilter
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      />
    </div>
  );
}
