"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface RatingStat {
  ratingScore: number;
  ratingCount: number;
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

// Initial realistic baseline ratings between 40-80 reviews and 4.0 to 4.5 stars
export const DEFAULT_PRODUCT_RATINGS: Record<string, RatingStat> = {
  "301": { ratingScore: 4.4, ratingCount: 68 },
  "epice-poulet": { ratingScore: 4.4, ratingCount: 68 },
  "SUL-301": { ratingScore: 4.4, ratingCount: 68 },

  "302": { ratingScore: 4.5, ratingCount: 74 },
  "epice-viande": { ratingScore: 4.5, ratingCount: 74 },
  "SUL-302": { ratingScore: 4.5, ratingCount: 74 },

  "303": { ratingScore: 4.3, ratingCount: 52 },
  "epice-poisson": { ratingScore: 4.3, ratingCount: 52 },
  "SUL-303": { ratingScore: 4.3, ratingCount: 52 },

  "304": { ratingScore: 4.4, ratingCount: 61 },
  "epice-gourmande": { ratingScore: 4.4, ratingCount: 61 },
  "SUL-304": { ratingScore: 4.4, ratingCount: 61 },

  "305": { ratingScore: 4.5, ratingCount: 79 },
  "pack-4-saveurs": { ratingScore: 4.5, ratingCount: 79 },
  "SUL-305": { ratingScore: 4.5, ratingCount: 79 },
};

const STORAGE_KEY = "sulson_dynamic_product_ratings_v1";

interface RatingsContextType {
  getRating: (idOrCode: string | number) => RatingStat;
  addRating: (idOrCode: string | number, stars: number) => void;
  addReview: (idOrCode: string | number, review: Omit<ProductReview, "id">) => void;
  ratingsMap: Record<string, RatingStat>;
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

// Normalizes aliases (e.g. 301, "301", "epice-poulet", "SUL-301" all point to the same product group)
function getAliases(idOrCode: string | number): string[] {
  const key = String(idOrCode).toLowerCase().trim();
  if (key === "301" || key.includes("poulet") || key === "sul-301") {
    return ["301", "epice-poulet", "SUL-301"];
  }
  if (key === "302" || key.includes("viande") || key === "sul-302") {
    return ["302", "epice-viande", "SUL-302"];
  }
  if (key === "303" || key.includes("poisson") || key === "sul-303") {
    return ["303", "epice-poisson", "SUL-303"];
  }
  if (key === "304" || key.includes("gourmande") || key === "sul-304") {
    return ["304", "epice-gourmande", "SUL-304"];
  }
  if (key === "305" || key.includes("pack") || key === "sul-305") {
    return ["305", "pack-4-saveurs", "SUL-305"];
  }
  return [key];
}

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [ratingsMap, setRatingsMap] = useState<Record<string, RatingStat>>(DEFAULT_PRODUCT_RATINGS);

  // Load from localStorage on mount and sync across window events
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            setRatingsMap((prev) => ({ ...prev, ...parsed }));
          }
        }
      } catch {
        // ignore
      }
    };

    loadFromStorage();

    const handleCustomUpdate = () => {
      loadFromStorage();
    };

    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && typeof parsed === "object") {
            setRatingsMap((prev) => ({ ...prev, ...parsed }));
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("sulson-ratings-updated", handleCustomUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("sulson-ratings-updated", handleCustomUpdate);
    };
  }, []);

  const getRating = useCallback(
    (idOrCode: string | number): RatingStat => {
      const key = String(idOrCode).trim();
      if (ratingsMap[key]) {
        return ratingsMap[key];
      }
      const aliases = getAliases(idOrCode);
      for (const alias of aliases) {
        if (ratingsMap[alias]) {
          return ratingsMap[alias];
        }
      }
      return { ratingScore: 4.4, ratingCount: 65 };
    },
    [ratingsMap]
  );

  const addRating = useCallback(
    (idOrCode: string | number, stars: number) => {
      const aliases = getAliases(idOrCode);
      const current = getRating(idOrCode);

      const newCount = current.ratingCount + 1;
      const totalPoints = current.ratingScore * current.ratingCount + stars;
      const newScore = Math.min(5, Math.max(1, Number((totalPoints / newCount).toFixed(1))));

      setRatingsMap((prev) => {
        const updated = { ...prev };
        for (const alias of aliases) {
          updated[alias] = { ratingScore: newScore, ratingCount: newCount };
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(new Event("sulson-ratings-updated"));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [getRating]
  );

  const addReview = useCallback(
    (idOrCode: string | number, review: Omit<ProductReview, "id">) => {
      const aliases = getAliases(idOrCode);
      const current = getRating(idOrCode);
      const stars = Math.min(5, Math.max(1, Math.round(review.rating)));
      const newCount = current.ratingCount + 1;
      const next: RatingStat = {
        ratingScore: Number(((current.ratingScore * current.ratingCount + stars) / newCount).toFixed(1)),
        ratingCount: newCount,
        reviews: [{ ...review, rating: stars, id: crypto.randomUUID() }, ...(current.reviews || [])].slice(0, 50),
      };
      setRatingsMap((prev) => {
        const updated = { ...prev };
        for (const alias of aliases) updated[alias] = next;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* storage unavailable */ }
        return updated;
      });
    },
    [getRating]
  );

  return (
    <RatingsContext.Provider value={{ getRating, addRating, addReview, ratingsMap }}>
      {children}
    </RatingsContext.Provider>
  );
}

export function useProductRatings() {
  const context = useContext(RatingsContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      getRating: (idOrCode: string | number) => {
        const key = String(idOrCode).trim();
        return DEFAULT_PRODUCT_RATINGS[key] || { ratingScore: 4.4, ratingCount: 65 };
      },
      addRating: () => {},
      addReview: () => {},
      ratingsMap: DEFAULT_PRODUCT_RATINGS,
    };
  }
  return context;
}
