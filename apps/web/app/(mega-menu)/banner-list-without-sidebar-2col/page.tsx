"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import FullWidthBanner from "@/components/mega-menu/banner-slider/full-width-banner/full-width-banner";
import FilterBar from "@/components/mega-menu/filter-two/filter-bar";
import OffcanvasFilter from "@/components/mega-menu/filter-two/offcanvas-filter";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import Pagination from "@/components/mega-menu/pagination";

const PRODUCTS = [
  {
    image: "/images/power-c.png",
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
    image: "/images/temperature-gun-1.png",
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
    image: "/images/temperature-gun-2.png",
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
    image: "/images/diesel.png",
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
    image: "/images/combat.png",
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
    image: "/images/bp-machine.png",
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
    image: "/images/nutrageinz.png",
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
    image: "/images/power-c.png",
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
];

export default function Page() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Lock body scroll when the filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Mega Menu", href: "#" },
          { label: "List - 2 Columns (Left Filter)" },
        ]}
      />
      <FullWidthBanner />
      <div className="pb-[90px]">
        <div className="container">
          <FilterBar
            onOpenFilter={() => setIsFilterOpen(true)}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Products Grid And List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product, index) => (
                <ProductCardOne
                  key={index}
                  {...product}
                  className="mx-0"
                  deliveryTime="12-48 hours"
                  storeName={product.category}
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
