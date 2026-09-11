"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Eye, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import SearchInput from "@/components/common/search-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSafeProductImage, handleProductImageError } from "@/lib/product-image";

interface Product {
  id: string;
  code: string;
  title: string;
  basePrice: number;
  stockQuantity: number;
  isAvailable: boolean;
  imageRecto: string;
  category?: { name: string } | null;
}

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function TopProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setProducts(json.data);
          }
        }
      } catch (err) {
        console.warn("Could not load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category?.name && item.category.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSearch;
    });
  }, [products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginated = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200/90 shadow-2xs overflow-hidden">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-7">
              Catalogue des Épices & Références
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Toutes les saveurs actives et stocks en atelier
            </p>
          </div>
          <Link
            href="/products/add"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-2xs self-start sm:self-auto"
          >
            <span>+ Ajouter une épice</span>
          </Link>
        </div>

        <div className="w-full flex justify-between gap-4 items-center">
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Rechercher une épice, un code..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-y border-gray-200 text-xs font-bold text-gray-700">
              <TableHead className="py-3 pl-6">Réf.</TableHead>
              <TableHead className="py-3">Épice & Saveur</TableHead>
              <TableHead className="py-3">Prix de Base</TableHead>
              <TableHead className="py-3">Stock Disponible</TableHead>
              <TableHead className="py-3">Statut</TableHead>
              <TableHead className="py-3 pr-6 text-right">Fiche</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-xs text-gray-500">
                  Chargement des épices depuis la base de données...
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="max-w-xs mx-auto space-y-2">
                    <Package className="size-8 text-gray-400 mx-auto stroke-1" />
                    <p className="text-sm font-bold text-gray-800">Aucun produit trouvé</p>
                    <p className="text-xs text-gray-500">
                      Les épices créées dans votre boutique apparaîtront ici.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="py-3.5 pl-6 font-mono text-xs font-semibold text-gray-500 whitespace-nowrap">
                    {item.code || "SUL-AUTO"}
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-gray-50 border border-gray-200 shrink-0 overflow-hidden flex items-center justify-center p-0.5">
                        <img
                          src={getSafeProductImage(item.imageRecto, item.id, item.title)}
                          alt={item.title}
                          className="w-full h-full object-contain"
                          onError={(e) => handleProductImageError(e, item.id, item.title)}
                        />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 text-xs font-bold text-gray-900 whitespace-nowrap">
                    {euros.format(Number(item.basePrice || 0))}
                  </TableCell>
                  <TableCell className="py-3.5 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    {item.stockQuantity} unités
                  </TableCell>
                  <TableCell className="py-3.5 whitespace-nowrap">
                    <Badge variant={item.isAvailable ? "success" : "error"}>
                      {item.isAvailable ? "En Ligne" : "Désactivé"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3.5 pr-6 text-right whitespace-nowrap">
                    <Link
                      href={`/products/edit/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                    >
                      <Eye className="size-3.5" />
                      <span>Modifier</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 sm:p-6 border-t border-gray-100 flex justify-end">
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
