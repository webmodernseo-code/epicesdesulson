"use client";

import Breadcrumb from "@/components/common/breadcrumb";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "404",
          },
        ]}
      />
      <div className="notfound">
        <div className="notfound-section">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <Image
              src="/images/404.png"
              alt="404 Cart"
              width={565}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Oops!
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Sorry, we couldn't find that page. Try going back or checking out
            our homepage.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              href="/"
              className="btn btn-large btn-primary rounded-[100px] py-[11px] inline-block"
            >
              Back To Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
