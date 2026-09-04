"use client";

import React, { useState } from "react";

interface OrderItem {
  id: string;
  status: "Processing" | "Delivering" | "Completed" | "Cancelled";
  date: string;
  itemCount: number;
  deliveryMethod: string;
  amount: string;
  isPaid: boolean;
}

const ORDERS: OrderItem[] = [
  {
    id: "#65937",
    status: "Processing",
    date: "11:12 AM, 24 April, 2027",
    itemCount: 114,
    deliveryMethod: "Free Delivery",
    amount: "$40:00",
    isPaid: true,
  },
  {
    id: "#65937", // Matching original's duplicated IDs for now
    status: "Cancelled",
    date: "11:12 AM, 24 April, 2027",
    itemCount: 114,
    deliveryMethod: "Free Delivery",
    amount: "$40:00",
    isPaid: true,
  },
  {
    id: "#65937",
    status: "Delivering",
    date: "11:12 AM, 24 April, 2027",
    itemCount: 114,
    deliveryMethod: "Free Delivery",
    amount: "$40:00",
    isPaid: true,
  },
  {
    id: "#65937",
    status: "Completed",
    date: "11:12 AM, 24 April, 2027",
    itemCount: 114,
    deliveryMethod: "Free Delivery",
    amount: "$40:00",
    isPaid: true,
  },
];

interface OrdersTabProps {
  onViewDetails: (orderId: string) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ onViewDetails }) => {
  const [filter, setFilter] = useState("all");

  const filteredOrders = filter === "all" 
    ? ORDERS 
    : ORDERS.filter(o => o.status.toLowerCase() === filter.toLowerCase());

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Processing": return "bg-[rgba(255,193,7,0.16)] text-warning-dark";
      case "Cancelled": return "bg-[rgba(255,72,66,0.16)] text-error-dark";
      case "Delivering": return "bg-[rgba(24,144,255,0.16)] text-info-dark";
      case "Completed": return "bg-[rgba(84,214,44,0.16)] text-success-dark";
      default: return "";
    }
  };

  return (
    <div className="menu-tab-pane">
      <div className="flex flex-col gap-y-6 mb-6">
        <h3 className="text-light-primary-text">Orders History</h3>
        <div className="flex gap-x-4 overflow-x-auto order-history-product-filter">
          {["All", "Processing", "Delivering", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={`inline-flex items-center justify-center py-2 px-6 text-sm leading-[22px] rounded-[80px] font-medium transition-colors ${
                filter === f.toLowerCase() ? "bg-primary text-white" : "bg-primary/8 text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        {filteredOrders.map((order, idx) => (
          <div key={idx} className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
            <table className="w-full order-history-table">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-5 px-6">
                    <div className="flex items-center justify-between">
                      <span>Order ID : {order.id}</span>
                      <button className={`btn btn-small py-[7px] px-2 text-xs leading-[18px] font-normal rounded-[90px] ${getStatusClass(order.status)}`}>
                        {order.status}
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="lg:px-6 px-4 py-6 border-b border-gray-300">
                    <div>
                      <ul className="flex flex-col gap-y-4">
                        <li className="flex items-center justify-between">
                          <p className="text-light-primary-text font-normal inline-flex items-center md:gap-x-4 gap-x-2">
                            <span className="inline-flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-calendar-03 text-2xl leading-6" />
                            </span>
                            Order Date:
                          </p>
                          <span className="font-semibold text-light-primary-text">
                            {order.date}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <p className="text-light-primary-text font-normal inline-flex items-center md:gap-x-4 gap-x-2">
                            <span className="inline-flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-delivery-box-01 text-2xl leading-6" />
                            </span>
                            Order Items
                          </p>
                          <span className="font-semibold text-light-primary-text">
                            {order.itemCount} Products
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <p className="text-light-primary-text font-normal inline-flex items-center md:gap-x-4 gap-x-2">
                            <span className="inline-flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-truck text-2xl leading-6" />
                            </span>
                            Delivery Method
                          </p>
                          <p className="font-semibold text-light-primary-text">
                            {order.deliveryMethod}
                          </p>
                        </li>
                        <li className="flex items-center justify-between">
                          <p className="text-light-primary-text font-normal inline-flex items-center md:gap-x-4 gap-x-2">
                            <span className="inline-flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-payment-success-01 text-2xl leading-6" />
                            </span>
                            Amount Payable
                          </p>
                          <p className="font-semibold text-light-primary-text">
                            {order.amount}
                            {order.isPaid && <span className="text-primary ml-0.5">(Paid)</span>}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => onViewDetails(order.id)}
                        className="btn btn-large btn-default outline py-1.5 px-7 text-sm leading-[22px] font-semibold rounded-[80px] shadow-none order-details-button"
                      >
                        View Details
                      </button>
                      <button className="btn btn-large btn-primary py-[7px] px-[25px] text-sm leading-[22px] font-semibold rounded-[80px]">
                        Order Again
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
