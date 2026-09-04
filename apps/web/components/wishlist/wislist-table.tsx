"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

const WISHLIST_ITEMS = [
  {
    id: 1,
    image: "/images/ground-nuts-oil.png",
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    ratingWidth: "80%",
    reviews: 118,
    stockStatus: "2 in stock",
    currentPrice: "$27.49",
    oldPrice: "$29.95",
    quantity: 1,
  },
  {
    id: 2,
    image: "/images/bp-machine.png",
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    ratingWidth: "80%",
    reviews: 118,
    stockStatus: "2 in stock",
    currentPrice: "$27.49",
    oldPrice: "$29.95",
    quantity: 1,
  },
  {
    id: 3,
    image: "/images/vitamin-c-2.png",
    name: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    ratingWidth: "80%",
    reviews: 118,
    stockStatus: "2 in stock",
    currentPrice: "$27.49",
    oldPrice: "$29.95",
    quantity: 1,
  },
];

export default function WishlistTable() {
  return (
    <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
      <table className="w-full wishlist-table">
        <thead className="bg-gray-200">
          <tr>
            <th className="pl-4 py-2.5 product-checkbox">
              <div className="has-[input:checked]:hover:bg-primary/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                <label className="relative inline-flex w-5 h-5 cursor-pointer items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all"
                  />
                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                  </span>
                </label>
              </div>
            </th>
            <th className="text-left font-semibold product">
              <p className="product-name">Product</p>
            </th>
            <th className="text-left py-2.5 font-semibold product-stock">
              Stock Status
            </th>
            <th className="text-left lg:text-center xl:text-left py-2.5 font-semibold product-price">
              Price
            </th>
            <th className="text-left lg:text-center xl:text-left py-2.5 font-semibold product-quantity">
              Quantity
            </th>
            <th className="text-left lg:text-center xl:text-left py-2.5 font-semibold product-actions">
              Buy Action
            </th>
            <th className="text-left py-2.5 font-semibold pr-4 product-remove">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {WISHLIST_ITEMS.map((item) => (
            <WishlistRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WishlistRow({ item }: { item: (typeof WISHLIST_ITEMS)[0] }) {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <tr className="py-4 border-b border-gray-300 last:border-b-0">
      <td className="py-4 pl-4 hidden lg:table-cell product-checkbox">
        <div className="has-[input:checked]:hover:bg-primary/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
          <label className="relative inline-flex w-5 h-5 cursor-pointer items-center justify-center">
            <input
              type="checkbox"
              className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all"
            />
            <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
              <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
            </span>
          </label>
        </div>
      </td>
      <td data-title="Product" className="py-4 px-3 lg:px-0 product">
        <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row items-end md:items-start text-left">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="product-thumbnail max-w-[100px] h-[100px] rounded-2xl bg-gray-300 flex items-center justify-center overflow-hidden shrink-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-2xl object-contain w-full h-full"
            />
          </motion.div>
          <div className="flex flex-col gap-y-3 items-end md:items-start">
            <Link
              href="/product-details"
              className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </Link>
            <p className="text-sm leading-[22px] font-medium text-primary product-category">
              {item.category}
            </p>
            <div className="rating-section flex items-center">
              <StarRating ratingPercentage={item.ratingWidth} />
              <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                ({item.reviews})
              </span>
            </div>
          </div>
        </div>
      </td>
      <td
        data-title="Stock"
        className="capitalize py-4 px-3 lg:px-0 product-stock"
      >
        <span className="text-light-primary-text font-semibold">
          {item.stockStatus}
        </span>
      </td>
      <td
        data-title="Price"
        className="capitalize py-4 px-3 lg:px-0 product-price"
      >
        <div className="flex items-center flex-row lg:flex-col xl:flex-row gap-x-3 justify-end lg:justify-start">
          <span className="text-light-primary-text font-semibold product-offer-price">
            {item.currentPrice}
          </span>
          <span className="line-through text-light-disabled-text font-normal">
            {item.oldPrice}
          </span>
        </div>
      </td>
      <td
        data-title="Quantity"
        className="text-left lg:text-center xl:text-left capitalize py-4 px-3 lg:px-0 product-quantity"
      >
        <div className="border border-gray-300 inline-flex items-center justify-center rounded-[80px] max-w-[108px] py-2.5 px-4 ml-auto lg:ml-0 lg:mx-auto xl:ml-0">
          <button
            className="inline-flex items-center justify-center hover:text-primary"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <i className="hgi hgi-stroke hgi-remove-circle text-xl leading-6" />
          </button>
          <input
            type="text"
            readOnly
            value={quantity}
            className="border-0 w-full grow text-center focus:outline-none font-semibold text-light-primary-text bg-transparent"
          />
          <button
            className="inline-flex items-center justify-center hover:text-primary"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <i className="hgi hgi-stroke hgi-add-circle text-xl leading-6" />
          </button>
        </div>
      </td>
      <td
        data-title="Buy Action"
        className="capitalize py-4 px-3 lg:px-0 product-actions"
      >
        <div className="flex items-center flex-row lg:flex-col xl:flex-row gap-x-2 md:gap-4 justify-end lg:justify-center">
          <button className="btn btn-warning px-4 md:px-[22px] rounded-[80px] font-semibold py-[11px] md:text-base md:leading-[26px] text-[13px] leading-[22px] product-buy-now">
            Buy Now
          </button>
          <Link
            href="/cart-single-vendor"
            className="btn btn-primary font-semibold md:px-6 px-2.5 py-[11px] rounded-[80px] md:text-base md:leading-[26px] text-[13px] leading-[22px] product-add-to-cart"
          >
            <span className="inline-flex items-center justify-center">
              <i className="hgi hgi-stroke hgi-shopping-cart-02 md:text-2xl text-xl md:leading-6 leading-5" />
            </span>
            Add to Cart
          </Link>
        </div>
      </td>
      <td
        data-title="Remove"
        className="capitalize text-right lg:text-center py-4 px-3 lg:px-0 pr-4 product-remove"
      >
        <button>
          <span className="inline-flex items-center justify-center">
            <i className="hgi hgi-stroke hgi-delete-01 text-2xl leading-6" />
          </span>
        </button>
      </td>
    </tr>
  );
}
