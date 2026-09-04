import DashboardStats from "./dashboard-stats";
import OverSaleChart from "./over-sale-chart";
import OverSaleDonutChart from "./over-sale-donut-chart";
import RecentOrdersTable from "./recent-orders-table";
import TrendingProductsTable from "./trending-products-table";

export default function VendorDashboard() {
  return (
    <div className="menu-tab-pane" id="dashboard">
      <DashboardStats />

      <div className="grid grid-cols-12 gap-x-6 mb-6 gap-y-6">
        <div className="xl:col-span-4 col-span-12">
          <OverSaleDonutChart />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <OverSaleChart />
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <TrendingProductsTable />
        <RecentOrdersTable />
      </div>
    </div>
  );
}
