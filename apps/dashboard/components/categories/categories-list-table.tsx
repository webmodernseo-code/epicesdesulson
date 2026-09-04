"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Pencil, Trash } from "@/icons";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";
import Link from "next/link";

const SPICE_CATEGORIES = [
  {
    id: "CAT-01",
    name: "Épices Volailles & Rôtis",
    description: "Mélanges d'exception au curcuma frais pour rôtis dorés, cuisses et grillades de volailles",
    productsCount: 1,
    slug: "epices-volailles-et-rotis",
    status: "Actif",
  },
  {
    id: "CAT-02",
    name: "Épices Viandes & Grillades",
    description: "Assemblages nobles au paprika fumé et clou de girofle pour bœufs, agneaux et barbecues",
    productsCount: 1,
    slug: "epices-viandes-et-grillades",
    status: "Actif",
  },
  {
    id: "CAT-03",
    name: "Épices Poissons & Marinades",
    description: "Recettes traditionnelles au poivre de Guinée pour poissons braisés, soupes et crustacés",
    productsCount: 1,
    slug: "epices-poissons-et-marinades",
    status: "Actif",
  },
  {
    id: "CAT-04",
    name: "Assaisonnements Signatures",
    description: "Le Secret de Sulson : assaisonnement universel gourmand pour plats mijotés et sauces",
    productsCount: 1,
    slug: "assaisonnements-signatures",
    status: "Actif",
  },
  {
    id: "CAT-05",
    name: "Packs & Coffrets Gourmets",
    description: "Le Pack Intégral réunissant les 4 saveurs artisanales de Sulson en coffret découverte",
    productsCount: 1,
    slug: "packs-et-coffrets-gourmets",
    status: "Actif",
  },
];

export default function CategoriesListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredCategories = SPICE_CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageSize = 6;
  const isAllSelected =
    filteredCategories.length > 0 &&
    selectedRows.length === filteredCategories.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredCategories.map((c) => c.id));
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
      {/* Top search & Add action */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100">
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Rechercher une catégorie..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link
          href="/categories/add"
          className="btn btn-primary py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap"
        >
          + Nouvelle Catégorie
        </Link>
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
            <TableHead className="text-xs font-semibold text-gray-600">Nom de la Catégorie</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Description</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Nombre d'épices</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600">Statut</TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((category) => (
              <TableRow
                key={category.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedRows.includes(category.id)}
                    onCheckedChange={(checked) =>
                      toggleSelectRow(category.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-500 whitespace-nowrap">
                  {category.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 block">
                    {category.name}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    /{category.slug}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-gray-600 max-w-sm">
                  {category.description}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {category.productsCount} épices
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    {category.status}
                  </span>
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      className="hover:text-primary p-1.5"
                      variant="icon"
                      href={`/categories/edit/${category.id}`}
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
          Total : {filteredCategories.length} catégories actives
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(1, Math.ceil(filteredCategories.length / pageSize))}
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
