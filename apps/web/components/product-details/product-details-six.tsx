"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductDetailsSixAccordion from "./product-details-six/product-details-six-accordion";
import ProductSixColors from "./product-details-six/product-six-colors";
import ProductSixSize from "./product-details-six/product-six-size";
import ProductSixQuantity from "./product-details-six/product-six-quantity";
import SizeChartDialog from "./product-details-six/size-chart-dialog";

const COLORS_OUT_OF_STOCK: Record<string, boolean> = {
  green: true,
  blue: false,
  yellow: false,
  red: false,
};

const SIZES_OUT_OF_STOCK: Record<string, boolean> = {
  S: false,
  M: false,
  L: false,
  XL: true,
  XXL: false,
  XXXL: false,
};

export default function ProductDetailsSix() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const isOutOfStock =
    !selectedColor ||
    COLORS_OUT_OF_STOCK[selectedColor] ||
    !selectedSize ||
    SIZES_OUT_OF_STOCK[selectedSize];

  return (
    <section className="pb-12">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="xl:col-span-7 lg:col-span-6">
            <div className="mb-10 space-y-6">
              <Image
                width={800}
                height={1000}
                className="max-h-[800px] w-full rounded-3xl object-cover"
                src="/images/product-details/product-details-18.png"
                alt="product-details-image"
              />
              <Image
                width={800}
                height={1000}
                className="max-h-[800px] w-full rounded-3xl object-cover"
                src="/images/product-details/product-details-16.png"
                alt="product-details-image"
              />
              <Image
                width={800}
                height={1000}
                className="max-h-[800px] w-full rounded-3xl object-cover"
                src="/images/product-details/product-details-17.png"
                alt="product-details-image"
              />
            </div>
            <ProductDetailsSixAccordion />
          </div>

          {/* Right Column */}
          <div className="xl:col-span-5 lg:col-span-6 mt-6 lg:mt-0">
            <div className="rounded-3xl border border-gray-300 p-6 sticky top-20">
              <span className="product-discount-badge inline-block mb-6 uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url('/images/discount-shape.png')] after:bg-contain after:bg-no-repeat">
                Sales
              </span>
              <div className="product-title-section mb-6">
                <h3 className="line-clamp-1">
                  VitaLife Omega-3 Softgels Heart
                </h3>
              </div>
              <div className="price-section flex items-center gap-x-3 mb-6">
                <span className="current-price text-2xl leading-9 font-bold text-light-primary-text relative after:absolute after:h-6 after:w-px after:bg-gray-300 after:right-0 after:top-1/2 after:-translate-y-1/2 pr-3 inline-block">
                  $62.97
                </span>
                <span className="old-price text-2xl leading-9 font-normal text-light-disabled-text">
                  $39.99
                </span>
                <span className="product-discount-badge uppercase relative bg-error text-warning-lighter font-medium text-sm leading-[22px] px-1 after:absolute after:top-0 after:left-full after:z-10 after:w-1 after:h-full after:bg-[url('/images/discount-shape.png')] after:bg-contain after:bg-no-repeat">
                  15% OFF
                </span>
              </div>
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
              <div className="product-add-to-cart-section py-6 border-b border-dashed border-gray-300 border-t">
                <ProductSixColors
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <ProductSixSize
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  onOpenSizeChart={() => setIsSizeChartOpen(true)}
                />
                <ProductSixQuantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                  isOutOfStock={isOutOfStock}
                />
              </div>

              <div className="product-share-and-compare-section flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:items-center md:gap-x-4 mt-6">
                <Link
                  href="/wishlist-style-v1"
                  className="product-wishlist-btn text-info inline-flex items-center gap-x-2.5 md:pr-4 md:relative md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:after:w-px md:after:h-3 md:after:bg-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-favourite text-xl leading-5" />
                  <span className="hover:underline">Add to Wishlist</span>
                </Link>
                <a
                  href="#"
                  className="product-share-btn text-info inline-flex items-center gap-x-2.5 md:pr-4 md:relative md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-0 md:after:w-px md:after:h-3 md:after:bg-gray-300"
                >
                  <i className="hgi hgi-stroke hgi-share-05 text-xl leading-5" />
                  <span className="hover:underline">Share</span>
                </a>
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
                    width={200}
                    height={24}
                    src="/images/product-details/payment-methods.png"
                    alt="payment-methods"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSizeChartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-100"
            onClick={() => setIsSizeChartOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-101 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-[950px] mx-4">
              <SizeChartDialog onClose={() => setIsSizeChartOpen(false)} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
