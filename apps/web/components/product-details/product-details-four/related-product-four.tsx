"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCardFour from "@/components/card/product-card-four";

const PRODUCTS = [
  {
    id: 1,
    image: "/images/home-4/outfit-person-11.png",
    title: "Bali Underware Bra",
    rating: 80,
    reviews: 189,
    price: "$27.46",
    oldPrice: "$29.99",
    discount: "10% OFF",
  },
  {
    id: 2,
    image: "/images/home-4/outfit-person-12.png",
    title: "Bali Underware Bra",
    rating: 80,
    reviews: 189,
    price: "$27.46",
    oldPrice: "$29.99",
    discount: "10% OFF",
  },
  {
    id: 3,
    image: "/images/home-4/outfit-person-13.png",
    title: "Bali Underware Bra",
    rating: 80,
    reviews: 189,
    price: "$27.46",
    oldPrice: "$29.99",
    discount: "10% OFF",
  },
  {
    id: 4,
    image: "/images/home-4/outfit-person-14.png",
    title: "Bali Underware Bra",
    rating: 80,
    reviews: 189,
    price: "$27.46",
    oldPrice: "$29.99",
    discount: "10% OFF",
  },
  {
    id: 5,
    image: "/images/home-4/outfit-person-6.png",
    title: "Bali Underware Bra",
    rating: 80,
    reviews: 189,
    price: "$27.46",
    oldPrice: "$29.99",
    discount: "10% OFF",
  },
];

export default function RelatedProductFour() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <h3>Related Products</h3>
          <div className="flex items-center gap-x-6">
            <button className="related-products-4-prev size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-light-primary-text  hover:bg-primary hover:text-white transition-colors">
              <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px] " />
            </button>
            <button className="related-products-4-next size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-light-primary-text  hover:bg-primary hover:text-white transition-colors">
              <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px] " />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".related-products-4-next",
            prevEl: ".related-products-4-prev",
          }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {PRODUCTS.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCardFour {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
