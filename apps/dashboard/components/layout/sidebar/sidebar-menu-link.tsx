import Link from "next/link";
import React from "react";
import { LockKeyhole } from "lucide-react";

interface SidebarMenuLinkProps {
  item: { label: string; href?: string; icon: React.ReactNode };
  pathname: string;
  isCollapsed?: boolean;
  userRole?: "master" | "seller";
  locked?: boolean;
}

export function SidebarMenuLink({
  item,
  pathname,
  isCollapsed,
  userRole,
  locked,
}: SidebarMenuLinkProps) {
  const isActive =
    (item.href !== "/" && pathname.startsWith(item.href || "")) ||
    pathname === item.href;

  return (
    <Link
      href={item.href || "#"}
      className={`flex items-center rounded-md transition-colors py-2 group ${
        isActive
          ? "bg-white text-[#075f5c] shadow-sm"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      } ${isCollapsed ? "justify-center px-0" : "justify-between px-3"}`}
    >
      <div
        className={`flex items-center gap-3 ${isCollapsed ? "" : "min-w-0"}`}
      >
        <span
          className={isActive ? "text-[#088178]" : "text-emerald-50/80 group-hover:text-white"}
        >
          {item.icon}
        </span>
        {!isCollapsed && (
          <span className="font-medium text-sm whitespace-nowrap truncate">
            {item.label}
          </span>
        )}
      </div>
      {!isCollapsed && locked && <LockKeyhole className="size-3.5 shrink-0 text-emerald-200/80" aria-label="Réservé au super administrateur" />}
    </Link>
  );
}
