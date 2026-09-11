import Link from "next/link";
import Image from "next/image";
import { ChevronLeftCircle, CloseIcon } from "@/icons";

interface SidebarHeaderProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  onClose?: () => void;
  userRole?: "master" | "seller";
}

export function SidebarHeader({
  isCollapsed,
  toggleCollapse,
  onClose,
}: SidebarHeaderProps) {
  return (
    <div className="p-4 flex items-center relative gap-2 shrink-0 h-[76px] border-b border-white/10 bg-primary-darker">
      {/* Full Logo when expanded */}
      <Link
        href="/"
        className={`transition-opacity duration-300 flex items-center ${
          isCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"
        }`}
      >
        <Image
          src="/images/logo/logo.png"
          alt="Les Épices de Sulson"
          width={180}
          height={60}
          priority
          className="h-12 w-auto object-contain max-w-none"
        />
      </Link>

      {/* Logo Icon for Collapsed State */}
      <Link
        href="/"
        className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 flex justify-center items-center ${
          isCollapsed ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Image
          src="/images/logo/logo-white-icon.png"
          alt="Les Épices de Sulson"
          width={40}
          height={40}
          className="size-9 object-contain max-w-none"
        />
      </Link>

      {/* Toggle collapse button */}
      <button
        onClick={toggleCollapse}
        className={`hidden xl:inline-flex size-8 absolute -right-4 top-1/2 -translate-y-1/2 rounded-full justify-center items-center shadow-md z-50 transition-transform duration-300 bg-primary-darker text-white hover:bg-emerald-600 border border-white/20 cursor-pointer ${
          isCollapsed ? "rotate-180" : ""
        }`}
        aria-label="Réduire / Déplier le menu"
      >
        <ChevronLeftCircle className="size-4.5" />
      </button>

      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="xl:hidden absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
        aria-label="Fermer le menu"
      >
        <CloseIcon className="size-5" />
      </button>
    </div>
  );
}
