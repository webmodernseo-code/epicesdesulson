"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import { OfficialPaypalLogo } from "./payment-method-v1";

interface CheckoutCartSummaryProps {
  selectedMethod?: "stripe" | "paypal";
  isProcessing?: boolean;
  onPlaceOrder?: (coupon?: string) => void;
}

export default function CheckoutCartSummary1({
  selectedMethod = "stripe",
  isProcessing = false,
  onPlaceOrder,
}: CheckoutCartSummaryProps) {
  const { items, subtotal, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.9;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase().trim() === "SULSON10") {
      setDiscountApplied(true);
      toast.success("Code promo SULSON10 appliqué (-10%) !");
    } else {
      toast.error("Code promo invalide. Essayez SULSON10");
    }
  };

  const handleTriggerCheckout = () => {
    onPlaceOrder?.(discountApplied ? "SULSON10" : undefined);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white p-5 sm:p-6 shadow-2xs sticky top-6 flex flex-col gap-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-base">Récapitulatif de commande</h3>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
          {items.length} {items.length > 1 ? "articles" : "article"}
        </span>
      </div>

      {/* Cart Items List */}
      <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
        {items.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Votre panier est actuellement vide.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 relative group"
            >
              <div className="size-13 rounded-lg bg-white border border-gray-200/80 p-1 flex items-center justify-center shrink-0">
                <Image
                  src={item.image || "/images/products/pack-4-saveurs-sulson.jpg"}
                  alt={item.title}
                  width={44}
                  height={44}
                  unoptimized
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-gray-900 line-clamp-1 block">
                  {item.title}
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[11px] text-gray-500">
                    Quantité : <strong>{item.quantity}</strong>
                  </span>
                  <span className="text-xs font-extrabold text-gray-900">
                    {item.currentPrice}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label="Supprimer"
                className="text-gray-400 hover:text-red-500 p-1 transition cursor-pointer"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Coupon Code Input */}
      <form onSubmit={handleApplyCoupon} className="flex gap-2">
        <input
          type="text"
          placeholder="Code promo (ex: SULSON10)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-300 uppercase font-mono focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
        />
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          Appliquer
        </button>
      </form>

      {/* Totals Breakdown */}
      <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total articles</span>
          <span className="font-semibold text-gray-900">{subtotal.toFixed(2)} €</span>
        </div>

        {discountApplied && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Remise fidélité (SULSON10 -10%)</span>
            <span>-{discountAmount.toFixed(2)} €</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 items-center">
          <span>Frais de livraison</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] border border-emerald-100">
                Offerte
              </span>
            ) : (
              <span className="font-semibold text-gray-900">{shipping.toFixed(2)} €</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm sm:text-base font-extrabold text-gray-950 pt-2.5 border-t border-gray-200">
          <span>Total à régler</span>
          <span className="text-emerald-800 font-black">{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* Dynamic Place Order Action Button */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleTriggerCheckout}
        className={`${selectedMethod === "paypal" ? "w-56 sm:w-64 mx-auto h-11 px-5 rounded-full" : "w-full py-3.5 px-4 rounded-xl"} font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
          selectedMethod === "paypal"
            ? "bg-[#FFC439] hover:bg-[#F4BB38] active:bg-[#E9B131] text-gray-950 border border-[#E5A800]/40"
            : "bg-emerald-800 hover:bg-emerald-900 text-white"
        }`}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin size-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Traitement en cours...</span>
          </>
        ) : selectedMethod === "paypal" ? (
          <div className="flex items-center justify-center gap-2">
            <OfficialPaypalLogo className="h-5 w-auto" />
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              — Payer {total.toFixed(2)} € (1 fois)
            </span>
          </div>
        ) : (
          <>
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Payer par carte • {total.toFixed(2)} €</span>
          </>
        )}
      </button>

      {/* Discreet Security Assurances */}
      <div className="pt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5 border-t border-gray-100">
        <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>Transaction chiffrée SSL 256-bit certifiée PCI-DSS</span>
      </div>
    </div>
  );
}
