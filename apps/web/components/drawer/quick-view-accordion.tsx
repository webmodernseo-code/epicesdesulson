"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import StarRating from "@/components/common/star-rating";

const INFO_ROWS = [
  { label: "Product Type", value: "Touchless Infrared Thermometer" },
  { label: "Brand", value: "Mediguard" },
  { label: "Model", value: "X200" },
  { label: "Measurement Time", value: "1 Second" },
  { label: "Contact Type", value: "Non-Contact" },
  { label: "Measurement Range", value: "32°C – 42.9°C / 89.6°F – 109.2°F" },
  { label: "Modes", value: "Body & Surface" },
  { label: "Accuracy", value: "±0.2°C / ±0.4°F" },
  { label: "Memory Capacity", value: "20 Readings" },
  { label: "Display Type", value: "Backlit LCD" },
  { label: "Battery Type", value: "2 × AAA (not included)" },
  { label: "Dimensions", value: "150mm × 40mm × 45mm" },
  { label: "Weight", value: "90g (without batteries)" },
  { label: "Warranty", value: "1 Year" },
  { label: "Usage", value: "Suitable for all age groups" },
  { label: "Certification", value: "CE, FDA Approved" },
];

const STAR_BREAKDOWN = [
  { stars: 5, pct: "70%", count: "35.74k" },
  { stars: 4, pct: "70%", count: "79.41k" },
  { stars: 3, pct: "70%", count: "60.69k" },
  { stars: 2, pct: "70%", count: "42.12k" },
  { stars: 1, pct: "70%", count: "12.58k" },
];

const REVIEWS_DATA = [
  {
    id: 1,
    author: "Robert Fox",
    rating: 4.5,
    avatar: "/images/blog/user-avatar-1.png",
    verified: true,
    text: "Very nice ! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
    thumbsUp: 234,
    thumbsDown: 12,
  },
  {
    id: 2,
    author: "Jenny Wilson",
    rating: 4.5,
    avatar: "/images/blog/user-avatar-1.png",
    verified: true,
    text: "Very nice ! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
    thumbsUp: 234,
    thumbsDown: 12,
  },
  {
    id: 3,
    author: "Brooklyn Simmons",
    rating: 4.5,
    avatar: "/images/blog/user-avatar-1.png",
    verified: true,
    text: "Very nice ! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
    thumbsUp: 234,
    thumbsDown: 12,
  },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
  { value: "rating", label: "Rating" },
  { value: "relevance", label: "Relevance" },
  { value: "comment-count", label: "Comment Count" },
];

const VerifiedBadge = () => (
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
);

