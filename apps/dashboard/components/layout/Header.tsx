"use client";

import { useState } from "react";
import { Menu11Icon, MessageIcon, SearchIcon } from "../../icons";
import UserDropdown from "./dropdown/user-dropdown";
import NotificationDropdown from "./dropdown/notification-dropdown";
import Link from "next/link";
import SearchModal from "./search-modal";
import type { AdminIdentity } from "@/components/auth/admin-session-context";

interface HeaderProps {
  onMenuClick?: () => void;
  identity?: AdminIdentity | null;
}

export default function Header({ onMenuClick, identity }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b z-40 px-4 lg:px-6 xl:px-10 py-3.5 border-gray-200/90 flex items-center justify-between sticky top-0 shadow-2xs">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <button
            className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <Menu11Icon className="size-5.5" />
          </button>

          {/* Quick Store Link Badge */}
          <a
            href="https://epicesdesulson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100/70 transition-colors"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Boutique en ligne : epicesdesulson.com</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-500 text-xs font-medium transition-colors cursor-pointer"
          >
            <SearchIcon className="size-3.5 text-gray-500" />
            <span className="hidden md:inline">Rechercher une commande, épice...</span>
          </button>

          {/* Messages */}
          <Link
            href="/inbox"
            className="size-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors relative cursor-pointer"
            title="Messagerie client"
          >
            <MessageIcon className="size-4.5 text-gray-600" />
          </Link>

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Profile */}
          <UserDropdown identity={identity} />
        </div>
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
