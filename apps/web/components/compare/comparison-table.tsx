"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

const RECOMMENDED_SEARCH = [
  { id: 1, image: "/images/vitamin-c.png", name: "Immunity booster" },
  {
    id: 2,
    image: "/images/hand-sanitizer-1.png",
    name: "Hand Sanitizer 500ml",
  },
  { id: 3, image: "/images/combat.png", name: "Heart health supplements" },
  { id: 4, image: "/images/vitamin-b12.png", name: "Protein powder for women" },
];

const COMPARE_PRODUCTS = [
  {
    id: 1,
    image: "/images/compare/compare-2.png",
    name: "AE 24/7 Active Hoodie With Gaiter",
    quantity: "Pack Size : 60 ML, 120 ML, 220 ML, 250 ML",
    description:
      "Stay connected and in control with the SmartLife Pro X7. Track your fitness, monitor your health, and receive real-time notifications — all from your wrist.",
    category: "Clothing",
    colors: [
      "bg-info",
      "bg-info-darker",
      "bg-warning",
      "bg-error-light",
      "bg-error-dark",
    ],
    ratingWidth: "80%",
    reviews: "11.78k",
    brand: "Brand Name",
    availability: "03",
  },
  {
    id: 2,
    image: "/images/compare/compare-2.png",
    name: "AE 24/7 Active Hoodie With Gaiter",
    quantity: "Pack Size : 60 ML, 120 ML, 220 ML, 250 ML",
    description:
      "Stay connected and in control with the SmartLife Pro X7. Track your fitness, monitor your health, and receive real-time notifications — all from your wrist.",
    category: "Clothing",
    colors: [
      "bg-info",
      "bg-info-darker",
      "bg-warning",
      "bg-error-light",
      "bg-error-dark",
    ],
    ratingWidth: "80%",
    reviews: "11.78k",
    brand: "Brand Name",
    availability: "04",
  },
  {
    id: 3,
    image: "/images/compare/compare-3.png",
    name: "AE 24/7 Active Hoodie With Gaiter",
    quantity: "Pack Size : 60 ML, 120 ML, 220 ML, 250 ML",
    description:
      "Stay connected and in control with the SmartLife Pro X7. Track your fitness, monitor your health, and receive real-time notifications — all from your wrist.",
    category: "Clothing",
    colors: [
      "bg-info",
      "bg-info-darker",
      "bg-warning",
      "bg-error-light",
      "bg-error-dark",
    ],
    ratingWidth: "80%",
    reviews: "11.78k",
    brand: "Brand Name",
    availability: "05",
  },
  {
    id: 4,
    image: "/images/compare/compare-4.png",
    name: "AE 24/7 Active Hoodie With Gaiter",
    quantity: "Pack Size : 60 ML, 120 ML, 220 ML, 250 ML",
    description:
      "Stay connected and in control with the SmartLife Pro X7. Track your fitness, monitor your health, and receive real-time notifications — all from your wrist.",
    category: "Clothing",
    colors: [
      "bg-info",
      "bg-info-darker",
      "bg-warning",
      "bg-error-light",
      "bg-error-dark",
    ],
    ratingWidth: "80%",
    reviews: "11.78k",
    brand: "Brand Name",
    availability: "02",
  },
];

