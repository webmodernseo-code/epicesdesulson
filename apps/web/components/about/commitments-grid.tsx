"use client";

import React from "react";
import { ShieldCheck, Sparkles, PackageCheck, Truck } from "lucide-react";

export default function CommitmentsGrid() {
  const items = [
    {
      icon: <Sparkles className="size-5 text-amber-700" />,
      title: "Terroirs Nobles & Authentiques",
      description: "Sélection d'épices brutes cultivées sur les riches terres volcaniques du Cameroun.",
    },
    {
      icon: <ShieldCheck className="size-5 text-emerald-700" />,
      title: "100% Pur, Zéro Additif",
      description: "Sans exhausteur, sans colorant ni conservateur artificiel pour un goût authentique.",
    },
    {
      icon: <PackageCheck className="size-5 text-emerald-700" />,
      title: "Formats 100g Fraîcheur",
      description: "Conditionnement hermétique protégeant les huiles essentielles et la puissance aromatique.",
    },
    {
      icon: <Truck className="size-5 text-amber-700" />,
      title: "Expédition Soignée & Rapide",
      description: "Préparation artisanale de vos commandes et livraison protégée à domicile.",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:bg-emerald-50/30 hover:border-emerald-200 transition-all flex items-start gap-4"
            >
              <div className="size-10 rounded-xl bg-white shadow-2xs border border-gray-200 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
