"use client";

import { useQuickView } from "@/context/quick-view-context";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";
import { useCart } from "@/context/cart-context";
import { useProductRatings } from "@/context/ratings-context";

const SULSON_FORMATS = [
  { id: "100g", name: "Sachet Kraft Zippé 100g", price: 5.99, oldPrice: 7.50 },
  { id: "pack-4", name: "Pack Intégral 4 Saveurs 400g", price: 23.96, oldPrice: 29.90 },
];

interface QuickViewDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function QuickViewDrawer({ isOpen: propIsOpen, onClose: propOnClose }: QuickViewDrawerProps) {
  const { isOpen: contextIsOpen, selectedProduct, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const { getRating } = useProductRatings();
  const isOpen = propIsOpen !== undefined ? propIsOpen : contextIsOpen;
  const handleClose = propOnClose || closeQuickView;
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState(SULSON_FORMATS[0].id);
  const [activeSide, setActiveSide] = useState<"recto" | "verso">("recto");
  const [isAdded, setIsAdded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const prodRating = getRating(selectedProduct?.id || 301);

  // Reset state when drawer opens with a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedFormat(SULSON_FORMATS[0].id);
      setActiveSide("recto");
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

  const currentFormatObj = SULSON_FORMATS.find((f) => f.id === selectedFormat) || SULSON_FORMATS[0];
  const calculatedPrice = currentFormatObj.price.toFixed(2);
  const calculatedOldPrice = currentFormatObj.oldPrice.toFixed(2);

  // Derive product slug
  const productSlug =
    selectedProduct?.slug ||
    (String(selectedProduct?.id) === "301"
      ? "epice-poulet-100g"
      : String(selectedProduct?.id) === "302"
      ? "epice-viande-100g"
      : String(selectedProduct?.id) === "303"
      ? "epice-poisson-100g"
      : String(selectedProduct?.id) === "304"
      ? "secret-de-sulson-100g"
      : "pack-integral-4-saveurs");

  // Derive verso image if available
  const versoImage =
    selectedProduct?.imageVerso ||
    (String(selectedProduct?.id) === "301"
      ? "/images/products/epice-poulet-verso.jpg"
      : String(selectedProduct?.id) === "302"
      ? "/images/products/epice-viande-verso.jpg"
      : String(selectedProduct?.id) === "303"
      ? "/images/products/epice-poisson-verso.jpg"
      : String(selectedProduct?.id) === "304"
      ? "/images/products/epice-gourmande-verso.jpg"
      : undefined);

  const isPackSelected = selectedFormat === "pack-4";
  const displayImage = isPackSelected
    ? "/images/products/pack-4-saveurs-sulson.jpg"
    : activeSide === "verso" && versoImage
    ? versoImage
    : selectedProduct?.image || "/images/products/pack-4-saveurs-sulson.jpg";

  const handleAddToCart = () => {
    addItem({
      id: `${selectedProduct?.id || 301}-${selectedFormat}`,
      title: `${selectedProduct?.title || "Épice Sulson"} (${currentFormatObj.name})`,
      currentPrice: `${calculatedPrice} €`,
      oldPrice: `${calculatedOldPrice} €`,
      image: isPackSelected ? "/images/products/pack-4-saveurs-sulson.jpg" : selectedProduct?.image || "/images/products/pack-4-saveurs-sulson.jpg",
      pack: currentFormatObj.name,
      quantity: quantity,
    });
    setIsAdded(true);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-99"
          />

          {/* Drawer */}
          <motion.div
            key="quick-view-drawer"
            ref={drawerRef}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
            className="quick-view-sidebar fixed xl:top-[30px] xl:right-[22px] right-0 top-0 xl:h-[calc(100vh-52px)] h-full z-99 max-w-[850px] w-full bg-white xl:rounded-3xl rounded-none shadow-2xl overflow-hidden flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 relative flex items-center justify-between bg-gray-50/70">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-primary" />
                <h5 className="font-bold text-gray-900 text-sm sm:text-base">
                  Aperçu Rapide • Les Épices de Sulson
                </h5>
              </div>
              <button
                onClick={handleClose}
                aria-label="Fermer"
                className="size-9 rounded-full bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 transition shadow-2xs"
              >
                <i className="hgi hgi-stroke hgi-multiplication-sign text-lg" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                {/* Product Image Uncropped */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-full h-[270px] sm:h-[320px] rounded-3xl bg-linear-to-b from-gray-50 to-amber-50/30 border border-gray-200 p-4 flex items-center justify-center shadow-2xs">
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10">
                      100% Naturel
                    </span>

                    {versoImage && (
                      <div className="absolute top-3 right-3 z-10 flex bg-white/90 backdrop-blur-xs rounded-full p-0.5 border border-gray-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setActiveSide("recto")}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                            activeSide === "recto"
                              ? "bg-primary text-white"
                              : "text-gray-600"
                          }`}
                        >
                          Face
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSide("verso")}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                            activeSide === "verso"
                              ? "bg-primary text-white"
                              : "text-gray-600"
                          }`}
                        >
                          Dos
                        </button>
                      </div>
                    )}

                    <Image
                      className="max-h-full max-w-full object-contain drop-shadow-md"
                      src={displayImage}
                      alt={selectedProduct?.title || "Épice Sulson"}
                      width={280}
                      height={280}
                      unoptimized
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full w-full border border-emerald-200/60">
                    <i className="hgi hgi-stroke hgi-leaf-01 text-sm text-emerald-600" />
                    <span>Zéro Glutamate (Sans MSG) • 0% Sel de remplissage</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="md:col-span-7 flex flex-col justify-start">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Terroir d'Excellence Cameroun
                  </span>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-gray-950 mb-2 leading-snug">
                    {selectedProduct?.title || "Épice Rare & Finesse"}
                  </h4>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={prodRating.ratingScore} />
                    <span className="text-xs text-gray-600 font-medium">
                      {prodRating.ratingScore.toFixed(1)}/5 ({prodRating.ratingCount} avis vérifiés)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="text-2xl font-extrabold text-gray-950">
                      {calculatedPrice} €
                    </span>
                    <span className="text-xs text-gray-400 line-through font-medium">
                      {calculatedOldPrice} €
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      TTC
                    </span>
                  </div>

                  {/* Format Selector */}
                  <div className="mb-5">
                    <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
                      Format sélectionné :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SULSON_FORMATS.map((fmt) => (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setSelectedFormat(fmt.id)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex flex-col justify-between ${
                            selectedFormat === fmt.id
                              ? "border-primary bg-primary text-white shadow-2xs"
                              : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                          }`}
                        >
                          <span>{fmt.name}</span>
                          <span className={selectedFormat === fmt.id ? "text-amber-200 font-extrabold text-xs" : "text-primary font-bold text-xs"}>
                            {fmt.price.toFixed(2)} €
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & CTA */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
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
                        className={`btn flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isAdded ? "bg-emerald-600 text-white" : "btn-primary text-white"
                        }`}
                      >
                        <i className="hgi hgi-stroke hgi-shopping-cart-01 text-base" />
                        <span>{isAdded ? "Ajouté !" : "Ajouter au Panier"}</span>
                      </button>
                    </div>

                    <Link
                      href={`/products/${productSlug}`}
                      onClick={handleClose}
                      className="w-full py-2.5 px-4 text-center rounded-full text-xs font-bold text-gray-700 hover:text-primary hover:bg-gray-50 border border-gray-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Consulter la fiche détaillée & recette</span>
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-sm" />
                    </Link>
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
