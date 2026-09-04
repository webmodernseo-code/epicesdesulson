"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import Image from "next/image";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

export default function ProductDetailsThreeTab() {
  const [activeTab, setActiveTab] = useState("description");
  const [sortBy, setSortBy] = useState("newest");

  const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
    { value: "rating", label: "Rating" },
    { value: "relevance", label: "Relevance" },
    { value: "comment-count", label: "Comment Count" },
  ];

  return (
    <section className="pb-12">
      <div className="container">
        <div id="product-details-tabs">
          <ul className="filter-list">
            <li>
              <button
                className={clsx(activeTab === "description" && "active")}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
            </li>
            <li>
              <button
                className={clsx(activeTab === "additional-info" && "active")}
                onClick={() => setActiveTab("additional-info")}
              >
                Additional Info
              </button>
            </li>
            <li>
              <button
                className={clsx(activeTab === "reviews" && "active")}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </li>
          </ul>
          <div
            id="description"
            className={clsx(
              "product-details-tab fade",
              activeTab === "description" ? "active" : "hidden",
            )}
          >
            <h5 className="product-details-tab-title">Description</h5>
            <div className="product-details-tab-content">
              <p className="mb-6">
                To begin, carefully unpack the product and ensure all necessary
                components are included. Place the product on a clean, flat
                surface before use. If the device requires power, insert the
                batteries or connect it to a power source as indicated in the
                manual. Press the power button to activate the product, and
                refer to the control panel or app interface to adjust the
                settings according to your preference. Use the product as
                recommended, following all safety guidelines provided. After
                use, turn off the device and disconnect it from the power
                source. Clean and store the product in a cool, dry place to
                maintain its condition for future use.
              </p>
              <p className="mb-6">
                To begin, carefully unpack the product and ensure all necessary
                components are included. Place the product on a clean, flat
                surface before use. If the device requires power, insert the
                batteries or connect it to a power source as indicated in the
                manual. Press the power button to activate the product, and
                refer to the control panel or app interface to adjust the
                settings according to your preference. Use the product as
                recommended, following all safety guidelines provided. After
                use, turn off the device and disconnect it from the power
                source. Clean and store the product in a cool, dry place to
                maintain its condition for future use.
              </p>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 gap-y-6 lg:gap-y-0 mb-6">
                <div className="lg:col-span-6">
                  <ul>
                    <li>
                      <p>
                        Real-time shipping rates, tracking, and delivery
                        management
                      </p>
                    </li>
                    <li>
                      <p>
                        Real-time stock tracking and alerts for low inventory
                      </p>
                    </li>
                    <li>
                      <p>
                        Support for multiple payment options like credit cards,
                        PayPal, Stripe,
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6 mt-6 lg:mt-0">
                  <ul>
                    <li>
                      <p>
                        Real-time shipping rates, tracking, and delivery
                        management
                      </p>
                    </li>
                    <li>
                      <p>
                        Real-time stock tracking and alerts for low inventory
                      </p>
                    </li>
                    <li>
                      <p>
                        Support for multiple payment options like credit cards,
                        PayPal, Stripe,
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 items-center mb-6">
                <div className="lg:col-span-5 mt-6 lg:mt-0">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-3xl"
                  >
                    <Image
                      src="/images/product-details/product-details-4.jpg"
                      alt="product-details"
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover max-h-[500px]"
                    />
                  </motion.div>
                </div>
                <div className="lg:col-span-7">
                  <h4 className="mb-6">🛒 eCommerce Platform Features</h4>
                  <p className="mb-6">
                    Launch, manage, and grow your online store with our
                    all-in-one eCommerce solution. Whether you're a small
                    business or a growing brand, our platform is designed to
                    simplify the selling process and enhance your customers’
                    shopping experience. From product listings to secure
                    payments and seamless shipping, everything you need is built
                    right in.
                  </p>
                  <ul>
                    <li>
                      <p>
                        Real-time shipping rates, tracking, and delivery
                        management
                      </p>
                    </li>
                    <li>
                      <p>
                        Real-time stock tracking and alerts for low inventory
                      </p>
                    </li>
                    <li>
                      <p>
                        Support for multiple payment options like credit cards,
                        PayPal, Stripe,
                      </p>
                    </li>
                    <li>
                      <p>
                        Seamless experience across smartphones, tablets, and
                        desktops
                      </p>
                    </li>
                    <li>
                      <p>
                        Track sales, traffic, conversion rates, and customer
                        behavior
                      </p>
                    </li>
                    <li>
                      <p>
                        Allow customers to track orders, reorder, and manage
                        profiles
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 items-center mb-6">
                <div className="lg:col-span-7">
                  <h4 className="mb-6">Easy to Customization</h4>
                  <p className="mb-6">
                    Launch, manage, and grow your online store with our
                    all-in-one eCommerce solution. Whether you're a small
                    business or a growing brand, our platform is designed to
                    simplify the selling process and enhance your customers’
                    shopping experience. From product listings to secure
                    payments and seamless shipping, everything you need is built
                    right in.
                  </p>
                  <ul>
                    <li>
                      <p>
                        Real-time shipping rates, tracking, and delivery
                        management
                      </p>
                    </li>
                    <li>
                      <p>
                        Real-time stock tracking and alerts for low inventory
                      </p>
                    </li>
                    <li>
                      <p>
                        Support for multiple payment options like credit cards,
                        PayPal, Stripe,
                      </p>
                    </li>
                    <li>
                      <p>
                        Seamless experience across smartphones, tablets, and
                        desktops
                      </p>
                    </li>
                    <li>
                      <p>
                        Track sales, traffic, conversion rates, and customer
                        behavior
                      </p>
                    </li>
                    <li>
                      <p>
                        Allow customers to track orders, reorder, and manage
                        profiles
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 mt-6 lg:mt-0">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-3xl"
                  >
                    <Image
                      src="/images/product-details/product-details-3.jpg"
                      alt="product-details"
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover max-h-[500px]"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="md:col-span-6 col-span-12 xl:col-span-3">
                  <div className="p-6 border-gray-300 border rounded-2xl text-center">
                    <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                      <i className="hgi hgi-stroke hgi-container-truck text-3xl text-light-primary-text" />
                    </span>
                    <h5 className="pt-3 pb-0.5">Free Shipping</h5>
                    <p>Enjoy the Convenience of Free Shipping on Every Order</p>
                  </div>
                </div>
                <div className="md:col-span-6 col-span-12 xl:col-span-3">
                  <div className="p-6 border-gray-300 border rounded-2xl text-center">
                    <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                      <i className="hgi hgi-stroke hgi-customer-support text-3xl text-light-primary-text" />
                    </span>
                    <h5 className="pt-3 pb-0.5">24x7 Support</h5>
                    <p>Round-the-Clock Assistance, Anytime You Need It</p>
                  </div>
                </div>
                <div className="md:col-span-6 col-span-12 xl:col-span-3">
                  <div className="p-6 border-gray-300 border rounded-2xl text-center">
                    <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                      <i className="hgi hgi-stroke hgi-delivery-return-02 text-3xl text-light-primary-text" />
                    </span>
                    <h5 className="pt-3 pb-0.5">30 Days Return</h5>
                    <p>
                      Your Satisfaction is Our Priority: Return Any Product
                      Within 30 Days
                    </p>
                  </div>
                </div>
                <div className="md:col-span-6 col-span-12 xl:col-span-3">
                  <div className="p-6 border-gray-300 border rounded-2xl text-center">
                    <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                      <i className="hgi hgi-stroke hgi-transaction text-3xl text-light-primary-text" />
                    </span>
                    <h5 className="pt-3 pb-0.5">Secure Payment</h5>
                    <p>
                      Seamless Shopping Backed by Safe and Secure Payment
                      Options
                    </p>
                  </div>
                </div>
              </div>
              <p>
                To begin, carefully unpack the product and ensure all necessary
                components are included. Place the product on a clean, flat
                surface before use. If the device requires power, insert the
                batteries or connect it to a power source as indicated in the
                manual. Press the power button to activate the product, and
                refer to the control panel or app interface to adjust the
                settings according to your preference. Use the product as
                recommended, following all safety guidelines provided. After
                use, turn off the device and disconnect it from the power
                source. Clean and store the product in a cool, dry place to
                maintain its condition for future use.
              </p>
            </div>
          </div>
          <div
            id="additional-info"
            className={clsx(
              "product-details-tab",
              activeTab === "additional-info" ? "active fade" : "hidden",
            )}
          >
            <h5 className="product-details-tab-title">Additional Info</h5>
            <div className="product-details-tab-content">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-gray-300">
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Product Type
                    </th>
                    <td>Touchless Infrared Thermometer</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Brand
                    </th>
                    <td>Mediguard</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Model
                    </th>
                    <td>X200</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Measurement Time
                    </th>
                    <td>1 Second</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Contact Type
                    </th>
                    <td>Non-Contact</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Measurement Range
                    </th>
                    <td>32°C – 42.9°C / 89.6°F – 109.2°F</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Modes
                    </th>
                    <td>Body &amp; Surface</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Accuracy
                    </th>
                    <td>±0.2°C / ±0.4°F</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Memory Capacity
                    </th>
                    <td>20 Readings</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Display Type
                    </th>
                    <td>Backlit LCD</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Battery Type
                    </th>
                    <td>2 × AAA (not included)</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Dimensions
                    </th>
                    <td>150mm × 40mm × 45mm</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Weight
                    </th>
                    <td>90g (without batteries)</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Warranty
                    </th>
                    <td>1 Year</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Usage
                    </th>
                    <td>Suitable for all age groups</td>
                  </tr>
                  <tr>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      Certification
                    </th>
                    <td>CE, FDA Approved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="reviews"
            className={clsx(
              "product-details-tab",
              activeTab === "reviews" ? "active fade" : "hidden",
            )}
          >
            <h5 className="product-details-tab-title">Reviews</h5>
            <div className="product-details-tab-content p-0!">
              <div className="grid grid-cols-12 md:divide-x divide-y md:divide-y-0 divide-gray-300 rating-overview">
                <div className="md:col-span-4 col-span-12 flex items-center justify-center py-6 md:py-0">
                  <div className="rating-heading space-y-2 text-center">
                    <p className="font-semibold text-light-primary-text">
                      Average Rating
                    </p>
                    <h2 className="text-error">4/5</h2>
                    <div className="rating-section flex items-center justify-center">
                      <StarRating ratingPercentage={"80%"} />
                    </div>
                    <p>(8.24k reviews)</p>
                  </div>
                </div>
                <div className="md:col-span-4 col-span-12 p-6 flex items-center justify-center">
                  <div className="list-rating space-y-6 w-full">
                    <div className="flex gap-x-4 items-center">
                      <span className="font-semibold text-light-primary-text">
                        5 Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: "70%" }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>35.74k</span>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <span className="font-semibold text-light-primary-text">
                        4 Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: "70%" }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>79.41k</span>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <span className="font-semibold text-light-primary-text">
                        3 Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: "70%" }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>60.69k</span>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <span className="font-semibold text-light-primary-text">
                        2 Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: "70%" }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>42.12k</span>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <span className="font-semibold text-light-primary-text">
                        1 Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: "70%" }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>12.58k</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 col-span-12 flex items-center justify-center py-6 md:py-0">
                  <a
                    href="#comment-forms"
                    className="btn btn-primary outline btn-large rounded-[100px]"
                  >
                    Write a Review
                  </a>
                </div>
              </div>
              <div
                id="comment-forms"
                className="comment-form-wrapper p-6 border-t border-gray-300 border-b"
              >
                <div className="comment-respond md:border md:border-gray-300 md:rounded-3xl md:p-6">
                  <h5 className="mb-6">Add Comment</h5>
                  <div className="flex items-center gap-x-3 mb-6">
                    <p className="text-light-primary-text font-medium">
                      Your review about this product:
                    </p>
                    <div className="rating-section flex items-center justify-center">
                      <StarRating ratingPercentage={"0%"} />
                    </div>
                  </div>
                  <form
                    className="comment-forms flex flex-col gap-y-6"
                    action="#"
                  >
                    <div className="input-group medium rounded-[20px] px-3.5 resize-none">
                      <textarea
                        id="post_comment"
                        rows={4}
                        className="peer form-control placeholder-transparent focus:placeholder-transparent"
                        placeholder="Comment *"
                        defaultValue={""}
                      />
                      <label
                        htmlFor="post_comment"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Comment *
                      </label>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="name"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Name *"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Name *
                      </label>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="email"
                        id="personal_email"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Email *"
                      />
                      <label
                        htmlFor="personal_email"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Email *
                      </label>
                    </div>
                    <div className="flex md:justify-end justify-start gap-x-4">
                      <button className="btn btn-default outline btn-large rounded-[100px] w-[47%] md:w-auto py-[11px] shadow-none">
                        Cancel
                      </button>
                      <button className="btn btn-primary btn-large rounded-[100px] w-[47%] md:w-auto py-[11px]">
                        Post Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="comment-list-wrapper p-6">
                <div className="comment-list-title flex items-center justify-between pb-6 border-b border-gray-300 mb-6">
                  <h5>Customer Ratings &amp; Review</h5>
                    <CustomFloatingSelect
                      options={SORT_OPTIONS}
                      label="Sorting"
                      defaultValue="newest"
                      onChange={(value) => setSortBy(value)}
                    />
                </div>
                <ol className="comment-list">
                  <li className="comment">
                    <div className="comment-body">
                      <div className="comment-avatar-card flex items-center gap-x-4 mb-3">
                        <div className="comment-author-avatar size-12 rounded-full overflow-hidden shrink-0">
                          <Image
                            src="/images/blog/user-avatar-1.png"
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="comment-author-info flex-1">
                          <p className="comment-author font-semibold text-light-primary-text">
                            Robert Fox
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="rating-section flex items-center relative after:absolute after:h-[22px] after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-300 pr-3">
                          <StarRating ratingPercentage={"80%"} />
                          <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text">
                            4.5
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1 pl-3">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5269 3.13379L13.9331 3.67969L13.7065 6.13965L15.3335 8L13.7065 9.86035L13.9331 12.3203L11.5269 12.8662L10.2661 14.9932L7.99951 14.0195L5.73291 15L4.47314 12.873L2.06689 12.3271L2.29346 9.86035L0.666504 8L2.29346 6.13379L2.06689 3.66699L4.47314 3.12695L5.73291 1L7.99951 1.97363L10.2661 1L11.5269 3.13379ZM6.72607 9.17285L5.18018 7.62012L4.19287 8.60645L6.72607 11.1465L11.6128 6.24707L10.6265 5.25977L6.72607 9.17285Z"
                              fill="#088178"
                            />
                          </svg>
                          <p className="text-primary text-sm leading-[22px]">
                            Verified purchase
                          </p>
                        </div>
                      </div>
                      <div className="comment-content pl-0! pr-0! mb-3">
                        <p className="text-light-primary-text">
                          Very nice ! On the other hand, we denounce with
                          righteous indignation and dislike men who are so
                          beguiled and demoralized by the
                        </p>
                      </div>
                      <div className="comment-actions flex md:items-center md:flex-row flex-col gap-y-3 md:gap-y-0">
                        <p className="text-sm leading-[22px] md:pr-3">
                          was this review helpful to you?
                        </p>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pr-3 relative md:after:absolute md:after:h-5 md:after:w-px md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:bg-gray-300"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-up text-lg leading-[18px] text-light-primary-text" />
                          Thank (234)
                        </a>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pl-3"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-down text-lg leading-[18px] text-light-primary-text" />
                          Dislike (12)
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="comment">
                    <div className="comment-body">
                      <div className="comment-avatar-card flex items-center gap-x-4 mb-3">
                        <div className="comment-author-avatar size-12 rounded-full">
                          <Image
                            src="/images/blog/user-avatar-1.png"
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="comment-author-info flex-1">
                          <p className="comment-author font-semibold text-light-primary-text">
                            Jenny Wilson
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="rating-section flex items-center relative after:absolute after:h-[22px] after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-300 pr-3">
                          <StarRating ratingPercentage={"80%"} />
                          <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text">
                            4.5
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1 pl-3">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5269 3.13379L13.9331 3.67969L13.7065 6.13965L15.3335 8L13.7065 9.86035L13.9331 12.3203L11.5269 12.8662L10.2661 14.9932L7.99951 14.0195L5.73291 15L4.47314 12.873L2.06689 12.3271L2.29346 9.86035L0.666504 8L2.29346 6.13379L2.06689 3.66699L4.47314 3.12695L5.73291 1L7.99951 1.97363L10.2661 1L11.5269 3.13379ZM6.72607 9.17285L5.18018 7.62012L4.19287 8.60645L6.72607 11.1465L11.6128 6.24707L10.6265 5.25977L6.72607 9.17285Z"
                              fill="#088178"
                            />
                          </svg>
                          <p className="text-primary text-sm leading-[22px]">
                            Verified purchase
                          </p>
                        </div>
                      </div>
                      <div className="comment-content pl-0! pr-0! mb-3">
                        <p className="text-light-primary-text">
                          Very nice ! On the other hand, we denounce with
                          righteous indignation and dislike men who are so
                          beguiled and demoralized by the
                        </p>
                      </div>
                      <div className="comment-actions flex md:items-center md:flex-row flex-col gap-y-3 md:gap-y-0">
                        <p className="text-sm leading-[22px] md:pr-3">
                          was this review helpful to you?
                        </p>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pr-3 relative md:after:absolute md:after:h-5 md:after:w-px md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:bg-gray-300"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-up text-lg leading-[18px] text-light-primary-text" />
                          Thank (234)
                        </a>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pl-3"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-down text-lg leading-[18px] text-light-primary-text" />
                          Dislike (12)
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="comment">
                    <div className="comment-body">
                      <div className="comment-avatar-card flex items-center gap-x-4 mb-3">
                        <div className="comment-author-avatar size-12 rounded-full">
                          <Image
                            src="/images/blog/user-avatar-1.png"
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="comment-author-info flex-1">
                          <p className="comment-author font-semibold text-light-primary-text">
                            Brooklyn Simmons
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="rating-section flex items-center relative after:absolute after:h-[22px] after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-300 pr-3">
                          <StarRating ratingPercentage={"80%"} />
                          <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text">
                            4.5
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1 pl-3">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5269 3.13379L13.9331 3.67969L13.7065 6.13965L15.3335 8L13.7065 9.86035L13.9331 12.3203L11.5269 12.8662L10.2661 14.9932L7.99951 14.0195L5.73291 15L4.47314 12.873L2.06689 12.3271L2.29346 9.86035L0.666504 8L2.29346 6.13379L2.06689 3.66699L4.47314 3.12695L5.73291 1L7.99951 1.97363L10.2661 1L11.5269 3.13379ZM6.72607 9.17285L5.18018 7.62012L4.19287 8.60645L6.72607 11.1465L11.6128 6.24707L10.6265 5.25977L6.72607 9.17285Z"
                              fill="#088178"
                            />
                          </svg>
                          <p className="text-primary text-sm leading-[22px]">
                            Verified purchase
                          </p>
                        </div>
                      </div>
                      <div className="comment-content pl-0! pr-0! mb-3">
                        <p className="text-light-primary-text">
                          Very nice ! On the other hand, we denounce with
                          righteous indignation and dislike men who are so
                          beguiled and demoralized by the
                        </p>
                      </div>
                      <div className="comment-actions flex md:items-center md:flex-row flex-col gap-y-3 md:gap-y-0">
                        <p className="text-sm leading-[22px] md:pr-3">
                          was this review helpful to you?
                        </p>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pr-3 relative md:after:absolute md:after:h-5 md:after:w-px md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:bg-gray-300"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-up text-lg leading-[18px] text-light-primary-text" />
                          Thank (234)
                        </a>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pl-3"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-down text-lg leading-[18px] text-light-primary-text" />
                          Dislike (12)
                        </a>
                      </div>
                    </div>
                  </li>
                </ol>
                <div className="comment-pagination-wrapper mt-6">
                  <ul className="flex items-center justify-center gap-x-1.5 comment-pagination">
                    <li className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] bg-white cursor-pointer border border-gray-300 group-hover:font-semibold group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-arrow-left-01 text-[20px] group-hover:font-semibold leading-5 text-light-primary-text group-hover:text-primary" />
                        </span>
                      </a>
                    </li>
                    <li className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] active"
                      >
                        1
                      </a>
                    </li>
                    <li className="group blog-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        2
                      </a>
                    </li>
                    <li className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        3
                      </a>
                    </li>
                    <li className="group blog-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        4
                      </a>
                    </li>
                    <li className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        5
                      </a>
                    </li>
                    <li className="comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] bg-white"
                      >
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-more-horizontal text-[20px] leading-5 text-light-primary-text" />
                        </span>
                      </a>
                    </li>
                    <li className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-arrow-right-01 text-[20px] leading-5 group-hover:font-semibold text-light-primary-text group-hover:text-primary" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
