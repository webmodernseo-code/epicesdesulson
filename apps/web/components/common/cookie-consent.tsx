"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  preferences: boolean;
  timestamp: string;
}

const STORAGE_KEY = "sulson_cookie_consent_v2";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [preferencesAllowed, setPreferencesAllowed] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const savedConsent = localStorage.getItem(STORAGE_KEY);
      if (!savedConsent) {
        // Display smoothly after initial mount
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }

    // Listen for custom event to re-open consent from footer
    const handleReopen = () => {
      setShowCustomize(true);
      setIsOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleReopen);
    return () => window.removeEventListener("open-cookie-settings", handleReopen);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (err) {
      console.warn("Cookie consent storage warning:", err);
    }
    setIsOpen(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      analytics: analyticsAllowed,
      preferences: preferencesAllowed,
      timestamp: new Date().toISOString(),
    });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[99999] p-3 sm:p-5 flex justify-center pointer-events-none">
          <motion.div
            initial={{ y: 90, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 90, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xl p-5 sm:p-6 pointer-events-auto flex flex-col gap-4 text-gray-900"
            role="dialog"
            aria-modal="true"
            aria-label="Gestion des cookies"
          >
            {/* Header & Main Pitch */}
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-2xl bg-amber-50 border border-amber-200/80 text-primary flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                {/* SVG Cookie / Shield Icon */}
                <svg
                  className="size-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 13v.01" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-gray-950">
                    Respect de votre vie privée & Cookies
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    Conforme RGPD
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1.5">
                  Nous utilisons des cookies indispensables pour assurer le bon fonctionnement de la boutique (panier, sécurité des commandes et paiements chiffrés). Avec votre consentement, nous utilisons également des mesures anonymes pour perfectionner votre expérience culinaire.
                </p>
              </div>
            </div>

            {/* Expandable Customization Panel */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t border-gray-100 pt-3 space-y-3"
                >
                  {/* Category 1: Strictly Necessary */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="pr-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900">
                          Cookies strictement nécessaires
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">
                          Toujours actifs
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Gestion du panier, maintien de la session et sécurisation des paiements PCI-DSS.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="size-4.5 rounded text-emerald-600 cursor-not-allowed opacity-80"
                    />
                  </div>

                  {/* Category 2: Analytics */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-gray-900">
                        Mesure d'audience & Amélioration continue
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Statistiques anonymisées pour optimiser le temps de chargement et nos recettes.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="size-4.5 rounded text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>

                  {/* Category 3: Preferences */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-gray-900">
                        Préférences de navigation
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Mémorisation de vos épices favorites et de vos réglages d'affichage.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferencesAllowed}
                      onChange={(e) => setPreferencesAllowed(e.target.checked)}
                      className="size-4.5 rounded text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-500 w-full sm:w-auto justify-center sm:justify-start">
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  Politique de confidentialité
                </Link>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="text-gray-700 hover:text-primary font-medium transition-colors cursor-pointer"
                >
                  {showCustomize ? "Masquer les détails" : "Personnaliser"}
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {showCustomize ? (
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:shadow-xs transition-all cursor-pointer"
                  >
                    Enregistrer mes choix
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleRejectNonEssential}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Refuser non-essentiels
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-bold bg-primary text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      Tout accepter
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
