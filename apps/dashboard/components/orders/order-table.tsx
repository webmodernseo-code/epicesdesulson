"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "@/icons";
import SearchInput from "../common/search-input";
import { toast } from "sonner";
import { Check, Truck } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  items: string;
  amount: string;
  paymentStatus: "Payé" | "En attente" | "Échoué";
  gateway: "Stripe CB" | "PayPal";
  shippingStatus: "En préparation" | "Expédiée" | "Livrée";
  date: string;
}

const initialOrders: Order[] = [
  {
    id: "#SUL-10842",
    customer: "Éléonore Dupont",
    items: "2x Épice Poulet (250g), 1x Épice Poisson (100g)",
    amount: "41,70 €",
    paymentStatus: "Payé",
    gateway: "Stripe CB",
    shippingStatus: "En préparation",
    date: "05 Sept, 2026",
  },
  {
    id: "#SUL-10841",
    customer: "Marc Vasseur",
    items: "1x Le Pack Intégral 4 Saveurs (4x100g)",
    amount: "49,90 €",
    paymentStatus: "Payé",
    gateway: "PayPal",
    shippingStatus: "Expédiée",
    date: "05 Sept, 2026",
  },
  {
    id: "#SUL-10840",
    customer: "Sophie Martin",
    items: "1x Saveur Gourmande (250g), 1x Épice Viande (250g)",
    amount: "33,80 €",
    paymentStatus: "Payé",
    gateway: "Stripe CB",
    shippingStatus: "Livrée",
    date: "04 Sept, 2026",
  },
  {
    id: "#SUL-10839",
    customer: "Julien Bernard",
    items: "1x Épice Poulet 1 Kg (Format Pro)",
    amount: "39,00 €",
    paymentStatus: "Payé",
    gateway: "PayPal",
    shippingStatus: "En préparation",
    date: "04 Sept, 2026",
  },
  {
    id: "#SUL-10838",
    customer: "Camille Leroy",
    items: "3x Épice Poisson (100g), 1x Vanille Bourbon Gourmet",
    amount: "46,50 €",
    paymentStatus: "Payé",
    gateway: "Stripe CB",
    shippingStatus: "Livrée",
    date: "03 Sept, 2026",
  },
  {
    id: "#SUL-10837",
    customer: "Alexandre Roux",
    items: "2x Épice Viande (250g)",
    amount: "29,80 €",
    paymentStatus: "Payé",
    gateway: "Stripe CB",
    shippingStatus: "Livrée",
    date: "02 Sept, 2026",
  },
  {
    id: "#SUL-10836",
    customer: "Fatou Ndiaye",
    items: "1x Le Pack Intégral (4x100g), 1x Épice Poulet (250g)",
    amount: "64,80 €",
    paymentStatus: "Payé",
    gateway: "Stripe CB",
    shippingStatus: "Expédiée",
    date: "01 Sept, 2026",
  },
  {
    id: "#SUL-10835",
    customer: "Guillaume Leroy",
    items: "2x Saveur Gourmande (250g)",
    amount: "33,80 €",
    paymentStatus: "Payé",
    gateway: "PayPal",
    shippingStatus: "Livrée",
    date: "31 Août, 2026",
  },
];

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const pageSize = 6;

  const handleStatusChange = (id: string, newStatus: Order["shippingStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, shippingStatus: newStatus } : o))
    );
    toast.success(`Commande ${id} passée en « ${newStatus} » !`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.shippingStatus === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredOrders.map((o) => o.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const isAllSelected =
    filteredOrders.length > 0 &&
    selectedRows.length === filteredOrders.length;

  const getShippingBadge = (status: Order["shippingStatus"]) => {
    switch (status) {
      case "En préparation":
        return <Badge variant="warning">En préparation</Badge>;
      case "Expédiée":
        return <Badge variant="default">Expédiée</Badge>;
      case "Livrée":
        return <Badge variant="success">Livrée</Badge>;
    }
  };

  return (
    <div className="pt-6">
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        {/* Search */}
        <div className="w-full lg:max-w-xs">
          <SearchInput
            placeholder="Rechercher une commande, client, épice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Shipping Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "Toutes" },
            { id: "En préparation", label: "À expédier" },
            { id: "Expédiée", label: "Expédiées" },
            { id: "Livrée", label: "Livrées" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilterStatus(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-emerald-800 text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-b border-gray-200">
              <TableHead className="w-[50px] pl-6">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-bold text-xs text-gray-700">N° Commande</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Client</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Épices commandées</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Montant</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Paiement</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Statut Expédition</TableHead>
              <TableHead className="font-bold text-xs text-gray-700">Date</TableHead>
              <TableHead className="pr-6 font-bold text-xs text-gray-700 text-right">Action Rapide</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="pl-6 whitespace-nowrap">
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={(checked) =>
                        toggleSelectRow(order.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-bold text-xs text-gray-900 whitespace-nowrap">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-gray-900 whitespace-nowrap">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 max-w-xs truncate">
                    {order.items}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-gray-900 whitespace-nowrap">
                    {order.amount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {order.gateway} ({order.paymentStatus})
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getShippingBadge(order.shippingStatus)}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                    {order.date}
                  </TableCell>
                  <TableCell className="pr-6 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      {order.shippingStatus === "En préparation" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, "Expédiée")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <Truck className="size-3.5 text-amber-700" />
                          <span>Marquer Expédiée</span>
                        </button>
                      )}
                      {order.shippingStatus === "Expédiée" && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(order.id, "Livrée")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          <Check className="size-3.5 text-emerald-700" />
                          <span>Marquer Livrée</span>
                        </button>
                      )}
                      {order.shippingStatus === "Livrée" && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <Check className="size-3.5" />
                          <span>Colis Livré</span>
                        </span>
                      )}
                      <Button
                        className="hover:text-emerald-700"
                        variant="icon"
                        href={`/orders/${order.id.replace("#", "")}`}
                        title="Voir détails"
                      >
                        <Eye className="size-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="pt-4 sm:pt-6 p-4 border-t border-gray-100 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
