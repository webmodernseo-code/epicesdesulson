"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  labels: [
    "Commandes Livrées",
    "En cours d'acheminement",
    "En préparation atelier",
    "En attente de paiement",
    "Retours & Rétractations",
  ],
  series: [225, 52, 42, 18, 3],
  colors: [
    "#059669", // Livrées (Emerald)
    "#0284c7", // En cours (Sky)
    "#d97706", // En préparation (Amber)
    "#6366f1", // En attente (Indigo)
    "#e11d48", // Retours (Rose)
  ],
};

export default function OrderStatusChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      animations: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    labels: chartData.labels,
    colors: chartData.colors,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "0%",
        },
      },
    },
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
  };

  return (
    <DashboardCard title="Statut des Commandes" subtitle="Répartition en temps réel des commandes">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center pt-2">
        {/* Custom Legend */}
        <div className="w-full md:w-1/2 space-y-3">
          {chartData.labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="size-3 rounded-full shrink-0"
                  style={{ backgroundColor: chartData.colors[index] }}
                />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {label}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900">
                {chartData.series[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full md:w-1/2 flex justify-center items-center min-h-[240px]">
          {mounted ? (
            <div className="relative w-full">
              <Chart
                options={options}
                series={chartData.series}
                type="pie"
                width="100%"
                height="240"
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center text-xs text-gray-400">
              Chargement du graphique...
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
