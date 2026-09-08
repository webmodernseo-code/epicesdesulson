"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useProductRatings } from "@/context/ratings-context";
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
  category: string;
  origin: string;
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
    title: "Épice Spéciale Poulet",
    category: "Épices Volailles & Rôtis",
    origin: "Cameroun (Recette Traditionnelle)",
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
    title: "Épice Spéciale Viande",
    category: "Épices Viandes & Grillades",
    origin: "Cameroun (Recette Traditionnelle)",
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
    title: "Épice Spéciale Poisson",
    category: "Épices Poissons & Marinades",
    origin: "Cameroun (Poivre de Guinée)",
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
    title: "Épice Saveur Gourmande",
    category: "Assaisonnements Signatures",
    origin: "Cameroun (Le Secret de Sulson)",
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
  category: "Packs & Coffrets Gourmets",
  origin: "Atelier Sulson (Pack Lot 4)",
  description:
    "L'assortiment complet réunissant nos 4 créations artisanales : Poulet (Jaune), Viande (Rouge), Poisson (Bleu) et Saveur Gourmande (Orange). 100% Naturel, sans additif ni conservateur. Tout le terroir culinaire camerounais réuni dans votre cuisine !",
  discount: "-15%",
  ratingCount: "312 avis vérifiés",
  ratingPercentage: 99,
};

