"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripePromise } from "@/lib/stripe-client";
import StripePaymentForm from "./stripe-payment-form";
import { ShieldCheck, Lock, CreditCard, Loader2 } from "lucide-react";

export function VisaSvg({ className = "h-5 w-auto" }: { className?: string }) {
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

export function MastercardSvg({ className = "h-5 w-auto" }: { className?: string }) {
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

interface PaymentMethodProps {
  clientSecret: string | null;
  publishableKey?: string | null;
  cardHolderName: string;
  onCardHolderNameChange: (name: string) => void;
  totalAmountFormatted: string;
  orderNumber?: string;
  onSuccessRedirectUrl: string;
  isPreparing?: boolean;
  onInitializeIntent?: () => void;
  initError?: string | null;
}

export default function PaymentMethodV1({
  clientSecret,
  publishableKey,
  cardHolderName,
  onCardHolderNameChange,
  totalAmountFormatted,
  orderNumber,
  onSuccessRedirectUrl,
  isPreparing = false,
  onInitializeIntent,
  initError,
}: PaymentMethodProps) {
  const stripePromise = getStripePromise(publishableKey || undefined);

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Refined Header */}
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
        {initError ? (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 space-y-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="size-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">
                  Initialisation du paiement
                </h4>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  {initError}
                </p>
              </div>
            </div>
            {onInitializeIntent && (
              <button
                type="button"
                onClick={onInitializeIntent}
                className="text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Réessayer l'initialisation
              </button>
            )}
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#059669",
                  colorBackground: "#ffffff",
                  colorText: "#111827",
                  colorDanger: "#dc2626",
                  borderRadius: "12px",
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  spacingUnit: "4px",
                },
                rules: {
                  ".Input": {
                    border: "1px solid #d1d5db",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    padding: "10px 14px",
                  },
                  ".Input:focus": {
                    border: "1px solid #059669",
                    boxShadow: "0 0 0 2px rgba(5, 150, 105, 0.2)",
                  },
                },
              },
            }}
          >
            <StripePaymentForm
              cardHolderName={cardHolderName}
              onCardHolderNameChange={onCardHolderNameChange}
              totalAmountFormatted={totalAmountFormatted}
              orderNumber={orderNumber}
              onSuccessRedirectUrl={onSuccessRedirectUrl}
              isPreparing={isPreparing}
            />
          </Elements>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              {isPreparing ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <CreditCard className="size-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">
                {isPreparing
                  ? "Connexion sécurisée aux serveurs de paiement Stripe..."
                  : "Complétez votre adresse pour afficher la saisie bancaire sécurisée."}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Vos coordonnées bancaires ne transitent jamais sur nos serveurs.
              </p>
            </div>
            {!isPreparing && onInitializeIntent && (
              <button
                type="button"
                onClick={onInitializeIntent}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
              >
                Activer la section paiement maintenant
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
