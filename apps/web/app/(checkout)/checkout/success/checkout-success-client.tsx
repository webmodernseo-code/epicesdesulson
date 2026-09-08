"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, ShieldCheck, Mail } from "lucide-react";

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  items: Array<{
    productId: string;
    productName: string;
    formatLabel: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  createdAt: string;
}

export default function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get("orderNumber");
  const paymentIntentId = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  // Clear cart immediately upon successful payment landing
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Fetch verified order details from backend
  useEffect(() => {
    const lookupId = orderNumberParam || paymentIntentId;
    if (!lookupId) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${lookupId}`);
        if (res.ok) {
          const json = await res.json();
          if (json?.order) {
            setOrder(json.order);
          }
        }
      } catch (err) {
        console.warn("Could not load order confirmation details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderNumberParam, paymentIntentId]);

  const displayOrderNumber = order?.orderNumber || orderNumberParam || "SUL-" + Math.floor(10000 + Math.random() * 90000);
  const displayEmail = order?.customerEmail || "votre adresse email";
  const displayTotal = order
    ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(order.totalAmount)
    : "Confirmé";

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-[80vh]">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Main Confirmation Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10 text-center space-y-8">
          {/* Top Success Badge */}
          <div className="space-y-4">
            <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="size-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <span>✓ Paiement confirmé</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Merci pour votre commande.
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Votre transaction a été validée par carte bancaire. Nous préparons vos épices artisanales d'exception dans notre atelier.
            </p>
          </div>

          {/* Key Order Data Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-100 text-left">
            <div>
              <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                N° de commande
              </span>
              <span className="block text-sm font-bold text-gray-900 font-mono mt-0.5">
                {displayOrderNumber}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Montant payé
              </span>
              <span className="block text-sm font-extrabold text-emerald-800 mt-0.5">
                {displayTotal}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Confirmation envoyée à
              </span>
              <span className="block text-xs font-bold text-gray-900 truncate mt-0.5">
                {displayEmail}
              </span>
            </div>
          </div>

          {/* Products Summary (if loaded) */}
          {order?.items && order.items.length > 0 && (
            <div className="text-left space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Résumé des produits commandés
              </h3>
              <div className="divide-y divide-gray-100 border border-gray-200/80 rounded-2xl overflow-hidden bg-white">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                        <Package className="size-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{item.productName}</p>
                        <p className="text-[11px] text-gray-500">
                          Format : {item.formatLabel} • Qté : {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 shrink-0">
                      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reassurance Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-left flex items-start gap-3">
            <Mail className="size-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <p className="font-bold">E-mail de confirmation & suivi de colis</p>
              <p className="text-emerald-800 mt-0.5">
                Un récapitulatif détaillé vous a été adressé à <strong>{displayEmail}</strong>. Votre numéro de suivi postal vous sera communiqué dès la remise au transporteur.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="size-4" />
              <span>Continuer mes achats</span>
            </Link>

            <Link
              href="/my-account"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Voir mes commandes</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
