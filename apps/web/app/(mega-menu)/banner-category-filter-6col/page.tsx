"use client";
import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import CategoryBannerSlider from "@/components/mega-menu/category-banner-slider";
import FilterFour from "@/components/mega-menu/filter-four/filter-four";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import Pagination from "@/components/mega-menu/pagination";

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
    {
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
      image: "/images/hand-sanitizer-1.png",
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
      <Breadcrumb items={[{ label: "Grid - 4 Columns (Category Filter)" }]} />
      <CategoryBannerSlider />
      <FilterFour viewMode={viewMode} setViewMode={setViewMode} />
      <div className="pb-[70px]">
        <div className="container">
          <div
            className={
              viewMode === "grid"
                ? "grid 2xl:grid-cols-6 grid-cols-12 gap-6 pb-12"
                : "flex flex-col gap-y-6 pb-12"
            }
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={
                  viewMode === "grid"
                    ? "2xl:col-span-1 xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12"
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
  );
}
