"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const ACCORDION_DATA = [
  {
    id: 1,
    title: "1. Submit your application",
    content:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    id: 2,
    title: "2. Get verified",
    content:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    id: 3,
    title: "3. Set up your shop",
    content:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    id: 4,
    title: "4. Start selling and growing",
    content:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
];

export default function HowItWorks() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-y-0 gap-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-5/12 order-1 lg:order-2 rounded-5xl lg:min-h-[536px] relative aspect-square lg:aspect-auto"
          >
            <Image
              src="/images/2-girls.jpg"
              alt="2 Girls"
              fill
              className="object-cover rounded-5xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-1/2 order-2"
          >
            <div>
              <p className="text-primary bg-[#00AB5514] py-0.5 px-3 inline-flex gap-x-2.5 items-center rounded-full font-semibold">
                <span className="w-[15px] h-[15px] rounded-full bg-primary">
                  {" "}
                </span>
                Partner Process
              </p>
            </div>
            <h3 className="py-3">How It Works</h3>
            <p className="pb-10">
              Getting started is simple. Apply to become a vendor, set up your
              store, and start selling. We'll guide you through every step, so
              you can focus on growing your business.
            </p>
            <div className="accordion">
              {ACCORDION_DATA.map((item) => (
                <div className="accordion-item" key={item.id}>
                  <div
                    className={`accordion-header cursor-pointer select-none ${activeAccordion === item.id ? "active" : ""}`}
                    onClick={() => toggleAccordion(item.id)}
                  >
                    <h4>{item.title}</h4>
                    <i className="hgi hgi-stroke hgi-minus-sign" />
                    <i className="hgi hgi-stroke hgi-plus-sign" />
                  </div>
                  <AnimatePresence initial={false}>
                    {activeAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-5 text-light-primary-text">
                          <p>{item.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
