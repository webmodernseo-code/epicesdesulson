"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import AccountNavigation, {
  TabType,
} from "@/components/account/account-navigation";
import DashboardTab from "@/components/account/dashboard-tab";
import OrdersTab from "@/components/account/orders-tab";
import OrderDetailsView from "@/components/account/order-details-view";
import AddressTab from "@/components/account/address-tab";
import ProfileTab from "@/components/account/profile-tab";
import LogoutModal from "@/components/vendor-dashboard/logout-modal";
import WishlistTab from "@/components/account/wishlist-tab";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sync scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveTab("order-details");
  };

  const handleLogout = () => {
    // Implement actual logout logic here (e.g., clearing tokens)
    console.log("Logging out...");
    window.location.href = "/"; // Redirect to home after logout
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "orders":
        return <OrdersTab onViewDetails={handleViewOrderDetails} />;
      case "order-details":
        return (
          <OrderDetailsView
            orderId={selectedOrderId || "#00000"}
            onBack={() => setActiveTab("orders")}
          />
        );
      case "wishlist":
        return <WishlistTab />;
      case "address":
        return <AddressTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Account" }]} />
      <section className="pb-[74px]">
        <div className="container">
          <div className="grid grid-cols-12 lg:gap-x-10 gap-y-6">
            <div className="xl:col-span-3 lg:col-span-4 col-span-12">
              <AccountNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogoutClick={() => setIsLogoutModalOpen(true)}
              />
            </div>
            <div className="xl:col-span-9 lg:col-span-8 col-span-12">
              <div className="my-account-content">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </section>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}
