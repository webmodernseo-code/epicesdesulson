"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
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
      className="mx-3"
    >
      <div className="bg-white rounded-2xl product-card-1 p-4 group">
        <div className="product-image-container relative">
          <div className="product-image rounded-xl mb-4 overflow-hidden h-[300px] relative bg-[#F4F3F5]">
            <Link href={productUrl} className="absolute inset-0 z-1">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 object-cover "
              />
            </Link>
          </div>
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
          {badgeText && (
            <span className="product-discount-badge inline-block relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-shape.png)] after:bg-no-repeat after:bg-contain uppercase">
              {badgeText}
            </span>
          )}
          {storeName && (
            <p className="py-3 text-sm leading-[22px]">{storeName}</p>
          )}
          <h6 className="text-[18px] leading-7 font-bold pb-3">
            <Link href={productUrl}>{title}</Link>
          </h6>
          <div className="price-section flex items-center gap-x-3 mb-3">
            <span className="current-price text-[16px] leading-6 font-semibold text-light-primary-text">
              {currentPrice}
            </span>
            {oldPrice && (
              <span className="old-price text-sm leading-[22px] text-light-disabled-text line-through">
                {oldPrice}
              </span>
            )}
            {discount && (
              <span className="discount-percentage text-sm leading-[22px] font-semibold text-error">
                {discount}
              </span>
            )}
          </div>
          <div className="rating-section flex items-center mb-3">
            <StarRating ratingPercentage={`${ratingPercentage}%`} />
            <span className="text-sm leading-[22px] font-normal inline-block ml-1">
              ({ratingCount})
            </span>
          </div>
          <div className="deal-progress flex flex-col gap-y-1 mb-3">
            <div className="progress w-full h-1.5 bg-warning-lighter rounded-[50px] overflow-hidden">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="progress-bar h-full bg-warning rounded-[50px]"
              />
            </div>
            <div className="deal-stock flex items-center justify-between">
              <div className="stock-sold flex items-center gap-x-2.5">
                <p className="text-[16px] leading-6">Sold:</p>
                <p className="text-[16px] leading-6 text-light-primary-text">
                  {soldCount}
                </p>
              </div>
              <div className="stock-remaining flex items-center gap-x-2.5">
                <p className="text-[16px] leading-6">Available:</p>
                <p className="text-[16px] leading-6 text-light-primary-text">
                  {availableCount}
                </p>
              </div>
            </div>
          </div>
          <div className="btn-section flex items-center gap-x-4">
            <button className="size-11 flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300">
              <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
            </button>
            <button className="btn btn-primary rounded-full font-semibold text-sm leading-6 px-6.5 py-2 flex-1 flex items-center justify-center gap-2">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
