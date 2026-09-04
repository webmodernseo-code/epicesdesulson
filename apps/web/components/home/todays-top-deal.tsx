"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuickView } from "@/context/quick-view-context";
import StarRating from "@/components/common/star-rating";

const DEALS_DATA = [
  {
    id: 1,
    image: "/images/home-3/strawberry-snacks.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.2s",
  },
  {
    id: 2,
    image: "/images/home-3/apple-juice.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.3s",
  },
  {
    id: 3,
    image: "/images/home-3/pouch-mockup.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.4s",
  },
  {
    id: 4,
    image: "/images/home-3/fresh-beans.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.5s",
  },
  {
    id: 5,
    image: "/images/home-3/eggs.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.6s",
  },
  {
    id: 6,
    image: "/images/home-3/fresh-beans.png",
    storeName: "Store Name/Category",
    title: "Nebulizer Ultracare",
    currentPrice: "$28.56",
    oldPrice: "$29.56",
    discount: "10% OFF",
    ratingPercentage: 80,
    ratingCount: 118,
    sold: 4,
    available: 200,
    progressPercentage: 60,
    badgeText: "SALES",
    delay: "0.7s",
  },
];

const useCountdown = (daysOut = 1) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOut);
    const countDownDate = targetDate.getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? `0${days}` : days.toString(),
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [daysOut]);

  return timeLeft;
};

