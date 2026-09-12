import {
  DashboardGridIcon,
  DeliveryBoxIcon,
  ShoppingCartIcon,
  TransactionIcon,
  SettingsIcon,
  CartRemoveIcon,
  UserSettings,
  CreditCardPosIcon,
  Mail01Icon,
  DiscountTagIcon,
} from "../../icons";

export type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  category?: string;
  items?: NavItem[];
  subItems?: { label: string; href: string }[];
  superAdminOnly?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: "Vue d'ensemble",
    href: "/",
    icon: <DashboardGridIcon className="size-5.5" />,
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
        label: "Transactions & Paiements",
        href: "/transactions",
        icon: <TransactionIcon className="size-5.5" />,
      },
      {
        label: "Paniers abandonnés",
        href: "/abandon-cart",
        icon: <CartRemoveIcon className="size-5.5" />,
      },
      {
        label: "Codes Promo & Réductions",
        href: "/coupons",
        icon: <DiscountTagIcon className="size-5.5" />,
      },
    ],
  },
  {
    label: "Category",
    category: "CATALOGUE & ÉPICES",
    items: [
      {
        label: "Catalogue Épices",
        href: "/products",
        icon: <DeliveryBoxIcon className="size-5.5" />,
        subItems: [
          { label: "Toutes les épices", href: "/products" },
          { label: "Ajouter une épice", href: "/products/add" },
          { label: "Niveaux de stocks", href: "/products/stocks" },
          { label: "Avis clients", href: "/products/review" },
        ],
      },
    ],
  },
  {
    label: "Category",
    category: "PARAMÈTRES & CONFIGURATION",
    items: [
      {
        label: "Paramètres Boutique",
        href: "/settings/general",
        icon: <SettingsIcon className="size-5.5" />,
      },
      {
        label: "Passerelles API (Stripe & PayPal)",
        href: "/settings/payment-api",
        icon: <CreditCardPosIcon className="size-5.5" />,
        superAdminOnly: true,
      },
      {
        label: "Serveur SMTP & E-mails",
        href: "/settings/smtp",
        icon: <Mail01Icon className="size-5.5" />,
        superAdminOnly: true,
      },
      {
        label: "Administrateurs",
        href: "/admin-users",
        icon: <UserSettings className="size-5.5" />,
        superAdminOnly: true,
      },
    ],
  },
];
