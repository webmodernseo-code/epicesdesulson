"use client";

import React, { useState } from "react";
import FloatingSelect from "@/components/input/floating-select";

interface DashboardEditProfileProps {
  onBack: () => void;
}

export default function DashboardEditProfile({
  onBack,
}: DashboardEditProfileProps) {
  const [category, setCategory] = useState("groceries");
  const [country, setCountry] = useState("usa");
  const [state, setState] = useState("ca");

  const CATEGORY_OPTIONS = [
    { value: "groceries", label: "Groceries" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
  ];

  const COUNTRY_OPTIONS = [
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  const STATE_OPTIONS = [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
  ];
  return (
    <div className="menu-tab-pane" id="edit-address">
      <div className="flex items-center gap-x-6 mb-6">
        <button
          onClick={onBack}
          className="btn btn-default outline size-12 rounded-full add-new-address-back-button"
        >
          <i className="hgi hgi-stroke hgi-arrow-left-02 text-2xl leading-6" />
        </button>
        <h4 className="text-light-primary-text">Edit Profile</h4>
      </div>
      <div className="border border-gray-300 rounded-2xl bg-white p-10">
        <form className="flex flex-col gap-y-6">
          {/* Company Name */}
          <div className="relative w-full">
            <input
              type="text"
              id="company_name"
              className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
              placeholder="Company Name *"
              defaultValue="Sellzy Official Store"
            />
            <label
              htmlFor="company_name"
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
            >
              Company Name *
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Name */}
            <div className="relative w-full">
              <input
                type="text"
                id="owner_name"
                className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
                placeholder="Owner Name *"
                defaultValue="Alex Turner"
              />
              <label
                htmlFor="owner_name"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
              >
                Owner Name *
              </label>
            </div>
            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
                placeholder="Email *"
                defaultValue="alex@example.com"
              />
              <label
                htmlFor="email"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
              >
                Email *
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div className="relative w-full">
              <input
                type="text"
                id="phone"
                className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
                placeholder="Phone Number *"
                defaultValue="(555) 123-4567"
              />
              <label
                htmlFor="phone"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
              >
                Phone Number *
              </label>
            </div>
            {/* Category */}
            <FloatingSelect
              options={CATEGORY_OPTIONS}
              label="Category"
              defaultValue="groceries"
              onChange={(value) => setCategory(value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country / Region */}
            <FloatingSelect
              options={COUNTRY_OPTIONS}
              label="Country / Region"
              defaultValue="usa"
              onChange={(value) => setCountry(value)}
            />
            {/* City */}
            <div className="relative w-full">
              <input
                type="text"
                id="city"
                className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
                placeholder="City *"
                defaultValue="Springfield"
              />
              <label
                htmlFor="city"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
              >
                City *
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <FloatingSelect
              options={STATE_OPTIONS}
              label="State"
              defaultValue="ca"
              onChange={(value) => setState(value)}
            />
            {/* Zip Code */}
            <div className="relative w-full">
              <input
                type="text"
                id="zip_code"
                className="peer form-control input-group h-14 rounded-full px-6 border-gray-300 placeholder-transparent focus:placeholder-transparent focus:outline-none focus:border-light-primary-text transition-all"
                placeholder="Zip Code *"
                defaultValue="90210"
              />
              <label
                htmlFor="zip_code"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[15px] leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white px-1"
              >
                Zip Code *
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="btn btn-primary h-14 px-24 rounded-full text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all"
              type="button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
