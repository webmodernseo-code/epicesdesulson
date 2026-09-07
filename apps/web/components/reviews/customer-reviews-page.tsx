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
    name: "Épice de Sulson — Spéciale Poulet",
    category: "Mélange Signature",
    image: "/images/products/epice-poulet-recto.jpg",
    shortDesc: "Volailles rôties, marinades & braisés",
  },
  {
    id: "epice-viande",
    name: "Épice de Sulson — Spéciale Viande",
    category: "Mélange Signature",
    image: "/images/products/epice-viande-recto.jpg",
    shortDesc: "Bœuf, agneau, grillades & mijotés",
  },
  {
    id: "epice-poisson",
    name: "Épice de Sulson — Spéciale Poisson",
    category: "Mélange Signature",
    image: "/images/products/epice-poisson-recto.jpg",
    shortDesc: "Poissons grillés, crevettes & papillotes",
  },
  {
    id: "epice-gourmande",
    name: "Épice de Sulson — Saveur Gourmande",
    category: "Mélange Doux",
    image: "/images/products/epice-gourmande-recto.jpg",
    shortDesc: "Légumes poêlés, sauces & féculents",
  },
  {
    id: "pack-4-saveurs",
    name: "Le Pack Intégral : 4 Saveurs Sulson",
    category: "Coffret Dégustation",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    shortDesc: "L'assortiment complet 4x100g",
  },
];

interface ReviewItem {
  id: string;
  author: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  recommended: boolean;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Christelle M.",
    productName: "Épice de Sulson — Spéciale Poulet",
    productImage: "/images/products/epice-poulet-recto.jpg",
    rating: 5,
    title: "Le poulet rôti du dimanche est transformé !",
    comment:
      "J'ai frotté un poulet fermier avec deux cuillères à soupe d'épices et un filet d'huile 1h avant la cuisson au four. La peau était dorée, croustillante et les saveurs délicatement parfumées sans être piquantes. Toute la famille a adoré.",
    date: "Il y a 3 jours",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-2",
    author: "Jean-Paul D. (Amateur de grillades)",
    productName: "Épice de Sulson — Spéciale Viande",
    productImage: "/images/products/epice-viande-recto.jpg",
    rating: 5,
    title: "Parfait pour les brochettes et côtes de bœuf",
    comment:
      "Ce mélange apporte une belle profondeur aromatique aux viandes rouges. On sent tout de suite la noblesse des épices et la fraîcheur du séchage. Rien à voir avec les assaisonnements industriels du commerce.",
    date: "Il y a 5 jours",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-3",
    author: "Nathalie B.",
    productName: "Épice de Sulson — Spéciale Poisson",
    productImage: "/images/products/epice-poisson-recto.jpg",
    rating: 5,
    title: "Sublime sur un bar grillé et des gambas",
    comment:
      "Une merveille ! L'équilibre entre les herbes et les épices relève le poisson sans jamais masquer sa finesse. Utilisé en marinade rapide avec du citron vert et un peu d'huile d'olive.",
    date: "Il y a 1 semaine",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-4",
    author: "Franck T.",
    productName: "Le Pack Intégral : 4 Saveurs Sulson",
    productImage: "/images/products/pack-4-saveurs-sulson.jpg",
    rating: 5,
    title: "Le coffret complet idéal pour cuisiner au quotidien",
    comment:
      "Reçu dans un emballage très soigné en 48h. Les 4 sachets hermétiques conservent parfaitement les arômes. C'est devenu mon indispensable en cuisine pour varier les plaisirs chaque jour.",
    date: "Il y a 2 semaines",
    verified: true,
    recommended: true,
  },
];

const RATING_LABELS: Record<number, string> = {
  1: "Décevant",
  2: "Moyen",
  3: "Conforme & Bon",
  4: "Très Savoureux",
  5: "Exceptionnel / Coup de cœur",
};

const STORAGE_KEY = "sulson_customer_reviews_v2";

