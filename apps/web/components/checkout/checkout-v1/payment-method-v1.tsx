"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Zap,
  AlertCircle,
} from "lucide-react";

/* ─── PURE VECTOR SVGS (Pixel-Perfect, Zero Pixellation) ─── */

export function VisaSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#1434CB" />
      <path
        d="M19.5 21L22 9H25.1L22.6 21H19.5ZM31.8 9.3C31.1 9 30 8.8 28.7 8.8C25.5 8.8 23.2 10.5 23.2 12.9C23.2 14.8 24.8 15.7 26 16.4C27.3 17.1 27.7 17.5 27.7 18.2C27.7 19.1 26.5 19.7 25.4 19.7C24 19.7 23 19.4 21.8 18.9L21.3 21.4C22.5 22 24.2 22.2 25.8 22.2C29.3 22.2 31.4 20.5 31.4 18.1C31.4 16.5 30.3 15.3 28.5 14.4C27.4 13.8 26.8 13.4 26.8 12.8C26.8 12.1 27.6 11.4 29 11.4C30.1 11.4 31 11.7 31.7 12L31.8 9.3ZM38.8 21H41.5L39.2 9H36.8C36.2 9 35.6 9.4 35.4 10.1L30.8 21H34L34.7 19.1H38.4L38.8 21ZM35.5 16.9L37 12.2L37.9 16.9H35.5ZM18.5 9H15.4C14.7 9 14.1 9.4 13.8 10L9.5 21H12.8L13.5 19.2C13.8 19.2 16.5 19.2 16.9 19.2C17 19.6 17.4 21 17.4 21H20.3L18.5 9Z"
        fill="white"
      />
    </svg>
  );
}

export function MastercardSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#222326" />
      <circle cx="18" cy="15" r="8.5" fill="#EB001B" />
      <circle cx="30" cy="15" r="8.5" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M24 8.8C26.1 10.4 27.5 12.6 27.5 15C27.5 17.4 26.1 19.6 24 21.2C21.9 19.6 20.5 17.4 20.5 15C20.5 12.6 21.9 10.4 24 8.8Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

/** Official Pure Apple Pay Logo Vector (Apple glyph + "Pay" typography) */
export function ApplePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        {/* Apple glyph */}
        <path d="M19.78 0.5c1.02 1.29 1.63 3.09 1.42 4.9-1.57.07-3.44-.93-4.42-2.21-.87-1.14-1.6-2.96-1.38-4.75 1.76-.14 3.44.83 4.38 2.06zM22.21 7.08c-2.49-.15-4.61 1.42-5.79 1.42-1.21 0-3.01-1.35-4.99-1.31-2.57.04-4.95 1.5-6.27 3.82-2.7 4.67-.7 11.57 1.91 15.35 1.28 1.85 2.8 3.9 4.8 3.82 1.92-.08 2.66-1.24 4.99-1.24 2.3 0 2.98 1.24 4.99 1.2 2.06-.04 3.37-1.87 4.63-3.72 1.46-2.14 2.06-4.21 2.09-4.32-.04-.02-4.01-1.55-4.06-6.13-.04-3.84 3.14-5.67 3.28-5.76-1.8-2.64-4.6-2.94-5.57-2.99z" />
        {/* P */}
        <path d="M37.8 6.34h10.31c5.22 0 8.38 3.15 8.38 7.69 0 4.58-3.18 7.72-8.38 7.72h-4.88v9.63H37.8V6.34zm5.43 11.37h4.56c2.91 0 4.3-1.51 4.3-3.67 0-2.14-1.39-3.65-4.3-3.65h-4.56v7.32z" />
        {/* a */}
        <path d="M60.81 21.62c0-4.32 3.45-6.77 9.58-7.12l4.8-.27v-1.45c0-2.09-1.58-3.3-4.3-3.3-2.26 0-4.22.85-5.38 2.22l-2.97-2.5c1.97-2.36 5.15-3.61 8.75-3.61 5.5 0 8.77 3 8.77 7.97v15.53h-4.37v-3.31c-1.6 2.34-4.4 3.72-7.5 3.72-4.61 0-7.4-2.98-7.4-7.87zm14.39-2.41v-1.89l-4.25.25c-3.35.21-5.45 1.56-5.45 4.12 0 2.36 1.83 3.77 4.65 3.77 2.96 0 5.04-2.3 5.04-6.25z" />
        {/* y */}
        <path d="M81.95 10.03h5.38l6.1 16.24 6.08-16.24h5.36l-10.1 24.33c-1.94 4.64-4.48 6.32-8.62 6.32-1.16 0-2.34-.23-3.28-.63v-4.22c.87.37 1.69.5 2.54.5 2.39 0 3.77-1.01 4.96-4.06l.57-1.45-8.98-20.79z" />
      </g>
    </svg>
  );
}

