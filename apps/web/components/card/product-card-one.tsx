"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import StarRating from "@/components/common/star-rating";

import { useQuickView } from "@/context/quick-view-context";

export interface ProductCardOneProps {
  image: string;
  title: string;
  ratingPercentage: number;
  ratingCount: number;
  currentPrice: number | string;
  oldPrice?: number | string;
  discount?: string;
  badgeText?: string;
  badgeClass?: string;
  badgeShapeClass?: string;
  badgeVariant?: "success" | "error" | "default";
  productUrl?: string;
  variant?: "gray" | "pink" | "transparent";
  delay?: number;
  className?: string;
  stockStatus?: "in-stock" | "out-of-stock" | "notified";
  deliveryTime?: string;
  storeName?: string;
}

export default function ProductCardOne({
  image,
  title,
  ratingPercentage,
  ratingCount,
  currentPrice,
  oldPrice,
  discount,
  badgeText,
  badgeClass,
  badgeShapeClass,
  badgeVariant = "default",
  productUrl = "/product-details",
  variant = "gray",
  delay = 0.2,
  className = "",
  stockStatus = "in-stock",
  deliveryTime,
  storeName,
}: ProductCardOneProps) {
  const { openQuickView } = useQuickView();

  const variantBg = {
    gray: "bg-[#F4F3F5]",
    pink: "bg-[#FFEFF6]",
    transparent: "bg-transparent",
  };

  const badgeConfig = {
    success: {
      bg: "bg-success-light text-black",
      shape: "after:bg-[url(/images/discount-primary-shape.png)]",
    },
    error: {
      bg: "bg-error text-warning-lighter",
      shape: "after:bg-[url(/images/discount-shape.png)]",
    },
    default: {
      bg: "",
      shape: "",
    },
  };

  const activeBadgeBg = badgeClass || badgeConfig[badgeVariant]?.bg;
  const activeBadgeShape = badgeShapeClass || badgeConfig[badgeVariant]?.shape;
  const bgColor = variantBg[variant] || variantBg.gray;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "border border-gray-200/90 rounded-2xl p-3 sm:p-4 bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-2xs",
        className,
      )}
    >
      <div className="product-image-container relative">
        <div
          className={cn(
            "product-image rounded-xl mb-2.5 sm:mb-3 overflow-hidden relative w-full pt-[100%]",
            bgColor,
          )}
        >
          {/* Floating Eye Action Button (Direct Link to Product) */}
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
              alt={title || "product"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300"
            />
          </Link>
        </div>
        {badgeText && badgeVariant !== "default" && (
          <span
            className={cn(
              "product-discount-badge z-20 absolute top-[11px] left-0 font-normal text-xs leading-[20px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-contain",
              activeBadgeBg,
              activeBadgeShape,
            )}
          >
            {badgeText}
          </span>
        )}
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
      <div className="product-content flex flex-col justify-between flex-1">
        <div>
          {deliveryTime && (
            <p className="inline-flex items-center gap-x-1 px-1.5 py-0.5 bg-gray-100 rounded text-[11px] text-gray-600 mb-2">
              <i className="hgi hgi-stroke hgi-delivery-truck-02 text-xs text-light-secondary-text" />
              <span>{deliveryTime}</span>
            </p>
          )}
          {storeName && (
            <p className="text-xs text-gray-500 mb-1">{storeName}</p>
          )}
          <h5 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
            <Link href={productUrl} className="hover:text-primary transition-colors line-clamp-2">
              {title}
            </Link>
          </h5>
          <div className="rating-section flex items-center mb-2 scale-90 sm:scale-100 origin-left">
            <StarRating ratingPercentage={ratingPercentage} />
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium inline-block ml-1">
              ({ratingCount})
            </span>
          </div>
          <div className="price-section flex items-center gap-x-2 mb-2.5">
            <span className="current-price text-sm sm:text-base font-bold text-gray-900">
              {currentPrice}
            </span>
            {oldPrice && (
              <span className="old-price text-xs font-normal text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="discount-percentage text-[11px] font-semibold text-rose-600">
                {discount}
              </span>
            )}
          </div>
        </div>
        <div className="btn-section flex items-center gap-x-2 pt-1">
          {stockStatus === "in-stock" && (
            <button className="btn btn-primary rounded-full font-bold text-xs sm:text-sm py-2 px-3 flex-1 flex items-center justify-center gap-1.5 shadow-xs">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-sm sm:text-base text-white" />
              <span>Ajouter</span>
            </button>
          )}

          {stockStatus === "out-of-stock" && (
            <button className="btn btn-error rounded-full font-semibold text-xs sm:text-sm py-2 px-3 flex-1">
              <i className="hgi hgi-stroke hgi-notification-01 text-sm text-white mr-1" />
              <span>Rupture</span>
            </button>
          )}

          {stockStatus === "notified" && (
            <button className="btn btn-disabled rounded-full font-semibold text-xs sm:text-sm py-2 px-3 flex-1 text-[#919EABCC]">
              <span>Prévenu</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
