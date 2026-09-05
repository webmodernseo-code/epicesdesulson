"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("12 mois");

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentData = useMemo(() => chartData[activeFilter], [activeFilter]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
        },
      },
      colors: ["#059669", "#d97706"],
      stroke: {
        width: 3,
        curve: "smooth",
      },
      grid: {
        borderColor: "#f3f4f6",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: currentData.categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "11px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "11px",
          },
          formatter: (value: number) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k€`;
            }
            return `${value}€`;
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value.toLocaleString("fr-FR")} €`,
        },
      },
    }),
    [currentData.categories],
  );

  const series = useMemo(
    () => [
      {
        name: "Chiffre d'Affaires",
        data: currentData.earnings,
      },
      {
        name: "Marge Nette",
        data: currentData.profits,
      },
    ],
    [currentData],
  );

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

        {/* Time Filter Tabs */}
        <div className="flex flex-col sm:flex-row py-4 items-start gap-4 sm:items-center justify-between">
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200/80">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
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

      {/* Chart */}
      <div className="h-[280px] w-full min-h-[280px] flex items-center justify-center">
        {mounted ? (
          <div className="w-full h-full">
            <Chart
              options={options}
              series={series}
              type="line"
              height="100%"
              width="100%"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center text-xs text-gray-400">
            Chargement de l'évolution...
          </div>
        )}
      </div>
    </div>
  );
}
