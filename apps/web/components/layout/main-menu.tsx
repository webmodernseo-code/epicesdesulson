"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MAIN_MENU_DATA } from "./main-menu-data";

export default function MainMenu() {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border border-gray-300 hidden xl:flex header-bottom sticky-header border-r-0 border-l-0 ${
        isSticky ? "sticky-top" : ""
      }`}
    >
      <div className="container">
        <div className="hidden relative items-center justify-between xl:flex py-1">
          <nav className="main-menu">
            <ul className="flex items-center gap-x-2">
              {MAIN_MENU_DATA.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`font-semibold text-base px-5 py-3 rounded-full transition-colors ${
                        isActive
                          ? "text-primary bg-[rgba(0,171,85,0.08)]"
                          : "text-light-primary-text hover:text-primary hover:bg-[rgba(145,158,171,0.08)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div>
            <p className="xl:flex lg:items-center gap-x-4 hidden">
              <span className="size-11 inline-flex items-center justify-center rounded-full transition-colors duration-300 bg-[rgba(145,158,171,0.08)]">
                <i className="hgi hgi-stroke hgi-customer-support text-2xl text-light-primary-text" />
              </span>
              <span className="flex flex-col text-sm leading-[20px]">
                <span className="text-light-secondary-text text-xs">Service client</span>
                <span className="text-sm font-semibold text-light-primary-text">
                  contact@epicesdesulson.com
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

