"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck } from "lucide-react";

interface GatewayInfo {
  isEnabled: boolean;
  isLiveMode: boolean;
  hasSecretKey: boolean;
}

function StripeVectorSmall() {
  return (
    <svg className="h-4 w-auto" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.64 14.28c0-4.48-2.18-8.04-6.42-8.04-4.26 0-6.84 3.56-6.84 8.01 0 5.28 3.14 7.95 7.4 7.95 2.08 0 3.65-.47 4.84-1.12v-3.41c-1.19.6-2.5.94-4.04.94-1.63 0-3.04-.63-3.23-2.52h8.22c.04-.51.07-1.28.07-1.81zm-8.23-1.65c.02-1.78.96-2.48 2.22-2.48 1.22 0 2.12.7 2.12 2.48h-4.34zm-8.89-6.39c-1.72 0-2.82.8-3.37 1.37l-.23-1.09h-4.33v21.82l4.97-1.06.01-5.26c.58.5 1.57 1.15 3.01 1.15 3.03 0 5.86-2.4 5.86-7.85 0-5.06-2.79-9.08-5.92-9.08zm-1.19 12.01c-1.28 0-2.02-.46-2.52-.99l-.02-6.19c.54-.59 1.33-1.03 2.54-1.03 1.95 0 3.2 1.83 3.2 4.09 0 2.33-1.23 4.12-3.2 4.12zm-12.71-3.69l-.02-.85c0-1.87 1.48-2.61 3.91-2.61 1.14 0 2.29.21 3.26.68v-3.79c-1.08-.43-2.34-.63-3.66-.63-3.97 0-6.52 2.08-6.52 5.56 0 5.43 7.44 4.56 7.44 6.9 0 .61-.53.84-1.29.84-1.42 0-2.84-.52-4.07-1.21v3.91c1.37.59 2.82.85 4.25.85 4.08 0 6.74-2.02 6.74-5.61 0-5.83-7.52-4.73-7.52-7.05h-.02zm-13.43-8.32h5.04v15.65h-5.04V6.24zm0-6.24h5.04v4.46h-5.04V0zm-4.99 8.23l-.27-1.99h-4.34v15.65h4.97v-10.2c1.19-1.55 3.21-1.27 3.86-1.04v-4.4c-.75-.28-2.99-.74-4.22 1.98zm-11.44 1.16l-.28-1.16H.53l.01 15.65h4.97v-10.7c.92-.37 2.11-.27 2.58-.1v-4.34c-.66-.25-2.05-.5-3.34.65z"
        fill="#635BFF"
      />
    </svg>
  );
}

function PaypalVectorSmall() {
  return (
    <svg className="h-4.5 w-auto" viewBox="0 0 100 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.667 2.5H4.25a.833.833 0 0 0-.825.708L.542 21.792a.5.5 0 0 0 .491.575h4.083a.833.833 0 0 0 .825-.708l.842-5.334a.833.833 0 0 1 .825-.708h2.042c4.425 0 7.825-1.792 8.833-6.958.45-2.3-.016-4.109-1.325-5.267C15.717 3.017 13.9 2.5 11.667 2.5z"
        fill="#003087"
      />
      <path
        d="M12.917 8.333c-.45 2.3-2.05 6.959-7.084 6.959H3.792l-1.375 8.708h3.333a.833.833 0 0 0 .825-.708l.842-5.334a.833.833 0 0 1 .825-.708h2.042c4.425 0 7.825-1.792 8.833-6.958.45-2.3-.016-4.109-1.325-5.267-1.442-1.275-3.8-1.575-5.833-1.425-.667.283-1.042.867-1.292 2.1z"
        fill="#0079C1"
      />
      <text x="24" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" fill="#003087">
        Pay<tspan fill="#0079C1">Pal</tspan>
      </text>
    </svg>
  );
}

export default function PaymentGatewaysStatusWidget() {
  const [stripeInfo, setStripeInfo] = useState<GatewayInfo>({
    isEnabled: true,
    isLiveMode: true,
    hasSecretKey: true,
  });
  const [paypalInfo, setPaypalInfo] = useState<GatewayInfo>({
    isEnabled: true,
    isLiveMode: true,
    hasSecretKey: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGatewayStatus() {
      try {
        const res = await fetch("/api/settings/payment-gateways");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.stripe) {
              setStripeInfo({
                isEnabled: Boolean(json.data.stripe.isEnabled),
                isLiveMode: Boolean(json.data.stripe.isLiveMode),
                hasSecretKey: Boolean(json.data.stripe.hasSecretKey),
              });
            }
            if (json.data.paypal) {
              setPaypalInfo({
                isEnabled: Boolean(json.data.paypal.isEnabled),
                isLiveMode: Boolean(json.data.paypal.isLiveMode),
                hasSecretKey: Boolean(json.data.paypal.hasSecretKey),
              });
            }
          }
        }
      } catch (err) {
        console.warn("Could not load payment gateways status:", err);
      } finally {
        setLoading(false);
      }
    }

    loadGatewayStatus();
  }, []);

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="size-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5 text-emerald-700" />
          </span>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
              Passerelles d'Encaissement Direct (Stripe & PayPal)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Les fonds de chaque commande sont versés directement à 100% sur vos comptes professionnels.
            </p>
          </div>
        </div>

        <Link
          href="/settings/payment-api"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200/80 transition-all self-start sm:self-auto cursor-pointer"
        >
          <span>Gérer les clés API</span>
          <ArrowUpRight className="size-3.5 text-emerald-700" />
        </Link>
      </div>

      {/* Gateways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Stripe Gateway Card */}
        <div className="p-4 rounded-xl border border-gray-200/80 bg-gray-50/50 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 px-2.5 rounded-lg bg-indigo-50 border border-indigo-100/80 flex items-center justify-center shrink-0">
              <StripeVectorSmall />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-gray-900">Stripe & Cartes Bancaires</h4>
                {stripeInfo.isEnabled ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {stripeInfo.isLiveMode ? "Mode Réel (Live)" : "Mode Test"}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Visa, Mastercard, Amex, Apple Pay & Google Pay (Virements automatiques sur votre RIB).
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-0.5">
            {stripeInfo.hasSecretKey ? (
              <CheckCircle2 className="size-5 text-emerald-600" />
            ) : (
              <AlertCircle className="size-5 text-amber-500" />
            )}
          </div>
        </div>

        {/* PayPal Gateway Card */}
        <div className="p-4 rounded-xl border border-gray-200/80 bg-gray-50/50 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 px-2.5 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0">
              <PaypalVectorSmall />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-gray-900">PayPal (Paiement Direct en 1 Clic)</h4>
                {paypalInfo.isEnabled ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {paypalInfo.isLiveMode ? "Mode Réel (Live)" : "Mode Test"}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Paiement instantané avec compte PayPal ou carte associée (Versements directs sur votre compte).
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-0.5">
            <CheckCircle2 className="size-5 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
