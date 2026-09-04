"use client";

import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: number | string;
  title: string;
  image: string;
  currentPrice: string;
  oldPrice?: string;
  quantity: number;
  pack?: string;
  outOfStock?: boolean;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: {
    id: number | string;
    title: string;
    image: string;
    currentPrice: string;
    oldPrice?: string;
    pack?: string;
    quantity?: number;
  }) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 101,
    image: "/images/products/epice-poulet-recto.jpg",
    title: "Épice de Sulson - Spéciale Poulet",
    pack: "100g (Sachet)",
    currentPrice: "6.90 €",
    oldPrice: "8.50 €",
    quantity: 1,
  },
  {
    id: 102,
    image: "/images/products/epice-viande-recto.jpg",
    title: "Épice de Sulson - Spéciale Viande",
    pack: "100g (Sachet)",
    currentPrice: "6.90 €",
    oldPrice: "8.50 €",
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Parse numeric price from string like "$14.50"
  const parsePrice = (priceStr: string): number => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.currentPrice) * item.quantity,
    0
  );

  const addItem = (product: {
    id: number | string;
    title: string;
    image: string;
    currentPrice: string;
    oldPrice?: string;
    pack?: string;
    quantity?: number;
  }) => {
    const qtyToAdd = product.quantity || 1;
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          currentPrice: product.currentPrice,
          oldPrice: product.oldPrice,
          pack: product.pack || "Standard",
          quantity: qtyToAdd,
        },
      ];
    });
    // Automatically open the cart drawer on product addition
    setIsCartOpen(true);
  };

  const removeItem = (id: number | string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number | string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

