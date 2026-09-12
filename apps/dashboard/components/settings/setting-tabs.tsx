"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LockKeyhole } from "lucide-react";
import { useAdminSession } from "@/components/auth/admin-session-context";

const tabs = [
  { name: "Général & Boutique", href: "/settings/general" },
  { name: "Passerelles API & Paiements", href: "/settings/payment-api", protected: true },
  { name: "Serveur SMTP & E-mails", href: "/settings/smtp", protected: true },
  { name: "SEO & Référencement", href: "/settings/seo" },
  { name: "Maintenance", href: "/settings/maintenance", protected: true },
];

export default function SettingTabs() {
  const pathname = usePathname();
  const identity = useAdminSession();

  return (
    <div className="border-b border-gray-200 px-4 sm:px-6 overflow-x-auto scrollbar-hide bg-white rounded-t-2xl">
      <nav
        className="-mb-px flex space-x-6 sm:space-x-8 min-w-max"
        aria-label="Onglets de configuration"
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const isLocked = identity?.role === "ADMIN" && tab.protected;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors",
                isActive
                  ? "border-primary text-gray-950"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.name}
              {isLocked && <LockKeyhole className="size-3.5 text-slate-400" aria-label="Accès protégé" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
