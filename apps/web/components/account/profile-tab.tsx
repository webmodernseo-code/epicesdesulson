import React from "react";
import { InputWithLabelProps } from "@/lib/types";

const ProfileTab = () => {
  return (
    <div className="menu-tab-pane">
      <div className="flex flex-col gap-y-6">
        <div className="mb-6">
          <h3 className="text-light-primary-text">My Account</h3>
        </div>
        
        {/* Personal Information */}
        <div className="border border-gray-300 rounded-2xl">
          <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
            <h5 className="text-light-primary-text font-bold">Personal Information</h5>
          </div>
          <div className="px-6 py-6">
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center justify-center">
                <div className="w-[144px] h-[144px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full hover:border-primary transition-all duration-300 ease-in-out">
                  <label className="flex flex-col items-center justify-center w-[128px] h-[128px] bg-[#F4F5F6] rounded-full cursor-pointer">
                    <input type="file" className="hidden" />
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6H7C7.55 6 8 5.55 8 5C8 4.45 7.55 4 7 4H5V2C5 1.45 4.55 1 4 1C3.45 1 3 1.45 3 2V4H1C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6H3V8Z" fill="#495057" />
                      <circle cx={13} cy={14} r={3} fill="#495057" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.83 6H21C22.1 6 23 6.9 23 8V20C23 21.1 22.1 22 21 22H5C3.9 22 3 21.1 3 20V9.72C3.3 9.89 3.63 10 4 10C5.1 10 6 9.1 6 8V7H7C8.1 7 9 6.1 9 5C9 4.63 8.89 4.3 8.72 4H15.12C15.68 4 16.22 4.24 16.59 4.65L17.83 6ZM8 14C8 16.76 10.24 19 13 19C15.76 19 18 16.76 18 14C18 11.24 15.76 9 13 9C10.24 9 8 11.24 8 14Z" fill="#495057" />
                    </svg>
                    <span className="mt-1 text-xs leading-[18px]">Upload photo</span>
                  </label>
                </div>
              </div>
              <form className="flex flex-col gap-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-6">
                  <InputWithLabel id="first_name" label="First Name" />
                  <InputWithLabel id="last_name" label="Last Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-6">
                  <InputWithLabel id="phone_number" label="Phone Number" type="tel" />
                  <InputWithLabel id="email_address" label="Email Address (Optional)" type="email" />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary btn-large md:px-[42px] w-full md:w-auto py-[11px] rounded-[100px]">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div className="border border-gray-300 rounded-2xl">
          <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
            <h5 className="text-light-primary-text font-bold">Password Change</h5>
          </div>
          <div className="px-6 py-6">
            <form className="flex flex-col gap-y-6">
              <InputWithLabel id="password" label="Password" type="password" />
              <InputWithLabel id="new_password" label="New Password" type="password" />
              <InputWithLabel id="confirm_new_password" label="Confirm New Password" type="password" />
              <div className="text-end">
                <button type="submit" className="btn btn-primary btn-large md:px-[22px] w-full md:w-auto py-[11px] rounded-[100px]">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default ProfileTab;
