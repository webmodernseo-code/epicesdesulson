"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/common/breadcrumb";
import FullWidthBannerThree from "@/components/mega-menu/banner-slider/full-width-banner/full-width-banner-three";
import Pagination from "@/components/mega-menu/pagination";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import SidebarFilterOne from "@/components/mega-menu/sidebar-filter-one";
import CustomFloatingSelect from "@/components/common/custom-floating-select";

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = [
    {
      id: 1,
      image: "/images/vitamin-c.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 2,
      image: "/images/vitamin-b12.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 3,
      image: "/images/hand-sanitizer-1.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 4,
      image: "/images/temperature-gun-3.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 5,
      image: "/images/softovac.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 6,
      image: "/images/ground-nuts-oil.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 7,
      image: "/images/aacka.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 8,
      image: "/images/vitamin-c-2.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 9,
      image: "/images/apple-juice.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 10,
      image: "/images/temperature-gun-1.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 11,
      image: "/images/hand-sanitizer-2.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
    {
      id: 12,
      image: "/images/bp-machine-2.png",
      title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
      currentPrice: "$27.49",
      oldPrice: "$39.99",
      discount: "10% OFF",
      ratingPercentage: 80,
      ratingCount: 189,
      category: "Supplements",
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Categories" }]} />
      <FullWidthBannerThree />
      <section className="pb-[90px]">
        <div className="container">
          <div className="grid grid-cols-12 lg:gap-x-6 gap-y-6">
            <div className="xl:col-span-3 lg:col-span-4 col-span-12 row-start-2 lg:row-start-auto">
              <div className="sidebar sticky top-20">
                <SidebarFilterOne />
              </div>
            </div>
            <div className="xl:col-span-9 lg:col-span-8 col-span-12 row-start-1 lg:row-start-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between pb-12"
              >
                <div className="flex items-center gap-x-4 shrink-0 justify-start">
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center border border-[rgba(145,158,171,0.24)] cursor-pointer ${
                        viewMode === "list"
                          ? "btn-primary text-white"
                          : "bg-white text-black hover:bg-gray-100"
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
                      onClick={() => setViewMode("grid")}
                      className={`w-10 h-10 rounded-full inline-flex items-center justify-center border border-[rgba(145,158,171,0.24)] cursor-pointer ${
                        viewMode === "grid"
                          ? "btn-primary text-white"
                          : "bg-white text-black hover:bg-gray-100"
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
                <div className="relative min-w-[150px] z-20">
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
              </motion.div>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-12 gap-6 pb-12"
                    : "flex flex-col gap-y-6 pb-12"
                }
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={
                      viewMode === "grid"
                        ? "xl:col-span-4 md:col-span-6 col-span-12"
                        : "w-full"
                    }
                  >
                    {viewMode === "grid" ? (
                      <ProductCardOne
                        image={product.image}
                        title={product.title}
                        currentPrice={product.currentPrice}
                        oldPrice={product.oldPrice}
                        discount={product.discount}
                        ratingPercentage={product.ratingPercentage}
                        ratingCount={product.ratingCount}
                        className=""
                      />
                    ) : (
                      <HorizontalProductCard
                        image={product.image}
                        title={product.title}
                        category={product.category}
                        currentPrice={product.currentPrice}
                        oldPrice={product.oldPrice}
                        ratingPercentage={product.ratingPercentage}
                        reviewCount={product.ratingCount}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
