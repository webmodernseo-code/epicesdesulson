"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Search,
  RefreshCw,
  Eye,
  Truck,
  PackageCheck,
  CheckCircle2,
  Clock,
  RotateCcw,
  Printer,
  ExternalLink,
  X,
  CreditCard,
  Send,
} from "lucide-react";
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
import { StripeLogo, PaypalLogo, ApplePayLogo } from "@/components/common/payment-icons";

type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

interface OrderItemSummary {
  productName: string;
  formatLabel: string;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostal: string;
  shippingCountry: string;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderItemSummary[];
}

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "En attente",
  PAID: "Payée",
  PROCESSING: "En préparation",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
  CANCELLED: "Annulée",
  REFUNDED: "Remboursée",
};

const nextStatusMap: Partial<Record<OrderStatus, OrderStatus>> = {
  PAID: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
};

const nextStatusActionLabel: Partial<Record<OrderStatus, string>> = {
  PAID: "Préparer",
  PROCESSING: "Expédier",
  SHIPPED: "Marquer Livrée",
};

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function PaymentBadge({ method }: { method: string }) {
  const m = (method || "").toLowerCase();
  if (m.includes("stripe") || m.includes("card") || m.includes("cb")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-900">
        <StripeLogo className="h-3 w-auto" />
        <span>CB / Stripe</span>
      </span>
    );
  }
  if (m.includes("paypal")) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-900">
        <PaypalLogo className="h-3 w-auto" />
      </span>
    );
  }
  if (m.includes("apple")) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black text-white text-[11px] font-bold">
        <ApplePayLogo className="h-3 w-auto" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-medium">
      <CreditCard className="size-3" />
      <span>{method || "Carte Bancaire"}</span>
    </span>
  );
}

