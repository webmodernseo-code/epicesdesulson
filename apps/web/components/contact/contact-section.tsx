"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="mb-[70px]">
      <div className="lg:bg-white bg-[#9EE872] py-12 lg:pt-0 lg:pb-[23px] text-center lg:max-w-[704px] mx-auto lg:rounded-[164px] lg:-mb-[103px] relative z-10 lg:before:bg-[#9EE872] lg:after:bg-[#9EE872] lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:h-full lg:before:w-[145px] lg:before:bg-[url(/images/slider-left-shape.png)] lg:before:bg-no-repeat lg:before:z-11 lg:after:absolute lg:after:bottom-0 lg:after:right-0 lg:after:h-full lg:after:w-[145px] lg:after:bg-[url(/images/slider-right-shape.png)] lg:after:bg-no-repeat lg:after:z-11">
        <motion.h3
          className="mb-2"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Contact Us
        </motion.h3>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We'd love to hear from you!
        </motion.p>
      </div>
      <div className="xl:max-w-[1728px] w-full mx-auto relative bg-[#9EE872] xl:rounded-5xl pb-12 lg:pt-[172px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="lg:col-start-2 md:col-start-2 col-start-1 xl:col-end-12 md:col-end-12 col-end-13 bg-white rounded-2xl gap-y-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="lg:p-10 p-5">
                <div className="md:flex gap-x-4 pb-6">
                  <motion.div
                    className="md:w-1/2 w-full"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="first_name"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="First Name"
                      />
                      <label
                        htmlFor="first_name"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        First Name
                      </label>
                    </div>
                  </motion.div>
                  <motion.div
                    className="md:w-1/2 w-full pt-6 md:pt-0"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="last_name"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Last Name"
                      />
                      <label
                        htmlFor="last_name"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Last Name
                      </label>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="md:flex gap-x-4 pb-6"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="md:w-1/2 w-full">
                    <div className="relative w-full">
                      <input
                        type="tel"
                        id="phone"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Phone Number"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Phone Number
                      </label>
                    </div>
                  </div>
                  <div className="md:w-1/2 w-full pt-6 md:pt-0">
                    <div className="relative w-full">
                      <input
                        type="email"
                        id="email"
                        className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="w-full pb-6"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="subject"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="Subject"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Subject
                    </label>
                  </div>
                </motion.div>
                <motion.div
                  className="w-full pb-10"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="input-group medium rounded-[20px] px-3.5 resize-none">
                    <textarea
                      id="message"
                      rows={4}
                      className="peer form-control placeholder-transparent focus:placeholder-transparent"
                      placeholder="Write your message"
                      defaultValue={""}
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Write your message
                    </label>
                  </div>
                </motion.div>
                <motion.div
                  className="flex justify-end"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="btn btn-large btn-primary rounded-[100px] px-[35px] py-[11px]">
                    <a href="#">Send Your Message</a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
