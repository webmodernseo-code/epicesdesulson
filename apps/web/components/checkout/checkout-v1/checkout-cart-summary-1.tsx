"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart, parseCartPrice } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import { ShieldCheck, Lock, Trash2, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { PaypalSvg } from "./payment-method-v1";

interface CheckoutCartSummaryProps {
  selectedMethod?: "stripe" | "paypal" | "apple_pay" | "card";
  isProcessing?: boolean;
  shippingCountry?: string;
  onPlaceOrder?: (coupon?: string) => void;
  isPayPalAvailable?: boolean;
  currentStep?: 1 | 2;
}

export default function CheckoutCartSummary1({
  selectedMethod = "stripe",
  isProcessing = false,
  shippingCountry = "France",
  onPlaceOrder,
  isPayPalAvailable = false,
  currentStep = 1,
}: CheckoutCartSummaryProps) {
  const { items, subtotal, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountData, setDiscountData] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

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

  const discountAmount = discountData
    ? parseFloat(((subtotal * discountData.discountPercent) / 100).toFixed(2))
    : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const isFreeShipping = shipping === 0 && subtotal > 0;
  const remainingForFreeShipping = Math.max(0, targetThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / targetThreshold) * 100));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Veuillez saisir un code promo.");
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), subtotal }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setDiscountData({
          code: data.data.code,
          discountPercent: data.data.discountPercent,
          discountAmount: data.data.discountAmount,
        });
        toast.success(data.data.message || `Code promo ${data.data.code} appliqué (-${data.data.discountPercent}%) !`);
      } else {
        setDiscountData(null);
        toast.error(data.message || "Code promo invalide ou expiré.");
      }
    } catch (err) {
      toast.error("Erreur lors de la vérification du code promo.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleTriggerCheckout = () => {
    onPlaceOrder?.(discountData?.code);
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
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Livraison offerte !</span>
                </>
              ) : (
                <>
                  <Truck className="size-4 text-emerald-600" />
                  <span>
                    Plus que <strong>{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte
                  </span>
                </>
              )}
            </div>
            <span className="text-xs font-bold text-emerald-700">{shippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Articles Cart Items List Preview */}
      <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-xs text-gray-500 italic">Aucun article dans votre panier.</p>
        ) : (
          items.map((it) => {
            const unitPrice = parseCartPrice(it.currentPrice);
            const qty = Math.max(1, Number(it.quantity) || 1);
            const rowTotal = (unitPrice * qty).toFixed(2);

            return (
              <div key={it.id} className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="size-11 rounded-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                  <img
                    src={it.image ? (it.image.startsWith("http") || it.image.startsWith("/") ? it.image : `/images/products/${it.image}`) : "/images/products/epice-poulet-recto.jpg"}
                    alt={it.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const title = (it.title || "").toLowerCase();
                      if (title.includes("poulet")) target.src = "/images/products/epice-poulet-recto.jpg";
                      else if (title.includes("viande")) target.src = "/images/products/epice-viande-recto.jpg";
                      else if (title.includes("poisson")) target.src = "/images/products/epice-poisson-recto.jpg";
                      else if (title.includes("gourmande") || title.includes("secret")) target.src = "/images/products/epice-gourmande-recto.jpg";
                      else target.src = "/images/products/pack-4-saveurs-sulson.jpg";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{it.title}</p>
                  <p className="text-xs text-gray-500">
                    {it.pack || "100g"} • Qté : {qty}
                  </p>
                </div>
                <span className="font-bold text-gray-950 shrink-0">
                  {rowTotal} €
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Coupon Code Input */}
      <form onSubmit={handleApplyCoupon} className="flex gap-2.5">
        <input
          type="text"
          placeholder="Code promo"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 h-12 px-4 text-sm rounded-xl border border-gray-300 uppercase font-mono focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition placeholder:normal-case placeholder:font-sans"
        />
        <button
          type="submit"
          disabled={isValidatingCoupon}
          className="bg-gray-950 hover:bg-gray-800 disabled:opacity-50 text-white h-12 px-5 rounded-xl text-sm font-bold transition cursor-pointer shrink-0"
        >
          {isValidatingCoupon ? "Vérification..." : "Appliquer"}
        </button>
      </form>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total articles</span>
          <span className="font-bold text-gray-950">{subtotal.toFixed(2)} €</span>
        </div>

        {discountData && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Remise code promo ({discountData.code} -{discountData.discountPercent}%)</span>
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
        disabled={isProcessing || (currentStep === 2 && selectedMethod === "paypal" && !isPayPalAvailable)}
        onClick={handleTriggerCheckout}
        className={`w-full h-13 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 ${
          currentStep === 1
            ? "bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white shadow-sm hover:shadow cursor-pointer"
            : selectedMethod === "paypal"
            ? isPayPalAvailable
              ? "bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 border border-[#E5A800]/40 shadow-sm hover:shadow cursor-pointer"
              : "bg-[#FFC439]/50 text-gray-700 font-semibold border border-amber-300/40 opacity-55 cursor-not-allowed shadow-none"
            : "bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white shadow-sm hover:shadow cursor-pointer"
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
        ) : currentStep === 1 ? (
          <>
            <span>Continuer vers le paiement</span>
            <ArrowRight className="size-5" />
          </>
        ) : selectedMethod === "paypal" ? (
          <div className="flex items-center justify-center gap-2.5">
            <PaypalSvg
              className={`h-5.5 sm:h-6.5 w-auto shrink-0 ${!isPayPalAvailable ? "opacity-60 grayscale-20" : ""}`}
            />
            <span className="text-xs sm:text-sm font-semibold">
              {isPayPalAvailable ? `— Payer ${total.toFixed(2)} €` : "Moyen de paiement indisponible"}
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
