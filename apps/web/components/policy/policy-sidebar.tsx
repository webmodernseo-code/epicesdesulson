"use client";

import React, { useState, useEffect } from "react";

interface PolicySidebarProps {
  navItems: { id: string; label: string }[];
}

const PolicySidebar: React.FC<PolicySidebarProps> = ({ navItems }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      let currentActive = "";

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            currentActive = section.id;
          }
        }
      }
      setActiveId(currentActive || navItems[0]?.id || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <div className="border border-gray-300 sticky top-20 rounded-xl p-4">
      <nav>
        <ul className="flex flex-col gap-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`p-4 flex transition-all items-center justify-start rounded-lg text-base font-semibold ${
                  activeId === item.id
                    ? "bg-primary text-white"
                    : "bg-transparent text-light-secondary-text hover:bg-primary/10"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PolicySidebar;
