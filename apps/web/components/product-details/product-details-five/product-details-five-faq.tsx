"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import StarRating from "@/components/common/star-rating";
import CustomFloatingSelect from "@/components/common/custom-floating-select";
import Image from "next/image";

/* ── Data arrays ── */
type TabId = "description" | "additional-info" | "reviews";

const FEATURE_BULLETS = [
  "Real-time shipping rates, tracking, and delivery management",
  "Real-time stock tracking and alerts for low inventory",
  "Support for multiple payment options like credit cards, PayPal, Stripe,",
  "Seamless experience across smartphones, tablets, and desktops",
  "Track sales, traffic, conversion rates, and customer behavior",
  "Allow customers to track orders, reorder, and manage profiles",
];

const FEATURE_CARDS = [
  {
    icon: "hgi-container-truck",
    title: "Free Shipping",
    desc: "Enjoy the Convenience of Free Shipping on Every Order",
  },
  {
    icon: "hgi-customer-support",
    title: "24x7 Support",
    desc: "Round-the-Clock Assistance, Anytime You Need It",
  },
  {
    icon: "hgi-delivery-return-02",
    title: "30 Days Return",
    desc: "Your Satisfaction is Our Priority: Return Any Product Within 30 Days",
  },
  {
    icon: "hgi-transaction",
    title: "Secure Payment",
    desc: "Seamless Shopping Backed by Safe and Secure Payment Options",
  },
];

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
  { label: "5 Star", width: "70%", count: "35.74k" },
  { label: "4 Star", width: "70%", count: "79.41k" },
  { label: "3 Star", width: "70%", count: "60.69k" },
  { label: "2 Star", width: "70%", count: "42.12k" },
  { label: "1 Star", width: "70%", count: "12.58k" },
];

const REVIEWS = [
  {
    name: "Robert Fox",
    rating: 80,
    score: "4.5",
    thanks: 234,
    dislike: 12,
    comment:
      "Very nice! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
  },
  {
    name: "Jenny Wilson",
    rating: 80,
    score: "4.5",
    thanks: 234,
    dislike: 12,
    comment:
      "Very nice! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
  },
  {
    name: "Brooklyn Simmons",
    rating: 80,
    score: "4.5",
    thanks: 234,
    dislike: 12,
    comment:
      "Very nice! On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the",
  },
];

const SORT_OPTIONS = [
  { value: "Newest", label: "Newest" },
  { value: "Oldest", label: "Oldest" },
  { value: "Popular", label: "Popular" },
  { value: "Rating", label: "Rating" },
  { value: "Relevance", label: "Relevance" },
  { value: "Comment Count", label: "Comment Count" },
];

/* ── Shared animation variants ── */
const panelVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};


/* ── Verified badge SVG ── */
function VerifiedBadge() {
  return (
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
      <p className="text-primary text-sm leading-[22px]">Verified purchase</p>
    </div>
  );
}

