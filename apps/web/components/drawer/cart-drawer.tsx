"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const pathname = usePathname();
  const { items, totalCount, subtotal, removeItem, updateQuantity } = useCart();

  // Close cart drawer on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-drawer"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="cart-sidebar fixed right-0 top-0 h-full z-99 max-w-[460px] w-full bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Cart Header */}
          <div className="cart-products-header p-5 border-b border-gray-100 flex items-center justify-between relative bg-white">
            <div>
              <h5 className="font-extrabold text-gray-900 text-xl">
                Votre Panier
              </h5>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                {totalCount} {totalCount > 1 ? "articles sélectionnés" : "article sélectionné"}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer le panier"
              className="cursor-pointer inline-flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-xl text-gray-700" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="cart-products-content p-5 flex flex-col gap-y-3.5 overflow-y-auto flex-1">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <span className="size-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <i className="hgi hgi-stroke hgi-shopping-cart-01 text-4xl" />
                </span>
                <p className="text-gray-900 font-bold text-lg">
                  Votre panier est vide
                </p>
                <p className="text-sm text-gray-600 mt-1 max-w-xs leading-relaxed">
                  Ajoutez vos épices et poivres d'exception pour commencer vos achats.
                </p>
              </div>
            ) : (
              items.map((product) => (
                <div
                  key={product.id}
                  className="cart-product-item flex items-center gap-x-4 p-4 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors bg-white shadow-2xs"
                >
                  <div className="size-20 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-1">
                    <Image
                      src={product.image || "/images/products/pack-4-saveurs-sulson.jpg"}
                      alt={product.title}
                      width={80}
                      height={80}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1.5 flex-1">
                    <div className="flex items-start justify-between gap-x-2">
                      <h6 className="text-base font-bold text-gray-900 line-clamp-1">
                        {product.title}
                      </h6>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        aria-label="Supprimer"
                      >
                        <i className="hgi hgi-stroke hgi-delete-01 text-lg" />
                      </button>
                    </div>
                    {product.pack && (
                      <p className="text-xs sm:text-sm font-semibold text-gray-600">
                        Format : <span className="text-primary font-bold">{product.pack}</span>
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base sm:text-lg font-extrabold text-gray-950">
                        {product.currentPrice}
                      </span>

                      {/* Quantity Controls */}
                      <div className="border border-gray-200 inline-flex items-center justify-center rounded-full py-1 px-3 gap-x-3 bg-gray-50">
                        <button
                          className="hover:text-primary transition-colors text-gray-700 inline-flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          aria-label="Diminuer quantité"
                        >
                          <i className="hgi hgi-stroke hgi-remove-circle text-lg" />
                        </button>
                        <span className="text-sm font-extrabold text-gray-950 min-w-4 text-center">
                          {product.quantity}
                        </span>
                        <button
                          className="hover:text-primary transition-colors text-gray-700 inline-flex items-center justify-center cursor-pointer"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                          aria-label="Augmenter quantité"
                        >
                          <i className="hgi hgi-stroke hgi-add-circle text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          <div className="cart-products-footer p-6 border-t border-gray-200 flex flex-col gap-y-4 bg-gray-50">
            <div className="cart-subtotal flex items-center justify-between">
              <span className="text-base font-bold text-gray-800">Sous-total :</span>
              <span className="text-2xl font-extrabold text-gray-950">
                {subtotal.toFixed(2)} €
              </span>
            </div>
            <div className="cart-buttons flex items-center gap-x-3">
              <Link
                href="/cart-single-vendor"
                onClick={onClose}
                className="btn btn-default outline btn-large rounded-full flex-1 shadow-none text-center font-bold text-sm sm:text-base py-3 cursor-pointer"
              >
                Voir le panier
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn btn-primary btn-large rounded-full flex-1 text-center font-bold text-sm sm:text-base py-3 shadow-md cursor-pointer text-white"
              >
                Commander
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

