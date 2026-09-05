import type { Metadata } from "next";
import DashboardStatsGrid from "@/components/dashboard/dashboard-stats-grid";
import PaymentGatewaysStatusWidget from "@/components/dashboard/payment-gateways-status-widget";
import OrderStatusChart from "@/components/dashboard/order-status-chart";
import AccommodationRevenueChart from "@/components/dashboard/accommodation-revenue-chart";
import OrderFulfillmentStatus from "@/components/dashboard/order-fullfillment-status-progress";
import RecentOrdersTable from "@/components/dashboard/recent-order-table";
import TopCountryCard from "@/components/dashboard/top-country-card";
import StockUpdateTable from "@/components/dashboard/stock-update-table";

export const metadata: Metadata = {
  title: "Tableau de bord | Les Épices de Sulson",
  description: "Pilotage et gestion de la boutique en ligne Les Épices de Sulson.",
};

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Live Payment Gateways Status Widget */}
      <PaymentGatewaysStatusWidget />

      {/* Main Stats Grid */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
        <DashboardStatsGrid />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="sm:col-span-2 order-1 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
          <OrderStatusChart />
        </div>
        <div className="lg:col-span-1 order-4 lg:order-2 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
          <TopCountryCard />
        </div>
        <div className="sm:col-span-2 order-2 lg:order-3 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
          <AccommodationRevenueChart />
        </div>
        <div className="lg:col-span-1 order-3 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
          <OrderFulfillmentStatus />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
        <RecentOrdersTable />
      </div>

      {/* Stock Levels Table */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
        <StockUpdateTable />
      </div>
    </div>
  );
}
