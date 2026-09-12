"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
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
      className="border border-gray-200/90 rounded-2xl bg-white p-3.5 sm:p-5 group h-full flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
    >
      {/* Image */}
      <div className="product-image-container relative">
        <div className="product-image rounded-xl mb-3 overflow-hidden aspect-square bg-gray-50/80 relative">
          {/* Floating Eye Action Button */}
          <Link
            href={productUrl}
            aria-label={`Voir la fiche détaillée de ${title}`}
            title="Voir la fiche produit"
            className="absolute top-2 right-2 z-20 size-7 sm:size-8 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-emerald-700 border border-gray-200/80 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <Eye className="size-3.5 sm:size-4" />
          </Link>

          <Link href={productUrl} className="absolute inset-0 z-1">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 object-contain p-3"
            />
          </Link>
        </div>
        <div className="product-btn-actions absolute bottom-0 right-0 left-0 flex justify-center z-9 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-2">
          <ul className="flex items-center gap-x-px">
            <li>
              <button
                aria-label="Ajouter aux favoris"
                className="product-btn-action-item relative size-9 sm:size-10 bg-white inline-flex items-center justify-center rounded-tl-sm rounded-bl-sm shadow-xs hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <i className="hgi hgi-stroke hgi-favourite text-lg sm:text-xl text-light-secondary-text" />
              </button>
            </li>
            <li>
              <button
                onClick={() => openQuickView({ image, title, price, oldPrice })}
                aria-label="Aperçu rapide"
                className="quick-view-sidebar-btn product-btn-action-item relative size-9 sm:size-10 bg-white inline-flex items-center justify-center rounded-tr-sm rounded-br-sm shadow-xs hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <i className="hgi hgi-stroke hgi-view text-lg sm:text-xl text-light-primary-text" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="product-content flex flex-col grow justify-between">
        <div>
          <h5 className="text-sm sm:text-base font-bold text-gray-900 pb-2">
            <Link href={productUrl} className="hover:text-primary transition-colors line-clamp-2">
              {title}
            </Link>
          </h5>

          {/* Rating */}
          <div className="rating-section flex items-center mb-2 scale-90 sm:scale-100 origin-left">
            <StarRating ratingPercentage={`${rating}%`} />
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium inline-block ml-1">
              ({reviews})
            </span>
          </div>

          {/* Sizes */}
          <div className="size-variation-section mb-2.5">
            <div className="size-variation-items flex items-center gap-1.5 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer flex items-center justify-center text-xs px-2.5 py-1 font-semibold border rounded-lg transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-emerald-50 text-primary"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="variation-buttons flex gap-x-1.5 mb-2.5">
            {COLORS.map((color) => (
              <div
                key={color}
                className="variation-color-item p-0.5 rounded-full border transition-all"
                style={{
                  borderColor: selectedColor === color ? color : "transparent",
                }}
              >
                <button
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className="size-5 rounded-full flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <i
                    className={`hgi hgi-stroke hgi-tick-02 text-white text-[10px] ${
                      selectedColor === color ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100">
          {/* Price */}
          <div className="price-section flex items-center gap-x-2 mb-2.5">
            <span className="current-price text-sm sm:text-base font-bold text-gray-900">
              {price}
            </span>
            <span className="old-price text-xs text-gray-400 line-through">
              {oldPrice}
            </span>
            <span className="discount-percentage text-[11px] font-semibold text-rose-600">
              {discount}
            </span>
          </div>

          {/* Actions */}
          <div className="btn-section flex items-center gap-x-2">
            <button className="btn btn-primary rounded-full font-bold text-xs sm:text-sm py-2 px-3 flex-1 flex items-center justify-center gap-1.5 shadow-xs">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-sm sm:text-base text-white" />
              <span>Ajouter</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
