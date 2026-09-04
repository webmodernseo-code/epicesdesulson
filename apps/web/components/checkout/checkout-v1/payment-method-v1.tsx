"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentMethodV1() {
  const [selectedMethod, setSelectedMethod] = useState<string>("stripe-card");
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
      // Amex formatting 4-6-5
      const p1 = truncated.slice(0, 4);
      const p2 = truncated.slice(4, 10);
      const p3 = truncated.slice(10, 15);
      setCardNumber([p1, p2, p3].filter(Boolean).join(" "));
    } else {
      // Standard 4-4-4-4
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
    <div className="border border-gray-200 rounded-3xl bg-white shadow-xs overflow-hidden">
      {/* Header bar in original theme green with premium SVG icons */}
      <div className="py-4 px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-credit-card text-lg text-white" />
          </span>
          <h5 className="font-bold text-base text-white tracking-wide">
            Mode de Règlement
          </h5>
        </div>
        <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/30 flex items-center gap-2 shadow-2xs">
          <i className="hgi hgi-stroke hgi-lock-password text-sm text-white" />
          <span>100% Sécurisé SSL</span>
        </span>
      </div>

      <div className="p-5 sm:p-7">
        {/* Main Payment Container */}
        <div className="border-2 border-primary/40 bg-primary/[0.02] rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-xs">
          {/* Header Row: Radio + Title + Official Logos (Visa, Mastercard, Amex, Apple Pay) */}
          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
            onClick={() => setSelectedMethod("stripe-card")}
          >
            <div className="flex items-center gap-3">
              {/* Custom Radio Button */}
              <span className="relative flex items-center justify-center size-5 shrink-0">
                <input
                  type="radio"
                  name="payment-method"
                  value="stripe-card"
                  checked={selectedMethod === "stripe-card"}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="peer appearance-none size-5 border-2 border-gray-300 checked:border-primary rounded-full bg-white transition-all cursor-pointer"
                />
                <span className="absolute size-2.5 rounded-full bg-primary opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all pointer-events-none" />
              </span>

              <div>
                <span className="text-sm sm:text-base font-bold text-gray-900 block leading-tight">
                  Carte Bancaire & Apple Pay
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Paiement direct sécurisé via la passerelle <strong>Stripe</strong>
                </span>
              </div>
            </div>

            {/* Official Payment Brand Logos */}
            <div className="flex items-center flex-wrap gap-2 pl-8 lg:pl-0">
              {/* Visa Logo */}
              <div
                className={`relative transition-all duration-200 rounded-md overflow-hidden shadow-2xs hover:scale-105 ${
                  detectedBrand === "visa" ? "ring-2 ring-primary ring-offset-1" : "opacity-95"
                }`}
                title="Visa"
              >
                <Image
                  src="/images/payments/visa.svg"
                  alt="Visa"
                  width={44}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </div>

              {/* Mastercard Logo */}
              <div
                className={`relative transition-all duration-200 rounded-md overflow-hidden shadow-2xs hover:scale-105 ${
                  detectedBrand === "mastercard" ? "ring-2 ring-primary ring-offset-1" : "opacity-95"
                }`}
                title="Mastercard"
              >
                <Image
                  src="/images/payments/mastercard.svg"
                  alt="Mastercard"
                  width={44}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </div>

              {/* American Express Logo */}
              <div
                className={`relative transition-all duration-200 rounded-md overflow-hidden shadow-2xs hover:scale-105 ${
                  detectedBrand === "amex" ? "ring-2 ring-primary ring-offset-1" : "opacity-95"
                }`}
                title="American Express"
              >
                <Image
                  src="/images/payments/amex.svg"
                  alt="American Express"
                  width={44}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </div>

              {/* Apple Pay Logo */}
              <div
                className="relative transition-all duration-200 rounded-md overflow-hidden shadow-2xs hover:scale-105 opacity-95"
                title="Apple Pay"
              >
                <Image
                  src="/images/payments/apple-pay.svg"
                  alt="Apple Pay"
                  width={44}
                  height={28}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Unfolded Stripe Form Container */}
          <AnimatePresence initial={false}>
            {selectedMethod === "stripe-card" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-5 border-t border-gray-200 space-y-4">
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Nom sur la carte *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: JEAN DUPONT"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition"
                    />
                  </div>

                  {/* Card Number Input with dynamic icon */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Numéro de carte bancaire *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full pl-4 pr-14 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm tracking-wider text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                        {detectedBrand === "visa" && (
                          <Image
                            src="/images/payments/visa.svg"
                            alt="Visa"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        )}
                        {detectedBrand === "mastercard" && (
                          <Image
                            src="/images/payments/mastercard.svg"
                            alt="Mastercard"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        )}
                        {detectedBrand === "amex" && (
                          <Image
                            src="/images/payments/amex.svg"
                            alt="Amex"
                            width={32}
                            height={20}
                            className="h-5 w-auto"
                          />
                        )}
                        {!detectedBrand && (
                          <i className="hgi hgi-stroke hgi-credit-card text-xl text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expiration + CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Expiration (MM/AA) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM / AA"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Cryptogramme (CVC) *
                        </label>
                        <span className="text-[10px] text-gray-400">
                          {detectedBrand === "amex" ? "4 chiffres au recto" : "3 chiffres au verso"}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          maxLength={detectedBrand === "amex" ? 4 : 3}
                          placeholder={detectedBrand === "amex" ? "••••" : "•••"}
                          value={cardCvc}
                          onChange={handleCvcChange}
                          className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs transition"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <i className="hgi hgi-stroke hgi-shield-security text-base" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save card option */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                      />
                      <span>Enregistrer cette carte en toute sécurité pour mes prochains achats</span>
                    </label>
                  </div>

                  {/* Stripe 3D Secure Guarantee Box */}
                  <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-start gap-3 mt-4">
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl shrink-0 mt-0.5">
                      <i className="hgi hgi-stroke hgi-shield-check text-xl" />
                    </div>
                    <div className="text-xs text-emerald-950 space-y-1 leading-relaxed">
                      <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                        <span>Paiement Sécurisé Stripe & 3D Secure 2.0</span>
                        <span className="text-[10px] bg-emerald-200/60 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                          Chiffrement SSL 256-bit
                        </span>
                      </p>
                      <p className="text-emerald-800/90 text-[11px]">
                        Vos coordonnées bancaires sont transmises directement à <strong>Stripe</strong> (norme bancaire PCI-DSS Niveau 1). Aucune information de paiement ne transite ni n'est stockée sur nos serveurs.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
