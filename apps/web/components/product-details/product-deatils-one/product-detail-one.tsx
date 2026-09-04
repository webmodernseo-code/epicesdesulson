"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/common/star-rating";
import { useCart } from "@/context/cart-context";

const PRODUCT_IMAGES = [
  {
    id: 1,
    src: "/images/home-3/nuts.png",
    alt: "Poivre Rouge de Kampot IGP - Vue Principale",
    label: "Pot 100g",
  },
  {
    id: 2,
    src: "/images/home-3/pouch-mockup.png",
    alt: "Curry Royal de Madras d'Exception",
    label: "Sachet Kraft",
  },
  {
    id: 3,
    src: "/images/home-3/avocado.png",
    alt: "Gousses de Vanille Bourbon Gourmet",
    label: "Tube Verre",
  },
  {
    id: 4,
    src: "/images/home-3/watermelon.png",
    alt: "Mélange d'Épices Festives Bio",
    label: "Format 250g",
  },
];

const SPICE_FORMATS = [
  { id: "100g", label: "Pot Verre 100g", price: 16.5, oldPrice: 19.9, desc: "Format Découverte" },
  { id: "250g", label: "Bocal Gourmet 250g", price: 38.0, oldPrice: 45.0, desc: "Le plus populaire" },
  { id: "500g", label: "Format 500g", price: 69.0, oldPrice: 85.0, desc: "Cuisine quotidienne" },
  { id: "1kg", label: "Grand Format 1 Kg", price: 129.0, oldPrice: 155.0, desc: "Format Grand Chef" },
];

const GRIND_OPTIONS = [
  { id: "whole", label: "Grains Entiers", desc: "Conservation et arômes intacts" },
  { id: "coarse", label: "Concassé Artisanal", desc: "Idéal viandes & mortier" },
  { id: "fine", label: "Mouture Fine", desc: "Prêt à saupoudrer" },
];

export default function ProductDetailOne() {
  const { addItem } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState(SPICE_FORMATS[0]);
  const [selectedGrind, setSelectedGrind] = useState(GRIND_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityChange = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: 301,
      title: `Poivre Rouge de Kampot IGP (${selectedFormat.label} - ${selectedGrind.label})`,
      currentPrice: `${selectedFormat.price.toFixed(2)} €`,
      oldPrice: `${selectedFormat.oldPrice.toFixed(2)} €`,
      image: PRODUCT_IMAGES[activeImageIndex].src,
      quantity: quantity,
      pack: selectedFormat.label,
    });
    setIsAdded(true);
    toast.success(`${quantity}x Poivre Rouge de Kampot (${selectedFormat.label}) ajouté au panier !`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Side: Product Gallery */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 w-full sm:w-auto shrink-0 justify-center sm:justify-start">
                {PRODUCT_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    type="button"
                    className={`relative size-16 sm:size-20 rounded-2xl p-2 bg-gray-50 border-2 transition-all cursor-pointer overflow-hidden flex items-center justify-center ${
                      activeImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20 shadow-sm bg-white scale-105"
                        : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={64}
                      height={64}
                      className="object-contain max-h-full max-w-full"
                    />
                  </button>
                ))}
              </div>

              {/* Main Display Image */}
              <div className="w-full order-1 sm:order-2">
                <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px] rounded-3xl bg-gray-50/70 border border-gray-200 shadow-xs p-6 flex items-center justify-center overflow-hidden">
                  {/* Badge Certification */}
                  <span className="absolute top-4 left-4 bg-emerald-950 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <i className="hgi hgi-stroke hgi-shield-check text-xs text-amber-300" />
                    Certifié Grand Cru IGP
                  </span>

                  <span className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    Récolte 2026
                  </span>

                  <Image
                    src={PRODUCT_IMAGES[activeImageIndex].src}
                    alt={PRODUCT_IMAGES[activeImageIndex].alt}
                    width={320}
                    height={320}
                    className="object-contain max-h-full max-w-full drop-shadow-lg hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Quick Guarantees Bar (Crisp SVG Icons) */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5">
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary mb-1">
                  <i className="hgi hgi-stroke hgi-leaf-01 text-base" />
                </span>
                <p className="text-xs font-bold text-gray-900 mt-1">100% Naturel</p>
                <p className="text-[11px] text-gray-500">Sans additif ni arôme</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5">
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary mb-1">
                  <i className="hgi hgi-stroke hgi-truck text-base" />
                </span>
                <p className="text-xs font-bold text-gray-900 mt-1">Livraison 48h</p>
                <p className="text-[11px] text-gray-500">Offerte dès 50€</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5">
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary mb-1">
                  <i className="hgi hgi-stroke hgi-archive text-base" />
                </span>
                <p className="text-xs font-bold text-gray-900 mt-1">Pot Hermétique</p>
                <p className="text-[11px] text-gray-500">Conservation 24 mois</p>
              </div>
            </div>
          </div>

          {/* Right Side: Spice Options & Purchase Form */}
          <div className="lg:col-span-6 xl:col-span-6 mt-8 lg:mt-0">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              {/* Category & Origin */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Poivres Rares & Baies Sauvages
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <i className="hgi hgi-stroke hgi-location-01 text-xs" />
                  Kampot (Cambodge)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-2">
                Poivre Rouge de Kampot IGP
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <StarRating ratingPercentage={"95%"} />
                <span className="text-xs text-gray-600 font-medium">
                  4.9/5 (142 avis vérifiés)
                </span>
                <span className="text-xs text-emerald-700 font-bold ml-2">
                  • En stock (Récolte fraîche)
                </span>
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-3xl font-extrabold text-primary">
                  {selectedFormat.price.toFixed(2)} €
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {selectedFormat.oldPrice.toFixed(2)} €
                </span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  Économisez {(selectedFormat.oldPrice - selectedFormat.price).toFixed(2)} €
                </span>
              </div>

              {/* Format / Weight Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    1. Format / Contenance :
                  </label>
                  <span className="text-xs font-semibold text-primary">
                    {selectedFormat.label} ({selectedFormat.desc})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SPICE_FORMATS.map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        selectedFormat.id === fmt.id
                          ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-900">{fmt.label}</span>
                        <span className="text-xs font-extrabold text-primary">{fmt.price.toFixed(2)} €</span>
                      </div>
                      <span className="text-[11px] text-gray-500 block mt-0.5">{fmt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind / Milling Option */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    2. Type de Mouture :
                  </label>
                  <span className="text-xs font-semibold text-primary">
                    {selectedGrind.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {GRIND_OPTIONS.map((grind) => (
                    <button
                      key={grind.id}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        selectedGrind.id === grind.id
                          ? "border-primary bg-primary text-white shadow-xs"
                          : "border-gray-200 hover:border-gray-300 text-gray-800 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold block">{grind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-2 w-full sm:w-36 shrink-0 bg-gray-50">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    aria-label="Diminuer quantité"
                    className="size-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 shadow-2xs transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    aria-label="Augmenter quantité"
                    className="size-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700 shadow-2xs transition cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`btn flex-1 w-full py-3 px-6 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded ? "bg-emerald-700 text-white" : "btn-primary text-white"
                  }`}
                >
                  <i className="hgi hgi-stroke hgi-shopping-cart-01 text-lg" />
                  <span>{isAdded ? "Ajouté au Panier !" : "Ajouter au Panier"}</span>
                </button>
              </div>

              {/* Direct WhatsApp Advice */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Conseils culinaires personnalisés disponibles
                </span>
                <Link
                  href="/contact"
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Discuter en direct</span>
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
