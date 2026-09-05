"use client";

import { useState } from "react";

export default function ShippingAddressV1() {
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl sm:rounded-3xl bg-white shadow-2xs overflow-hidden mb-6">
      {/* Header bar in luxury dark green with clean SVG icons */}
      <div className="py-3.5 px-4 sm:px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="size-7 sm:size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-truck text-base sm:text-lg text-white" />
          </span>
          <h5 className="font-bold text-sm sm:text-base text-white tracking-wide">
            1. Adresse de Livraison
          </h5>
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-white bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30 inline-flex items-center gap-1.5 shadow-2xs self-start sm:self-auto">
          <i className="hgi hgi-stroke hgi-package-box text-xs sm:text-sm text-white" />
          <span>Expédition rapide 24/48h</span>
        </span>
      </div>

      <div className="p-4 sm:p-7">
        <form className="space-y-4">
          {/* Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Prénom *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Jean"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Nom de famille *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Dupont"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email (confirmation & facture) *
              </label>
              <input
                type="email"
                required
                placeholder="jean.dupont@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Téléphone (suivi de livraison) *
              </label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          {/* Adresse postale */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Adresse postale de livraison *
            </label>
            <input
              type="text"
              required
              placeholder="Numéro et nom de voie, bâtiment, étage..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>

          {/* Code postal, Ville & Pays */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Code Postal *
              </label>
              <input
                type="text"
                required
                placeholder="75001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Ville *
              </label>
              <input
                type="text"
                required
                placeholder="Paris"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Pays de livraison *
              </label>
              <select
                defaultValue="FR"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
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
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Instructions particulières (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Code d'accès, interphone, étage..."
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
