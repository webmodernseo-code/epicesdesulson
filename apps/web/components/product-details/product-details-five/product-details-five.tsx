"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper as SwiperClass } from "swiper";
import StarRating from "@/components/common/star-rating";

const IMAGES = [
  "/images/product-details/electronics-2.png",
  "/images/product-details/electronics-3.png",
  "/images/product-details/electronics-4.png",
  "/images/product-details/electronics-5.png",
  "/images/product-details/electronics-6.png",
  "/images/product-details/electronics-7.png",
  "/images/product-details/electronics-8.png",
];

const PACK_SIZES = ["60 ML", "120 ML", "220 ML", "250 ML", "300 ML", "500 ML"];

export default function ProductDetailsFive() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("60 ML");

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <section className="pb-12">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Title */}
          <div className="product-title-section col-span-12 mb-6 lg:mb-0">
            <h3 className="line-clamp-1">VitaLife Omega-3 Softgels Heart</h3>
          </div>

          {/* Meta row */}
          <div className="col-span-12 rating-section-wrapper flex lg:flex-nowrap flex-wrap gap-y-6 lg:gap-y-0 gap-x-6 mb-6 lg:mb-0 divide-x divide-gray-300">
            <div className="rating-section flex items-center pr-6">
              <StarRating ratingPercentage={"80%"} />
              <span className="font-normal inline-block ml-1">
                (11.78k reviews)
              </span>
            </div>
            <span className="pr-6 inline-block">Sold: 389</span>
            <a href="#" className="text-info hover:underline inline-block pr-6">
              View Store
            </a>
            <a
              href="#"
              className="product-wishlist-btn text-info inline-flex items-center gap-x-2.5 pr-4"
            >
              <i className="hgi hgi-stroke hgi-favourite text-xl leading-5" />
              <span className="hover:underline">Add to Wishlist</span>
            </a>
            <a
              href="#"
              className="product-share-btn text-info inline-flex items-center gap-x-2.5 pr-4"
            >
              <i className="hgi hgi-stroke hgi-share-05 text-xl leading-5" />
              <span className="hover:underline">Share</span>
            </a>
            <a
              href="#"
              className="product-compare-btn text-info inline-flex items-center gap-x-2.5"
            >
              <i className="hgi hgi-stroke hgi-git-compare text-xl leading-5" />
              <span className="hover:underline">Compare</span>
            </a>
          </div>

          {/* Gallery */}
          <div className="xl:col-span-7 lg:col-span-6 col-span-12">
            {/* Main slider */}
            <div className="p-6 border border-gray-300 rounded-3xl mb-6">
              <Swiper
                spaceBetween={10}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Thumbs]}
                loop={true}
                className="rounded-2xl overflow-hidden"
              >
                {IMAGES.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={img}
                      alt={`product-${i}`}
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover rounded-3xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              loop={true}
              modules={[FreeMode, Navigation, Thumbs]}
              breakpoints={{
                0: { slidesPerView: 2 },
                480: { slidesPerView: 4 },
                769: { slidesPerView: 5 },
                1025: { slidesPerView: 6 },
              }}
              className="px-0"
            >
              {IMAGES.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="cursor-pointer rounded-lg overflow-hidden border border-gray-300 opacity-60 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-primary transition-opacity"
                >
                  <Image
                    src={img}
                    alt={`thumb-${i}`}
                    width={150}
                    height={150}
                    className="w-full h-auto object-cover rounded-lg p-2.5"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product info panel */}
          <div className="xl:col-span-5 lg:col-span-6 col-span-12 mt-6 lg:mt-0">
            <div className="rounded-3xl border border-gray-300 p-6">
              {/* Badge */}
              <span className="product-discount-badge inline-block mb-6 uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-shape.png)] after:bg-contain after:bg-no-repeat">
                Sales
              </span>

              {/* Price */}
              <div className="price-section flex items-center gap-x-3 mb-6">
                <span className="current-price text-2xl leading-9 font-bold text-light-primary-text relative after:absolute after:h-6 after:w-px after:bg-gray-300 after:right-0 after:top-1/2 after:-translate-y-1/2 pr-3 inline-block">
                  $62.97
                </span>
                <span className="old-price text-2xl leading-9 font-normal text-light-disabled-text">
                  $39.99
                </span>
                <span className="product-discount-badge uppercase relative bg-warning text-black font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-warning-shape.png)] after:bg-contain after:bg-no-repeat">
                  15% OFF
                </span>
              </div>

              {/* Description */}
              <div className="product-description-section mb-6">
                <p className="mb-6">
                  Stay connected and in control with the SmartLife Pro X7. Track
                  your fitness, monitor your health, and receive real-time
                  notifications — all from your wrist. With a sleek design and
                  all-day battery life, it&apos;s the perfect companion for your
                  modern lifestyle.
                </p>
                <ul className="custom-list-style">
                  <li>
                    <p>Compatible with iOS and Android</p>
                  </li>
                  <li>
                    <p>Heart rate, sleep, and activity tracking</p>
                  </li>
                  <li>
                    <p>Instant call, SMS, and app notifications</p>
                  </li>
                </ul>
              </div>

              {/* Size + Quantity */}
              <div className="product-add-to-cart-section py-6 border-b border-dashed border-gray-300 border-t">
                {/* Pack Size */}
                <div className="size-variation-section mb-6">
                  <div className="size-variation-section-title mb-4 flex items-center justify-between">
                    <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
                      Pack Size:
                      <span className="text-light-primary-text font-normal capitalize">
                        {selectedSize}
                      </span>
                    </p>
                  </div>
                  <div className="size-variation-items flex items-center gap-2 2xl:flex-nowrap flex-wrap">
                    {PACK_SIZES.map((size) => (
                      <div key={size} className="size-variation-item">
                        <button
                          onClick={() => setSelectedSize(size)}
                          className={`cursor-pointer flex items-center justify-center text-sm leading-6 px-5 py-1.5 font-semibold border rounded-[100px] transition-colors ${
                            selectedSize === size
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]"
                          }`}
                        >
                          {size}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity + Buttons */}
                <div className="product-add-to-cart-btn-section">
                  <p className="font-semibold text-light-primary-text mb-4">
                    Quantity:
                  </p>
                  <div className="flex items-center justify-between gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                    <div className="quantity-section flex-1 max-w-[185px] border border-gray-300 rounded-[80px] px-4 py-[11px] flex items-center justify-between">
                      <button
                        onClick={() => handleQuantity("dec")}
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                      >
                        <i className="hgi hgi-stroke hgi-minus-sign text-xl leading-5" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="quantity-input text-center w-full focus:outline-none font-semibold text-base leading-6 text-light-primary-text bg-transparent"
                      />
                      <button
                        onClick={() => handleQuantity("inc")}
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                      >
                        <i className="hgi hgi-stroke hgi-plus-sign text-xl leading-5" />
                      </button>
                    </div>
                    <button className="btn btn-warning btn-large rounded-[80px] flex-1">
                      Buy Now
                    </button>
                    <button className="btn btn-primary btn-large rounded-[80px] flex-1">
                      <i className="hgi hgi-stroke hgi-shopping-cart-add-02 leading-6 text-2xl text-white" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Extra info */}
              <div className="product-extra-info-section flex flex-col gap-y-4 mt-6">
                {[
                  {
                    label: "Free Shipping:",
                    value: "Estimated Delivery Time 5-7 Days",
                  },
                  { label: "SKU:", value: "SKU-001" },
                  {
                    label: "Categories:",
                    value: "Electronics, Computers, Accessories",
                  },
                  {
                    label: "Tags:",
                    value: "Smartwatch, Fitness Tracker, Wearable",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0"
                  >
                    <p className="font-semibold text-light-primary-text">
                      {item.label}
                    </p>
                    <p>{item.value}</p>
                  </div>
                ))}
                <div className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                  <p className="font-semibold text-light-primary-text">
                    Payment Methods:
                  </p>
                  <Image
                    src="/images/product-details/payment-methods.png"
                    alt="payment-methods"
                    width={260}
                    height={28}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