/** Official Apple Pay Rounded Badge (for tabs, summaries and cards) */
export function ApplePayBadgeSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="84" height="36" rx="7" fill="#000000" />
      <g fill="#FFFFFF" transform="translate(6, 1) scale(0.65)">
        {/* Apple glyph */}
        <path d="M19.78 0.5c1.02 1.29 1.63 3.09 1.42 4.9-1.57.07-3.44-.93-4.42-2.21-.87-1.14-1.6-2.96-1.38-4.75 1.76-.14 3.44.83 4.38 2.06zM22.21 7.08c-2.49-.15-4.61 1.42-5.79 1.42-1.21 0-3.01-1.35-4.99-1.31-2.57.04-4.95 1.5-6.27 3.82-2.7 4.67-.7 11.57 1.91 15.35 1.28 1.85 2.8 3.9 4.8 3.82 1.92-.08 2.66-1.24 4.99-1.24 2.3 0 2.98 1.24 4.99 1.2 2.06-.04 3.37-1.87 4.63-3.72 1.46-2.14 2.06-4.21 2.09-4.32-.04-.02-4.01-1.55-4.06-6.13-.04-3.84 3.14-5.67 3.28-5.76-1.8-2.64-4.6-2.94-5.57-2.99z" />
        {/* P */}
        <path d="M37.8 6.34h10.31c5.22 0 8.38 3.15 8.38 7.69 0 4.58-3.18 7.72-8.38 7.72h-4.88v9.63H37.8V6.34zm5.43 11.37h4.56c2.91 0 4.3-1.51 4.3-3.67 0-2.14-1.39-3.65-4.3-3.65h-4.56v7.32z" />
        {/* a */}
        <path d="M60.81 21.62c0-4.32 3.45-6.77 9.58-7.12l4.8-.27v-1.45c0-2.09-1.58-3.3-4.3-3.3-2.26 0-4.22.85-5.38 2.22l-2.97-2.5c1.97-2.36 5.15-3.61 8.75-3.61 5.5 0 8.77 3 8.77 7.97v15.53h-4.37v-3.31c-1.6 2.34-4.4 3.72-7.5 3.72-4.61 0-7.4-2.98-7.4-7.87zm14.39-2.41v-1.89l-4.25.25c-3.35.21-5.45 1.56-5.45 4.12 0 2.36 1.83 3.77 4.65 3.77 2.96 0 5.04-2.3 5.04-6.25z" />
        {/* y */}
        <path d="M81.95 10.03h5.38l6.1 16.24 6.08-16.24h5.36l-10.1 24.33c-1.94 4.64-4.48 6.32-8.62 6.32-1.16 0-2.34-.23-3.28-.63v-4.22c.87.37 1.69.5 2.54.5 2.39 0 3.77-1.01 4.96-4.06l.57-1.45-8.98-20.79z" />
      </g>
    </svg>
  );
}

