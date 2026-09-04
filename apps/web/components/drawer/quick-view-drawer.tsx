"use client";

import { useQuickView } from "@/context/quick-view-context";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

const SPICE_FORMATS = [
  { id: "100g", name: "Pot Verre 100g", multiplier: 1 },
  { id: "250g", name: "Bocal 250g", multiplier: 2.3 },
  { id: "500g", name: "Format 500g", multiplier: 4.2 },
  { id: "1kg", name: "Grand Format 1 Kg", multiplier: 7.8 },
];

const GRIND_OPTIONS = [
  { id: "whole", name: "Grains Entiers" },
  { id: "coarse", name: "Concassé" },
  { id: "fine", name: "Mouture Fine" },
];

interface QuickViewDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function QuickViewDrawer({ isOpen: propIsOpen, onClose: propOnClose }: QuickViewDrawerProps) {
  const { isOpen: contextIsOpen, selectedProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const isOpen = propIsOpen !== undefined ? propIsOpen : contextIsOpen;
  const handleClose = propOnClose || closeQuickView;
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(SPICE_FORMATS[0].id);
  const [selectedGrind, setSelectedGrind] = useState(GRIND_OPTIONS[0].id);
  const [isAdded, setIsAdded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Reset state when drawer opens with a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedFormat(SPICE_FORMATS[0].id);
      setSelectedGrind(GRIND_OPTIONS[0].id);
      setIsAdded(false);
    }
  }, [isOpen, selectedProduct]);

  // Outside click close
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleClose]);

  const basePriceNum = typeof selectedProduct?.price === "number" 
    ? selectedProduct.price 
    : parseFloat(String(selectedProduct?.currentPrice || selectedProduct?.price || "16.5").replace(/[^0-9.]/g, "")) || 16.5;

  const currentMultiplier = SPICE_FORMATS.find(f => f.id === selectedFormat)?.multiplier || 1;
  const calculatedPrice = (basePriceNum * currentMultiplier).toFixed(2);

  const handleAddToCart = () => {
    const fmt = SPICE_FORMATS.find(f => f.id === selectedFormat)?.name;
    const grind = GRIND_OPTIONS.find(g => g.id === selectedGrind)?.name;
    addItem({
      id: `${selectedProduct?.id || 301}-${selectedFormat}`,
      title: `${selectedProduct?.title || "Épice Sulson"} (${fmt})`,
      currentPrice: `${calculatedPrice} €`,
      image: selectedProduct?.image || "/images/products/pack-4-saveurs-sulson.jpg",
      pack: `${fmt} - ${grind}`,
      quantity: quantity,
    });
    setIsAdded(true);
    toast.success(`${quantity}x ${selectedProduct?.title || "Épice"} ajouté au panier !`);
    setTimeout(() => {
      setIsAdded(false);
      handleClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-99"
          />

          {/* Drawer */}
          <motion.div
            key="quick-view-drawer"
            ref={drawerRef}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
            className="quick-view-sidebar fixed xl:top-[30px] xl:right-[22px] right-0 top-0 xl:h-[calc(100vh-52px)] h-full z-99 max-w-[850px] w-full bg-white xl:rounded-3xl rounded-none shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 relative flex items-center justify-between bg-amber-50/40">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary" />
                <h5 className="font-bold text-gray-900 text-base">Aperçu Rapide de l'Épice</h5>
              </div>
              <button
                onClick={handleClose}
                aria-label="Fermer"
                className="size-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 transition"
              >
                <i className="hgi hgi-stroke hgi-multiplication-sign text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Product Image */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-full h-[260px] sm:h-[300px] rounded-3xl bg-amber-50/60 border border-amber-200/80 p-6 flex items-center justify-center relative shadow-sm">
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      Grand Cru
                    </span>
                    <Image
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                      src={selectedProduct?.image || "/images/home-3/nuts.png"}
                      alt={selectedProduct?.title || "Épice Sulson"}
                      width={280}
                      height={280}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full w-full">
                    <i className="hgi hgi-stroke hgi-leaf-01 text-sm text-emerald-600" />
                    <span>Récolte 100% Naturelle</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:col-span-7 flex flex-col justify-start">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Les Épices de Sulson
                  </span>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                    {selectedProduct?.title || "Épice Rare & Finesse"}
                  </h4>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating ratingPercentage={"95%"} />
                    <span className="text-xs text-gray-600 font-medium">
                      4.9/5 (Avis vérifiés)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="text-2xl font-extrabold text-primary">
                      {calculatedPrice} €
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                      TTC
                    </span>
                  </div>

                  {/* Format Selector */}
                  <div className="mb-5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                      Format / Poids :
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SPICE_FORMATS.map((fmt) => (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setSelectedFormat(fmt.id)}
                          className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                            selectedFormat === fmt.id
                              ? "border-primary bg-primary text-white shadow-xs"
                              : "border-gray-200 bg-white text-gray-800 hover:border-amber-300"
                          }`}
                        >
                          {fmt.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grind Selector */}
                  <div className="mb-6">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                      Mouture :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {GRIND_OPTIONS.map((grind) => (
                        <button
                          key={grind.id}
                          type="button"
                          onClick={() => setSelectedGrind(grind.id)}
                          className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                            selectedGrind === grind.id
                              ? "border-primary bg-primary text-white shadow-xs"
                              : "border-gray-200 bg-white text-gray-800 hover:border-amber-300"
                          }`}
                        >
                          {grind.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & CTA */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between border border-gray-300 rounded-full px-3 py-1.5 w-28 shrink-0 bg-gray-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="font-bold text-gray-700 hover:text-primary text-base"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="font-bold text-gray-700 hover:text-primary text-base"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className={`btn flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                        isAdded ? "bg-emerald-700 text-white" : "btn-primary text-white"
                      }`}
                    >
                      <i className="hgi hgi-stroke hgi-shopping-cart-01 text-base" />
                      <span>{isAdded ? "Ajouté !" : "Ajouter au Panier"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
