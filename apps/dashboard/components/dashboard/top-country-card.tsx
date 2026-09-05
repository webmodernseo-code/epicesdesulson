"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const destinations = [
  {
    name: "France Métropolitaine",
    code: "FR",
    sales: "11 580 €",
    percentage: "78%",
    data: [12, 14, 15, 18, 20, 22, 25],
    color: "#059669", // Emerald
  },
  {
    name: "Belgique",
    code: "BE",
    sales: "1 780 €",
    percentage: "12%",
    data: [8, 10, 11, 12, 14, 15, 17],
    color: "#0284c7", // Sky
  },
  {
    name: "Suisse",
    code: "CH",
    sales: "890 €",
    percentage: "6%",
    data: [5, 6, 7, 7, 8, 9, 10],
    color: "#d97706", // Amber
  },
  {
    name: "Luxembourg & Autres",
    code: "LU",
    sales: "600 €",
    percentage: "4%",
    data: [3, 4, 4, 5, 5, 6, 7],
    color: "#7c3aed", // Purple
  },
];

export default function TopCountryCard() {
  const getChartOptions = (color: string): ApexOptions => ({
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    colors: [color],
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  });

  return (
    <DashboardCard
      title="Destinations de Livraison"
      subtitle="Répartition des commandes expédiées"
    >
      <div className="space-y-6 pt-4">
        {destinations.map((dest, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0">
                {dest.code}
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm block">
                  {dest.name}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {dest.percentage} des livraisons
                </span>
              </div>
            </div>

            <div className="flex-1 h-7 max-w-[70px]">
              <Chart
                options={getChartOptions(dest.color)}
                series={[{ data: dest.data }]}
                type="area"
                height={28}
                width="100%"
              />
            </div>

            <div className="text-right">
              <span className="font-bold text-xs sm:text-sm text-gray-900">
                {dest.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
