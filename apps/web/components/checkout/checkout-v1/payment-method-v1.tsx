"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Crisp inline SVG payment logos for 100% vector sharpness on all screens
function VisaSvg({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" rx="4" fill="#1434CB" />
      <path
        d="M14.5 16.5L16.4 7.5H18.7L16.8 16.5H14.5ZM23.8 7.7C23.3 7.5 22.5 7.3 21.5 7.3C19.1 7.3 17.4 8.6 17.4 10.4C17.4 11.8 18.6 12.5 19.5 13C20.5 13.5 20.8 13.8 20.8 14.3C20.8 15 19.9 15.4 19.1 15.4C18 15.4 17.3 15.2 16.4 14.8L16 16.7C16.9 17.1 18.2 17.3 19.4 17.3C22 17.3 23.6 16 23.6 14.2C23.6 13 22.8 12.1 21.4 11.4C20.6 11 20.1 10.7 20.1 10.2C20.1 9.7 20.7 9.2 21.8 9.2C22.6 9.2 23.3 9.4 23.8 9.6L23.8 7.7ZM29 16.5H31L29.3 7.5H27.5C27 7.5 26.6 7.8 26.4 8.3L23 16.5H25.4L25.9 15.1H28.7L29 16.5ZM26.5 13.4L27.6 9.9L28.3 13.4H26.5ZM13.8 7.5L11.7 13.6L11.5 12.4C11.1 11.1 9.9 9.6 8.5 8.9L10.5 16.5H13L16.1 7.5H13.8Z"
        fill="white"
      />
    </svg>
  );
}

function MastercardSvg({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" rx="4" fill="#222326" />
      <circle cx="14" cy="12" r="6.5" fill="#EB001B" />
      <circle cx="22" cy="12" r="6.5" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M18 7.5C19.6 8.7 20.6 10.2 20.6 12C20.6 13.8 19.6 15.3 18 16.5C16.4 15.3 15.4 13.8 15.4 12C15.4 10.2 16.4 8.7 18 7.5Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function AmexSvg({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" rx="4" fill="#016FD0" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
        AMEX
      </text>
    </svg>
  );
}

function ApplePaySvg({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" rx="4" fill="#000000" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">
        Pay
      </text>
    </svg>
  );
}

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
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Header bar in sleek luxury dark green */}
      <div className="py-3 px-4 sm:px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div className="flex items-center gap-2">
          <span className="size-6 sm:size-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <i className="hgi hgi-stroke hgi-credit-card text-sm sm:text-base text-white" />
          </span>
          <h4 className="font-bold text-sm sm:text-base text-white tracking-wide">
            2. Mode de Paiement Sécurisé
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-emerald-100 bg-white/15 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 self-start sm:self-auto">
          <i className="hgi hgi-stroke hgi-lock-password text-xs text-emerald-200" />
          <span>Cryptage SSL & 3D Secure</span>
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Main Payment Container */}
        <div className="border border-gray-200 rounded-xl p-3.5 sm:p-5 bg-gray-50/50 space-y-4">
          {/* Header Row: Radio + Title + Crisp Vector Logos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-200/80">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment-method"
                defaultChecked
                className="size-4 text-primary accent-primary cursor-pointer"
              />
              <div>
                <span className="text-sm font-bold text-gray-900 block leading-tight">
                  Carte Bancaire & Apple Pay
                </span>
                <span className="text-[11px] text-gray-500 block">
                  Paiement sécurisé instantané via Stripe
                </span>
              </div>
            </div>

            {/* Crisp Inline Vector SVGs */}
            <div className="flex items-center gap-1.5 pl-6 sm:pl-0">
              <div className={`transition-all rounded overflow-hidden shadow-2xs ${detectedBrand === "visa" ? "ring-2 ring-primary" : ""}`}>
                <VisaSvg className="h-5 w-auto" />
              </div>
              <div className={`transition-all rounded overflow-hidden shadow-2xs ${detectedBrand === "mastercard" ? "ring-2 ring-primary" : ""}`}>
                <MastercardSvg className="h-5 w-auto" />
              </div>
              <div className={`transition-all rounded overflow-hidden shadow-2xs ${detectedBrand === "amex" ? "ring-2 ring-primary" : ""}`}>
                <AmexSvg className="h-5 w-auto" />
              </div>
              <div className="rounded overflow-hidden shadow-2xs">
                <ApplePaySvg className="h-5 w-auto" />
              </div>
            </div>
          </div>

          {/* Form Fields: Elegant, Clean, Normal Sentence Case */}
          <div className="space-y-3 pt-0.5">
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
                className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
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
                  className="w-full h-10 pl-3 pr-12 rounded-lg border border-gray-300 bg-white font-mono text-sm tracking-wider text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  {detectedBrand === "visa" && <VisaSvg className="h-4 w-auto" />}
                  {detectedBrand === "mastercard" && <MastercardSvg className="h-4 w-auto" />}
                  {detectedBrand === "amex" && <AmexSvg className="h-4 w-auto" />}
                  {!detectedBrand && (
                    <i className="hgi hgi-stroke hgi-credit-card text-base text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Date d'expiration & Cryptogramme CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Expiration (MM/AA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="MM / AA"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Cryptogramme (CVC) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    maxLength={detectedBrand === "amex" ? 4 : 3}
                    placeholder={detectedBrand === "amex" ? "••••" : "•••"}
                    value={cardCvc}
                    onChange={handleCvcChange}
                    className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 bg-white font-mono text-sm text-center text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="hgi hgi-stroke hgi-shield-security text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Card Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 hover:text-gray-900 select-none">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary size-3.5 cursor-pointer"
                />
                <span>Mémoriser ma carte pour mes prochains achats</span>
              </label>
            </div>

            {/* Minimalist, Elegant Reassurance line */}
            <div className="pt-2 border-t border-gray-200/70 flex items-center gap-2 text-[11px] text-gray-500">
              <i className="hgi hgi-stroke hgi-shield-check text-emerald-600 text-sm shrink-0" />
              <span>
                Transaction chiffrée <strong>SSL 256-bit</strong> certifiée PCI-DSS Niveau 1 par <strong>Stripe</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
