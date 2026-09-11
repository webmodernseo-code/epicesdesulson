"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchInput from "../common/search-input";

interface Product {
  id: string;
  code: string;
  title: string;
  isAvailable: boolean;
  basePrice: number;
}

export default function DraftProductsList() {
  const [drafts, setDrafts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadDrafts() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            // Filter products that are marked inactive / draft
            const draftList = json.data.filter((p: Product) => !p.isAvailable);
            setDrafts(draftList);
          }
        }
      } catch (err) {
        console.warn("Could not load draft products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDrafts();
  }, []);

  const filtered = drafts.filter((p) =>
    !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl w-full border border-gray-200/90 shadow-2xs overflow-hidden">
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-7">
              Épices en Brouillon & Hors-Ligne
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Références en cours de création non visibles sur la boutique publique
            </p>
          </div>
          <Link
            href="/products/add"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-2xs self-start sm:self-auto"
          >
            <Plus className="size-3.5" />
            <span>Créer une nouvelle épice</span>
          </Link>
        </div>

        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Rechercher une référence..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-y border-gray-200 text-xs font-bold text-gray-700">
            <TableHead className="py-3 pl-6">Code Réf.</TableHead>
            <TableHead className="py-3">Épice</TableHead>
            <TableHead className="py-3">Prix de Base</TableHead>
            <TableHead className="py-3">Statut</TableHead>
            <TableHead className="py-3 pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center text-xs text-gray-500">
                Vérification des brouillons en cours...
              </TableCell>
            </TableRow>
          ) : filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center">
                <div className="max-w-sm mx-auto space-y-2">
                  <Package className="size-8 text-gray-400 mx-auto stroke-1" />
                  <p className="text-sm font-bold text-gray-800">
                    Aucun produit en brouillon
                  </p>
                  <p className="text-xs text-gray-500">
                    Toutes vos épices actives sont actuellement publiées sur la boutique en ligne.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((item) => (
              <TableRow
                key={item.id}
                className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 font-mono text-xs text-gray-500">
                  {item.code || "SUL-AUTO"}
                </TableCell>
                <TableCell className="font-bold text-xs sm:text-sm text-gray-900">
                  {item.title}
                </TableCell>
                <TableCell className="text-xs font-semibold text-gray-700">
                  {item.basePrice} €
                </TableCell>
                <TableCell>
                  <Badge variant="warning">Brouillon</Badge>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <Link
                    href={`/products/edit/${item.id}`}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    Publier / Modifier
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
