"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      className="border border-gray-300 rounded-2xl p-4"
    >
      <div className="flex items-center flex-col md:flex-row gap-4 cursor-pointer group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="md:w-[120px] w-full h-full md:h-[120px]  rounded-xl bg-[#F4F5F6] flex items-center justify-center shrink-0 overflow-hidden"
        >
          <Image
            src={image}
            width={120}
            height={120}
            className="w-full h-full object-contain rounded-xl"
            alt={title}
          />
        </motion.div>
        <div className="flex flex-col gap-y-3 flex-1">
          <p className="text-sm leading-[22px]">
            {category} {sellerName ? `/ ${sellerName}` : ""}
          </p>
          <Link
            href={titleHref}
            className="font-semibold text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out"
          >
            {title}
          </Link>

          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center flex-col gap-y-3">
              <div className="rating-section flex items-center">
                <StarRating ratingPercentage={`${ratingPercentage}%`} />
                <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                  ({reviewCount})
                </span>
              </div>

              <div className="price-section flex items-center gap-x-3">
                <span className="current-price font-semibold text-primary">
                  {typeof currentPrice === "number"
                    ? `$${currentPrice.toFixed(2)}`
                    : currentPrice}
                </span>
                {oldPrice && (
                  <span className="old-price font-normal text-light-disabled-text line-through">
                    {typeof oldPrice === "number"
                      ? `$${oldPrice.toFixed(2)}`
                      : oldPrice}
                  </span>
                )}
              </div>
            </div>

            <Link
              href={addToCartHref}
              className="btn btn-primary px-6 py-3 rounded-[80px] product-add-to-cart"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-shopping-cart-02 text-[20px] leading-5" />
              </span>
              Add
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
