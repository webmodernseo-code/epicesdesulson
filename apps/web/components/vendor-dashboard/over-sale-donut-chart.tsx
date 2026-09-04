"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OverSaleDonutChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  const options: ApexOptions = {
    series: [30, 20, 70, 50],
    chart: {
      width: 250,
      type: "donut",
      fontFamily: "inherit",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Complete",
              formatter: () => "50%",
              fontSize: "12px",
              fontWeight: "600",
              color: "#919EAB",
            },
          },
        },
      },
    },
    colors: ["#5ed9ba", "#056d6e", "#04535c", "#088178"],
    labels: [
      "Recent Orders",
      "Pending Payments",
      "Received Payments",
      "Complete Order",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <>
      <div className="border border-gray-300 rounded-tl-2xl rounded-tr-2xl p-6 border-b-0">
        <h5>Over Sales</h5>
      </div>
      <div
        className="border-l border-r border-gray-300 py-10 flex justify-center"
        id="radial-bar-chart"
      >
        {mounted && (
          <Chart
            options={options}
            series={options.series}
            type="donut"
            width={250}
          />
        )}
      </div>
      <div className="border border-gray-300 rounded-bl-2xl rounded-br-2xl p-6 flex">
        <div className="flex flex-col gap-y-5 flex-1">
          <div className="flex items-center gap-x-2">
            <span className="size-3 rounded-full bg-[#5ed9ba] flex-none" />
            <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
              Recent Orders
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="size-3 rounded-full bg-[#056d6e] flex-none" />
            <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
              Pending Payments
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 flex-1">
          <div className="flex items-center gap-x-2">
            <span className="size-3 rounded-full bg-[#04535c] flex-none" />
            <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
              Received Payments
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="size-3 rounded-full bg-[#088178] flex-none" />
            <p className="flex-1 text-[13px] font-medium leading-[18px] text-light-primary-text">
              Complete Order
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
