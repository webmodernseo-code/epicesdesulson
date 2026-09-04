"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { clsx } from "clsx";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";

const IMAGES = [
  "/images/product-details/product-details-slider-1.png",
  "/images/product-details/product-details-slider-2.png",
  "/images/product-details/product-details-slider-3.png",
  "/images/product-details/product-details-slider-4.png",
  "/images/product-details/product-details-slider-5.png",
  "/images/product-details/product-details-slider-6.png",
  "/images/product-details/product-details-slider-3.png",
];

const PACK_SIZES = ["60 ML", "120 ML", "220 ML", "250 ML", "300 ML", "500 ML"];

export default function ProductDetailsTwo() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isXl, setIsXl] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("60 ML");

  // Track xl breakpoint for thumb swiper direction
  useEffect(() => {
    const check = () => setIsXl(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Countdown target: 8 days from mount
  const targetDate = React.useRef<Date>(
    new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  );

  const getTimeLeft = () => {
    const diff = Math.max(targetDate.current.getTime() - Date.now(), 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const pad = (n: number) => String(n).padStart(2, "0");
    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <section>
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="xl:col-span-7 lg:col-span-6">
            <div className="flex gap-x-6 xl:flex-row flex-col gap-y-4 xl:gap-y-0 xl:gap-x-6">
              <div className="xl:w-[114px] w-full order-2 xl:order-1 flex-none overflow-hidden h-[80px] sm:h-[100px] xl:h-[700px]">
                <Swiper
                  key={isXl ? "thumb-v" : "thumb-h"}
                  onSwiper={setThumbsSwiper}
                  direction={isXl ? "vertical" : "horizontal"}
                  spaceBetween={isXl ? 16 : 10}
                  slidesPerView={isXl ? 6 : 4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  breakpoints={
                    isXl
                      ? undefined
                      : {
                          480: { slidesPerView: 5 },
                          640: { slidesPerView: 6 },
                          768: { slidesPerView: 6 },
                        }
                  }
                  className="h-full w-full"
                >
                  {IMAGES.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className="cursor-pointer overflow-hidden rounded-lg opacity-60 [&.swiper-slide-thumb-active]:opacity-100 transition-opacity"
                    >
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-lg">
                        <Image
                          width={112}
                          height={112}
                          src={img}
                          alt={`thumbnail-${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="w-full xl:flex-1 order-1 xl:order-2 overflow-hidden relative aspect-square sm:aspect-4/3 xl:aspect-auto xl:h-[700px]">
                <Swiper
                  spaceBetween={10}
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
                  className="h-full w-full rounded-3xl"
                >
                  {IMAGES.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-3xl overflow-hidden flex items-center justify-center relative"
                    >
                      <Image
                        fill
                        src={img}
                        alt={`product-image-${index}`}
                        className="w-full h-full object-cover rounded-3xl"
                        sizes="(max-width: 768px) 100vw)"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="product-details-big-slider-nav absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between px-3 z-10 pointer-events-none">
                  <button className="product-details-prev pointer-events-auto size-12 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-primary hover:text-white transition slider-btn">
                    <i className="hgi hgi-stroke hgi-arrow-left-01 text-xl" />
                  </button>
                  <button className="product-details-next pointer-events-auto size-12 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-md hover:bg-primary hover:text-white transition slider-btn">
                    <i className="hgi hgi-stroke hgi-arrow-right-01 text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-5 lg:col-span-6 mt-6 lg:mt-0">
            <div className="rounded-3xl border border-gray-300 p-6">
              <span className="product-discount-badge inline-block mb-6 uppercase relative bg-success-light text-black text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-primary-shape.png)] after:bg-contain after:bg-no-repeat">
                New
              </span>
              <p className="uppercase text-info text-xs leading-[18px] font-bold new-arrival-badge mb-6">
                New Arrival
              </p>
              <div className="product-title-section flex items-center justify-between mb-6">
                <h3 className="line-clamp-2">
                  VitaLife Omega-3 Softgels Heart Support Max Strength
                </h3>
                <button
                  type="button"
                  className="size-10 inline-flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
                </button>
              </div>
              <div className="rating-section flex items-center mb-4">
                <StarRating ratingPercentage={"80%"} />
                <span className="font-normal inline-block ml-1">
                  (11.78k reviews)
                </span>
              </div>
              <div className="price-section flex items-center gap-x-3 mb-6">
                <span className="current-price text-2xl leading-9 font-bold text-light-primary-text relative after:absolute after:h-6 after:w-px after:bg-gray-300 after:right-0 after:top-1/2 after:-translate-y-1/2 pr-3 inline-block">
                  $62.97
                </span>
                <span className="old-price text-2xl leading-9 font-normal text-light-disabled-text line-through">
                  $39.99
                </span>
                <span className="product-discount-badge uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-shape.png)] after:bg-contain after:bg-no-repeat">
                  15% OFF
                </span>
              </div>
              <div className="sale-section flex flex-col xl:flex-row xl:items-center xl:justify-between mb-6">
                <p className="xl:w-[100px] w-full text-left mb-4 xl:mb-0">
                  Hurry Up! Offer ends in:
                </p>
                <div className="home-one-hot-deal-countdown flex items-center gap-x-3 sm:gap-x-5 sellzy-countdown">
                  <div className="countdown-item flex flex-col items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-error/8 border border-error text-center">
                    <h5 className="days text-sm sm:text-base">
                      {timeLeft.days}
                    </h5>
                    <p className="text-xs sm:text-sm leading-[18px] sm:leading-[22px]">
                      Days
                    </p>
                  </div>
                  <p className="font-semibold">:</p>
                  <div className="countdown-item flex flex-col items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-error/8 border border-error text-center">
                    <h5 className="hours text-sm sm:text-base">
                      {timeLeft.hours}
                    </h5>
                    <p className="text-xs sm:text-sm leading-[18px] sm:leading-[22px]">
                      Hours
                    </p>
                  </div>
                  <p className="font-semibold">:</p>
                  <div className="countdown-item flex flex-col items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-error/8 border border-error text-center">
                    <h5 className="minutes text-sm sm:text-base">
                      {timeLeft.minutes}
                    </h5>
                    <p className="text-xs sm:text-sm leading-[18px] sm:leading-[22px]">
                      Min
                    </p>
                  </div>
                  <p className="font-semibold">:</p>
                  <div className="countdown-item flex flex-col items-center justify-center w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-error/8 border border-error text-center">
                    <h5 className="seconds text-sm sm:text-base">
                      {timeLeft.seconds}
                    </h5>
                    <p className="text-xs sm:text-sm leading-[18px] sm:leading-[22px]">
                      Sec
                    </p>
                  </div>
                </div>
              </div>
              <div className="progressbar-section mb-6">
                <div className="progress w-full h-1.5 bg-warning-lighter rounded-[50px] overflow-hidden mb-2.5">
                  <div
                    style={{ width: "60%" }}
                    className="progress-bar h-full bg-warning rounded-[50px]"
                  />
                </div>
                <p className="text-light-primary-text">
                  Please Hurry! Only 120 Item's Stock Left
                </p>
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
                    <a
                      href="#"
                      className="text-sm hover:underline text-light-primary-text font-medium"
                    >
                      Size Guide
                    </a>
                  </div>
                  <div className="size-variation-items flex items-center gap-2 2xl:flex-nowrap flex-wrap">
                    {PACK_SIZES.map((size) => (
                      <div key={size} className="size-variation-item">
                        <button
                          onClick={() => setSelectedSize(size)}
                          className={clsx(
                            "cursor-pointer flex items-center justify-center text-sm leading-6 px-5 py-1.5 font-semibold border rounded-[100px] transition-all",
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
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="quantity-section w-full sm:max-w-[160px] md:max-w-[185px] border border-gray-300 rounded-[80px] px-4 py-[11px] flex items-center justify-between">
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
                          setQuantity(parseInt(e.target.value) || 1)
                        }
                      />
                      <button
                        onClick={() => handleQuantityChange("inc")}
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                      >
                        <i className="hgi hgi-stroke hgi-plus-sign text-xl leading-5" />
                      </button>
                    </div>
                    <div className="flex-1 w-full flex items-center gap-3">
                      <button className="btn btn-warning btn-large rounded-[80px] flex-1">
                        Buy Now
                      </button>
                      <button className="btn btn-primary btn-large rounded-[80px] flex-1 flex items-center justify-center">
                        <i className="hgi hgi-stroke hgi-shopping-cart-add-02 text-2xl leading-6 text-white mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-share-and-compare-section flex items-center gap-x-4 mt-6">
                <button
                  type="button"
                  className="product-share-btn text-info inline-flex items-center gap-x-2.5 pr-4 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-px after:h-3 after:bg-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-share-05 text-xl leading-5" />
                  <span className="hover:underline">Share</span>
                </button>
                <button
                  type="button"
                  className="product-compare-btn text-info inline-flex items-center gap-x-2.5"
                >
                  <i className="hgi hgi-stroke hgi-git-compare text-xl leading-5" />
                  <span className="hover:underline">Compare</span>
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
