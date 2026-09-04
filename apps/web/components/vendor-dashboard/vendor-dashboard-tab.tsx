"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import VendorDashboard from "./vendor-dashboard";
import DashboardProducts from "./dashboard-products";
import DashboardOrders from "./dashboard-orders";
import DashboardProfile from "./dashboard-profiles";
import DashboardSettings from "./dashboard-settings";
import DashboardEditProfile from "./dashboard-edit-profile";
import LogoutModal from "./logout-modal";

type TabType =
  | "dashboard"
  | "products"
  | "order"
  | "profile"
  | "settings"
  | "edit-profile";

export default function VendorDashboardTab() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "hgi-dashboard-square-01" },
    { id: "products", label: "Products", icon: "hgi-delivery-box-01" },
    { id: "order", label: "Order", icon: "hgi-package" },
    { id: "profile", label: "Profile", icon: "hgi-user" },
    { id: "settings", label: "Settings", icon: "hgi-settings-01" },
  ];

  return (
    <section className="pb-[74px]">
      <div className="container">
        <div className="grid grid-cols-12 lg:gap-x-10 gap-y-6">
          <div className="xl:col-span-3 lg:col-span-4 col-span-12">
            <div className="sticky top-20">
              <ul className="flex flex-col gap-y-1 border border-gray-300 p-4 rounded-2xl my-account-menu bg-white">
                {menuItems.map((item) => (
                  <li key={item.id} className="group">
                    <button
                      type="button"
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={cn(
                        "w-full flex items-center gap-x-4 font-semibold p-4 rounded-lg transition-colors ease-in-out duration-300",
                        activeTab === item.id ||
                          (activeTab === "edit-profile" &&
                            item.id === "profile")
                          ? "bg-primary text-white active"
                          : "hover:bg-primary hover:text-white",
                      )}
                    >
                      <span className="inline-flex items-center justify-center">
                        <i
                          className={cn(
                            "hgi hgi-stroke text-2xl leading-6 font-normal",
                            item.icon,
                          )}
                        />
                      </span>
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="group">
                  <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="w-full flex items-center gap-x-4 font-semibold p-4 rounded-lg hover:bg-primary hover:text-white transition-colors ease-in-out duration-300 logout-button"
                  >
                    <span className="inline-flex items-center justify-center">
                      <i className="hgi hgi-stroke hgi-login-circle-02 text-2xl leading-6 font-normal" />
                    </span>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="xl:col-span-9 lg:col-span-8 col-span-12">
            <div className="my-account-content">
              {activeTab === "dashboard" && <VendorDashboard />}
              {activeTab === "products" && <DashboardProducts />}
              {activeTab === "order" && <DashboardOrders />}

              {activeTab === "profile" && (
                <DashboardProfile onEdit={() => setActiveTab("edit-profile")} />
              )}

              {activeTab === "settings" && <DashboardSettings />}

              {activeTab === "edit-profile" && (
                <DashboardEditProfile onBack={() => setActiveTab("profile")} />
              )}
            </div>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={() => {
          // Add your actual logout logic here
          console.log("User logged out");
        }}
      />
    </section>
  );
}
