"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "../common/search-input";
import { ShoppingCart } from "lucide-react";

interface AbandonOrder {
  id: string;
  date: string;
  placedBy: string;
  amount: string;
}

const abandonedCartData: AbandonOrder[] = [];

const statusOptions = [
  { label: "Tous les statuts", value: "" },
  { label: "Actif", value: "active" },
  { label: "Récupéré", value: "recovered" },
  { label: "Expiré", value: "expired" },
];

const dateOptions = [
  { label: "Toutes les dates", value: "" },
  { label: "Aujourd'hui", value: "today" },
  { label: "Cette semaine", value: "week" },
  { label: "Ce mois-ci", value: "month" },
];

export default function AbandonOrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Option | null>(null);
  const [date, setDate] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredCarts = abandonedCartData.filter((cart) => {
    const matchesSearch =
      !searchTerm ||
      cart.placedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredCarts.map((c) => c.id));
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
    filteredCarts.length > 0 &&
    selectedRows.length === filteredCarts.length;

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex justify-between items-center gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Commandes & Paniers Non Finalisés
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Historique des tunnels de commande abandonnés avant paiement
            </p>
          </div>
          <Button variant="primary" className="text-xs font-bold px-4 py-2 rounded-xl">
            Exporter
          </Button>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          {/* Search */}
          <div className="w-full sm:w-72">
            <SearchInput
              placeholder="Rechercher par email, réf..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[130px]">
              <CustomSelect
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Statut"
              />
            </div>
            <div className="min-w-[130px]">
              <CustomSelect
                options={dateOptions}
                value={date}
                onChange={setDate}
                placeholder="Période"
              />
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-y border-gray-200">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
                disabled={filteredCarts.length === 0}
              />
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Réf.</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Date Session</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Client / Email</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 pr-6 text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCarts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-16 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-3">
                  <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <ShoppingCart className="size-6" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Aucune commande abandonnée
                  </h4>
                  <p className="text-xs text-gray-500">
                    Les sessions paniers de la boutique sont surveillées en temps réel.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredCarts.slice((currentPage - 1) * 10, currentPage * 10).map((cart) => (
              <TableRow
                key={cart.id}
                className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(cart.id)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(cart.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-500 whitespace-nowrap">
                  {cart.id}
                </TableCell>
                <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                  {cart.date}
                </TableCell>
                <TableCell className="text-xs text-gray-700 font-medium">
                  {cart.placedBy}
                </TableCell>
                <TableCell className="text-xs font-bold text-primary pr-6 text-right whitespace-nowrap">
                  {cart.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {filteredCarts.length > 0 && (
        <div className="py-4 sm:py-6 border-t border-gray-100 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCarts.length / 10)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
