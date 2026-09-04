"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CheckoutCartSummary2() {
  return (
    <div className="border border-gray-300 rounded-2xl md:px-6 md:py-6 px-3 py-4 flex flex-col gap-y-6 sticky top-5">
      {/* cart-items */}
      <h5 className="text-light-primary-text">Cart Items</h5>
      <div className="border border-gray-300 rounded-xl overflow-x-auto">
        <table className="w-full cart-items-table">
          <tbody className="space-y-6">
            <tr>
              <td className="py-4 px-4 product-thumbnail">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[60px] h-[60px] rounded-xl bg-[#F4F3F5] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/vitamin-c-2.png"
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
                  className="w-[60px] h-[60px] rounded-xl bg-[#F4F3F5] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/temperature-gun-2.png"
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
                  className="w-[60px] h-[60px] rounded-xl bg-[#F4F3F5] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/vitamin-c.png"
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
                  className="w-[60px] h-[60px] rounded-xl bg-[#F4F3F5] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/bp-machine.png"
                    alt="bp-machine"
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
                  className="w-[60px] h-[60px] rounded-xl bg-[#F4F3F5] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <Image
                    src="/images/bp-machine-2.png"
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
      {/* order-summary */}
      <div className="bg-gray-100 md:px-6 px-4 py-6 rounded-2xl">
        <div className="flex flex-col gap-y-6">
          <h5>Order Summary</h5>
          {/* total */}
          <div>
            <div className="flex flex-col gap-y-4 pb-4 border-b border-gray-300">
              <p className="flex items-center justify-between">
                Sub-Total<span className="text-gray-900">$20.00</span>
              </p>
              <p className="flex items-center justify-between">
                VAT (40%)<span className="text-gray-900">$4.00</span>
              </p>
              <p className="flex items-center justify-between">
                Discount<span className="text-gray-900">-$4.00</span>
              </p>
              <p className="flex items-center justify-between">
                Shipment<span className="text-gray-900">$0.00</span>
              </p>
              <p className="flex items-center justify-between">
                Tax<span className="text-gray-900">$0.00</span>
              </p>
            </div>
            <h6 className="flex items-center justify-between text-light-primary-text pt-4">
              Total<span className="text-gray-900">$20.00</span>
            </h6>
          </div>
        </div>
      </div>
      <div>
        <Link
          href="/order-successful"
          className="btn btn-primary py-3 rounded-[80px] w-full text-center block"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
