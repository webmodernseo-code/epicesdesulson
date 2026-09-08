"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2, CheckCircle2, ShieldCheck, Search } from "lucide-react";

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
}

interface ShippingAddressProps {
  data: ShippingAddressData;
  onChange: (field: keyof ShippingAddressData, value: string) => void;
  errors?: Partial<Record<keyof ShippingAddressData, string>>;
}

interface AddressSuggestion {
  label: string;
  streetName: string;
  postcode: string;
  city: string;
  context?: string;
  source?: "BAN_FRANCE" | "INTERNATIONAL";
}

export default function ShippingAddressV1({
  data,
  onChange,
  errors = {},
}: ShippingAddressProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isVerified, setIsVerified] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Address Autocomplete via official French BAN API + International OpenStreetMap
  const fetchAddressSuggestions = useCallback(async (query: string, country: string) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);

    try {
      if (country === "France") {
        // Official French National Address Database (BAN)
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.features && Array.isArray(json.features)) {
            const list: AddressSuggestion[] = json.features.map((f: any) => ({
              label: f.properties.label || f.properties.name,
              streetName: f.properties.name || f.properties.street || f.properties.label,
              postcode: f.properties.postcode || "",
              city: f.properties.city || "",
              context: f.properties.context || "",
              source: "BAN_FRANCE",
            }));
            setSuggestions(list);
            setShowSuggestions(list.length > 0);
            setSelectedIndex(-1);
          }
        }
      } else {
        // European & International Autocomplete via Photon/OSM
        const countryCodeMap: Record<string, string> = {
          Belgique: "be",
          Suisse: "ch",
          Luxembourg: "lu",
        };
        const cc = countryCodeMap[country];
        const url = cc
          ? `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`
          : `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`;

        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.features && Array.isArray(json.features)) {
            const list: AddressSuggestion[] = json.features
              .map((f: any) => {
                const p = f.properties || {};
                const name = p.name || p.street || "";
                const city = p.city || p.locality || p.district || "";
                const postcode = p.postcode || "";
                const countryName = p.country || country;
                const fullLabel = [name, postcode, city, countryName].filter(Boolean).join(", ");
                return {
                  label: fullLabel,
                  streetName: name,
                  postcode: postcode,
                  city: city,
                  context: countryName,
                  source: "INTERNATIONAL" as const,
                };
              })
              .filter((item: AddressSuggestion) => item.streetName.length > 0);
            setSuggestions(list);
            setShowSuggestions(list.length > 0);
            setSelectedIndex(-1);
          }
        }
      }
    } catch {
      // Ignore network errors gracefully
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Debounced input fetch
  useEffect(() => {
    const query = data.street?.trim();
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchAddressSuggestions(query, data.country);
    }, 150);

    return () => clearTimeout(timer);
  }, [data.street, data.country, fetchAddressSuggestions]);

  // Click outside listener
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

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange("street", suggestion.label);
    if (suggestion.postcode) onChange("postalCode", suggestion.postcode);
    if (suggestion.city) onChange("city", suggestion.city);
    setIsVerified(true);
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

          {/* ─── Adresse Complète avec Auto-Complétion Officielle ─── */}
          <div className="relative" ref={suggestionsRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-800">
                Adresse complète de livraison <span className="text-red-500">*</span>
              </label>

              {isLoadingSuggestions && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium animate-pulse">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Recherche d'adresse officielle...</span>
                </span>
              )}
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                required
                placeholder="Tapez votre adresse (ex: 12 rue de la Paix, 361 allée Berlioz...)"
                value={data.street}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onChange={(e) => {
                  onChange("street", e.target.value);
                  setIsVerified(false);
                  setShowSuggestions(true);
                }}
                className={`w-full h-12 pl-4 pr-11 rounded-xl border ${
                  isVerified
                    ? "border-emerald-500 ring-1 ring-emerald-500/30 bg-emerald-50/10"
                    : errors.street
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-white"
                    : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600 bg-white"
                } text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
              />

              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {isVerified ? (
                  <CheckCircle2 className="size-5 text-emerald-600 animate-in fade-in" />
                ) : (
                  <Search className="size-4.5 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Verification Status Badge */}
            {isVerified && (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                <span>Adresse certifiée et validée pour la livraison</span>
              </div>
            )}

            {/* ─── Menu Déroulant des Suggestions Prédictives Officielles ─── */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-[999] left-0 right-0 mt-2 bg-white rounded-2xl border border-emerald-200/80 shadow-2xl overflow-hidden divide-y divide-gray-100 max-h-72 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-emerald-600" />
                    <span>Suggestions d'adresses officielles</span>
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
                            : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
                        }`}
                      >
                        <MapPin className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight truncate">
                          {item.label}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {item.postcode && (
                            <span className="font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
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
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          Officielle
                        </span>
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

          {/* Complément d'adresse (optionnel) & Pays */}
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
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Pays de destination <span className="text-red-500">*</span>
              </label>
              <select
                value={data.country}
                onChange={(e) => {
                  onChange("country", e.target.value);
                  setIsVerified(false);
                }}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition font-medium"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Luxembourg">Luxembourg</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
