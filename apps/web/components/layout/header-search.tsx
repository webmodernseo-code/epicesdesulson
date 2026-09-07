"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MAIN_MENU_DATA } from "./main-menu-data";
import { useCart } from "@/context/cart-context";

interface HeaderSearchProps {
  onOpenCart: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenForgotPassword?: () => void;
  onOpenSetPassword?: () => void;
  onOpenOtp?: () => void;
}

export default function HeaderSearch({
  onOpenCart,
}: HeaderSearchProps) {
  const pathname = usePathname();
  const { totalCount } = useCart();

  const dashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL ||
    (typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? "http://localhost:3001"
      : "https://admin.epicesdesulson.com");

  return (
    <div className="py-4 border-b border-gray-200 hidden xl:block header-middle bg-white shadow-xs">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity on Left */}
          <div className="shrink-0">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <Image
                src="/images/logo.png"
                alt="Les Épices de Sulson"
                width={190}
                height={60}
                priority
                className="h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-[19px] tracking-tight text-gray-900 leading-tight group-hover:text-primary transition-colors">
                  Les Épices de Sulson
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-800/80 leading-none mt-1">
                  Maison d&apos;Assemblages & Terroirs
                </span>
              </div>
            </Link>
          </div>

          {/* Centered Navigation Menu in place of Search Bar */}
          <nav className="flex-1 flex justify-center items-center px-8">
            <ul className="flex items-center gap-x-3">
              {MAIN_MENU_DATA.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`font-semibold text-[15px] px-6 py-2.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? "text-primary bg-primary/10 shadow-xs"
                          : "text-gray-700 hover:text-primary hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Account & Cart on Right */}
          <div className="flex items-center gap-x-6 shrink-0">
            <ul className="flex items-center gap-x-6">
              {/* Account / Direct Admin Login Link */}
              <li className="flex items-center">
                <a
                  href={dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 cursor-pointer py-2 group text-left"
                  aria-label="Espace Gestion Administrateur"
                >
                  <span className="inline-flex items-center justify-center bg-gray-100 group-hover:bg-primary/10 size-10 rounded-full shadow-xs transition-colors">
                    <i className="hgi hgi-stroke hgi-user-circle text-xl text-gray-800 group-hover:text-primary transition-colors" />
                  </span>
                  <span className="flex flex-col text-xs text-gray-500 leading-tight">
                    <span>Espace Gestion</span>
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      Connexion
                    </span>
                  </span>
                </a>
              </li>

              {/* Cart Button */}
              <li className="flex items-center">
                <button
                  onClick={onOpenCart}
                  className="flex items-center gap-x-3 cursor-pointer py-2 group text-left"
                  aria-label="Ouvrir le panier"
                >
                  <span className="inline-flex items-center justify-center bg-warning size-10 rounded-full shadow-xs group-hover:scale-105 transition-transform relative">
                    <i className="hgi hgi-stroke hgi-shopping-cart-02 text-xl text-gray-900" />
                    {totalCount > 0 && (
                      <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                        {totalCount}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-col text-xs text-gray-500 leading-tight">
                    <span>Panier</span>
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {totalCount} {totalCount > 1 ? "Articles" : "Article"}
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
