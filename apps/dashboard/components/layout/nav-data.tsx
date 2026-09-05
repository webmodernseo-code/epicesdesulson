import React from "react";
import {
  DashboardGridIcon,
  DeliveryBoxIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  TransactionIcon,
  CuponPercentIcon,
  FlashIcon,
  StructureIcon,
  SettingsIcon,
  StoreIcon,
  CartRemoveIcon,
  UserSettings,
  StoreAddIcon,
  MoneyCheckIcon,
} from "../../icons";

export type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  category?: string;
  items?: NavItem[];
  subItems?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  {
    label: "Tableau de bord",
    href: "/",
    icon: <DashboardGridIcon className="size-5.5" />,
  },
  {
    label: "Category",
    category: "CATALOGUE & ÉPICES",
    items: [
      {
        label: "Produits",
        href: "/products",
        icon: <DeliveryBoxIcon className="size-5.5" />,
        subItems: [
          { label: "Toutes les épices", href: "/products" },
          { label: "Brouillons", href: "/products/drafts" },
          { label: "Gestion des stocks", href: "/products/stocks" },
          { label: "Avis clients", href: "/products/review" },
        ],
      },
      {
        label: "Catégories",
        href: "/categories",
        icon: <StructureIcon className="size-5.5" />,
        subItems: [
          { label: "Liste des catégories", href: "/categories" },
          { label: "Attributs & Origines", href: "/categories/attributes" },
          { label: "Tags", href: "/categories/tags" },
        ],
      },
      {
        label: "Inventaire & Lots",
        href: "/inventory",
        icon: <StoreIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "COMMANDES & EXPÉDITIONS",
    items: [
      {
        label: "Commandes",
        href: "/orders",
        icon: <ShoppingCartIcon className="size-5.5" />,
        subItems: [
          { label: "Toutes les commandes", href: "/orders" },
          {
            label: "Retours & Remboursements",
            href: "/orders/return-and-refund",
          },
        ],
      },
      {
        label: "Paniers abandonnés",
        href: "/abandon-cart",
        icon: <CartRemoveIcon className="size-5.5" />,
      },
      {
        label: "Transactions",
        href: "/transactions",
        icon: <TransactionIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "CLIENTS & ÉQUIPE",
    items: [
      {
        label: "Clients & Newsletter",
        href: "/customers",
        icon: <UserGroupIcon className="size-5.5" />,
      },
      {
        label: "Administrateurs",
        href: "/admin-users",
        icon: <UserSettings className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "PROMOTIONS & OFFRES",
    items: [
      {
        label: "Codes Promo",
        href: "/coupon",
        icon: <CuponPercentIcon className="size-5.5" />,
      },
      {
        label: "Ventes Flash & Offres",
        href: "/flash-sales",
        icon: <FlashIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "PARAMÈTRES & INTÉGRATIONS",
    items: [
      {
        label: "Support WhatsApp & Chatbot",
        href: "/settings/chatbot",
        icon: <span className="text-base">💬</span>,
      },
      {
        label: "Paramètres Généraux",
        href: "/settings/general",
        icon: <SettingsIcon className="size-5.5" />,
      },
      {
        label: "Paramètres Boutique",
        href: "/settings/shop",
        icon: <StoreAddIcon className="size-5.5" />,
      },
      {
        label: "Méthodes de Paiement",
        href: "/payment-method",
        icon: <MoneyCheckIcon className="size-5.5" />,
      },
      {
        label: "Passerelles API & Clés Stripe",
        href: "/settings/payment-api",
        icon: <span className="text-base">💳</span>,
      },
      {
        label: "Configuration Firebase",
        href: "/firebase",
        icon: <FlashIcon className="size-5.5 text-amber-500" />,
      },
    ],
  },
];
