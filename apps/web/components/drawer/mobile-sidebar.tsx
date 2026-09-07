"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  MAIN_MENU_DATA,
  type MenuItem,
  type SubMenuItem,
} from "@/components/layout/main-menu-data";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

const slideDown: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

/* ── Recursive sub-menu renderer ── */
function SubMenuItems({
  items,
  currentPath,
  onClose,
}: {
  items: SubMenuItem[];
  currentPath: string;
  onClose?: () => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx((p) => (p === i ? null : i));

  const hasActiveChild = (item: SubMenuItem): boolean =>
    item.href === currentPath || (item.subItems?.some(hasActiveChild) ?? false);

  return (
    <div className="flex flex-col pt-1.5 pl-3 gap-y-1 border-l-2 border-primary/20 ml-2">
      {items.map((item, i) => {
        const active = hasActiveChild(item);
        return (
          <div key={i}>
            {item.subItems ? (
              <>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={`flex items-center justify-between w-full text-left text-[15px] font-medium py-2 px-2.5 rounded-lg transition-colors ${
                    active ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>
                  <i
                    className={`hgi hgi-stroke hgi-arrow-down-01 text-base transition-transform duration-200 ${
                      openIdx === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      key={i}
                      variants={slideDown}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{ overflow: "hidden" }}
                    >
                      <SubMenuItems
                        items={item.subItems}
                        currentPath={currentPath}
                        onClose={onClose}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                className={`block text-[15px] font-medium py-2 px-2.5 rounded-lg transition-colors ${
                  currentPath === item.href
                    ? "active text-primary font-bold bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Top-level menu ── */
function MobileNav({ onClose }: { onClose: () => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIdx((p) => (p === i ? null : i));
  const currentPath = usePathname();

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href === currentPath) return true;
    if (
      item.subItems?.some(
        (s) =>
          s.href === currentPath ||
          s.subItems?.some((c) => c.href === currentPath),
      )
    )
      return true;
    if (
      item.megaMenu?.some((section) =>
        section.items.some((i) => i.href === currentPath),
      )
    )
      return true;
    return false;
  };

  return (
    <nav className="mobile-menu">
      <ul className="flex flex-col gap-y-1">
        {MAIN_MENU_DATA.map((item: MenuItem, i: number) => {
          const hasChildren = !!(item.subItems || item.megaMenu);
          const isOpen = openIdx === i;

          const children: SubMenuItem[] | undefined = item.megaMenu
            ? item.megaMenu.map((section) => ({
                label: section.title,
                href: "#",
                subItems: section.items,
              }))
            : item.subItems;

          return (
            <li key={i} className="py-1 border-b border-gray-100 last:border-b-0">
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className={`flex items-center justify-between w-full text-left text-base sm:text-[17px] font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                      isItemActive(item) ? "text-primary bg-primary/5" : "text-gray-800 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <i
                      className={`hgi hgi-stroke hgi-arrow-down-01 text-lg transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : "text-gray-400"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && children && (
                      <motion.div
                        key={i}
                        variants={slideDown}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ overflow: "hidden" }}
                      >
                        <SubMenuItems
                          items={children}
                          currentPath={currentPath}
                          onClose={onClose}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block text-base sm:text-[17px] font-semibold py-2.5 px-3 rounded-xl transition-colors ${
                    currentPath === item.href
                      ? "active text-primary font-bold bg-primary/10"
                      : "text-gray-800 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ── Main sidebar drawer ── */
export default function MobileSidebar({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister,
}: MobileSidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-sidebar"
          initial={{ x: -280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -280, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-[320px] sm:w-[350px] bg-white h-full z-91 px-5 py-6 flex flex-col gap-y-6 overflow-y-auto shadow-2xl"
          id="sidebar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <Link href="/" onClick={onClose}>
              <Image
                src="/images/logo.png"
                alt="Les Épices de Sulson"
                width={160}
                height={52}
                className="w-[145px] h-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="size-8 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-xl" />
            </button>
          </div>

          {/* Navigation with enlarged typography */}
          <div className="flex-1">
            <MobileNav onClose={onClose} />
          </div>

          {/* Auth / Admin */}
          <div className="border border-gray-200 p-4 rounded-2xl bg-amber-50/40">
            <button
              onClick={() => {
                onClose();
                onOpenLogin?.();
              }}
              className="flex items-center gap-x-3 text-left w-full text-sm font-bold text-gray-900 hover:text-primary transition-colors"
            >
              <span className="inline-flex items-center justify-center bg-primary text-white size-9 rounded-full shrink-0 shadow-xs">
                <i className="hgi hgi-stroke hgi-lock-sync-01 text-lg" />
              </span>
              <span>Espace Gestion / Vendeuse</span>
            </button>
          </div>

          {/* Social */}
          <div className="pt-2 border-t border-gray-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Suivez-nous
            </h5>
            <ul className="flex items-center gap-x-3">
              {[
                { icon: "hgi-facebook-01", label: "Facebook" },
                { icon: "hgi-instagram", label: "Instagram" },
                { icon: "hgi-linkedin-01", label: "LinkedIn" },
              ].map((s) => (
                <li key={s.icon}>
                  <Link
                    href="#"
                    aria-label={s.label}
                    className="size-9 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-full inline-flex items-center justify-center transition-all duration-200"
                  >
                    <i className={`hgi hgi-stroke ${s.icon} text-lg`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
