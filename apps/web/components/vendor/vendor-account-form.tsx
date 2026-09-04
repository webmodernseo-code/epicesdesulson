"use client";

import { motion } from "framer-motion";

export default function VendorAccountForm() {
  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="bg-[#A0E2E0] rounded-5xl p-10 xl:py-[100px] xl:px-[114px] grid grid-cols-12 lg:gap-y-0 gap-y-10 gap-x-0 xl:gap-x-0 lg:gap-x-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 col-span-12 xl:max-w-[551px]"
          >
            <h2 className="pb-4">Partner with Us — Become a Trusted Vendor</h2>
            <p className="pb-6">
              Join our growing network of trusted vendors and reach a wider
              audience with ease. We offer the tools, support, and exposure you
              need to scale your business. Start your journey today and unlock
              new opportunities for growth.
            </p>
            <a
              href="#"
              className="btn btn-large btn-primary rounded-[100px] py-[11px]"
            >
              Learn More
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-6 col-span-12 bg-white rounded-2xl"
          >
            <h5 className="border-b border-[#919EAB3D] pl-6 pt-6 pb-4">
              Vendor Account
            </h5>
            <div className="p-6">
              <div className="md:flex gap-4">
                <div className="md:w-1/2 w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="vendor-account-first-name"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="First Name*"
                    />
                    <label
                      htmlFor="vendor-account-first-name"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      First Name*
                    </label>
                  </div>
                </div>
                <div className="md:w-1/2 w-full pt-6 md:pt-0">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="vendor-account-last-name"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="Last Name*"
                    />
                    <label
                      htmlFor="vendor-account-last-name"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Last Name*
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full py-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="vendor-account-email"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Email*"
                  />
                  <label
                    htmlFor="vendor-account-email"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Email*
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="relative w-full">
                  <input
                    type="password"
                    id="vendor-account-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Password*"
                  />
                  <label
                    htmlFor="vendor-account-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Password*
                  </label>
                </div>
              </div>
              <div className="w-full pt-6 pb-10">
                <div className="relative w-full">
                  <input
                    type="password"
                    id="vendor-account-confirm-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Confirm Password*"
                  />
                  <label
                    htmlFor="vendor-account-confirm-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Confirm Password*
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="btn btn-large btn-primary rounded-[100px] w-full py-[11px]"
              >
                Create Account
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
