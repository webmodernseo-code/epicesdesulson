"use client";

import { useEffect, useState } from "react";
import HeaderSearch from "./header-search";
import MainMenu from "./main-menu";
import MobileMenu from "./mobile-menu";
import NavbarTop from "./navbar-top";
import MobileSidebar from "../drawer/mobile-sidebar";
import CartDrawer from "../drawer/cart-drawer";
import LoginDrawer from "../drawer/login-drawer";
import RegisterDrawer from "../drawer/register-drawer";
import ForgetPasswordDrawer from "../drawer/forget-password-drawer";
import SetPasswordDrawer from "../drawer/set-password";
import OtpDrawer from "../drawer/otp-drawer";
import QuickViewDrawer from "../drawer/quick-view-drawer";
import { useQuickView } from "@/context/quick-view-context";
import { useCart } from "@/context/cart-context";

type DrawerKey =
  | "sidebar"
  | "login"
  | "register"
  | "forgotPassword"
  | "setPassword"
  | "otp"
  | null;

export default function Navbar() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerKey>(null);
  const { isCartOpen, openCart, closeCart } = useCart();
  const { isOpen, closeQuickView } = useQuickView();

  const open = (key: DrawerKey) => setActiveDrawer(key);
  const close = () => {
    setActiveDrawer(null);
    closeCart();
  };

  // Lock body scroll when any drawer is open
  useEffect(() => {
    const isAnyOpen = activeDrawer || isOpen || isCartOpen;
    document.body.style.overflow = isAnyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeDrawer, isOpen, isCartOpen]);

  const is = (key: DrawerKey) => activeDrawer === key;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white">
        <NavbarTop />
        <HeaderSearch
          onOpenCart={openCart}
          onOpenLogin={() => open("login")}
          onOpenRegister={() => open("register")}
          onOpenForgotPassword={() => open("forgotPassword")}
          onOpenSetPassword={() => open("setPassword")}
          onOpenOtp={() => open("otp")}
        />
        <MobileMenu
          onOpenSidebar={() => open("sidebar")}
          onOpenCart={openCart}
        />
      </header>

      {/* Backdrop */}
      {(activeDrawer || isCartOpen) && (
        <div className="fixed inset-0 bg-black/40 z-90" onClick={close} />
      )}

      {/* All drawers */}
      <MobileSidebar
        isOpen={is("sidebar")}
        onClose={close}
        onOpenLogin={() => open("login")}
        onOpenRegister={() => open("register")}
      />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <LoginDrawer
        isOpen={is("login")}
        onClose={close}
        onOpenRegister={() => open("register")}
        onOpenForgotPassword={() => open("forgotPassword")}
      />
      <RegisterDrawer
        isOpen={is("register")}
        onClose={close}
        onOpenLogin={() => open("login")}
      />
      <ForgetPasswordDrawer isOpen={is("forgotPassword")} onClose={close} />
      <SetPasswordDrawer isOpen={is("setPassword")} onClose={close} />
      <OtpDrawer isOpen={is("otp")} onClose={close} />
      <QuickViewDrawer isOpen={isOpen} onClose={closeQuickView} />
    </>
  );
}
