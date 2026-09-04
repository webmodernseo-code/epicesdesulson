"use client";

import React from "react";
import Image from "next/image";
import StarRating from "@/components/common/star-rating";
import { TimelineItemProps, OrderItemCardProps, SummaryItemProps } from "@/lib/types";

interface OrderDetailsProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetailsView: React.FC<OrderDetailsProps> = ({ orderId, onBack }) => {
  return (
    <div className="menu-tab-pane">
      <div className="flex items-center gap-x-6 mb-8">
        <button 
          onClick={onBack}
          className="btn btn-default outline size-12 rounded-[80px] shadow-none order-details-back-button"
        >
          <i className="hgi hgi-stroke hgi-arrow-left-02 text-2xl leading-6" />
        </button>
        <h4 className="text-light-primary-text flex items-center gap-x-5">
          Order ID <span>:</span> <span>{orderId}</span>
        </h4>
      </div>
      <div className="flex flex-col gap-y-6">
        {/* Timeline Table */}
        <div className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
          <table className="w-full order-history-table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-4 px-6 lg:text-xl lg:leading-[30px] text-lg leading-7 font-bold text-light-primary-text bg-gray-200">
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lg:px-6 px-4 pb-6 pt-10">
                  <div className="flex flex-col">
                    <TimelineItem 
                      date="Apr 24 11:12 AM" 
                      title="Order Placed" 
                      description="Thank you for your order! We’ve successfully received it and will begin preparing everything to ensure a smooth and timely delivery."
                      isCompleted 
                      isLast={false}
                    />
                    <TimelineItem 
                      date="Apr 24 11:12 AM" 
                      title="Processing" 
                      description="We’re currently reviewing your order details and checking the availability of the items. Hang tight — we’ll start packing soon!"
                      isCompleted 
                      isLast={false}
                    />
                    <TimelineItem 
                      date="----:-------" 
                      title="Payment" 
                      description="Your payment is being securely processed and verified. This may take a few moments. We’ll notify you as soon as it's confirmed."
                      isCompleted={false} 
                      isLast={false}
                    />
                    <TimelineItem 
                      date="----:-------" 
                      title="Delivered" 
                      description="Your order has been successfully delivered. We hope everything arrived safely and that you love your purchase. Thank you for choosing us!"
                      isCompleted={false} 
                      isLast={true}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shipment Address */}
        <div className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
          <table className="w-full order-history-table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-4 px-6 bg-gray-200 lg:text-xl lg:leading-[30px] text-lg leading-7 font-bold text-light-primary-text">
                  Shipment Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lg:px-6 px-4 py-6">
                  <ul className="flex flex-col gap-y-5">
                    <AddressInfoItem icon="hgi-user-square" label="Leslie Alexander" />
                    <AddressInfoItem icon="hgi-call" label="(555) 123-4567" />
                    <AddressInfoItem icon="hgi-mail-01" label="dolores.chambers@example.com" />
                    <AddressInfoItem icon="hgi-location-06" label="1234 Elm Street, Springfield, CA, 90210, United States" />
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Items */}
        <div className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
          <table className="w-full order-history-table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-4 px-6 bg-gray-200 lg:text-xl lg:leading-[30px] text-lg leading-7 font-bold text-light-primary-text">
                  Order Items
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lg:px-6 px-4 pt-6">
                  <ul className="flex flex-col gap-y-4">
                    <OrderItemCard 
                      image="/images/apple-juice.png"
                      title="Happy Bite Cookies – 300g"
                      price="$27.99"
                      oldPrice="$29.99"
                      category="Grocery"
                      variant="Color: Black, Size: 250 ML"
                      quantity={1}
                      status="Processing"
                    />
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-6">
                  <button className="btn btn-large btn-primary outline py-[11px] w-full rounded-[80px] transition-colors duration-300 ease-in-out shadow-none">
                    Create another order with these items
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto">
          <table className="w-full order-history-table">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-4 px-6 bg-gray-200 lg:text-xl lg:leading-[30px] text-lg leading-7 font-bold text-light-primary-text">
                  Order Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="lg:px-6 px-4 py-6">
                  <ul className="flex flex-col gap-y-5 border-b border-gray-300 pb-5">
                    <SummaryItem label="Order" value={orderId.replace('#', '')} />
                    <SummaryItem label="Order At" value="01 Jul, 2022" />
                    <SummaryItem label="Subtotal (MRP)" value="$19" />
                    <SummaryItem label="Discount Applied" value="-$1.15" isNegative />
                    <SummaryItem label="Rounding off" value="-$0.33" isNegative />
                    <SummaryItem label="Delivery Charge" value="Free" isSuccess />
                  </ul>
                  <div className="flex items-center justify-between py-5 border-b border-gray-300">
                    <h5>Amount Payable</h5>
                    <h5>$40.00</h5>
                  </div>
                  <div className="flex items-center justify-between pt-10 gap-x-10">
                    <button className="btn btn-large btn-error outline py-[11px] flex-1 rounded-[80px] transition-colors duration-300 ease-in-out shadow-none">
                      Cancel Order
                    </button>
                    <button className="btn btn-large btn-primary outline py-[11px] flex-1 rounded-[80px] transition-colors duration-300 ease-in-out shadow-none">
                      Download your invoice
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ date, title, description, isCompleted, isLast }: TimelineItemProps) => (
  <div className="flex gap-x-6">
    <div className="min-h-[90px] text-end">
      <p className="text-xs leading-[18px] w-[55px]">{date}</p>
    </div>
    <div className={`relative ${isLast ? 'after:hidden' : 'after:absolute after:top-2 after:bottom-0 after:inset-s-3.5 after:w-px after:-translate-x-1'} ${isCompleted ? 'after:bg-primary' : 'after:bg-gray-300'}`}>
      <div className="relative z-10 size-5 flex justify-center items-center">
        <div className={`size-5 rounded-full border ${isCompleted ? 'bg-primary-light border-primary-dark inline-flex items-center justify-center' : 'bg-white border-gray-300'}`}>
          {isCompleted && <i className="hgi hgi-stroke hgi-tick-02 text-primary-dark text-[10px] leading-[10px]" />}
        </div>
      </div>
    </div>
    <div className="grow pt-0.5 pb-8">
      <p className="font-semibold text-light-primary-text">{title}</p>
      <p className="text-light-secondary-text text-sm leading-[22px]">{description}</p>
    </div>
  </div>
);

