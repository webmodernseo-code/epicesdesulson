"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  Send,
  Mail,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

interface AbandonCartItem {
  id: string;
  customerName: string;
  customerEmail: string;
  itemsSummary: string;
  itemCount: number;
  amount: number;
  date: string;
  isReminded: boolean;
}

const INITIAL_ABANDONED_CARTS: AbandonCartItem[] = [
  {
    id: "PAN-8910",
    customerName: "Marie Laurent",
    customerEmail: "marie.laurent78@outlook.fr",
    itemsSummary: "Pack Intégral 4 Saveurs (1x), Épice Poisson 100g (1x)",
    itemCount: 2,
    amount: 31.80,
    date: "Il y a 3 heures",
    isReminded: false,
  },
  {
    id: "PAN-8908",
    customerName: "Thierry Bernard",
    customerEmail: "t.bernard.pro@gmail.com",
    itemsSummary: "Épice Spéciale Poulet 100g (2x), Saveur Gourmande 100g (2x)",
    itemCount: 4,
    amount: 27.60,
    date: "Hier à 18:45",
    isReminded: true,
  },
  {
    id: "PAN-8902",
    customerName: "Sophie Morel",
    customerEmail: "morel.sophie92@free.fr",
    itemsSummary: "Pack Intégral 4 Saveurs (2x)",
    itemCount: 2,
    amount: 49.80,
    date: "06 Sept. 2026",
    isReminded: true,
  },
];

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function AbandonCartList() {
  const [carts, setCarts] = useState<AbandonCartItem[]>(INITIAL_ABANDONED_CARTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredCarts = carts.filter((item) => {
    return (
      !searchTerm ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredCarts.length / pageSize));
  const paginatedCarts = filteredCarts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSendReminder = (item: AbandonCartItem) => {
    setCarts((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, isReminded: true } : c))
    );
    toast.success(
      `Email de relance avec code promo SULSON10 (-10%) envoyé à ${item.customerEmail} !`
    );
  };

  const handleExportCsv = () => {
    const headers = ["ID Panier", "Client", "Email", "Articles", "Total TTC", "Date", "Relance"];
    const rows = filteredCarts.map((c) => [
      `"${c.id}"`,
      `"${c.customerName}"`,
      `"${c.customerEmail}"`,
      `"${c.itemsSummary.replace(/"/g, '""')}"`,
      c.amount,
      `"${c.date}"`,
      c.isReminded ? "Relancé" : "Non relancé",
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `paniers_abandonnes_sulson_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export CSV des paniers abandonnés téléchargé !");
  };

  return (
    <div className="bg-white rounded-3xl w-full border border-gray-200 shadow-2xs overflow-hidden">
      {/* Top Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50/40">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <ShoppingCart className="size-5 text-emerald-600" />
            <span>Paniers Abandonnés & Relances</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Suivi des paniers interrompus et relance automatique par email (-10% fidélité)
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par client, email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-2xs"
            />
          </div>

          <Button
            onClick={handleExportCsv}
            variant="outline"
            size="xs"
            className="rounded-full text-xs font-bold border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5"
          >
            <Download className="size-3.5" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-b border-gray-200">
              <TableHead className="text-xs font-semibold text-gray-600 pl-6">Réf. Panier</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Client</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Articles / Sachets</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Montant Estimé</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Date d'abandon</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">État Relance</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600 text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCarts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-sm text-gray-500">
                  Aucun panier abandonné pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              paginatedCarts.map((cart) => (
                <TableRow
                  key={cart.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  <TableCell className="pl-6 font-mono text-xs font-bold text-gray-600 whitespace-nowrap">
                    {cart.id}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                      {cart.customerName}
                    </span>
                    <span className="text-[11px] text-gray-500">{cart.customerEmail}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs text-gray-700 font-medium line-clamp-1 max-w-xs">
                      {cart.itemsSummary}
                    </span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap font-black text-xs sm:text-sm text-gray-950">
                    {euros.format(cart.amount)}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-xs text-gray-500">
                    {cart.date}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {cart.isReminded ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="size-3" />
                        <span>Relancé</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="size-3" />
                        <span>À relancer</span>
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="pr-6 whitespace-nowrap text-right">
                    <button
                      type="button"
                      onClick={() => handleSendReminder(cart)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto ${
                        cart.isReminded
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                      }`}
                    >
                      <Send className="size-3" />
                      <span>{cart.isReminded ? "Renvoyer" : "Relancer (-10%)"}</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination */}
      <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/30">
        <p className="text-xs text-gray-500">
          Affichage de {paginatedCarts.length} sur {filteredCarts.length} paniers abandonnés
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
