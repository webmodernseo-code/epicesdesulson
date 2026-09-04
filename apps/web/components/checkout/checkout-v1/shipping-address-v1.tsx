"use client";

import { useState } from "react";

export default function ShippingAddressV1() {
  const [saveAddress, setSaveAddress] = useState(false);

  return (
    <div className="border border-gray-200 rounded-3xl bg-white shadow-sm overflow-hidden mb-8">
      {/* Header bar in original theme green with premium SVG icons */}
      <div className="py-4 px-6 bg-gradient-to-r from-primary-darker via-primary-dark to-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/25">
            <i className="hgi hgi-stroke hgi-truck text-lg text-white" />
          </span>
          <h5 className="font-bold text-base text-white tracking-wide">
            Adresse de Livraison
          </h5>
        </div>
        <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/30 flex items-center gap-2 shadow-2xs">
          <i className="hgi hgi-stroke hgi-package-box text-sm text-white" />
          <span>Expédition 24/48h</span>
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <form className="space-y-4 sm:space-y-5">
          {/* Nom & Prénom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Prénom *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Jean"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nom de famille *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Dupont"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Adresse Email (pour confirmation & suivi) *
              </label>
              <input
                type="email"
                required
                placeholder="jean.dupont@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Téléphone (pour le livreur) *
              </label>
              <input
                type="tel"
                required
                placeholder="06 12 34 56 78"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
          </div>

          {/* Adresse postale */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Adresse de livraison *
            </label>
            <input
              type="text"
              required
              placeholder="Numéro et nom de rue, bâtiment, étage..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
            />
          </div>

          {/* Code postal, Ville & Pays */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Code Postal *
              </label>
              <input
                type="text"
                required
                placeholder="75001"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Ville *
              </label>
              <input
                type="text"
                required
                placeholder="Paris"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Pays *
              </label>
              <select
                defaultValue="FR"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
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
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Notes de livraison (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Code d'accès, instructions particulières pour le livreur..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-xs"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
