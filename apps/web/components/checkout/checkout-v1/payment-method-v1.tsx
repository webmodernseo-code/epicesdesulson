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
    <div className="border border-gray-200 rounded-2xl sm:rounded-3xl bg-white shadow-2xs overflow-hidden">
      {/* Header bar */}
      <div className="py-3.5 px-4 sm:px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="size-7 sm:size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-credit-card text-base sm:text-lg text-white" />
          </span>
          <h5 className="font-bold text-sm sm:text-base text-white tracking-wide">
            2. Mode de Règlement
          </h5>
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-white bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30 inline-flex items-center gap-1.5 shadow-2xs self-start sm:self-auto">
          <i className="hgi hgi-stroke hgi-lock-password text-xs sm:text-sm text-white" />
          <span>100% Sécurisé SSL / Stripe</span>
        </span>
      </div>

      <div className="p-4 sm:p-7">
        {/* Main Payment Box */}
        <div className="border-2 border-primary/40 bg-primary/[0.02] rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-2xs">
          {/* Header Row: Radio + Title + Payment Logos */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            onClick={() => setSelectedMethod("stripe-card")}
          >
            <div className="flex items-center gap-3">
              {/* Radio Indicator */}
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
                <span className="text-[11px] sm:text-xs text-gray-500 block mt-0.5">
                  Paiement sécurisé crypté via <strong>Stripe 3D-Secure</strong>
                </span>
              </div>
            </div>

            {/* Payment Logos */}
            <div className="flex items-center flex-wrap gap-1.5 pl-8 sm:pl-0">
              <div
                className={`relative rounded-md overflow-hidden shadow-2xs bg-white p-0.5 border ${
                  detectedBrand === "visa" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src="/images/payments/visa.svg"
                  alt="Visa"
                  width={38}
                  height={24}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>

              <div
                className={`relative rounded-md overflow-hidden shadow-2xs bg-white p-0.5 border ${
                  detectedBrand === "mastercard" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src="/images/payments/mastercard.svg"
                  alt="Mastercard"
                  width={38}
                  height={24}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>

              <div
                className={`relative rounded-md overflow-hidden shadow-2xs bg-white p-0.5 border ${
                  detectedBrand === "amex" ? "border-primary ring-1 ring-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src="/images/payments/amex.svg"
                  alt="American Express"
                  width={38}
                  height={24}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>

              <div className="relative rounded-md overflow-hidden shadow-2xs bg-white p-0.5 border border-gray-200">
                <Image
                  src="/images/payments/apple-pay.svg"
                  alt="Apple Pay"
                  width={38}
                  height={24}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Card Form */}
          <AnimatePresence initial={false}>
            {selectedMethod === "stripe-card" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-4 border-t border-gray-200/80 space-y-3.5">
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Nom complet sur la carte *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: JEAN DUPONT"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                    />
                  </div>

                  {/* Card Number Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                        className="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm tracking-wider text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        {detectedBrand === "visa" && (
                          <Image
                            src="/images/payments/visa.svg"
                            alt="Visa"
                            width={30}
                            height={18}
                            className="h-4.5 w-auto"
                          />
                        )}
                        {detectedBrand === "mastercard" && (
                          <Image
                            src="/images/payments/mastercard.svg"
                            alt="Mastercard"
                            width={30}
                            height={18}
                            className="h-4.5 w-auto"
                          />
                        )}
                        {detectedBrand === "amex" && (
                          <Image
                            src="/images/payments/amex.svg"
                            alt="Amex"
                            width={30}
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

                  {/* Expiration + CVC */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Expiration (MM/AA) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Cryptogramme (CVC) *
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          maxLength={detectedBrand === "amex" ? 4 : 3}
                          placeholder={detectedBrand === "amex" ? "••••" : "•••"}
                          value={cardCvc}
                          onChange={handleCvcChange}
                          className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                        />
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                          <i className="hgi hgi-stroke hgi-shield-security text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save card option */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                      />
                      <span>Mémoriser ma carte pour mes prochaines commandes</span>
                    </label>
                  </div>

                  {/* Stripe 3D Secure Guarantee Box */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-start gap-2.5 mt-3">
                    <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                      <i className="hgi hgi-stroke hgi-shield-check text-lg" />
                    </div>
                    <div className="text-[11px] text-emerald-950 space-y-0.5 leading-relaxed">
                      <p className="font-bold text-emerald-900">
                        Paiement Sécurisé Stripe & 3D-Secure
                      </p>
                      <p className="text-emerald-800/90 text-[10px] sm:text-[11px]">
                        Transaction chiffrée SSL 256-bit certifiée PCI-DSS Niveau 1.
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
