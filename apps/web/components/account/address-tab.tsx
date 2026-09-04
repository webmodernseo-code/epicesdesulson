"use client";

import React, { useState } from "react";
import { InputWithLabelProps, RadioOptionProps, AddressCardProps } from "@/lib/types";

const AddressTab = () => {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <div className="menu-tab-pane">
        <div className="flex items-center gap-x-6 mb-6">
          <button 
            onClick={() => setIsAdding(false)}
            className="btn btn-default outline size-12 rounded-full shadow-none"
          >
            <i className="hgi hgi-stroke hgi-arrow-left-02 text-2xl leading-6" />
          </button>
          <h4 className="text-light-primary-text">Add New Address</h4>
        </div>
        <div className="border border-gray-300 rounded-2xl">
          <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
            <h5 className="text-light-primary-text">Shipping Address</h5>
          </div>
          <div className="px-6 py-6">
            <form className="flex flex-col gap-y-6">
              <div className="grid xl:grid-cols-12 lg:grid-cols-2 grid-cols-1 md:gap-x-4 gap-x-0 gap-y-6 w-full">
                <div className="grid grid-cols-12 gap-x-4 gap-y-6 w-full col-span-6">
                  <div className="md:col-span-6 col-span-12">
                    <div className="relative w-full h-full">
                      {/* Note: Nice-select might need a wrapper or initialization in a real app */}
                      <select className="form-control input-group medium rounded-[80px] px-3.5 focus:outline-none appearance-none" id="country">
                        <option value={1}>United States</option>
                        <option value={2}>Canada</option>
                        <option value={3}>United Kingdom</option>
                      </select>
                      <label htmlFor="country" className="absolute left-[14px] top-0 -translate-y-1/2 text-xs leading-[18px] bg-white px-1 text-light-disabled-text">
                        Country / Region
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-6 col-span-12">
                    <InputWithLabel id="city" label="City" />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-x-4 gap-y-6 w-full col-span-6">
                  <div className="md:col-span-6 col-span-12">
                    <InputWithLabel id="state" label="State" />
                  </div>
                  <div className="md:col-span-6 col-span-12">
                    <InputWithLabel id="zip_code" label="Zip Code" type="tel" />
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <textarea
                  id="address_comment"
                  className="form-control peer input-group medium rounded-[20px] ps-4 pe-6 resize-none placeholder-transparent focus:outline-none"
                  rows={4}
                  placeholder="Apartments, suit, unit, etc ( Optional)"
                />
                <label
                  htmlFor="address_comment"
                  className="absolute left-[14px] top-4 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-4 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                >
                  Apartments, suit, unit, etc ( Optional)
                </label>
              </div>
              <div>
                <p className="font-semibold text-light-disabled-text mb-2">Delivery Schedule</p>
                <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4">
                  <RadioOption name="address-type" label="Home Address" />
                  <RadioOption name="address-type" label="Office Address" />
                  <RadioOption name="address-type" label="Other Address" />
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <button type="submit" className="btn btn-primary btn-large py-[11px] px-8 rounded-[80px]">Save Address</button>
                <button type="button" onClick={() => setIsAdding(false)} className="btn btn-default outline btn-large py-[11px] px-8 rounded-[80px] shadow-none">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-tab-pane">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-light-primary-text">Address</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn btn-primary btn-large py-[11px] rounded-[80px]"
        >
          Add New Address
        </button>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <AddressCard icon="hgi-location-06" title="Home Address" address={["1234 Elm Street", "Springfield", "CA 90210", "United States"]} />
        <AddressCard icon="hgi-location-06" title="Office Address" address={["1234 Elm Street", "Springfield", "CA 90210", "United States"]} />
      </div>
    </div>
  );
};

const AddressCard = ({ icon, title, address }: AddressCardProps) => (
  <div className="order-history-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto flex-1">
    <table className="w-full order-history-table">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="text-left py-4 px-4 bg-gray-200">
            <div className="flex items-center justify-between">
              <p className="lg:text-xl lg:leading-[30px] text-lg leading-7 text-light-primary-text inline-flex items-center gap-x-3 font-bold">
                <span className="inline-flex items-center justify-center">
                  <i className={`hgi hgi-stroke ${icon} text-2xl leading-6 font-normal`} />
                </span>
                {title}
              </p>
              <button className="btn btn-default btn-small outline rounded-[80px] shadow-none">
                <span className="inline-flex items-center justify-center mr-2">
                  <i className="hgi hgi-stroke hgi-edit-02 text-[18px] leading-[18px] text-light-primary-text" />
                </span>
                Change
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-6">
            <ul className="flex flex-col gap-y-1">
              {address.map((line: string, i: number) => (
                <li key={i} className="text-light-primary-text">{line}</li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const InputWithLabel = ({ id, label, type = "text" }: InputWithLabelProps) => (
  <div className="relative w-full">
    <input
      type={type}
      id={id}
      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:outline-none"
      placeholder={label}
    />
    <label
      htmlFor={id}
      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
    >
      {label}
    </label>
  </div>
);

const RadioOption = ({ name, label }: RadioOptionProps) => (
  <label className="flex items-center cursor-pointer">
    <span className="has-[input:checked]:hover:bg-[#00AB55]/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
      <span className="relative inline-flex w-5 h-5 items-center justify-center">
        <input
          type="radio"
          name={name}
          className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-primary border-gray-300 rounded-full bg-white transition-all"
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all" />
      </span>
    </span>
    <span className="text-light-primary-text text-sm leading-[22px] font-normal">
      {label}
    </span>
  </label>
);

export default AddressTab;
