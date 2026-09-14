"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2, CheckCircle2, ShieldCheck, Search, Check, Home, ArrowRight } from "lucide-react";

export interface ShippingAddressData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  country: string;
  instructions?: string;
  isBanVerified?: boolean;
}

interface ShippingAddressProps {
  data: ShippingAddressData;
  onChange: (field: keyof ShippingAddressData, value: string | boolean) => void;
  errors?: Partial<Record<keyof ShippingAddressData, string>>;
  onContinue?: () => void;
}

interface AddressSuggestion {
  label: string;
  streetName: string;
  postcode: string;
  city: string;
  context: string;
  type: string;
  housenumber?: string;
  hasStreetNumber: boolean;
}

export default function ShippingAddressV1({
  data,
  onChange,
  errors = {},
  onContinue,
}: ShippingAddressProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Exclusive search on French National Address Database (BAN / data.gouv.fr)
  // Prioritizing addresses with street numbers at the beginning
  const fetchBanSuggestions = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);

    try {
      const cleanQuery = query.trim();
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(cleanQuery)}&limit=12`
      );
      if (res.ok) {
        const json = await res.json();
        if (json.features && Array.isArray(json.features)) {
          const rawList: AddressSuggestion[] = json.features.map((f: any) => {
            const hasNum = Boolean(
              f.properties.housenumber ||
              /^\d+/.test(f.properties.name || "") ||
              /^\d+/.test(f.properties.label || "") ||
              f.properties.type === "housenumber"
            );
            return {
              label: f.properties.label || f.properties.name,
              streetName: f.properties.name || f.properties.street || f.properties.label,
              postcode: f.properties.postcode || "",
              city: f.properties.city || "",
              context: f.properties.context || "France",
              type: f.properties.type === "housenumber" ? "N° avec Rue" : "Voie",
              housenumber: f.properties.housenumber || "",
              hasStreetNumber: hasNum,
            };
          });

          // Sort: STRICT PRIORITY to addresses starting with a house number
          const sorted = rawList.sort((a, b) => {
            if (a.hasStreetNumber && !b.hasStreetNumber) return -1;
            if (!a.hasStreetNumber && b.hasStreetNumber) return 1;
            return 0;
          });

          const finalSuggestions = sorted.slice(0, 7);
          setSuggestions(finalSuggestions);
          setShowSuggestions(finalSuggestions.length > 0);
          setSelectedIndex(-1);
        }
      }
    } catch {
      // Ignore network errors gracefully
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Debounced BAN query
  useEffect(() => {
    const query = data.street?.trim();
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // If already verified with exact matching label, do not reopen menu automatically
    if (data.isBanVerified && data.postalCode && data.city) {
      return;
    }

    const timer = setTimeout(() => {
      fetchBanSuggestions(query);
    }, 120);

    return () => clearTimeout(timer);
  }, [data.street, data.isBanVerified, data.postalCode, data.city, fetchBanSuggestions]);

  // Click outside to dismiss suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler when selecting an official BAN address
  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange("street", suggestion.label);
    onChange("postalCode", suggestion.postcode);
    onChange("city", suggestion.city);
    // Automatic country auto-fill on BAN address validation
    onChange("country", "France");
    onChange("isBanVerified", true);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-visible relative">
      {/* ─── Header Apple / Stripe Style ─── */}
      <div className="py-4 sm:py-5 px-5 sm:px-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-t-2xl">
        <div className="flex items-center gap-3.5">
          <span className="size-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
            1
          </span>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-950 tracking-tight">
              Informations client & Livraison
            </h2>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-full border border-emerald-200/70 font-semibold self-start sm:self-auto">
          <svg
            className="size-4 text-emerald-600 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
          <span>Expédition soignée sous 24h</span>
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="space-y-5">
          {/* Prénom & Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jean"
                value={data.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border ${
                  errors.firstName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Dupont"
                value={data.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border ${
                  errors.lastName
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email de confirmation */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Adresse e-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="jean.dupont@example.fr"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`w-full h-12 px-4 rounded-xl border ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              } bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.email}</p>
            )}
          </div>

          {/* ─── Adresse Certifiée BAN (Base Adresse Nationale) avec priorité aux numéros de rue ─── */}
          <div className="relative" ref={suggestionsRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-800">
                Adresse de livraison certifiée (avec n° de rue) <span className="text-red-500">*</span>
              </label>

              {isLoadingSuggestions && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium animate-pulse">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Recherche officielle BAN...</span>
                </span>
              )}
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                required
                placeholder="Tapez votre numéro et rue (ex: 12 rue de la Paix, 361 allée Berlioz...)"
                value={data.street}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0 && !data.isBanVerified) {
                    setShowSuggestions(true);
                  }
                }}
                onChange={(e) => {
                  onChange("street", e.target.value);
                  onChange("isBanVerified", false);
                  setShowSuggestions(true);
                }}
                className={`w-full h-12 pl-4 pr-11 rounded-xl border ${
                  data.isBanVerified
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/15 font-medium text-emerald-950"
                    : errors.street
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-white"
                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600 bg-white"
                } text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
              />

              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {data.isBanVerified ? (
                  <CheckCircle2 className="size-5 text-emerald-600" />
                ) : (
                  <Search className="size-4.5 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Verification Status Banner */}
            {data.isBanVerified ? (
              <div className="mt-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900 font-medium animate-in fade-in">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Adresse certifiée BAN :</strong> {data.street} • {data.postalCode} {data.city} • France
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Validée
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="size-3 text-emerald-600 shrink-0" />
                <span>Indiquez votre numéro et sélectionnez l'adresse officielle dans la liste BAN.</span>
              </p>
            )}

            {/* ─── Menu Déroulant des Suggestions Officielles BAN (Priorité aux numéros de rue) ─── */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-[999] left-0 right-0 mt-2 bg-white rounded-2xl border border-emerald-200/90 shadow-2xl overflow-hidden divide-y divide-gray-100 max-h-72 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    <span>Adresses certifiées BAN (Priorité n° de voirie)</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Cliquez pour valider</span>
                </div>

                {suggestions.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 group cursor-pointer ${
                        isSelected ? "bg-emerald-50/90 text-emerald-950" : "hover:bg-gray-50/80 text-gray-900"
                      }`}
                    >
                      <div
                        className={`size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : item.hasStreetNumber
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-600 group-hover:bg-emerald-50"
                        }`}
                      >
                        {item.hasStreetNumber ? (
                          <Home className="size-4" />
                        ) : (
                          <MapPin className="size-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight truncate flex items-center gap-1.5">
                          <span>{item.label}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {item.postcode && (
                            <span className="font-semibold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
                              {item.postcode}
                            </span>
                          )}
                          {item.city && <span>{item.city}</span>}
                          {item.context && (
                            <span className="text-gray-400 text-[11px] truncate">
                              • {item.context}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 self-center">
                        {item.hasStreetNumber ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
                            <Check className="size-2.5 text-emerald-600" />
                            N° Précis
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                            Voie
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {errors.street && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.street}</p>
            )}
          </div>

          {/* Complément d'adresse (optionnel) & Pays Rempli Automatiquement */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Complément d'adresse <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                placeholder="Appartement, bâtiment, escalier, étage..."
                value={data.address2 || ""}
                onChange={(e) => onChange("address2", e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-emerald-600 bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-800">
                  Pays de livraison
                </label>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="size-3 text-emerald-600" />
                  <span>France &amp; Europe</span>
                </span>
              </div>
              <select
                value={data.country || "France"}
                onChange={(e) => onChange("country", e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-base sm:text-sm text-gray-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition cursor-pointer"
              >
                <option value="France">France (10 € • Offert dès 45 €)</option>
                <option value="Belgique">Belgique (14 € • Réduit dès 45 €)</option>
                <option value="Suisse">Suisse (14 € • Réduit dès 45 €)</option>
                <option value="Luxembourg">Luxembourg (14 € • Réduit dès 45 €)</option>
                <option value="Allemagne">Allemagne (14 € • Réduit dès 45 €)</option>
                <option value="Espagne">Espagne (14 € • Réduit dès 45 €)</option>
                <option value="Italie">Italie (14 € • Réduit dès 45 €)</option>
                <option value="Pays-Bas">Pays-Bas (14 € • Réduit dès 45 €)</option>
                <option value="Portugal">Portugal (14 € • Réduit dès 45 €)</option>
                <option value="Royaume-Uni">Royaume-Uni (14 € • Réduit dès 45 €)</option>
                <option value="Europe">Autre pays d'Europe (14 €)</option>
              </select>
            </div>
          </div>

          {/* Bouton d'action Étape 1 : Valider et Continuer */}
          {onContinue && (
            <div className="pt-5 mt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>Adresse protégée et conforme aux normes postales</span>
              </div>
              <button
                type="button"
                onClick={onContinue}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Valider et passer au paiement</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
