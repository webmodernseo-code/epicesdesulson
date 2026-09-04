"use client";

import { useState } from "react";
import Breadcrumb from "@/components/common/breadcrumb";
import VendorGridCard, { Vendor } from "@/components/vendor/vendor-grid-card";
import VendorListCard from "@/components/vendor/vendor-list-card";
import { cn } from "@/lib/utils";
import CustomFloatingSelect from "@/components/common/custom-floating-select";

const VENDORS_DATA: Vendor[] = [
  {
    id: 1,
    bannerImage: "/images/vendors-list/vendor-1.png",
    profileImage: "/images/vendors-list/vendor-profile.png",
    companyName: "Nature's Pharmacy",
    rating: 4.5,
    reviewCount: 189,
    phone: "(555) 123-4567",
    email: "contact@naturespharm.com",
    address: "1234 Elm Street, Springfield, CA, 90210, United States",
  },
  {
    id: 2,
    bannerImage: "/images/vendors-list/vendor-2.png",
    profileImage: "/images/vendors-list/vendor-profile.png",
    companyName: "Healthy Living Store",
    rating: 5,
    reviewCount: 245,
    phone: "(555) 987-6543",
    email: "hello@healthyliving.com",
    address: "5678 Oak Avenue, Metropolis, NY, 10001, United States",
  },
  {
    id: 3,
    bannerImage: "/images/vendors-list/vendor-3.png",
    profileImage: "/images/vendors-list/vendor-profile.png",
    companyName: "MedPlus Pharmacy",
    rating: 4,
    reviewCount: 98,
    phone: "(555) 456-7890",
    email: "support@medplus.net",
    address: "910 Pine Road, Austin, TX, 73301, United States",
  },
];

const sortingOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Low to High Price", value: "low-to-high-price" },
  { label: "High to Low Price", value: "high-to-low-price" },
  { label: "Avarage Rating", value: "avarage-rating" },
  { label: "A-Z Order", value: "a-z-order" },
  { label: "Z-A Order", value: "z-a-order" },
];

export default function VendorsListPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <div>
      <Breadcrumb items={[{ label: "Vendors List" }]} />

      <div className="pb-[70px]">
        <div className="container">
          <div className="flex items-center justify-between pb-6 gap-y-4">
            <div className="flex items-center gap-x-4 shrink-0 justify-start md:w-auto">
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "w-10 h-10 rounded-full inline-flex items-center justify-center transition-all duration-300",
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-300 text-gray-400 hover:border-primary hover:text-primary",
                  )}
                >
                  <i className="hgi hgi-stroke hgi-more-01 text-2xl" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "w-10 h-10 rounded-full inline-flex items-center justify-center transition-all duration-300",
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-300 text-gray-400 hover:border-primary hover:text-primary",
                  )}
                >
                  <i className="hgi hgi-stroke hgi-left-to-right-list-bullet text-2xl" />
                </button>
              </div>
              <div className="hidden lg:block">
                <p className="text-light-secondary-text">
                  Showing 1-{VENDORS_DATA.length} of {VENDORS_DATA.length}{" "}
                  results
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-4 flex-1 justify-end w-full md:w-auto">
              <div className="input-group medium max-w-[345px] pl-4 py-2 pr-2.5 rounded-[100px] flex-1  h-10.5 hidden lg:flex">
                <div
                  className="input-group-addon  inline-flex items-center justify-center leading-6"
                  data-align="inline-start"
                >
                  <i className="hgi hgi-stroke hgi-search-01 text-2xl text-light-disabled-text" />
                </div>
                <input
                  type="text"
                  className="peer form-control   placeholder-transparent focus:placeholder-transparent"
                  id="search-company"
                  placeholder="Search Company"
                />
                <label
                  htmlFor="search-company"
                  className="absolute left-12 peer-focus:left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                >
                  Search Company
                </label>
              </div>

              <CustomFloatingSelect
                options={sortingOptions}
                label="Sorting"
                defaultValue="popularity"
                onChange={(value) => console.log("Sorted by:", value)}
              />
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-12 gap-6">
              {VENDORS_DATA.map((vendor, index) => (
                <VendorGridCard
                  key={vendor.id || index}
                  vendor={vendor}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {VENDORS_DATA.map((vendor, index) => (
                <VendorListCard
                  key={vendor.id || index}
                  vendor={vendor}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
