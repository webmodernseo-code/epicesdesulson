"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ComingSoonSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date 10 days from now for demonstration purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <section className="py-10 sm:py-[70px]">
      <div className="container">
        <motion.div
          className="border rounded-3xl sm:rounded-5xl border-gray-300 py-6 sm:py-10 px-4 sm:px-[34.5px] w-full max-w-[528px] mx-auto text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2
            className="pb-3 text-2xl sm:text-[32px] md:text-[40px]"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Coming Soon
          </motion.h2>
          <motion.p
            className="max-w-[368px] mx-auto text-sm sm:text-base px-4 sm:px-0"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We couldn't find the page you were looking for. We suggest you
            return to homepage.
          </motion.p>
          <div className="coming-soon-page-countdown flex items-center justify-center gap-2 sm:gap-0 sm:justify-between py-6 sm:py-10 sellzy-countdown flex-wrap sm:flex-nowrap">
            <motion.div
              className="w-16 h-16 sm:size-20 flex flex-col justify-center items-center border border-error rounded-full bg-[#FFF1F0]"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h4 className="days text-lg sm:text-2xl">
                {formatNumber(timeLeft.days)}
              </h4>
              <p className="text-xs sm:text-sm leading-5.5">Days</p>
            </motion.div>
            <motion.h4
              className="justify-center text-lg sm:text-2xl"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              :
            </motion.h4>
            <motion.div
              className="w-16 h-16 sm:size-20 flex flex-col justify-center items-center border border-error rounded-full bg-[#FFF1F0]"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h4 className="hours text-lg sm:text-2xl">
                {formatNumber(timeLeft.hours)}
              </h4>
              <p className="text-xs sm:text-sm leading-5.5">Hours</p>
            </motion.div>
            <motion.h4
              className="text-lg sm:text-2xl"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              :
            </motion.h4>
            <motion.div
              className="w-16 h-16 sm:size-20 flex flex-col justify-center items-center border border-error rounded-full bg-[#FFF1F0]"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h4 className="minutes text-lg sm:text-2xl">
                {formatNumber(timeLeft.minutes)}
              </h4>
              <p className="text-xs sm:text-sm leading-5.5">Mins</p>
            </motion.div>
            <motion.h4
              className="text-lg sm:text-2xl"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              :
            </motion.h4>
            <motion.div
              className="w-16 h-16 sm:size-20 flex flex-col justify-center items-center border border-error rounded-full bg-[#FFF1F0]"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h4 className="seconds text-lg sm:text-2xl">
                {formatNumber(timeLeft.seconds)}
              </h4>
              <p className="text-xs sm:text-sm leading-5.5">Secs</p>
            </motion.div>
          </div>
          <motion.div
            className="input-group relative medium w-full mx-auto pl-3 sm:pl-4 py-1.5 pr-2 sm:pr-2.5 mb-6 sm:mb-10 rounded-[100px]"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div
              className="input-group-addon inline-flex items-center"
              data-align="inline-start"
            >
              <i className="hgi hgi-stroke hgi-mail-02 text-xl sm:text-2xl" />
            </div>
            <input
              type="text"
              className="peer form-control text-sm sm:text-base pr-24 sm:pr-28 placeholder-transparent focus:placeholder-transparent"
              placeholder="Enter your email"
              name="email"
              id="email"
            />
            <label
              htmlFor="email"
              className="absolute left-12 peer-focus:left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
            >
              Enter your email
            </label>
            <button className="btn btn-primary btn-small sm:btn-medium rounded-r-3xl rounded-tl-none! rounded-bl-none! absolute top-0 right-0 h-full w-auto text-xs sm:text-sm px-3 sm:px-4">
              Get Notify
            </button>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              href="/"
              className="btn group font-semibold text-light-primary-text hover:text-primary text-sm sm:text-base"
            >
              <span className="size-5 sm:size-6 inline-flex items-center justify-center -rotate-180 transition-all duration-300">
                <i className="hgi hgi-stroke hgi-arrow-right-02 text-lg sm:text-xl text-light-primary-text font-semibold group-hover:text-primary" />
              </span>
              Return to Homepage
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
