"use client";

import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";

interface ChartSegment {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const rawData = [
  { label: "Commandes Livrées", value: 225, color: "#059669" }, // Emerald
  { label: "En cours d'acheminement", value: 52, color: "#0284c7" }, // Sky
  { label: "En préparation atelier", value: 42, color: "#d97706" }, // Amber
  { label: "En attente de paiement", value: 18, color: "#6366f1" }, // Indigo
  { label: "Retours & Rétractations", value: 3, color: "#e11d48" }, // Rose
];

const totalOrders = rawData.reduce((acc, curr) => acc + curr.value, 0);

const chartSegments: ChartSegment[] = rawData.map((item) => ({
  ...item,
  percentage: Math.round((item.value / totalOrders) * 100),
}));

export default function OrderStatusChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Donut calculation
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let accumulatedPercentage = 0;

  return (
    <DashboardCard
      title="Statut des Commandes"
      subtitle="Répartition en temps réel des commandes"
    >
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center pt-2">
        {/* Custom Legend */}
        <div className="w-full md:w-1/2 space-y-2.5">
          {chartSegments.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between text-xs sm:text-sm p-2 rounded-xl transition-all cursor-pointer ${
                  isHovered ? "bg-gray-50/90 scale-[1.01]" : "hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="size-3 rounded-full shrink-0 transition-transform duration-200"
                    style={{
                      backgroundColor: item.color,
                      transform: isHovered ? "scale(1.25)" : "scale(1)",
                    }}
                  />
                  <span
                    className={`text-xs sm:text-sm truncate transition-colors ${
                      isHovered ? "text-gray-900 font-semibold" : "text-gray-700 font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    {item.value}
                  </span>
                  <span className="text-[11px] text-gray-600 w-9 text-right font-semibold">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pure SVG Donut Chart */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative min-h-[220px]">
          <div className="relative size-[200px] flex items-center justify-center">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {/* Background Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth={strokeWidth}
              />
              {/* Segments */}
              {chartSegments.map((item, index) => {
                const strokeDasharray = `${(item.value / totalOrders) * circumference} ${circumference}`;
                const strokeDashoffset = -(accumulatedPercentage / totalOrders) * circumference;
                accumulatedPercentage += item.value;

                const isHovered = hoveredIndex === index;

                return (
                  <circle
                    key={item.label}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      filter: isHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" : "none",
                    }}
                  />
                );
              })}
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
              {hoveredIndex !== null ? (
                <>
                  <span
                    className="text-2xl font-extrabold font-urbanist leading-tight"
                    style={{ color: chartSegments[hoveredIndex].color }}
                  >
                    {chartSegments[hoveredIndex].value}
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold truncate max-w-[110px]">
                    {chartSegments[hoveredIndex].label}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-extrabold text-gray-900 font-urbanist leading-tight">
                    {totalOrders}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    Total Commandes
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
