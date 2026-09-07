"use client";

import React, { useState } from "react";
import { Store, Mail, Phone, MapPin, Truck, Euro } from "lucide-react";

export default function GeneralSettingsForm() {
  const [formData, setFormData] = useState({
    storeName: "Les Épices de Sulson",
    contactEmail: "contact@epicesdesulson.com",
    phone: "+33 6 12 34 56 78",
    country: "France",
    city: "Paris",
    address: "Atelier Artisanal Sulson",
    zip: "75000",
    freeShippingThreshold: "45.00",
    standardShippingFee: "4.90",
    currency: "EUR (€)",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
        <Store className="size-5 text-emerald-600" />
        <div>
          <h2 className="text-base font-bold text-gray-900">
            Identité de la Boutique & Expédition
          </h2>
          <p className="text-xs text-gray-500">
            Coordonnées générales et règles d'expédition de la boutique Les Épices de Sulson
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Nom de la boutique
          </label>
          <input
            id="storeName"
            type="text"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Email de contact public
          </label>
          <input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Téléphone de contact
          </label>
          <input
            id="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Pays du siège
          </label>
          <input
            id="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Ville / Commune
          </label>
          <input
            id="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Code postal
          </label>
          <input
            id="zip"
            type="text"
            value={formData.zip}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Frais de livraison standard (€)
          </label>
          <input
            id="standardShippingFee"
            type="number"
            step="0.01"
            value={formData.standardShippingFee}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Livraison offerte à partir de (€)
          </label>
          <input
            id="freeShippingThreshold"
            type="number"
            step="0.01"
            value={formData.freeShippingThreshold}
            onChange={handleChange}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Devise boutique
          </label>
          <input
            id="currency"
            type="text"
            value={formData.currency}
            disabled
            className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
