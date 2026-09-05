"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { BellAltIcon, BellIcon } from "@/icons";

const notifications = [
  {
    id: 1,
    title: "Nouvelle commande reçue",
    time: "Il y a 4 min",
    description: "Commande #CMD-84920 (3 articles - 58,50 €) prête pour préparation atelier.",
  },
  {
    id: 2,
    title: "Paiement direct validé (PayPal)",
    time: "Il y a 28 min",
    description: "Paiement de 64,00 € versé sur votre compte PayPal Business.",
  },
  {
    id: 3,
    title: "Alerte Stock Faible",
    time: "Il y a 2h",
    description: "Vanille Bourbon Gourmet : seuil d'alerte atteint (8 tubes restants).",
  },
  {
    id: 4,
    title: "Nouvel avis client ★★★★★",
    time: "Hier",
    description: "Claire D. : « L'épice de Sulson spéciale poulet est exceptionnelle ! »",
  },
];

export default function NotificationDropdown() {
  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="relative size-9 rounded-full hover:bg-gray-100 flex items-center justify-center  transition-colors focus:outline-none">
          <BellIcon className="w-5 h-5 text-text-primary-text" />
          <span className="absolute top-[2px] right-0 h-4.5 w-4.5 flex items-center justify-center rounded-full bg-error text-xs font-bold text-white ">
            8
          </span>
        </MenuButton>

        <MenuItems
          transition
          className="absolute -right-[70px] sm:right-0 mt-2 w-[290px] origin-top-right rounded-lg bg-white ring-1 ring-gray-500/20 focus:outline-none z-50 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-500/20">
            <h3 className="font-semibold text-light-primary-text">
              Notification
            </h3>
            <button className="text-xs text-light-secondary-text hover:text-light-primary-text transition-colors">
              Clear All
            </button>
          </div>

          {/* List */}
          <div className="max-h-[400px] p-3 space-y-2 overflow-y-auto custom-scrollbar">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer"
              >
                <div className="shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-light-primary-text ">
                    <BellAltIcon className="size-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 md:mt-1">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <p className="text-sm font-semibold text-light-primary-text truncate">
                      {notification.title}
                    </p>
                    <span className="text-xs text-light-disabled-text whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-light-secondary-text line-clamp-2 leading-relaxed">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
