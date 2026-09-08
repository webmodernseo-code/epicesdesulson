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
} from "lucide-react";

/* ─── PURE VECTOR SVGS / FALLBACKS ─── */

export function VisaSvg({ className = "h-4.5 w-auto" }: { className?: string }) {
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

export function MastercardSvg({ className = "h-4.5 w-auto" }: { className?: string }) {
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

export function OfficialPaypalLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <img
      src="/images/payments/paypal-official.png"
      alt="PayPal"
      className={className}
    />
  );
}

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
      <div className="py-4 px-5 sm:px-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="size-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center shrink-0">
            2
          </span>
          <h2 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            Paiement sécurisé
          </h2>
        </div>
        
        {/* User Official Image: Visa & Mastercard Banner */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <img
            src="/images/payments/visa-mastercard.png"
            alt="Visa & Mastercard"
            className="h-6 w-auto object-contain"
          />
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60 font-semibold">
            <Lock className="size-3" />
            <span>SSL 256-bit</span>
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* ─── Mode de Paiement Tabs (Carte, Apple Pay, PayPal) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Tab 1: Carte Bancaire (Visa / Mastercard) */}
          <button
            type="button"
            onClick={() => handleTabChange("card")}
            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "card"
                ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600 shadow-2xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`size-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "card"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "card" && <div className="size-1.5 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">Carte bancaire</p>
                <p className="text-[10px] text-gray-500">Visa & Mastercard</p>
              </div>
            </div>
            <img
              src="/images/payments/visa-mastercard.png"
              alt="Visa Mastercard"
              className="h-4.5 w-auto object-contain shrink-0"
            />
          </button>

          {/* Tab 2: Apple Pay */}
          <button
            type="button"
            onClick={() => handleTabChange("apple_pay")}
            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "apple_pay"
                ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600 shadow-2xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`size-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "apple_pay"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "apple_pay" && <div className="size-1.5 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">Apple Pay</p>
                <p className="text-[10px] text-gray-500">Paiement en 1 clic</p>
              </div>
            </div>
            <img
              src="/images/payments/apple-pay-official.png"
              alt="Apple Pay"
              className="h-4 w-auto object-contain shrink-0"
            />
          </button>

          {/* Tab 3: PayPal */}
          <button
            type="button"
            onClick={() => handleTabChange("paypal")}
            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              activeTab === "paypal"
                ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600 shadow-2xs"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`size-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  activeTab === "paypal"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {activeTab === "paypal" && <div className="size-1.5 rounded-full bg-white" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">PayPal</p>
                <p className="text-[10px] text-gray-500">Paiement sécurisé</p>
              </div>
            </div>
            <img
              src="/images/payments/paypal-official.png"
              alt="PayPal"
              className="h-3.5 w-auto object-contain shrink-0"
            />
          </button>
        </div>

        {/* ─── FORMULAIRE CARTE BANCAIRE (DÉFAUT) ─── */}
        {activeTab === "card" && (
          <form onSubmit={onSubmit} className="space-y-4 pt-1">
            {/* Titulaire de la carte */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Titulaire de la carte <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jean Dupont"
                value={cardData.nameOnCard}
                onChange={(e) => onCardDataChange("nameOnCard", e.target.value)}
                className="w-full h-11 px-3.5 text-sm rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
              />
            </div>

            {/* Numéro de carte avec détection dynamique de la marque */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">
                  Numéro de carte bancaire <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="size-3 text-emerald-600" />
                  <span>3D Secure certifié</span>
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
                  className="w-full h-11 px-3.5 pr-14 text-sm font-mono tracking-wider rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />
                
                {/* Dynamic SVG / Official vector badge inside input */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                  {currentBrand === "visa" ? (
                    <VisaSvg className="h-5 w-auto shadow-2xs" />
                  ) : currentBrand === "mastercard" ? (
                    <MastercardSvg className="h-5 w-auto shadow-2xs" />
                  ) : (
                    <img
                      src="/images/payments/visa-mastercard.png"
                      alt="Cartes acceptées"
                      className="h-4.5 w-auto object-contain opacity-80"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Date d'expiration & CVC alignés */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Expiration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="MM/AA"
                  value={cardData.expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  className="w-full h-11 px-3.5 text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    CVC / CVV <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCvcHelper(!showCvcHelper)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    title="Aide CVC"
                  >
                    <HelpCircle className="size-3.5" />
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
                    className="w-full h-11 px-3.5 pr-8 text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                  />
                  <Lock className="size-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* CVC Info Bubble if toggled */}
            {showCvcHelper && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-2 animate-fadeIn">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Le code de sécurité CVC correspond aux <strong>3 derniers chiffres</strong> situés au dos de votre carte bancaire.
                </span>
              </div>
            )}

            {/* Checkbox "Mémoriser cette carte" */}
            <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cardData.saveCard || false}
                onChange={(e) => onCardDataChange("saveCard", e.target.checked)}
                className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-gray-600">
                Enregistrer cette carte pour mes futurs achats en toute sécurité
              </span>
            </label>

            {/* Message d'erreur clair si applicable */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-700 font-medium leading-relaxed flex items-start gap-2.5">
                <svg className="size-4 text-red-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <p className="font-bold">Information de paiement requise</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* ─── Bouton de Paiement Carte Principal ─── */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span>Validation du paiement sécurisé...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-4.5" />
                    <span>Payer {totalAmountFormatted}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ─── OPTION APPLE PAY ─── */}
        {activeTab === "apple_pay" && (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <Zap className="size-4 text-emerald-600" />
                <span>Paiement instantané avec Apple Pay</span>
              </div>
              <p>
                Réglez en 1 clic grâce à Face ID ou Touch ID. Aucune saisie manuelle de carte requise.
              </p>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={onSubmit}
              className="w-full h-12 bg-black hover:bg-gray-900 active:scale-[0.99] text-white font-medium rounded-xl text-sm shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Validation Apple Pay...</span>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-300">Payer avec</span>
                  <div className="bg-white px-2 py-0.5 rounded flex items-center">
                    <img
                      src="/images/payments/apple-pay-official.png"
                      alt="Apple Pay"
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                  <span className="font-semibold text-sm">• {totalAmountFormatted}</span>
                </div>
              )}
            </button>
          </div>
        )}

        {/* ─── OPTION PAYPAL ─── */}
        {activeTab === "paypal" && (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <ShieldCheck className="size-4 text-[#0079C1]" />
                <span>Paiement en 1 fois sécurisé avec PayPal</span>
              </div>
              <p>
                Finalisez votre commande directement avec votre compte PayPal ou par carte sans créer de compte.
              </p>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={onSubmit}
              className="w-full h-12 bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 font-bold rounded-xl text-sm border border-[#E5A800]/40 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-5 animate-spin text-gray-900" />
                  <span>Connexion à PayPal...</span>
                </>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="/images/payments/paypal-official.png"
                    alt="PayPal"
                    className="h-5 w-auto object-contain"
                  />
                  <span>— Payer {totalAmountFormatted}</span>
                </div>
              )}
            </button>
          </div>
        )}

        {/* ─── 3 Badges de Réassurance Discrets ─── */}
        <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-gray-600">
          <div className="flex items-center gap-2 bg-gray-50/70 p-2 rounded-lg border border-gray-100">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Chiffrement SSL 256-bit</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50/70 p-2 rounded-lg border border-gray-100">
            <Lock className="size-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Protocole 3D Secure 2.0</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-50/70 p-2 rounded-lg border border-gray-100">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Satisfait ou remboursé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
