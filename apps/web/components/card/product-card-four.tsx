"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuickView } from "@/context/quick-view-context";
import StarRating from "@/components/common/star-rating";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = ["#D0AEFF", "#5ED9BA", "#FFC107", "#74CAFF", "#84A9FF"];

export interface ProductCardFourProps {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  oldPrice: string;
  discount: string;
  productUrl?: string;
}

export default function ProductCardFour({
  image,
  title,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
  productUrl = "/product-details",
}: ProductCardFourProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { openQuickView } = useQuickView();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-gray-300 rounded-2xl product-card-1 p-6 group h-full flex flex-col"
    >
      {/* Image */}
      <div className="product-image-container relative">
        <div className="product-image rounded-xl mb-3 overflow-hidden aspect-square bg-[#F4F3F5] relative">
          <Link href={productUrl} className="absolute inset-0 z-1">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 object-contain p-4"
            />
          </Link>
        </div>
        <div className="product-btn-actions absolute bottom-0 right-0 left-0 flex justify-center z-9 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-3">
          <ul className="flex items-center gap-x-px">
            <li>
              <button
                aria-label="Add to Wishlist"
                className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tl-sm rounded-bl-sm TooltipTrigger"
              >
                <i className="hgi hgi-stroke hgi-favourite text-2xl leading-6 text-light-secondary-text" />
              </button>
            </li>
            <li>
              <Link
                aria-label="Compare"
                href="/compare"
                className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center TooltipTrigger"
              >
                <i className="hgi hgi-stroke hgi-reload text-2xl leading-6 text-light-primary-text" />
              </Link>
            </li>
            <li>
              <button
                onClick={() => openQuickView({ image, title, price, oldPrice })}
                aria-label="Quick view"
                className="quick-view-sidebar-btn product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tr-sm rounded-br-sm TooltipTrigger"
              >
                <i className="hgi hgi-stroke hgi-view text-2xl leading-6 text-light-primary-text" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="product-content flex flex-col grow">
        <h5 className="text-[20px] leading-[30px] font-bold pb-4">
          <Link href={productUrl} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h5>

        {/* Rating */}
        <div className="rating-section flex items-center mb-4">
          <StarRating ratingPercentage={`${rating}%`} />
          <span className="text-sm leading-[22px] font-normal inline-block ml-1">
            ({reviews})
          </span>
        </div>

        {/* Sizes */}
        <div className="size-variation-section mb-4">
          <div className="size-variation-items flex items-center gap-3 flex-wrap">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`cursor-pointer flex items-center justify-center text-sm leading-6 px-4 py-[7px] font-semibold border rounded-lg transition-colors min-w-[45px] ${
                  selectedSize === size
                    ? "border-primary bg-[rgba(0,171,85,0.08)] text-primary"
                    : "border-gray-300 text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="variation-buttons flex gap-x-2.5 mb-3">
          {COLORS.map((color) => (
            <div
              key={color}
              className="variation-color-item p-1 rounded-full border transition-all"
              style={{
                borderColor: selectedColor === color ? color : "transparent",
              }}
            >
              <button
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className="size-6 rounded-full flex items-center justify-center cursor-pointer shadow-sm"
              >
                <i
                  className={`hgi hgi-stroke hgi-tick-02 text-white text-xs ${
                    selectedColor === color ? "block" : "hidden"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="price-section flex items-center gap-x-3 mb-4">
            <span className="current-price text-[20px] font-urbanist leading-[30px] font-bold text-light-primary-text">
              {price}
            </span>
            <span className="old-price text-[20px] font-urbanist font-medium leading-[30px] text-light-disabled-text line-through">
              {oldPrice}
            </span>
            <span className="discount-percentage text-[20px] font-urbanist font-medium leading-[30px] text-error">
              {discount}
            </span>
          </div>

          {/* Actions */}
          <div className="btn-section flex items-center gap-x-4">
            <button className="size-11 flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors">
              <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
            </button>
            <button className="btn btn-primary rounded-full font-semibold text-sm leading-6 px-6.5 py-3 flex-1 flex items-center justify-center gap-2">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
