"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/lib/toast";
import { useProductRatings } from "@/context/ratings-context";

interface ProductOption {
  id: string;
  name: string;
  category: string;
  image: string;
  shortDesc: string;
}

const SULSON_PRODUCTS: ProductOption[] = [
  {
    id: "epice-poulet",
    name: "Épice Spéciale Poulet (100g)",
    category: "Mélange Volailles",
    image: "/images/products/epice-poulet-recto.jpg",
    shortDesc: "Volailles rôties, marinades & braisés",
  },
  {
    id: "epice-viande",
    name: "Épice Spéciale Viande (100g)",
    category: "Mélange Viandes",
    image: "/images/products/epice-viande-recto.jpg",
    shortDesc: "Bœuf, agneau, grillades & mijotés",
  },
  {
    id: "epice-poisson",
    name: "Épice Spéciale Poisson (100g)",
    category: "Mélange Poissons",
    image: "/images/products/epice-poisson-recto.jpg",
    shortDesc: "Poissons grillés, crevettes & papillotes",
  },
  {
    id: "epice-gourmande",
    name: "Épice Saveur Gourmande (100g)",
    category: "Mélange Doux",
    image: "/images/products/epice-gourmande-recto.jpg",
    shortDesc: "Légumes poêlés, sauces & féculents",
  },
  {
    id: "pack-4-saveurs",
    name: "Le Pack Intégral : 4 Saveurs Sulson (4x100g)",
    category: "Coffret Dégustation",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    shortDesc: "L'assortiment complet 4x100g",
  },
];

interface ReviewItem {
  id: string;
  author: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Christelle M.",
    productId: "epice-poulet",
    productName: "Épice Spéciale Poulet (100g)",
    productImage: "/images/products/epice-poulet-recto.jpg",
    rating: 5,
    comment:
      "J'ai frotté un poulet fermier avec deux cuillères à soupe d'épices et un filet d'huile 1h avant la cuisson au four. La peau était dorée, croustillante et les saveurs délicatement parfumées sans être piquantes. Toute la famille a adoré.",
    date: "Il y a 3 jours",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Jean-Paul D.",
    productId: "epice-viande",
    productName: "Épice Spéciale Viande (100g)",
    productImage: "/images/products/epice-viande-recto.jpg",
    rating: 5,
    comment:
      "Ce mélange apporte une belle profondeur aromatique aux viandes rouges. On sent tout de suite la noblesse des épices et la fraîcheur du séchage. Rien à voir avec les assaisonnements industriels du commerce.",
    date: "Il y a 5 jours",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Nathalie B.",
    productId: "epice-poisson",
    productName: "Épice Spéciale Poisson (100g)",
    productImage: "/images/products/epice-poisson-recto.jpg",
    rating: 5,
    comment:
      "Une merveille ! L'équilibre entre les herbes et les épices relève le poisson sans jamais masquer sa finesse. Utilisé en marinade rapide avec du citron vert et un peu d'huile d'olive.",
    date: "Il y a 1 semaine",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Franck T.",
    productId: "pack-4-saveurs",
    productName: "Le Pack Intégral : 4 Saveurs Sulson (4x100g)",
    productImage: "/images/products/pack-4-saveurs-sulson.jpg",
    rating: 5,
    comment:
      "Reçu dans un emballage très soigné en 48h. Les 4 sachets hermétiques conservent parfaitement les arômes. C'est devenu mon indispensable en cuisine pour varier les plaisirs chaque jour.",
    date: "Il y a 2 semaines",
    verified: true,
  },
];

const STORAGE_KEY = "sulson_customer_reviews_v3";

