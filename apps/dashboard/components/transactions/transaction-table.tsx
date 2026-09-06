"use client";

import { useEffect, useState, useMemo } from "react";
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
import SearchInput from "../common/search-input";
import { StripeLogo, PaypalLogo, ApplePayLogo } from "@/components/common/payment-icons";
import Link from "next/link";
import { CreditCard, ExternalLink } from "lucide-react";

interface OrderTransaction {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  shippingCost: number;
  subtotal: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function PaymentMethodBadge({ method }: { method: string }) {
  const m = method.toLowerCase();
  if (m.includes("stripe") || m.includes("card") || m.includes("cb")) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100">
        <StripeLogo className="h-3.5 w-auto" />
        <span className="text-xs font-bold text-indigo-900">Carte Bancaire</span>
      </div>
    );
  }
  if (m.includes("paypal")) {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100">
        <PaypalLogo className="h-3.5 w-auto" />
      </div>
    );
  }
  if (m.includes("apple")) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black text-white">
        <ApplePayLogo className="h-3.5 w-auto" />
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
      <CreditCard className="size-3.5 text-gray-500" />
      <span>{method || "Carte Bancaire"}</span>
    </div>
  );
}

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<OrderTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function loadTransactions() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/orders", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setTransactions(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load transactions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return transactions;
    const q = query.toLowerCase();
    return transactions.filter(
      (t) =>
        t.orderNumber?.toLowerCase().includes(q) ||
        t.customerName?.toLowerCase().includes(q) ||
        t.customerEmail?.toLowerCase().includes(q) ||
        t.paymentMethod?.toLowerCase().includes(q),
    );
  }, [transactions, query]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Header & Search */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Historique des Encaissements & Transactions
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Flux directs versés à 100% sur vos comptes Stripe et PayPal professionnels.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <SearchInput
            placeholder="Rechercher par n° de commande, client..."
            onSearch={setQuery}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/70 border-b border-gray-100 text-xs text-gray-600">
              <TableHead className="pl-6 py-3.5 font-bold">N° Commande</TableHead>
              <TableHead className="py-3.5 font-bold">Client</TableHead>
              <TableHead className="py-3.5 font-bold">Montant Brut</TableHead>
              <TableHead className="py-3.5 font-bold">Frais de Port</TableHead>
              <TableHead className="py-3.5 font-bold">Passerelle API</TableHead>
              <TableHead className="py-3.5 font-bold">Statut Paiement</TableHead>
              <TableHead className="pr-6 py-3.5 font-bold text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-xs text-gray-500">
                  Chargement des transactions réelles...
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center">
                  <div className="max-w-sm mx-auto space-y-2">
                    <p className="text-sm font-bold text-gray-800">
                      Aucune transaction pour le moment
                    </p>
                    <p className="text-xs text-gray-500">
                      Dès qu'un client passera commande sur la boutique en ligne, le paiement validé via Stripe ou PayPal s'affichera instantanément ici.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  <TableCell className="pl-6 py-3.5 whitespace-nowrap">
                    <Link
                      href={`/orders/${tx.id}`}
                      className="font-bold text-xs text-emerald-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{tx.orderNumber}</span>
                      <ExternalLink className="size-3 text-emerald-600" />
                    </Link>
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <div className="font-semibold text-xs text-gray-900">
                      {tx.customerName || "Client invité"}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {tx.customerEmail}
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 font-bold text-xs text-gray-900 whitespace-nowrap">
                    {euros.format(tx.totalAmount || 0)}
                  </TableCell>
                  <TableCell className="py-3.5 text-xs text-gray-500 whitespace-nowrap">
                    {tx.shippingCost ? euros.format(tx.shippingCost) : "Offert"}
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <PaymentMethodBadge method={tx.paymentMethod} />
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <Badge
                      variant={
                        tx.paymentStatus === "PAID"
                          ? "success"
                          : tx.paymentStatus === "PENDING"
                            ? "warning"
                            : "error"
                      }
                    >
                      {tx.paymentStatus === "PAID"
                        ? "Payé (Encaissé)"
                        : tx.paymentStatus === "PENDING"
                          ? "En attente"
                          : tx.paymentStatus === "REFUNDED"
                            ? "Remboursé"
                            : "Échoué"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 py-3.5 text-xs text-gray-500 whitespace-nowrap text-right font-medium">
                    {tx.createdAt
                      ? new Date(tx.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