/** Official Google Pay Pure Vector SVG */
export function GooglePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="84" height="36" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
      {/* G Logo */}
      <path
        d="M23.6 18.2c0-.6-.1-1.2-.2-1.8H14v3.4h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.1 2.9-6.9z"
        fill="#4285F4"
      />
      <path
        d="M14 28c2.7 0 5-1 6.6-2.5l-3.1-2.4c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H5V22.3C6.7 25.7 10.1 28 14 28z"
        fill="#34A853"
      />
      <path
        d="M8.2 19.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8v-2.5H5C4.3 15 4 16.5 4 18s.3 3 1 4.3l3.2-2.5z"
        fill="#FBBC04"
      />
      <path
        d="M14 11.6c1.5 0 2.8.5 3.8 1.5l2.9-2.9C18.9 8.6 16.7 7.7 14 7.7 10.1 7.7 6.7 10 5 13.4l3.2 2.5c.8-2.4 3.1-4.3 5.8-4.3z"
        fill="#EA4335"
      />
      {/* Pay Text */}
      <path
        d="M32.8 11.5h4.6c1.5 0 2.6.4 3.4 1.2.8.8 1.2 1.8 1.2 3.1 0 1.3-.4 2.3-1.2 3.1-.8.8-1.9 1.2-3.4 1.2h-2.3v5.6h-2.3V11.5zm2.3 6.6h2.2c.8 0 1.4-.2 1.8-.7.4-.5.7-1.1.7-1.9s-.2-1.4-.7-1.9c-.4-.5-1-.7-1.8-.7h-2.2v5.2z"
        fill="#5F6368"
      />
      <path
        d="M48.7 21.2c0-1.4.5-2.5 1.5-3.2 1-.7 2.3-1.1 3.9-1.1h2.7v-.8c0-.9-.2-1.6-.7-2-.5-.5-1.3-.7-2.2-.7-.8 0-1.5.2-2 .6-.5.4-.9 1-1.1 1.7l-2.1-.9c.4-1.1 1-1.9 1.9-2.6 1-.7 2.2-1 3.6-1 1.6 0 2.9.4 3.9 1.3 1 .9 1.4 2.1 1.4 3.8v9.4h-2.2v-2.1c-1 1.6-2.5 2.4-4.3 2.4-1.4 0-2.6-.4-3.5-1.2-.9-.8-1.3-1.9-1.3-3.2zm6.9-1v-.9h-2.4c-.9 0-1.6.2-2 .7-.4.5-.7 1-.7 1.7 0 .7.3 1.2.8 1.6.5.4 1.1.6 1.9.6 1.1 0 1.8-.4 2.4-1.1.4-.6.7-1.3.7-2.6z"
        fill="#5F6368"
      />
      <path
        d="M66.4 15.6h2.5l4.3 10.7 4.1-10.7h2.5l-6.8 16.3c-.9 2.2-2.3 3.3-4.3 3.3-.7 0-1.3-.1-1.8-.4v-2c.4.2.9.3 1.4.3 1 0 1.8-.5 2.3-1.6l.6-1.5-4.8-14.4z"
        fill="#5F6368"
      />
    </svg>
  );
}

/** Official PayPal Pure Vector SVG */
export function PaypalSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.2 4.2h5.8c2.4 0 4.3 1.2 3.8 3.8-.6 3.1-2.6 4.7-5.1 4.7H9.9l-1.3 6.9H5.1l3.1-15.4z"
        fill="#003087"
      />
      <path
        d="M11.6 7.4h5.6c2.4 0 4.1 1.2 3.6 3.8-.6 3.1-2.6 4.7-5.1 4.7h-2.8l-1.2 6.3H8.3l3.3-14.8z"
        fill="#0079C1"
      />
      <path
        d="M12.9 12.2c.4-.3.9-.4 1.5-.4h2.8c2.5 0 4.5-1.6 5.1-4.7.2-1.2.1-2.2-.4-2.9-.6 2.3-2.4 3.7-4.9 3.7h-2.8l-1.3 6.8z"
        fill="#00457C"
      />
      <path
        d="M26.4 8.7h2.8l-.4 2.2c.6-.7 1.5-1.1 2.5-1.1 2.2 0 3.7 1.7 3.3 3.9-.5 2.6-2.5 4.5-4.8 4.5-.9 0-1.6-.3-2-.8l-.6 3.2h-2.8l2-11.9zm4.2 6.8c1.2 0 2.1-1 2.4-2.4.2-1.2-.4-2.2-1.6-2.2-1.2 0-2.2 1-2.4 2.3-.3 1.3.4 2.3 1.6 2.3zm11.7-3.9l-.6 3c-.3 1.4.1 1.8 1.1 1.8.4 0 .7-.1 1-.2l-.3 1.8c-.5.2-1.2.3-1.9.3-2.1 0-3-.9-2.6-2.8l.7-3.9h-1.5l.4-1.8h1.5l.4-2.1h2.7l-.4 2.1h2.2l-.4 1.8h-2.3zm7.6-2.9h2.8l-.4 2.2c.6-.7 1.5-1.1 2.5-1.1 2.2 0 3.7 1.7 3.3 3.9-.5 2.6-2.5 4.5-4.8 4.5-.9 0-1.6-.3-2-.8l-.6 3.2h-2.8l2-11.9zm4.2 6.8c1.2 0 2.1-1 2.4-2.4.2-1.2-.4-2.2-1.6-2.2-1.2 0-2.2 1-2.4 2.3-.3 1.3.4 2.3 1.6 2.3zm11.7-7.9h2.8l-2.4 12.3h-2.8l2.4-12.3z"
        fill="#003087"
      />
    </svg>
  );
}