function CustomerReviewsContent() {
  const searchParams = useSearchParams();
  const { addRating, ratingsMap } = useProductRatings();
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [selectedProductId, setSelectedProductId] = useState(SULSON_PRODUCTS[0].id);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch {
      // fallback
    }

    const qProduct = searchParams.get("product");
    const qName = searchParams.get("name");
    const qStars = searchParams.get("stars");

    if (qProduct) {
      const matched = SULSON_PRODUCTS.find(
        (p) => p.id === qProduct || p.name.toLowerCase().includes(qProduct.toLowerCase())
      );
      if (matched) {
        setSelectedProductId(matched.id);
      }
    }
    if (qName) setAuthorName(qName);
    if (qStars) {
      const parsedStars = parseInt(qStars, 10);
      if (parsedStars >= 1 && parsedStars <= 5) setRating(parsedStars);
    }
  }, [searchParams]);

  const currentProduct =
    SULSON_PRODUCTS.find((p) => p.id === selectedProductId) || SULSON_PRODUCTS[0];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      toast.error("Veuillez renseigner votre nom et votre avis.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Update global rating state
      addRating(currentProduct.id, rating);

      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        author: authorName.trim(),
        productId: currentProduct.id,
        productName: currentProduct.name,
        productImage: currentProduct.image,
        rating: rating,
        comment: commentText.trim(),
        date: "Aujourd'hui",
        verified: true,
      };

      const updated = [newReview, ...reviews];
      setReviews(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setShowSuccessMessage(true);
      toast.success("Votre avis a été publié avec succès !");

      // Reset
      setCommentText("");
    }, 400);
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((r) => r.productId === selectedFilter);

  // Live calculation of global average from ratingsMap
  const BASE_PRODUCT_KEYS = ["301", "302", "303", "304", "305"];
  const totalReviewsCount = BASE_PRODUCT_KEYS.reduce(
    (acc, id) => acc + (ratingsMap[id]?.ratingCount || 60),
    0
  );
  const totalWeightedScore = BASE_PRODUCT_KEYS.reduce(
    (acc, id) => acc + ((ratingsMap[id]?.ratingScore || 4.4) * (ratingsMap[id]?.ratingCount || 60)),
    0
  );
  const liveAverage = (totalWeightedScore / (totalReviewsCount || 1)).toFixed(1);

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen">
      {/* Single Centered Column */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Avis Clients
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            Découvrez les retours d&apos;expérience de nos clients et partagez votre avis sur les créations de la Maison Sulson.
          </p>

          {/* Simple Rating Summary Bar */}
          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <i key={s} className="hgi hgi-stroke hgi-star text-sm fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900">
              {liveAverage} / 5
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-gray-600">
              {totalReviewsCount} avis vérifiés
            </span>
          </div>
        </div>

        {/* Clean, Centered Review Form Card */}
        <div className="bg-gray-50/70 border border-gray-200/90 rounded-2xl p-5 sm:p-7 shadow-2xs mb-10">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200/60">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
              <i className="hgi hgi-stroke hgi-edit-02 text-primary text-base" />
              <span>Laisser un avis</span>
            </h2>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-xs text-emerald-600" />
              Avis vérifié
            </span>
          </div>

          {showSuccessMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2.5 text-xs">
              <i className="hgi hgi-stroke hgi-checkmark-circle-02 text-base text-emerald-600 shrink-0" />
              <span>Merci ! Votre avis a été pris en compte et publié ci-dessous.</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* 1. Nom & Prénom */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Nom et prénom *
              </label>
              <input
                type="text"
                required
                placeholder="Ex : Marie Dupont"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs transition-colors"
              />
            </div>

            {/* 2. Sélection du produit */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Produit sélectionné *
              </label>
              <div className="relative">
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs appearance-none transition-colors cursor-pointer"
                >
                  {SULSON_PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <i className="hgi hgi-stroke hgi-arrow-down-01 text-sm" />
                </div>
              </div>
            </div>

            {/* 3. Note étoilée */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Votre note *
              </label>
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-white border border-gray-300 shadow-2xs">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                      aria-label={`${star} étoiles sur 5`}
                    >
                      <i
                        className={`hgi hgi-stroke hgi-star text-lg ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-600 ml-2">
                  {hoverRating || rating} / 5
                </span>
              </div>
            </div>

            {/* 4. Commentaire */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Votre avis *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Racontez votre expérience : recettes testées, arômes, conseils d'utilisation..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs leading-relaxed transition-colors"
              />
            </div>

            {/* 5. Bouton Publier */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <i className="hgi hgi-stroke hgi-sent text-sm sm:text-base" />
                <span>{isSubmitting ? "Publication..." : "Publier mon avis"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Reviews Section Header & Filter */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-base font-bold text-gray-900">
              Témoignages récents
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              {filteredReviews.length} avis affichés
            </span>
          </div>

          {/* Simple Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-gray-900 text-white font-bold"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tous ({reviews.length})
            </button>
            {SULSON_PRODUCTS.map((prod) => {
              const count = reviews.filter((r) => r.productId === prod.id).length;
              return (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setSelectedFilter(prod.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                    selectedFilter === prod.id
                      ? "bg-gray-900 text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {prod.name.replace("Épice Spéciale ", "").replace(" (100g)", "").replace(" (4x100g)", "")} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3.5">
          <AnimatePresence>
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-gray-300 transition-colors"
              >
                {/* Header: Author, Verified, Rating & Date */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Achat vérifié
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      {rev.date}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i
                        key={s}
                        className={`hgi hgi-stroke hgi-star text-xs ${
                          rev.rating >= s ? "fill-amber-400 text-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Tag */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium mb-2.5">
                  <i className="hgi hgi-stroke hgi-package text-xs text-gray-500" />
                  <span>{rev.productName}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {rev.comment}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-sm text-gray-500">
          Chargement des avis...
        </div>
      }
    >
      <CustomerReviewsContent />
    </Suspense>
  );
}
