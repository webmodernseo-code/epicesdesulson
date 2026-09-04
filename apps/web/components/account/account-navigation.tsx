"use client";

import React from "react";

export type TabType = 
  | "dashboard" 
  | "orders" 
  | "wishlist" 
  | "address" 
  | "profile" 
  | "order-details" 
  | "logout";

interface AccountNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onLogoutClick?: () => void;
}

const MENU_ITEMS: { id: TabType; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "hgi-dashboard-square-01" },
  { id: "orders", label: "Orders", icon: "hgi-delete-01" }, // Note: the original had hgi-delete-01 for orders, which is weird but I'll stick to it unless it looks wrong
  { id: "wishlist", label: "Wishlist", icon: "hgi-favourite" },
  { id: "address", label: "My Address", icon: "hgi-location-01" },
  { id: "profile", label: "My Account", icon: "hgi-user" },
  { id: "logout", label: "Log Out", icon: "hgi-login-circle-02" },
];

const AccountNavigation: React.FC<AccountNavigationProps> = ({ activeTab, setActiveTab, onLogoutClick }) => {
  return (
    <div className="sticky top-20">
      <ul className="flex flex-col gap-y-1 border border-gray-300 p-4 rounded-2xl my-account-menu">
        {MENU_ITEMS.map((item) => (
          <li key={item.id} className="group">
            <button
              type="button"
              className={`w-full flex items-center gap-x-4 font-semibold p-4 rounded-lg transition-colors ease-in-out duration-300 ${
                activeTab === item.id ? "active" : "group-hover:text-white group-hover:bg-primary"
              }`}
              onClick={() => {
                if (item.id === "logout") {
                  onLogoutClick?.();
                } else {
                  setActiveTab(item.id);
                }
              }}
            >
              <span className="inline-flex items-center justify-center">
                <i className={`hgi hgi-stroke ${item.icon} text-2xl leading-6 font-normal`} />
              </span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountNavigation;
