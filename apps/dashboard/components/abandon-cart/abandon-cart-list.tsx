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
import { Eye } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import { ShoppingCart } from "lucide-react";

interface AbandonCartItem {
  id: string;
  customer: string;
  items: string;
  amount: string;
  date: string;
}

// Real data state (starts empty until real abandoned carts occur)
const abandonCartData: AbandonCartItem[] = [];

const paymentStatusOptions = [
  { label: "Tous les statuts", value: "" },
  { label: "Non finalisé", value: "unpaid" },
  { label: "Relancé", value: "reminded" },
];

const dateOptions = [
  { label: "Toutes les dates", value: "" },
  { label: "Plus récents", value: "newest" },
  { label: "Plus anciens", value: "oldest" },
];

export default function AbandonCartList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<Option | null>(null);
  const [dateSort, setDateSort] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredCarts = abandonCartData.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredCarts.map((item) => item.id));
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
    filteredCarts.length > 0 && selectedRows.length === filteredCarts.length;

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200/90 shadow-2xs overflow-hidden">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-7">
              Paniers Abandonnés
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Suivi et relances automatiques des sessions paniers non validées
            </p>
          </div>

          <Button variant="primary" className="text-xs font-bold px-4 py-2 rounded-xl">
            Exporter
          </Button>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
          {/* Search */}
          <div className="w-full lg:w-72">
            <SearchInput
              placeholder="Rechercher par client, réf..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto pb-2 md:pb-0">
            <div className="min-w-[150px]">
              <CustomSelect
                options={paymentStatusOptions}
                value={paymentStatus}
                onChange={setPaymentStatus}
                placeholder="Statut de Relance"
              />
            </div>
            <div className="min-w-[130px]">
              <CustomSelect
                options={dateOptions}
                value={dateSort}
                onChange={setDateSort}
                placeholder="Date"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
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
              <TableHead className="text-xs font-semibold text-gray-600">Réf. Session</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Client / Contact</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Articles</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Montant Estimé</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">Date Abandon</TableHead>
              <TableHead className="text-xs font-semibold text-gray-600 pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCarts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-3">
                    <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <ShoppingCart className="size-6" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Aucun panier abandonné
                    </h4>
                    <p className="text-xs text-gray-500">
                      Tous les paniers clients en cours ont été convertis avec succès. Le module de relance automatique reste actif.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCarts.slice((currentPage - 1) * 10, currentPage * 10).map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50"
                >
                  <TableCell className="pl-6 whitespace-nowrap">
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={(checked) =>
                        toggleSelectRow(item.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-500 whitespace-nowrap">
                    {item.id}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700 whitespace-nowrap font-medium">
                    {item.customer}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                    {item.items}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-primary whitespace-nowrap">
                    {item.amount}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="pr-6 text-right whitespace-nowrap">
                    <Button
                      href={`/abandon-cart/${item.id.replace("#", "")}`}
                      variant="icon"
                      className="group"
                      title="Voir détails"
                    >
                      <Eye className="size-4 group-hover:text-primary transition-colors" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredCarts.length > 0 && (
        <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-end">
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
