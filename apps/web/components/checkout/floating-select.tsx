"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Option {
  value: string | number;
  label: string;
}

interface FloatingSelectProps {
  id: string;
  label: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left peer form-control input-group medium rounded-[80px] px-3.5 focus:outline-none flex items-center justify-between"
      >
        <span className={value ? "text-light-primary-text pt-2" : "text-transparent"}>
          {selectedOption?.label || ""}
        </span>
        <i className={`hgi hgi-stroke hgi-arrow-down-01 text-xl transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <label
        htmlFor={id}
        className={`absolute left-[14px] transition-all pointer-events-none bg-white px-1
          ${value || isOpen 
            ? "top-0 text-[12px] text-light-disabled-text -translate-y-1/2" 
            : "top-1/2 text-[16px] text-light-disabled-text -translate-y-1/2 pb-1"}`}
      >
        {label}
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-dark-z-24 max-h-[300px] overflow-y-auto py-2"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                    value === option.value ? "text-primary font-bold bg-primary/5" : "text-light-primary-text"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSelect;
