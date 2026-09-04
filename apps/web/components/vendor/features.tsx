"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Features() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="bg-[#FFEB69] rounded-5xl p-10 xl:py-[100px] xl:px-[114px] grid grid-cols-12 items-center xl:gap-x-0 lg:gap-x-10 lg:gap-y-0 gap-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 lg:col-span-6 lg:max-w-[642px] row-start-2 lg:row-start-auto"
          >
            <div>
              <p className="text-primary bg-[#00AB5514] py-0.5 px-3 inline-flex gap-x-2.5 items-center rounded-full font-semibold">
                <span className="w-[15px] h-[15px] rounded-full bg-primary">
                  {" "}
                </span>
                Features
              </p>
            </div>
            <h3 className="py-3">Focus on Customer Satisfaction</h3>
            <p className="pb-10">
              Experience the ultimate convenience with our Faster Free Delivery
              service—designed to bring your orders to your doorstep quickly and
              without any extra cost. Whether you&apos;re ordering essentials or
              gifts, we make sure you get them faster than ever. Why You'll Love
              It:
            </p>
            <ul className="pb-6 space-y-4">
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-black text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02"></i>
                </span>
                <p>
                  Absolutely Free: No delivery fees, no hidden charges—just
                  fast, reliable service.
                </p>
              </li>
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-black text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02"></i>
                </span>
                <p>
                  Real-Time Tracking: Stay updated every step of the way with
                  live order tracking.
                </p>
              </li>
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-black text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02"></i>
                </span>
                <p>
                  Reliable Delivery Partners: We&apos;ve partnered with trusted
                  couriers to ensure your packages
                </p>
              </li>
            </ul>
            <p>
              Say goodbye to long waits and shipping fees. With Faster Free
              Delivery, we&apos;re raising the standard—fast, seamless, and 100%
              free.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="col-span-12 lg:col-span-6 w-full row-start-1 lg:row-start-auto overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src="/images/red-shirt-female.png"
              alt="Red Shirt Female"
              width={642}
              height={600}
              className="rounded-2xl w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
