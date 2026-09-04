"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DiscountPromo() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 xl:col-span-4"
          >
            <div className="flex flex-col justify-end p-4 lg:pb-8 lg:pl-6 lg:pr-8 lg:min-h-[532px] min-h-[432px] rounded-3xl bg-[url(/images/home-3/hot-sauce-bg.jpg)] bg-cover bg-right bg-no-repeat">
              <div className="p-4 bg-[#FFEB69] rounded-2xl">
                <div className="flex flex-col gap-y-[6px] justify-center">
                  <span className="text-light-primary-text bg-[#A0E2E0] w-fit inline-flex items-center justify-center px-[13px] py-1 rounded-full text-base leading-6 font-semibold">
                    Enjoy 20% savings
                  </span>
                  <h3>Fresh Food. Fast Delivery.</h3>
                  <p className="mb-2.5 text-light-primary-text">
                    Groceries that fit your busy lifestyle.
                  </p>
                  <Link
                    href="/shop-left-sidebar-3col"
                    className="btn btn-primary text-white font-semibold btn-large gap-x-3 w-fit rounded-[60px] text-sm leading-[22px] group py-1.5 pl-4 pr-3"
                  >
                    Shop Now
                    <span className="size-8 bg-white glass-bg inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-2xl leading-6 text-light-primary-text" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-8 col-span-12"
          >
            <div className="flex flex-col justify-center lg:min-h-[532px] min-h-[432px] rounded-3xl bg-[url(/images/home-3/corn-can-bg.png)] bg-center bg-cover bg-no-repeat">
              <div className="xl:pl-24 lg:pl-8 pl-5 pr-5 lg:pr-0 max-w-[549px]">
                <div className="flex flex-col gap-y-3 justify-center">
                  <span className="text-light-primary-text bg-warning-light w-fit inline-flex items-center justify-center px-[13px] py-1 rounded-full text-base leading-6 font-semibold">
                    Enjoy 50% Discount
                  </span>
                  <h2>Shop the Smart Way — Anytime, Anywhere</h2>
                  <p className="mb-1 text-light-primary-text">
                    Get your daily essentials and fresh produce delivered in no
                    time. Experience convenience that fits your busy lifestyle.
                  </p>
                  <Link
                    href="/shop-left-sidebar-3col"
                    className="btn btn-primary text-white font-semibold btn-large gap-x-3 w-fit rounded-[60px] text-sm leading-[22px] group py-1.5 pl-4 pr-3"
                  >
                    Shop Now
                    <span className="size-8 bg-white glass-bg inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-2xl leading-6 text-light-primary-text" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
