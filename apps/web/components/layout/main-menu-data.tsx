import React from "react";

export type SubMenuItem = {
  label: string;
  href: string;
  subItems?: SubMenuItem[];
};

export type MegaMenuSection = {
  title: string;
  items: SubMenuItem[];
};

export type MenuItem = {
  label: string;
  href: string;
  isActive?: boolean;
  subItems?: SubMenuItem[];
  megaMenu?: MegaMenuSection[];
};

export const MAIN_MENU_DATA: MenuItem[] = [
  {
    label: "Accueil",
    href: "/",
    isActive: true,
  },
  {
    label: "Avis Clients",
    href: "/avis",
  },
  {
    label: "À propos",
    href: "/about",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
