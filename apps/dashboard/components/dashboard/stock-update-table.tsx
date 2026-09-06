"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { Package } from "lucide-react";

interface ProductItem {
  id: string;
  code: string;
  title: string;
  origin: string;
  stockQuantity: number;
  isAvailable: boolean;
  category?: { name: string } | null;
  basePrice: number;
}

const defaultFlagshipCatalogue: ProductItem[] = [
  {
    id: "prod-1",
    code: "SUL-301",
    title: "Épice de Sulson - Spéciale Poulet",
    category: { name: "Mélanges Signatures" },
    stockQuantity: 100,
    isAvailable: true,
    origin: "Cameroun (Recette Artisanale)",
    basePrice: 6.9,
  },
  {
    id: "prod-2",
    code: "SUL-302",
    title: "Épice de Sulson - Spéciale Viande",
    category: { name: "Mélanges Signatures" },
    stockQuantity: 85,
    isAvailable: true,
    origin: "Cameroun (Recette Artisanale)",
    basePrice: 6.9,
  },
  {
    id: "prod-3",
    code: "SUL-303",
    title: "Épice de Sulson - Spéciale Poisson",
    category: { name: "Mélanges Signatures" },
    stockQuantity: 75,
    isAvailable: true,
    origin: "Cameroun (Recette Artisanale)",
    basePrice: 6.9,
  },
  {
    id: "prod-4",
    code: "SUL-304",
    title: "Saveur Gourmande Signature",
    category: { name: "Mélanges Signatures" },
    stockQuantity: 60,
    isAvailable: true,
    origin: "Atelier Sulson",
    basePrice: 7.5,
  },
  {
    id: "prod-5",
    code: "SUL-PACK",
    title: "Le Pack Intégral (4 Saveurs 4x100g)",
    category: { name: "Packs & Coffrets" },
    stockQuantity: 30,
    isAvailable: true,
    origin: "Atelier Sulson",
    basePrice: 49.9,
  },
  {
    id: "prod-6",
    code: "SUL-VB",
    title: "Vanille Bourbon Gourmet Sambava",
    category: { name: "Grands Crus & Épices Nobles" },
    stockQuantity: 18,
    isAvailable: true,
    origin: "Madagascar (Sambava)",
    basePrice: 12.9,
  },
  {
    id: "prod-7",
    code: "SUL-KP",
    title: "Poivre Noir de Kampot IGP",
    category: { name: "Poivres Rares & Baies" },
    stockQuantity: 24,
    isAvailable: true,
    origin: "Cambodge (Kampot)",
    basePrice: 8.9,
  },
];

export default function StockUpdateTable() {
  const [products, setProducts] = useState<ProductItem[]>(defaultFlagshipCatalogue);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProducts(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load products from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / pageSize) || 1;

  const getStatus = (stock: number) => {
    if (stock <= 0) return { label: "Rupture", variant: "error" as const };
    if (stock <= 15) return { label: "Stock Faible", variant: "warning" as const };
    return { label: "En Stock", variant: "success" as const };
  };

  return (
    <div className="border border-gray-200/90 rounded-2xl w-full bg-white shadow-2xs overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg text-gray-900 font-bold">
            État des Stocks & Catalogue Réel
          </h3>
          <p className="text-xs text-gray-500">
            Niveaux d'inventaire en direct des épices et formats en atelier.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          Gérer le Catalogue →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 hover:bg-transparent bg-gray-50/50 text-xs text-gray-700">
              <TableHead className="py-3 pl-6 font-bold">Épice / Référence</TableHead>
              <TableHead className="py-3 font-bold">Catégorie</TableHead>
              <TableHead className="py-3 whitespace-nowrap font-bold">Stock Disponible</TableHead>
              <TableHead className="py-3 font-bold">Statut</TableHead>
              <TableHead className="py-3 font-bold">Terroir d'Origine</TableHead>
              <TableHead className="py-3 font-bold text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-xs text-gray-500">
                  Actualisation des stocks...
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <div className="max-w-xs mx-auto space-y-2">
                    <Package className="size-6 text-gray-400 mx-auto" />
                    <p className="text-xs font-bold text-gray-800">Aucun produit dans l'inventaire</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => {
                const status = getStatus(item.stockQuantity);
                return (
                  <TableRow
                    key={item.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="py-3.5 pl-6 whitespace-nowrap">
                      <div>
                        <div className="font-bold text-gray-900 text-xs sm:text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-mono text-gray-400">
                          Réf: {item.code || "SUL-AUTO"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 whitespace-nowrap text-xs text-gray-600 font-medium">
                      {item.category?.name || "Épices d'Exception"}
                    </TableCell>
                    <TableCell className="py-3.5 whitespace-nowrap text-xs font-bold text-gray-900">
                      {item.stockQuantity} unités
                    </TableCell>
                    <TableCell className="py-3.5 whitespace-nowrap">
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 whitespace-nowrap text-xs text-gray-600">
                      {item.origin || "Atelier Sulson"}
                    </TableCell>
                    <TableCell className="py-3.5 whitespace-nowrap text-right pr-6">
                      <Link
                        href={`/products/edit/${item.id}`}
                        className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gray-100 hover:bg-emerald-700 hover:text-white transition-colors text-gray-700"
                      >
                        Ajuster stock
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

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
