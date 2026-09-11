"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import { Eye, Pencil, Trash } from "@/icons";
import CustomSelect, { Option } from "../ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";
import Link from "next/link";

const SPICES_DATA = [
  {
    id: "SUL-301",
    name: "Épice de Sulson - Spéciale Poulet",
    category: "Épices Volailles & Rôtis",
    price: "6,90 €",
    origin: "Cameroun (Recette Traditionnelle)",
    stock: 145,
    status: "Publié",
    format: "Sachet 100g",
    image: "/images/products/epice-poulet-recto.jpg",
  },
  {
    id: "SUL-302",
    name: "Épice de Sulson - Spéciale Viande",
    category: "Épices Viandes & Grillades",
    price: "6,90 €",
    origin: "Cameroun (Recette Traditionnelle)",
    stock: 120,
    status: "Publié",
    format: "Sachet 100g",
    image: "/images/products/epice-viande-recto.jpg",
  },
  {
    id: "SUL-303",
    name: "Épice de Sulson - Spéciale Poisson",
    category: "Épices Poissons & Marinades",
    price: "6,90 €",
    origin: "Cameroun (Poivre de Guinée)",
    stock: 98,
    status: "Publié",
    format: "Sachet 100g",
    image: "/images/products/epice-poisson-recto.jpg",
  },
  {
    id: "SUL-304",
    name: "Épice de Sulson - Saveur Gourmande",
    category: "Assaisonnements Signatures",
    price: "6,90 €",
    origin: "Cameroun (Le Secret de Sulson)",
    stock: 210,
    status: "Publié",
    format: "Sachet 100g",
    image: "/images/products/epice-gourmande-recto.jpg",
  },
  {
    id: "SUL-305",
    name: "Le Pack Intégral : 4 Saveurs Authentiques",
    category: "Packs & Coffrets Gourmets",
    price: "24,90 €",
    origin: "Atelier Sulson (Pack Lot 4)",
    stock: 65,
    status: "Publié",
    format: "Pack 4x100g (400g)",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
  },
];

const categoryOptions = [
  { label: "Toutes les catégories", value: "" },
  { label: "Épices Volailles & Rôtis", value: "Épices Volailles & Rôtis" },
  { label: "Épices Viandes & Grillades", value: "Épices Viandes & Grillades" },
  { label: "Épices Poissons & Marinades", value: "Épices Poissons & Marinades" },
  { label: "Assaisonnements Signatures", value: "Assaisonnements Signatures" },
  { label: "Packs & Coffrets Gourmets", value: "Packs & Coffrets Gourmets" },
];

const statusOptions = [
  { label: "Tous les statuts", value: "" },
  { label: "Publié", value: "Publié" },
  { label: "Brouillon", value: "Brouillon" },
];

export default function ProductListTable() {
  const [products, setProducts] = useState(SPICES_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems = json.data.map((p: any) => {
            const rawImg = p.imageRecto || p.image || "/images/products/epice-poulet-recto.jpg";
            const safeImg = rawImg.startsWith("http") || rawImg.startsWith("/") ? rawImg : `/images/products/${rawImg}`;
            return {
              id: p.code || p.id,
              name: p.title || p.name,
              category: p.category?.name || p.category || "Sans catégorie",
              price: `${Number(p.basePrice).toFixed(2).replace(".", ",")} €`,
              origin: p.origin || "Cameroun (Recette Artisanale)",
              stock: p.stockQuantity ?? 100,
              status: p.isAvailable !== false ? "Publié" : "Brouillon",
              format: p.formats?.[0]?.label || "Sachet 100g",
              image: safeImg,
            };
          });

          const dbIds = new Set(dbItems.map((item: any) => String(item.id).toUpperCase()));
          const remainingDefaults = SPICES_DATA.filter(
            (defItem) => !dbIds.has(defItem.id.toUpperCase())
          );

          setProducts([...dbItems, ...remainingDefaults]);
        }
      })
      .catch(() => undefined);
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      !selectedCategory?.value || item.category === selectedCategory.value;
    const matchesStatus =
      !selectedStatus?.value || item.status === selectedStatus.value;
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const pageSize = 6;
  const isAllSelected =
    filteredProducts.length > 0 &&
    selectedRows.length === filteredProducts.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredProducts.map((p) => p.id));
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

  return (
    <div className="border border-gray-200 rounded-2xl w-full bg-white shadow-xs">
      {/* Search & Filters */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100">
        <div className="w-full md:w-72">
          <SearchInput
            placeholder="Rechercher une épice, origine, réf..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="w-full sm:w-48">
            <CustomSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Filtrer par catégorie"
            />
          </div>
          <div className="w-full sm:w-36">
            <CustomSelect
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Statut"
            />
          </div>
          <Link
            href="/products/add"
            className="btn btn-primary py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap"
          >
            + Nouvelle Épice
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-b border-gray-200">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Réf.</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Épice / Visuel</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Catégorie</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Prix TTC</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Terroir d'Origine</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Stock</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Statut</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(product.id)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(product.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-500 whitespace-nowrap">
                  {product.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                        {product.name}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {product.format}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {product.category}
                </TableCell>
                <TableCell className="font-bold text-xs sm:text-sm text-primary whitespace-nowrap">
                  {product.price}
                </TableCell>
                <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                  {product.origin}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span
                    className={`text-xs font-bold ${
                      product.stock <= 20 ? "text-amber-600" : "text-gray-800"
                    }`}
                  >
                    {product.stock} unités
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant={
                      product.status === "Publié" ? "success" : "warning"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      className="hover:text-primary p-1.5"
                      href={`/products/${product.id}`}
                      variant="icon"
                      title="Voir"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      className="hover:text-primary p-1.5"
                      variant="icon"
                      href={`/products/edit/${product.id}`}
                      title="Modifier"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      className="hover:text-red-500 p-1.5 text-gray-400"
                      variant="icon"
                      onClick={() => setIsDeleteModalOpen(true)}
                      title="Supprimer"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Affichage de {filteredProducts.length} sur {filteredProducts.length} épices
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(filteredProducts.length / pageSize))}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
