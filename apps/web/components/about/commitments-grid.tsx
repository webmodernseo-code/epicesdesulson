"use client";

import React from "react";

export default function CommitmentsGrid() {
  const items = [
    {
      iconClass: "hgi-leaf-01",
      title: "Terroirs d'Origine Protégés",
      description: "Sélection rigoureuse sur les riches terres volcaniques du Cameroun.",
    },
    {
      iconClass: "hgi-shield-tick",
      title: "100% Pur, Zéro Additif",
      description: "Sans conservateur, sans colorant ni exhausteur artificiel.",
    },
    {
      iconClass: "hgi-package-delivered",
      title: "Formats 100g Fraîcheur",
      description: "Conditionnement hermétique garantissant la puissance aromatique.",
    },
    {
      iconClass: "hgi-delivery-truck-02",
      title: "Expédition Soignée & Rapide",
      description: "Préparation artisanale de vos commandes et livraison protégée.",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200/80 hover:border-primary/40 transition-colors flex items-start gap-4"
            >
              <div className="size-11 rounded-xl bg-white shadow-2xs border border-gray-200 flex items-center justify-center shrink-0 text-primary">
                <i className={`hgi hgi-stroke ${item.iconClass} text-2xl`} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-light-primary-text leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-light-secondary-text leading-relaxed">
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
