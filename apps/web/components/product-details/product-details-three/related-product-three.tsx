"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardOne from "../../card/product-card-one";

const RELATED_PRODUCTS = [
  {
    image: "/images/product-details/product-details-slider-7.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "Sales",
    badgeVariant: "error" as const,
  },
  {
    image: "/images/product-details/product-details-slider-8.png",
    title: "EcoFriendly Bamboo Toothbrush Set 4-Pack",
    ratingPercentage: 90,
    ratingCount: 245,
    currentPrice: "$12.99",
    oldPrice: "$15.99",
    discount: "20% OFF",
    badgeText: "New",
    badgeVariant: "success" as const,
  },
  {
    image: "/images/product-details/product-details-slider-1.png",
    title: "Organic Lavender Essential Oil 100% Pure",
    ratingPercentage: 85,
    ratingCount: 120,
    currentPrice: "$18.50",
    oldPrice: "$22.00",
    discount: "15% OFF",
  },
  {
    image: "/images/product-details/product-details-slider-2.png",
    title: "Reusable Silicone Food Storage Bags Set of 6",
    ratingPercentage: 75,
    ratingCount: 98,
    currentPrice: "$24.99",
    oldPrice: "$29.99",
    discount: "17% OFF",
  },
  {
    image: "/images/product-details/product-details-slider-3.png",
    title: "Natural Soy Wax Candle Scented Bergamot",
    ratingPercentage: 95,
    ratingCount: 312,
    currentPrice: "$16.00",
    oldPrice: "$20.00",
    discount: "20% OFF",
  },
  {
    image: "/images/product-details/product-details-slider-4.png",
    title: "HydroFlask Inspired Vacuum Insulated Water Bottle",
    ratingPercentage: 88,
    ratingCount: 456,
    currentPrice: "$32.99",
    oldPrice: "$40.00",
    discount: "18% OFF",
  },
  {
    image: "/images/product-details/product-details-slider-5.png",
    title: "Organic Cotton Mesh Grocery Bags Set of 5",
    ratingPercentage: 82,
    ratingCount: 167,
    currentPrice: "$14.50",
    oldPrice: "$18.00",
    discount: "19% OFF",
  },
  {
    image: "/images/product-details/product-details-slider-6.png",
    title: "Biodegradable Paper Straws 100-Pack",
    ratingPercentage: 78,
    ratingCount: 89,
    currentPrice: "$9.99",
    oldPrice: "$12.99",
    discount: "23% OFF",
  },
];

export default function RelatedProductThree() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Related Products
          </motion.h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="related-products-slider-nav flex items-center gap-x-3"
          >
            <button className="related-products-prev size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-gray-900  hover:bg-primary hover:text-white transition slider-btn">
              <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
            </button>
            <button className="related-products-next size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-gray-900  hover:bg-primary hover:text-white transition slider-btn">
              <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".related-products-next",
              prevEl: ".related-products-prev",
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 1 },
              769: { slidesPerView: 2 },
              1025: { slidesPerView: 3 },
              1441: { slidesPerView: 6 },
            }}
            className="related-products-slider -mx-3 sellzy-slider"
          >
            {RELATED_PRODUCTS.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCardOne {...product} className="mx-0" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
