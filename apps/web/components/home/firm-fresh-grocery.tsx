"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import StarRating from "@/components/common/star-rating";

interface FormatOption {
  label: string;
  multiplier: number;
  text: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  { label: "100g", multiplier: 1, text: "Sachet 100g" },
];

interface SpiceProduct {
  id: number;
  image: string;
  hoverImage?: string;
  alt: string;
  title: string;
  basePrice: number;
  baseOldPrice: number;
  ratingCount: string;
  ratingPercentage: number;
  delay: string;
}

const FOUR_PRODUCTS: SpiceProduct[] = [
  {
    id: 301,
    image: "/images/products/epice-poulet-recto.jpg",
    hoverImage: "/images/products/epice-poulet-verso.jpg",
    alt: "Épice de Sulson - Poulet (Recette Authentique Cameroun)",
    title: "Épice de Sulson - Spéciale Poulet",
    basePrice: 6.9,
    baseOldPrice: 8.5,
    ratingCount: "196",
    ratingPercentage: 99,
    delay: "0.1s",
  },
  {
    id: 302,
    image: "/images/products/epice-viande-recto.jpg",
    hoverImage: "/images/products/epice-viande-verso.jpg",
    alt: "Épice de Sulson - Viande (Recette Authentique Cameroun)",
    title: "Épice de Sulson - Spéciale Viande",
    basePrice: 6.9,
    baseOldPrice: 8.5,
    ratingCount: "228",
    ratingPercentage: 99,
    delay: "0.2s",
  },
  {
    id: 303,
    image: "/images/products/epice-poisson-recto.jpg",
    hoverImage: "/images/products/epice-poisson-verso.jpg",
    alt: "Épice de Sulson - Poisson (Recette Authentique Cameroun)",
    title: "Épice de Sulson - Spéciale Poisson",
    basePrice: 6.9,
    baseOldPrice: 8.5,
    ratingCount: "184",
    ratingPercentage: 98,
    delay: "0.3s",
  },
  {
    id: 304,
    image: "/images/products/epice-gourmande-recto.jpg",
    hoverImage: "/images/products/epice-gourmande-verso.jpg",
    alt: "Épice de Sulson - Saveur Gourmande (Le Secret de Sulson)",
    title: "Épice de Sulson - Saveur Gourmande",
    basePrice: 6.9,
    baseOldPrice: 8.5,
    ratingCount: "215",
    ratingPercentage: 99,
    delay: "0.4s",
  },
];

const FIFTH_FORMATS = [
  { label: "Pack 4x100g", price: 24.9, oldPrice: 27.6, text: "Pack Intégral 4x100g (400g)" },
];

const FIFTH_PRODUCT = {
  id: 305,
  image: "/images/products/pack-4-saveurs-sulson.jpg",
  alt: "Pack Intégral 4 Saveurs Les Épices de Sulson",
  title: "Le Pack Intégral : Les 4 Saveurs Authentiques de Sulson",
  description:
    "L'assortiment complet réunissant nos 4 créations artisanales : Poulet (Jaune), Viande (Rouge), Poisson (Bleu) et Saveur Gourmande (Orange). 100% Naturel, sans additif ni conservateur. Tout le terroir culinaire camerounais réuni dans votre cuisine !",
  discount: "-15%",
  ratingCount: "312 avis vérifiés",
  ratingPercentage: 99,
};

