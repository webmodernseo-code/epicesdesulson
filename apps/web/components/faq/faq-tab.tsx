"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_TABS = [
  { id: "shopping", label: "Shopping" },
  { id: "payment", label: "Payment" },
  { id: "returns", label: "Returns" },
  { id: "shipping", label: "Shipping" },
];

const COMMON_FAQS = [
  {
    question: "1. What payment methods do you accept?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    question: "2. How can I track my order?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    question: "3. How long will it take to receive my order?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    question: "4. Do you ship internationally?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    question: "5. Can I cancel or modify my order?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
  {
    question: "6. Do I need an account to place an order?",
    answer:
      "We're always here to help you. Whether you have a question, need support, or just want to learn more about our services, our team is ready to assist you every step of the way.",
  },
];

const FAQS_DATA: Record<string, typeof COMMON_FAQS> = {
  shopping: COMMON_FAQS,
  payment: COMMON_FAQS,
  returns: COMMON_FAQS,
  shipping: COMMON_FAQS,
};

export default function FaqTab() {
  const [activeTab, setActiveTab] = useState(FAQ_TABS[0].id);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const currentFaqs = FAQS_DATA[activeTab] || [];

  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="pb-10">
          <div className="max-w-xl mx-auto">
            <div className="flex flex-wrap gap-x-4 justify-center faq-filter gap-y-2.5 lg:gap-y-0">
              {FAQ_TABS.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    if (activeTab !== tab.id) {
                      setActiveTab(tab.id);
                      setActiveIndex(0);
                    }
                  }}
                  className={`btn btn-large py-3 px-[22px] rounded-full uppercase font-medium text-sm leading-[22px] transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#00AB5514] text-primary"
                      : "hover:bg-[#00AB5514] hover:text-primary"
                  }`}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="xl:col-start-3 xl:col-end-11 md:col-start-2 md:col-end-12 col-span-12">
            <div className="faq-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="accordion">
                    {currentFaqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="accordion-item"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                      >
                        <div
                          className={`accordion-header cursor-pointer select-none ${
                            activeIndex === index ? "active" : ""
                          }`}
                          onClick={() => toggleAccordion(index)}
                        >
                          <h6>{faq.question}</h6>
                          <i className="hgi hgi-stroke hgi-minus-sign" />
                          <i className="hgi hgi-stroke hgi-plus-sign" />
                        </div>
                        <AnimatePresence initial={false}>
                          {activeIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                <p>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
