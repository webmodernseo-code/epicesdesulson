"use client";
import Image from "next/image";

interface DashboardProfileProps {
  onEdit: () => void;
}

export default function DashboardProfile({ onEdit }: DashboardProfileProps) {
  return (
    <div className="menu-tab-pane" id="address">
      <div className="border border-[rgba(145,158,171,0.24)] rounded-3xl bg-white overflow-hidden">
        <div>
          <Image
            src="/images/vendors-list/vendor-list-view-3.png"
            alt="vendor banner"
            width={1200}
            height={200}
            className="rounded-t-3xl w-full h-[200px] object-cover"
          />
        </div>
        {/* content section */}
        <div className="md:px-6 px-4 pt-[92px] pb-6 relative">
          <div className="flex items-center justify-center absolute top-[-76px] left-6">
            <div className="w-36 h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full hover:border-primary transition-all duration-300 ease-in-out bg-white p-1">
              <label className="flex flex-col items-center justify-center w-32 h-32 bg-[#F4F5F6] rounded-full cursor-pointer">
                <input type="file" className="hidden" />
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6H7C7.55 6 8 5.55 8 5C8 4.45 7.55 4 7 4H5V2C5 1.45 4.55 1 4 1C3.45 1 3 1.45 3 2V4H1C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6H3V8Z"
                    fill="#495057"
                  />
                  <circle cx={13} cy={14} r={3} fill="#495057" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.83 6H21C22.1 6 23 6.9 23 8V20C23 21.1 22.1 22 21 22H5C3.9 22 3 21.1 3 20V9.72C3.3 9.89 3.63 10 4 10C5.1 10 6 9.1 6 8V7H7C8.1 7 9 6.1 9 5C9 4.63 8.89 4.3 8.72 4H15.12C15.68 4 16.22 4.24 16.59 4.65L17.83 6ZM8 14C8 16.76 10.24 19 13 19C15.76 19 18 16.76 18 14C18 11.24 15.76 9 13 9C10.24 9 8 11.24 8 14Z"
                    fill="#495057"
                  />
                </svg>
                <span className="mt-1 text-xs leading-[18px]">
                  Upload photo
                </span>
              </label>
            </div>
          </div>
          <div className="relative">
            <div>
              <div className="mb-6 flex flex-col gap-y-2">
                <a href="#">
                  <h6 className="hover:text-primary">Company Name</h6>
                </a>
                <p className="line-clamp-2">
                  Fresh Produce, Fruits &amp; Vegetables, Organic Groceries,
                  Dairy Products, Breads &amp; Bakery, Meat &amp; Seafood
                </p>
              </div>
              <div className="flex flex-col gap-y-5 border-b border-b-[rgba(145,158,171,0.24)] pb-5">
                <a href="#" className="flex items-center gap-x-2.5">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-call text-2xl leading-6" />
                  </span>
                  <span className="text-light-primary-text">
                    (555) 123-4567
                  </span>
                </a>
                <a href="#" className="flex items-center gap-x-2.5">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-mail-01 text-2xl leading-6" />
                  </span>
                  <span className="text-light-primary-text">
                    alex@example.com
                  </span>
                </a>
                <p className="flex items-center gap-x-2.5 text-light-primary-text">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-location-06 text-2xl leading-6" />
                  </span>
                  1234 Elm Street, Springfield, CA, 90210, United States
                </p>
              </div>
            </div>
            <div className="absolute -top-[60px] right-0">
              <button
                onClick={onEdit}
                className="btn btn-default btn-large px-[22px] py-2.5 outline rounded-[80px] edit-address-button"
              >
                <span className="inline-flex items-center justify-center">
                  <i className="hgi hgi-stroke hgi-edit-02 text-2xl leading-6 text-light-primary-text" />
                </span>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