export default function TodaysTopDeal() {
  const timeLeft = useCountdown(1);
  const { openQuickView } = useQuickView();
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="md:flex md:justify-between md:items-center border-b border-gray-300 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left flex flex-col gap-y-2 pb-6"
          >
            <h3>Today's Best Deal</h3>
            <p>Up to 69% discount for limited time 🔥</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-x-5"
          >
            <div className="limited-time-countdown flex items-center justify-center gap-x-1 bg-success-lighter py-[9px] px-6 rounded-[50px] mx-auto mt-5 mb-5 md:mb-0 md:mt-0 sellzy-countdown">
              <h5 className="text-light-primary-text">Ends in:</h5>
              <h5 className="hours text-light-primary-text">
                {timeLeft.hours}
              </h5>
              <h5 className="text-light-primary-text">:</h5>
              <h5 className="minutes text-light-primary-text">
                {timeLeft.minutes}
              </h5>
              <h5 className="text-light-primary-text">:</h5>
              <h5 className="seconds text-light-primary-text">
                {timeLeft.seconds}
              </h5>
            </div>
            <div className="home-four-picks-slider-nav md:flex items-center justify-between gap-x-3 hidden">
              <button className="bg-[rgba(145,158,171,0.08)] todays-top-deal-prev size-12 rounded-full flex items-center justify-center text-light-primary-text hover:bg-primary hover:text-white transition-all  hover:border-transparent   ">
                <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
              </button>
              <button className="bg-[rgba(145,158,171,0.08)] todays-top-deal-next size-12 rounded-full flex items-center justify-center text-light-primary-text hover:bg-primary hover:text-white transition-all  hover:border-transparent  ">
                <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
              </button>
            </div>
          </motion.div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".todays-top-deal-next",
            prevEl: ".todays-top-deal-prev",
          }}
          breakpoints={{
            480: { slidesPerView: 1 },
            769: { slidesPerView: 2 },
            1025: { slidesPerView: 3 },
            1441: { slidesPerView: 5 },
          }}
          className="home-four-picks-slider -mx-3 sellzy-slider"
        >
          {DEALS_DATA.map((product) => (
            <SwiperSlide key={product.id}>
              {/* ========== Single Product Card Start ========== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: parseFloat(product.delay) }}
                viewport={{ once: true }}
                className="mx-3"
              >
                <div className="border border-gray-300 rounded-2xl product-card-1 p-4 group">
                  <div className="product-image-container relative">
                    <div className="product-image rounded-xl mb-4 overflow-hidden h-[300px]">
                      <Link href="/product-details">
                        <Image
                          src={product.image}
                          alt={`product-${product.id}`}
                          width={300}
                          height={300}
                          className="w-full h-auto group-hover:scale-110 transition-all transform group-hover:-rotate-3 ease-in-out duration-300 bg-[#F4F3F5] h-full w-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="product-btn-actions absolute bottom-0 right-0 left-0 flex justify-center z-9 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bottom-3">
                      <ul className="flex items-center gap-x-px">
                        <li>
                          <Link
                            aria-label="Add to Wishlist"
                            className="product-btn-action-item relative size-11 bg-white inline-flex items-center justify-center rounded-tl-sm rounded-bl-sm before:absolute before:left-[calc(50%-8px)] before:bottom-full before:z-9 before:border-8 before:border-transparent before:border-t-black before:opacity-0 before:invisible before:-mb-3.5 hover:before:opacity-100 hover:before:visible before:transition-all before:duration-300 after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:rounded-sm after:bg-gray-800 after:whitespace-nowrap after:text-white after:text-xs after:leading-[18px] after:py-[3px] after:px-2 after:content-[attr(aria-label)] after:opacity-0 after:invisible after:transition-all after:duration-300 hover:after:opacity-100 hover:after:visible hover:after:-translate-y-2.5 hover:before:-translate-y-2.5"
                            href="/wishlist-style-v1"
                          >
                            <i className="hgi hgi-stroke hgi-favourite text-2xl leading-6 text-light-secondary-text" />
                          </Link>
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
                            onClick={() => openQuickView(product)}
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
                    <span className="product-discount-badge inline-block relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url('/images/discount-shape.png')] after:bg-no-repeat after:bg-contain uppercase">
                      {product.badgeText}
                    </span>
                    <p className="py-3 text-sm leading-[22px]">
                      {product.storeName}
                    </p>
                    <h6 className="text-[18px] leading-7 font-bold pb-3">
                      <Link href="/product-details">{product.title}</Link>
                    </h6>
                    <div className="price-section flex items-center gap-x-3 mb-3">
                      <span className="current-price text-[16px] leading-6 font-semibold text-light-primary-text">
                        {product.currentPrice}
                      </span>
                      <span className="old-price text-sm leading-[22px] text-light-disabled-text line-through">
                        {product.oldPrice}
                      </span>
                      <span className="discount-percentage text-sm leading-[22px] font-semibold text-error">
                        {product.discount}
                      </span>
                    </div>
                    <div className="rating-section flex items-center mb-3">
                      <StarRating ratingPercentage={`${product.ratingPercentage}%`} />
                      <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                        ({product.ratingCount})
                      </span>
                    </div>
                    <div className="deal-progress flex flex-col gap-y-1 mb-3">
                      <div className="progress w-full h-1.5 bg-warning-lighter rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: `${product.progressPercentage}%` }}
                          className="progress-bar h-full bg-warning rounded-[50px]"
                        />
                      </div>
                      <div className="deal-stock flex items-center justify-between">
                        <div className="stock-sold flex items-center gap-x-2.5">
                          <p className="text-[16px] leading-6">Sold:</p>
                          <p className="text-[16px] leading-6 text-light-primary-text">
                            {product.sold}
                          </p>
                        </div>
                        <div className="stock-remaining flex items-center gap-x-2.5">
                          <p className="text-[16px] leading-6">Available:</p>
                          <p className="text-[16px] leading-6 text-light-primary-text">
                            {product.available}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="btn-section flex items-center gap-x-4">
                      <Link
                        href="/wishlist-style-v1"
                        className="size-11 flex flex-none items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        <i className="hgi hgi-stroke hgi-favourite text-xl text-light-secondary-text" />
                      </Link>
                      <Link
                        href="/cart-single-vendor"
                        className="btn btn-primary rounded-full font-semibold text-sm leading-6 px-6.5 py-2 flex-1"
                      >
                        <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
                        <span>Add to Cart</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* ========== Single Product Card End ========== */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