export const OfficialPaypalLogo = PaypalSvg;

/* ─── TYPES & INTERFACES ─── */

export type PaymentTabType = "card" | "apple_pay" | "paypal";

export interface CardFormData {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCard?: boolean;
}

const defaultCardData: CardFormData = {
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
  saveCard: false,
};

interface PaymentMethodProps {
  cardData?: CardFormData;
  onCardDataChange?: (field: keyof CardFormData, value: any) => void;
  selectedMethod?: PaymentTabType;
  onSelectMethod?: (method: PaymentTabType) => void;
  totalAmountFormatted?: string;
  isProcessing?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  errorMessage?: string | null;
  isPayPalAvailable?: boolean;
}

export default function PaymentMethodV1({
  cardData = defaultCardData,
  onCardDataChange = () => {},
  selectedMethod = "card",
  onSelectMethod = () => {},
  totalAmountFormatted = "0,00 €",
  isProcessing = false,
  onSubmit = (e) => e.preventDefault(),
  errorMessage,
  isPayPalAvailable = false,
}: PaymentMethodProps = {}) {
  const [activeTab, setActiveTab] = useState<PaymentTabType>(selectedMethod);
  const [showCvcHelper, setShowCvcHelper] = useState(false);

  const handleTabChange = (tab: PaymentTabType) => {
    setActiveTab(tab);
    onSelectMethod(tab);
  };

  // Dynamic Card Brand Detection
  const getCardBrand = (number: string): "visa" | "mastercard" | "unknown" => {
    const clean = number.replace(/\D/g, "");
    if (!clean) return "unknown";
    if (clean.startsWith("4")) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    return "unknown";
  };

  const currentBrand = getCardBrand(cardData.cardNumber);

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    onCardDataChange("cardNumber", formatted);
  };

  // Format Expiry (MM/AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) {
      const mm = parseInt(value.slice(0, 2), 10);
      if (mm > 12) value = `12${value.slice(2)}`;
      else if (mm === 0) value = `01${value.slice(2)}`;
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    onCardDataChange("expiryDate", value);
  };

  // Format CVC (3 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    onCardDataChange("cvc", value);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden transition-all">
      {/* ─── Header Apple / Stripe Style ─── */}
      <div className="py-4 sm:py-5 px-5 sm:px-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <span className="size-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
            2
          </span>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-950 tracking-tight">
              Paiement sécurisé
            </h2>
          </div>
        </div>

        {/* Visa & Mastercard Badges */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <img
            src="/images/payments/visa-mastercard.png"
            alt="Visa & Mastercard"
            className="h-7 sm:h-8 w-auto object-contain"
          />
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-full border border-emerald-200/70 font-semibold shadow-2xs whitespace-nowrap shrink-0">
            <Lock className="size-3.5 text-emerald-600" />
            <span>SSL 256-bit</span>
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* ─── Mode de Paiement Tabs (Carte, Apple Pay / Google Pay, PayPal) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tab 1: Carte Bancaire (Visa / Mastercard) */}
          <button
            type="button"
            onClick={() => handleTabChange("card")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "card"
                ? "border-emerald-600 bg-emerald-50/50 ring-1.5 ring-emerald-600 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "card"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "card" && <div className="size-2 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-950 truncate">Carte bancaire</p>
                <p className="text-xs text-gray-500 mt-0.5">Visa & Mastercard</p>
              </div>
            </div>
            <img
              src="/images/payments/visa-mastercard.png"
              alt="Visa Mastercard"
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
            />
          </button>

          {/* Tab 2: Apple Pay & Google Pay */}
          <button
            type="button"
            onClick={() => handleTabChange("apple_pay")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "apple_pay"
                ? "border-emerald-600 bg-emerald-50/50 ring-1.5 ring-emerald-600 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "apple_pay"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "apple_pay" && <div className="size-2 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-950 truncate">Apple & Google Pay</p>
                <p className="text-xs text-gray-500 mt-0.5">Paiement 1 clic</p>
              </div>
            </div>
            <img
              src="/images/payments/google-apple-pay.png"
              alt="Google Pay & Apple Pay"
              className="h-6 sm:h-7 w-auto object-contain shrink-0"
            />
          </button>

          {/* Tab 3: PayPal */}
          <button
            type="button"
            onClick={() => handleTabChange("paypal")}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "paypal"
                ? "border-emerald-600 bg-emerald-50/50 ring-1.5 ring-emerald-600 shadow-xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "paypal"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "paypal" && <div className="size-2 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-950 truncate">PayPal</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isPayPalAvailable ? "Paiement sécurisé" : "Moyen de paiement indisponible"}
                </p>
              </div>
            </div>
            <img
              src="/images/payments/paypal-official.png"
              alt="PayPal"
              className={`h-5 sm:h-6 w-auto object-contain shrink-0 ${!isPayPalAvailable ? "opacity-50 grayscale-20" : ""}`}
            />
          </button>
        </div>

        {/* ─── OPTION 1: FORMULAIRE CARTE BANCAIRE ─── */}
        {activeTab === "card" && (
          <form onSubmit={onSubmit} className="space-y-4 pt-1">
            {/* Titulaire de la carte */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Titulaire de la carte <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jean Dupont"
                value={cardData.nameOnCard}
                onChange={(e) => onCardDataChange("nameOnCard", e.target.value)}
                className="w-full h-12 px-4 text-base sm:text-sm rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition placeholder:text-gray-400"
              />
            </div>

            {/* Numéro de carte avec détection dynamique de la marque */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-800">
                  Numéro de carte bancaire <span className="text-red-500">*</span>
                </label>
                <span className="text-xs sm:text-sm text-gray-600 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  <span>3D Secure 2.0 certifié</span>
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="4242 •••• •••• 4242"
                  value={cardData.cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="w-full h-12 px-4 pr-16 text-base sm:text-sm font-mono tracking-wider rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />

                {/* Dynamic Brand Logo inside input */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  {currentBrand === "visa" ? (
                    <VisaSvg className="h-6 w-auto shadow-2xs" />
                  ) : currentBrand === "mastercard" ? (
                    <MastercardSvg className="h-6 w-auto shadow-2xs" />
                  ) : (
                    <img
                      src="/images/payments/visa-mastercard.png"
                      alt="Cartes acceptées"
                      className="h-6 w-auto object-contain opacity-80"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Date d'expiration & CVC alignés */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Expiration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="MM/AA"
                  value={cardData.expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  className="w-full h-12 px-4 text-base sm:text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-gray-800">
                    CVC / CVV <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCvcHelper(!showCvcHelper)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    title="Aide CVC"
                  >
                    <HelpCircle className="size-4" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleCvcChange}
                    maxLength={3}
                    className="w-full h-12 px-4 pr-9 text-base sm:text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                  />
                  <Lock className="size-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* CVC Info Bubble if toggled */}
            {showCvcHelper && (
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                <ShieldCheck className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Le code de sécurité CVC correspond aux <strong>3 derniers chiffres</strong> situés au verso de votre carte bancaire.
                </span>
              </div>
            )}

            {/* Checkbox "Mémoriser cette carte" */}
            <label className="flex items-center gap-3 pt-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cardData.saveCard || false}
                onChange={(e) => onCardDataChange("saveCard", e.target.checked)}
                className="size-4.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs sm:text-sm text-gray-700">
                Enregistrer cette carte pour mes futurs achats en toute sécurité
              </span>
            </label>

            {/* Message d'erreur clair si applicable */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200/80 text-xs sm:text-sm text-red-700 font-medium leading-relaxed flex items-start gap-3">
                <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Information de paiement requise</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Bouton de Paiement Carte Principal */}
            <div className="pt-2.5 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-13 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base sm:text-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span>Validation du paiement sécurisé...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-5" />
                    <span>Payer {totalAmountFormatted}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ─── OPTION 2: UNIFIED APPLE PAY & GOOGLE PAY ─── */}
        {activeTab === "apple_pay" && (
          <div className="space-y-4 pt-1">
            <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2 text-gray-950 font-bold text-sm sm:text-base">
                <Zap className="size-4.5 text-emerald-600" />
                <span>Paiement Express Apple Pay & Google Pay (1 Clic)</span>
              </div>
              <p className="leading-relaxed">
                Réglez instantanément avec le portefeuille de votre smartphone ou navigateur (Face ID, Touch ID ou Google Wallet).
              </p>
            </div>

            {/* Deux Boutons Dédiés : Apple Pay & Google Pay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Bouton 1 : Apple Pay Officiel */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={onSubmit}
                className="w-full h-13 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white font-medium rounded-xl text-base shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span className="text-xs sm:text-sm">Validation en cours...</span>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2.5">
                    <ApplePaySvg className="h-6.5 sm:h-7 w-auto text-white shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-white">• {totalAmountFormatted}</span>
                  </div>
                )}
              </button>

              {/* Bouton 2 : Google Pay Officiel */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={onSubmit}
                className="w-full h-13 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-900 border border-gray-300 font-medium rounded-xl text-base shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin text-gray-700" />
                    <span className="text-xs sm:text-sm">Validation en cours...</span>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2.5">
                    <GooglePaySvg className="h-6.5 sm:h-7 w-auto shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-gray-900">• {totalAmountFormatted}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ─── OPTION 3: PAYPAL ─── */}
        {activeTab === "paypal" && (
          <div className="pt-1">
            <button
              type="button"
              disabled={!isPayPalAvailable}
              onClick={(e) => {
                e.preventDefault();
                if (isPayPalAvailable) {
                  onSubmit(e);
                }
              }}
              className={`w-full h-13 rounded-xl text-base border transition-all flex items-center justify-center gap-2.5 select-none ${
                isPayPalAvailable
                  ? "bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 font-bold border-[#E5A800]/40 shadow-xs cursor-pointer"
                  : "bg-[#FFC439]/50 text-gray-700 font-semibold border-amber-300/40 opacity-55 cursor-not-allowed shadow-none"
              }`}
            >
              <div className="flex items-center justify-center gap-2.5">
                <img
                  src="/images/payments/paypal-official.png"
                  alt="PayPal"
                  className={`h-5.5 sm:h-6.5 w-auto object-contain shrink-0 ${!isPayPalAvailable ? "opacity-60 grayscale-20" : ""}`}
                />
                <span className="font-semibold text-xs sm:text-sm">
                  {isPayPalAvailable
                    ? `— Payer ${totalAmountFormatted}`
                    : "Moyen de paiement indisponible"}
                </span>
              </div>
            </button>
          </div>
        )}

        {/* ─── 3 Badges de Réassurance Discrets ─── */}
        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <span className="font-medium">Chiffrement SSL 256-bit</span>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <Lock className="size-5 text-emerald-600 shrink-0" />
            <span className="font-medium">Protocole 3D Secure 2.0</span>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
            <span className="font-medium">Satisfait ou remboursé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
