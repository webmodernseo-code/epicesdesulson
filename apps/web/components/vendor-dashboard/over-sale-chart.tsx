"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverSaleChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  const options: ApexOptions = {
    series: [
      {
        name: "Asia",
        data: [85, 32, 67, 120, 45, 98, 23, 140, 75, 110, 55, 135],
      },
      {
        name: "America",
        data: [20, 51, 35, 51, 49, 62, 69, 91, 148, 100, 120, 150],
      },
    ],
    colors: ["#088178", "#FFE700"],
    chart: {
      height: 340,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
      fontFamily: "inherit",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    title: {
      // @ts-ignore
      show: false,
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "#919EAB3D",
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "400",
          colors: ["#919EAB"],
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "400",
          colors: ["#919EAB"],
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: "light",
      x: {
        show: true,
      },
    },
  };

  return (
    <>
      <div className="border border-gray-300 rounded-tl-2xl rounded-tr-2xl p-6 border-b-0">
        <h5 className="mb-1">Over Sales</h5>
        <p className="text-light-disabled-text">Price Movement</p>
      </div>
      <div className="flex items-center justify-end gap-x-6 px-6 border-x border-gray-300">
        <div className="flex items-center gap-x-2">
          <span className="size-3 rounded-full bg-primary flex-none" />
          <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
            Asia
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="size-3 rounded-full bg-[#FFE700] flex-none" />
          <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
            America
          </p>
        </div>
      </div>
      <div
        className="border border-gray-300 rounded-bl-2xl rounded-br-2xl border-t-0 p-4"
        id="price-movement-chart"
      >
        {mounted && (
          <Chart
            options={options}
            series={options.series}
            type="line"
            height={320}
          />
        )}
      </div>
    </>
  );
}
