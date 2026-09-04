"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: "hgi-container-truck",
    title: "Free Shipping",
    description: "Enjoy the Convenience of Free Shipping on Every Order",
  },
  {
    icon: "hgi-customer-support",
    title: "24x7 Support",
    description: "Round-the-Clock Assistance, Anytime You Need It",
  },
  {
    icon: "hgi-delivery-return-02",
    title: "30 Days Return",
    description:
      "Your Satisfaction is Our Priority: Return Any Product Within 30 Days",
  },
  {
    icon: "hgi-transaction",
    title: "Secure Payment",
    description: "Seamless Shopping Backed by Safe and Secure Payment Options",
  },
];

export default function FaqFeatureGrid({ className }: { className?: string }) {
  return (
    <section className={cn("pb-17.5", className)}>
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="md:col-span-6 col-span-12 xl:col-span-3"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="p-6 border-gray-300 border rounded-2xl text-center">
                <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-full">
                  <i
                    className={cn(
                      "hgi hgi-stroke text-3xl text-light-primary-text",
                      feature.icon,
                    )}
                  />
                </span>
                <h5 className="pt-3 pb-0.5">{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
