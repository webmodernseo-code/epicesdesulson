"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

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
  isLoaded: boolean;
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

const CART_STORAGE_KEY = "sulson_cart_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const initialLoadRef = useRef(false);

  // Load cart from localStorage upon mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch (err) {
        console.warn("Could not load cart from localStorage:", err);
      } finally {
        setIsLoaded(true);
        initialLoadRef.current = true;
      }
    }
  }, []);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    if (initialLoadRef.current && typeof window !== "undefined") {
      try {
        if (items.length === 0) {
          localStorage.removeItem(CART_STORAGE_KEY);
        } else {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
      } catch (err) {
        console.warn("Could not save cart to localStorage:", err);
      }
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Parse numeric price from string like "6.90 €" or "14.50"
  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
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
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && (item.pack || "") === (product.pack || "")
      );
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
          pack: product.pack || "100g",
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
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (err) {
        // ignore
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        isCartOpen,
        isLoaded,
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
