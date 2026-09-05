"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Crisp inline SVG payment logos with comfortable, standard dimensions
function VisaSvg({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="5" fill="#1434CB" />
      <path
        d="M19.5 21L22 9H25.1L22.6 21H19.5ZM31.8 9.3C31.1 9 30 8.8 28.7 8.8C25.5 8.8 23.2 10.5 23.2 12.9C23.2 14.8 24.8 15.7 26 16.4C27.3 17.1 27.7 17.5 27.7 18.2C27.7 19.1 26.5 19.7 25.4 19.7C24 19.7 23 19.4 21.8 18.9L21.3 21.4C22.5 22 24.2 22.2 25.8 22.2C29.3 22.2 31.4 20.5 31.4 18.1C31.4 16.5 30.3 15.3 28.5 14.4C27.4 13.8 26.8 13.4 26.8 12.8C26.8 12.1 27.6 11.4 29 11.4C30.1 11.4 31 11.7 31.7 12L31.8 9.3ZM38.8 21H41.5L39.2 9H36.8C36.2 9 35.6 9.4 35.4 10.1L30.8 21H34L34.7 19.1H38.4L38.8 21ZM35.5 16.9L37 12.2L37.9 16.9H35.5ZM18.5 9H15.4C14.7 9 14.1 9.4 13.8 10L9.5 21H12.8L13.5 19.2C13.8 19.2 16.5 19.2 16.9 19.2C17 19.6 17.4 21 17.4 21H20.3L18.5 9Z"
        fill="white"
      />
    </svg>
  );
}