function ProductCard({ product }: { product: SpiceProduct }) {
  const { addItem } = useCart();
  const { getRating } = useProductRatings();
  const ratingStat = getRating(product.id);
  const [selectedFormat] = useState<FormatOption>(FORMAT_OPTIONS[0]);
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: parseFloat(product.delay) }}
      className="h-full"
    >
      <div className="border border-gray-200/90 rounded-2xl p-2.5 sm:p-4 bg-white hover:border-primary hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group shadow-2xs">
        <div>
          {/* Image (Zoomed Recto / Verso on hover) */}
          <div className="relative rounded-xl overflow-hidden mb-2 sm:mb-3 bg-gray-50/80 h-[125px] sm:h-[210px] md:h-[230px] flex items-center justify-center p-1">
            <span className="absolute top-2 left-2 bg-primary text-white text-[9px] sm:text-[11px] font-extrabold tracking-wider py-0.5 px-2 sm:py-1 sm:px-2.5 rounded-full shadow-xs z-10">
              100g
            </span>
            <Image
              src={product.image}
              alt={product.alt}
              width={260}
              height={220}
              unoptimized
              className={`w-full h-full object-contain transition-all duration-300 transform ${
                product.hoverImage
                  ? "scale-105 group-hover:opacity-0 group-hover:scale-95"
                  : "scale-105 group-hover:scale-110"
              }`}
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={`${product.alt} - Verso`}
                width={260}
                height={220}
                unoptimized
                className="w-full h-full object-contain absolute inset-0 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-110 transition-all duration-300"
              />
            )}
          </div>

          {/* Catégorie Badge */}
          <div className="mb-1.5 flex items-center">
            <span className="text-[9px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 border border-emerald-200/60 px-2 py-0.5 rounded-md truncate">
              {product.category}
            </span>
          </div>

          {/* Dynamic Rating Section */}
          <div className="rating-section flex items-center mb-1 scale-90 sm:scale-100 origin-left">
            <StarRating rating={ratingStat.ratingScore} />
            <span className="text-[10px] sm:text-xs text-gray-600 ml-1.5 font-semibold">
              {ratingStat.ratingScore.toFixed(1)} ({ratingStat.ratingCount} avis)
            </span>
          </div>

          {/* Product Title */}
          <h4 className="text-xs sm:text-base font-bold text-gray-900 line-clamp-1 mb-1" title={product.title}>
            {product.title}
          </h4>

          {/* Price Section */}
          <div className="flex items-baseline gap-x-1.5 sm:gap-x-2">
            <span className="text-sm sm:text-xl font-extrabold text-gray-950">
              {currentPriceNum} €
            </span>
            <span className="text-[11px] sm:text-xs text-gray-400 line-through font-medium">
              {oldPriceNum} €
            </span>
          </div>

          {/* Terroir d'origine & Poids */}
          <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-y-1">
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
              <svg
                className="size-3 text-emerald-600 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="truncate font-medium text-gray-700">
                <strong className="font-semibold text-gray-900">Terroir :</strong> {product.origin}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 font-medium">
              <span>Poids net :</span>
              <span className="font-bold text-primary">100g</span>
            </div>
          </div>
        </div>

        {/* Action button with direct Add to Cart (Compact on mobile) */}
        <div className="mt-2.5 sm:mt-3 pt-1.5">
          <motion.button
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={handleAddToCart}
            className={`btn w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-full text-[11px] sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-2 shadow-xs transition-all cursor-pointer ${
              isAdded
                ? "bg-emerald-600 text-white shadow-xs scale-98"
                : "btn-primary hover:shadow-xs text-white"
            }`}
          >
            {isAdded ? (
              <>
                <i className="hgi hgi-stroke hgi-tick-double-02 text-xs sm:text-sm text-white animate-bounce" />
                <span>Ajouté !</span>
              </>
            ) : (
              <>
                <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xs sm:text-sm text-white" />
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
  const { getRating } = useProductRatings();
  const [selectedFifthFormat] = useState(FIFTH_FORMATS[0]);
  const [isFifthAdded, setIsFifthAdded] = useState(false);
  const fifthRating = getRating(FIFTH_PRODUCT.id);

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
    <section id="nos-epices" className="py-8 sm:py-14 scroll-mt-20">
      <div className="container">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5"
          >
            Sélection d'Épices Fraîches & Rares
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xs sm:text-sm text-gray-500"
          >
            Sachets fraîcheur 100g hermétiques — 100% Naturel, sans conservateur ni additif.
          </motion.p>
        </div>

        {/* Centered 4-card grid: 2 columns on Mobile, 4 columns on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {FOUR_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 5th Product Showcase with direct purchase */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-gray-200/60">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-gray-50/80 border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xs hover:shadow-xs transition-all overflow-hidden"
          >
            {/* Top Header: Badge, Title, Rating, Description */}
            <div className="mb-4 sm:mb-5 flex flex-col gap-y-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-primary text-white py-0.5 px-2.5 rounded-full shadow-2xs">
                  Sélection Prestige
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 py-0.5 px-2.5 rounded-full">
                  {FIFTH_PRODUCT.category}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold bg-amber-100 text-amber-900 py-0.5 px-2 rounded-full">
                  Économisez 15%
                </span>
              </div>

              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                {FIFTH_PRODUCT.title}
              </h3>

              <div className="flex items-center gap-x-1.5">
                <StarRating rating={fifthRating.ratingScore} />
                <span className="text-[10px] sm:text-xs text-gray-600 font-semibold">
                  {fifthRating.ratingScore.toFixed(1)} ({fifthRating.ratingCount} avis vérifiés)
                </span>
              </div>

              {/* Terroir Badge for 5th Product */}
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 bg-white/90 border border-gray-200 rounded-xl px-3 py-1.5 w-fit shadow-2xs">
                <svg
                  className="size-3.5 sm:size-4 text-emerald-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  <strong className="font-semibold text-gray-900">Terroir d'origine :</strong> {FIFTH_PRODUCT.origin}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl pt-1">
                {FIFTH_PRODUCT.description}
              </p>
            </div>

            {/* Product Image */}
            <div className="relative w-full h-[180px] sm:h-[300px] md:h-[360px] rounded-xl sm:rounded-2xl overflow-hidden bg-white p-2 border border-gray-200 shadow-2xs mb-4 sm:mb-6 group flex items-center justify-center">
              <span className="absolute top-3 left-3 bg-primary text-white text-[10px] sm:text-xs font-bold tracking-wider py-1 px-3 rounded-full shadow-xs z-10">
                Lot 4 x 100g
              </span>
              <Image
                src={FIFTH_PRODUCT.image}
                alt={FIFTH_PRODUCT.alt}
                fill
                unoptimized
                className="object-contain p-2 scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold py-0.5 px-2.5 rounded-full shadow-md flex items-center gap-1">
                <i className="hgi hgi-stroke hgi-leaf-01 text-[11px] text-emerald-400" />
                <span>Récolte Artisanale 2026</span>
              </div>
            </div>

            {/* Bottom Controls: Price, Direct Add to Cart */}
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              {/* Left: Price in Euros */}
              <div className="flex items-baseline gap-x-2 sm:gap-x-3">
                <span className="text-xl sm:text-3xl font-extrabold text-gray-900">
                  {selectedFifthFormat.price.toFixed(2)} €
                </span>
                <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
                  {selectedFifthFormat.oldPrice.toFixed(2)} €
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Coffret 4x100g (400g)
                </span>
              </div>

              {/* Right: Direct Add to Cart Button */}
              <div className="flex items-center gap-2.5 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleAddFifth}
                  className={`btn py-2 sm:py-3 px-4 sm:px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer w-full sm:w-auto ${
                    isFifthAdded
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "btn-primary text-white hover:shadow-xs"
                  }`}
                >
                  {isFifthAdded ? (
                    <>
                      <i className="hgi hgi-stroke hgi-tick-double-02 text-sm sm:text-base text-white animate-bounce" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <i className="hgi hgi-stroke hgi-shopping-cart-02 text-sm sm:text-base text-white" />
                      <span>Ajouter le Pack au panier</span>
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
