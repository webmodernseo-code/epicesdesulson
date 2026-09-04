"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

interface MobileMenuProps {
  onOpenSidebar: () => void;
  onOpenCart: () => void;
}

export default function MobileMenu({
  onOpenSidebar,
  onOpenCart,
}: MobileMenuProps) {
  const [isSticky, setIsSticky] = useState(false);
  const { totalCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b border-gray-200 xl:border-0 sticky-header xl:hidden bg-white ${
        isSticky ? "sticky-top shadow-xs" : ""
      }`}
    >
      {/* Top bar: hamburger + logo + cart */}
      <div className="py-3">
        <div className="container">
          <div className="flex justify-between items-center">
            {/* Hamburger */}
            <button
              onClick={onOpenSidebar}
              className="btn btn-default outline shadow-none size-10 rounded-full flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12L10 12"
                  stroke="#212529"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 5L4 5"
                  stroke="#212529"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 19L4 19"
                  stroke="#212529"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="Les Épices de Sulson"
                width={160}
                height={38}
                className="w-[140px] h-auto"
              />
            </Link>

            {/* Cart icon */}
            <button
              onClick={onOpenCart}
              className="btn bg-warning size-10 rounded-full flex items-center justify-center relative"
              aria-label="Open cart"
            >
              <i className="hgi hgi-stroke hgi-shopping-cart-01 text-gray-900 text-xl leading-none" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