export default function ProductDetailsFiveFaq() {
  const [activeTab, setActiveTab] = useState<TabId | null>("description");
  const [sortBy, setSortBy] = useState("Newest");

  const toggle = (tab: TabId) =>
    setActiveTab((prev) => (prev === tab ? null : tab));

  const isOpen = (tab: TabId) => activeTab === tab;

  return (
    <section className="pb-12">
      <div className="container">
        <div className="accordion" id="product-details-accordion">
          {/* ── Tab: Description ── */}
          <div className="accordion-item">
            <div
              className={`accordion-header cursor-pointer ${isOpen("description") ? "active" : ""}`}
              onClick={() => toggle("description")}
            >
              <h5>Description</h5>
              <i
                className={`hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6 transition-transform duration-300 ${isOpen("description") ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence initial={false}>
              {isOpen("description") && (
                <motion.div
                  key="description"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ overflow: "hidden" }}
                >
                  <div className="border border-gray-300 p-6 rounded-bl-2xl rounded-br-2xl border-t-0">
                    <p className="mb-6">
                      To begin, carefully unpack the product and ensure all
                      necessary components are included. Place the product on a
                      clean, flat surface before use. If the device requires
                      power, insert the batteries or connect it to a power
                      source as indicated in the manual. Press the power button
                      to activate the product, and refer to the control panel or
                      app interface to adjust the settings according to your
                      preference.
                    </p>
                    <p className="mb-6">
                      Use the product as recommended, following all safety
                      guidelines provided. After use, turn off the device and
                      disconnect it from the power source. Clean and store the
                      product in a cool, dry place to maintain its condition for
                      future use.
                    </p>

                    {/* Two-column bullets */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 gap-y-6 lg:gap-y-0 mb-6">
                      {[0, 1].map((col) => (
                        <div
                          key={col}
                          className={`lg:col-span-6 ${col === 1 ? "mt-6 lg:mt-0" : ""}`}
                        >
                          <ul className="custom-list-style">
                            {FEATURE_BULLETS.slice(0, 3).map((item) => (
                              <li key={item}>
                                <p>{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Image + list block 1 */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 items-center mb-6">
                      <div className="lg:col-span-5 mt-6 lg:mt-0">
                        <Image
                          src="/images/product-details/electronics-5.png"
                          alt="product-details"
                          width={600}
                          height={450}
                          className="w-full h-auto object-cover rounded-3xl max-h-[500px]"
                        />
                      </div>
                      <div className="lg:col-span-7">
                        <h4 className="mb-6">🛒 eCommerce Platform Features</h4>
                        <p className="mb-6">
                          Launch, manage, and grow your online store with our
                          all-in-one eCommerce solution. Whether you&apos;re a
                          small business or a growing brand, our platform is
                          designed to simplify the selling process and enhance
                          your customers&apos; shopping experience.
                        </p>
                        <ul className="custom-list-style">
                          {FEATURE_BULLETS.map((item) => (
                            <li key={item}>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image + list block 2 (reversed) */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-18 items-center mb-6">
                      <div className="lg:col-span-7">
                        <h4 className="mb-6">Easy to Customization</h4>
                        <p className="mb-6">
                          Launch, manage, and grow your online store with our
                          all-in-one eCommerce solution. Whether you&apos;re a
                          small business or a growing brand, our platform is
                          designed to simplify the selling process and enhance
                          your customers&apos; shopping experience.
                        </p>
                        <ul className="custom-list-style">
                          {FEATURE_BULLETS.map((item) => (
                            <li key={item}>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="lg:col-span-5 mt-6 lg:mt-0">
                        <Image
                          src="/images/product-details/electronics-2.png"
                          alt="product-details"
                          width={600}
                          height={450}
                          className="w-full h-auto object-cover rounded-3xl max-h-[500px]"
                        />
                      </div>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-12 gap-6 mb-6">
                      {FEATURE_CARDS.map((card) => (
                        <div
                          key={card.title}
                          className="md:col-span-6 col-span-12 xl:col-span-3 p-6 border-gray-300 border rounded-2xl text-center"
                        >
                          <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                            <i
                              className={`hgi hgi-stroke ${card.icon} text-3xl text-light-primary-text`}
                            />
                          </span>
                          <h5 className="pt-3 pb-0.5">{card.title}</h5>
                          <p>{card.desc}</p>
                        </div>
                      ))}
                    </div>

                    <p>
                      To begin, carefully unpack the product and ensure all
                      necessary components are included. Place the product on a
                      clean, flat surface before use. Clean and store the
                      product in a cool, dry place to maintain its condition for
                      future use.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tab: Additional Info ── */}
          <div className="accordion-item">
            <div
              className={`accordion-header cursor-pointer ${isOpen("additional-info") ? "active" : ""}`}
              onClick={() => toggle("additional-info")}
            >
              <h5>Additional Info</h5>
              <i
                className={`hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6 transition-transform duration-300 ${isOpen("additional-info") ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence initial={false}>
              {isOpen("additional-info") && (
                <motion.div
                  key="additional-info"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ overflow: "hidden" }}
                >
                  <div className="border border-gray-300 p-6 rounded-bl-2xl rounded-br-2xl border-t-0">
                    <table className="w-full border-collapse">
                      <tbody className="divide-y divide-gray-300">
                        {INFO_ROWS.map((row) => (
                          <tr key={row.label}>
                            <th className="font-semibold w-[180px] text-left py-3 text-light-primary-text">
                              {row.label}
                            </th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tab: Reviews ── */}
          <div className="accordion-item">
            <div
              className={`accordion-header cursor-pointer ${isOpen("reviews") ? "active" : ""}`}
              onClick={() => toggle("reviews")}
            >
              <h5>Reviews</h5>
              <i
                className={`hgi hgi-stroke hgi-arrow-down-01 text-2xl leading-6 transition-transform duration-300 ${isOpen("reviews") ? "rotate-180" : ""}`}
              />
            </div>

            <AnimatePresence initial={false}>
              {isOpen("reviews") && (
                <motion.div
                  key="reviews"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ overflow: "hidden" }}
                >
                  <div className="border border-gray-300 rounded-bl-2xl rounded-br-2xl border-t-0 overflow-hidden">
                    {/* Rating overview */}
                    <div className="grid grid-cols-12 md:divide-x divide-y md:divide-y-0 divide-gray-300 rating-overview">
                      <div className="md:col-span-4 col-span-12 flex items-center justify-center py-6 md:py-0">
                        <div className="rating-heading space-y-2 text-center">
                          <p className="font-semibold text-light-primary-text">
                            Average Rating
                          </p>
                          <h2 className="text-error">4/5</h2>
                          <div className="rating-section flex items-center justify-center">
                            <StarRating ratingPercentage="80%" />
                          </div>
                          <p>(8.24k reviews)</p>
                        </div>
                      </div>
                      <div className="md:col-span-4 col-span-12 p-6 flex items-center justify-center">
                        <div className="list-rating space-y-6 w-full">
                          {STAR_BREAKDOWN.map((star) => (
                            <div
                              key={star.label}
                              className="flex gap-x-4 items-center"
                            >
                              <span className="font-semibold text-light-primary-text">
                                {star.label}
                              </span>
                              <div className="progress w-full flex-1 h-1.5 bg-[rgba(145,158,171,0.24)] rounded-[50px] overflow-hidden">
                                <div
                                  style={{ width: star.width }}
                                  className="progress-bar h-full bg-primary rounded-[50px]"
                                />
                              </div>
                              <span>{star.count}</span>
                            </div>
                          ))}
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

                    {/* Comment form */}
                    <div
                      id="comment-forms"
                      className="comment-forms-wrapper p-6 border-t border-gray-300 border-b"
                    >
                      <div className="comment-respond md:border md:border-gray-300 md:rounded-3xl md:p-6">
                        <h5 className="mb-6">Add Comment</h5>
                        <div className="flex items-center gap-x-3 mb-6">
                          <p className="text-light-primary-text font-medium">
                            Your review about this product:
                          </p>
                          <div className="rating-section flex items-center justify-center">
                            <StarRating ratingPercentage="0%" />
                          </div>
                        </div>
                        <form
                          className="comment-form flex flex-col gap-y-6"
                          action="#"
                        >
                          <div className="input-group medium rounded-[20px] px-3.5 resize-none">
                            <textarea
                              id="post_comment"
                              rows={4}
                              className="peer form-control placeholder-transparent focus:placeholder-transparent"
                              placeholder="Comment *"
                              defaultValue=""
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
                            <button
                              type="button"
                              className="btn btn-default outline btn-large rounded-[100px] w-[47%] md:w-auto py-[11px] shadow-none"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary btn-large rounded-[100px] w-[47%] md:w-auto py-[11px]"
                            >
                              Post Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Review list */}
                    <div className="comment-list-wrapper p-6">
                      <div className="comment-list-title flex items-center justify-between pb-6 border-b border-gray-300 mb-6">
                        <h5>Customer Ratings &amp; Review</h5>
                        <CustomFloatingSelect
                          options={SORT_OPTIONS}
                          label="Sorting"
                          defaultValue="Newest"
                          onChange={(value) => setSortBy(value)}
                        />
                      </div>

                      <ol className="comment-list">
                        {REVIEWS.map((review) => (
                          <li key={review.name} className="comment">
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
                                    {review.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center mb-3">
                                <div className="rating-section flex items-center relative after:absolute after:h-[22px] after:w-px after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-gray-300 pr-3">
                                  <StarRating ratingPercentage={`${review.rating}%`} />
                                  <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text">
                                    {review.score}
                                  </span>
                                </div>
                                <VerifiedBadge />
                              </div>
                              <div className="comment-content pl-0! pr-0! mb-3">
                                <p className="text-light-primary-text">
                                  {review.comment}
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
                                  Thank ({review.thanks})
                                </a>
                                <a
                                  href="#"
                                  className="comment-action-item text-sm leading-[22px] inline-flex items-center gap-x-1 md:pl-3"
                                >
                                  <i className="hgi hgi-stroke hgi-thumbs-down text-lg leading-[18px] text-light-primary-text" />
                                  Dislike ({review.dislike})
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
                              <i className="hgi hgi-stroke hgi-arrow-left-01 text-[20px] leading-5 text-light-primary-text group-hover:text-primary" />
                            </a>
                          </li>
                          {[1, 2, 3, 4, 5].map((page) => (
                            <li
                              key={page}
                              className="group comment-pagination-item"
                            >
                              <a
                                href="#"
                                className={`inline-flex items-center justify-center md:size-10 size-9 rounded-[50px] text-base leading-6 transition-colors duration-300 ease-in-out ${page === 1 ? "active" : "text-light-primary-text bg-white cursor-pointer border border-gray-300 group-hover:text-primary group-hover:font-semibold group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)]"}`}
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
                              <i className="hgi hgi-stroke hgi-more-horizontal text-[20px] leading-5 text-light-primary-text" />
                            </a>
                          </li>
                          <li className="group comment-pagination-item">
                            <a
                              href="#"
                              className="inline-flex items-center justify-center w-10 h-10 rounded-[50px] bg-white cursor-pointer border border-gray-300 group-hover:border-primary group-hover:bg-[rgba(0,171,85,0.08)] transition-colors duration-300 ease-in-out"
                            >
                              <i className="hgi hgi-stroke hgi-arrow-right-01 text-[20px] leading-5 text-light-primary-text group-hover:text-primary" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
