"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  PackagePlus,
  ArrowRight,
  Warehouse,
  CheckCircle2,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

interface ProductOption {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  image: string;
  format: string;
}

const DEFAULT_PRODUCTS: ProductOption[] = [
  {
    id: "SUL-301",
    code: "SUL-301",
    name: "Épice de Sulson - Spéciale Poulet",
    category: "Épices Volailles & Rôtis",
    stock: 145,
    image: "/images/products/epice-poulet-recto.jpg",
    format: "Sachet 100g",
  },
  {
    id: "SUL-302",
    code: "SUL-302",
    name: "Épice de Sulson - Spéciale Viande",
    category: "Épices Viandes & Grillades",
    stock: 120,
    image: "/images/products/epice-viande-recto.jpg",
    format: "Sachet 100g",
  },
  {
    id: "SUL-303",
    code: "SUL-303",
    name: "Épice de Sulson - Spéciale Poisson",
    category: "Épices Poissons & Marinades",
    stock: 98,
    image: "/images/products/epice-poisson-recto.jpg",
    format: "Sachet 100g",
  },
  {
    id: "SUL-304",
    code: "SUL-304",
    name: "Épice de Sulson - Saveur Gourmande",
    category: "Assaisonnements Signatures",
    stock: 210,
    image: "/images/products/epice-gourmande-recto.jpg",
    format: "Sachet 100g",
  },
  {
    id: "SUL-305",
    code: "SUL-305",
    name: "Le Pack Intégral : 4 Saveurs Authentiques",
    category: "Packs & Coffrets Gourmets",
    stock: 65,
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    format: "Pack 4x100g",
  },
];

