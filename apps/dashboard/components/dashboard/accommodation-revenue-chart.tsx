"use client";

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
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#088178",
    "#FFC107",
  ],
};

export default function AccommodationRevenueChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "var(--font-dm-sans)",
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
          colors: "#919eab",
          fontSize: "12px",
          fontFamily: "var(--font-dm-sans)",
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
          colors: "#919eab",
          fontSize: "12px",
          fontFamily: "var(--font-dm-sans)",
        },
      },
    },
    grid: {
      padding: {
        left: 24,
      },
      strokeDashArray: 4,
      borderColor: "rgba(145,158,171,0.20)",
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
          return `${val} k€ (soit ${(val * 1000).toLocaleString("fr-FR")} €)`;
        },
      },
    },
  };

  return (
    <DashboardCard
      title="Chiffre d'Affaires Mensuel"
      subtitle="(+34%) par rapport à l'année précédente"
    >
      <div className="-ml-5 -mb-5">
        <Chart
          options={options}
          series={chartData.series}
          type="bar"
          height={300}
          width="100%"
        />
      </div>
    </DashboardCard>
  );
}
