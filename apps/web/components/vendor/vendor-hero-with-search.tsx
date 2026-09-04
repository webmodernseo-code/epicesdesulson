"use client";

import { motion } from "framer-motion";
import CustomFloatingSelect from "../common/custom-floating-select";

export default function VendorHeroWithSearch({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="bg-[url('/images/home-3/tomato-ketchup-bg.png')] rounded-3xl bg-no-repeat bg-center bg-cover w-full h-[460px]">
        <div className="flex flex-col items-center justify-center gap-y-3 h-full">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-light-primary-text"
          >
            Seller Marketplace
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:w-[408px] w-[95%] text-center text-light-primary-text mb-[18px]"
          >
            Browse through diverse categories, explore exclusive deals, and
            connect directly with vendors you can trust.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center lg:w-[620px] w-[95%] bg-white rounded-full px-6 py-[7px] gap-x-6"
          >
            {/* SELECT */}
            <div className="md:block hidden min-w-[180px]">
              <CustomFloatingSelect
                options={[
                  { value: "popularity", label: "Popularity" },
                  { value: "low-high", label: "Low to High Price" },
                  { value: "high-low", label: "High to Low Price" },
                  { value: "rating", label: "Avarage Rating" },
                  { value: "a-z", label: "A-Z Order" },
                  { value: "z-a", label: "Z-A Order" },
                ]}
                label="Select Category"
                hideLabel
                hideBorder
              />
            </div>
            {/* SEARCH INPUT */}
            <div className="md:pl-6 flex-1 md:border-l border-gray-300">
              <div className="input-group medium py-2 pr-2.5 rounded-[100px] ring-0">
                <div
                  className="input-group-addon inline-flex items-center justify-center leading-6"
                  data-align="inline-end"
                >
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-search-01 text-2xl leading-6 text-light-disabled-text" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for Items"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
