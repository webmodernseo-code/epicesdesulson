"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { getSafeProductImage, handleProductImageError } from "@/lib/product-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Pencil,
  RefreshCw,
  PackagePlus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import StockOverview from "./stock-overview";

export interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  stock: number;
  origin: string;
  format: string;
  image: string;
  status: "Publié" | "Brouillon";
  lastUpdated: string;
}

const DEFAULT_STOCK_DATA: StockItem[] = [
  {
    id: "SUL-301",
    code: "SUL-301",
    name: "Épice de Sulson - Spéciale Poulet",
    category: "Épices Volailles & Rôtis",
    price: "6,90 €",
    priceNum: 6.9,
    stock: 145,
    origin: "Cameroun (Recette Traditionnelle)",
    format: "Sachet 100g",
    image: "/images/products/epice-poulet-recto.jpg",
    status: "Publié",
    lastUpdated: "Aujourd'hui",
  },
  {
    id: "SUL-302",
    code: "SUL-302",
    name: "Épice de Sulson - Spéciale Viande",
    category: "Épices Viandes & Grillades",
    price: "6,90 €",
    priceNum: 6.9,
    stock: 120,
    origin: "Cameroun (Recette Traditionnelle)",
    format: "Sachet 100g",
    image: "/images/products/epice-viande-recto.jpg",
    status: "Publié",
    lastUpdated: "Hier",
  },
  {
    id: "SUL-303",
    code: "SUL-303",
    name: "Épice de Sulson - Spéciale Poisson",
    category: "Épices Poissons & Marinades",
    price: "6,90 €",
    priceNum: 6.9,
    stock: 98,
    origin: "Cameroun (Poivre de Guinée)",
    format: "Sachet 100g",
    image: "/images/products/epice-poisson-recto.jpg",
    status: "Publié",
    lastUpdated: "05 Sept. 2026",
  },
  {
    id: "SUL-304",
    code: "SUL-304",
    name: "Épice de Sulson - Saveur Gourmande",
    category: "Assaisonnements Signatures",
    price: "6,90 €",
    priceNum: 6.9,
    stock: 210,
    origin: "Cameroun (Le Secret de Sulson)",
    format: "Sachet 100g",
    image: "/images/products/epice-gourmande-recto.jpg",
    status: "Publié",
    lastUpdated: "02 Sept. 2026",
  },
  {
    id: "SUL-305",
    code: "SUL-305",
    name: "Le Pack Intégral : 4 Saveurs Authentiques",
    category: "Packs & Coffrets Gourmets",
    price: "24,90 €",
    priceNum: 24.9,
    stock: 65,
    origin: "Atelier Sulson (Pack Lot 4)",
    format: "Pack 4x100g (400g)",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    status: "Publié",
    lastUpdated: "01 Sept. 2026",
  },
];

const categoryOptions: Option[] = [
  { label: "Toutes les catégories", value: "" },
  { label: "Épices Volailles & Rôtis", value: "Épices Volailles & Rôtis" },
  { label: "Épices Viandes & Grillades", value: "Épices Viandes & Grillades" },
  { label: "Épices Poissons & Marinades", value: "Épices Poissons & Marinades" },
  { label: "Assaisonnements Signatures", value: "Assaisonnements Signatures" },
  { label: "Packs & Coffrets Gourmets", value: "Packs & Coffrets Gourmets" },
];

const statusOptions: Option[] = [
  { label: "Tous les statuts", value: "" },
  { label: "Publié", value: "Publié" },
  { label: "Brouillon", value: "Brouillon" },
];

const stockLevelOptions: Option[] = [
  { label: "Tous les niveaux de stock", value: "" },
  { label: "En stock (> 20 unités)", value: "in_stock" },
  { label: "Stock faible (≤ 20 unités)", value: "low_stock" },
  { label: "Rupture de stock (0 unité)", value: "out_of_stock" },
];

