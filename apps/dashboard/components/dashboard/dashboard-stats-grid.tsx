"use client";

import React from "react";
import { TrendUpIcon, TrendDownIcon } from "../../icons";

const statsData = [
  {
    label: "Chiffre d'Affaires",
    value: "14 850 €",
    trend: "+12.4%",
    isPositive: true,
    bgClass: "bg-emerald-50 border border-emerald-100",
  },
  {
    label: "Commandes Traitées",
    value: "348",
    trend: "+8.2%",
    isPositive: true,
    bgClass: "bg-amber-50 border border-amber-100",
  },
  {
    label: "Taux de Conversion",
    value: "3,8%",
    trend: "+1.2%",
    isPositive: true,
    bgClass: "bg-blue-50 border border-blue-100",
  },
  {
    label: "Panier Moyen",
    value: "42,70 €",
    trend: "+4.3%",
    isPositive: true,
    bgClass: "bg-purple-50 border border-purple-100",
  },
];

export default function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgClass} p-5 rounded-2xl flex flex-col justify-between relative shadow-xs`}
        >
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 font-urbanist">
              {stat.value}
            </h3>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1 text-xs rounded-full shadow-2xs border border-gray-100">
              <span
                className={`text-xs font-bold ${stat.isPositive ? "text-emerald-600" : "text-red-500"}`}
              >
                {stat.trend}
              </span>
              <span className={stat.isPositive ? "text-emerald-600" : "text-red-500"}>
                {stat.isPositive ? (
                  <TrendUpIcon width={14} height={14} />
                ) : (
                  <TrendDownIcon width={14} height={14} />
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