export default function ComparisonTable() {
  const [selectedColors, setSelectedColors] = useState<{
    [key: number]: string;
  }>({
    1: "bg-info",
    2: "bg-info",
    3: "bg-info",
    4: "bg-info",
  });

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });

  const handleColorClick = (productId: number, colorClass: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorClass,
    }));
  };

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + delta),
    }));
  };

  return (
    <div className="pb-[70px]">
      <div className="container">
        <div className="mb-6">
          <h3>Compare</h3>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
              <table className="w-full compare-table">
                <tbody>
                  {/* product row */}
                  <tr className="product">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Product
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td key={product.id} className="px-4 py-[18px]">
                        <div className="flex flex-col gap-y-4">
                          <div className="relative w-full search-input-container">
                            <div className="input-group medium pl-4 py-2 pr-2.5 rounded-[100px] flex-1 relative w-full">
                              <div
                                className="input-group-addon inline-flex items-center justify-center leading-6"
                                data-align="inline-start"
                              >
                                <span className="inline-flex items-center justify-center">
                                  <i className="hgi hgi-stroke hgi-search-01 text-2xl leading-6 text-light-primary-text" />
                                </span>
                              </div>
                              <input
                                id={`compare-search-${product.id}`}
                                type="text"
                                className="peer form-control placeholder-transparent focus:placeholder-transparent focus:outline-none header-search-input"
                                placeholder="Search"
                              />
                              <label
                                htmlFor={`compare-search-${product.id}`}
                                className="absolute left-[48px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:left-[14px] peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                              >
                                Search
                              </label>
                            </div>
                            <div
                              data-state="close"
                              className="search-result-container p-4 absolute w-full top-[calc(100%+10px)] left-0 border border-gray-300 shadow-light-z-12 bg-white rounded-lg z-9 transform data-[state=close]:translate-y-4 data-[state=close]:opacity-0 data-[state=close]:invisible transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=open]:visible"
                            >
                              <div className="recommended-search-list-wrapper">
                                <div className="recommended-search-list flex flex-col gap-y-2 divide-y divide-gray-300">
                                  {RECOMMENDED_SEARCH.map((searchItem) => (
                                    <div
                                      key={searchItem.id}
                                      className="flex items-center gap-x-4 py-2 first:pt-0 last:pb-0"
                                    >
                                      <div className="size-10 flex-none rounded-lg bg-[#F4F3F5] overflow-hidden">
                                        <Image
                                          src={searchItem.image}
                                          alt={`recommended-search-${searchItem.id}`}
                                          width={40}
                                          height={40}
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                      <p className="text-base font-semibold text-light-primary-text hover:text-primary transition-colors duration-300">
                                        <Link href="#">{searchItem.name}</Link>
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="w-[338px] h-[338px] relative bg-gray-200 product-thumbnail overflow-hidden rounded-2xl"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={338}
                              height={338}
                              className="rounded-2xl w-full h-full object-cover"
                            />
                            <div className="absolute xl:top-[22px] xl:right-[23px] top-3 right-2">
                              <button className="btn w-9 h-9 btn-default rounded-[50px]">
                                <i className="hgi hgi-stroke hgi-cancel-01 text-[20px] leading-5 text-light-primary-text" />
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Product Name row */}
                  <tr className="bg-gray-100 product-name">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Name
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-6 product-name-title"
                      >
                        <p className="font-semibold text-light-primary-text">
                          {product.name}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Quantity row */}
                  <tr className="product-quantity">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Quantity
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-6 product-quantity-details"
                      >
                        <p className="font-semibold text-light-primary-text">
                          {product.quantity}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Description row */}
                  <tr className="product-description">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Description
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td key={product.id} className="p-4">
                        <p>{product.description}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Category row*/}
                  <tr className="product-category">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Category
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-6 product-category-name"
                      >
                        <p className="font-semibold text-light-primary-text">
                          {product.category}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Color row */}
                  <tr className="product-color">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Color
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="widget-color-picker">
                          <ul className="flex items-center flex-wrap gap-5">
                            {product.colors.map((colorClass, i) => (
                              <li
                                key={i}
                                className="inline-flex items-center justify-center"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleColorClick(product.id, colorClass)
                                  }
                                  className={`w-5 h-5 inline-flex items-center justify-center ${colorClass} rounded-full transition-all duration-300 ${
                                    selectedColors[product.id] === colorClass
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  {selectedColors[product.id] ===
                                    colorClass && (
                                    <i className="hgi hgi-stroke hgi-tick-01 text-[12px] text-white" />
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Product Rating Row */}
                  <tr className="bg-gray-100 product-rating">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Rating
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td key={product.id} className="px-4 py-6">
                        <div className="rating-section flex items-center">
                          <StarRating ratingPercentage={product.ratingWidth} />
                          <span className="text-base leading-6 font-normal inline-block ml-1">
                            ({product.reviews}reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Product Brand Row */}
                  <tr className="product-brand">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Brand
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-6 product-brand-name"
                      >
                        <p className="font-semibold text-light-primary-text">
                          {product.brand}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Stock Row */}
                  <tr className="bg-gray-100 product-stock">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Availability
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-6 product-stock-quantity"
                      >
                        <p className="font-semibold text-light-primary-text">
                          {product.availability}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Product Add To Cart Row */}
                  <tr className="product-add-to-cart">
                    <td className="w-[150px] px-2 md:px-0 text-center">
                      <p className="font-semibold text-light-primary-text">
                        Add To Cart
                      </p>
                    </td>
                    {COMPARE_PRODUCTS.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="flex items-start justify-between flex-col md:flex-row gap-y-3">
                          <div className="border border-gray-300 inline-flex items-center justify-center rounded-[80px] max-w-[108px] py-[7px] px-4">
                            <button
                              className="inline-flex items-center justify-center hover:text-primary"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >
                              <i className="hgi hgi-stroke hgi-remove-circle text-2xl leading-6" />
                            </button>
                            <input
                              type="text"
                              readOnly
                              value={quantities[product.id]}
                              className="border-0 w-full grow text-center focus:outline-none font-semibold text-light-primary-text"
                            />
                            <button
                              className="inline-flex items-center justify-center hover:text-primary"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              <i className="hgi hgi-stroke hgi-add-circle text-2xl leading-6" />
                            </button>
                          </div>
                          <Link
                            href="/cart"
                            className="btn btn-primary px-8 py-[9px] rounded-[80px] text-sm leading-[22px] product-add-to-cart"
                          >
                            <span className="inline-flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-shopping-cart-02 text-[20px] leading-5 text-white" />
                            </span>
                            Add
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
