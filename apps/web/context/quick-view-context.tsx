"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface QuickViewProduct {
  id?: number | string;
  image?: string;
  title?: string;
  currentPrice?: string | number;
  oldPrice?: string | number;
  price?: string | number;
  rating?: number;
}

interface QuickViewContextType {
  isOpen: boolean;
  openQuickView: (product?: QuickViewProduct) => void;
  closeQuickView: () => void;
  selectedProduct: QuickViewProduct | null;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<QuickViewProduct | null>(null);

  const openQuickView = (product?: QuickViewProduct) => {
    // For now, we'll just open the static drawer as per user's implementation
    // But we could pass product data later
    setSelectedProduct(product || null);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <QuickViewContext.Provider
      value={{
        isOpen,
        openQuickView,
        closeQuickView,
        selectedProduct,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error("useQuickView must be used within a QuickViewProvider");
  }
  return context;
}
