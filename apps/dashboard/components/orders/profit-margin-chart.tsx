"use client";

import React, { useState, useMemo } from "react";

const chartData = {
  "12 mois": {
    categories: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    earnings: [
      3800, 5200, 7100, 8400, 6900, 9200, 11500, 10100, 12800, 14200, 13500,
      14850,
    ],
    profits: [
      2100, 2900, 4100, 4900, 3900, 5300, 6800, 5900, 7600, 8400, 7900,
      8900,
    ],
  },
  "30 jours": {
    categories: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
    earnings: [3200, 4100, 3700, 4850],
    profits: [1900, 2450, 2200, 2900],
  },
  "7 jours": {
    categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    earnings: [450, 620, 580, 710, 890, 1120, 980],
    profits: [270, 370, 350, 420, 530, 670, 590],
  },
  "24 heures": {
    categories: ["00h", "04h", "08h", "12h", "16h", "20h"],
    earnings: [80, 45, 190, 380, 420, 310],
    profits: [48, 27, 114, 228, 252, 186],
  },
};

const timeFilters = ["12 mois", "30 jours", "7 jours", "24 heures"] as const;
type TimeFilter = (typeof timeFilters)[number];

export default function ProfitMarginChart() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("12 mois");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentData = useMemo(() => chartData[activeFilter], [activeFilter]);

  const maxVal = useMemo(() => {
    const maxEarnings = Math.max(...currentData.earnings);
    return Math.ceil((maxEarnings * 1.15) / 1000) * 1000 || 1000;
  }, [currentData]);

  // SVG dimensions
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 20;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const pointsCount = currentData.categories.length;

  const getX = (idx: number) => {
    if (pointsCount <= 1) return width / 2;
    return paddingX + (idx / (pointsCount - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    return height - paddingY - (val / maxVal) * innerHeight;
  };

  // Build SVG path
  const earningsPoints = currentData.earnings.map((v, i) => `${getX(i)},${getY(v)}`);
  const earningsPath = `M ${earningsPoints.join(" L ")}`;
  const earningsArea = `${earningsPath} L ${getX(pointsCount - 1)},${height - paddingY} L ${getX(0)},${height - paddingY} Z`;

  const profitsPoints = currentData.profits.map((v, i) => `${getX(i)},${getY(v)}`);
  const profitsPath = `M ${profitsPoints.join(" L ")}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="pt-4 pb-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          Évolution des Ventes & Marge
        </h3>
        <p className="text-xs text-gray-500">
          Suivi des encaissements et rentabilité sur la période
        </p>

        {/* Time Filter Tabs & Legend */}
        <div className="flex flex-col sm:flex-row py-4 items-start gap-4 sm:items-center justify-between">
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200/80">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setHoveredIdx(null);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-emerald-600" />
              <span className="text-gray-700 font-semibold">Chiffre d'Affaires</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-amber-500" />
              <span className="text-gray-700 font-semibold">Marge Nette</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Vector Line & Area Chart */}
      <div className="relative w-full h-[240px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio) => {
            const y = paddingY + ratio * innerHeight;
            const val = Math.round(maxVal * (1 - ratio));
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="10"
                  fontWeight="600"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(1)}k€` : `${val}€`}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={earningsArea} fill="url(#emeraldGrad)" />

          {/* Line 1: Earnings (Emerald) */}
          <path
            d={earningsPath}
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Line 2: Profits (Amber) */}
          <path
            d={profitsPath}
            fill="none"
            stroke="#d97706"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 5"
          />

          {/* Data Points */}
          {currentData.earnings.map((val, idx) => {
            const x = getX(idx);
            const yE = getY(val);
            const yP = getY(currentData.profits[idx]);
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Hit area */}
                <rect
                  x={x - 15}
                  y={0}
                  width={30}
                  height={height}
                  fill="transparent"
                />

                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={height - paddingY}
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                  />
                )}

                {/* Earnings dot */}
                <circle
                  cx={x}
                  cy={yE}
                  r={isHovered ? 5 : 3.5}
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* Profit dot */}
                <circle
                  cx={x}
                  cy={yP}
                  r={isHovered ? 4.5 : 3}
                  fill="#d97706"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && (
          <div
            className="absolute -top-3 z-30 bg-gray-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-xl shadow-xl pointer-events-none transform -translate-x-1/2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
            }}
          >
            <span className="font-bold text-gray-300">
              {currentData.categories[hoveredIdx]} :
            </span>
            <span className="text-emerald-400 font-bold">
              CA: {currentData.earnings[hoveredIdx].toLocaleString("fr-FR")} €
            </span>
            <span className="text-amber-300 font-bold">
              Marge: {currentData.profits[hoveredIdx].toLocaleString("fr-FR")} €
            </span>
          </div>
        )}
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between pl-8 pr-8 pt-2">
        {currentData.categories.map((cat, idx) => (
          <span
            key={cat}
            className={`text-[10px] sm:text-[11px] font-semibold transition-colors ${
              hoveredIdx === idx ? "text-emerald-700 font-bold" : "text-gray-400"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
