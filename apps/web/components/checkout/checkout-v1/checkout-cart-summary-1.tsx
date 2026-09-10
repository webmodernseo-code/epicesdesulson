"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import { OfficialPaypalLogo } from "./payment-method-v1";
import { ShieldCheck, Lock, Trash2, Truck, CheckCircle2 } from "lucide-react";

interface CheckoutCartSummaryProps {
  selectedMethod?: "stripe" | "paypal" | "apple_pay" | "card";
  isProcessing?: boolean;
  shippingCountry?: string;
  onPlaceOrder?: (coupon?: string) => void;
}

export default function CheckoutCartSummary1({
  selectedMethod = "stripe",
  isProcessing = false,
  shippingCountry = "France",
  onPlaceOrder,
}: CheckoutCartSummaryProps) {
  const { items, subtotal, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const countryNormalized = (shippingCountry || "France").trim().toLowerCase();
  const isFrance = countryNormalized === "france" || countryNormalized === "fr" || countryNormalized === "";

  // Shipping rules:
  // France: 10 € standard, Offert dès 45 €
  // Europe: 14 € standard, 4 € dès 45 €, Offert dès 60 €
  let shipping = 0;
  let targetThreshold = isFrance ? 45.0 : 60.0;

  if (subtotal > 0) {
    if (isFrance) {
      shipping = subtotal >= 45.0 ? 0.0 : 10.0;
    } else {
      shipping = subtotal >= 60.0 ? 0.0 : subtotal >= 45.0 ? 4.0 : 14.0;
    }
  }

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const isFreeShipping = shipping === 0 && subtotal > 0;
  const remainingForFreeShipping = Math.max(0, targetThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / targetThreshold) * 100));

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
    <div className="border border-gray-200/90 rounded-2xl bg-white p-5 sm:p-7 shadow-2xs sticky top-6 flex flex-col gap-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-950 text-lg">Récapitulatif de commande</h3>
        <span className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/90">
          {items.length} {items.length > 1 ? "articles" : "article"}
        </span>
      </div>

      {/* Dynamic Free Shipping Threshold Banner */}
      {items.length > 0 && (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-950">
              {isFreeShipping ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Livraison <strong>OFFERTE</strong> ({isFrance ? "France" : "Europe"}) !</span>
                </>
              ) : (
                <>
                  <Truck className="size-4 text-emerald-600 shrink-0" />
                  <span>
                    Plus que <strong className="text-emerald-800 font-extrabold">{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte !
                  </span>
                </>
              )}
            </div>
            <span className="text-xs font-bold text-emerald-700 shrink-0">
              {shippingProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Cart Items List */}
      <div className="max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {items.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            Votre panier est actuellement vide.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100/90 relative group"
            >
              <div className="size-14 rounded-xl bg-white border border-gray-200/80 p-1 flex items-center justify-center shrink-0">
                <Image
                  src={item.image || "/images/products/pack-4-saveurs-sulson.jpg"}
                  alt={item.title}
                  width={48}
                  height={48}
                  unoptimized
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-gray-950 line-clamp-1 block">
                  {item.title}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">
                    Quantité : <strong className="text-gray-900">{item.quantity}</strong>
                  </span>
                  <span className="text-sm font-extrabold text-gray-950">
                    {item.currentPrice}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label="Supprimer"
                className="text-gray-400 hover:text-red-500 p-1.5 transition cursor-pointer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Coupon Code Input */}
      <form onSubmit={handleApplyCoupon} className="flex gap-2.5">
        <input
          type="text"
          placeholder="Code promo (ex: SULSON10)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 h-12 px-4 text-sm rounded-xl border border-gray-300 uppercase font-mono focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition placeholder:normal-case placeholder:font-sans"
        />
        <button
          type="submit"
          className="bg-gray-950 hover:bg-gray-800 text-white h-12 px-5 rounded-xl text-sm font-bold transition cursor-pointer shrink-0"
        >
          Appliquer
        </button>
      </form>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total articles</span>
          <span className="font-bold text-gray-950">{subtotal.toFixed(2)} €</span>
        </div>

        {discountApplied && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Remise fidélité (SULSON10 -10%)</span>
            <span>-{discountAmount.toFixed(2)} €</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 items-center">
          <span>Frais de livraison</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs border border-emerald-100">
                Offerte
              </span>
            ) : (
              <span className="font-bold text-gray-950">{shipping.toFixed(2)} €</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-base sm:text-lg font-extrabold text-gray-950 pt-3 border-t border-gray-200">
          <span>Total à régler</span>
          <span className="text-emerald-800 text-xl sm:text-2xl font-black">{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* Dynamic Place Order Action Button */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleTriggerCheckout}
        className={`w-full h-13 rounded-xl font-bold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 ${
          selectedMethod === "paypal"
            ? "bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 border border-[#E5A800]/40"
            : "bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white"
        }`}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin size-5 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Validation en cours...</span>
          </>
        ) : selectedMethod === "paypal" ? (
          <div className="flex items-center justify-center gap-2.5">
            <img
              src="/images/payments/paypal-official.png"
              alt="PayPal"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <span className="text-sm sm:text-base font-bold text-gray-950">
              — Payer {total.toFixed(2)} €
            </span>
          </div>
        ) : (
          <>
            <Lock className="size-5" />
            <span>Payer ma commande • {total.toFixed(2)} €</span>
          </>
        )}
      </button>

      {/* Discreet Security Assurances */}
      <div className="pt-2 text-center text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-2 border-t border-gray-100">
        <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
        <span>Transaction chiffrée SSL 256-bit certifiée PCI-DSS</span>
      </div>
    </div>
  );
}
