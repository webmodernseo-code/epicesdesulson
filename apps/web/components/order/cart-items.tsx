"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ShipmentAddress() {
  return (
    <>
      <h5>Cart Items</h5>
      <div className="border border-gray-300 rounded-xl overflow-x-auto">
        <table className="w-full cart-items-table">
          <tbody className="space-y-6">
            <tr>
              <td className="py-4 px-4 product-thumbnail">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[60px] h-[60px] rounded-xl bg-[#FFEFF6] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/multi-vendor-slider-image-1.png"
                    alt="vitamin-c-2"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </td>
              <td className="py-4 md:pr-4 pr-2 align-bottom w-full">
                <div className="flex flex-col gap-y-2">
                  <Link
                    href="/product-details"
                    className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300 product-title"
                  >
                    Fresh Bask Basket Fruits
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-[22px] font-normal text-light-secondary-text cart-item-quantity">
                      1 x 120mg Pack
                    </p>
                    <div className="flex items-center gap-x-1.5">
                      <span className="line-through text-light-disabled-text font-normal product-total-price">
                        $29.95
                      </span>
                      <span className="text-primary font-semibold product-offer-price">
                        $27.49
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 product-thumbnail">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[60px] h-[60px] rounded-xl bg-[#FFEFF6] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/multi-vendor-slider-image-2.png"
                    alt="temperature-gun-2"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </td>
              <td className="py-4 md:pr-4 pr-2 align-bottom w-full">
                <div className="flex flex-col gap-y-2">
                  <Link
                    href="/product-details"
                    className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300 product-title"
                  >
                    Fresh Bask Basket Fruits
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-[22px] font-normal text-light-secondary-text cart-item-quantity">
                      1 x 120mg Pack
                    </p>
                    <div className="flex items-center gap-x-1.5">
                      <span className="line-through text-light-disabled-text font-normal product-total-price">
                        $29.95
                      </span>
                      <span className="text-primary font-semibold product-offer-price">
                        $27.49
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 product-thumbnail">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[60px] h-[60px] rounded-xl bg-[#FFEFF6] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/multi-vendor-slider-image-3.png"
                    alt="vitamin-c"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </td>
              <td className="py-4 md:pr-4 pr-2 align-bottom w-full">
                <div className="flex flex-col gap-y-2">
                  <Link
                    href="/product-details"
                    className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300 product-title"
                  >
                    Fresh Bask Basket Fruits
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-[22px] font-normal text-light-secondary-text cart-item-quantity">
                      1 x 120mg Pack
                    </p>
                    <div className="flex items-center gap-x-1.5">
                      <span className="line-through text-light-disabled-text font-normal product-total-price">
                        $29.95
                      </span>
                      <span className="text-primary font-semibold product-offer-price">
                        $27.49
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-4 product-thumbnail">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[60px] h-[60px] rounded-xl bg-[#FFEFF6] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/multi-vendor-slider-image-4.png"
                    alt="bp-machine-2"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </motion.div>
              </td>
              <td className="py-4 md:pr-4 pr-2 align-bottom w-full">
                <div className="flex flex-col gap-y-2">
                  <Link
                    href="/product-details"
                    className="text-light-primary-text font-semibold truncate hover:text-primary transition-colors duration-300 product-title"
                  >
                    Fresh Bask Basket Fruits
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-[22px] font-normal text-light-secondary-text cart-item-quantity">
                      1 x 120mg Pack
                    </p>
                    <div className="flex items-center gap-x-1.5">
                      <span className="line-through text-light-disabled-text font-normal product-total-price">
                        $29.95
                      </span>
                      <span className="text-primary font-semibold product-offer-price">
                        $27.49
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
