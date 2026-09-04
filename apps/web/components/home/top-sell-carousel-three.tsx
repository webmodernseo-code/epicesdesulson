"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import StarRating from "@/components/common/star-rating";

const chunkItems = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const TOP_RATE_ITEMS = [
  {
    image: "/images/home-3/watermelon.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/3-eggs.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/orange.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/apple.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/strawberry.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/lettuce.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
];

const TOP_ITEMS_DATA = [
  {
    image: "/images/home-3/papaya.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/fish-1.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/t-bone-steak-meat.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/apple-juice.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/lemon-juice.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
  {
    image: "/images/home-3/lime-chips.png",
    title: "VitaLife Omega-3 Softgels Heart Support Max Strength",
    price: "$27.49",
    oldPrice: "$39.99",
    ratingCount: "(189)",
  },
];

export default function TopSellCarouselThree() {
  const topRateChunks = chunkItems(TOP_RATE_ITEMS, 3);
  const topItemsChunks = chunkItems(TOP_ITEMS_DATA, 3);

  return (
    <div className="pb-[70px]">
      <div className="container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-y-3 mb-10"
        >
          <h3 className="text-light-primary-text">Top Selling Products</h3>
          <p>Up to 69% discount for limited time 🔥</p>
        </motion.div>
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FFEB69] rounded-[32px] pt-8 pb-12 xl:col-span-4 col-span-12"
          >
            <div className="mb-3">
              <Image
                alt="product-1"
                className="max-w-[512px] w-full xl:max-h-[361px] h-full bg-cover mx-auto"
                src="/images/home-3/pomegranate.png"
                width={512}
                height={361}
              />
            </div>
            <div className="text-center px-15">
              <h3 className="mb-4">Stay Fit. Stay Healthy.</h3>
              <p className="text-light-primary-text mb-4">
                Discover Vitamins, Supplements, Skincare &amp; Immunity Boosters
                — All in One Place.
              </p>
              <Link
                href="/shop-left-sidebar-3col"
                className="btn btn-primary btn-large rounded-[60px] group py-2 pl-5 pr-3"
              >
                Explore Wellness
                <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl text-primary-darker" />
                </span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-4 col-span-12 lg:col-span-6"
          >
            <div className="flex items-center justify-between pb-6 mb-7 border-b border-[rgba(145,158,171,0.24)]">
              <h4>Top Rate</h4>
              <div className="home-one-top-rate-slider-nav md:flex items-center justify-between gap-x-6 hidden">
                <button className="top-rate-prev size-11 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-primary text-light-primary-text hover:text-white transition-all">
                  <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
                </button>
                <button className="top-rate-next size-11 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-primary text-light-primary-text hover:text-white transition-all">
                  <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
                </button>
              </div>
            </div>
            <div className="-mx-3">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                speed={500}
                direction="horizontal"
                navigation={{
                  nextEl: ".top-rate-next",
                  prevEl: ".top-rate-prev",
                }}
                loop={true}
                className="sellzy-slider"
              >
                {topRateChunks.map((chunk, slideIndex) => (
                  <SwiperSlide key={`top-rate-slide-${slideIndex}`}>
                    <div className="flex flex-col">
                      {chunk.map((item, index) => (
                        <div
                          key={`top-rate-item-${slideIndex}-${index}`}
                          className="p-3"
                        >
                          <div className="p-4 bg-white rounded-2xl flex items-center flex-col md:flex-row gap-4">
                            <div className="md:size-32 size-full flex-none rounded-2xl bg-gray-300">
                              <Image
                                src={item.image}
                                alt="product"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-y-[15px]">
                              <p className="font-semibold text-light-primary-text hover:text-primary transition-colors duration-300">
                                <Link href="/product-details">
                                  {item.title}
                                </Link>
                              </p>
                              <div className="flex justify-between">
                                <div className="flex flex-col gap-y-[15px]">
                                  <div className="rating-section flex items-center">
                                    <StarRating ratingPercentage={"80%"} />
                                    <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                                      {item.ratingCount}
                                    </span>
                                  </div>
                                  <div className="price-section flex items-center gap-x-3">
                                    <span className="current-price font-semibold text-light-primary-text">
                                      {item.price}
                                    </span>
                                    <span className="old-price text-sm leading-[22px] font-normal text-light-disabled-text line-through">
                                      {item.oldPrice}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-end">
                                  <Link
                                    href="/cart-single-vendor"
                                    className="btn btn-primary btn-large rounded-[100px] group py-2.5 px-[22px]"
                                  >
                                    <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
                                    Add
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="xl:col-span-4 col-span-12 lg:col-span-6"
          >
            <div className="flex items-center justify-between pb-6 mb-7 border-b border-[rgba(145,158,171,0.24)]">
              <h4>Top Items</h4>
              <div className="home-one-top-items-slider-nav md:flex items-center justify-between gap-x-6 hidden">
                <button className="top-items-prev size-11 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-primary text-light-primary-text hover:text-white transition-all">
                  <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
                </button>
                <button className="top-items-next size-11 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-primary text-light-primary-text hover:text-white transition-all">
                  <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
                </button>
              </div>
            </div>
            <div className="-mx-3">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                speed={500}
                direction="horizontal"
                navigation={{
                  nextEl: ".top-items-next",
                  prevEl: ".top-items-prev",
                }}
                loop={true}
                className="sellzy-slider"
              >
                {topItemsChunks.map((chunk, slideIndex) => (
                  <SwiperSlide key={`top-items-slide-${slideIndex}`}>
                    <div className="flex flex-col">
                      {chunk.map((item, index) => (
                        <div
                          key={`top-items-item-${slideIndex}-${index}`}
                          className="p-3"
                        >
                          <div className="p-4 bg-white rounded-2xl flex items-center flex-col md:flex-row gap-4">
                            <div className="md:size-32 size-full flex-none rounded-2xl bg-gray-300">
                              <Image
                                src={item.image}
                                alt="product"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-y-[15px]">
                              <p className="font-semibold text-light-primary-text hover:text-primary transition-colors duration-300">
                                <Link href="/product-details">
                                  {item.title}
                                </Link>
                              </p>
                              <div className="flex justify-between">
                                <div className="flex flex-col gap-y-[15px]">
                                  <div className="rating-section flex items-center">
                                    <StarRating ratingPercentage={"80%"} />
                                    <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                                      {item.ratingCount}
                                    </span>
                                  </div>
                                  <div className="price-section flex items-center gap-x-3">
                                    <span className="current-price font-semibold text-light-primary-text">
                                      {item.price}
                                    </span>
                                    <span className="old-price text-sm leading-[22px] font-normal text-light-disabled-text line-through">
                                      {item.oldPrice}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-end">
                                  <Link
                                    href="/cart-single-vendor"
                                    className="btn btn-primary btn-large rounded-[100px] group py-2.5 px-[22px]"
                                  >
                                    <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-white" />
                                    Add
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
