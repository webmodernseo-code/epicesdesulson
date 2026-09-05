"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentMethodV1() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Detect card brand based on input digits
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, "");
    if (/^4/.test(clean)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^3[47]/.test(clean)) return "amex";
    return null;
  };

  const detectedBrand = getCardBrand(cardNumber);

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const isAmex = /^3[47]/.test(raw);
    const maxLen = isAmex ? 15 : 16;
    const truncated = raw.slice(0, maxLen);

    if (isAmex) {
      const p1 = truncated.slice(0, 4);
      const p2 = truncated.slice(4, 10);
      const p3 = truncated.slice(10, 15);
      setCardNumber([p1, p2, p3].filter(Boolean).join(" "));
    } else {
      const parts = truncated.match(/.{1,4}/g) || [];
      setCardNumber(parts.join(" "));
    }
  };

  // Format Expiry Date (MM / AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Format CVC (3 or 4 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLen = detectedBrand === "amex" ? 4 : 3;
    const raw = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    setCardCvc(raw);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl sm:rounded-3xl bg-white shadow-2xs overflow-hidden">
      {/* Header bar */}
      <div className="py-3.5 px-4 sm:px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="size-7 sm:size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-credit-card text-base sm:text-lg text-white" />
          </span>
          <h5 className="font-bold text-sm sm:text-base text-white tracking-wide">
            2. Mode de Règlement
          </h5>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-white/95 bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 self-start sm:self-auto">
          <i className="hgi hgi-stroke hgi-lock-password text-xs sm:text-sm text-white" />
          <span>Paiement 100% Sécurisé Stripe</span>
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Sleek Payment Card Container */}
        <div className="border border-emerald-800/30 rounded-2xl p-4 sm:p-5 bg-white shadow-xs space-y-4">
          {/* Header Row: Radio + Title + Payment Logos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="relative flex items-center justify-center size-4.5 shrink-0">
                <input
                  type="radio"
                  name="payment-method"
                  defaultChecked
                  className="size-4.5 text-primary accent-primary cursor-pointer"
                />
              </span>
              <div>
                <span className="text-sm sm:text-base font-bold text-gray-900 block leading-tight">
                  Carte Bancaire & Apple Pay
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Transactions sécurisées avec authentification 3D-Secure
                </span>
              </div>
            </div>

            {/* Official Payment Logos */}
            <div className="flex items-center gap-1.5 pl-7 sm:pl-0">
              <Image
                src="/images/payments/visa.svg"
                alt="Visa"
                width={36}
                height={22}
                className={`h-5 sm:h-6 w-auto rounded border bg-white p-0.5 transition-all ${
                  detectedBrand === "visa" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              />
              <Image
                src="/images/payments/mastercard.svg"
                alt="Mastercard"
                width={36}
                height={22}
                className={`h-5 sm:h-6 w-auto rounded border bg-white p-0.5 transition-all ${
                  detectedBrand === "mastercard" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              />
              <Image
                src="/images/payments/amex.svg"
                alt="American Express"
                width={36}
                height={22}
                className={`h-5 sm:h-6 w-auto rounded border bg-white p-0.5 transition-all ${
                  detectedBrand === "amex" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              />
              <Image
                src="/images/payments/apple-pay.svg"
                alt="Apple Pay"
                width={36}
                height={22}
                className="h-5 sm:h-6 w-auto rounded border border-gray-200 bg-white p-0.5"
              />
            </div>
          </div>

          {/* Form Fields: Elegant, Clean, Normal Sentence Case */}
          <div className="space-y-3.5 pt-1">
            {/* Titulaire de la carte */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Titulaire de la carte <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Nom figurant sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
              />
            </div>

            {/* Numéro de carte */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Numéro de carte <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4242 •••• •••• 4242"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full h-11 pl-3.5 pr-12 rounded-xl border border-gray-300 bg-white font-mono text-sm tracking-wider text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  {detectedBrand === "visa" && (
                    <Image
                      src="/images/payments/visa.svg"
                      alt="Visa"
                      width={28}
                      height={18}
                      className="h-4.5 w-auto"
                    />
                  )}
                  {detectedBrand === "mastercard" && (
                    <Image
                      src="/images/payments/mastercard.svg"
                      alt="Mastercard"
                      width={28}
                      height={18}
                      className="h-4.5 w-auto"
                    />
                  )}
                  {detectedBrand === "amex" && (
                    <Image
                      src="/images/payments/amex.svg"
                      alt="Amex"
                      width={28}
                      height={18}
                      className="h-4.5 w-auto"
                    />
                  )}
                  {!detectedBrand && (
                    <i className="hgi hgi-stroke hgi-credit-card text-lg text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Date d'expiration & Cryptogramme CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Date d'expiration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="MM / AA"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Code de sécurité (CVC) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    maxLength={detectedBrand === "amex" ? 4 : 3}
                    placeholder={detectedBrand === "amex" ? "••••" : "•••"}
                    value={cardCvc}
                    onChange={handleCvcChange}
                    className="w-full h-11 pl-3 pr-8 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="hgi hgi-stroke hgi-shield-security text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Card Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                />
                <span>Mémoriser ma carte en toute sécurité</span>
              </label>
            </div>

            {/* Minimalist, Elegant Security Reassurance */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
              <i className="hgi hgi-stroke hgi-shield-check text-emerald-600 text-base shrink-0" />
              <span>
                Paiement chiffré <strong>SSL 256-bit</strong> traité directement par <strong>Stripe</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
