"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
        "border border-gray-300 rounded-2xl product-card-1 p-4 group",
        className,
      )}
    >
      <div className="product-image-container relative">
        <div
          className={cn(
            "product-image rounded-xl mb-4 overflow-hidden relative w-full pt-[100%]",
            bgColor,
          )}
        >
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
              "product-discount-badge z-20 absolute top-[11px] left-0 font-normal text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-contain",
              activeBadgeBg,
              activeBadgeShape,
            )}
          >
            {badgeText}
          </span>
        )}
        <div className="product-btn-actions absolute bottom-0 right-0 left-0 flex justify-center z-9 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-3">
          <ul className="flex items-center gap-x-px">
            <li>
              <button
                aria-label="Add to Wishlist"
                className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tl-sm rounded-bl-sm before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
              >
                <i className="hgi hgi-stroke hgi-favourite text-2xl leading-6 text-light-secondary-text" />
              </button>
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
                onClick={() =>
                  openQuickView({ image, title, currentPrice, oldPrice })
                }
                aria-label="Quick view"
                className="quick-view-sidebar-btn product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tr-sm rounded-br-sm before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
              >
                <i className="hgi hgi-stroke hgi-view text-2xl leading-6 text-light-primary-text" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="product-content">
        {deliveryTime && (
          <p className="inline-flex items-center gap-x-1 px-1 py-0.5 bg-gray-200 rounded-sm mb-4">
            <i className="hgi hgi-stroke hgi-delivery-truck-02 text-base text-light-secondary-text" />
            <span className="text-sm leading-[18px]">{deliveryTime}</span>
          </p>
        )}
        {storeName && (
          <p className="text-sm leading-[22px] mb-4">{storeName}</p>
        )}
        <h5 className="text-base leading-6 font-semibold font-dm-sans mb-4">
          <Link href={productUrl} className="hover:text-primary line-clamp-2">
            {title}
          </Link>
        </h5>
        <div className="rating-section flex items-center mb-4">
          <StarRating ratingPercentage={ratingPercentage} />
          <span className="text-sm leading-[22px] font-normal inline-block ml-1">
            ({ratingCount})
          </span>
        </div>
        <div className="price-section flex items-center gap-x-3 mb-2">
          <span className="current-price text-base font-semibold text-light-primary-text">
            {currentPrice}
          </span>
          {oldPrice && (
            <span className="old-price text-sm leading-[22px] font-normal text-light-disabled-text line-through">
              {oldPrice}
            </span>
          )}
          {discount && (
            <span className="discount-percentage text-sm leading-[22px] font-semibold text-error">
              {discount}
            </span>
          )}
        </div>
        <div className="btn-section flex items-center gap-x-4">
          <button className="size-11 flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors duration-300">
            <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
          </button>

          {stockStatus === "in-stock" && (
            <button className="btn btn-primary rounded-full font-semibold text-sm leading-6 px-3 py-2 flex-1">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
              <span>Add to Cart</span>
            </button>
          )}

          {stockStatus === "out-of-stock" && (
            <button className="btn btn-error rounded-full font-semibold text-sm leading-6 px-6.5 py-2 flex-1">
              <i className="hgi hgi-stroke hgi-notification-01 text-xl text-white" />
              <span>Notify</span>
            </button>
          )}

          {stockStatus === "notified" && (
            <button className="btn btn-disabled rounded-full font-semibold text-sm leading-6 px-6.5 py-2 flex-1 text-[#919EABCC]">
              <i className="hgi hgi-stroke hgi-notification-01 text-xl text-[#919EABCC]" />
              <span>Notified</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
