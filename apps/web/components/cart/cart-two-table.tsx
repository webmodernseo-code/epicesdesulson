"use client";

import React, { useState } from "react";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";

const CART_VENDORS = [
  {
    vendorName: "Brand Name",
    vendorUrl: "/vendor-account",
    products: [
      {
        id: 1,
        name: "GreenLeaf Organic Spinach",
        url: "/product-details",
        image: "/images/bp-machine.png",
        attributes: "Color: Black, Size:250 ML",
        available: 2,
        ratingPercentage: 80,
        ratingCount: 118,
        price: "$27.49",
        oldPrice: "$29.95",
        quantity: 1,
        totalPrice: "$27.49",
      },
      {
        id: 2,
        name: "GreenLeaf Organic Spinach",
        url: "/product-details",
        image: "/images/ground-nuts-oil.png",
        attributes: "Color: Black, Size:250 ML",
        available: 2,
        ratingPercentage: 80,
        ratingCount: 118,
        price: "$27.49",
        oldPrice: "$29.95",
        quantity: 1,
        totalPrice: "$27.49",
      },
    ],
  },
  {
    vendorName: "Brand Name",
    vendorUrl: "/vendor-account",
    products: [
      {
        id: 3,
        name: "GreenLeaf Organic Spinach",
        url: "/product-details",
        image: "/images/temperature-gun-2.png",
        attributes: "Color: Black, Size:250 ML",
        available: 2,
        ratingPercentage: 80,
        ratingCount: 118,
        price: "$27.49",
        oldPrice: "$29.95",
        quantity: 1,
        totalPrice: "$27.49",
      },
    ],
  },
];

export default function CartTwoTable() {
  return (
    <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
      <table className="w-full wishlist-table">
        <thead className="bg-gray-200">
          <tr>
            <th className="product text-left font-semibold pl-4">
              <p className="product-name">Product</p>
            </th>
            <th className="product-price text-left py-2.5 font-semibold">
              Price
            </th>
            <th className="product-quantity text-left py-2.5 font-semibold">
              Quantity
            </th>
            <th className="product-total-price text-left py-2.5 font-semibold">
              Total Price
            </th>
            <th className="product-actions text-center py-2.5 font-semibold pr-4">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {CART_VENDORS.map((vendor, vendorIndex) => (
            <React.Fragment key={vendorIndex}>
              {/* Vendor Row */}
              <tr className="border-b border-gray-300">
                <td
                  data-title={vendor.vendorName}
                  className="py-3 px-3 lg:px-4"
                  colSpan={5}
                >
                  <div className="flex items-center gap-x-4 flex-col md:flex-row gap-y-4">
                    <div className="hidden has-[input:checked]:hover:bg-primary/8 lg:flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[rgba(145,158,171,0.08)] transition-colors duration-300 ease-in-out">
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
                    <a
                      href={vendor.vendorUrl}
                      className="inline-flex items-center justify-center gap-x-2 text-light-primary-text font-semibold group hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                      <span className="inline-flex items-center justify-center">
                        <i className="hgi hgi-stroke hgi-store-01 leading-6 text-2xl group-hover:text-primary" />
                      </span>
                      {vendor.vendorName}
                      <span className="inline-flex items-center justify-center">
                        <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px] leading-[22px] group-hover:text-primary" />
                      </span>
                    </a>
                  </div>
                </td>
              </tr>
              {/* Product Rows */}
              {vendor.products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow({
  product,
}: {
  product: (typeof CART_VENDORS)[0]["products"][0];
}) {
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <tr className="py-4 border-b border-gray-300 last:border-b-0">
      <td data-title="Product " className="py-4 px-3 lg:px-4 product">
        <div className="flex items-end md:items-start gap-x-4 flex-col md:flex-row gap-y-4">
          <div className="hidden has-[input:checked]:hover:bg-primary/8 lg:flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[rgba(145,158,171,0.08)] transition-colors duration-300 ease-in-out">
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
          <div className="product-thumbnail max-w-[120px] h-[120px] rounded-2xl bg-[#F4F3F5] flex-none">
            <Image
              src={product.image}
              alt={product.name}
              width={120}
              height={120}
              className="rounded-2xl h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-2 items-end md:items-start text-left">
            <a
              href={product.url}
              className="product-name text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300"
            >
              {product.name}
            </a>
            <p className="text-sm leading-[22px] font-normal text-light-secondary-text inline-flex items-center gap-x-2.5">
              {product.attributes}
              <a href="#" className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-edit-02 text-base leading-4" />
              </a>
            </p>
            <p className="text-sm leading-[22px] font-normal text-light-secondary-text inline-flex items-center gap-x-2.5">
              Available: {product.available}
            </p>
            <div className="rating-section flex items-center">
              <StarRating ratingPercentage={`${product.ratingPercentage}%`} />
              <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                ({product.ratingCount})
              </span>
            </div>
          </div>
        </div>
      </td>
      <td
        data-title="Price "
        className="capitalize py-4 px-3 lg:px-0 product-price"
      >
        <div className="flex items-center gap-x-3 justify-end lg:justify-start">
          <span className="text-light-primary-text font-semibold">
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="line-through text-light-disabled-text font-normal">
              {product.oldPrice}
            </span>
          )}
        </div>
      </td>
      <td
        data-title="Quantity "
        className="capitalize py-4 px-3 lg:px-0 product-quantity"
      >
        <div className="border border-gray-300 inline-flex items-center justify-center rounded-[80px] max-w-[108px] py-2.5 px-4 ml-auto lg:ml-0">
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
        data-title="Total Price "
        className="capitalize py-4 px-3 lg:px-0 product-total-price"
      >
        <p className="font-semibold text-light-primary-text text-right lg:text-left">
          {product.totalPrice}
        </p>
      </td>
      <td
        data-title="Action "
        className="capitalize py-4 px-3 lg:px-4 product-actions"
      >
        <div className="flex items-center justify-end lg:justify-center gap-x-2 md:gap-x-6">
          <button className="inline-flex items-center justify-center product-add-to-favourite">
            <i className="hgi hgi-stroke hgi-favourite text-2xl leading-6 text-light-primary-text" />
          </button>
          <button className="inline-flex items-center justify-center product-remove">
            <i className="hgi hgi-stroke hgi-delete-01 text-2xl leading-6 text-light-primary-text" />
          </button>
        </div>
      </td>
    </tr>
  );
}
