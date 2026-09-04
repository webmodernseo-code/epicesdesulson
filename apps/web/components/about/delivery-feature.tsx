"use client";

import { motion } from "framer-motion";

export default function DeliveryFeature() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 items-center lg:gap-x-[70px]">
          <div className="col-span-12 lg:col-span-6 lg:max-w-[762px] row-start-1 lg:row-start-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-primary bg-[#00AB5514] py-0.5 px-3 inline-flex gap-x-2.5 items-center rounded-full font-semibold">
                <span className="w-[15px] h-[15px] rounded-full bg-primary">
                  {" "}
                </span>
                Features
              </p>
            </motion.div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4 pb-10"
            >
              Faster Free Delivery
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pb-6"
            >
              Experience the ultimate convenience with our Faster Free Delivery
              service—designed to bring your orders to your doorstep quickly and
              without any extra cost. Whether you're ordering essentials or
              gifts, we make sure you get them faster than ever. Why You'll Love
              It:
            </motion.p>
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pb-6 space-y-4"
            >
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-primary text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02" />
                </span>
                <p>
                  Absolutely Free: No delivery fees, no hidden charges—just
                  fast, reliable service.
                </p>
              </li>
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-primary text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02" />
                </span>
                <p>
                  Real-Time Tracking: Stay updated every step of the way with
                  live order tracking.
                </p>
              </li>
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-primary text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02" />
                </span>
                <p>
                  Reliable Delivery Partners: We've partnered with trusted
                  couriers to ensure your packages
                </p>
              </li>
              <li className="flex gap-x-4">
                <span className="inline-flex flex-none items-center justify-center size-6 bg-primary text-white rounded-full">
                  <i className="hgi hgi-stroke hgi-tick-02" />
                </span>
                <p>
                  Weekend &amp; Evening Delivery: Get your items when it's most
                  convenient for you.
                </p>
              </li>
            </motion.ul>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Say goodbye to long waits and shipping fees. With Faster Free
              Delivery, we're raising the standard—fast, seamless, and 100%
              free.
            </motion.p>
          </div>
          <div className="col-span-12 lg:col-span-6 row-start-2 lg:row-start-auto">
            <div className="xl:flex items-center gap-x-6">
              <motion.img
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src="/images/about/woman-on-phone.jpg"
                alt="Woman on Phone"
                className="rounded-2xl lg:max-w-[450px] w-full min-h-[570px] object-cover xl:mb-0 mb-6 lg:mt-0 mt-6"
              />
              <div>
                <motion.img
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  src="/images/about/woman-bg.png"
                  alt="Woman Standing"
                  className="rounded-2xl w-full xl:max-w-[306px] min-h-[414px] object-cover xl:object-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
