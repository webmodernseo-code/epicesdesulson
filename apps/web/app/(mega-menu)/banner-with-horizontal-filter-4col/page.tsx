"use client";

import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import PaginationTwo from "@/components/mega-menu/pagination-two";
import FullWidthBannerSlider from "@/components/mega-menu/full-slider/full-width-banner-slider";
import FilterFour from "@/components/mega-menu/filter-four/filter-four";

const PRODUCTS = [
  {
    image: "/images/home-3/apple.png",
    title: "Fresh Red Apples - Organic and Sweet",
    currentPrice: "$4.99",
    oldPrice: "$6.99",
    discount: "20% OFF",
    ratingPercentage: 90,
    ratingCount: 120,
    delay: 0.1,
    category: "Fruits",
  },
  {
    image: "/images/home-3/avocado.png",
    title: "Ripe Avocado - Rich in Healthy Fats",
    currentPrice: "$2.49",
    oldPrice: "$3.49",
    discount: "15% OFF",
    ratingPercentage: 85,
    ratingCount: 85,
    delay: 0.2,
    category: "Vegetables",
  },
  {
    image: "/images/home-3/cabbage.png",
    title: "Green Cabbage - Fresh from the Farm",
    currentPrice: "$1.99",
    oldPrice: "$2.99",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 45,
    delay: 0.3,
    category: "Vegetables",
  },
  {
    image: "/images/home-3/chicken-meat.png",
    title: "Premium Chicken Meat - High Protein",
    currentPrice: "$12.99",
    oldPrice: "$15.99",
    discount: "12% OFF",
    ratingPercentage: 95,
    ratingCount: 210,
    delay: 0.4,
    category: "Meat & Poultry",
  },
  {
    image: "/images/home-3/eggs.png",
    title: "Farm Fresh Eggs - Grade A (Large)",
    currentPrice: "$3.99",
    oldPrice: "$4.99",
    discount: "5% OFF",
    ratingPercentage: 88,
    ratingCount: 150,
    delay: 0.5,
    category: "Dairy & Eggs",
  },
  {
    image: "/images/home-3/fish-1.png",
    title: "Fresh Sea Fish - Wild Caught",
    currentPrice: "$18.49",
    oldPrice: "$22.99",
    discount: "18% OFF",
    ratingPercentage: 92,
    ratingCount: 75,
    delay: 0.6,
    category: "Seafood",
  },
  {
    image: "/images/home-3/fresh-beans.png",
    title: "Green Beans - Crisp and Nutritious",
    currentPrice: "$2.99",
    oldPrice: "$3.99",
    discount: "25% OFF",
    ratingPercentage: 82,
    ratingCount: 60,
    delay: 0.7,
    category: "Vegetables",
  },
  {
    image: "/images/home-3/kiwi.png",
    title: "Zesty Kiwi Fruit - Vitamin C Rich",
    currentPrice: "$5.49",
    oldPrice: "$6.99",
    discount: "20% OFF",
    ratingPercentage: 87,
    ratingCount: 95,
    delay: 0.8,
    category: "Fruits",
  },
  {
    image: "/images/home-3/lettuce.png",
    title: "Fresh Lettuce - Perfect for Salads",
    currentPrice: "$1.49",
    oldPrice: "$2.49",
    discount: "30% OFF",
    ratingPercentage: 78,
    ratingCount: 40,
    delay: 0.9,
    category: "Vegetables",
  },
  {
    image: "/images/home-3/orange.png",
    title: "Juicy Oranges - Sweet and Tangy",
    currentPrice: "$3.99",
    oldPrice: "$5.49",
    discount: "15% OFF",
    ratingPercentage: 91,
    ratingCount: 180,
    delay: 1.0,
    category: "Fruits",
  },
  {
    image: "/images/home-3/papaya.png",
    title: "Tropical Papaya - Sweet and Soft",
    currentPrice: "$4.49",
    oldPrice: "$5.99",
    discount: "10% OFF",
    ratingPercentage: 84,
    ratingCount: 55,
    delay: 1.1,
    category: "Fruits",
  },
  {
    image: "/images/home-3/pomegranate.png",
    title: "Red Pomegranate - Antioxidant Powerhouse",
    currentPrice: "$6.99",
    oldPrice: "$8.99",
    discount: "22% OFF",
    ratingPercentage: 93,
    ratingCount: 110,
    delay: 1.2,
    category: "Fruits",
  },
];

export default function Page() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div>
      <Breadcrumb items={[{ label: "Categories", href: "/" }]} />
      <FullWidthBannerSlider />
      <FilterFour viewMode={viewMode} setViewMode={setViewMode} />
      <div className="pb-[90px]">
        <div className="container">
          {/* Products Grid And List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product, index) => (
                <ProductCardOne
                  variant="transparent"
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
            <PaginationTwo />
          </div>
        </div>
      </div>
    </div>
  );
}
