"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DashboardCard } from "@/components/ui/dashboard-card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartData = {
  series: [
    {
      name: "Chiffre d'affaires",
      data: [3.8, 5.2, 7.1, 8.4, 6.9, 9.2, 11.5, 10.1, 12.8, 14.2, 13.5, 14.85],
    },
  ],
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
  colors: [
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#059669",
    "#10b981",
  ],
};

export default function AccommodationRevenueChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    colors: chartData.colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "11px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 16,
      tickAmount: 4,
      labels: {
        formatter: (value) => `${value} k€`,
        style: {
          colors: "#9ca3af",
          fontSize: "11px",
        },
      },
    },
    grid: {
      padding: {
        left: 20,
      },
      strokeDashArray: 4,
      borderColor: "rgba(229, 231, 235, 0.8)",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} k€ (${(val * 1000).toLocaleString("fr-FR")} €)`;
        },
      },
    },
  };

  return (
    <DashboardCard
      title="Chiffre d'Affaires Mensuel"
      subtitle="(+34%) de progression des ventes d'épices"
    >
      <div className="-ml-4 -mb-4 min-h-[300px] flex items-center justify-center">
        {mounted ? (
          <div className="w-full">
            <Chart
              options={options}
              series={chartData.series}
              type="bar"
              height={300}
              width="100%"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center text-xs text-gray-400">
            Chargement des revenus...
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
