"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BannerBentoGrid() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 xl:col-span-4"
          >
            <div className="flex lg:flex-row xl:flex-col flex-col lg:gap-x-6 xl:gap-x-0 gap-y-6">
              <div className="w-full px-8 py-[78px] rounded-3xl bg-[url(/images/home-3/mango-juice-bg.png)] bg-center bg-cover bg-no-repeat lg:w-1/2 xl:w-full">
                <div className="flex flex-col gap-y-[6px] justify-center">
                  <span className="text-light-primary-text bg-warning-light w-fit inline-flex items-center justify-center px-[13px] py-1 rounded-full text-base leading-6 font-semibold">
                    Enjoy 20% savings
                  </span>
                  <h3>Your Daily Store.</h3>
                  <p className="mb-2.5 text-light-primary-text">
                    Essentials, deals, and more.
                  </p>
                  <Link
                    href="/shop-left-sidebar-3col"
                    className="btn btn-primary text-white font-semibold btn-large gap-x-3 w-fit rounded-[60px] text-sm leading-[22px] group py-1.5 pl-4 pr-3"
                  >
                    Shop Now
                    <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-2xl leading-6 text-light-primary-text" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="px-8 py-[78px] rounded-3xl bg-[url(/images/home-3/tomato-ketchup-bg.png)] bg-center bg-no-repeat bg-cover w-full lg:w-1/2 xl:w-full">
                <div className="flex flex-col gap-y-[6px] justify-center">
                  <span className="text-light-primary-text bg-warning-light w-fit inline-flex items-center justify-center px-[13px] py-1 rounded-full text-base leading-6 font-semibold">
                    Enjoy 20% savings
                  </span>
                  <h3>Your Cart. Your Way.</h3>
                  <p className="mb-2.5 text-light-primary-text">
                    All your favorites, in one click.
                  </p>
                  <Link
                    href="/shop-left-sidebar-3col"
                    className="btn btn-primary text-white font-semibold btn-large gap-x-3 w-fit rounded-[60px] text-sm leading-[22px] group py-1.5 pl-4 pr-3"
                  >
                    Shop Now
                    <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-2xl leading-6 text-light-primary-text" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-8 col-span-12"
          >
            <div className="max-h-[688px] xl:h-[688px] rounded-3xl">
              <Image
                src="/images/home-3/yogurt.png"
                alt="Banana Yogurt"
                width={900}
                height={688}
                className="h-full w-full object-cover rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
