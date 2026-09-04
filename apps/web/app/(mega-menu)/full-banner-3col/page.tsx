"use client";
import ProductCardOne from "@/components/card/product-card-one";
import Breadcrumb from "@/components/common/breadcrumb";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import FullWidthBannerTwo from "@/components/mega-menu/banner-slider/full-width-banner/full-width-banner-two";
import FilterBar from "@/components/mega-menu/filter-two/filter-bar";
import OffcanvasFilter from "@/components/mega-menu/filter-two/offcanvas-filter";
import Pagination from "@/components/mega-menu/pagination";
import { useState } from "react";

const PRODUCTS = [
  {
    image: "/images/home-2/product-image-1.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.1,
    category: "Store Name",
  },
  {
    image: "/images/home-2/product-image-2.png",
    title: "Infrared Forehead Thermometer Contactless Digital",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.2,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-3.png",
    title: "Oximeter Fingerprint Digital Pulse Rate Monitor",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.3,
    category: "Category Name",
    stockStatus: "out-of-stock" as const,
  },
  {
    image: "/images/home-2/product-image-4.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.4,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-5.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.5,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-6.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.6,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-7.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.7,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-8.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.8,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-9.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 0.9,
    category: "Store Name",
  },
  {
    image: "/images/home-2/product-image-10.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 1.0,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-11.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 1.1,
    category: "Category Name",
  },
  {
    image: "/images/home-2/product-image-12.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    badgeText: "15% OFF",
    delay: 1.2,
    category: "Category Name",
  },
];
export default function Page() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Mega Menu", href: "#" },
          { label: "Grid - 3 Columns (Banner)" },
        ]}
      />
      <FullWidthBannerTwo />
      <div className="pb-[90px]">
        <div className="container">
          <FilterBar
            onOpenFilter={() => setIsFilterOpen(true)}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Products Grid And List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product, index) => (
                <ProductCardOne
                  variant="pink"
                  key={index}
                  {...product}
                  className="mx-0"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {PRODUCTS.map((product, index) => (
                <HorizontalProductCard
                  key={index}
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  ratingPercentage={product.ratingPercentage}
                  reviewCount={product.ratingCount}
                  currentPrice={product.currentPrice}
                  oldPrice={product.oldPrice}
                />
              ))}
            </div>
          )}
          <div className="pt-12">
            <Pagination />
          </div>
        </div>
      </div>

      <OffcanvasFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
