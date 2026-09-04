"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import { useQuickView } from "@/context/quick-view-context";
import StarRating from "@/components/common/star-rating";

interface ProductItem {
  id: number;
  image: string;
  badge: string;
  title: string;
  currentPrice: string;
  oldPrice: string;
  ratingCount: string;
  packId: string;
  delay: string;
}

const TABS_DATA: Record<string, ProductItem[]> = {
  meat: [
    {
      id: 1,
      image: "/images/home-3/cabbage.png",
      badge: "Sale",
      title: "Brown Basmati Rice",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-1",
      delay: ".2s",
    },
    {
      id: 2,
      image: "/images/home-3/strawberry.png",
      badge: "Sale",
      title: "Fresh Spinach Leaves",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-2",
      delay: ".3s",
    },
    {
      id: 3,
      image: "/images/home-3/avocado.png",
      badge: "",
      title: "Ripe Bananas",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-3",
      delay: ".4s",
    },
    {
      id: 4,
      image: "/images/home-3/kiwi.png",
      badge: "",
      title: "Almond Milk",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-4",
      delay: ".5s",
    },
    {
      id: 5,
      image: "/images/home-3/apple.png",
      badge: "",
      title: "Cherry Tomatoes",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-5",
      delay: ".6s",
    },
    {
      id: 6,
      image: "/images/home-3/lettuce.png",
      badge: "",
      title: "Organic Avocados",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-6",
      delay: ".7s",
    },
    {
      id: 7,
      image: "/images/home-3/chicken-meat.png",
      badge: "Sale",
      title: "Fresh Organic Apples",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-7",
      delay: ".2s",
    },
    {
      id: 8,
      image: "/images/home-3/aptamil.png",
      badge: "Sale",
      title: "Whole Wheat Bread",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-8",
      delay: ".3s",
    },
    {
      id: 9,
      image: "/images/home-3/apple-juice-small.png",
      badge: "",
      title: "Free-Range Eggs",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-9",
      delay: ".4s",
    },
    {
      id: 10,
      image: "/images/home-3/lime-chips.png",
      badge: "",
      title: "Natural Greek Yogurt",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-10",
      delay: ".5s",
    },
    {
      id: 11,
      image: "/images/home-3/veggie-pops.png",
      badge: "",
      title: "Organic Baby Carrots",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-11",
      delay: ".6s",
    },
    {
      id: 12,
      image: "/images/home-3/juice-1.png",
      badge: "",
      title: "Fresh Atlantic Salmon",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-12",
      delay: ".7s",
    },
  ],
  deli: [
    {
      id: 1,
      image: "/images/home-3/strawberry.png",
      badge: "Sale",
      title: "Fresh Organic Apples",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-13",
      delay: ".2s",
    },
    {
      id: 2,
      image: "/images/home-3/lettuce.png",
      badge: "Sale",
      title: "Whole Wheat Bread",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-14",
      delay: ".2s",
    },
    {
      id: 3,
      image: "/images/home-3/juice-1.png",
      badge: "",
      title: "Free-Range Eggs",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-15",
      delay: ".2s",
    },
    {
      id: 4,
      image: "/images/home-3/cabbage.png",
      badge: "",
      title: "Natural Greek Yogurt",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-16",
      delay: ".2s",
    },
    {
      id: 5,
      image: "/images/home-3/lime-chips.png",
      badge: "",
      title: "Organic Baby Carrots",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-17",
      delay: ".2s",
    },
    {
      id: 6,
      image: "/images/home-3/kiwi.png",
      badge: "",
      title: "Fresh Atlantic Salmon",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-18",
      delay: ".2s",
    },
    {
      id: 7,
      image: "/images/home-3/aptamil.png",
      badge: "Sale",
      title: "Brown Basmati Rice",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-19",
      delay: ".2s",
    },
    {
      id: 8,
      image: "/images/home-3/strawberry-snacks.png",
      badge: "Sale",
      title: "Fresh Spinach Leaves",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-20",
      delay: ".2s",
    },
    {
      id: 9,
      image: "/images/home-3/veggie-pops.png",
      badge: "",
      title: "Ripe Bananas",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-21",
      delay: ".2s",
    },
    {
      id: 10,
      image: "/images/home-3/apple-juice-small.png",
      badge: "",
      title: "Almond Milk",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-22",
      delay: ".2s",
    },
    {
      id: 11,
      image: "/images/home-3/chicken-meat.png",
      badge: "",
      title: "Cherry Tomatoes",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-23",
      delay: ".2s",
    },
    {
      id: 12,
      image: "/images/home-3/avocado.png",
      badge: "",
      title: "Organic Avocados",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-24",
      delay: ".2s",
    },
  ],
  seafood: [
    {
      id: 1,
      image: "/images/home-3/watermelon.png",
      badge: "Sale",
      title: "Brown Basmati Rice",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-25",
      delay: ".2s",
    },
    {
      id: 2,
      image: "/images/home-3/strawberry-snacks.png",
      badge: "Sale",
      title: "Fresh Spinach Leaves",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-26",
      delay: ".2s",
    },
    {
      id: 3,
      image: "/images/home-3/aptamil.png",
      badge: "",
      title: "Ripe Bananas",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-27",
      delay: ".2s",
    },
    {
      id: 4,
      image: "/images/home-3/apple-juice-small.png",
      badge: "",
      title: "Almond Milk",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-28",
      delay: ".2s",
    },
    {
      id: 5,
      image: "/images/home-3/chicken-meat.png",
      badge: "",
      title: "Cherry Tomatoes",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-29",
      delay: ".2s",
    },
    {
      id: 6,
      image: "/images/home-3/avocado.png",
      badge: "",
      title: "Organic Avocados",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-30",
      delay: ".2s",
    },
    {
      id: 7,
      image: "/images/home-3/lime-chips.png",
      badge: "Sale",
      title: "Fresh Organic Apples",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-31",
      delay: ".2s",
    },
    {
      id: 8,
      image: "/images/home-3/veggie-pops.png",
      badge: "Sale",
      title: "Whole Wheat Bread",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-32",
      delay: ".2s",
    },
    {
      id: 9,
      image: "/images/home-3/strawberry.png",
      badge: "",
      title: "Free-Range Eggs",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-33",
      delay: ".2s",
    },
    {
      id: 10,
      image: "/images/home-3/lettuce.png",
      badge: "",
      title: "Natural Greek Yogurt",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-34",
      delay: ".2s",
    },
    {
      id: 11,
      image: "/images/home-3/juice-1.png",
      badge: "",
      title: "Organic Baby Carrots",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-35",
      delay: ".2s",
    },
    {
      id: 12,
      image: "/images/home-3/cabbage.png",
      badge: "",
      title: "Fresh Atlantic Salmon",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-36",
      delay: ".2s",
    },
  ],
  bakery: [
    {
      id: 1,
      image: "/images/home-3/strawberry.png",
      badge: "Sale",
      title: "Fresh Organic Apples",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-37",
      delay: ".2s",
    },
    {
      id: 2,
      image: "/images/home-3/lime-chips.png",
      badge: "Sale",
      title: "Whole Wheat Bread",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-38",
      delay: ".2s",
    },
    {
      id: 3,
      image: "/images/home-3/cabbage.png",
      badge: "",
      title: "Free-Range Eggs",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-39",
      delay: ".2s",
    },
    {
      id: 4,
      image: "/images/home-3/juice-1.png",
      badge: "",
      title: "Natural Greek Yogurt",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-40",
      delay: ".2s",
    },
    {
      id: 5,
      image: "/images/home-3/veggie-pops.png",
      badge: "",
      title: "Organic Baby Carrots",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-41",
      delay: ".2s",
    },
    {
      id: 6,
      image: "/images/home-3/lettuce.png",
      badge: "",
      title: "Fresh Atlantic Salmon",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-42",
      delay: ".2s",
    },
    {
      id: 7,
      image: "/images/home-3/avocado.png",
      badge: "Sale",
      title: "Brown Basmati Rice",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-43",
      delay: ".2s",
    },
    {
      id: 8,
      image: "/images/home-3/strawberry-snacks.png",
      badge: "Sale",
      title: "Fresh Spinach Leaves",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-44",
      delay: ".2s",
    },
    {
      id: 9,
      image: "/images/home-3/aptamil.png",
      badge: "",
      title: "Ripe Bananas",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-45",
      delay: ".2s",
    },
    {
      id: 10,
      image: "/images/home-3/apple-juice.png",
      badge: "",
      title: "Almond Milk",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-46",
      delay: ".2s",
    },
    {
      id: 11,
      image: "/images/home-3/chicken-meat.png",
      badge: "",
      title: "Cherry Tomatoes",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-47",
      delay: ".2s",
    },
    {
      id: 12,
      image: "/images/home-3/watermelon.png",
      badge: "",
      title: "Organic Avocados",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-48",
      delay: ".2s",
    },
  ],
  vegetable: [
    {
      id: 1,
      image: "/images/home-3/cabbage.png",
      badge: "Sale",
      title: "Fresh Organic Apples",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-49",
      delay: ".2s",
    },
    {
      id: 2,
      image: "/images/home-3/juice-1.png",
      badge: "Sale",
      title: "Whole Wheat Bread",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-50",
      delay: ".2s",
    },
    {
      id: 3,
      image: "/images/home-3/strawberry.png",
      badge: "",
      title: "Free-Range Eggs",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-51",
      delay: ".2s",
    },
    {
      id: 4,
      image: "/images/home-3/lettuce.png",
      badge: "",
      title: "Natural Greek Yogurt",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-52",
      delay: ".2s",
    },
    {
      id: 5,
      image: "/images/home-3/watermelon.png",
      badge: "",
      title: "Organic Baby Carrots",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-53",
      delay: ".2s",
    },
    {
      id: 6,
      image: "/images/home-3/lime-chips.png",
      badge: "",
      title: "Fresh Atlantic Salmon",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-54",
      delay: ".2s",
    },
    {
      id: 7,
      image: "/images/home-3/veggie-pops.png",
      badge: "Sale",
      title: "Brown Basmati Rice",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-55",
      delay: ".2s",
    },
    {
      id: 8,
      image: "/images/home-3/strawberry-snacks.png",
      badge: "Sale",
      title: "Fresh Spinach Leaves",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-56",
      delay: ".2s",
    },
    {
      id: 9,
      image: "/images/home-3/papaya.png",
      badge: "",
      title: "Ripe Bananas",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-57",
      delay: ".2s",
    },
    {
      id: 10,
      image: "/images/home-3/greek-plain.png",
      badge: "",
      title: "Almond Milk",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-58",
      delay: ".2s",
    },
    {
      id: 11,
      image: "/images/home-3/lemon-juice.png",
      badge: "",
      title: "Cherry Tomatoes",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-59",
      delay: ".2s",
    },
    {
      id: 12,
      image: "/images/home-3/avocado.png",
      badge: "",
      title: "Organic Avocados",
      currentPrice: "$27.46",
      oldPrice: "$29.99",
      ratingCount: "189",
      packId: "sorting-pack-60",
      delay: ".2s",
    },
  ],
};

