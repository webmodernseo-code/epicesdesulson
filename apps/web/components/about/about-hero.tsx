"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const AboutHero = () => {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-[30px]">
          <div className="xl:col-span-8 col-span-12">
            <div className="md:flex justify-between">
              <div className="lg:w-[644px] md:w-[400px] w-full md:pt-[56px] pb-10 order-2 md:order-1">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pb-6"
                >
                  Empowering Better Health at Home
                </motion.h2>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pb-4"
                >
                  <h5 className="pb-3">Our Mission</h5>
                  <p>
                    To make quality healthcare products accessible, affordable,
                    and reliable for every household. We are committed to
                    helping individuals and families take control of their
                    health with ease, confidence, and care—right from the
                    comfort of home.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h5 className="pb-3">Our Vision</h5>
                  <p>
                    To become a trusted name in home healthcare by simplifying
                    the way people care for themselves and their loved
                    ones—empowering healthier lives through innovation,
                    compassion, and convenience.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="md:w-[255px] lg:max-h-[340px] order-1 md:order-2 overflow-hidden rounded-2xl"
              >
                <Image
                  src="/images/about/man-woman.jpg"
                  alt="Man & Woman"
                  width={255}
                  height={340}
                  className="rounded-2xl h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="md:flex justify-between lg:p-10 p-4 border border-gray-300 rounded-2xl lg:mt-0 mt-10 lg:mb-[53px] mb-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:pb-0 pb-2 md:border-none border-b border-gray-300 xl:pr-0 lg:pr-6 md:pr-4"
              >
                <div className="flex items-center justify-center">
                  <h3 className="about-us-counter">120</h3>
                  <h3>+</h3>
                </div>
                <p className="text-center">Years of Experience</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-r border-gray-300"
              ></motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:pb-0 pb-2 md:pt-0 pt-2 md:border-none border-b border-gray-300 xl:px-0 lg:px-6 md:px-4"
              >
                <div className="flex items-center justify-center">
                  <h3 className="about-us-counter">100</h3>
                  <h3>M</h3>
                </div>
                <p className="text-center">Orders Delivered Safely</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-r border-gray-300"
              ></motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="md:pb-0 pb-2 md:pt-0 pt-2 md:border-none border-b border-gray-300 xl:px-0 lg:px-6 md:px-4"
              >
                <div className="flex items-center justify-center">
                  <h3 className="about-us-counter">100</h3>
                  <h3>K+</h3>
                </div>
                <p className="text-center">Verified 5-Star Reviews</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-r border-gray-300"
              ></motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="md:pt-0 pt-2 xl:pl-0 lg:pl-6 md:pl-4"
              >
                <div className="flex items-center justify-center">
                  <h3 className="about-us-counter">99</h3>
                  <h3>%</h3>
                </div>
                <p className="text-center">Customer Satisfaction Rate</p>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="xl:col-span-4 col-span-12 overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/about/two-women.jpg"
              alt="Two Women"
              width={400}
              height={600}
              className="rounded-2xl xl:h-full object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