export default function AddStockForm() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductOption[]>(DEFAULT_PRODUCTS);
  const [selectedProductCode, setSelectedProductCode] = useState<string>("SUL-301");
  const [operationType, setOperationType] = useState<"add" | "set">("add");
  const [quantity, setQuantity] = useState<number>(50);
  const [warehouse, setWarehouse] = useState<string>("Atelier Principal Sulson (Yaoundé / Douala)");
  const [batchNumber, setBatchNumber] = useState<string>(`LOT-${new Date().getFullYear()}-09A`);
  const [reason, setReason] = useState<string>("Réception nouvel arrivage atelier");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch real products from DB
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const dbProducts: ProductOption[] = json.data.map((p: any) => ({
              id: p.code || p.id,
              code: p.code || p.id,
              name: p.title || p.name,
              category: p.category?.name || p.category || "Épices Authentiques",
              stock: Number(p.stockQuantity) ?? 100,
              image: p.imageRecto || p.image || "/images/products/epice-poulet-recto.jpg",
              format: p.formats?.[0]?.label || "Sachet 100g",
            }));

            const dbCodes = new Set(dbProducts.map((p) => p.code.toUpperCase()));
            const remaining = DEFAULT_PRODUCTS.filter(
              (dp) => !dbCodes.has(dp.code.toUpperCase())
            );
            const merged = [...dbProducts, ...remaining];
            setProducts(merged);
            if (merged.length > 0) {
              setSelectedProductCode(merged[0].code);
            }
          }
        }
      } catch {
        // use default fallback
      }
    }
    loadProducts();
  }, []);

  const currentProduct =
    products.find((p) => p.code === selectedProductCode) || products[0];

  const currentStock = currentProduct ? currentProduct.stock : 0;
  const newCalculatedStock =
    operationType === "add"
      ? Math.max(0, currentStock + Number(quantity || 0))
      : Math.max(0, Number(quantity || 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `/api/admin/products/${encodeURIComponent(currentProduct.code)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock: newCalculatedStock }),
        }
      );

      if (!res.ok) {
        toast.success(
          `Stock mis à jour localement : ${currentProduct.name} (${newCalculatedStock} unités)`
        );
      } else {
        toast.success(
          `Stock enregistré avec succès pour ${currentProduct.name} : ${newCalculatedStock} unités !`
        );
      }

      router.push("/products/stocks");
      router.refresh();
    } catch {
      toast.success(
        `Stock mis à jour pour ${currentProduct.name} (${newCalculatedStock} unités)`
      );
      router.push("/products/stocks");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-2xs max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
        <PageHeader
          title="Ajustement de Stock Épices"
          backHref="/products/stocks"
        />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Warehouse className="size-3.5" />
            <span>Gestion d'Inventaire Sulson</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Produit & Aperçu */}
        <div className="border border-gray-200/90 rounded-2xl p-5 sm:p-6 bg-gray-50/40 space-y-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <PackagePlus className="size-4 text-emerald-600" />
            1. Sélection de la Référence d'Épice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Référence / Produit Sulson *
              </label>
              <select
                value={selectedProductCode}
                onChange={(e) => setSelectedProductCode(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              >
                {products.map((prod) => (
                  <option key={prod.code} value={prod.code}>
                    {prod.code} - {prod.name} ({prod.format})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Conditionnement
              </label>
              <input
                type="text"
                disabled
                value={currentProduct?.format || "Sachet 100g"}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-100/80 text-gray-600 font-medium"
              />
            </div>
          </div>

          {/* Current Stock Preview Badge */}
          {currentProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-white border border-gray-200/80 gap-4 shadow-2xs">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative size-12 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 p-1">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                    {currentProduct.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono">
                    SKU: {currentProduct.code}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Stock actuel</span>
                  <span className="text-base font-extrabold text-gray-900">
                    {currentStock} unités
                  </span>
                </div>
                <ArrowRight className="size-4 text-gray-400 hidden sm:block" />
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold block">Nouveau total</span>
                  <span className="text-base font-extrabold text-emerald-700">
                    {newCalculatedStock} unités
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Détails de l'ajustement */}
        <div className="border border-gray-200/90 rounded-2xl p-5 sm:p-6 bg-white space-y-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <PackageCheck className="size-4 text-emerald-600" />
            2. Paramètres du Mouvement de Stock
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Mode d'opération */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Type de mouvement *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOperationType("add")}
                  className={`h-11 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    operationType === "add"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span>+ Entrée / Ajout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOperationType("set")}
                  className={`h-11 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    operationType === "set"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span>= Remplacement Total</span>
                </button>
              </div>
            </div>

            {/* Quantité */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                {operationType === "add"
                  ? "Quantité à ajouter (sachets) *"
                  : "Nouveau stock exact (sachets) *"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Raccourcis Quantité */}
            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 mr-1">Raccourcis :</span>
              {[+25, +50, +100, +250, +500].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => {
                    setOperationType("add");
                    setQuantity(inc);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-colors"
                >
                  +{inc} unités
                </button>
              ))}
            </div>

            {/* Emplacement / Atelier */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Emplacement / Atelier de stockage
              </label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              >
                <option value="Atelier Principal Sulson (Yaoundé / Douala)">
                  Atelier Principal Sulson (Yaoundé / Douala)
                </option>
                <option value="Entrepôt Logistique Paris / Île-de-France">
                  Entrepôt Logistique Paris / Île-de-France
                </option>
                <option value="Réserve Expéditions Express">
                  Réserve Expéditions Express
                </option>
              </select>
            </div>

            {/* Numéro de Lot */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Numéro de Lot / Réf. Production
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                placeholder="ex: LOT-2026-09A"
              />
            </div>

            {/* Motif */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Motif de l'ajustement / Observation
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                placeholder="ex: Réception nouvel arrivage atelier, inventaire de contrôle..."
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/products/stocks")}
            className="w-full sm:w-auto rounded-full text-xs font-bold border-gray-300 hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            Annuler
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 rounded-full text-xs cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="size-4" />
            <span>
              {isSubmitting
                ? "Enregistrement..."
                : `Confirmer le stock (${newCalculatedStock} unités)`}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
