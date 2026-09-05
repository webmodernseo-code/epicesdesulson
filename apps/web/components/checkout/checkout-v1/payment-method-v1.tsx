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

// 100% Authentic Official PayPal Logo Vector Component
export function OfficialPaypalLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Monogram Double P */}
      <path fillRule="evenodd" clipRule="evenodd" d="M12.8 2.5H23.5C28.2 2.5 31.5 4.7 30.7 9.4C29.8 14.8 25.7 17.7 21.4 17.7H16.6L14.1 31.8H7.5L12.8 2.5Z" fill="#003087"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.2 7.0H29.0C32.9 7.0 35.6 8.8 35.0 12.7C34.2 17.2 30.8 19.6 27.2 19.6H23.2L21.1 31.8H16.1L19.2 7.0Z" fill="#0079C1"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.6 10.9H25.9C29.4 10.9 32.1 12.6 31.5 16.0C30.7 20.1 27.6 22.3 24.3 22.3H21.5L19.5 33.2H14.9L17.6 10.9Z" fill="#00457C"/>
      {/* Official Typography */}
      <path d="M43.2 9.5H48.8C52.1 9.5 54.4 10.8 53.8 14.2C53.1 18.2 50.1 20.3 47.0 20.3H44.6L43.3 27.3H39.5L43.2 9.5ZM44.9 17.4H47.1C49.1 17.4 50.4 16.3 50.8 14.2C51.1 12.3 50.1 11.6 48.4 11.6H46.0L44.9 17.4Z" fill="#003087"/>
      <path d="M57.9 14.8H61.4L61.0 16.8C61.8 15.4 63.3 14.5 65.0 14.5C67.6 14.5 69.2 16.4 68.7 19.3C68.1 22.7 65.7 25.4 63.1 25.4C61.9 25.4 60.9 24.8 60.5 23.9L59.9 27.3H56.1L57.9 14.8ZM61.8 22.1C62.3 22.6 63.0 22.8 63.7 22.8C65.3 22.8 66.4 21.0 66.8 18.9C67.0 17.6 66.5 16.6 65.2 16.6C64.4 16.6 63.5 17.1 62.9 18.0L61.8 22.1Z" fill="#003087"/>
      <path d="M78.6 14.8L73.1 26.6C72.3 28.3 71.3 29.3 69.6 29.3C68.8 29.3 68.2 29.1 67.8 28.8L68.5 25.9C68.8 26.0 69.1 26.1 69.5 26.1C70.3 26.1 70.8 25.6 71.2 24.6L71.4 24.0L67.7 14.8H71.7L73.4 20.3L76.8 14.8H78.6Z" fill="#003087"/>
      <path d="M83.2 9.5H88.8C92.1 9.5 94.4 10.8 93.8 14.2C93.1 18.2 90.1 20.3 87.0 20.3H84.6L83.3 27.3H79.5L83.2 9.5ZM84.9 17.4H87.1C89.1 17.4 90.4 16.3 90.8 14.2C91.1 12.3 90.1 11.6 88.4 11.6H86.0L84.9 17.4Z" fill="#0079C1"/>
      <path d="M97.9 14.8H101.4L101.0 16.8C101.8 15.4 103.3 14.5 105.0 14.5C107.6 14.5 109.2 16.4 108.7 19.3C108.1 22.7 105.7 25.4 103.1 25.4C101.9 25.4 100.9 24.8 100.5 23.9L99.9 27.3H96.1L97.9 14.8ZM101.8 22.1C102.3 22.6 103.0 22.8 103.7 22.8C105.3 22.8 106.4 21.0 106.8 18.9C107.0 17.6 106.5 16.6 105.2 16.6C104.4 16.6 103.5 17.1 102.9 18.0L101.8 22.1Z" fill="#0079C1"/>
      <path d="M113.8 7.5L110.8 24.9H114.6L117.6 7.5H113.8Z" fill="#0079C1"/>
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
  selectedMethod?: "stripe" | "paypal";
  onSelectMethod?: (method: "stripe" | "paypal") => void;
  cardData?: CardFormData;
  onCardDataChange?: (field: keyof CardFormData, value: any) => void;
  onPaypalSubmit?: () => void;
  isProcessing?: boolean;
}

const defaultCardData: CardFormData = {
  name: "",
  number: "",
  expiry: "",
  cvc: "",
  saveCard: false,
};

