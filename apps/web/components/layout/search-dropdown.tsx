"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SearchDropdownProps {
  id: string;
  placeholder?: string;
  className?: string;
}

export default function SearchDropdown({
  id,
  placeholder = "Rechercher une épice, un poivre, un condiment...",
  className,
}: SearchDropdownProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsSearchOpen(value.length > 0);
  };

  return (
    <div className={cn("relative search-input-container w-full", className)}>
      <div className="input-group px-6 pt-3 pb-3 rounded-[100px]">
        <div className="input-group-addon" data-align="inline-end">
          <i className="hgi hgi-stroke hgi-search-01 text-gray-500 text-xl" />
        </div>
        <input
          type="text"
          className="peer form-control header-search-input placeholder-transparent focus:placeholder-transparent"
          placeholder={placeholder}
          id={id}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchValue.length > 0) setIsSearchOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsSearchOpen(false), 200);
          }}
        />
        <label
          htmlFor={id}
          className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
        >
          {placeholder}
        </label>
      </div>

      {/* Results Dropdown */}
      <div
        data-state={isSearchOpen ? "open" : "close"}
        className="search-result-container p-4 absolute w-full top-[calc(100%+10px)] left-0 border border-gray-300 shadow-light-z-12 bg-white rounded-3xl z-999 transform data-[state=close]:translate-y-4 data-[state=close]:opacity-0 data-[state=close]:invisible transition-all duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=open]:visible"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-light-primary-text">Recherches fréquentes</p>
          <button
            onClick={() => setSearchValue("")}
            className="text-primary text-sm font-semibold cursor-pointer hover:underline"
          >
            Effacer
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-2 recent-search-list mb-4">
          {["Poivre de Kampot", "Safran d'Iran", "Vanille Bourbon", "Curry Madras"].map(
            (tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchValue(tag)}
                className="recent-search-item btn text-sm leading-[22px] font-normal btn-default outline btn-medium px-3.5 py-1.5 rounded-[50px] hover:border-primary hover:text-primary transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

