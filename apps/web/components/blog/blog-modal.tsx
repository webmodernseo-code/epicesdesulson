"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";

export interface BlogArticle {
  id: string;
  slug?: string;
  image: string;
  imageVerso?: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  price?: number;
  weight?: string;
  ingredients?: string[];
  cookingSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
  paragraphs?: {
    heading?: string;
    text: string;
  }[];
  pairings?: string[];
  tip?: string;
  origin?: string;
}

interface BlogModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export default function BlogModal({ article, onClose }: BlogModalProps) {
  const { addItem } = useCart();
  const [activeSide, setActiveSide] = useState<"recto" | "verso">("recto");
  const [isAdded, setIsAdded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
      setActiveSide("recto");
      setIsAdded(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const currentDisplayImage =
    activeSide === "verso" && article?.imageVerso
      ? article.imageVerso
      : article?.image || "/images/products/pack-4-saveurs-sulson.jpg";

  const itemPrice = article?.price || 6.9;
  const productSlug =
    article?.slug ||
    (article?.id === "epice-poulet-recette"
      ? "epice-poulet-100g"
      : article?.id === "epice-viande-recette"
      ? "epice-viande-100g"
      : article?.id === "epice-poisson-recette"
      ? "epice-poisson-100g"
      : article?.id === "secret-sulson-gourmande"
      ? "secret-de-sulson-100g"
      : "pack-integral-4-saveurs");

  const handleAddToCart = () => {
    if (!article) return;
    addItem({
      id: `${productSlug}-100g`,
      title: `${article.title} (Sachet 100g)`,
      image: article.image,
      currentPrice: `${itemPrice.toFixed(2)} €`,
      oldPrice: "8.50 €",
      pack: "Sachet hermétique zippé 100g",
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden my-4 max-h-[92vh] flex flex-col border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-5 sm:px-7 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70 shrink-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                  <span className="size-1.5 rounded-full bg-emerald-600" />
                  {article.category}
                </span>
                <span className="hidden sm:inline-block text-xs text-gray-500 font-medium">
                  • Fiche Recette & Savoir-faire Sulson
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="size-9 bg-white hover:bg-gray-100 text-gray-700 hover:text-black rounded-full flex items-center justify-center transition-all border border-gray-200 shadow-2xs"
              >
                <i className="hgi hgi-stroke hgi-multiplication-sign text-lg" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-7">
              {/* 2-Column Split: Image Showcase on Left / Core Presentation on Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* Left Column: Product Pouch Image (Uncropped & Clear) */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-full bg-linear-to-b from-gray-50 to-amber-50/30 rounded-2xl sm:rounded-3xl border border-gray-200/90 p-4 sm:p-6 flex items-center justify-center min-h-[280px] sm:min-h-[340px] shadow-2xs group">
                    {/* Weight Badge */}
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs z-10">
                      {article.weight || "100g"}
                    </span>

                    {/* Recto / Verso Toggle */}
                    {article.imageVerso && (
                      <div className="absolute top-3 right-3 z-10 flex bg-white/90 backdrop-blur-xs rounded-full p-0.5 border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setActiveSide("recto")}
                          className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                            activeSide === "recto"
                              ? "bg-primary text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Face
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSide("verso")}
                          className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                            activeSide === "verso"
                              ? "bg-primary text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Dos
                        </button>
                      </div>
                    )}

                    {/* Uncropped Image Display */}
                    <div className="relative w-full h-[240px] sm:h-[280px] flex items-center justify-center">
                      <Image
                        src={currentDisplayImage}
                        alt={article.title}
                        width={300}
                        height={300}
                        unoptimized
                        className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300"
                      />
                    </div>

                    {/* Quality Badges footer in image card */}
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-700 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-full border border-gray-200">
                      <i className="hgi hgi-stroke hgi-leaf-01 text-emerald-600 text-xs" />
                      <span>100% Naturel • Zéro MSG</span>
                    </div>
                  </div>

                  {/* Micro Badges Under Image */}
                  <div className="w-full mt-3 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-2 text-[11px] text-gray-700 font-medium">
                      🇨🇲 <strong className="text-gray-900">Origine :</strong> Terroir Cameroun
                    </div>
                    <div className="bg-gray-50 border border-gray-200/80 rounded-xl py-2 px-2 text-[11px] text-gray-700 font-medium">
                      🔒 <strong className="text-gray-900">Emballage :</strong> Sachet Zippé
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Subtitle, Highlights & Add to Cart */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-950 leading-tight mb-2">
                      {article.title}
                    </h2>

                    {article.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-primary mb-3">
                        {article.subtitle}
                      </p>
                    )}

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {article.description}
                    </p>

                    {/* Price Tag & Stock */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/70 mb-5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-extrabold text-gray-950">
                          {itemPrice.toFixed(2)} €
                        </span>
                        <span className="text-xs text-gray-400 line-through font-medium">
                          8.50 €
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        En stock • Expédition 24h
                      </span>
                    </div>

                    {/* Ingredients Highlights */}
                    {article.ingredients && article.ingredients.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <i className="hgi hgi-stroke hgi-plant-02 text-emerald-600 text-sm" />
                          <span>Composition 100% Naturelle :</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {article.ingredients.map((ing, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-medium bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200/70"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions: Add to cart & Full Page */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`btn w-full sm:w-auto flex-1 py-3 px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "btn-primary text-white hover:shadow-md"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <i className="hgi hgi-stroke hgi-tick-double-02 text-base text-white animate-bounce" />
                          <span>Ajouté au panier !</span>
                        </>
                      ) : (
                        <>
                          <i className="hgi hgi-stroke hgi-shopping-cart-02 text-base text-white" />
                          <span>Commander ce sachet (6,90 €)</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/products/${productSlug}`}
                      onClick={onClose}
                      className="w-full sm:w-auto py-3 px-5 text-center rounded-full font-bold text-xs sm:text-sm bg-white text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Voir la page produit</span>
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-sm" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recipe Steps Section */}
              {article.cookingSteps && article.cookingSteps.length > 0 && (
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-primary" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Guide & Recette Pas à Pas du Chef
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {article.cookingSteps.map((step) => (
                      <div
                        key={step.step}
                        className="bg-gray-50/90 border border-gray-200/80 rounded-2xl p-4 flex items-start gap-3.5"
                      >
                        <span className="size-7 rounded-xl bg-primary text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {step.step}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-950 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Paragraphs */}
              {article.paragraphs && article.paragraphs.length > 0 && (
                <div className="space-y-4 text-gray-600 text-xs sm:text-sm leading-relaxed pt-4 border-t border-gray-100">
                  {article.paragraphs.map((p, idx) => (
                    <div key={idx} className="bg-gray-50/60 p-4 rounded-xl border border-gray-100">
                      {p.heading && (
                        <h4 className="text-gray-900 font-bold text-xs sm:text-sm flex items-center gap-2 mb-1">
                          <span className="size-1.5 rounded-full bg-primary inline-block" />
                          {p.heading}
                        </h4>
                      )}
                      <p className="text-gray-600 pl-3.5">{p.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Pairings (Accords Gourmands) */}
              {article.pairings && article.pairings.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <i className="hgi hgi-stroke hgi-restaurant text-primary text-sm" />
                    <span>Accords & Plats Recommandés :</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {article.pairings.map((pair, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs font-semibold text-gray-800 bg-amber-50/70 border border-amber-200/60 px-3 py-1 rounded-full"
                      >
                        🍽️ {pair}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chef's Secret Tip */}
              {article.tip && (
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                  <span className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                    <i className="hgi hgi-stroke hgi-idea-01 text-xl" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-950 mb-0.5">
                      Le Secret Culinaire de la Maison Sulson
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {article.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-500">
                Paiement 100% sécurisé • Livraison Colissimo 48-72h
              </span>
              <button
                type="button"
                onClick={onClose}
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-full text-xs font-bold transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