function MastercardSvg({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="5" fill="#222326" />
      <circle cx="18" cy="15" r="8.5" fill="#EB001B" />
      <circle cx="30" cy="15" r="8.5" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M24 8.8C26.1 10.4 27.5 12.6 27.5 15C27.5 17.4 26.1 19.6 24 21.2C21.9 19.6 20.5 17.4 20.5 15C20.5 12.6 21.9 10.4 24 8.8Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function AmexSvg({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="5" fill="#016FD0" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
        AMEX
      </text>
    </svg>
  );
}

function ApplePaySvg({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="5" fill="#000000" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="700" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">
        Pay
      </text>
    </svg>
  );
}

// Official dual-tone PayPal Logo SVG
function PaypalSvg({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="78" height="30" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <path
        d="M13.5 7.5H20.2C22.6 7.5 24.3 8.6 23.9 11C23.4 13.8 21.3 15.3 19.1 15.3H16.6L15.3 22.5H12L13.5 7.5Z"
        fill="#003087"
      />
      <path
        d="M16.8 9.8H21.8C23.8 9.8 25.2 10.9 24.9 12.9C24.4 15.5 22.5 16.9 20.4 16.9H17.9L17.1 22.5H14.5L16.8 9.8Z"
        fill="#0079C1"
      />
      <path
        d="M16 11.8H20.2C22 11.8 23.4 12.7 23.1 14.4C22.7 16.7 21.1 17.8 19.2 17.8H17.1L16.3 22.5H14L16 11.8Z"
        fill="#00457C"
      />
      <text x="31" y="19.5" fill="#003087" fontSize="13" fontWeight="900" fontStyle="italic" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">
        Pay
      </text>
      <text x="54" y="19.5" fill="#0079C1" fontSize="13" fontWeight="900" fontStyle="italic" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">
        Pal
      </text>
    </svg>
  );
}

export interface CardFormData {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  saveCard: boolean;
}

interface PaymentMethodProps {
  selectedMethod: "stripe" | "paypal";
  onSelectMethod: (method: "stripe" | "paypal") => void;
  cardData: CardFormData;
  onCardDataChange: (field: keyof CardFormData, value: any) => void;
  onPaypalSubmit?: () => void;
  isProcessing?: boolean;
}

export default function PaymentMethodV1({
  selectedMethod,
  onSelectMethod,
  cardData,
  onCardDataChange,
  onPaypalSubmit,
  isProcessing = false,
}: PaymentMethodProps) {
  // Detect card brand based on input digits
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, "");
    if (/^4/.test(clean)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^3[47]/.test(clean)) return "amex";
    return null;
  };

  const detectedBrand = getCardBrand(cardData.number);

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
      onCardDataChange("number", [p1, p2, p3].filter(Boolean).join(" "));
    } else {
      const parts = truncated.match(/.{1,4}/g) || [];
      onCardDataChange("number", parts.join(" "));
    }
  };

  // Format Expiry Date (MM / AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      onCardDataChange("expiry", `${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      onCardDataChange("expiry", raw);
    }
  };

  // Format CVC (3 or 4 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLen = detectedBrand === "amex" ? 4 : 3;
    const raw = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    onCardDataChange("cvc", raw);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Refined Header (Apple/Stripe Style: Clean white background with delicate 1px border) */}
      <div className="py-4 px-5 sm:px-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <span className="size-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center shrink-0">
            2
          </span>
          <h2 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            Mode de paiement sécurisé
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/80 font-medium self-start sm:self-auto">
          <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Chiffrement SSL 256-bit</span>
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* ── OPTION 1: CARTE BANCAIRE & APPLE PAY (STRIPE) ── */}
        <div
          className={`border rounded-xl p-4 sm:p-5 transition-all duration-200 ${
            selectedMethod === "stripe"
              ? "border-emerald-600/40 bg-gray-50/60 shadow-xs"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {/* Option Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            onClick={() => onSelectMethod("stripe")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment-method-selector"
                checked={selectedMethod === "stripe"}
                onChange={() => onSelectMethod("stripe")}
                className="size-4.5 text-emerald-700 accent-emerald-700 cursor-pointer"
              />
              <div>
                <span className="text-sm sm:text-base font-bold text-gray-900 block leading-tight">
                  Carte bancaire & Apple Pay
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Règlement sécurisé par carte via Stripe
                </span>
              </div>
            </div>

            {/* Generous, high-resolution SVG Logos */}
            <div className="flex items-center gap-2 pl-7 sm:pl-0 flex-wrap">
              <div className={`transition-all rounded-md overflow-hidden shadow-2xs ${detectedBrand === "visa" ? "ring-2 ring-emerald-600" : ""}`}>
                <VisaSvg className="h-6 sm:h-7 w-auto" />
              </div>
              <div className={`transition-all rounded-md overflow-hidden shadow-2xs ${detectedBrand === "mastercard" ? "ring-2 ring-emerald-600" : ""}`}>
                <MastercardSvg className="h-6 sm:h-7 w-auto" />
              </div>
              <div className={`transition-all rounded-md overflow-hidden shadow-2xs ${detectedBrand === "amex" ? "ring-2 ring-emerald-600" : ""}`}>
                <AmexSvg className="h-6 sm:h-7 w-auto" />
              </div>
              <div className="rounded-md overflow-hidden shadow-2xs">
                <ApplePaySvg className="h-6 sm:h-7 w-auto" />
              </div>
            </div>
          </div>

          {/* Form Fields when Stripe is active */}
          <AnimatePresence initial={false}>
            {selectedMethod === "stripe" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-3.5 pt-4 mt-3.5 border-t border-gray-200/80">
                  {/* Titulaire de la carte */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Titulaire de la carte <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom complet figurant sur la carte"
                      value={cardData.name}
                      onChange={(e) => onCardDataChange("name", e.target.value.toUpperCase())}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
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
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        className="w-full h-11 pl-3.5 pr-14 rounded-xl border border-gray-300 bg-white font-mono text-sm tracking-wider text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        {detectedBrand === "visa" && <VisaSvg className="h-5 w-auto" />}
                        {detectedBrand === "mastercard" && <MastercardSvg className="h-5 w-auto" />}
                        {detectedBrand === "amex" && <AmexSvg className="h-5 w-auto" />}
                        {!detectedBrand && (
                          <svg className="size-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date d'expiration & CVC */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Date d'expiration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM / AA"
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
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
                          value={cardData.cvc}
                          onChange={handleCvcChange}
                          className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Card Checkbox */}
                  <div className="pt-0.5">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                      <input
                        type="checkbox"
                        checked={cardData.saveCard}
                        onChange={(e) => onCardDataChange("saveCard", e.target.checked)}
                        className="rounded border-gray-300 text-emerald-700 focus:ring-emerald-700 size-4 cursor-pointer"
                      />
                      <span>Mémoriser ma carte pour mes prochains achats</span>
                    </label>
                  </div>

                  {/* Minimalist Reassurance */}
                  <div className="pt-2.5 border-t border-gray-200/70 flex items-center gap-2 text-xs text-gray-500">
                    <svg className="size-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>
                      Transaction chiffrée <strong>SSL 256-bit</strong> certifiée PCI-DSS Niveau 1 par <strong>Stripe</strong>.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── OPTION 2: PAYPAL (PAIEMENT EN 1 FOIS UNIQUEMENT) ── */}
        <div
          className={`border rounded-xl p-4 sm:p-5 transition-all duration-200 ${
            selectedMethod === "paypal"
              ? "border-blue-500/50 bg-blue-50/20 shadow-xs"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {/* Option Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            onClick={() => onSelectMethod("paypal")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment-method-selector"
                checked={selectedMethod === "paypal"}
                onChange={() => onSelectMethod("paypal")}
                className="size-4.5 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <div>
                <span className="text-sm sm:text-base font-bold text-gray-900 block leading-tight">
                  PayPal (Paiement en 1 fois)
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Règlement sécurisé et immédiat avec votre compte PayPal
                </span>
              </div>
            </div>

            {/* Official PayPal Logo with normal clear size */}
            <div className="pl-7 sm:pl-0">
              <PaypalSvg className="h-7 w-auto" />
            </div>
          </div>

          {/* Details & Functional Button when PayPal is active */}
          <AnimatePresence initial={false}>
            {selectedMethod === "paypal" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-3.5 border-t border-blue-100 space-y-3.5">
                  {/* Real Functional Official PayPal Yellow Action Button */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPaypalSubmit?.();
                    }}
                    className="w-full py-3 px-5 bg-[#FFC439] hover:bg-[#F2BA36] active:scale-[0.99] rounded-xl flex items-center justify-center gap-2.5 shadow-xs text-gray-950 font-extrabold text-sm sm:text-base transition cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin size-4 text-gray-900" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span className="text-xs font-bold text-gray-900">Connexion sécurisée à PayPal...</span>
                      </div>
                    ) : (
                      <>
                        <span className="font-extrabold italic text-[#003087]">Pay</span>
                        <span className="font-extrabold italic text-[#0079C1]">Pal</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-900 ml-1">
                          — Payer en 1 fois avec PayPal
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                    <svg className="size-3.5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Vous serez redirigé vers l'interface officielle PayPal pour confirmer votre règlement en 1 fois.</span>
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
