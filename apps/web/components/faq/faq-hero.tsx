"use client";

import { motion } from "framer-motion";

export default function FaqHero() {
  return (
    <section className="pb-10">
      <div className="container">
        <div className="grid grid-cols-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary text-center xl:col-start-3 xl:col-end-11 md:col-start-2 md:col-end-12 col-span-12 rounded-3xl"
          >
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white pt-10"
            >
              Frequently Asked Questions
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white py-3"
            >
              Find quick answers to common questions.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="input-group medium max-w-[300px] md:max-w-[380px] lg:max-w-[530px] mx-auto pl-4 py-1.5 pr-2.5 rounded-[100px] bg-white mb-10"
            >
              <div
                className="input-group-addon inline-flex items-center"
                data-align="inline-start"
              >
                <i className="hgi hgi-stroke hgi-search-01 text-2xl text-light-disabled-text" />
              </div>
              <input
                type="text"
                id="search"
                className="peer form-control text-light-disabled-text placeholder-transparent focus:placeholder-transparent"
                placeholder="Search..."
                name="email"
              />
              <label
                htmlFor="search"
                className="absolute peer-focus:left-[14px] left-12 top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
              >
                Search...
              </label>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
