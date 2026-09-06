"use client";

import { useEffect, useState, useMemo } from "react";
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
import { Check, Package, Truck, ExternalLink } from "lucide-react";
import { StripeLogo, PaypalLogo, ApplePayLogo } from "@/components/common/payment-icons";

type Status = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  status: Status;
  createdAt: string;
  items: { productName: string; formatLabel: string; quantity: number }[];
}

const labels: Record<Status, string> = {
  PENDING: "En attente",
  PAID: "Payée (À préparer)",
  PROCESSING: "En préparation atelier",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
  CANCELLED: "Annulée",
  REFUNDED: "Remboursée",
};

const nextStatus: Partial<Record<Status, Status>> = {
  PAID: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
};

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function PaymentBadge({ method }: { method: string }) {
  const m = method?.toLowerCase() || "";
  if (m.includes("stripe") || m.includes("card") || m.includes("cb")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-900">
        <StripeLogo className="h-3 w-auto" />
        <span>CB</span>
      </span>
    );
  }
  if (m.includes("paypal")) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-900">
        <PaypalLogo className="h-3 w-auto" />
      </span>
    );
  }
  if (m.includes("apple")) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black text-white text-[10px]">
        <ApplePayLogo className="h-3 w-auto" />
      </span>
    );
  }
  return <span className="text-xs text-gray-600 font-medium">{method || "CB"}</span>;
}

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      }
    } catch (err) {
      console.warn("Could not load recent orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAdvanceStatus = async (order: Order) => {
    const next = nextStatus[order.status];
    if (!next) return;

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur lors de la mise à jour");
      toast.success(`Commande ${order.orderNumber} passée en « ${labels[next]} »`);
      loadOrders();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inattendue";
      toast.error(msg);
    }
  };

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, currentPage]);

  const totalPages = Math.ceil(orders.length / pageSize) || 1;

  return (
    <div className="border border-gray-200/90 rounded-2xl w-full bg-white shadow-2xs overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg text-gray-900 font-bold">
            Dernières Commandes & Expéditions Réelles
          </h3>
          <p className="text-xs text-gray-500">
            Paiements encaissés et suivi en direct du traitement en atelier.
          </p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors self-start sm:self-auto inline-flex items-center gap-1"
        >
          <span>Voir toutes les commandes</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 hover:bg-transparent bg-gray-50/50">
              <TableHead className="py-3 pl-6 whitespace-nowrap font-bold text-xs text-gray-700">
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
                Action Logistique
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-xs text-gray-500">
                  Chargement des commandes réelles depuis la base de données...
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center">
                  <div className="max-w-sm mx-auto space-y-2">
                    <Package className="size-8 text-gray-400 mx-auto stroke-1" />
                    <p className="text-sm font-bold text-gray-800">
                      Aucune commande enregistrée pour le moment
                    </p>
                    <p className="text-xs text-gray-500">
                      Les commandes passées par vos clients sur la boutique en ligne apparaîtront ici automatiquement avec leur statut d'encaissement Stripe ou PayPal.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="py-3.5 pl-6 text-xs font-bold text-gray-900 whitespace-nowrap">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-emerald-800 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <p className="text-xs font-semibold text-gray-900">
                      {order.customerName || "Client invité"}
                    </p>
                    <p className="text-[11px] text-gray-400">{order.customerEmail}</p>
                  </TableCell>
                  <TableCell className="py-3.5 text-xs text-gray-600 whitespace-nowrap">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="py-3.5 text-xs text-gray-600 max-w-xs truncate">
                    {order.items?.map((i) => `${i.quantity}× ${i.productName}`).join(", ") || "-"}
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <PaymentBadge method={order.paymentMethod} />
                  </TableCell>
                  <TableCell className="py-3.5 text-xs font-bold text-gray-900 whitespace-nowrap">
                    {euros.format(order.totalAmount || 0)}
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <Badge
                      variant={
                        order.status === "DELIVERED"
                          ? "success"
                          : order.status === "SHIPPED"
                            ? "default"
                            : order.status === "PROCESSING" || order.status === "PAID"
                              ? "warning"
                              : "error"
                      }
                    >
                      {labels[order.status] || order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3.5 text-right pr-6 whitespace-nowrap">
                    {order.status === "PAID" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Package className="size-3.5 text-amber-700" />
                        <span>Mettre en préparation</span>
                      </button>
                    )}
                    {order.status === "PROCESSING" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100 transition-colors cursor-pointer"
                      >
                        <Truck className="size-3.5 text-sky-700" />
                        <span>Marquer Expédiée</span>
                      </button>
                    )}
                    {order.status === "SHIPPED" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <Check className="size-3.5 text-emerald-700" />
                        <span>Marquer Livrée</span>
                      </button>
                    )}
                    {order.status === "DELIVERED" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <Check className="size-3.5" />
                        <span>Colis Livré</span>
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 flex justify-end border-t border-gray-100">
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
