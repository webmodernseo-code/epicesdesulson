"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import StarRating from "@/components/common/star-rating";

const PREMIUM_PICKS_DATA = [
  {
    id: 1,
    image: "/images/home-3/loose-eggs.png",
    alt: "eggs",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-61",
    delay: "0.2",
  },
  {
    id: 2,
    image: "/images/home-3/greek-plain.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-62",
    delay: "0.3",
  },
  {
    id: 3,
    image: "/images/home-3/fresh-beans.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-63",
    delay: "0.4",
  },
  {
    id: 4,
    image: "/images/home-3/greek-yogurt.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-64",
    delay: "0.5",
  },
  {
    id: 5,
    image: "/images/home-3/lemon-juice.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-65",
    delay: "0.6",
  },
  {
    id: 6,
    image: "/images/home-3/avocado.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-66",
    delay: "0.7",
  },
  {
    id: 7,
    image: "/images/home-3/watermelon.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-67",
    delay: "0.8",
  },
  {
    id: 8,
    image: "/images/home-3/cabbage.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-68",
    delay: "0.9",
  },
  {
    id: 9,
    image: "/images/home-3/juice-1.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-69",
    delay: "1",
  },
  {
    id: 10,
    image: "/images/home-3/apple.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-70",
    delay: "1.1",
  },
  {
    id: 11,
    image: "/images/home-3/lime-chips.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-71",
    delay: "1.2",
  },
  {
    id: 12,
    image: "/images/home-3/lettuce.png",
    alt: "product-image",
    title: "Multigrain Cereal",
    currentPrice: "$27.49",
    oldPrice: "$29.99",
    ratingCount: "189",
    ratingPercentage: 80,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    packId: "sorting-pack-72",
    delay: "1.3",
  },
];

const PACK_OPTIONS = [
  { value: "", label: "500g pack" },
  { value: "1", label: "400g pack" },
  { value: "2", label: "300g pack" },
  { value: "3", label: "200g pack" },
  { value: "4", label: "100g pack" },
];

export default function PremiumPicksSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="pb-[70px]">
      <div className="container ">
        <div className="md:flex md:justify-between md:items-center mb-10 pb-4 border-b border-b-gray-300">
          <div className="text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-light-primary-text"
            >
              Premium Picks with 10% Savings
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="premium-pack-nav md:flex items-center justify-between gap-x-6 hidden"
          >
            <button
              ref={prevRef}
              aria-label="Previous"
              className="swiper-btn-prev bg-[rgba(145,158,171,0.08)] todays-top-deal-next size-12 rounded-full flex items-center justify-center text-light-primary-text hover:bg-primary hover:text-white transition-all"
            >
              <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next"
              className="swiper-btn-next bg-[rgba(145,158,171,0.08)] todays-top-deal-next size-12 rounded-full flex items-center justify-center text-light-primary-text hover:bg-primary hover:text-white transition-all"
            >
              <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
            </button>
          </motion.div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay, Grid]}
          slidesPerView={1}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={0}
          loop={false}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: SwiperType) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            1025: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
            1441: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
            1920: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
          }}
          className="-m-3"
        >
          {PREMIUM_PICKS_DATA.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: parseFloat(product.delay) }}
                className="p-3"
              >
                <div className="p-4 group border border-gray-300 rounded-2xl">
                  <div className="flex gap-4 flex-col md:flex-row">
                    <div className="md:w-[180px] md:h-[180px] bg-gray-200 rounded-2xl shrink-0">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        width={180}
                        height={180}
                        className="h-full w-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-y-2.5 mb-5">
                        <div className="rating-section flex items-center">
                          <StarRating ratingPercentage={`${product.ratingPercentage}%`} />
                          <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                            ({product.ratingCount})
                          </span>
                        </div>
                        <Link
                          href="/product-details"
                          className="font-semibold text-light-primary-text group-hover:text-primary transition-all ease-in-out duration-300"
                        >
                          {product.title}
                        </Link>
                        <div className="price-section flex items-center gap-x-3">
                          <span className="current-price text-base font-semibold text-light-primary-text">
                            {product.currentPrice}
                          </span>
                          <span className="old-price text-light-disabled-text line-through">
                            {product.oldPrice}
                          </span>
                        </div>
                      </div>
                      <div className="deal-progress flex flex-col gap-y-1 mb-2 md:mb-1">
                        <div className="progress w-full h-1.5 bg-error-lighter rounded-[50px] overflow-hidden">
                          <div
                            style={{ width: `${product.progressPercentage}%` }}
                            className="progress-bar h-full bg-error rounded-[50px]"
                          />
                        </div>
                        <div className="deal-stock flex items-center justify-between">
                          <div className="stock-sold flex items-center gap-x-2.5">
                            <p className="text-xs leading-[18px]">Sold:</p>
                            <p className="text-xs leading-[18px] text-light-primary-text">
                              {product.sold}
                            </p>
                          </div>
                          <div className="stock-remaining flex items-center gap-x-2.5">
                            <p className="text-xs leading-[18px]">Available:</p>
                            <p className="text-xs leading-[18px] text-light-primary-text">
                              {product.available}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-2">
                        <div className="relative min-w-[100px]">
                          <CustomFloatingSelect
                            options={PACK_OPTIONS}
                            label="Select Pack"
                            className="flex-1"
                          />
                        </div>
                        <Link
                          href="/cart-single-vendor"
                          className="btn btn-primary px-3 py-2 rounded-[80px] text-base product-add-to-cart flex-1"
                        >
                          <span className="inline-flex items-center justify-center">
                            <i className="hgi hgi-stroke hgi-shopping-cart-02 text-[20px] leading-5" />
                          </span>
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
