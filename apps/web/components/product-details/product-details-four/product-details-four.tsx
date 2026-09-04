"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductDetailsFourCouponSlider from "./product-details-four-coupon-slider";
import ProductDetailsFourSize from "./product-details-four-size";
import StarRating from "@/components/common/star-rating";

export default function ProductDetailsFour() {
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="pb-12">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="xl:col-span-7 lg:col-span-6">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-6">
              <div className="xl:col-span-6 lg:col-span-6 col-span-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="product-image-container rounded-3xl h-[447px] relative overflow-hidden"
                >
                  <Image
                    src="/images/product-details/product-details-9.jpg"
                    alt="product-details-9"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </div>
              <div className="xl:col-span-6 lg:col-span-6 col-span-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="product-image-container rounded-3xl h-[447px] relative overflow-hidden"
                >
                  <Image
                    src="/images/product-details/product-details-10.jpg"
                    alt="product-details-10"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-6">
              <div className="xl:col-span-6 lg:col-span-6 col-span-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="product-image-container rounded-3xl h-[447px] relative overflow-hidden"
                >
                  <Image
                    src="/images/product-details/product-details-11.png"
                    alt="product-details-11"
                    fill
                    className="object-cover object-[0_-58px]"
                  />
                </motion.div>
              </div>
              <div className="xl:col-span-6 lg:col-span-6 col-span-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="product-image-container rounded-3xl h-[447px] relative overflow-hidden"
                >
                  <Image
                    src="/images/product-details/product-details-12.jpg"
                    alt="product-details-12"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </div>
            </div>
            <div className="h-60 relative overflow-hidden rounded-3xl">
              <Image
                src="/images/product-details/product-details-13.png"
                alt="product-details-13"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="xl:col-span-5 lg:col-span-6 mt-6 lg:mt-0">
            <div className="rounded-3xl border border-gray-300 p-6">
              <span className="product-discount-badge inline-block mb-6 uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url(/images/discount-shape.png)] after:bg-contain after:bg-no-repeat">
                Sales
              </span>
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
                <ProductDetailsFourSize />
                <ProductDetailsFourCouponSlider />
                <div className="product-add-to-cart-btn-section">
                  <p className="font-semibold text-light-primary-text mb-4">
                    Quantity:
                  </p>
                  <div className="flex items-center justify-between gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
                    <div className="quantity-section flex-1 max-w-[185px] border border-gray-300 rounded-[80px] px-4 py-[11px] flex items-center justify-between">
                      <button
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <i className="hgi hgi-stroke hgi-minus-sign text-xl leading-5" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        className="quantity-input text-center w-full focus:outline-none font-semibold text-base leading-6 text-light-primary-text bg-transparent"
                        value={quantity}
                      />
                      <button
                        className="quantity-btn inline-flex items-center justify-center hover:text-primary"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <i className="hgi hgi-stroke hgi-plus-sign text-xl leading-5" />
                      </button>
                    </div>
                    <button className="btn btn-warning btn-large rounded-[80px] flex-1">
                      Buy Now
                    </button>
                    <button className="btn btn-primary btn-large rounded-[80px] flex-1">
                      <i className="hgi hgi-stroke hgi-shopping-cart-add-02 leading-6 text-2xl text-white pr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-share-and-compare-section flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:items-center md:gap-x-4 mt-6">
                <Link
                  href="/wishlist-style-v1"
                  className="product-wishlist-btn text-info inline-flex items-center gap-x-2.5 md:pr-4 md:relative md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:after:w-px md:after:h-3 md:after:bg-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-favourite text-xl leading-5" />
                  <span className="hover:underline">Add to Wishlist</span>
                </Link>
                <Link
                  href="#"
                  className="product-share-btn text-info inline-flex items-center gap-x-2.5 md:pr-4 md:relative md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:after:w-px md:after:h-3 md:after:bg-gray-300"
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
