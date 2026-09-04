"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

const TABS = [
  { id: "description", label: "Description & Terroir" },
  { id: "additional-info", label: "Fiche Technique & Conservation" },
  { id: "reviews", label: "Avis Clients Vérifiés (142)" },
];

const INFO_ROWS = [
  { label: "Nom Botanique", value: "Piper nigrum L." },
  { label: "Appellation", value: "Indication Géographique Protégée (IGP Kampot)" },
  { label: "Terroir d'Origine", value: "Province de Kampot & Kep (Cambodge)" },
  { label: "Récolte", value: "2026 - Cueillette manuelle grain par grain" },
  { label: "Profil Aromatique", value: "Notes sucrées de fruits rouges confits, agrumes et résine fine" },
  { label: "Intensité / Piquant", value: "7 / 10 (Chaleur longue et enveloppante, sans brûlure)" },
  { label: "Conditionnement", value: "Pot en verre recyclable hermétique / Sachet sous-vide" },
  { label: "Conservation", value: "24 mois à l'abri de la lumière, de l'air et de l'humidité" },
  { label: "Accords Recommandés", value: "Viandes rouges, canard, poissons nobles, fraises et chocolat noir" },
  { label: "Engagements Qualité", value: "100% Naturel, Sans OGM, Sans arôme artificiel ni conservateur" },
];

const REVIEWS = [
  {
    id: 1,
    author: "Marc D. (Chef cuisinier)",
    rating: 5,
    avatar: "/images/blog/user-avatar-1.png",
    verified: true,
    text: "Un poivre rouge exceptionnel ! Une longueur en bouche incroyable, avec des notes subtiles de fruits rouges qui subliment mes pièces de bœuf et mes sauces au poivre.",
    date: "Il y a 3 jours",
  },
  {
    id: 2,
    author: "Sophie L.",
    rating: 5,
    avatar: "/images/blog/user-avatar-2.png",
    verified: true,
    text: "La qualité du pot hermétique et la fraîcheur des grains sont incomparables. Rien à voir avec les poivres des grandes surfaces.",
    date: "Il y a 1 semaine",
  },
  {
    id: 3,
    author: "Antoine B.",
    rating: 5,
    avatar: "/images/blog/user-avatar-1.png",
    verified: true,
    text: "Livraison reçue en 48h, emballage soigné et parfum envoûtant dès l'ouverture du bocal. Je recommande les yeux fermés !",
    date: "Il y a 2 semaines",
  },
];

export default function DetailsTabOne() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="py-10">
      <div className="container">
        <div className="border border-gray-200 rounded-3xl bg-white p-6 sm:p-10 shadow-xs">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-6 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  L'Histoire d'un Grand Cru : Le Poivre Rouge de Kampot IGP
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Considéré par les plus grands gastronomes comme l'un des meilleurs poivres au monde, le Poivre Rouge de Kampot est récolté baie par baie lorsque les grains atteignent une pleine maturité sur la liane. Il est ensuite lavé à l'eau de source, échaudé et séché au soleil selon une méthode artisanale centenaire.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center size-7 rounded-lg bg-primary/10 text-primary">
                      <i className="hgi hgi-stroke hgi-sparkles text-base" />
                    </span>
                    Notes de Dégustation
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Attaque douce et fruitée (fruits rouges confits, agrumes), suivie d'un piquant chaud et puissant, sans aucune amertume. Une persistance aromatique remarquable.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-5">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center size-7 rounded-lg bg-emerald-100 text-emerald-800">
                      <i className="hgi hgi-stroke hgi-restaurant text-base" />
                    </span>
                    Conseils Culinaires
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Concassez au mortier au dernier moment. Sublime les viandes rouges grillées, le canard, le gibier, mais aussi les poissons blancs, carpaccios et les desserts chocolatés.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Fiche Technique */}
          {activeTab === "additional-info" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-xs sm:text-sm text-left border border-gray-200 rounded-2xl overflow-hidden">
                <tbody>
                  {INFO_ROWS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50/70" : "bg-white"}
                    >
                      <th className="py-3 px-5 font-bold text-gray-900 w-1/3 border-b border-gray-200">
                        {row.label}
                      </th>
                      <td className="py-3 px-5 text-gray-700 border-b border-gray-200">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-gray-900">{review.author}</span>
                        <span className="text-[11px] text-gray-400">{review.date}</span>
                      </div>
                      <div className="mb-2">
                        <StarRating ratingPercentage={"100%"} />
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed italic">
                        "{review.text}"
                      </p>
                    </div>
                    {review.verified && (
                      <span className="text-[11px] text-emerald-700 font-bold mt-4 flex items-center gap-1">
                        <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-sm" />
                        Achat vérifié Maison Sulson
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
