"use client";

import React, { useState } from "react";
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

const stockItems = [
  {
    id: "REF-SUL-01",
    name: "Épice de Sulson - Spéciale Poulet",
    category: "Mélanges Signatures",
    stock: "85 pots (250g)",
    status: "En Stock",
    origin: "Atelier Sulson",
  },
  {
    id: "REF-SUL-02",
    name: "Épice de Sulson - Spéciale Viande",
    category: "Mélanges Signatures",
    stock: "72 pots (250g)",
    status: "En Stock",
    origin: "Atelier Sulson",
  },
  {
    id: "REF-SUL-03",
    name: "Épice de Sulson - Spéciale Poisson",
    category: "Mélanges Signatures",
    stock: "64 pots (100g)",
    status: "En Stock",
    origin: "Atelier Sulson",
  },
  {
    id: "REF-SUL-04",
    name: "Saveur Gourmande Signature",
    category: "Mélanges Signatures",
    stock: "50 pots (250g)",
    status: "En Stock",
    origin: "Atelier Sulson",
  },
  {
    id: "REF-PACK-05",
    name: "Le Pack Intégral (4 Saveurs 4x100g)",
    category: "Coffrets Découverte",
    stock: "28 coffrets",
    status: "En Stock",
    origin: "Atelier Sulson",
  },
  {
    id: "REF-VB-06",
    name: "Gousses de Vanille Bourbon Gourmet",
    category: "Grands Crus & Épices Nobles",
    stock: "8 tubes (3 gousses)",
    status: "Stock Faible",
    origin: "Madagascar",
  },
  {
    id: "REF-PV-07",
    name: "Poivre Noir Sauvage Voatsiperifery",
    category: "Poivres Rares & Baies",
    stock: "14 pots (100g)",
    status: "En Stock",
    origin: "Madagascar",
  },
];

const getStatusVariant = (status: string): "success" | "warning" | "error" | "default" => {
  switch (status) {
    case "En Stock":
      return "success";
    case "Stock Faible":
      return "warning";
    case "Rupture":
      return "error";
    default:
      return "default";
  }
};

export default function StockUpdateTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  return (
    <div className="border border-gray-200 rounded-2xl w-full bg-white shadow-xs">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg text-gray-900 font-bold">
            État des Stocks & Récoltes
          </h3>
          <p className="text-xs text-gray-500">
            Suivi des niveaux de stock et alertes de réassort
          </p>
        </div>
        <Link
          href="/inventory"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Gestion Inventaire →
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 hover:bg-transparent bg-gray-50/50">
            <TableHead className="py-3 font-semibold text-xs text-gray-600">
              Épice / Produit
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600">
              Catégorie
            </TableHead>
            <TableHead className="py-3 whitespace-nowrap font-semibold text-xs text-gray-600">
              Stock Disponible
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600">
              Statut
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600">
              Terroir d'Origine
            </TableHead>
            <TableHead className="py-3 font-semibold text-xs text-gray-600 text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockItems
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-3.5 whitespace-nowrap">
                  <div>
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Réf: {item.id}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 whitespace-nowrap text-xs text-gray-600">
                  {item.category}
                </TableCell>
                <TableCell className="py-3.5 whitespace-nowrap text-xs font-bold text-gray-800">
                  {item.stock}
                </TableCell>
                <TableCell className="py-3.5 whitespace-nowrap">
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3.5 whitespace-nowrap text-xs text-gray-600">
                  {item.origin}
                </TableCell>
                <TableCell className="py-3.5 whitespace-nowrap text-right pr-6">
                  <Link
                    href="/inventory"
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 hover:bg-primary hover:text-white transition-colors text-gray-700"
                  >
                    Réassort
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t border-gray-100 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(stockItems.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
