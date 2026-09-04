"use client";

import { motion, AnimatePresence } from "framer-motion";
import StarRating from "@/components/common/star-rating";

interface OffcanvasFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OffcanvasFilter({
  isOpen,
  onClose,
}: OffcanvasFilterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90"
          />

          {/* Filter Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 max-w-[390px] w-full bg-white h-full z-91 pt-4 flex flex-col justify-between gap-y-6 overflow-y-auto shadow-light-z-24"
            id="filter-sidebar"
          >
            <div>
              <div className="px-6 pb-6 border-b border-gray-300">
                <div className="relative">
                  <h5>Filters</h5>
                  <button
                    className="size-7 bg-[rgba(145,158,171,0.08)] inline-flex items-center justify-center absolute top-0 right-0 rounded-full hover:bg-gray-200 transition-colors"
                    id="filter-side-bar-menu-close"
                    onClick={onClose}
                  >
                    <i className="hgi hgi-stroke hgi-multiplication-sign text-xl leading-5 text-light-primary-text" />
                  </button>
                </div>
              </div>
              {/* category */}
              <div className="px-6">
                {/* Category-content */}
                <div className="widget-category">
                  <div className="flex flex-col gap-y-4 pb-8 pt-6 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-category-title">
                      <h6>Category</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="input-group medium pl-4 py-2 pr-2.5 rounded-[100px] widget-category-search relative w-full">
                      <div
                        className="input-group-addon inline-flex items-center justify-center leading-6"
                        data-align="inline-start"
                      >
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-search-01 text-2xl leading-6 text-light-primary-text" />
                        </span>
                      </div>
                      <input
                        type="text"
                        id="search"
                        className="peer form-control placeholder-transparent focus:placeholder-transparent focus:outline-none"
                        placeholder="Search"
                      />
                      <label
                        htmlFor="search"
                        className="absolute left-12 top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:left-[14px] peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-[14px] bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                      >
                        Search
                      </label>
                    </div>
                    <div className="widget-category-content-list">
                      <div className="max-h-[170px] overflow-y-auto pr-2.5 category-scroll">
                        <ul className="flex flex-col gap-y-2">
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Thermometers
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (29)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Oximeters
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (5)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  BP Monitors
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="widget-category-content-list-items">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PRICE-Range-content */}
                <div className="widget-price-range">
                  <div className="flex flex-col gap-y-6 py-8 border-b border-gray-300 widget-price-range-title">
                    <div className="flex items-center justify-between">
                      <h6>Price Range</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div id="price-range-slider" />
                    <div className="price-range-values flex items-center justify-between">
                      <div className="input-group medium max-w-[147px] w-full rounded-[80px] py-2 px-3.5">
                        <div
                          className="input-group-addon inline-flex items-center justify-center leading-6"
                          data-align="inline-start"
                        >
                          $
                        </div>
                        <input
                          className="price-range-min-value form-control"
                          readOnly
                          type="text"
                          defaultValue={0}
                        />
                      </div>
                      <span className="text-sm leading-[22px] text-light-disabled-text">
                        To
                      </span>
                      <div className="input-group medium max-w-[147px] w-full rounded-[80px] py-2 px-3.5">
                        <div
                          className="input-group-addon inline-flex items-center justify-center leading-6"
                          data-align="inline-start"
                        >
                          $
                        </div>
                        <input
                          className="price-range-max-value form-control"
                          readOnly
                          type="text"
                          defaultValue={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Rating-content */}
                <div className="widget-rating">
                  <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-rating-title">
                      <h6>Rating</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="ratings">
                      <ul className="flex items-center flex-wrap gap-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <li key={rating}>
                            <a
                              href="#"
                              className="btn btn-default outline shadow-none gap-x-1.5 items-center text-base leading-6 px-2.5 py-1.5 rounded-[80px]"
                            >
                              {rating}
                              <StarRating rating={rating} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Color-centent */}
                <div className="widget-color-picker">
                  <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-color-title">
                      <h6>Color</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="colors">
                      <ul className="flex items-center flex-wrap gap-5">
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-primary rounded-full" />
                        </li>
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-info rounded-full" />
                        </li>
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-info-darker rounded-full" />
                        </li>
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-warning rounded-full" />
                        </li>
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-error-light rounded-full" />
                        </li>
                        <li className="inline-flex items-center justify-center">
                          <button className="w-5 h-5 inline-flex items-center justify-center bg-error-dark rounded-full" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Size-content */}
                <div className="widget-size-picker">
                  <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-size-title">
                      <h6>Size</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="sizes">
                      <ul className="flex items-center flex-wrap gap-3">
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            S
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            M
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            L
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            XL
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            XXL
                          </button>
                        </li>
                        <li>
                          <button className="btn btn-default outline shadow-none py-[7px] px-[15px] rounded-[80px]">
                            XXXL
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Discount-content */}
                <div className="widget-discount">
                  <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-discount-title">
                      <h6>Discount</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="discount">
                      <ul className="flex flex-col gap-y-2">
                        <li className="discount-items">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                upto 5%
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (10)
                            </span>
                          </label>
                        </li>
                        <li className="discount-items">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                5% - 10%
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (8)
                            </span>
                          </label>
                        </li>
                        <li className="discount-items">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                10% - 15%
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (32)
                            </span>
                          </label>
                        </li>
                        <li className="discount-items">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                15% - 25%
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (12)
                            </span>
                          </label>
                        </li>
                        <li className="discount-items">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                More than 25%
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (12)
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Brand-content */}
                <div className="widget-brand">
                  <div className="flex flex-col gap-y-4 py-8 border-b border-gray-300">
                    <div className="flex items-center justify-between widget-brand-title">
                      <h6>Brand</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="brand-content-list">
                      <div className="max-h-[170px] overflow-y-auto pr-2.5 category-scroll">
                        <ul className="flex flex-col gap-y-2">
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Mediguard
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (8)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  HealthPlus
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (7)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  BioCare
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (3)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  SmartAid
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  SmartAid
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (3)
                              </span>
                            </label>
                          </li>
                          <li className="brand-list-item">
                            <label className="group flex items-center justify-between w-full cursor-pointer">
                              <span className="flex items-center gap-x-2">
                                {/* custom checkbox wrapper */}
                                <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                  <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                    <input
                                      type="checkbox"
                                      className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                    />
                                    {/* checkbox tick icon */}
                                    <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                      <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                    </span>
                                  </span>
                                </span>
                                <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                  Personal Care
                                </span>
                              </span>
                              <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                                (1)
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Discount-content */}
                <div className="widget-pack-size">
                  <div className="flex flex-col gap-y-4 pt-8">
                    <div className="flex items-center justify-between">
                      <h6>Pack Size</h6>
                      <a
                        href="#"
                        className="text-base leading-[26px] hover:underline hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Reset
                      </a>
                    </div>
                    <div className="pack-size-lists">
                      <ul className="flex flex-col gap-y-2">
                        <li className="pack-size-list-item">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                400 to 500 g
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (40)
                            </span>
                          </label>
                        </li>
                        <li className="pack-size-list-item">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                500 to 700 g
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (20)
                            </span>
                          </label>
                        </li>
                        <li className="pack-size-list-item">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                700 to 1 kg
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (32)
                            </span>
                          </label>
                        </li>
                        <li className="pack-size-list-item">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                120 - 150 g each vacuum
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (20)
                            </span>
                          </label>
                        </li>
                        <li className="pack-size-list-item">
                          <label className="group flex items-center justify-between w-full cursor-pointer">
                            <span className="flex items-center gap-x-2">
                              {/* custom checkbox wrapper */}
                              <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
                                <span className="relative inline-flex w-5 h-5 items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
                                  />
                                  {/* checkbox tick icon */}
                                  <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
                                    <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
                                  </span>
                                </span>
                              </span>
                              <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
                                1 pc
                              </span>
                            </span>
                            <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
                              (09)
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* clear all */}
              <div className="pt-6">
                <button className="btn border-t border-gray-300 shadow-light-z-8 text-primary font-semibold py-[18px] rounded-none w-full">
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