export default function PaymentMethodV1({
  selectedMethod = "stripe",
  onSelectMethod,
  cardData = defaultCardData,
  onCardDataChange,
  onPaypalSubmit,
  isProcessing = false,
}: PaymentMethodProps) {
  const safeCardData = cardData || defaultCardData;

  // Detect card brand based on input digits
  const getCardBrand = (num: string = "") => {
    const clean = (num || "").replace(/\s+/g, "");
    if (/^4/.test(clean)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^3[47]/.test(clean)) return "amex";
    return null;
  };

  const detectedBrand = getCardBrand(safeCardData.number);

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
      onCardDataChange?.("number", [p1, p2, p3].filter(Boolean).join(" "));
    } else {
      const parts = truncated.match(/.{1,4}/g) || [];
      onCardDataChange?.("number", parts.join(" "));
    }
  };

  // Format Expiry Date (MM / AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      onCardDataChange?.("expiry", `${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      onCardDataChange?.("expiry", raw);
    }
  };

  // Format CVC (3 or 4 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLen = detectedBrand === "amex" ? 4 : 3;
    const raw = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    onCardDataChange?.("cvc", raw);
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
            onClick={() => onSelectMethod?.("stripe")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment-method-selector"
                checked={selectedMethod === "stripe"}
                onChange={() => onSelectMethod?.("stripe")}
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

            {/* High-resolution SVG Logos */}
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

          {selectedMethod === "stripe" && (
            <div className="mt-3.5 border-t border-gray-200/80 pt-4 flex items-start gap-2.5 text-xs text-gray-600">
              <svg className="size-4 text-emerald-600 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Vous saisirez vos informations bancaires sur la page sécurisée Stripe. Elles ne transitent pas par notre site.</span>
            </div>
          )}

          {/* Stripe Checkout collecte les données sensibles. */}
          <AnimatePresence initial={false}>
            {false && selectedMethod === "stripe" && (
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
                      value={safeCardData.name}
                      onChange={(e) => onCardDataChange?.("name", e.target.value.toUpperCase())}
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
                        value={safeCardData.number}
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
                        value={safeCardData.expiry}
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
                          value={safeCardData.cvc}
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
                        checked={safeCardData.saveCard}
                        onChange={(e) => onCardDataChange?.("saveCard", e.target.checked)}
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

        {/* ── OPTION 2: PAYPAL (PAIEMENT EN 1 FOIS) ── */}
        <div
          className={`border rounded-xl p-4 sm:p-5 transition-all duration-200 ${
            selectedMethod === "paypal"
              ? "border-[#0079C1]/50 bg-gray-50/50 shadow-xs"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          {/* Option Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            onClick={() => onSelectMethod?.("paypal")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment-method-selector"
                checked={selectedMethod === "paypal"}
                onChange={() => onSelectMethod?.("paypal")}
                className="size-4.5 text-[#0079C1] accent-[#0079C1] cursor-pointer"
              />
              <div>
                <span className="text-sm sm:text-base font-bold text-gray-900 block leading-tight">
                  PayPal
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Paiement sécurisé et immédiat en 1 fois
                </span>
              </div>
            </div>

            {/* Official PayPal Badge */}
            <div className="pl-7 sm:pl-0 flex items-center gap-2">
              <div className="bg-white border border-gray-200 rounded-lg px-2.5 py-1 shadow-2xs flex items-center justify-center">
                <OfficialPaypalLogo className="h-4.5 w-auto" />
              </div>
            </div>
          </div>

          {/* Compact & Ultra-Premium PayPal Button when active */}
          <AnimatePresence initial={false}>
            {false && selectedMethod === "paypal" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-3.5 border-t border-gray-200/80 flex flex-col items-center gap-3">
                  <p className="text-xs text-gray-600 text-center">
                    Réglez votre commande en 1 fois avec votre solde PayPal ou votre carte bancaire liée.
                  </p>

                  {/* Compact, Official PayPal Action Button (Not oversized, strictly proportioned) */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPaypalSubmit?.();
                    }}
                    className="w-56 sm:w-64 h-11 bg-[#FFC439] hover:bg-[#F2BA36] active:bg-[#E5AE2E] active:scale-[0.98] rounded-full flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer border border-[#E0A800]/50 disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2 text-gray-950 font-bold text-xs">
                        <svg className="animate-spin size-4 text-gray-950" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Connexion à PayPal...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <OfficialPaypalLogo className="h-5.5 w-auto" />
                      </div>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>Protection des Achats PayPal incluse</span>
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
