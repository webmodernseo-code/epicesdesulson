"use client";

import { motion } from "framer-motion";

export default function CategoryContent() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border border-gray-300 rounded-2xl category"
    >
      <div className="px-6 py-4 bg-gray-200 rounded-t-2xl sidebar-title">
        <div className="flex items-center justify-between">
          <h5 className="text-light-primary-text">Category</h5>
          <a
            href="#"
            className="text-primary text-base leading-[26px] font-semibold hover:underline"
          >
            Clear All
          </a>
        </div>
      </div>
      <div className="category-content-list p-6">
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
    </motion.div>
  );
}
