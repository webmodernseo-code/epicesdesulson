"use client";

import { useState } from "react";

export default function ShippingAddressV1() {
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <div className="border border-gray-200/90 rounded-2xl sm:rounded-3xl bg-white shadow-2xs overflow-hidden mb-6">
      {/* Header bar */}
      <div className="py-3.5 px-4 sm:px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="size-7 sm:size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-truck text-base sm:text-lg text-white" />
          </span>
          <h5 className="font-bold text-sm sm:text-base text-white tracking-wide">
            1. Adresse de Livraison
          </h5>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-white/95 bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 self-start sm:self-auto">
          <i className="hgi hgi-stroke hgi-package-box text-xs sm:text-sm text-white" />
          <span>Expédition rapide 24/48h</span>
        </span>
      </div>

      <div className="p-4 sm:p-6">
        <form className="space-y-3.5">
          {/* Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Votre prénom"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Votre nom de famille"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email de confirmation <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="adresse@email.com"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Téléphone pour la livraison <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
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
              placeholder="Numéro et nom de voie, bâtiment, étage..."
              className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>

          {/* Code postal, Ville & Pays */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Code Postal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="75001"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Paris"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Pays <span className="text-red-500">*</span>
              </label>
              <select
                defaultValue="FR"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              >
                <option value="FR">France Métropolitaine</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="LU">Luxembourg</option>
              </select>
            </div>
          </div>

          {/* Instructions de livraison */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Instructions particulières pour le livreur (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Digicode, interphone, étage..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
