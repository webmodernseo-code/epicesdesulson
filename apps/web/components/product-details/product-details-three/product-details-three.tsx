"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import { clsx } from "clsx";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import StarRating from "@/components/common/star-rating";

const IMAGES = [
  "/images/product-details/product-details-slider-7.png",
  "/images/product-details/product-details-slider-8.png",
  "/images/product-details/product-details-slider-1.png",
  "/images/product-details/product-details-slider-2.png",
  "/images/product-details/product-details-slider-3.png",
  "/images/product-details/product-details-slider-4.png",
  "/images/product-details/product-details-slider-5.png",
];

const PACK_SIZES = ["60 ML", "120 ML", "220 ML", "250 ML", "300 ML", "500 ML"];

export default function ProductDetailsThree() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("250 ML");

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <section className="pb-12">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="xl:col-span-7 lg:col-span-6">
            <div className="p-6 border border-gray-300 rounded-3xl">
              <div className="relative mb-6">
                <Swiper
                  spaceBetween={0}
                  navigation={{
                    nextEl: ".product-details-next",
                    prevEl: ".product-details-prev",
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="product-details-big-slider-2 sellzy-slider"
                >
                  {IMAGES.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className="single-product-big-slider-item  rounded-2xl overflow-hidden"
                    >
                      <div className="relative h-[300px] h- sm:h-[686px] lg:h-[422px] xl:h-[752px]">
                        <Image
                          src={img}
                          alt="product-image"
                          fill
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="product-details-big-slider-nav-2 absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-4 z-10 pointer-events-none">
                  <button className="product-details-prev pointer-events-auto size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-gray-900  hover:bg-primary hover:text-white transition slider-btn">
                    <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
                  </button>
                  <button className="product-details-next pointer-events-auto size-12 flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] text-gray-900  hover:bg-primary hover:text-white transition slider-btn">
                    <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
                  </button>
                </div>
              </div>
              <div>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={20}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  loop={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  breakpoints={{
                    0: { slidesPerView: 2 },
                    480: { slidesPerView: 3 },
                    769: { slidesPerView: 4 },
                    1025: { slidesPerView: 6 },
                  }}
                  className="product-details-small-slider-2 sellzy-slider"
                >
                  {IMAGES.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className="cursor-pointer single-product-small-slider-item p-2.5 rounded-lg overflow-hidden border border-gray-300"
                    >
                      <div className="relative w-full h-full aspect-square">
                        <Image
                          src={img}
                          alt="product-image"
                          fill
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 lg:col-span-6 mt-6 lg:mt-0">
            <div className="rounded-3xl border border-gray-300 p-6">
              <span className="product-discount-badge inline-block mb-6 uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-shape.png)] after:bg-contain after:bg-no-repeat">
                Sales
              </span>
              <p className="uppercase text-info text-xs leading-[18px] font-bold new-arrival-badge mb-6">
                New Arrival
              </p>
              <div className="product-title-section mb-6">
                <h3 className="line-clamp-1">
                  VitaLife Omega-3 Softgels Heart
                </h3>
              </div>
              <div className="rating-section-wrapper flex flex-col md:flex-row lg:flex-col xl:flex-row gap-y-6 md:gap-y-6 md:gap-x-6 md:divide-x lg:divide-x-0 xl:divide-x xl:divide-gray-300 md:divide-gray-300 mb-6">
                <div className="rating-section flex items-center pr-6">
                  <StarRating ratingPercentage={"80%"} />
                  <span className="font-normal inline-block ml-1">
                    (11.78k reviews)
                  </span>
                </div>
                <div className="divide-x divide-gray-300">
                  <span className="pr-6 inline-block"> Sold: 389 </span>
                  <Link href="#" className="text-info hover:underline pl-6">
                    View Store
                  </Link>
                </div>
              </div>
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
              <div className="product-description-section mb-6">
                <p className="mb-6">
                  Stay connected and in control with the SmartLife Pro X7. Track
                  your fitness, monitor your health, and receive real-time
                  notifications — all from your wrist. With a sleek design and
                  all-day battery life, it’s the perfect companion for your
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
              <div className="product-add-to-cart-section py-6 border-b border-dashed border-gray-300 border-t">
                <div className="size-variation-section mb-6">
                  <div className="size-variation-section-title mb-4 flex items-center justify-between">
                    <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
                      Pack Size:
                      <span className="text-light-primary-text font-normal capitalize size-variation-selected-size">
                        {selectedSize}
                      </span>
                    </p>
                  </div>
                  <div className="size-variation-items flex items-center gap-2 2xl:flex-nowrap flex-wrap">
                    {PACK_SIZES.map((size) => (
                      <div key={size} className="size-variation-item">
                        <button
                          onClick={() => setSelectedSize(size)}
                          className={clsx(
                            "cursor-pointer flex items-center justify-center text-sm leading-6 px-5 py-1.5 font-semibold border rounded-[100px] transition-colors",
                            selectedSize === size
                              ? "border-primary bg-primary text-white hover:bg-primary"
                              : "border-gray-300 text-light-primary-text hover:bg-[rgba(145,158,171,0.08)]",
                          )}
                        >
                          {size}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="product-add-to-cart-btn-section">
                  <p className="font-semibold text-light-primary-text mb-4">
                    Quantity:
                  </p>
                  <div className="flex items-center justify-between gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                    <div className="quantity-section flex-1 max-w-[185px] border border-gray-300 rounded-[80px] px-4 py-[11px] flex items-center justify-between">
                      <button
                        onClick={() => handleQuantityChange("dec")}
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                      >
                        <i className="hgi hgi-stroke hgi-minus-sign text-xl leading-5" />
                      </button>
                      <input
                        type="text"
                        className="quantity-input text-center w-full focus:outline-none font-semibold text-base leading-6 text-light-primary-text"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                      />
                      <button
                        onClick={() => handleQuantityChange("inc")}
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                      >
                        <i className="hgi hgi-stroke hgi-plus-sign text-xl leading-5" />
                      </button>
                    </div>
                    <button className="btn btn-warning btn-large rounded-[80px] flex-1">
                      Buy Now
                    </button>
                    <button className="btn btn-primary btn-large rounded-[80px] flex-1">
                      <i className="hgi hgi-stroke hgi-shopping-cart-add-02 leading-6 text-2xl text-white mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-share-and-compare-section flex items-center gap-x-4 mt-6">
                <Link
                  href="#"
                  className="product-share-btn text-info inline-flex items-center gap-x-2.5 pr-4 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-px after:h-3 after:bg-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-share-05 text-xl leading-5" />
                  <span className="hover:underline">Share</span>
                </Link>
                <Link
                  href="/compare"
                  className="product-compare-btn text-info inline-flex items-center gap-x-2.5"
                >
                  <i className="hgi hgi-stroke hgi-git-compare text-xl leading-5" />
                  <span className="hover:underline">Compare</span>
                </Link>
              </div>
              <div className="product-extra-info-section flex flex-col gap-y-4 mt-6">
                <div className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                  <p className="font-semibold text-light-primary-text">
                    Free Shipping:
                  </p>
                  <p>Estimated Delivery Time 5-7 Days</p>
                </div>
                <div className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                  <p className="font-semibold text-light-primary-text">SKU:</p>
                  <p>SKU-001</p>
                </div>
                <div className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                  <p className="font-semibold text-light-primary-text">
                    Categories:
                  </p>
                  <p>Electronics, Computers, Accessories</p>
                </div>
                <div className="product-extra-info-item flex items-center gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                  <p className="font-semibold text-light-primary-text">Tags:</p>
                  <p>Smartwatch, Fitness Tracker, Wearable</p>
                </div>
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
