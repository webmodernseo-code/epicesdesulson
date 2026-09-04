"use client";

import { motion } from "framer-motion";

const QUALITY_FEATURES = [
  {
    id: 1,
    icon: "hgi-container-truck",
    title: "Free Shipping",
    description: "Enjoy the Convenience of Free Shipping on Every Order",
    delay: 0.2,
  },
  {
    id: 2,
    icon: "hgi-customer-support",
    title: "24x7 Support",
    description: "Round-the-Clock Assistance, Anytime You Need It",
    delay: 0.3,
  },
  {
    id: 3,
    icon: "hgi-delivery-return-02",
    title: "30 Days Return",
    description:
      "Your Satisfaction is Our Priority: Return Any Product Within 30 Days",
    delay: 0.4,
  },
  {
    id: 4,
    icon: "hgi-transaction",
    title: "Secure Payment",
    description: "Seamless Shopping Backed by Safe and Secure Payment Options",
    delay: 0.5,
  },
];

export default function CartQualitySection() {
  return (
    <section className="mb-[70px]">
      <div className="lg:bg-white bg-[#A0E2E0] py-12 lg:pt-0 lg:pb-[23px] text-center lg:max-w-[704px] mx-auto lg:rounded-[164px] lg:-mb-[103px] relative z-10 lg:before:bg-[#A0E2E0] lg:after:bg-[#A0E2E0] lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:h-full lg:before:w-[145px] lg:before:bg-[url(/images/slider-left-shape.png)] lg:before:bg-no-repeat lg:before:z-11 lg:after:absolute lg:after:bottom-0 lg:after:right-0 lg:after:h-full lg:after:w-[145px] lg:after:bg-[url(/images/slider-right-shape.png)] lg:after:bg-no-repeat lg:after:z-11">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-light-primary-text"
        >
          Quality is our priority
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Because you deserve nothing less than the best.
        </motion.p>
      </div>
      <div className="xl:max-w-[1728px] w-full mx-auto relative bg-[#A0E2E0] xl:rounded-5xl pb-12 lg:pt-[172px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {QUALITY_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="md:col-span-6 col-span-12 xl:col-span-3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className="p-6 rounded-2xl text-center bg-white h-full"
                >
                  <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                    <i
                      className={`hgi hgi-stroke ${feature.icon} text-3xl text-light-primary-text`}
                    />
                  </span>
                  <h5 className="pt-3 pb-0.5">{feature.title}</h5>
                  <p>{feature.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
