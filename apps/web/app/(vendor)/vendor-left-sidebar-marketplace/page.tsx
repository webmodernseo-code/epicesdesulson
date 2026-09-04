"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Breadcrumb from "@/components/common/breadcrumb";
import Pagination from "@/components/mega-menu/pagination";
import ProductCardOne from "@/components/card/product-card-one";
import HorizontalProductCard from "@/components/common/horizontal-product-card";
import FilterBarThree from "@/components/mega-menu/filterbar-three/filterbar-three";
import OffcanvasFilter from "@/components/mega-menu/filter-two/offcanvas-filter";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import SidebarFilterOne from "@/components/mega-menu/sidebar-filter-one";
import VendorHeroWithSearch from "@/components/vendor/vendor-hero-with-search";
import StarRating from "@/components/common/star-rating";

const MOCK_PRODUCTS = [
  {
    id: 1,
    image: "/images/home-3/watermelon.png",
    title: "Fresh Watermelon - Seedless, Sweet and Juicy Organic Fruit",
    currentPrice: 27.49,
    oldPrice: 39.99,
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 2,
    image: "/images/home-3/strawberry.png",
    title: "Organic Strawberries - Freshly Picked and Sweet",
    currentPrice: 12.0,
    oldPrice: 15.0,
    discount: "20% OFF",
    ratingPercentage: 90,
    ratingCount: 120,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 3,
    image: "/images/home-3/avocado.png",
    title: "Ripe Avocados - Locally Sourced, Non-GMO",
    currentPrice: 18.5,
    oldPrice: 22.0,
    discount: "15% OFF",
    ratingPercentage: 85,
    ratingCount: 95,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 4,
    image: "/images/home-3/apple.png",
    title: "Crisp Red Apples - Organic, High in Fiber",
    currentPrice: 8.99,
    oldPrice: 10.99,
    discount: "18% OFF",
    ratingPercentage: 75,
    ratingCount: 210,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 5,
    image: "/images/home-3/orange.png",
    title: "Juicy Oranges - Vitamin C Rich, Sweet Citrus",
    currentPrice: 5.49,
    oldPrice: 7.0,
    discount: "22% OFF",
    ratingPercentage: 88,
    ratingCount: 150,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 6,
    image: "/images/home-3/papaya.png",
    title: "Tropical Papaya - Sweet and Ripe, Golden Flesh",
    currentPrice: 14.99,
    oldPrice: 18.0,
    discount: "17% OFF",
    ratingPercentage: 82,
    ratingCount: 65,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 7,
    image: "/images/home-3/kiwi.png",
    title: "Fresh Kiwi Fruit - Nutrient Dense, Sweet and Tangy",
    currentPrice: 6.5,
    oldPrice: 8.5,
    discount: "24% OFF",
    ratingPercentage: 87,
    ratingCount: 112,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 8,
    image: "/images/home-3/pomegranate.png",
    title: "Antioxidant Rich Pomegranate - Fresh and Flavorful",
    currentPrice: 22.99,
    oldPrice: 28.0,
    discount: "18% OFF",
    ratingPercentage: 91,
    ratingCount: 78,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 9,
    image: "/images/home-3/apple-juice.png",
    title: "Pure Apple Juice - No Added Sugar, 1L Bottle",
    currentPrice: 4.99,
    oldPrice: 6.5,
    discount: "23% OFF",
    ratingPercentage: 84,
    ratingCount: 245,
    category: "Beverages",
    sellerName: "Riveup Digital",
  },
  {
    id: 10,
    image: "/images/home-3/lemon-juice.png",
    title: "Organic Lemon Juice - 100% Pure, Great for Cooking",
    currentPrice: 3.5,
    oldPrice: 4.5,
    discount: "22% OFF",
    ratingPercentage: 80,
    ratingCount: 189,
    category: "Beverages",
    sellerName: "Riveup Digital",
  },
  {
    id: 11,
    image: "/images/home-3/greek-plain.png",
    title: "Plain Greek Yogurt - High Protein, Creamy Texture",
    currentPrice: 8.49,
    oldPrice: 10.99,
    discount: "23% OFF",
    ratingPercentage: 92,
    ratingCount: 167,
    category: "Dairy",
    sellerName: "Riveup Digital",
  },
  {
    id: 12,
    image: "/images/home-3/yogurt.png",
    title: "Assorted Fruit Yogurt - Delicious and Healthy Snack",
    currentPrice: 1.99,
    oldPrice: 2.5,
    discount: "20% OFF",
    ratingPercentage: 86,
    ratingCount: 320,
    category: "Dairy",
    sellerName: "Riveup Digital",
  },
  {
    id: 13,
    image: "/images/home-3/strawberry-yogurt.png",
    title: "Strawberry Greek Yogurt - Real Fruit Chunks",
    currentPrice: 9.5,
    oldPrice: 12.0,
    discount: "21% OFF",
    ratingPercentage: 89,
    ratingCount: 145,
    category: "Dairy",
    sellerName: "Riveup Digital",
  },
  {
    id: 14,
    image: "/images/home-3/eggs.png",
    title: "Free Range Eggs - Large Grade A, 12 Count",
    currentPrice: 5.99,
    oldPrice: 7.99,
    discount: "25% OFF",
    ratingPercentage: 95,
    ratingCount: 450,
    category: "Dairy",
    sellerName: "Riveup Digital",
  },
  {
    id: 15,
    image: "/images/home-3/chicken-meat.png",
    title: "Fresh Chicken Breast - Boneless, Skinless",
    currentPrice: 15.99,
    oldPrice: 19.99,
    discount: "20% OFF",
    ratingPercentage: 88,
    ratingCount: 278,
    category: "Meat",
    sellerName: "Riveup Digital",
  },
  {
    id: 16,
    image: "/images/home-3/whole-chicken.png",
    title: "Organic Whole Chicken - Farm Raised, No Hormones",
    currentPrice: 24.5,
    oldPrice: 30.0,
    discount: "18% OFF",
    ratingPercentage: 91,
    ratingCount: 134,
    category: "Meat",
    sellerName: "Riveup Digital",
  },
  {
    id: 17,
    image: "/images/home-3/t-bone-steak-meat.png",
    title: "Premium T-Bone Steak - Aged for Extra Flavor",
    currentPrice: 35.99,
    oldPrice: 45.0,
    discount: "20% OFF",
    ratingPercentage: 94,
    ratingCount: 89,
    category: "Meat",
    sellerName: "Riveup Digital",
  },
  {
    id: 18,
    image: "/images/home-3/fish-1.png",
    title: "Fresh Salmon Fillet - Wild Caught, Sushi Grade",
    currentPrice: 21.99,
    oldPrice: 28.0,
    discount: "21% OFF",
    ratingPercentage: 93,
    ratingCount: 156,
    category: "Meat",
    sellerName: "Riveup Digital",
  },
  {
    id: 19,
    image: "/images/home-3/cabbage.png",
    title: "Green Cabbage - Fresh and Crunchy, Organic",
    currentPrice: 2.49,
    oldPrice: 3.5,
    discount: "29% OFF",
    ratingPercentage: 81,
    ratingCount: 203,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
  {
    id: 20,
    image: "/images/home-3/lettuce.png",
    title: "Fresh Romaine Lettuce - Crisp and Vibrant Leaves",
    currentPrice: 3.99,
    oldPrice: 5.0,
    discount: "20% OFF",
    ratingPercentage: 85,
    ratingCount: 176,
    category: "Groceries",
    sellerName: "Riveup Digital",
  },
];

export default function VendorLeftTopMarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <Breadcrumb items={[{ label: "Vendor Left Sidebar" }]} />
      <div className="pb-[70px]">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-10 gap-y-10">
            <div className="xl:col-span-3 lg:col-span-4 col-span-12 row-start-2 lg:row-start-auto">
              <div className="flex flex-col gap-y-4 sidebar sticky top-20">
                <div className="rounded-2xl border border-gray-300">
                  <div className="w-full h-[194px] relative overflow-hidden rounded-t-2xl">
                    <Image
                      src="/images/home-3/mango-juice-bg.png"
                      alt="mango-juice-bg"
                      fill
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  </div>
                  {/* content-section */}
                  <div className="pt-[40px] pb-6 px-6 flex flex-col gap-y-6 relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="z-50 size-[64px] absolute top-[-32px] left-1/2 -translate-x-1/2 flex items-center justify-center p-1 bg-white rounded-full border-4 border-white overflow-hidden shadow-sm before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[-4px] before:z-[-1] before:w-[144px] before:h-[64px] before:bg-[url('/images/vendor-filter-top-shape.png')] before:bg-no-repeat"
                    >
                      <Image
                        src="/images/home-3/watermelon.png"
                        alt="watermelon"
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex flex-col items-center text-center gap-y-2"
                    >
                      <h5>Riveup Digital</h5>
                      <p>
                        Fresh Produce, Fruits &amp; Vegetables, Organic
                        Groceries, Dairy Products, Breads &amp; Bakery, Meat
                        &amp; Seafood
                      </p>
                      <div className="rating-section flex items-center mt-[2px]">
                        <StarRating ratingPercentage={"80%"} />
                        <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                          (189)
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex flex-col gap-y-6 divide-y divide-gray-300"
                    >
                      <div className="flex items-center justify-between gap-x-2 pb-6">
                        <div className="flex flex-col items-center gap-y-1 p-4 rounded-2xl border border-gray-300 flex-1">
                          <p className="text-sm leading-[22px] font-medium">
                            Total Product
                          </p>
                          <h6 className="text-light-primary-text">220</h6>
                        </div>
                        <div className="flex flex-col items-center gap-y-1 p-4 rounded-2xl border border-gray-300 flex-1">
                          <p className="text-sm leading-[22px] font-medium">
                            Follower
                          </p>
                          <h6 className="text-light-primary-text">49M</h6>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="btn btn-small flex-1 hover:text-primary transition-colors duration-300 ease-in-out group">
                          <span className="inline-flex items-center justify-center">
                            <i className="hgi hgi-stroke hgi-plus-sign text-[18px] leading-[18px] text-light-primary-text font-semibold group-hover:text-primary" />{" "}
                          </span>
                          Follow
                        </button>
                        <button className="btn btn-small flex-1 hover:text-primary transition-colors duration-300 ease-in-out group">
                          <span className="inline-flex items-center justify-center">
                            <i className="hgi hgi-stroke hgi-share-03 text-[18px] leading-[18px] text-light-primary-text font-semibold group-hover:text-primary" />{" "}
                          </span>
                          Share
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <SidebarFilterOne />
              </div>
            </div>
            <div className="xl:col-span-9 lg:col-span-8 col-span-12 row-start-1 lg:row-start-auto">
              <VendorHeroWithSearch />
              <FilterBarThree
                viewMode={viewMode}
                setViewMode={setViewMode}
                onOpenFilter={() => setIsFilterOpen(true)}
                totalResults={MOCK_PRODUCTS.length}
                showingEnd={MOCK_PRODUCTS.length}
              />
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-12 gap-6 pb-12"
                    : "flex flex-col gap-6 pb-12"
                }
              >
                {MOCK_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className={
                      viewMode === "grid"
                        ? "2xl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12"
                        : "w-full"
                    }
                  >
                    {viewMode === "grid" ? (
                      <ProductCardOne
                        image={product.image}
                        title={product.title}
                        ratingPercentage={product.ratingPercentage}
                        ratingCount={product.ratingCount}
                        currentPrice={`$${product.currentPrice}`}
                        oldPrice={`$${product.oldPrice}`}
                        discount={product.discount}
                        className="mx-0"
                        variant="transparent"
                      />
                    ) : (
                      <HorizontalProductCard
                        image={product.image}
                        category={product.category}
                        sellerName={product.sellerName}
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
              {/* pagination */}
              <Pagination />
            </div>
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
