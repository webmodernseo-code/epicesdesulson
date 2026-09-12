"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye } from "lucide-react";
import { useQuickView } from "@/context/quick-view-context";
import StarRating from "@/components/common/star-rating";

export interface ProductCardTwoProps {
  image: string;
  title: string;
  badgeText?: string;
  storeName?: string;
  currentPrice: string | number;
  oldPrice?: string | number;
  discount?: string;
  ratingPercentage: number;
  ratingCount: number;
  soldCount: number;
  availableCount: number;
  progressPercentage: number;
  productUrl?: string;
  delay?: number;
}

export default function ProductCardTwo({
  image,
  title,
  badgeText,
  storeName,
  currentPrice,
  oldPrice,
  discount,
  ratingPercentage,
  ratingCount,
  soldCount,
  availableCount,
  progressPercentage,
  productUrl = "/product-details",
  delay = 0.2,
}: ProductCardTwoProps) {
  const { openQuickView } = useQuickView();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="mx-2 sm:mx-3"
    >
      <div className="bg-white rounded-2xl border border-gray-200/90 p-3 sm:p-4 group shadow-2xs hover:shadow-md transition-all">
        <div className="product-image-container relative">
          <div className="product-image rounded-xl mb-3 overflow-hidden h-[180px] sm:h-[280px] relative bg-gray-50/80">
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
                className="group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 object-cover"
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
                  onClick={() =>
                    openQuickView({ image, title, currentPrice, oldPrice })
                  }
                  aria-label="Aperçu rapide"
                  className="quick-view-sidebar-btn product-btn-action-item relative size-9 sm:size-10 bg-white inline-flex items-center justify-center rounded-tr-sm rounded-br-sm shadow-xs hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <i className="hgi hgi-stroke hgi-view text-lg sm:text-xl text-light-primary-text" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-content">
          {badgeText && (
            <span className="product-discount-badge inline-block relative bg-error text-white font-medium text-xs leading-[20px] px-1.5 rounded-sm uppercase mb-1">
              {badgeText}
            </span>
          )}
          {storeName && (
            <p className="text-xs text-gray-500 mb-1">{storeName}</p>
          )}
          <h6 className="text-sm sm:text-base font-bold text-gray-900 pb-2 line-clamp-1">
            <Link href={productUrl} className="hover:text-primary transition-colors">{title}</Link>
          </h6>
          <div className="price-section flex items-center gap-x-2 mb-2">
            <span className="current-price text-sm sm:text-base font-bold text-gray-900">
              {currentPrice}
            </span>
            {oldPrice && (
              <span className="old-price text-xs text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="discount-percentage text-xs font-semibold text-rose-600">
                {discount}
              </span>
            )}
          </div>
          <div className="rating-section flex items-center mb-2 scale-90 sm:scale-100 origin-left">
            <StarRating ratingPercentage={`${ratingPercentage}%`} />
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium inline-block ml-1">
              ({ratingCount})
            </span>
          </div>
          <div className="deal-progress flex flex-col gap-y-1 mb-3">
            <div className="progress w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="progress-bar h-full bg-emerald-600 rounded-full"
              />
            </div>
            <div className="deal-stock flex items-center justify-between text-xs text-gray-500">
              <div className="stock-sold flex items-center gap-x-1">
                <span>Vendus :</span>
                <span className="font-semibold text-gray-900">{soldCount}</span>
              </div>
              <div className="stock-remaining flex items-center gap-x-1">
                <span>Dispo :</span>
                <span className="font-semibold text-gray-900">{availableCount}</span>
              </div>
            </div>
          </div>
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
