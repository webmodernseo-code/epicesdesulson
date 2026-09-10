"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowUpRight, ShieldCheck } from "lucide-react";

interface GatewayInfo {
  isEnabled: boolean;
  isLiveMode: boolean;
  hasSecretKey: boolean;
}

import { StripeLogo, PaypalLogo } from "@/components/common/payment-icons";

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
        <div className="p-4 rounded-xl border border-gray-200/80 bg-gray-50/50 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-10 px-3 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <StripeLogo className="h-5.5 w-auto" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-gray-900 shrink-0">Stripe & Cartes Bancaires</h4>
                {stripeInfo.isEnabled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/90 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    <span>{stripeInfo.isLiveMode ? "Mode Réel (Live)" : "Mode Test"}</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-gray-600 bg-gray-200 border border-gray-300/80 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Visa, Mastercard, Amex, Apple Pay & Google Pay (Virements automatiques sur votre RIB).
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-0.5 self-end sm:self-start">
            {stripeInfo.hasSecretKey ? (
              <CheckCircle2 className="size-5 text-emerald-600" />
            ) : (
              <AlertCircle className="size-5 text-amber-500" />
            )}
          </div>
        </div>

        {/* PayPal Gateway Card */}
        <div className="p-4 rounded-xl border border-gray-200/80 bg-gray-50/50 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-10 px-3 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <PaypalLogo className="h-5.5 w-auto" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-gray-900 shrink-0">PayPal Direct</h4>
                {paypalInfo.isEnabled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/90 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    <span>{paypalInfo.isLiveMode ? "Mode Réel (Live)" : "Mode Test"}</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-gray-600 bg-gray-200 border border-gray-300/80 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Paiement instantané avec compte PayPal ou carte associée (Versements directs sur votre compte).
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-0.5 self-end sm:self-start">
            <CheckCircle2 className="size-5 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