const TABS = [
  { id: "meat", label: "Meat" },
  { id: "deli", label: "Deli" },
  { id: "seafood", label: "Seafood" },
  { id: "bakery", label: "Bakery" },
  { id: "vegetable", label: "Vegetable" },
];

export default function PopularProductTab() {
  const [activeTab, setActiveTab] = useState("meat");
  const { openQuickView } = useQuickView();

  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="mb-10 text-center flex flex-col gap-y-6 xl:flex-row items-center justify-between border-b border-gray-300">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-light-primary-text"
          >
            Popular Groceries Weekly
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-x-4 max-w-full"
          >
            <div className="flex gap-x-8 overflow-x-auto overflow-y-hidden whitespace-nowrap home-four-product-filter">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pt-[13px] pb-9 text-sm leading-[22px] font-medium",
                    activeTab === tab.id &&
                      "font-semibold border-b-2 border-text-light-primary-text",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="tab-content" id="deal-tab-content">
          <div className="tab-pane active" id={activeTab}>
            <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-6">
              {TABS_DATA[activeTab].map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: parseFloat(product.delay),
                  }}
                  className="mx-3"
                >
                  <div className="border border-gray-300 rounded-2xl product-card-1 p-4 group">
                    <div className="product-image-container relative">
                      <div className="product-image rounded-xl mb-4 overflow-hidden h-[220px]">
                        <Link href="/product-details">
                          <Image
                            src={product.image}
                            alt={`product-${product.id}`}
                            width={300}
                            height={220}
                            className="w-full h-auto group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 bg-white h-full w-full object-cover"
                          />
                        </Link>
                      </div>
                      {product.badge && (
                        <span className="product-discount-badge absolute top-0 left-0 bg-error text-white font-normal uppercase text-xs leading-[18px] rounded-md py-px px-2">
                          {product.badge}
                        </span>
                      )}
                      <div className="product-btn-actions absolute bottom-0 right-0 left-0 flex justify-center z-9 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-3">
                        <ul className="flex items-center gap-x-px">
                          <li>
                            <Link
                              aria-label="Add to Wishlist"
                              className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tl-sm rounded-bl-sm before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
                              href="/wishlist-style-v1"
                            >
                              <i className="hgi hgi-stroke hgi-favourite text-2xl leading-6 text-light-secondary-text" />
                            </Link>
                          </li>
                          <li>
                            <Link
                              aria-label="Compare"
                              className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
                              href="/compare"
                            >
                              <i className="hgi hgi-stroke hgi-reload text-2xl leading-6 text-light-primary-text" />
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => openQuickView(product)}
                              aria-label="Quick view"
                              className="quick-view-sidebar-btn product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tr-sm rounded-br-sm before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
                            >
                              <i className="hgi hgi-stroke hgi-view text-2xl leading-6 text-light-primary-text" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-y-3 product-content">
                      <div className="rating-section flex items-center">
                        <StarRating ratingPercentage={"80%"} />
                        <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                          ({product.ratingCount})
                        </span>
                      </div>
                      <Link
                        href="/product-details"
                        className="font-semibold text-light-primary-text group-hover:text-primary transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        {product.title}
                      </Link>
                      <div className="price-section flex items-center gap-x-3">
                        <span className="current-price font-semibold text-primary">
                          {product.currentPrice}
                        </span>
                        <span className="old-price font-normal text-light-disabled-text line-through">
                          {product.oldPrice}
                        </span>
                      </div>
                      <CustomFloatingSelect
                        options={[
                          { value: "", label: "500g pack" },
                          { value: "1", label: "400g pack" },
                          { value: "2", label: "300g pack" },
                          { value: "3", label: "200g pack" },
                          { value: "4", label: "100g pack" },
                        ]}
                        label="Select Pack"
                        defaultValue=""
                        className="flex-1"
                      />
                      <div className="btn-section flex items-center gap-x-4">
                        <Link
                          href="/wishlist-style-v1"
                          className="size-11 flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
                        >
                          <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
                        </Link>
                        <Link
                          href="/cart-single-vendor"
                          className="btn btn-primary rounded-full font-semibold text-sm leading-6 px-6.5 py-2 flex-1"
                        >
                          <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
                          <span>Add to Cart</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
