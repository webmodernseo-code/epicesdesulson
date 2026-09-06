"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Switch from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { MoneyBagIcon, SheildIcon, FlashIcon } from "@/icons";

interface GatewayState {
  isEnabled: boolean;
  isLiveMode: boolean;
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  hasSecretKey: boolean;
}

interface PayPalState {
  isEnabled: boolean;
  isLiveMode: boolean;
  clientId: string;
  secretKey: string;
  hasSecretKey: boolean;
}

import {
  StripeLogo,
  PaypalLogo,
  ApplePayLogo,
  VisaLogo,
  MastercardLogo,
} from "@/components/common/payment-icons";

export default function PaymentApiSettings() {
  const [loading, setLoading] = useState(false);

  // Stripe state & test
  const [testingStripe, setTestingStripe] = useState(false);
  const [stripeStatusMessage, setStripeStatusMessage] = useState<string | null>(null);
  const [stripeStatusSuccess, setStripeStatusSuccess] = useState<boolean | null>(null);

  // PayPal state & test
  const [testingPaypal, setTestingPaypal] = useState(false);
  const [paypalStatusMessage, setPaypalStatusMessage] = useState<string | null>(null);
  const [paypalStatusSuccess, setPaypalStatusSuccess] = useState<boolean | null>(null);

  // Password visibility
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showStripeWebhook, setShowStripeWebhook] = useState(false);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);

  // Stripe State
  const [stripe, setStripe] = useState<GatewayState>({
    isEnabled: true,
    isLiveMode: true,
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    hasSecretKey: false,
  });

  // PayPal State
  const [paypal, setPaypal] = useState<PayPalState>({
    isEnabled: true,
    isLiveMode: true,
    clientId: "",
    secretKey: "",
    hasSecretKey: false,
  });

  // Fetch initial configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/settings/payment-gateways");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.stripe) {
              setStripe({
                isEnabled: json.data.stripe.isEnabled,
                isLiveMode: json.data.stripe.isLiveMode,
                publishableKey: json.data.stripe.publishableKey || "",
                secretKey: json.data.stripe.secretKey || "",
                webhookSecret: json.data.stripe.webhookSecret || "",
                hasSecretKey: json.data.stripe.hasSecretKey,
              });
            }
            if (json.data.paypal) {
              setPaypal({
                isEnabled: json.data.paypal.isEnabled,
                isLiveMode: json.data.paypal.isLiveMode,
                clientId: json.data.paypal.clientId || "",
                secretKey: json.data.paypal.secretKey || "",
                hasSecretKey: json.data.paypal.hasSecretKey,
              });
            }
          }
        }
      } catch (err) {
        console.warn("Utilisation de la configuration par défaut.", err);
      }
    };

    fetchConfig();
  }, []);

  // Test Stripe Connection
  const handleTestStripe = async () => {
    setTestingStripe(true);
    setStripeStatusMessage(null);
    setStripeStatusSuccess(null);

    try {
      const res = await fetch("/api/settings/payment-gateways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          gateway: "stripe",
          secretKey: stripe.secretKey,
          isLiveMode: stripe.isLiveMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStripeStatusSuccess(true);
        setStripeStatusMessage(data.message || "Connexion Stripe validée avec succès !");
        toast.success("Connexion Stripe opérationnelle !");
      } else {
        setStripeStatusSuccess(false);
        setStripeStatusMessage(data.error || "Impossible de joindre Stripe avec ces identifiants.");
        toast.error(data.error || "Échec du test de connexion Stripe.");
      }
    } catch {
      setStripeStatusSuccess(false);
      setStripeStatusMessage("Erreur réseau lors de la communication avec l'API Stripe.");
      toast.error("Erreur de connexion.");
    } finally {
      setTestingStripe(false);
    }
  };

  // Test PayPal Connection
  const handleTestPaypal = async () => {
    setTestingPaypal(true);
    setPaypalStatusMessage(null);
    setPaypalStatusSuccess(null);

    try {
      const res = await fetch("/api/settings/payment-gateways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          gateway: "paypal",
          clientId: paypal.clientId,
          secretKey: paypal.secretKey,
          isLiveMode: paypal.isLiveMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPaypalStatusSuccess(true);
        setPaypalStatusMessage(data.message || "Connexion PayPal validée avec succès !");
        toast.success("Connexion PayPal opérationnelle !");
      } else {
        setPaypalStatusSuccess(false);
        setPaypalStatusMessage(data.error || "Impossible de joindre PayPal avec ces identifiants.");
        toast.error(data.error || "Échec du test PayPal.");
      }
    } catch {
      setPaypalStatusSuccess(false);
      setPaypalStatusMessage("Erreur réseau lors de la communication avec l'API PayPal.");
      toast.error("Erreur de connexion PayPal.");
    } finally {
      setTestingPaypal(false);
    }
  };

  // Save Settings
  const handleSaveAll = async () => {
    setLoading(true);
    try {
      // 1. Save Stripe
      const resStripe = await fetch("/api/settings/payment-gateways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway: "stripe",
          isEnabled: stripe.isEnabled,
          isLiveMode: stripe.isLiveMode,
          publishableKey: stripe.publishableKey,
          secretKey: stripe.secretKey,
          webhookSecret: stripe.webhookSecret,
        }),
      });

      // 2. Save PayPal
      const resPaypal = await fetch("/api/settings/payment-gateways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway: "paypal",
          isEnabled: paypal.isEnabled,
          isLiveMode: paypal.isLiveMode,
          clientId: paypal.clientId,
          secretKey: paypal.secretKey,
        }),
      });

      if (resStripe.ok && resPaypal.ok) {
        toast.success("Vos clés de paiement ont été enregistrées avec succès !");
      } else {
        toast.error("Une erreur est survenue lors de l'enregistrement.");
      }
    } catch {
      toast.error("Erreur de communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner: Reassurance */}
      <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 border border-emerald-800/60 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <MoneyBagIcon className="size-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                Encaissement Direct des Ventes & Clés API
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
                Renseignez vos identifiants d'API. Les fonds des commandes sont automatiquement versés à 100% sur vos comptes professionnels.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/80 px-3.5 py-1.5 rounded-full border border-emerald-700/60 text-xs font-semibold text-emerald-300 shrink-0">
            <SheildIcon className="size-4 text-emerald-400" />
            <span>Chiffrement SSL & PCI-DSS</span>
          </div>
        </div>
      </div>

      {/* ── CARD 1: STRIPE & CARTES BANCAIRES / APPLE PAY ── */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 shadow-2xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="h-11 px-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-center shrink-0">
              <StripeLogo className="h-5 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-gray-900">
                  Stripe (Cartes Bancaires, Visa, Mastercard, Apple Pay)
                </h4>
                {stripe.isEnabled ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Actif
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Paiements par CB, Cartes Bleues, Apple Pay & Google Pay avec virement automatique sur votre RIB.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">Activer Stripe :</span>
            <Switch
              checked={stripe.isEnabled}
              onChange={(val) => setStripe((prev) => ({ ...prev, isEnabled: val }))}
            />
          </div>
        </div>

        {/* Mode Selector (Test / Live) */}
        <div className="bg-gray-50/80 rounded-xl p-3.5 sm:p-4 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-900">
              Environnement Stripe
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500">
              {stripe.isLiveMode
                ? "Mode Réel (Production) : Les clients paient avec de véritables cartes bancaires."
                : "Mode Test (Sandbox) : Permet de tester les commandes sans débit bancaire réel."}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shrink-0">
            <span
              className={`text-xs font-bold ${
                !stripe.isLiveMode ? "text-amber-600" : "text-gray-400"
              }`}
            >
              Test (Sandbox)
            </span>
            <Switch
              checked={stripe.isLiveMode}
              onChange={(val) => setStripe((prev) => ({ ...prev, isLiveMode: val }))}
            />
            <span
              className={`text-xs font-bold ${
                stripe.isLiveMode ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              Mode Réel (Live)
            </span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-4">
          {/* Publishable Key */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Clé Publique Stripe (Publishable Key)
            </label>
            <input
              type="text"
              value={stripe.publishableKey}
              onChange={(e) =>
                setStripe((prev) => ({ ...prev, publishableKey: e.target.value }))
              }
              placeholder="pk_live_51Pxxxxxxxxxxxxxxxxxxxx"
              className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Commence par <code className="text-gray-600">pk_live_</code> en production ou <code className="text-gray-600">pk_test_</code> en test.
            </p>
          </div>

          {/* Secret Key */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Clé Secrète Stripe (Secret Key)
            </label>
            <div className="relative">
              <input
                type={showStripeSecret ? "text" : "password"}
                value={stripe.secretKey}
                onChange={(e) =>
                  setStripe((prev) => ({ ...prev, secretKey: e.target.value }))
                }
                placeholder="sk_live_51Pxxxxxxxxxxxxxxxxxxxx"
                className="w-full h-11 px-3.5 pr-11 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowStripeSecret(!showStripeSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showStripeSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Clé confidentielle utilisée pour communiquer avec l'API Stripe côté serveur.
            </p>
          </div>

          {/* Webhook Secret */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Secret Webhook Stripe (Facultatif mais recommandé)
            </label>
            <div className="relative">
              <input
                type={showStripeWebhook ? "text" : "password"}
                value={stripe.webhookSecret}
                onChange={(e) =>
                  setStripe((prev) => ({ ...prev, webhookSecret: e.target.value }))
                }
                placeholder="whsec_xxxxxxxxxxxxxxxxxxxx"
                className="w-full h-11 px-3.5 pr-11 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowStripeWebhook(!showStripeWebhook)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showStripeWebhook ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              URL du Webhook : <code className="text-emerald-700 font-semibold">https://epicesdesulson.com/api/webhooks/stripe</code>
            </p>
          </div>
        </div>

        {/* Test Connection Button & Status */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestStripe}
            disabled={testingStripe}
            className="rounded-full border-gray-300 hover:bg-gray-50 text-xs font-bold gap-2 cursor-pointer"
          >
            {testingStripe ? (
              <>
                <RefreshCw className="size-3.5 animate-spin text-emerald-600" />
                <span>Vérification Stripe en cours...</span>
              </>
            ) : (
              <>
                <FlashIcon className="size-3.5 text-amber-500" />
                <span>Tester la connexion Stripe</span>
              </>
            )}
          </Button>

          {stripeStatusMessage && (
            <div
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                stripeStatusSuccess
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {stripeStatusSuccess ? (
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="size-4 text-red-600 shrink-0" />
              )}
              <span>{stripeStatusMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── CARD 2: PAYPAL ── */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 shadow-2xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="h-11 px-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-center shrink-0">
              <PaypalLogo className="h-5.5 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-gray-900">
                  PayPal (Compte PayPal & Paiement Direct en 1 Clic)
                </h4>
                {paypal.isEnabled ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Actif
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Désactivé
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Paiement instantané par solde PayPal avec reversement direct sur votre compte PayPal Business.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600">Activer PayPal :</span>
            <Switch
              checked={paypal.isEnabled}
              onChange={(val) => setPaypal((prev) => ({ ...prev, isEnabled: val }))}
            />
          </div>
        </div>

        {/* Mode Selector (Test / Live) */}
        <div className="bg-gray-50/80 rounded-xl p-3.5 sm:p-4 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-bold text-gray-900">
              Environnement PayPal
            </p>
            <p className="text-[11px] sm:text-xs text-gray-500">
              {paypal.isLiveMode
                ? "Mode Réel (Production) : Encaissements effectifs sur votre compte PayPal professionnel."
                : "Mode Test (Sandbox) : Tests avec les comptes fictifs PayPal Sandbox."}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shrink-0">
            <span
              className={`text-xs font-bold ${
                !paypal.isLiveMode ? "text-amber-600" : "text-gray-400"
              }`}
            >
              Test (Sandbox)
            </span>
            <Switch
              checked={paypal.isLiveMode}
              onChange={(val) => setPaypal((prev) => ({ ...prev, isLiveMode: val }))}
            />
            <span
              className={`text-xs font-bold ${
                paypal.isLiveMode ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              Mode Réel (Live)
            </span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              PayPal Client ID (REST API)
            </label>
            <input
              type="text"
              value={paypal.clientId}
              onChange={(e) =>
                setPaypal((prev) => ({ ...prev, clientId: e.target.value }))
              }
              placeholder="AXxxx... ou Client ID Live"
              className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Disponible sur votre compte <span className="font-semibold text-gray-600">developer.paypal.com → Apps & Credentials</span>.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              PayPal Secret Key (Facultatif pour SDK JS)
            </label>
            <div className="relative">
              <input
                type={showPaypalSecret ? "text" : "password"}
                value={paypal.secretKey}
                onChange={(e) =>
                  setPaypal((prev) => ({ ...prev, secretKey: e.target.value }))
                }
                placeholder="EKxxx... ou Secret Key"
                className="w-full h-11 px-3.5 pr-11 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPaypalSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Permet la vérification et capture d'ordres côté serveur.
            </p>
          </div>
        </div>

        {/* Test Connection Button & Status */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleTestPaypal}
            disabled={testingPaypal}
            className="rounded-full border-gray-300 hover:bg-gray-50 text-xs font-bold gap-2 cursor-pointer"
          >
            {testingPaypal ? (
              <>
                <RefreshCw className="size-3.5 animate-spin text-blue-600" />
                <span>Vérification PayPal en cours...</span>
              </>
            ) : (
              <>
                <FlashIcon className="size-3.5 text-blue-600" />
                <span>Tester la connexion PayPal</span>
              </>
            )}
          </Button>

          {paypalStatusMessage && (
            <div
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                paypalStatusSuccess
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {paypalStatusSuccess ? (
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="size-4 text-red-600 shrink-0" />
              )}
              <span>{paypalStatusMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          onClick={handleSaveAll}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-full shadow-sm text-sm cursor-pointer"
        >
          {loading ? "Enregistrement en cours..." : "Enregistrer toutes les configurations"}
        </Button>
      </div>
    </div>
  );
}
