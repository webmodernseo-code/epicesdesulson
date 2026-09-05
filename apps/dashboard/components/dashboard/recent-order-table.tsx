"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
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
import { toast } from "sonner";
import { Check, Package, Truck } from "lucide-react";

interface OrderItem {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: string;
  total: string;
  gateway: "Stripe CB" | "PayPal";
  status: "En préparation" | "Expédiée" | "Livrée" | "Annulée";
}

const initialOrders: OrderItem[] = [
  {
    id: "#CMD-84920",
    customer: "Éléonore Dupont",
    email: "eleonore.d@gmail.com",
    date: "Aujourd'hui, 14:32",
    items: "2x Épice Poulet (250g), 1x Épice Poisson (100g)",
    total: "41,70 €",
    gateway: "Stripe CB",
    status: "En préparation",
  },
  {
    id: "#CMD-84919",
    customer: "Marc Vasseur",
    email: "marc.vasseur@outlook.fr",
    date: "Aujourd'hui, 11:15",
    items: "1x Le Pack Intégral 4 Saveurs (4x100g)",
    total: "49,90 €",
    gateway: "PayPal",
    status: "Expédiée",
  },
  {
    id: "#CMD-84918",
    customer: "Sophie Martin",
    email: "sophie.martin@wanadoo.fr",
    date: "Hier, 18:40",
    items: "1x Saveur Gourmande (250g), 1x Épice Viande (250g)",
    total: "33,80 €",
    gateway: "Stripe CB",
    status: "Livrée",
  },
  {
    id: "#CMD-84917",
    customer: "Julien Bernard",
    email: "j.bernard@cuisine-passion.com",
    date: "Hier, 16:05",
    items: "1x Épice Poulet 1 Kg (Format Atelier)",
    total: "39,00 €",
    gateway: "PayPal",
    status: "En préparation",
  },
  {
    id: "#CMD-84916",
    customer: "Camille Leroy",
    email: "camille.leroy@yahoo.fr",
    date: "01 Sept 2026",
    items: "3x Épice Poisson (100g), 1x Vanille Bourbon Gourmet",
    total: "46,50 €",
    gateway: "Stripe CB",
    status: "Livrée",
  },
  {
    id: "#CMD-84915",
    customer: "Alexandre Roux",
    email: "a.roux@gourmet.fr",
    date: "31 Août 2026",
    items: "2x Épice Viande (250g)",
    total: "29,80 €",
    gateway: "Stripe CB",
    status: "Livrée",
  },
];

const getStatusBadge = (status: OrderItem["status"]) => {
  switch (status) {
    case "En préparation":
      return <Badge variant="warning">En préparation</Badge>;
    case "Expédiée":
      return <Badge variant="default">Expédiée</Badge>;
    case "Livrée":
      return <Badge variant="success">Livrée</Badge>;
    case "Annulée":
      return <Badge variant="error">Annulée</Badge>;
  }
};

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const handleUpdateStatus = (id: string, newStatus: OrderItem["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
    toast.success(`Commande ${id} : statut mis à jour en « ${newStatus} » !`);
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl w-full bg-white shadow-2xs">
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg text-gray-900 font-bold">
            Dernières Commandes & Expéditions Manuelles
          </h3>
          <p className="text-xs text-gray-500">
            Validez l'expédition de vos colis en 1 clic dès que le colis est déposé.
          </p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors self-start sm:self-auto"
        >
          Voir toutes les commandes →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 hover:bg-transparent bg-gray-50/50">
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                N° Commande
              </TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                Client
              </TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                Date & Heure
              </TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                Épices commandées
              </TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                Règlement
              </TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold text-xs text-gray-700">
                Montant
              </TableHead>
              <TableHead className="py-3 font-bold text-xs text-gray-700">
                Statut
              </TableHead>
              <TableHead className="py-3 font-bold text-xs text-gray-700 text-right pr-6">
                Action Expédition
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((order) => (
                <TableRow
                  key={order.id}
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
                  <TableCell className="py-3.5">
                    {order.gateway === "PayPal" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                        PayPal
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                        Stripe CB
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5 text-xs font-bold text-gray-900">
                    {order.total}
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell className="py-3.5 text-right pr-6 whitespace-nowrap">
                    {order.status === "En préparation" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Expédiée")}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                        title="Marquer comme expédiée"
                      >
                        <Truck className="size-3.5 text-amber-700" />
                        <span>Marquer Expédiée</span>
                      </button>
                    )}
                    {order.status === "Expédiée" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "Livrée")}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title="Marquer comme livrée"
                      >
                        <Check className="size-3.5 text-emerald-700" />
                        <span>Marquer Livrée</span>
                      </button>
                    )}
                    {order.status === "Livrée" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <Check className="size-3.5" />
                        <span>Colis Livré</span>
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 flex justify-end border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
