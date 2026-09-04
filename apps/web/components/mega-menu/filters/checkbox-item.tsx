import React from "react";

export const CheckboxItem = ({
  name,
  count,
  listItemClass,
}: {
  name: string;
  count: string | number;
  listItemClass?: string;
}) => (
  <li className={listItemClass}>
    <label className="group flex items-center justify-between w-full cursor-pointer">
      <span className="flex items-center gap-x-2">
        <span className="group-has-[input:checked]:group-hover:bg-[#00AB55]/8 flex items-center justify-center w-9 h-9 bg-transparent rounded-full group-hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
          <span className="relative inline-flex w-5 h-5 items-center justify-center">
            <input
              type="checkbox"
              className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all duration-300 ease-in-out"
            />
            <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
              <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
            </span>
          </span>
        </span>
        <span className="text-light-primary-text group-hover:text-primary transition-colors duration-300 ease-in-out">
          {name}
        </span>
      </span>
      <span className="group-hover:text-primary transition-colors duration-300 ease-in-out">
        ({count})
      </span>
    </label>
  </li>
);
