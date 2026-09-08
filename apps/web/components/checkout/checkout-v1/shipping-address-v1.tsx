"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, Check } from "lucide-react";

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
  name: string;
  postcode: string;
  city: string;
}

export default function ShippingAddressV1({ data, onChange, errors = {} }: ShippingAddressProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Address Autocomplete via official French API (api-adresse.data.gouv.fr)
  useEffect(() => {
    const query = data.street?.trim();
    if (!query || query.length < 3 || data.country !== "France") {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true);
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&type=housenumber,street`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.features && Array.isArray(json.features)) {
            const list: AddressSuggestion[] = json.features.map((f: any) => ({
              label: f.properties.label,
              name: f.properties.name,
              postcode: f.properties.postcode,
              city: f.properties.city,
            }));
            setSuggestions(list);
            setShowSuggestions(list.length > 0);
          }
        }
      } catch (err) {
        // Ignore network errors on autocomplete
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [data.street, data.country]);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    // Fill the full address label (e.g. 361 Allée Berlioz 38130 Échirolles)
    onChange("street", suggestion.label || suggestion.name);
    if (suggestion.postcode) onChange("postalCode", suggestion.postcode);
    if (suggestion.city) onChange("city", suggestion.city);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* ─── Header Apple / Stripe Style ─── */}
      <div className="py-4 sm:py-5 px-5 sm:px-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
          <svg className="size-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  errors.firstName ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
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
                  errors.lastName ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
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
                errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              } bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Adresse complète avec auto-complétion prédictive */}
          <div className="relative" ref={suggestionsRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-800">
                Adresse complète de livraison <span className="text-red-500">*</span>
              </label>
              {isLoadingSuggestions && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Recherche d'adresse officielle...</span>
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ex: 361 allée de berlioz, 38130 Échirolles..."
                value={data.street}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onChange={(e) => {
                  onChange("street", e.target.value);
                  setShowSuggestions(true);
                }}
                className={`w-full h-12 px-4 pr-11 rounded-xl border ${
                  errors.street ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition placeholder:text-gray-400`}
              />
              <MapPin className="size-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Menu Déroulant des Suggestions Prédictives */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden divide-y divide-gray-100 max-h-64 overflow-y-auto custom-scrollbar">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50/70 transition-colors flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="size-7 rounded-lg bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
                      <MapPin className="size-4 text-gray-600 group-hover:text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-950 truncate">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.postcode} {item.city}
                      </p>
                    </div>
                  </button>
                ))}
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
                Pays <span className="text-red-500">*</span>
              </label>
              <select
                value={data.country}
                onChange={(e) => onChange("country", e.target.value)}
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