export default function OrderTable() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Shipment Modal State
  const [shipmentModalOpen, setShipmentModalOpen] = useState(false);
  const [targetOrder, setTargetOrder] = useState<AdminOrder | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("Colissimo La Poste");
  const [isSubmittingShipment, setIsSubmittingShipment] = useState(false);

  const loadOrders = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/orders", { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error);
        return j;
      })
      .then((j) => {
        if (Array.isArray(j.data)) {
          setOrders(j.data);
        }
      })
      .catch((e) => {
        console.warn("Could not fetch orders:", e);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !query ||
        `${o.orderNumber} ${o.customerName} ${o.customerEmail} ${o.shippingCity}`
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchTab = activeTab === "ALL" || o.status === activeTab;
      return matchSearch && matchTab;
    });
  }, [orders, query, activeTab]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Status transition handler
  const handleAdvanceStatus = async (order: AdminOrder) => {
    const nextSt = nextStatusMap[order.status];
    if (!nextSt) return;

    if (nextSt === "SHIPPED") {
      setTargetOrder(order);
      setTrackingNumber(`FR-${Math.floor(10000000 + Math.random() * 90000000)}`);
      setCarrier("Colissimo La Poste");
      setShipmentModalOpen(true);
      return;
    }

    try {
      const r = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextSt }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);

      toast.success(`Commande ${order.orderNumber} passée en : ${statusLabels[nextSt]}`);
      loadOrders();
    } catch (err: any) {
      toast.error(err.message || "Impossible de mettre à jour le statut.");
    }
  };

  // Submit Shipment Modal
  const handleConfirmShipment = async () => {
    if (!targetOrder) return;
    setIsSubmittingShipment(true);
    try {
      const r = await fetch(`/api/admin/orders/${targetOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "SHIPPED",
          trackingNumber,
          carrier,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);

      toast.success(
        `Commande ${targetOrder.orderNumber} expédiée ! Email de suivi envoyé à ${targetOrder.customerEmail}`
      );
      setShipmentModalOpen(false);
      loadOrders();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'expédition.");
    } finally {
      setIsSubmittingShipment(false);
    }
  };

  // Refund Order Handler
  const handleRefund = async (order: AdminOrder) => {
    if (
      !window.confirm(
        `Êtes-vous sûr de vouloir rembourser intégralement la commande ${order.orderNumber} (${euros.format(
          order.totalAmount
        )}) ?`
      )
    )
      return;

    try {
      const r = await fetch(`/api/admin/orders/${order.id}/refund`, {
        method: "POST",
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);

      toast.success(j.message || "Remboursement effectué avec succès.");
      loadOrders();
    } catch (err: any) {
      toast.error(err.message || "Impossible de rembourser la commande.");
    }
  };

  // Print Picking Slip
  const handlePrintSlip = (order: AdminOrder) => {
    const printWin = window.open("", "_blank");
    if (!printWin) return;
    printWin.document.write(`
      <html>
        <head>
          <title>Bon de Préparation - ${order.orderNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #1e293b; }
            h1 { color: #047857; margin-bottom: 4px; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
            th { background: #f8fafc; }
            .total { font-weight: bold; font-size: 16px; text-align: right; margin-top: 16px; color: #047857; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Les Épices de Sulson</h1>
            <p><strong>Bon de Préparation & Expédition</strong> — Commande N° ${order.orderNumber}</p>
            <p><strong>Date :</strong> ${new Date(order.createdAt).toLocaleString("fr-FR")}</p>
            <p><strong>Client :</strong> ${order.customerName} (${order.customerEmail})</p>
            <p><strong>Adresse de livraison :</strong> ${order.shippingStreet}, ${order.shippingPostal} ${order.shippingCity} (${order.shippingCountry})</p>
          </div>
          <h3>Articles à préparer :</h3>
          <table>
            <thead>
              <tr>
                <th>Épice / Référence</th>
                <th>Format</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (it) => `
                <tr>
                  <td><strong>${it.productName}</strong></td>
                  <td>${it.formatLabel}</td>
                  <td><strong style="font-size:15px;">${it.quantity} sachet(s)</strong></td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p class="total">Total TTC Commande : ${euros.format(order.totalAmount)}</p>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Top Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col gap-4 bg-gray-50/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Gestion des Commandes
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Suivi des encaissements, préparation en atelier et expéditions Colissimo
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full sm:w-80">
              <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="N° commande, client, ville..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 shadow-2xs placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: "ALL", label: "Toutes les commandes" },
              { id: "PAID", label: "Payées (À préparer)" },
              { id: "PROCESSING", label: "En préparation" },
              { id: "SHIPPED", label: "Expédiées" },
              { id: "DELIVERED", label: "Livrées" },
              { id: "REFUNDED", label: "Remboursées" },
            ].map((tab) => {
              const count =
                tab.id === "ALL"
                  ? orders.length
                  : orders.filter((o) => o.status === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}

            <button
              onClick={loadOrders}
              title="Actualiser les commandes"
              className="ml-auto size-8 rounded-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600 shrink-0 cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-b border-gray-200">
                <TableHead className="text-xs font-semibold text-gray-600 pl-6">N° Commande</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Client & Destination</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Articles / Sachets</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Paiement</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Total TTC</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600 text-right pr-6">
                  Actions de Commande
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-sm text-gray-500">
                    Chargement des commandes en cours...
                  </TableCell>
                </TableRow>
              ) : paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-sm text-gray-500">
                    Aucune commande ne correspond aux critères sélectionnés.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => {
                  const nextSt = nextStatusMap[order.status];
                  const actionLabel = nextStatusActionLabel[order.status];

                  return (
                    <TableRow
                      key={order.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* N° Commande */}
                      <TableCell className="pl-6 whitespace-nowrap">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-gray-900 block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </TableCell>

                      {/* Client */}
                      <TableCell className="whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                          {order.customerName}
                        </span>
                        <span className="text-[11px] text-gray-500 block truncate max-w-[180px]">
                          {order.shippingCity} ({order.shippingPostal})
                        </span>
                      </TableCell>

                      {/* Articles */}
                      <TableCell>
                        <div className="text-xs text-gray-700 max-w-xs space-y-0.5">
                          {order.items.map((it, i) => (
                            <div key={i} className="line-clamp-1">
                              <span className="font-bold text-emerald-800">
                                {it.quantity}x
                              </span>{" "}
                              <span>{it.productName}</span>{" "}
                              <span className="text-gray-400">({it.formatLabel})</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>

                      {/* Mode Paiement */}
                      <TableCell className="whitespace-nowrap">
                        <PaymentBadge method={order.paymentMethod} />
                      </TableCell>

                      {/* Total */}
                      <TableCell className="whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-black text-gray-950 block">
                          {euros.format(order.totalAmount)}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Port: {order.shippingCost === 0 ? "Offert" : euros.format(order.shippingCost)}
                        </span>
                      </TableCell>

                      {/* Statut Badge */}
                      <TableCell className="whitespace-nowrap">
                        <Badge
                          variant={
                            order.status === "DELIVERED"
                              ? "success"
                              : order.status === "SHIPPED"
                              ? "primary"
                              : order.status === "PROCESSING"
                              ? "warning"
                              : order.status === "PAID"
                              ? "accent"
                              : order.status === "REFUNDED"
                              ? "error"
                              : "neutral"
                          }
                        >
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Next Status Advance Button */}
                          {nextSt && actionLabel && (
                            <button
                              type="button"
                              onClick={() => handleAdvanceStatus(order)}
                              className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                            >
                              {nextSt === "PROCESSING" && <Clock className="size-3" />}
                              {nextSt === "SHIPPED" && <Truck className="size-3" />}
                              {nextSt === "DELIVERED" && <CheckCircle2 className="size-3" />}
                              <span>{actionLabel}</span>
                            </button>
                          )}

                          {/* Print Slip Button */}
                          <button
                            type="button"
                            onClick={() => handlePrintSlip(order)}
                            title="Imprimer le bon de préparation"
                            className="size-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
                          >
                            <Printer className="size-3.5" />
                          </button>

                          {/* Detail Link */}
                          <Link
                            href={`/orders/${order.id}`}
                            title="Voir les détails complets"
                            className="size-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
                          >
                            <Eye className="size-3.5" />
                          </Link>

                          {/* Refund action */}
                          {order.paymentStatus === "PAID" && order.status !== "REFUNDED" && (
                            <button
                              type="button"
                              onClick={() => handleRefund(order)}
                              title="Rembourser la commande"
                              className="size-8 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <RotateCcw className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/30">
          <p className="text-xs text-gray-500">
            Affichage de {paginatedOrders.length} sur {filteredOrders.length} commandes
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ─── Modal d'Expédition & Numéro de Suivi Colissimo ─── */}
      {shipmentModalOpen && targetOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Truck className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    Expédition de la commande
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">
                    {targetOrder.orderNumber} • {targetOrder.customerName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShipmentModalOpen(false)}
                className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Destination Info */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-gray-600 space-y-1">
              <span className="font-bold text-gray-900 block">Adresse de livraison :</span>
              <p>
                {targetOrder.shippingStreet}, {targetOrder.shippingPostal} {targetOrder.shippingCity} ({targetOrder.shippingCountry})
              </p>
            </div>

            {/* Carrier & Tracking Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Transporteur
                </label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Colissimo La Poste">Colissimo Domicile (La Poste)</option>
                  <option value="Lettre Suivie La Poste">Lettre Suivie (La Poste)</option>
                  <option value="Mondial Relay">Mondial Relay</option>
                  <option value="Chronopost Express">Chronopost Express 24h</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Numéro de suivi du colis *
                </label>
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="ex: 6A12345678901"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold font-mono text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShipmentModalOpen(false)}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={isSubmittingShipment || !trackingNumber.trim()}
                onClick={handleConfirmShipment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send className="size-3.5" />
                <span>
                  {isSubmittingShipment
                    ? "Envoi en cours..."
                    : "Confirmer & Envoyer l'Email"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
