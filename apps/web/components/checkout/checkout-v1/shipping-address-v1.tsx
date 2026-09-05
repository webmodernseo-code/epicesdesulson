"use client";

import React from "react";

export interface ShippingAddressData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  instructions: string;
}

interface ShippingAddressProps {
  data: ShippingAddressData;
  onChange: (field: keyof ShippingAddressData, value: string) => void;
  errors?: Partial<Record<keyof ShippingAddressData, string>>;
}

export default function ShippingAddressV1({ data, onChange, errors = {} }: ShippingAddressProps) {
  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
      {/* Refined Header (Apple/Stripe Style: Clean white background with delicate 1px border) */}
      <div className="py-4 px-5 sm:px-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <span className="size-7 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-xs flex items-center justify-center shrink-0">
            1
          </span>
          <h2 className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            Adresse de livraison
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60 font-medium self-start sm:self-auto">
          <svg className="size-3.5 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
          <span>Expédition rapide 24/48h</span>
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-3.5">
          {/* Prénom & Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Votre prénom"
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
                placeholder="Votre nom de famille"
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

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email de confirmation <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="exemple@domaine.fr"
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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Téléphone pour la livraison <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                value={data.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                className={`w-full h-11 px-3.5 rounded-xl border ${
                  errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Adresse postale */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Adresse de livraison <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Numéro et nom de rue, voie ou lieu-dit"
              value={data.street}
              onChange={(e) => onChange("street", e.target.value)}
              className={`w-full h-11 px-3.5 rounded-xl border ${
                errors.street ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
              } bg-white text-sm text-gray-900 focus:outline-none focus:ring-1 shadow-2xs transition`}
            />
            {errors.street && (
              <p className="text-[11px] text-red-600 mt-1">{errors.street}</p>
            )}
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

          {/* Instructions de livraison */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Instructions particulières pour le livreur (facultatif)
            </label>
            <textarea
              rows={2}
              placeholder="Digicode, interphone, bâtiment, étage..."
              value={data.instructions}
              onChange={(e) => onChange("instructions", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs resize-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
