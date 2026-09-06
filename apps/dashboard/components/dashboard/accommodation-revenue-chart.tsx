"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";

interface MonthData {
  month: string;
  value: number;
  full: string;
  isCurrent?: boolean;
}

const defaultMonths: MonthData[] = [
  { month: "Jan", value: 0, full: "0,00 €" },
  { month: "Fév", value: 0, full: "0,00 €" },
  { month: "Mar", value: 0, full: "0,00 €" },
  { month: "Avr", value: 0, full: "0,00 €" },
  { month: "Mai", value: 0, full: "0,00 €" },
  { month: "Juin", value: 0, full: "0,00 €" },
  { month: "Juil", value: 0, full: "0,00 €" },
  { month: "Août", value: 0, full: "0,00 €" },
  { month: "Sep", value: 0, full: "0,00 €", isCurrent: true },
  { month: "Oct", value: 0, full: "0,00 €" },
  { month: "Nov", value: 0, full: "0,00 €" },
  { month: "Déc", value: 0, full: "0,00 €" },
];

export default function AccommodationRevenueChart() {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>(defaultMonths);
  const [loading, setLoading] = useState(true);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  useEffect(() => {
    async function loadMonthlyData() {
      try {
        const res = await fetch("/api/admin/summary", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data.monthlyRevenue)) {
            setMonthlyData(json.data.monthlyRevenue);
          }
        }
      } catch (err) {
        console.warn("Could not load monthly revenue data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMonthlyData();
  }, []);

  const maxValue = useMemo(() => {
    const highest = Math.max(...monthlyData.map((d) => d.value), 0);
    if (highest === 0) return 500; // 500 € default top scale
    return Math.ceil((highest * 1.25) / 100) * 100;
  }, [monthlyData]);

  const yAxisSteps = useMemo(() => {
    const step = maxValue / 4;
    return [
      maxValue,
      Math.round(step * 3),
      Math.round(step * 2),
      Math.round(step),
      0,
    ];
  }, [maxValue]);

  return (
    <DashboardCard
      title="Chiffre d'Affaires Mensuel Réel"
      subtitle="Total des encaissements validés (Stripe & PayPal) sur l'année en cours"
    >
      <div className="pt-3">
        {loading ? (
          <div className="h-[220px] flex items-center justify-center text-xs text-gray-400">
            Chargement des encaissements réels...
          </div>
        ) : (
          <>
            {/* Y Axis & Grid Container */}
            <div className="relative h-[220px] w-full flex items-end">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                {yAxisSteps.map((val) => (
                  <div key={val} className="flex items-center w-full">
                    <span className="text-[10px] font-semibold text-gray-500 w-12 shrink-0 text-right pr-2">
                      {val >= 1000 ? `${(val / 1000).toFixed(1)}k€` : `${val}€`}
                    </span>
                    <div className="h-px w-full bg-gray-100" />
                  </div>
                ))}
              </div>

              {/* Bars container */}
              <div className="relative w-full h-[calc(100%-24px)] flex items-end justify-between pl-13 pr-2 pb-1 gap-1 sm:gap-2">
                {monthlyData.map((item, index) => {
                  const heightPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
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
                          item.value === 0
                            ? "bg-gray-200/70 h-[3px] min-h-[3px]"
                            : item.isCurrent
                              ? isHovered
                                ? "bg-emerald-400 scale-y-[1.03]"
                                : "bg-emerald-500 shadow-xs"
                              : isHovered
                                ? "bg-emerald-700"
                                : "bg-emerald-600/85 hover:bg-emerald-600"
                        }`}
                        style={{
                          height: item.value > 0 ? `${Math.max(heightPercent, 4)}%` : "3px",
                          transformOrigin: "bottom",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between pl-13 pr-2 pt-1 border-t border-gray-100">
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
          </>
        )}
      </div>
    </DashboardCard>
  );
}
