"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TwoColBannerGridThree() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6 col-span-12"
          >
            <div className="items-center flex flex-col sm:flex-row gap-4 p-6 sm:p-8 bg-[#F5F2EA] rounded-2xl border border-gray-200 justify-between">
              <div className="flex flex-col gap-y-2 max-w-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Sélection Rare
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Poivres & Baies Sauvages
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Arômes intenses et puissants récoltés à la main.
                </p>
                <div>
                  <Link
                    href="/"
                    className="btn btn-primary text-white font-semibold text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-2 shadow-xs"
                  >
                    <span>Découvrir</span>
                    <i className="hgi hgi-stroke hgi-arrow-right-02 text-base" />
                  </Link>
                </div>
              </div>
              <div className="size-36 sm:size-44 shrink-0 overflow-hidden rounded-xl bg-white/60 p-2 flex items-center justify-center">
                <Image
                  src="/images/home-3/nuts.png"
                  alt="Poivres Rares"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 col-span-12"
          >
            <div className="items-center flex flex-col sm:flex-row gap-4 p-6 sm:p-8 bg-[#EBF4F6] rounded-2xl border border-gray-200 justify-between">
              <div className="flex flex-col gap-y-2 max-w-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Artisanal & Bio
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Mélanges Culinaires Signatures
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Équilibres parfaits pour sublimer viandes, poissons et légumes.
                </p>
                <div>
                  <Link
                    href="/"
                    className="btn btn-primary text-white font-semibold text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-2 shadow-xs"
                  >
                    <span>Commander</span>
                    <i className="hgi hgi-stroke hgi-arrow-right-02 text-base" />
                  </Link>
                </div>
              </div>
              <div className="size-36 sm:size-44 shrink-0 overflow-hidden rounded-xl bg-white/60 p-2 flex items-center justify-center">
                <Image
                  src="/images/home-3/pouch-mockup.png"
                  alt="Mélanges d'Épices"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
