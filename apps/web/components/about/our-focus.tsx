"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import VideoModal from "../common/video-modal";

export default function OurFocus() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 items-center lg:gap-x-[70px]">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 lg:col-span-6 row-start-2 lg:row-start-auto relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full min-h-[570px] rounded-3xl overflow-hidden xl:mb-0 mb-6 lg:mt-0 mt-6"
            >
              <Image
                src="/images/about/female-green-bg.jpg"
                alt="Woman Standing"
                fill
                className="rounded-3xl object-cover"
              />
            </motion.div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              <button
                type="button"
                className="about-us-popup-youtube"
                onClick={() => setIsVideoOpen(true)}
              >
                <i className="hgi hgi-stroke hgi-play-circle text-white text-[86px]" />
              </button>
            </span>
          </motion.div>

          <VideoModal
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoUrl="https://www.youtube.com/watch?v=rkpzYNB6xks"
          />

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
              Focus on Customer Satisfaction
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
        </div>
      </div>
    </section>
  );
}
