"use client";

import React, { useRef } from "react";
import ProductCardOne from "@/components/card/product-card-one";
import { motion } from "framer-motion";

const RELATED_PRODUCTS = [
  {
    id: 1,
    img: "/images/home-3/nuts.png",
    name: "Poivre Rouge de Kampot IGP",
    rating: 95,
    ratingCount: 142,
    currentPrice: "16,50 €",
    oldPrice: "19,90 €",
    discount: "-17%",
    delay: 0.1,
  },
  {
    id: 2,
    img: "/images/home-3/pouch-mockup.png",
    name: "Curry Royal de Madras d'Exception",
    rating: 90,
    ratingCount: 98,
    currentPrice: "13,80 €",
    oldPrice: "16,00 €",
    discount: "-14%",
    delay: 0.2,
  },
  {
    id: 3,
    img: "/images/home-3/avocado.png",
    name: "Gousses de Vanille Bourbon Gourmet",
    rating: 100,
    ratingCount: 215,
    currentPrice: "22,90 €",
    oldPrice: "26,50 €",
    discount: "-15%",
    delay: 0.3,
  },
  {
    id: 4,
    img: "/images/home-3/watermelon.png",
    name: "Mélange d'Épices Festives Bio",
    rating: 85,
    ratingCount: 76,
    currentPrice: "11,50 €",
    oldPrice: "14,00 €",
    discount: "-18%",
    delay: 0.4,
  },
];

export default function RelatedProductsOne() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="pb-16 pt-6">
      <div className="container">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Découvrir d'autres saveurs
            </span>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl font-bold text-gray-900 mt-1"
            >
              Vous aimerez aussi
            </motion.h3>
          </div>
          <div className="flex items-center gap-x-2">
            <button
              ref={prevRef}
              aria-label="Précédent"
              className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition cursor-pointer"
            >
              <i className="hgi hgi-stroke text-lg hgi-arrow-left-01" />
            </button>
            <button
              ref={nextRef}
              aria-label="Suivant"
              className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition cursor-pointer"
            >
              <i className="hgi hgi-stroke text-lg hgi-arrow-right-01" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELATED_PRODUCTS.map((product) => (
            <ProductCardOne
              key={product.id}
              image={product.img}
              title={product.name}
              ratingPercentage={product.rating}
              ratingCount={product.ratingCount}
              currentPrice={product.currentPrice}
              oldPrice={product.oldPrice}
              discount={product.discount}
              variant="gray"
              badgeVariant="default"
              delay={product.delay}
              className="related-product-item bg-white border border-gray-200 rounded-3xl p-4 shadow-2xs hover:shadow-md transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
