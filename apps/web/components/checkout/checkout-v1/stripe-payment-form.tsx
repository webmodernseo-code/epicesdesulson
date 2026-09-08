"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, ShieldCheck, Loader2, ShoppingBag, CreditCard } from "lucide-react";

interface StripePaymentFormProps {
  cardHolderName: string;
  onCardHolderNameChange: (name: string) => void;
  totalAmountFormatted: string;
  orderNumber?: string;
  onSuccessRedirectUrl: string;
  isPreparing?: boolean;
}

export default function StripePaymentForm({
  cardHolderName,
  onCardHolderNameChange,
  totalAmountFormatted,
  orderNumber,
  onSuccessRedirectUrl,
  isPreparing = false,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: onSuccessRedirectUrl,
          payment_method_data: {
            billing_details: {
              name: cardHolderName.trim() || undefined,
            },
          },
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(
            error.message ||
              "Le paiement n'a pas pu être effectué. Vérifiez vos informations ou essayez un autre moyen de paiement."
          );
        } else {
          setErrorMessage(
            "Le paiement n'a pas pu être effectué. Vérifiez vos informations ou essayez un autre moyen de paiement."
          );
        }
        setIsProcessing(false);
      }
    } catch (err: any) {
      setErrorMessage(
        "Une erreur de communication est survenue. Veuillez réessayer."
      );
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header avec icône ShoppingBag */}
      <div className="flex items-start space-x-3 pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 shrink-0 shadow-2xs">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <h3 className="text-base font-bold text-gray-950">
            Confirmer et payer
          </h3>
          <p className="text-xs text-gray-500">
            Paiement direct 100% sécurisé et garanti.
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
          value={cardHolderName}
          onChange={(e) => onCardHolderNameChange(e.target.value)}
          className="w-full h-11 px-3.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
        />
      </div>

      {/* Stripe Payment Element (Saisie Sécurisée) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-700">
          Coordonnées bancaires sécurisées <span className="text-red-500">*</span>
        </label>
        <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/40">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {/* Message d'erreur clair et compréhensible */}
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
          disabled={!stripe || isProcessing || isPreparing}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              <span>Paiement en cours...</span>
            </>
          ) : isPreparing ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              <span>Préparation du paiement sécurisé...</span>
            </>
          ) : (
            <>
              <Lock className="size-4.5" />
              <span>Payer {totalAmountFormatted}</span>
            </>
          )}
        </button>

        {/* Footer Text de Réassurance */}
        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-500">
          <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
          <span>Transaction chiffrée SSL 256-bit certifiée PCI-DSS • Paiement sécurisé par Stripe</span>
        </div>
      </div>
    </form>
  );
}
