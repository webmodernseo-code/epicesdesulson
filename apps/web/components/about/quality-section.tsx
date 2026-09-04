"use client";

import { motion } from "framer-motion";

export default function QualitySection() {
  return (
    <section className="mb-[70px]">
      <div className="lg:bg-white bg-[#FFD6EF] py-12 lg:pt-0 lg:pb-[23px] text-center lg:max-w-[704px] mx-auto lg:rounded-[164px] lg:-mb-[103px] relative z-10 lg:before:bg-[#FFD6EF] lg:after:bg-[#FFD6EF] lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:h-full lg:before:w-[145px] lg:before:bg-[url(/images/slider-left-shape.png)] lg:before:bg-no-repeat lg:before:z-11 lg:after:absolute lg:after:bottom-0 lg:after:right-0 lg:after:h-full lg:after:w-[145px] lg:after:bg-[url(/images/slider-right-shape.png)] lg:after:bg-no-repeat lg:after:z-11">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2"
        >
          Quality is our priority
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Because you deserve nothing less than the best.
        </motion.p>
      </div>
      <div className="xl:max-w-[1728px] w-full mx-auto relative bg-[#FFD6EF] xl:rounded-5xl pb-12 lg:pt-[172px]">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-6 gap-y-6">
             <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 border-gray-300 border bg-white rounded-2xl text-center lg:w-[390px] w-full"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-container-truck text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">Free Shipping</h5>
                <p>Enjoy the Convenience of Free Shipping on Every Order</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 border-gray-300 border bg-white rounded-2xl text-center lg:w-[390px] w-full"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-customer-support text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">24x7 Support</h5>
                <p>Round-the-Clock Assistance, Anytime You Need It</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 border-gray-300 border bg-white rounded-2xl text-center lg:w-[390px] w-full"
              >
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i className="hgi hgi-stroke hgi-delivery-return-02 text-3xl text-light-primary-text" />
                </span>
                <h5 className="pt-3 pb-0.5">30 Days Return</h5>
                <p>
                  Your Satisfaction is Our Priority: Return Any Product Within 30
                  Days
                </p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
