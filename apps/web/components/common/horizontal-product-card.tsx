"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import StarRating from "@/components/common/star-rating";

interface HorizontalProductCardProps {
  image: string;
  category: string;
  sellerName?: string;
  title: string;
  titleHref?: string;
  ratingPercentage: number;
  reviewCount: number;
  currentPrice: string | number;
  oldPrice?: string | number;
  addToCartHref?: string;
}

export default function HorizontalProductCard({
  image,
  category,
  sellerName,
  title,
  titleHref = "#",
  ratingPercentage,
  reviewCount,
  currentPrice,
  oldPrice,
  addToCartHref = "#",
}: HorizontalProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border border-gray-200/90 rounded-2xl p-3 sm:p-4 bg-white shadow-2xs hover:shadow-xs transition-all"
    >
      <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-4 group">
        <div className="w-full sm:w-[120px] h-[140px] sm:h-[120px] rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden relative">
          <Link
            href={titleHref}
            aria-label={`Voir la fiche de ${title}`}
            title="Voir la fiche produit"
            className="absolute top-2 right-2 z-10 size-7 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-emerald-700 border border-gray-200/80 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <Eye className="size-3.5" />
          </Link>
          <Link href={titleHref} className="w-full h-full flex items-center justify-center">
            <Image
              src={image}
              width={120}
              height={120}
              className="w-full h-full object-contain rounded-xl p-2 group-hover:scale-105 transition-transform"
              alt={title}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-y-2 flex-1 w-full">
          <p className="text-xs text-gray-500">
            {category} {sellerName ? `/ ${sellerName}` : ""}
          </p>
          <Link
            href={titleHref}
            className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-primary transition-colors line-clamp-1"
          >
            {title}
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <div>
              <div className="rating-section flex items-center scale-90 origin-left mb-1">
                <StarRating ratingPercentage={`${ratingPercentage}%`} />
                <span className="text-[11px] text-gray-500 font-medium ml-1">
                  ({reviewCount})
                </span>
              </div>

              <div className="price-section flex items-center gap-x-2">
                <span className="current-price font-bold text-sm sm:text-base text-gray-900">
                  {typeof currentPrice === "number"
                    ? `${currentPrice.toFixed(2)} €`
                    : currentPrice}
                </span>
                {oldPrice && (
                  <span className="old-price text-xs text-gray-400 line-through">
                    {typeof oldPrice === "number"
                      ? `${oldPrice.toFixed(2)} €`
                      : oldPrice}
                  </span>
                )}
              </div>
            </div>

            <Link
              href={addToCartHref}
              className="btn btn-primary px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs"
            >
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-sm text-white" />
              <span>Ajouter</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
