"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  labels: [
    "Commandes Livrées",
    "En cours d'acheminement",
    "En préparation atelier",
    "En attente de validation",
    "Retours & Échanges",
  ],
  series: [225, 52, 42, 18, 11],
  colors: [
    "#088178", // Livrées (Primary Green)
    "#2D99FF", // En cours (Blue)
    "#FFC107", // En préparation (Amber)
    "#826AF9", // En attente (Purple)
    "#E02D69", // Retours (Red)
  ],
};

export default function OrderStatusChart() {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "var(--font-dm-sans)",
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
      style: {
        fontSize: "12px",
        fontFamily: "var(--font-dm-sans)",
      },
    },
  };

  return (
    <DashboardCard title="Statut des Commandes">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        {/* Custom Legend */}
        <div className="w-full md:w-1/2 space-y-3">
          {chartData.labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
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
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full">
            <Chart
              options={options}
              series={chartData.series}
              type="pie"
              width="100%"
              height="250"
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
