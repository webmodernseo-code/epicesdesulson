"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartSummary() {
  const { subtotal, totalCount } = useCart();
  const shippingThreshold = 50.0;
  const isFreeShipping = subtotal >= shippingThreshold;
  const remainingForFree = Math.max(0, shippingThreshold - subtotal);

  return (
    <div className="border border-gray-200 rounded-3xl p-6 bg-white shadow-xs flex flex-col gap-y-6">
      {/* Free Shipping Progress */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-x-3">
        <span className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
          <i className="hgi hgi-stroke hgi-truck text-xl" />
        </span>
        <div className="text-sm font-semibold text-gray-800">
          {isFreeShipping ? (
            <span className="text-emerald-800 font-bold">
              🎉 Félicitations ! La livraison est offerte pour votre commande.
            </span>
          ) : (
            <span>
              Plus que <strong className="text-primary font-bold">{remainingForFree.toFixed(2)} €</strong> pour bénéficier de la <strong className="text-emerald-800">Livraison Gratuite</strong> !
            </span>
          )}
        </div>
      </div>

      {/* Summary Box */}
      <div className="border border-gray-200 p-5 rounded-2xl bg-gray-50 flex flex-col gap-y-4">
        <h4 className="font-extrabold text-gray-900 text-lg sm:text-xl border-b border-gray-200 pb-3">
          Récapitulatif de la commande
        </h4>

        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between text-base text-gray-700">
            <span className="font-medium">Articles ({totalCount})</span>
            <span className="font-bold text-gray-950">{subtotal.toFixed(2)} €</span>
          </div>

          <div className="flex items-center justify-between text-base text-gray-700">
            <span className="font-medium">Livraison</span>
            <span className="font-bold text-emerald-700">
              {isFreeShipping || subtotal === 0 ? "Offerte" : "4.90 €"}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
            <span className="text-lg font-extrabold text-gray-900">Total TTC</span>
            <span className="text-2xl font-extrabold text-primary">
              {(subtotal === 0 ? 0 : isFreeShipping ? subtotal : subtotal + 4.9).toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-y-3">
        <Link
          href="/checkout"
          className="btn btn-primary py-4 w-full rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-white text-center"
        >
          <span>Passer la commande</span>
          <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl" />
        </Link>
        <Link
          href="/#nos-epices"
          className="btn btn-default outline w-full py-3.5 rounded-full font-bold text-sm sm:text-base text-gray-700 text-center hover:bg-gray-50 transition-all shadow-none"
        >
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