const AddressInfoItem = ({ icon, label }: { icon: string, label: string }) => (
  <li className="flex items-center gap-x-2.5 text-light-primary-text">
    <span className="inline-flex items-center justify-center">
      <i className={`hgi hgi-stroke ${icon} text-2xl leading-6`} />
    </span>
    {label}
  </li>
);

const OrderItemCard = ({ image, title, price, oldPrice, category, variant, quantity, status }: OrderItemCardProps) => (
  <li className="py-4 border-b border-gray-300 last:border-b-0 first:pt-0 last:pb-0">
    <div className="flex flex-col md:flex-row gap-x-4">
      <div className="w-[120px] h-[120px] relative bg-gray-200 rounded-lg mx-auto mb-4 md:mb-0">
        <Image src={image} alt={title} fill className="rounded-lg object-cover" />
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        <div className="flex items-center justify-between">
          <a href="#" className="text-light-primary-text font-semibold hover:text-primary">{title}</a>
          <div className="flex items-center gap-x-2">
            <p className="text-light-disabled-text line-through font-normal">{oldPrice}</p>
            <p className="font-semibold text-light-primary-text">{price}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm leading-[22px]">{category}</p>
            <p className="text-sm leading-[22px]">{variant}</p>
          </div>
          <div>
            <p className="flex items-center gap-x-4">
              Quantity <span className="text-light-primary-text">:</span> <span className="text-light-primary-text">{quantity}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="rating-section flex items-center">
            <StarRating ratingPercentage={"80%"} />
            <span className="text-sm leading-[22px] font-normal inline-block ml-1">(189)</span>
          </div>
          <button className="inline-flex items-center justify-center bg-[rgba(255,193,7,0.16)] text-warning-dark py-px px-2 text-xs leading-[18px] font-normal rounded-md">
            {status}
          </button>
        </div>
      </div>
    </div>
  </li>
);

const SummaryItem = ({ label, value, isNegative, isSuccess }: SummaryItemProps) => (
  <li className="flex items-center justify-between">
    <p className="text-light-secondary-text">{label}</p>
    <span className={`${isNegative ? 'text-error' : isSuccess ? 'text-success' : 'text-light-primary-text'}`}>{value}</span>
  </li>
);

export default OrderDetailsView;
