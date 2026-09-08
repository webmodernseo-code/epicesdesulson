"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Check, Loader2 } from "lucide-react";

export interface ShippingAddressData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street: string;
  address2?: string;
  postalCode: string;
  city: string;
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
    onChange("street", suggestion.name || suggestion.label);
    onChange("postalCode", suggestion.postcode);
    onChange("city", suggestion.city);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Header Apple / Stripe Style */}
      <div className="py-4 px-5 sm:px-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <span className="size-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center shrink-0">
            1
          </span>
          <h2 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            Informations client & Livraison
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60 font-medium self-start sm:self-auto">
          <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
          <span>Expédition soignée sous 24h</span>
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Prénom & Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Jean"
                value={data.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl border ${
                  errors.firstName ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              {errors.firstName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Dupont"
                value={data.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl border ${
                  errors.lastName ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              {errors.lastName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email de confirmation (Sans le champ téléphone comme demandé) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Adresse e-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="jean.dupont@example.fr"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`w-full h-11 px-3.5 rounded-xl border ${
                errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Adresse avec auto-complétion prédictive */}
          <div className="relative" ref={suggestionsRef}>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                Adresse <span className="text-red-500">*</span>
              </label>
              {isLoadingSuggestions && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600">
                  <Loader2 className="size-3 animate-spin" />
                  <span>Recherche d'adresse...</span>
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="Commencez à saisir votre adresse (ex: 361 allée de berlioz...)"
                value={data.street}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onChange={(e) => {
                  onChange("street", e.target.value);
                  setShowSuggestions(true);
                }}
                className={`w-full h-11 px-3.5 pr-9 rounded-xl border ${
                  errors.street ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              <MapPin className="size-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Menu Déroulant des Suggestions Prédictives */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden divide-y divide-gray-100 max-h-60 overflow-y-auto custom-scrollbar">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50/70 transition-colors flex items-center gap-2.5 group cursor-pointer"
                  >
                    <div className="size-6 rounded-lg bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
                      <MapPin className="size-3.5 text-gray-600 group-hover:text-emerald-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 group-hover:text-emerald-950 truncate">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {item.postcode} {item.city}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {errors.street && (
              <p className="text-[11px] text-red-600 mt-1">{errors.street}</p>
            )}
          </div>

          {/* Complément d'adresse (optionnel) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Complément d'adresse <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <input
              type="text"
              placeholder="Appartement, bâtiment, escalier, étage..."
              value={data.address2 || ""}
              onChange={(e) => onChange("address2", e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-gray-300 focus:border-emerald-600 focus:ring-emerald-600 bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition"
            />
          </div>

          {/* Code postal, Ville & Pays */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Code postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="75001"
                value={data.postalCode}
                onChange={(e) => onChange("postalCode", e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl border ${
                  errors.postalCode ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              {errors.postalCode && (
                <p className="text-[11px] text-red-600 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Paris"
                value={data.city}
                onChange={(e) => onChange("city", e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl border ${
                  errors.city ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              {errors.city && (
                <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Pays <span className="text-red-500">*</span>
              </label>
              <select
                value={data.country}
                onChange={(e) => onChange("country", e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
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