function CustomerReviewsContent() {
  const searchParams = useSearchParams();
  const { addRating, getRating, ratingsMap } = useProductRatings();
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [selectedProductId, setSelectedProductId] = useState(SULSON_PRODUCTS[0].id);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [commentText, setCommentText] = useState("");
  const [recommended, setRecommended] = useState(true);
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
      // fallback to default
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

  const currentSelectedProduct =
    SULSON_PRODUCTS.find((p) => p.id === selectedProductId) || SULSON_PRODUCTS[0];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || !reviewTitle.trim()) {
      toast.error("Veuillez renseigner votre nom, le titre et votre commentaire.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Increment dynamic star rating and count across the site
      addRating(currentSelectedProduct.id, rating);

      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        author: authorName.trim(),
        productName: currentSelectedProduct.name,
        productImage: currentSelectedProduct.image,
        rating: rating,
        title: reviewTitle.trim(),
        comment: commentText.trim(),
        date: "Aujourd'hui",
        verified: true,
        recommended: recommended,
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
      toast.success("Merci ! Votre avis a été publié et pris en compte dans la note du produit.");

      // Reset fields
      setReviewTitle("");
      setCommentText("");
    }, 600);
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((r) => r.productName === selectedFilter);

  // Compute live global stats across all products in catalogue
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
    <div className="py-8 sm:py-12 bg-gray-50/40 min-h-screen">
      <div className="container">
        {/* Header Hero Banner (Clean, warm, gastronomy-focused) */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <i className="hgi hgi-stroke hgi-sparkles text-sm" />
                <span>EXPÉRIENCES &amp; AVIS CLIENTS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-light-primary-text tracking-tight">
                Avis &amp; Témoignages Culinaires
              </h1>
              <p className="text-xs sm:text-sm text-light-secondary-text leading-relaxed">
                Partagez vos astuces de cuisson, vos marinades et notez vos mélanges d&apos;épices préférés de la Maison Sulson.
              </p>
            </div>

            {/* Live Stats Score */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 shrink-0">
              <div className="text-center pr-4 border-r border-gray-200">
                <span className="text-3xl font-extrabold text-light-primary-text leading-none block">
                  {liveAverage}
                </span>
                <span className="text-[11px] text-light-disabled-text font-medium mt-0.5 block">
                  sur 5
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="hgi hgi-stroke hgi-star text-base fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-light-secondary-text font-medium">
                  <strong className="text-light-primary-text">{totalReviewsCount} avis vérifiés</strong> (100% authentiques)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Simple & Visual Review Form */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-xs sticky top-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <span className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <i className="hgi hgi-stroke hgi-edit-02 text-base" />
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-light-primary-text">
                    Déposer mon avis
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-xs text-emerald-600" />
                  Avis Vérifié
                </span>
              </div>

              {showSuccessMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                  <i className="hgi hgi-stroke hgi-checkmark-circle-02 text-lg text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-emerald-900">Merci pour votre retour gourmand !</p>
                    <p className="text-emerald-800">
                      Votre avis est maintenant publié dans la liste des témoignages ci-contre.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* 1. Select Product via Visual Cards */}
                <div>
                  <label className="block text-xs font-bold text-light-primary-text uppercase tracking-wider mb-2.5">
                    1. Choisissez l&apos;épice à évaluer *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SULSON_PRODUCTS.map((prod) => {
                      const isSelected = prod.id === selectedProductId;
                      const stat = getRating(prod.id);
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => setSelectedProductId(prod.id)}
                          className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-2xs"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="size-11 rounded-xl bg-white border border-gray-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                            <Image
                              src={prod.image}
                              alt={prod.name}
                              width={40}
                              height={40}
                              className="object-contain max-h-full max-w-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-light-primary-text block truncate leading-tight">
                                {prod.name.replace("Épice de Sulson — ", "")}
                              </span>
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-0.5">
                                <i className="hgi hgi-stroke hgi-star text-[10px] fill-amber-500 text-amber-500" />
                                {stat.ratingScore.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-[11px] text-light-disabled-text block truncate mt-0.5">
                              {prod.shortDesc} • {stat.ratingCount} avis
                            </span>
                          </div>
                          {isSelected && (
                            <i className="hgi hgi-stroke hgi-checkmark-circle-02 text-primary text-base shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Star Rating (Ideal icon sizing) */}
                <div>
                  <label className="block text-xs font-bold text-light-primary-text uppercase tracking-wider mb-2">
                    2. Votre note globale *
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200/80">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-115 cursor-pointer focus:outline-none"
                          aria-label={`Attribuer ${star} étoiles`}
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
                    <span className="text-xs font-bold text-light-primary-text border-l border-gray-200 pl-3">
                      {RATING_LABELS[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* 3. Name & Review Title */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-light-primary-text uppercase tracking-wider mb-1">
                      Votre prénom / nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sophie L."
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-light-primary-text focus:outline-none focus:border-primary shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-light-primary-text uppercase tracking-wider mb-1">
                      Titre de votre commentaire *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Parfait pour mes marinades et viandes grillées"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-light-primary-text focus:outline-none focus:border-primary shadow-2xs"
                    />
                  </div>
                </div>

                {/* 4. Detailed Comment */}
                <div>
                  <label className="block text-xs font-bold text-light-primary-text uppercase tracking-wider mb-1">
                    Votre avis détaillé *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Racontez votre expérience : arômes, recettes testées, accord avec vos plats..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-light-primary-text focus:outline-none focus:border-primary shadow-2xs leading-relaxed"
                  />
                </div>

                {/* 5. Recommendation */}
                <div className="p-3 bg-gray-50 border border-gray-200/80 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-light-primary-text flex items-center gap-1.5">
                    <i className="hgi hgi-stroke hgi-thumbs-up text-primary text-sm" />
                    Recommandez-vous cette épice ?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRecommended(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        recommended
                          ? "bg-primary text-white shadow-2xs"
                          : "bg-white text-light-secondary-text border border-gray-200"
                      }`}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecommended(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        !recommended
                          ? "bg-gray-800 text-white shadow-2xs"
                          : "bg-white text-light-secondary-text border border-gray-200"
                      }`}
                    >
                      Non
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-primary hover:bg-primary-dark text-white w-full py-3 rounded-full font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <i className="hgi hgi-stroke hgi-sent text-base" />
                  <span>{isSubmitting ? "Publication en cours..." : "Publier mon avis"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Verified Customer Reviews List */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            {/* Filter Buttons */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-bold text-xs uppercase tracking-wider text-light-primary-text flex items-center gap-1.5">
                  <i className="hgi hgi-stroke hgi-filter text-primary text-sm" />
                  Filtrer par création
                </span>
                <span className="text-xs text-light-disabled-text font-medium">
                  {filteredReviews.length} avis affichés
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    selectedFilter === "all"
                      ? "bg-primary text-white font-bold shadow-2xs"
                      : "bg-gray-50 text-light-secondary-text border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Tous ({reviews.length})
                </button>

                {SULSON_PRODUCTS.map((prod) => {
                  const count = reviews.filter((r) => r.productName === prod.name).length;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedFilter(prod.name)}
                      className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                        selectedFilter === prod.name
                          ? "bg-primary text-white font-bold shadow-2xs"
                          : "bg-gray-50 text-light-secondary-text border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {prod.name.replace("Épice de Sulson — ", "")} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reviews Cards */}
            <div className="space-y-3.5">
              <AnimatePresence>
                {filteredReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs hover:border-primary/40 transition-colors space-y-3"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-light-primary-text">
                            {rev.author}
                          </span>
                          {rev.verified && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-xs text-emerald-600" />
                              Achat Vérifié
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-light-disabled-text block mt-0.5">
                          {rev.date}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className={`hgi hgi-stroke hgi-star text-sm ${
                              rev.rating >= s ? "fill-amber-400 text-amber-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Pill */}
                    <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-xl">
                      <div className="size-6 rounded-lg bg-white overflow-hidden shrink-0 flex items-center justify-center border border-gray-100 p-0.5">
                        <Image
                          src={rev.productImage}
                          alt={rev.productName}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-light-primary-text">
                        {rev.productName}
                      </span>
                    </div>

                    {/* Title & Comment */}
                    <div>
                      <h4 className="font-bold text-sm text-light-primary-text mb-1">
                        « {rev.title} »
                      </h4>
                      <p className="text-xs sm:text-sm text-light-secondary-text leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    {/* Recommendation Footer */}
                    {rev.recommended && (
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                        <i className="hgi hgi-stroke hgi-thumbs-up text-sm" />
                        <span>Recommande ce mélange</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviewsPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-gray-500">Chargement des avis...</div>}>
      <CustomerReviewsContent />
    </Suspense>
  );
}
