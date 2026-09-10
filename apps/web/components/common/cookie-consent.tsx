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

const STORAGE_KEY = "sulson_cookie_consent_v3";

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
        // Display with a clean entrance
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 400);
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
        <div className="fixed inset-x-0 bottom-0 z-[99999] p-3 sm:p-6 flex justify-center pointer-events-none">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.28)] p-5 sm:p-7 pointer-events-auto flex flex-col gap-5 text-gray-900 ring-1 ring-black/5"
            role="dialog"
            aria-modal="true"
            aria-label="Gestion des cookies"
          >
            {/* Header & Main Pitch */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="size-11 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                {/* SVG Shield / Cookie Icon */}
                <svg
                  className="size-6 text-amber-600"
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
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-950 tracking-tight">
                    Respect de votre vie privée & Cookies
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 rounded-full whitespace-nowrap">
                    Conforme RGPD
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  Nous utilisons des cookies indispensables pour assurer le bon fonctionnement de la boutique (gestion de votre panier, sécurité des commandes et paiements chiffrés). Avec votre accord, nous utilisons également des mesures anonymes pour perfectionner votre expérience culinaire.
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
                  className="overflow-hidden border-t border-gray-100 pt-4 space-y-3"
                >
                  {/* Category 1: Strictly Necessary */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-gray-900">
                          Cookies strictement nécessaires
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-200/70 px-2 py-0.5 rounded whitespace-nowrap">
                          Toujours actifs
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Gestion du panier, maintien de la session et sécurisation des transactions bancaires chiffrées PCI-DSS.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="size-5 rounded text-emerald-600 cursor-not-allowed opacity-80"
                    />
                  </div>

                  {/* Category 2: Analytics */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="pr-3">
                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        Mesure d'audience & Amélioration continue
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Statistiques anonymisées pour optimiser la vitesse de chargement et perfectionner nos fiches recettes.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="size-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                    />
                  </div>

                  {/* Category 3: Preferences */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <div className="pr-3">
                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        Préférences de navigation
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Mémorisation de vos épices préférées et de vos réglages d'affichage.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferencesAllowed}
                      onChange={(e) => setPreferencesAllowed(e.target.checked)}
                      className="size-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs text-gray-500 w-full sm:w-auto justify-center sm:justify-start">
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-700 transition-colors underline underline-offset-2"
                >
                  Politique de confidentialité
                </Link>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors cursor-pointer"
                >
                  {showCustomize ? "Masquer les détails" : "Personnaliser mes choix"}
                </button>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {showCustomize ? (
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold bg-gray-900 hover:bg-black text-white shadow-md transition-all cursor-pointer"
                  >
                    Enregistrer mes choix
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleRejectNonEssential}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors cursor-pointer"
                    >
                      Refuser non-essentiels
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-extrabold bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
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
