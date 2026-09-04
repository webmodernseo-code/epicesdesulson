"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardOne from "@/components/card/product-card-one";

const PRODUCTS = [
  {
    image: "/images/multi-vendor-slider-image-1.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
  {
    image: "/images/multi-vendor-slider-image-2.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
  {
    image: "/images/multi-vendor-slider-image-3.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
  {
    image: "/images/multi-vendor-slider-image-4.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
  {
    image: "/images/multi-vendor-slider-image-2.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
  {
    image: "/images/multi-vendor-slider-image-1.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeText: "NEW",
  },
];

export default function RecentlyViewedProduct() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center md:justify-between justify-center mb-10">
            <div>
              <h3 className="text-light-primary-text">Recently Viewed</h3>
            </div>
            <div>
              <div className="new-branded-products-multi-vendor-nav  flex  z-10 pointer-events-none px-6 w-full">
                <button className="new-branded-products-multi-vendor-nav-prev size-11 inline-flex items-center justify-center rounded-full bg-white hover:bg-primary hover:text-white transition-all pointer-events-auto shadow-[0px_4px_10px_0px_transparent] -ml-6">
                  <i className="hgi hgi-stroke hgi-arrow-left-01 text-2xl" />
                </button>
                <button className="new-branded-products-multi-vendor-nav-next size-11 inline-flex items-center justify-center rounded-full bg-white hover:bg-primary hover:text-white transition-all pointer-events-auto shadow-[0px_4px_10px_0px_transparent] -mr-6">
                  <i className="hgi hgi-stroke hgi-arrow-right-01 text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="new-branded-product-multi-vendor-slider-wrapper">
          <div className="-mx-3 sellzy-slider relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 7000 }}
              navigation={{
                nextEl: ".new-branded-products-multi-vendor-nav-next",
                prevEl: ".new-branded-products-multi-vendor-nav-prev",
              }}
              breakpoints={{
                480: { slidesPerView: 1 },
                769: { slidesPerView: 2 },
                1025: { slidesPerView: 4 },
                1441: { slidesPerView: 4 },
                1600: { slidesPerView: 5 },
              }}
            >
              {PRODUCTS.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCardOne {...product} variant="pink" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
