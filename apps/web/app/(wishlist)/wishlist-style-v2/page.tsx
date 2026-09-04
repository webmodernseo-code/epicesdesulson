"use client";

import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";

const WISHLIST_DATA = [
  {
    id: 1,
    image: "/images/vitamin-c.png",
    title: "Veggie Bloom Tomatoes",
    category: "Healthcare",
    ratingPercentage: "80%",
    reviewCount: 118,
    stockStatus: "2 in stock",
    price: 27.49,
    oldPrice: 29.95,
    quantity: 1,
  },
  {
    id: 2,
    image: "/images/bp-machine.png",
    title: "Digital BP Machine",
    category: "Healthcare",
    ratingPercentage: "80%",
    reviewCount: 118,
    stockStatus: "2 in stock",
    price: 27.49,
    oldPrice: 29.95,
    quantity: 1,
  },
  {
    id: 3,
    image: "/images/vitamin-c-2.png",
    title: "Vitamin C Supplements",
    category: "Healthcare",
    ratingPercentage: "80%",
    reviewCount: 118,
    stockStatus: "2 in stock",
    price: 27.49,
    oldPrice: 29.95,
    quantity: 1,
  },
  {
    id: 4,
    image: "/images/bp-machine-2.png",
    title: "Professional BP Machine",
    category: "Healthcare",
    ratingPercentage: "80%",
    reviewCount: 118,
    stockStatus: "2 in stock",
    price: 27.49,
    oldPrice: 29.95,
    quantity: 1,
  },
];

export default function WishlistStyleV2Page() {
  const [items, setItems] = useState(WISHLIST_DATA);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(items.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Wishlist v2" }]} />
      <div className="pb-12">
        <div className="container">
          <div className="grid grid-cols-12 xl:gap-x-10 gap-y-6">
            <div className="xl:col-span-3 col-span-12">
              <div className="sticky top-5">
                <ul className="flex flex-col gap-y-1 border border-gray-300 p-4 rounded-lg">
                  <SidebarLink
                    label="Dashboard"
                    icon="hgi-dashboard-square-01"
                  />
                  <SidebarLink label="Orders" icon="hgi-delete-01" />
                  <SidebarLink label="Wishlist" icon="hgi-favourite" active />
                  <SidebarLink label="My Address" icon="hgi-location-01" />
                  <SidebarLink label="My Account" icon="hgi-user" />
                  <SidebarLink label="Log Out" icon="hgi-login-circle-02" />
                </ul>
              </div>
            </div>
            <div className="xl:col-span-9 col-span-12">
              <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-5 pb-6">
                <div>
                  <h3>Wishlist</h3>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto md:justify-start md:gap-x-12">
                  <p className="font-semibold text-light-primary-text">
                    {selectedIds.length} items is selected
                  </p>
                  <Link
                    href="/cart-single-vendor"
                    className="btn btn-primary btn-large py-[11px] px-6 rounded-[80px]"
                  >
                    <span className="inline-flex items-center justify-center">
                      <i className="hgi hgi-stroke hgi-shopping-cart-02 text-2xl leading-6" />
                    </span>
                    Add to Cart
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
                    <table className="w-full wishlist-table">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="pl-4 py-2.5 product-checkbox">
                            <TableHeaderCheckbox
                              checked={
                                selectedIds.length === items.length &&
                                items.length > 0
                              }
                              onChange={(e) =>
                                toggleSelectAll(e.target.checked)
                              }
                            />
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
                        {items.map((item) => (
                          <tr key={item.id} className="py-4">
                            <td className="py-4 pl-4 hidden lg:table-cell product-checkbox">
                              <TableBodyCheckbox
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                              />
                            </td>
                            <td
                              data-title="Product"
                              className="py-4 px-3 lg:px-0 product"
                            >
                              <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row items-end md:items-start">
                                <div className="product-thumbnail max-w-[100px] h-[100px] rounded-2xl bg-gray-300">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    className="rounded-2xl object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex flex-col gap-y-3 items-end md:items-start">
                                  <Link
                                    href="/product-details"
                                    className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300"
                                  >
                                    {item.title}
                                  </Link>
                                  <p className="text-sm leading-[22px] font-medium text-primary product-category">
                                    {item.category}
                                  </p>
                                  <div className="rating-section flex items-center">
                                    <StarRating ratingPercentage={item.ratingPercentage} />
                                    <span className="text-sm leading-[22px] font-normal inline-block ml-1">
                                      ({item.reviewCount})
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
                              <div className="flex items-center flex-row lg:flex-col xl:flex-row gap-x-3">
                                <span className="text-light-primary-text font-semibold product-offer-price">
                                  ${item.price}
                                </span>
                                <span className="line-through text-light-disabled-text font-normal">
                                  ${item.oldPrice}
                                </span>
                              </div>
                            </td>
                            <td
                              data-title="Quantity"
                              className="text-left lg:text-center xl:text-left capitalize py-4 px-3 lg:px-0 product-quantity"
                            >
                              <div className="border border-gray-300 inline-flex items-center justify-center rounded-[80px] max-w-[108px] py-2.5 px-4">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="inline-flex items-center justify-center hover:text-primary"
                                >
                                  <i className="hgi hgi-stroke hgi-remove-circle text-xl leading-6" />
                                </button>
                                <input
                                  type="text"
                                  readOnly
                                  value={item.quantity}
                                  className="border-0 w-full grow text-center focus:outline-none font-semibold text-light-primary-text"
                                />
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="inline-flex items-center justify-center hover:text-primary"
                                >
                                  <i className="hgi hgi-stroke hgi-add-circle text-xl leading-6" />
                                </button>
                              </div>
                            </td>
                            <td
                              data-title="Buy Action"
                              className="capitalize py-4 px-3 lg:px-0 product-actions"
                            >
                              <div className="flex items-center flex-row lg:flex-col xl:flex-row gap-x-2 md:gap-4">
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
                              className="capitalize text-center py-4 px-3 lg:px-0 pr-4 product-remove"
                            >
                              <button onClick={() => removeItem(item.id)}>
                                <span className="inline-flex items-center justify-center">
                                  <i className="hgi hgi-stroke hgi-delete-01 text-2xl leading-6" />
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) {
  if (active) {
    return (
      <li className="group">
        <a
          href="#"
          className="w-full inline-flex items-center gap-x-4 font-semibold text-white p-4 bg-primary rounded-lg"
        >
          <span className="inline-flex items-center justify-center">
            <i className={`hgi hgi-stroke ${icon} text-2xl leading-6`} />
          </span>
          {label}
        </a>
      </li>
    );
  }
  return (
    <li className="group">
      <a
        href="#"
        className="w-full inline-flex items-center gap-x-4 text-light-secondary-text font-semibold p-4 group-hover:text-white group-hover:bg-primary rounded-lg transition-colors ease-in-out duration-300"
      >
        <span className="inline-flex items-center justify-center">
          <i className={`hgi hgi-stroke ${icon} text-2xl leading-6`} />
        </span>
        {label}
      </a>
    </li>
  );
}

function TableHeaderCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="has-[input:checked]:hover:bg-primary/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
      <label className="relative inline-flex w-5 h-5 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all"
        />
        <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none">
          <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
        </span>
      </label>
    </div>
  );
}

function TableBodyCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="has-[input:checked]:hover:bg-primary/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
      <label className="relative inline-flex w-5 h-5 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all"
        />
        <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all pointer-events-none">
          <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
        </span>
      </label>
    </div>
  );
}
