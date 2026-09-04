"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomFloatingSelectProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  hideBorder?: boolean;
}

export default function CustomFloatingSelect({
  options,
  label = "Sorting",
  placeholder,
  onChange,
  className,
  defaultValue,
  hideLabel = false,
  hideBorder = false,
}: CustomFloatingSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((opt) => opt.value === defaultValue) || null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    placement: "bottom" as "top" | "bottom",
  });

  const hasValue = !!selectedOption;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = options.length * 44 + 20; // Rough estimate based on padding and item height
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      let placement: "top" | "bottom" = "bottom";
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        placement = "top";
      }

      let adjustedLeft = rect.left;
      const intendedWidth = Math.max(rect.width, 205); // Account for minWidth: 205px
      
      // Prevent dropdown from cropping off the right side of mobile screens
      if (adjustedLeft + intendedWidth > window.innerWidth - 16) {
        adjustedLeft = window.innerWidth - intendedWidth - 16;
      }
      
      // Prevent spilling off left side
      if (adjustedLeft < 16) adjustedLeft = 16;

      setCoords({
        top: placement === "bottom" ? rect.bottom : rect.top,
        left: adjustedLeft,
        width: rect.width,
        placement,
      });
    }
  }, [options.length]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, updatePosition]);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isOutsideContainer =
        containerRef.current &&
        !containerRef.current.contains(event.target as Node);
      const isOutsideDropdown =
        !dropdownRef.current ||
        !dropdownRef.current.contains(event.target as Node);

      if (isOutsideContainer && isOutsideDropdown) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  const dropdownMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          ref={dropdownRef}
          initial={{ opacity: 0, y: coords.placement === "bottom" ? 8 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: coords.placement === "bottom" ? 8 : -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "fixed bg-white border border-[rgba(145,158,171,0.32)] rounded-lg shadow-dark-z-24 py-2 z-9999 overflow-y-auto max-h-[300px]",
            coords.placement === "top" ? "mb-2.5" : "mt-2.5",
          )}
          style={{
            top: coords.placement === "bottom" ? coords.top : "auto",
            bottom:
              coords.placement === "top"
                ? window.innerHeight - coords.top
                : "auto",
            left: coords.left,
            width: coords.width,
            minWidth: "205px",
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "px-4 py-2.5 text-base cursor-pointer transition-colors duration-200",
                selectedOption?.value === option.value
                  ? "text-primary font-semibold"
                  : "text-light-primary-text hover:text-primary",
              )}
            >
              {option.label}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className={cn("relative min-w-[140px]", className)} ref={containerRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "relative w-full flex h-10.5 items-center rounded-[100px] p-4 pr-8 transition-colors duration-200 cursor-pointer bg-white text-left",
          !hideBorder && "border",
          !hideBorder && (isOpen ? "border-light-primary-text" : "border-[rgba(145,158,171,0.32)]"),
        )}
      >
        {!hideLabel && (
          <span
            className={cn(
              "absolute left-[14px] pointer-events-none transition-all duration-200 ease-out",
              isOpen || hasValue
                ? "top-0 -translate-y-1/2 text-xs leading-[18px] bg-white px-1 text-light-disabled-text"
                : "top-1/2 -translate-y-1/2 text-base text-light-disabled-text",
            )}
          >
            {label}
          </span>
        )}

        {/* Selected value */}
        <span
          className={cn(
            "text-base text-light-primary-text transition-opacity duration-200 truncate block w-full text-left",
            (hideLabel || isOpen || hasValue) ? "opacity-100 visible" : "opacity-0 invisible",
          )}
        >
          {selectedOption?.label || placeholder || label}
        </span>

        {/* Chevron icon */}
        <span
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-xl leading-6 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180",
          )}
        >
          <i className="hgi hgi-stroke hgi-arrow-down-01" />
        </span>
      </button>

      {mounted && createPortal(dropdownMenu, document.body)}
    </div>
  );
}
