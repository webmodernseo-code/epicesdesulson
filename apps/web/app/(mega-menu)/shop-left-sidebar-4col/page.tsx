"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/common/breadcrumb";
import Pagination from "@/components/mega-menu/pagination";
import SidebarFilterOne from "@/components/mega-menu/sidebar-filter-one";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import CustomFloatingSelect from "@/components/common/custom-floating-select";

const products = [
  "/images/vitamin-c.png",
  "/images/vitamin-b12.png",
  "/images/hand-sanitizer-1.png",
  "/images/temperature-gun-3.png",
  "/images/softovac.png",
  "/images/apple-juice.png",
  "/images/ground-nuts-oil.png",
  "/images/aacka.png",
  "/images/vitamin-c-2.png",
  "/images/hand-sanitizer-2.png",
  "/images/temperature-gun-1.png",
  "/images/bp-machine-2.png",
].map((img, i) => ({
  id: i,
  image: img,
  title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
  ratingPercentage: 80,
  ratingCount: 189,
  currentPrice: "$27.49",
  oldPrice: "$39.99",
  discount: "10% OFF",
  category: "Category",
  delay: 0.2 + (i % 4) * 0.1,
}));

const sortingOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Low to High Price", value: "low-to-high-price" },
  { label: "High to Low Price", value: "high-to-low-price" },
  { label: "Avarage Rating", value: "avarage-rating" },
  { label: "A-Z Order", value: "a-z-order" },
  { label: "Z-A Order", value: "z-a-order" },
];

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div>
      <Breadcrumb items={[{ label: "Categories" }]} />
      <section className="pb-[90px]">
        <div className="container">
          <div className="grid grid-cols-12 lg:gap-x-6 gap-y-6">
            <div className="xl:col-span-3 lg:col-span-4 col-span-12 row-start-2 lg:row-start-auto">
              <SidebarFilterOne />
            </div>
            <div className="xl:col-span-9 lg:col-span-8 col-span-12 row-start-1 lg:row-start-auto">
              {/* Filter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between pb-12"
              >
                <div className="flex items-center gap-x-4 shrink-0 justify-start">
                  {/* vendor-filter-button */}
                  <div className="flex items-center gap-x-4">
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer ${
                        viewMode === "list"
                          ? "btn-primary"
                          : "btn btn-default outline shadow-none"
                      }`}
                    >
                      <span className="inline-flex items-center justify-center">
                        <i
                          className={`hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl leading-6 ${
                            viewMode === "list" ? "text-white" : ""
                          }`}
                        />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer ${
                        viewMode === "grid"
                          ? "btn-primary"
                          : "btn btn-default outline shadow-none"
                      }`}
                    >
                      <span className="inline-flex items-center justify-center">
                        <i
                          className={`hgi hgi-stroke hgi-more-01 text-2xl leading-6 ${
                            viewMode === "grid" ? "text-white" : ""
                          }`}
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
              <div className="grid grid-cols-12 gap-6 pb-12">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={
                      viewMode === "grid"
                        ? "2xl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12"
                        : "col-span-12"
                    }
                  >
                    {viewMode === "grid" ? (
                      <ProductCardOne
                        image={product.image}
                        title={product.title}
                        ratingPercentage={product.ratingPercentage}
                        ratingCount={product.ratingCount}
                        currentPrice={product.currentPrice}
                        oldPrice={product.oldPrice}
                        discount={product.discount}
                        badgeText={product.discount}
                        delay={product.delay}
                        className=""
                      />
                    ) : (
                      <HorizontalProductCard
                        image={product.image}
                        category={product.category}
                        title={product.title}
                        ratingPercentage={product.ratingPercentage}
                        reviewCount={product.ratingCount}
                        currentPrice={product.currentPrice}
                        oldPrice={product.oldPrice}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