export default function QuickViewAccordion() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "description",
  );

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="mt-6 space-y-6" id="product-details-accordion">
      {/* Description */}
      <div>
        <div
          onClick={() => toggleAccordion("description")}
          className={cn(
            "flex justify-between px-6 py-4 cursor-pointer bg-gray-200 items-center rounded-2xl",
            activeAccordion === "description" && "rounded-b-none",
          )}
        >
          <h5>Description</h5>
          <motion.i
            animate={{ rotate: activeAccordion === "description" ? 0 : -90 }}
            transition={{ duration: 0.3 }}
            className="hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6"
          />
        </div>
        {activeAccordion === "description" && (
          <div className="border p-6 border-gray-300 border-t-0 rounded-b-2xl">
            <p className="mb-6">
              To begin, carefully unpack the product and ensure all necessary
              components are included. Place the product on a clean, flat
              surface before use. If the device requires power, insert the
              batteries or connect it to a power source as indicated in the
              manual. Press the power button to activate the product, and refer
              to the control panel or app interface to adjust the settings
              according to your preference. Use the product as recommended,
              following all safety guidelines provided. After use, turn off the
              device and disconnect it from the power source. Clean and store
              the product in a cool, dry place to maintain its condition for
              future use.
            </p>
            <p className="mb-6">
              To begin, carefully unpack the product and ensure all necessary
              components are included. Place the product on a clean, flat
              surface before use. If the device requires power, insert the
              batteries or connect it to a power source as indicated in the
              manual. Press the power button to activate the product, and refer
              to the control panel or app interface to adjust the settings
              according to your preference. Use the product as recommended,
              following all safety guidelines provided. After use, turn off the
              device and disconnect it from the power source. Clean and store
              the product in a cool, dry place to maintain its condition for
              future use.
            </p>
            <div className="mb-6">
              <ul className="custom-list-style">
                <li>
                  <p>
                    Real-time shipping rates, tracking, and delivery management
                  </p>
                </li>
                <li>
                  <p>Real-time stock tracking and alerts for low inventory</p>
                </li>
                <li>
                  <p>
                    Support for multiple payment options like credit cards,
                    PayPal, Stripe,
                  </p>
                </li>
                <li>
                  <p>
                    Real-time shipping rates, tracking, and delivery management
                  </p>
                </li>
                <li>
                  <p>Real-time stock tracking and alerts for low inventory</p>
                </li>
                <li>
                  <p>
                    Support for multiple payment options like credit cards,
                    PayPal, Stripe,
                  </p>
                </li>
              </ul>
            </div>
            <div className="mb-6 relative overflow-hidden rounded-3xl max-h-[500px]">
              <Image
                src="/images/product-details/product-details-19.png"
                alt="product-details"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mb-6">
              <h4 className="mb-6">🛒 eCommerce Platform Features</h4>
              <p className="mb-6">
                Launch, manage, and grow your online store with our all-in-one
                eCommerce solution. Whether you&apos;re a small business or a
                growing brand, our platform is designed to simplify the selling
                process and enhance your customers&apos; shopping experience.
                From product listings to secure payments and seamless shipping,
                everything you need is built right in.
              </p>
              <ul className="custom-list-style">
                <li>
                  <p>
                    Real-time shipping rates, tracking, and delivery management
                  </p>
                </li>
                <li>
                  <p>Real-time stock tracking and alerts for low inventory</p>
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
            <div className="mb-6">
              <h4 className="mb-6">Easy to Customization</h4>
              <p className="mb-6">
                Launch, manage, and grow your online store with our all-in-one
                eCommerce solution. Whether you&apos;re a small business or a
                growing brand, our platform is designed to simplify the selling
                process and enhance your customers&apos; shopping experience.
                From product listings to secure payments and seamless shipping,
                everything you need is built right in.
              </p>
              <ul className="custom-list-style">
                <li>
                  <p>
                    Real-time shipping rates, tracking, and delivery management
                  </p>
                </li>
                <li>
                  <p>Real-time stock tracking and alerts for low inventory</p>
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
            <div className="mb-6 relative overflow-hidden rounded-3xl max-h-[500px]">
              <Image
                src="/images/product-details/product-details-20.png"
                alt="product-details"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 p-6 border-gray-300 border rounded-2xl text-center">
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-container-truck text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">Free Shipping</h5>
                <p>Enjoy the Convenience of Free Shipping on Every Order</p>
              </div>
              <div className="col-span-12 p-6 border-gray-300 border rounded-2xl text-center">
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-customer-support text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">24x7 Support</h5>
                <p>Round-the-Clock Assistance, Anytime You Need It</p>
              </div>
              <div className="col-span-12 p-6 border-gray-300 border rounded-2xl text-center">
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-delivery-return-02 text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">30 Days Return</h5>
                <p>
                  Your Satisfaction is Our Priority: Return Any Product Within
                  30 Days
                </p>
              </div>
              <div className="col-span-12 p-6 border-gray-300 border rounded-2xl text-center">
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-transaction text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">Secure Payment</h5>
                <p>
                  Seamless Shopping Backed by Safe and Secure Payment Options
                </p>
              </div>
            </div>
            <p>
              To begin, carefully unpack the product and ensure all necessary
              components are included. Place the product on a clean, flat
              surface before use. If the device requires power, insert the
              batteries or connect it to a power source as indicated in the
              manual. Press the power button to activate the product, and refer
              to the control panel or app interface to adjust the settings
              according to your preference. Use the product as recommended,
              following all safety guidelines provided. After use, turn off the
              device and disconnect it from the power source. Clean and store
              the product in a cool, dry place to maintain its condition for
              future use.
            </p>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div>
        <div
          onClick={() => toggleAccordion("info")}
          className={cn(
            "flex justify-between px-6 py-4 cursor-pointer bg-gray-200 items-center rounded-2xl",
            activeAccordion === "info" && "rounded-b-none",
          )}
        >
          <h5>Additional Info</h5>
          <motion.i
            animate={{ rotate: activeAccordion === "info" ? 0 : -90 }}
            transition={{ duration: 0.3 }}
            className="hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6"
          />
        </div>
        {activeAccordion === "info" && (
          <div className="border p-6 border-gray-300 rounded-b-2xl border-t-0">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-300">
                {INFO_ROWS.map((row, index) => (
                  <tr key={index}>
                    <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                      {row.label}
                    </th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div>
        <div
          onClick={() => toggleAccordion("reviews")}
          className={cn(
            "flex justify-between px-6 py-4 cursor-pointer bg-gray-200 items-center rounded-2xl",
            activeAccordion === "reviews" && "rounded-b-none",
          )}
        >
          <h5>Reviews</h5>
          <motion.i
            animate={{ rotate: activeAccordion === "reviews" ? 0 : -90 }}
            transition={{ duration: 0.3 }}
            className="hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6"
          />
        </div>
        {activeAccordion === "reviews" && (
          <div className="border border-gray-300 rounded-b-2xl border-t-0">
            {/* Rating Overview */}
            <div className="grid grid-cols-12 divide-y divide-gray-300 rating-overview">
              <div className="col-span-12 flex items-center justify-center py-6">
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
              <div className="col-span-12 p-6 flex items-center justify-center">
                <div className="list-rating space-y-6 w-full">
                  {STAR_BREAKDOWN.map((stat, idx) => (
                    <div className="flex gap-x-4 items-center" key={idx}>
                      <span className="font-semibold text-light-primary-text">
                        {stat.stars} Star
                      </span>
                      <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                        <div
                          style={{ width: stat.pct }}
                          className="progress-bar h-full bg-primary rounded-[50px]"
                        />
                      </div>
                      <span>{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 flex items-center justify-center py-6">
                <a
                  href="#quick-view-comment-form"
                  className="btn btn-primary outline btn-large rounded-[100px]"
                >
                  Write a Review
                </a>
              </div>
            </div>

            {/* Comment Form */}
            <div
              id="quick-view-comment-form"
              className="comment-form-wrapper p-6 border-t border-gray-300 border-b"
            >
              <div className="comment-respond @md/quick-view-product-details:border @md/quick-view-product-details:border-gray-300 @md/quick-view-product-details:rounded-3xl @md/quick-view-product-details:p-6">
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
                  className="quick-view-comment-form flex flex-col gap-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="input-group medium rounded-[20px] px-3.5 resize-none">
                    <textarea
                      id="quick-view-post-comment"
                      rows={4}
                      className="peer form-control placeholder-transparent focus:placeholder-transparent"
                      placeholder="Comment *"
                      defaultValue={""}
                    />
                    <label
                      htmlFor="quick-view-post-comment"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Comment *
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="quick-view-name"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="Name *"
                    />
                    <label
                      htmlFor="quick-view-name"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Name *
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="quick-view-email"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="Email *"
                    />
                    <label
                      htmlFor="quick-view-email"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Email *
                    </label>
                  </div>
                  <div className="flex md:justify-end justify-center gap-x-4">
                    <button
                      type="button"
                      className="btn btn-default outline btn-large rounded-[100px] py-[11px] shadow-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-large rounded-[100px] py-[11px]"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Comments List */}
            <div className="comment-list-wrapper p-6">
              <div className="comment-list-title flex items-center justify-between pb-6 border-b border-gray-300 mb-6">
                <h5>Customer Ratings &amp; Review</h5>
                <CustomFloatingSelect
                  options={SORT_OPTIONS}
                  label="Sorting"
                  defaultValue="newest"
                  onChange={(value) => console.log("Sorted reviews by:", value)}
                />
              </div>

              <ol className="comment-list">
                {REVIEWS_DATA.map((review) => (
                  <li className="comment" key={review.id}>
                    <div className="comment-body">
                      <div className="comment-avatar-card flex items-center gap-x-4 mb-3">
                        <div className="comment-author-avatar size-12 relative overflow-hidden rounded-full">
                          <Image
                            src={review.avatar}
                            alt="Comment Author Avatar"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div className="comment-author-info flex-1">
                          <p className="comment-author font-semibold text-light-primary-text">
                            {review.author}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="rating-section flex items-center relative after:absolute after:h-[22px] after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-300 pr-3">
                          <StarRating
                            ratingPercentage={`${(review.rating / 5) * 100}%`}
                          />
                          <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text">
                            {review.rating}
                          </span>
                        </div>
                        {review.verified && (
                          <div className="flex items-center gap-x-1 pl-3">
                            <VerifiedBadge />
                            <p className="text-primary text-sm leading-[22px]">
                              Verified purchase
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="comment-content pl-0! pr-0! mb-3">
                        <p className="text-light-primary-text">{review.text}</p>
                      </div>
                      <div className="comment-actions flex @md/quick-view-product-details:items-center @md/quick-view-product-details:flex-row flex-col @md/quick-view-product-details:gap-y-0 gap-y-3">
                        <p className="text-sm leading-[22px] text-light-primary-text @md/quick-view-product-details:pr-3">
                          was this review helpful to you?
                        </p>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] text-light-primary-text hover:text-primary transition-colors inline-flex items-center gap-x-1 @md/quick-view-product-details:pr-3 relative @md/quick-view-product-details:after:absolute @md/quick-view-product-details:after:h-5 @md/quick-view-product-details:after:w-px @md/quick-view-product-details:after:right-0 @md/quick-view-product-details:after:top-1/2 @md/quick-view-product-details:after:-translate-y-1/2 @md/quick-view-product-details:after:bg-gray-300"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-up text-lg leading-[18px]" />
                          Thank ({review.thumbsUp})
                        </a>
                        <a
                          href="#"
                          className="comment-action-item text-sm leading-[22px] text-light-primary-text hover:text-primary transition-colors inline-flex items-center gap-x-1 @md/quick-view-product-details:pl-3"
                        >
                          <i className="hgi hgi-stroke hgi-thumbs-down text-lg leading-[18px]" />
                          Dislike ({review.thumbsDown})
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Pagination */}
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
                  {[2, 3, 4, 5].map((page) => (
                    <li key={page} className="group comment-pagination-item">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 text-light-primary-text group-hover:text-primary group-hover:font-semibold bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                      >
                        {page}
                      </a>
                    </li>
                  ))}
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
        )}
      </div>
    </div>
  );
}
