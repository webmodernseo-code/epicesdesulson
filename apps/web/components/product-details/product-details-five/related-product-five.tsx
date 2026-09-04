"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardOne from "@/components/card/product-card-one";

const PRODUCTS = [
  {
    id: 1,
    image: "/images/product-details/electronics-8.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 2,
    image: "/images/product-details/electronics-7.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 3,
    image: "/images/product-details/electronics-6.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 4,
    image: "/images/product-details/electronics-5.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 5,
    image: "/images/product-details/electronics-4.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 6,
    image: "/images/product-details/electronics-3.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
  {
    id: 7,
    image: "/images/product-details/electronics-2.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    ratingPercentage: 80,
    ratingCount: 189,
    currentPrice: "$27.49",
    oldPrice: "$39.99",
    discount: "10% OFF",
    badgeVariant: "error" as const,
  },
];

export default function RelatedProductFive() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <h3>Related Products</h3>
          <div className="flex items-center gap-x-6">
            <button className="frequently-products-5-prev bg-[rgba(145,158,171,0.08)] size-12 flex items-center justify-center text-light-primary-text rounded-full  hover:bg-primary hover:text-white transition-colors">
              <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
            </button>
            <button className="frequently-products-5-next bg-[rgba(145,158,171,0.08)] size-12 flex items-center justify-center text-light-primary-text rounded-full  hover:bg-primary hover:text-white transition-colors">
              <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".frequently-products-5-next",
            prevEl: ".frequently-products-5-prev",
          }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1025: { slidesPerView: 4 },
            1441: { slidesPerView: 6 },
          }}
        >
          {PRODUCTS.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCardOne
                variant="transparent"
                image={product.image}
                title={product.title}
                ratingPercentage={product.ratingPercentage}
                ratingCount={product.ratingCount}
                currentPrice={product.currentPrice}
                oldPrice={product.oldPrice}
                discount={product.discount}
                badgeVariant={product.badgeVariant}
                className=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
