"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center w-full md:w-[734px] mx-auto pb-10"
        >
          <p className="font-semibold">Why Choose Us</p>
          <h3 className="py-3">Why Sell On Our Company?</h3>
          <p>
            Grow faster with a platform built for your success. Get instant
            access to thousands of customers, powerful tools to manage your
            store, and a team that's always ready to help you win.
          </p>
        </motion.div>
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 col-span-12 xl:col-span-3"
          >
            <div className="p-10 border-[#919EAB3D] border rounded-xl text-center">
              <span className="inline-flex items-center justify-center size-[72px] bg-warning-lighter rounded-full">
                <i className="hgi hgi-stroke hgi-purse-01 text-[32px] border-[#161C24]" />
              </span>
              <h5 className="pt-4 pb-2">Lowest cost</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-6 col-span-12 xl:col-span-3"
          >
            <div className="p-10 border-[#919EAB3D] border rounded-xl text-center">
              <span className="inline-flex items-center justify-center size-[72px] bg-warning-lighter rounded-full">
                <i className="hgi hgi-stroke hgi-analytics-up text-[32px] border-[#161C24]" />
              </span>
              <h5 className="pt-4 pb-2">High Growth Rate</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-6 col-span-12 xl:col-span-3"
          >
            <div className="p-10 border-[#919EAB3D] border rounded-xl text-center">
              <span className="inline-flex items-center justify-center size-[72px] bg-warning-lighter rounded-full">
                <i className="hgi hgi-stroke hgi-pickup-01 text-[32px] border-[#161C24]" />
              </span>
              <h5 className="pt-4 pb-2">Dedicated Pickup</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-6 col-span-12 xl:col-span-3"
          >
            <div className="p-10 border-[#919EAB3D] border rounded-xl text-center">
              <span className="inline-flex items-center justify-center size-[72px] bg-warning-lighter rounded-full">
                <i className="hgi hgi-stroke hgi-hand-prayer text-[32px] border-[#161C24]" />
              </span>
              <h5 className="pt-4 pb-2">Most Approachable</h5>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