function ProductCard({ product }: { product: SpiceProduct }) {
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>(FORMAT_OPTIONS[0]);
  const [isAdded, setIsAdded] = useState(false);

  const currentPriceNum = (product.basePrice * selectedFormat.multiplier).toFixed(2);
  const oldPriceNum = (product.baseOldPrice * selectedFormat.multiplier).toFixed(2);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedFormat.label}`,
      title: `${product.title} (${selectedFormat.label})`,
      image: product.image,
      currentPrice: `${currentPriceNum} €`,
      oldPrice: `${oldPriceNum} €`,
      pack: selectedFormat.text,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: parseFloat(product.delay) }}
      className="h-full"
    >
      <div className="border border-gray-200 rounded-2xl p-4 bg-white hover:border-primary hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group">
        <div>
          {/* Image (Zoomed Recto / Verso on hover) */}
          <div className="relative rounded-xl overflow-hidden mb-3 bg-gray-50/80 h-[230px] sm:h-[250px] flex items-center justify-center p-1">
            <Image
              src={product.image}
              alt={product.alt}
              width={300}
              height={260}
              unoptimized
              className={`w-full h-full object-contain transition-all duration-300 transform ${
                product.hoverImage
                  ? "scale-105 group-hover:opacity-0 group-hover:scale-95"
                  : "scale-105 group-hover:scale-112"
              }`}
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={`${product.alt} - Verso`}
                width={300}
                height={260}
                unoptimized
                className="w-full h-full object-contain absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-110 transition-all duration-300"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="rating-section flex items-center mb-1.5">
            <StarRating ratingPercentage={`${product.ratingPercentage}%`} />
            <span className="text-xs sm:text-sm text-gray-600 ml-2 font-semibold">
              ({product.ratingCount})
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1 mb-1.5">
            {product.title}
          </h4>

          <div className="flex items-baseline gap-x-2.5">
            <span className="text-xl sm:text-2xl font-extrabold text-gray-950">
              {currentPriceNum} €
            </span>
            <span className="text-sm text-gray-400 line-through font-medium">
              {oldPriceNum} €
            </span>
          </div>

          {/* Format / Weight Selector (including 1 Kg / Kilo) */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-gray-700 font-bold">Poids :</span>
              <span className="text-xs sm:text-sm font-bold text-primary">
                {selectedFormat.label === "1 Kg" ? "1 Kg (Kilo)" : selectedFormat.label}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {FORMAT_OPTIONS.map((fmt) => (
                <button
                  key={fmt.label}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`py-1.5 text-xs sm:text-sm font-bold rounded-xl border transition-all text-center cursor-pointer ${
                    selectedFormat.label === fmt.label
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {fmt.text || fmt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action button with direct Add to Cart */}
        <div className="mt-3.5 pt-3 border-t border-gray-100">
          <motion.button
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={handleAddToCart}
            className={`btn w-full py-3 px-4 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white shadow-md scale-98"
                : "btn-primary hover:shadow-md text-white"
            }`}
          >
            {isAdded ? (
              <>
                <i className="hgi hgi-stroke hgi-tick-double-02 text-lg text-white animate-bounce" />
                <span>Ajouté au panier !</span>
              </>
            ) : (
              <>
                <i className="hgi hgi-stroke hgi-shopping-cart-02 text-lg text-white" />
                <span>Ajouter au panier</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FirmFreshGrocery() {
  const { addItem } = useCart();
  const [selectedFifthFormat, setSelectedFifthFormat] = useState(FIFTH_FORMATS[0]);
  const [isFifthAdded, setIsFifthAdded] = useState(false);

  const handleAddFifth = () => {
    addItem({
      id: `${FIFTH_PRODUCT.id}-${selectedFifthFormat.label}`,
      title: `${FIFTH_PRODUCT.title} (${selectedFifthFormat.label})`,
      image: FIFTH_PRODUCT.image,
      currentPrice: `${selectedFifthFormat.price.toFixed(2)} €`,
      oldPrice: `${selectedFifthFormat.oldPrice.toFixed(2)} €`,
      pack: selectedFifthFormat.text,
    });
    setIsFifthAdded(true);
    setTimeout(() => setIsFifthAdded(false), 1200);
  };

  return (
    <section id="nos-epices" className="py-12 scroll-mt-20">
      <div className="container">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
          >
            Sélection d'Épices Fraîches & Rares
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm text-gray-500"
          >
            Sachets fraîcheur 100g hermétiques — 100% Naturel, sans conservateur ni additif.
          </motion.p>
        </div>

        {/* Centered 4-card grid with visible Kilo / Weight selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 5th Product Showcase with direct purchase */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-200/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto bg-gray-50/80 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-sm transition-all overflow-hidden"
          >
            {/* Top Header: Badge, Title, Rating, Description */}
            <div className="mb-5 flex flex-col gap-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-primary text-white py-1 px-3 rounded-full shadow-xs">
                  Sélection Prestige
                </span>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 py-1 px-2.5 rounded-full">
                  Économisez 20%
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {FIFTH_PRODUCT.title}
              </h3>

              <div className="flex items-center gap-x-2">
                <StarRating ratingPercentage={`${FIFTH_PRODUCT.ratingPercentage}%`} />
                <span className="text-xs text-gray-600 font-medium">
                  ({FIFTH_PRODUCT.ratingCount})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                {FIFTH_PRODUCT.description}
              </p>
            </div>

            {/* Product Image */}
            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[390px] rounded-2xl overflow-hidden bg-white p-2 border border-gray-200 shadow-xs mb-6 group flex items-center justify-center">
              <Image
                src={FIFTH_PRODUCT.image}
                alt={FIFTH_PRODUCT.alt}
                fill
                unoptimized
                className="object-contain p-2 scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-3.5 left-3.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-md flex items-center gap-1.5">
                <i className="hgi hgi-stroke hgi-leaf-01 text-xs text-emerald-400" />
                <span>Récolte Artisanale 2026</span>
              </div>
            </div>

            {/* Bottom Controls: Format Selection, Price, Direct Add to Cart */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Left: Format Selector */}
              <div className="flex flex-col gap-y-1.5">
                <span className="text-xs text-gray-600 font-bold">Choisir le format :</span>
                <div className="flex flex-wrap gap-2">
                  {FIFTH_FORMATS.map((fmt) => (
                    <button
                      key={fmt.label}
                      type="button"
                      onClick={() => setSelectedFifthFormat(fmt)}
                      className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedFifthFormat.label === fmt.label
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Middle: Price in Euros */}
              <div className="flex items-baseline gap-x-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {selectedFifthFormat.price.toFixed(2)} €
                </span>
                <span className="text-sm text-gray-400 line-through font-medium">
                  {selectedFifthFormat.oldPrice.toFixed(2)} €
                </span>
                <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {selectedFifthFormat.text}
                </span>
              </div>

              {/* Right: Direct Add to Cart Button */}
              <div className="flex items-center gap-2.5 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleAddFifth}
                  className={`btn py-3 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    isFifthAdded
                      ? "bg-emerald-600 text-white shadow-md"
                      : "btn-primary text-white hover:shadow-md"
                  }`}
                >
                  {isFifthAdded ? (
                    <>
                      <i className="hgi hgi-stroke hgi-tick-double-02 text-base text-white animate-bounce" />
                      <span>Ajouté au Panier !</span>
                    </>
                  ) : (
                    <>
                      <i className="hgi hgi-stroke hgi-shopping-cart-02 text-base text-white" />
                      <span>Ajouter au Panier</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
