"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

export default function CheckoutCartSummary1() {
  const { items, subtotal, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.9;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "SULSON10") {
      setDiscountApplied(true);
      toast.success("Code promo SULSON10 appliqué (-10%) !");
    } else {
      toast.error("Code promo invalide. Essayez SULSON10");
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Commande validée avec succès ! Redirection sécurisée...");
      window.location.href = "/order-success";
    }, 1500);
  };

  return (
    <div className="border border-gray-200 rounded-3xl bg-white p-5 sm:p-7 shadow-sm sticky top-6 flex flex-col gap-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h5 className="font-bold text-gray-900 text-lg">Récapitulatif de Commande</h5>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {items.length} {items.length > 1 ? "articles" : "article"}
        </span>
      </div>

      {/* Cart Items List */}
      <div className="max-h-72 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {items.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            Votre panier est actuellement vide.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-gray-50 border border-gray-100 relative group"
            >
              <div className="size-14 rounded-xl bg-white border border-gray-200 p-1 flex items-center justify-center shrink-0">
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
                <span className="text-xs font-bold text-gray-900 line-clamp-1 block">
                  {item.title}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-gray-500">
                    Quantité : <strong>{item.quantity}</strong>
                  </span>
                  <span className="text-xs font-extrabold text-primary">
                    {item.currentPrice}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label="Supprimer"
                className="text-gray-400 hover:text-red-500 p-1 transition"
              >
                <i className="hgi hgi-stroke hgi-delete-02 text-sm" />
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
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-gray-300 uppercase focus:outline-none focus:border-primary shadow-2xs"
        />
        <button
          type="submit"
          className="btn btn-secondary py-2 px-4 rounded-xl text-xs font-bold"
        >
          Appliquer
        </button>
      </form>

      {/* Totals Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm">
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
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                Offerte
              </span>
            ) : (
              <span className="font-semibold text-gray-900">{shipping.toFixed(2)} €</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-base sm:text-lg font-extrabold text-gray-950 pt-3 border-t border-gray-200">
          <span>Total à payer</span>
          <span className="text-primary">{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* Place Order CTA */}
      <button
        type="button"
        disabled={isProcessing || items.length === 0}
        onClick={handlePlaceOrder}
        className="btn btn-primary w-full py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <i className="hgi hgi-stroke hgi-lock-password text-base" />
        <span>{isProcessing ? "Traitement en cours..." : `Payer ${total.toFixed(2)} €`}</span>
      </button>

      {/* Security assurances */}
      <div className="text-center space-y-1 text-[11px] text-gray-400">
        <p className="flex items-center justify-center gap-1">
          <i className="hgi hgi-stroke hgi-shield-check text-emerald-600 text-sm" />
          Paiement sécurisé par cryptage SSL 256-bit
        </p>
        <p>Garantie satisfait ou remboursé sous 14 jours</p>
      </div>
    </div>
  );
}
