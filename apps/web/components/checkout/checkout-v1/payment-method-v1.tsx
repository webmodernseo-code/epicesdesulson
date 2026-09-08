"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, CreditCard, ShoppingBag, Loader2 } from "lucide-react";

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
    <svg className={className} viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.8 2.5H23.5C28.2 2.5 31.5 4.7 30.7 9.4C29.8 14.8 25.7 17.7 21.4 17.7H16.6L14.1 31.8H7.5L12.8 2.5Z" fill="#003087"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.2 7.0H29.0C32.9 7.0 35.6 8.8 35.0 12.7C34.2 17.2 30.8 19.6 27.2 19.6H23.2L21.1 31.8H16.1L19.2 7.0Z" fill="#0079C1"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.6 10.9H25.9C29.4 10.9 32.1 12.6 31.5 16.0C30.7 20.1 27.6 22.3 24.3 22.3H21.5L19.5 33.2H14.9L17.6 10.9Z" fill="#00457C"/>
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
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const defaultCardData: CardFormData = {
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
};

interface PaymentMethodProps {
  cardData?: CardFormData;
  onCardDataChange?: (field: keyof CardFormData, value: string) => void;
  totalAmountFormatted?: string;
  isProcessing?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  errorMessage?: string | null;
}

export default function PaymentMethodV1({
  cardData = defaultCardData,
  onCardDataChange = () => {},
  totalAmountFormatted = "0,00 €",
  isProcessing = false,
  onSubmit = (e) => e.preventDefault(),
  errorMessage,
}: PaymentMethodProps = {}) {
  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    onCardDataChange("cardNumber", formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    onCardDataChange("expiryDate", value);
  };

  // Format CVC (3-4 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    onCardDataChange("cvc", value);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="py-4 px-5 sm:px-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="size-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center shrink-0">
            2
          </span>
          <h2 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            Paiement sécurisé
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <VisaSvg className="h-4.5 w-auto" />
          <MastercardSvg className="h-4.5 w-auto" />
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-semibold">
            <Lock className="size-3" />
            <span>SSL 256-bit</span>
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Subheader */}
          <div className="flex items-start space-x-3 pb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 shrink-0 shadow-2xs">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-gray-950">
                Paiement par Carte Bancaire
              </h3>
              <p className="text-xs text-gray-500">
                Saisie immédiate et sécurisée (Visa, Mastercard, CB).
              </p>
            </div>
          </div>

          {/* Nom sur la carte */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">
              Nom sur la carte <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Jean Dupont"
              value={cardData.nameOnCard}
              onChange={(e) => onCardDataChange("nameOnCard", e.target.value)}
              className="w-full h-11 px-3.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
            />
          </div>

          {/* Coordonnées de carte bancaire */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Coordonnées de carte <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="4242 4242 4242 4242"
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="w-full h-11 px-3.5 pr-10 text-sm font-mono tracking-wider border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
              />
              <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="MM/AA"
                  value={cardData.expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  className="w-full h-11 px-3.5 text-sm font-mono border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  value={cardData.cvc}
                  onChange={handleCvcChange}
                  maxLength={4}
                  className="w-full h-11 px-3.5 text-sm font-mono border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                />
              </div>
            </div>
          </div>

          {/* Message d'erreur clair si applicable */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-700 font-medium leading-relaxed flex items-start gap-2.5">
              <svg
                className="size-4 text-red-500 shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <p className="font-bold">Paiement non finalisé</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Grand Bouton de Paiement */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Paiement en cours...</span>
                </>
              ) : (
                <>
                  <Lock className="size-4.5" />
                  <span>Payer {totalAmountFormatted}</span>
                </>
              )}
            </button>

            {/* Footer Text */}
            <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-500">
              <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
              <span>Transaction chiffrée SSL 256-bit certifiée PCI-DSS • Paiement sécurisé par Stripe</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
