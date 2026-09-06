"use client";

import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";

const monthlyData = [
  { month: "Jan", value: 3.8, full: "3 800 €" },
  { month: "Fév", value: 5.2, full: "5 200 €" },
  { month: "Mar", value: 7.1, full: "7 100 €" },
  { month: "Avr", value: 8.4, full: "8 400 €" },
  { month: "Mai", value: 6.9, full: "6 900 €" },
  { month: "Juin", value: 9.2, full: "9 200 €" },
  { month: "Juil", value: 11.5, full: "11 500 €" },
  { month: "Août", value: 10.1, full: "10 100 €" },
  { month: "Sep", value: 12.8, full: "12 800 €" },
  { month: "Oct", value: 14.2, full: "14 200 €" },
  { month: "Nov", value: 13.5, full: "13 500 €" },
  { month: "Déc", value: 14.85, full: "14 850 €", isCurrent: true },
];

const maxValue = 16; // k€

export default function AccommodationRevenueChart() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  return (
    <DashboardCard
      title="Chiffre d'Affaires Mensuel"
      subtitle="(+34%) de progression des ventes d'épices"
    >
      <div className="pt-3">
        {/* Y Axis & Grid Container */}
        <div className="relative h-[220px] w-full flex items-end">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            {[16, 12, 8, 4, 0].map((val) => (
              <div key={val} className="flex items-center w-full">
                <span className="text-[10px] font-semibold text-gray-500 w-8 shrink-0 text-right pr-2">
                  {val}k€
                </span>
                <div className="h-px w-full bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Bars container */}
          <div className="relative w-full h-[calc(100%-24px)] flex items-end justify-between pl-9 pr-2 pb-1 gap-1 sm:gap-2">
            {monthlyData.map((item, index) => {
              const heightPercent = (item.value / maxValue) * 100;
              const isHovered = hoveredMonth === index;

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(index)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-10 z-20 bg-gray-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      {item.month} : {item.full}
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                      item.isCurrent
                        ? isHovered
                          ? "bg-emerald-400 scale-y-[1.03]"
                          : "bg-emerald-500 shadow-xs"
                        : isHovered
                          ? "bg-emerald-700"
                          : "bg-emerald-600/85 hover:bg-emerald-600"
                    }`}
                    style={{
                      height: `${heightPercent}%`,
                      transformOrigin: "bottom",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between pl-9 pr-2 pt-1 border-t border-gray-100">
          {monthlyData.map((item, index) => (
            <div
              key={item.month}
              className={`flex-1 text-center text-[10px] sm:text-[11px] font-medium transition-colors ${
                hoveredMonth === index
                  ? "text-emerald-700 font-bold"
                  : item.isCurrent
                    ? "text-gray-900 font-bold"
                    : "text-gray-500"
              }`}
            >
              {item.month}
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
