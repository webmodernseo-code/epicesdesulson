"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getSafeProductImage, handleProductImageError } from "@/lib/product-image";

const productsData = [
  {
    name: "Épice de Sulson - Spéciale Poulet",
    id: "SUL-301",
    image: "/images/products/epice-poulet-recto.jpg",
    category: "Volailles & Rôtis",
    items: 2,
    price: "11,98 €",
  },
  {
    name: "Épice de Sulson - Spéciale Viande",
    id: "SUL-302",
    image: "/images/products/epice-viande-recto.jpg",
    category: "Viandes & Grillades",
    items: 1,
    price: "5,99 €",
  },
  {
    name: "Le Pack Intégral : 4 Saveurs Authentiques",
    id: "SUL-305",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    category: "Packs Gourmets",
    items: 1,
    price: "23,96 €",
  },
];

export default function OrderSmallProductTable() {
  return (
    <div className="w-full overflow-hidden border border-gray-500/20 rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b border-gray-500/20">
            <TableHead className="pl-6">Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData.map((product, index) => (
            <TableRow
              key={index}
              className="border-b  last:border-0 border-gray-500/20 hover:bg-gray-50/50"
            >
              <TableCell className="pl-6 py-2 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-gray-50 border border-gray-200 shrink-0 overflow-hidden flex items-center justify-center p-0.5">
                    <img
                      src={getSafeProductImage(product.image, product.id, product.name)}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => handleProductImageError(e, product.id, product.name)}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-light-primary-text">
                      {product.name}
                    </p>
                    <p className="text-xs text-light-secondary-text">
                      ID: {product.id}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 text-light-secondary-text">
                {product.category}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 text-light-secondary-text">
                {product.items}
              </TableCell>
              <TableCell className="text-sm whitespace-nowrap py-2 font-medium text-light-primary-text">
                {product.price}
              </TableCell>
              <TableCell className="pr-6 py-2 whitespace-nowrap">
                <Button size="xs" variant="danger-outline">
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
