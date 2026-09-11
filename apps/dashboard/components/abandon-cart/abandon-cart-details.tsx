"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Mail01Icon, PhoneIcon, MapMarkerIcon } from "@/icons";
import { ShoppingCart, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AbandonCartDetails() {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <PageHeader
          title="Détail de la Session Panier"
          backHref="/abandon-cart"
          className="gap-4"
        />
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-2xs">
        <div className="size-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
          <ShoppingCart className="size-7" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Session de panier non finalisée
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Les paniers abandonnés par les visiteurs lors du passage en caisse sont automatiquement suivis ici afin de leur envoyer des relances personnalisées.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/abandon-cart"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 hover:bg-emerald-700 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Retour à la liste des paniers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
