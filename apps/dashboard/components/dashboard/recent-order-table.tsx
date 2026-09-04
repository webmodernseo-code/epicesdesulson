"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pagination } from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

const recentOrders = [
  {
    id: "#CMD-84920",
    customer: "Éléonore Dupont",
    email: "eleonore.d@gmail.com",
    date: "Aujourd'hui, 14:32",
    items: "3 articles (Poivre Kampot, Vanille Bourbon)",
    total: "58,50 €",
    status: "En préparation",
    badgeVariant: "warning" as const,
  },
  {
    id: "#CMD-84919",
    customer: "Marc Vasseur",
    email: "marc.vasseur@outlook.fr",
    date: "Aujourd'hui, 11:15",
    items: "1 article (Coffret Grand Cru 5 Trésors)",
    total: "64,00 €",
    status: "Expédiée",
    badgeVariant: "default" as const,
  },
  {
    id: "#CMD-84918",
    customer: "Sophie Martin",
    email: "sophie.martin@wanadoo.fr",
    date: "Hier, 18:40",
    items: "4 articles (Curry Madras, Fleur de Sel, Safran)",
    total: "49,80 €",
    status: "Livrée",
    badgeVariant: "success" as const,
  },
  {
    id: "#CMD-84917",
    customer: "Julien Bernard",
    email: "j.bernard@cuisine-passion.com",
    date: "Hier, 16:05",
    items: "2 articles (Poivre Voatsiperifery 250g)",
    total: "36,00 €",
    status: "Livrée",
    badgeVariant: "success" as const,
  },
  {
    id: "#CMD-84916",
    customer: "Camille Leroy",
    email: "camille.leroy@yahoo.fr",
    date: "01 Sept 2026",
    items: "5 articles (Mélange Barbecue, Baies Roses)",
    total: "72,30 €",
    status: "Livrée",
    badgeVariant: "success" as const,
  },
  {
    id: "#CMD-84915",
    customer: "Alexandre Roux",
    email: "a.roux@gourmet.fr",
    date: "31 Août 2026",
    items: "2 articles (Cannelle Ceylan, Gingembre)",
    total: "28,90 €",
    status: "Livrée",
    badgeVariant: "success" as const,
  },
];

export default function RecentOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  return (
    <div className="border border-gray-200 rounded-2xl w-full bg-white shadow-xs">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg text-gray-900 font-bold">
            Dernières Commandes
          </h3>
          <p className="text-xs text-gray-500">
            Flux des commandes passées sur la boutique en ligne
          </p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Voir toutes les commandes →
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent bg-gray-50/50">
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              N° Commande
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              Client
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              Date & Heure
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              Contenu du panier
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              Montant Total
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600">
              Statut
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600 text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((order, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-3.5 text-xs font-bold text-gray-900">
                  {order.id}
                </TableCell>
                <TableCell className="py-3.5">
                  <p className="text-xs font-semibold text-gray-900">
                    {order.customer}
                  </p>
                  <p className="text-[11px] text-gray-400">{order.email}</p>
                </TableCell>
                <TableCell className="py-3.5 text-xs text-gray-600">
                  {order.date}
                </TableCell>
                <TableCell className="py-3.5 text-xs text-gray-600 max-w-xs truncate">
                  {order.items}
                </TableCell>
                <TableCell className="py-3.5 text-xs font-bold text-gray-900">
                  {order.total}
                </TableCell>
                <TableCell className="py-3.5">
                  <Badge variant={order.badgeVariant}>{order.status}</Badge>
                </TableCell>
                <TableCell className="py-3.5 text-right pr-6">
                  <Link
                    href={`/orders`}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 hover:bg-primary hover:text-white transition-colors text-gray-700"
                  >
                    Détails
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="p-4 flex justify-end border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(recentOrders.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
