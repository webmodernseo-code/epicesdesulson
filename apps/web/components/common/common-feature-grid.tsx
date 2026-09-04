"use client";

import { motion } from "framer-motion";

export default function CommonFeatureGrid() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="md:col-span-6 col-span-12 xl:col-span-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 border-gray-300 border rounded-2xl text-center"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-container-truck text-3xl text-light-primary-text"></i>
                </span>
                <h5 className="pt-3 pb-0.5">Free Shipping</h5>
                <p>Enjoy the Convenience of Free Shipping on Every Order</p>
              </motion.div>
          </div>
          <div className="md:col-span-6 col-span-12 xl:col-span-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 border-gray-300 border rounded-2xl text-center"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-customer-support text-3xl text-light-primary-text"></i>
                </span>
                <h5 className="pt-3 pb-0.5">24x7 Support</h5>
                <p>Round-the-Clock Assistance, Anytime You Need It</p>
              </motion.div>
          </div>
          <div className="md:col-span-6 col-span-12 xl:col-span-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 border-gray-300 border rounded-2xl text-center"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-delivery-return-02 text-3xl text-light-primary-text"></i>
                </span>
                <h5 className="pt-3 pb-0.5">30 Days Return</h5>
                <p>
                  Your Satisfaction is Our Priority: Return Any Product Within 30
                  Days
                </p>
              </motion.div>
          </div>
          <div className="md:col-span-6 col-span-12 xl:col-span-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 border-gray-300 border rounded-2xl text-center"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-transaction text-3xl text-light-primary-text"></i>
                </span>
                <h5 className="pt-3 pb-0.5">Secure Payment</h5>
                <p>Seamless Shopping Backed by Safe and Secure Payment Options</p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
