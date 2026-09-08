"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, Mail, FileText } from "lucide-react";

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

  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [, setLoading] = useState(true);

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

  const displayOrderNumber =
    order?.orderNumber || orderNumberParam || "SUL-" + Math.floor(10000 + Math.random() * 90000);
  const displayEmail = order?.customerEmail || "votre adresse email";
  const displayTotal = order
    ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(order.totalAmount)
    : "Confirmé";

  return (
    <div className="py-12 sm:py-20 bg-gray-50/70 min-h-[85vh] flex items-center justify-center">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Confirmation Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-6 sm:p-12 md:p-14 text-center space-y-10">
          {/* Top Success Badge & Heading */}
          <div className="space-y-4">
            <div className="size-20 sm:size-24 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="size-12 sm:size-14" />
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-5 py-2 rounded-full text-sm sm:text-base font-bold shadow-2xs">
              <span className="size-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Paiement validé avec succès</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              Merci pour votre commande !
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Votre transaction a été validée. Nous préparons vos épices artisanales d&apos;exception dans notre atelier avec le plus grand soin.
            </p>
          </div>

          {/* Key Order Data Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-6 sm:p-7 rounded-2xl bg-gray-50/90 border border-gray-200 text-left shadow-2xs">
            <div>
              <span className="block text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                N° de commande
              </span>
              <span className="block text-lg sm:text-2xl font-black text-gray-950 font-mono mt-1">
                {displayOrderNumber}
              </span>
              <a
                href={`/api/orders/${displayOrderNumber}/invoice`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 underline mt-1.5"
              >
                <FileText className="size-3.5" />
                <span>Facture PDF acquittée</span>
              </a>
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                Montant payé
              </span>
              <span className="block text-lg sm:text-2xl font-black text-emerald-700 mt-1">
                {displayTotal}
              </span>
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                Confirmation envoyée à
              </span>
              <span className="block text-base sm:text-lg font-bold text-gray-900 truncate mt-1" title={displayEmail}>
                {displayEmail}
              </span>
            </div>
          </div>

          {/* Products Summary */}
          {order?.items && order.items.length > 0 && (
            <div className="text-left space-y-4 pt-2">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wider">
                Résumé des produits commandés
              </h2>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="size-12 sm:size-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                        <Package className="size-6 sm:size-7 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg md:text-xl font-bold text-gray-950 leading-snug">
                          {item.productName}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 font-medium">
                          Format : <span className="font-bold text-gray-800">{item.formatLabel}</span> • Quantité : <span className="font-bold text-gray-800">{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-lg sm:text-2xl font-black text-gray-950 shrink-0">
                      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reassurance Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left flex items-start gap-4 sm:gap-5 shadow-2xs">
            <Mail className="size-7 sm:size-8 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-emerald-950 leading-relaxed">
              <p className="font-bold text-base sm:text-lg text-emerald-950">E-mail de confirmation &amp; suivi de colis</p>
              <p className="text-emerald-900 mt-1 text-sm sm:text-base">
                Un récapitulatif détaillé vous a été adressé à <strong>{displayEmail}</strong>. Votre numéro de suivi postal (Colissimo / Lettre Suivie) vous sera communiqué dès la remise au transporteur.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 flex-wrap">
            <a
              href={`/api/orders/${displayOrderNumber}/invoice`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gray-950 hover:bg-black text-white text-base sm:text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer hover:shadow-md"
            >
              <FileText className="size-5 text-emerald-400" />
              <span>Télécharger ma Facture (PDF)</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-bold shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer hover:shadow-md"
            >
              <ShoppingBag className="size-5" />
              <span>Continuer mes achats</span>
            </Link>

            <Link
              href="/my-account"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-base sm:text-lg font-bold transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Voir mes commandes</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