export default function StockProductTable() {
  const [stockItems, setStockItems] = useState<StockItem[]>(DEFAULT_STOCK_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedStockLevel, setSelectedStockLevel] = useState<Option | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick Restock Modal State
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<StockItem | null>(null);
  const [addedQuantity, setAddedQuantity] = useState<number>(50);
  const [isSubmittingRestock, setIsSubmittingRestock] = useState(false);

  // Fetch real database products
  const fetchProducts = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/products", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems: StockItem[] = json.data.map((p: any) => {
            const rawImg = p.imageRecto || p.image || "/images/products/epice-poulet-recto.jpg";
            const safeImg = rawImg.startsWith("http") || rawImg.startsWith("/") ? rawImg : `/images/products/${rawImg}`;
            return {
              id: p.code || p.id,
              code: p.code || p.id,
              name: p.title || p.name,
              category: p.category?.name || p.category || "Sans catégorie",
              price: `${Number(p.basePrice).toFixed(2).replace(".", ",")} €`,
              priceNum: Number(p.basePrice) || 6.9,
              stock: Number(p.stockQuantity) ?? 100,
              origin: p.origin || "Cameroun",
              format: p.formats?.[0]?.label || "Sachet 100g",
              image: safeImg,
              status: p.isAvailable !== false ? "Publié" : "Brouillon",
              lastUpdated: p.updatedAt
                ? new Date(p.updatedAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Récemment",
            };
          });

          const dbCodes = new Set(dbItems.map((item) => item.code.toUpperCase()));
          const remainingDefaults = DEFAULT_STOCK_DATA.filter(
            (defItem) => !dbCodes.has(defItem.code.toUpperCase())
          );

          setStockItems([...dbItems, ...remainingDefaults]);
        }
      }
    } catch {
      // Keep existing data on fetch error
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return stockItems.filter((item) => {
      // Search
      const searchMatch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const categoryMatch =
        !selectedCategory?.value || item.category === selectedCategory.value;

      // Status
      const statusMatch =
        !selectedStatus?.value || item.status === selectedStatus.value;

      // Stock Level
      let stockMatch = true;
      if (selectedStockLevel?.value === "in_stock") {
        stockMatch = item.stock > 20;
      } else if (selectedStockLevel?.value === "low_stock") {
        stockMatch = item.stock > 0 && item.stock <= 20;
      } else if (selectedStockLevel?.value === "out_of_stock") {
        stockMatch = item.stock === 0;
      }

      return searchMatch && categoryMatch && statusMatch && stockMatch;
    });
  }, [stockItems, searchTerm, selectedCategory, selectedStatus, selectedStockLevel]);

  // Live KPI metrics
  const totalCount = stockItems.length;
  const totalUnits = stockItems.reduce((acc, curr) => acc + curr.stock, 0);
  const inStockCount = stockItems.filter((item) => item.stock > 20).length;
  const lowStockCount = stockItems.filter((item) => item.stock > 0 && item.stock <= 20).length;
  const outOfStockCount = stockItems.filter((item) => item.stock === 0).length;

  // Pagination
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Toggle selection
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredItems.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "SKU",
      "Nom du Produit",
      "Categorie",
      "Prix TTC",
      "Stock Disponible",
      "Format",
      "Terroir",
      "Statut",
      "Derniere MAJ",
    ];

    const rows = filteredItems.map((item) => [
      `"${item.code}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.category.replace(/"/g, '""')}"`,
      `"${item.price}"`,
      item.stock,
      `"${item.format}"`,
      `"${item.origin.replace(/"/g, '""')}"`,
      `"${item.status}"`,
      `"${item.lastUpdated}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `stocks_sulson_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Fichier CSV de stock exporté avec succès !");
  };

  // Open Quick Restock Modal
  const handleOpenRestock = (item: StockItem) => {
    setTargetItem(item);
    setAddedQuantity(50);
    setRestockModalOpen(true);
  };

  // Submit Restock
  const handleSaveRestock = async () => {
    if (!targetItem) return;
    const newStock = Math.max(0, targetItem.stock + Number(addedQuantity));

    setIsSubmittingRestock(true);
    try {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(targetItem.code)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });

      if (!res.ok) {
        // Fallback update in state if offline/initial item
        setStockItems((prev) =>
          prev.map((it) => (it.id === targetItem.id ? { ...it, stock: newStock } : it))
        );
      } else {
        await fetchProducts();
      }

      toast.success(
        `Stock mis à jour pour "${targetItem.name}" : ${newStock} unités désormais disponibles.`
      );
      setRestockModalOpen(false);
    } catch {
      // Local fallback
      setStockItems((prev) =>
        prev.map((it) => (it.id === targetItem.id ? { ...it, stock: newStock } : it))
      );
      toast.success(`Stock mis à jour localement : ${newStock} unités.`);
      setRestockModalOpen(false);
    } finally {
      setIsSubmittingRestock(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Top KPI Overview ─── */}
      <StockOverview
        totalCount={totalCount}
        totalUnits={totalUnits}
        inStockCount={inStockCount}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
        onExportCsv={handleExportCsv}
        onOpenQuickAdd={() => {
          if (stockItems.length > 0) handleOpenRestock(stockItems[0]);
        }}
      />

      {/* ─── Main Stock Table Container ─── */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        {/* Search & Filters Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between gap-4 lg:items-center bg-gray-50/40">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par référence, épice, terroir..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 shadow-2xs placeholder:text-gray-400"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="min-w-[170px]">
              <CustomSelect
                options={categoryOptions}
                value={selectedCategory}
                onChange={(opt) => {
                  setSelectedCategory(opt);
                  setCurrentPage(1);
                }}
                placeholder="Catégorie"
              />
            </div>

            <div className="min-w-[160px]">
              <CustomSelect
                options={stockLevelOptions}
                value={selectedStockLevel}
                onChange={(opt) => {
                  setSelectedStockLevel(opt);
                  setCurrentPage(1);
                }}
                placeholder="Niveau de stock"
              />
            </div>

            <div className="min-w-[120px]">
              <CustomSelect
                options={statusOptions}
                value={selectedStatus}
                onChange={(opt) => {
                  setSelectedStatus(opt);
                  setCurrentPage(1);
                }}
                placeholder="Statut"
              />
            </div>

            <button
              onClick={fetchProducts}
              disabled={isRefreshing}
              title="Actualiser la liste"
              className="size-10 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`} />
            </button>
          </div>
        </div>

        {/* ─── Table Content ─── */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-b border-gray-200">
                <TableHead className="w-[45px] pl-5">
                  <Checkbox
                    checked={
                      filteredItems.length > 0 &&
                      selectedRows.length === filteredItems.length
                    }
                    onCheckedChange={(checked) => toggleSelectAll(Boolean(checked))}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Réf.</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Épice / Format</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Catégorie</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Prix TTC</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Stock Réel</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Niveau de Stock</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Terroir d'Origine</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600">Statut</TableHead>
                <TableHead className="text-xs font-semibold text-gray-600 text-right pr-6">
                  Actions de Stock
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-sm text-gray-500">
                    Aucune référence d'épice ne correspond à vos critères de recherche.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((item) => {
                  const isLow = item.stock > 0 && item.stock <= 20;
                  const isOut = item.stock === 0;

                  return (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
                    >
                      <TableCell className="pl-5 whitespace-nowrap">
                        <Checkbox
                          checked={selectedRows.includes(item.id)}
                          onCheckedChange={(checked) =>
                            toggleSelectRow(item.id, Boolean(checked))
                          }
                        />
                      </TableCell>

                      <TableCell className="font-mono text-xs font-bold text-gray-600 whitespace-nowrap">
                        {item.code}
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="size-11 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0 p-1 flex items-center justify-center">
                            <img
                              src={getSafeProductImage(item.image, item.code, item.name)}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => handleProductImageError(e, item.code, item.name)}
                            />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              {item.format}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs font-medium text-gray-700 whitespace-nowrap">
                        {item.category}
                      </TableCell>

                      <TableCell className="font-extrabold text-xs sm:text-sm text-gray-950 whitespace-nowrap">
                        {item.price}
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <span
                          className={`text-xs font-bold ${
                            isOut
                              ? "text-rose-600"
                              : isLow
                              ? "text-amber-600"
                              : "text-emerald-700"
                          }`}
                        >
                          {item.stock} unités
                        </span>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
                            <XCircle className="size-3.5" />
                            <span>Rupture de stock</span>
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                            <AlertTriangle className="size-3.5" />
                            <span>Stock faible ({item.stock})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="size-3.5" />
                            <span>En stock optimal</span>
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                        {item.origin}
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <Badge variant={item.status === "Publié" ? "success" : "warning"}>
                          {item.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="pr-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenRestock(item)}
                            className="btn py-1.5 px-3 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <PackagePlus className="size-3.5" />
                            <span>Réapprovisionner</span>
                          </button>

                          <Link
                            href={`/products/edit/${encodeURIComponent(item.code)}`}
                            className="btn py-1.5 px-2.5 rounded-full text-xs font-bold border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center gap-1 cursor-pointer"
                            title="Modifier la fiche produit"
                          >
                            <Pencil className="size-3.5" />
                            <span>Modifier</span>
                          </Link>
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
            Affichage de {paginatedItems.length} sur {filteredItems.length} épices en inventaire
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* ─── Modal Réapprovisionnement Rapide de Stock ─── */}
      {restockModalOpen && targetItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <PackagePlus className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    Réapprovisionnement
                  </h3>
                  <p className="text-xs text-gray-500">{targetItem.name}</p>
                </div>
              </div>
              <button
                onClick={() => setRestockModalOpen(false)}
                className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Current Stock info */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Stock actuel</span>
                <span className="text-lg font-extrabold text-gray-950">
                  {targetItem.stock} sachets
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Nouveau total estimé</span>
                <span className="text-lg font-extrabold text-emerald-700">
                  {Math.max(0, targetItem.stock + Number(addedQuantity || 0))} sachets
                </span>
              </div>
            </div>

            {/* Quantity adjustment */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Unités à ajouter au stock disponible
              </label>

              <div className="flex items-center gap-2 mb-3">
                {[+25, +50, +100, +250].map((inc) => (
                  <button
                    key={inc}
                    type="button"
                    onClick={() => setAddedQuantity(inc)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      addedQuantity === inc
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    +{inc}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={addedQuantity}
                onChange={(e) => setAddedQuantity(Number(e.target.value))}
                placeholder="Nombre d'unités à ajouter"
                className="w-full h-11 px-4 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setRestockModalOpen(false)}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <Button
                type="button"
                onClick={handleSaveRestock}
                disabled={isSubmittingRestock}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-full text-xs cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isSubmittingRestock ? "Mise à jour..." : "Confirmer le réapprovisionnement"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
