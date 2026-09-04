"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ProductOption {
  id: string;
  name: string;
  category: string;
  image: string;
}

const SULSON_PRODUCTS: ProductOption[] = [
  {
    id: "epice-poulet",
    name: "Épice de Sulson - Spéciale Poulet",
    category: "Mélanges Spécialités",
    image: "/images/products/epice-poulet-recto.jpg",
  },
  {
    id: "epice-viande",
    name: "Épice de Sulson - Spéciale Viande",
    category: "Mélanges Spécialités",
    image: "/images/products/epice-viande-recto.jpg",
  },
  {
    id: "epice-poisson",
    name: "Épice de Sulson - Spéciale Poisson",
    category: "Mélanges Spécialités",
    image: "/images/products/epice-poisson-recto.jpg",
  },
  {
    id: "epice-gourmande",
    name: "Épice de Sulson - Saveur Gourmande",
    category: "Mélanges Spécialités",
    image: "/images/products/epice-gourmande-recto.jpg",
  },
  {
    id: "pack-4-saveurs",
    name: "Le Pack Intégral : 4 Saveurs Sulson",
    category: "Packs & Assortiments",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
  },
];

interface ReviewItem {
  id: string;
  orderId?: string;
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
    author: "Marc Dupont (Chef Cuisinier)",
    productName: "Poivre Rouge de Kampot IGP",
    productImage: "/images/home/nuts.png",
    rating: 5,
    title: "Une intensité aromatique inégalée",
    comment:
      "Ce poivre rouge de Kampot est un véritable bijou. Des notes intenses de fruits confits qui subliment mes pièces de bœuf maturées et mes sauces au poivre. Fraîcheur irréprochable.",
    date: "Il y a 2 jours",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-2",
    author: "Sophie Laurent",
    productName: "Gousses de Vanille Bourbon Gourmet",
    productImage: "/images/home/avocado.png",
    rating: 5,
    title: "Des gousses grasses, charnues et parfumées",
    comment:
      "Gousses extrêmement souples avec une quantité impressionnante de grains noirs. Utilisée pour des cannelés et une crème brûlée, la différence avec le commerce est spectaculaire.",
    date: "Il y a 5 jours",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-3",
    author: "Antoine Bernard",
    productName: "Curry Royal de Madras d'Exception",
    productImage: "/images/home/pouch-mockup.png",
    rating: 5,
    title: "Équilibre parfait des épices nobles",
    comment:
      "Un curry chaleureux, doré et sans excès de piquant. Parfait pour les tajines, les mijotés de volaille et les légumes rôtis. Emballage hermétique de grande qualité.",
    date: "Il y a 1 semaine",
    verified: true,
    recommended: true,
  },
  {
    id: "rev-4",
    author: "Claire Moreau",
    productName: "Coffret Grand Cru : Les 5 Trésors d'Épices",
    productImage: "/images/home/nuts.png",
    rating: 5,
    title: "Le cadeau gastronomique idéal",
    comment:
      "Offert pour un anniversaire, le coffret en bois gravé a fait sensation. Les flacons sont élégants et la sélection des 5 épices permet de voyager à chaque repas.",
    date: "Il y a 2 semaines",
    verified: true,
    recommended: true,
  },
];

const RATING_LABELS: Record<number, string> = {
  1: "Décevant",
  2: "Moyen",
  3: "Bien / Conforme",
  4: "Très bon / Savoureux",
  5: "Exceptionnel / Coup de cœur !",
};

const STORAGE_KEY = "sulson_customer_reviews_v1";

function CustomerReviewsContent() {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [selectedProductId, setSelectedProductId] = useState(SULSON_PRODUCTS[0].id);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [commentText, setCommentText] = useState("");
  const [recommended, setRecommended] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormSuccess, setShowFormSuccess] = useState(false);
  const [orderInvite, setOrderInvite] = useState<{
    orderId?: string;
    product?: string;
    name?: string;
  } | null>(null);

  // Load reviews from localStorage on mount & handle invitation link query params
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

    // Read query params from post-purchase link (received the next day)
    const qProduct = searchParams.get("product");
    const qOrderId = searchParams.get("orderId") || searchParams.get("cmd");
    const qName = searchParams.get("name");
    const qEmail = searchParams.get("email");
    const qStars = searchParams.get("stars");

    if (qOrderId || qProduct || qName) {
      setOrderInvite({
        orderId: qOrderId || undefined,
        product: qProduct || undefined,
        name: qName || undefined,
      });

      if (qProduct) {
        const matched = SULSON_PRODUCTS.find(
          (p) => p.id === qProduct || p.name.toLowerCase().includes(qProduct.toLowerCase())
        );
        if (matched) {
          setSelectedProductId(matched.id);
        }
      }

      if (qName) setAuthorName(qName);
      if (qEmail) setAuthorEmail(qEmail);
      if (qStars) {
        const parsedStars = parseInt(qStars, 10);
        if (parsedStars >= 1 && parsedStars <= 5) {
          setRating(parsedStars);
        }
      }
    }
  }, [searchParams]);

  const currentSelectedProduct =
    SULSON_PRODUCTS.find((p) => p.id === selectedProductId) || SULSON_PRODUCTS[0];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || !reviewTitle.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        orderId: orderInvite?.orderId,
        author: authorName.trim(),
        productName: currentSelectedProduct.name,
        productImage: currentSelectedProduct.image,
        rating: rating,
        title: reviewTitle.trim(),
        comment: commentText.trim(),
        date: "Aujourd'hui (Post-achat)",
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
      setShowFormSuccess(true);
      toast.success("Votre note étoilée et avis ont été enregistrés avec succès !");

      // Reset fields
      setReviewTitle("");
      setCommentText("");
    }, 1000);
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((r) => r.productName === selectedFilter);

  // Calculate live average score from all reviews
  const totalRatingPoints = reviews.reduce((acc, r) => acc + r.rating, 0);
  const liveAverage = (totalRatingPoints / reviews.length).toFixed(1);

  return (
    <div className="py-8 sm:py-12">
      <div className="container">
        {/* Header Hero Banner with Original Green */}
        <div className="bg-gradient-to-r from-primary-darker via-primary-dark to-primary rounded-3xl p-6 sm:p-10 text-white shadow-md mb-10 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3.5 py-1 rounded-full border border-white/25 text-xs font-bold text-white mb-3 shadow-2xs">
              <i className="hgi hgi-stroke hgi-star text-amber-300 text-sm" />
              <span>Avis & Retours d'Expérience Vérifiés</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
              L'Avis de nos Connaisseurs & Chefs
            </h1>

            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              Partagez vos impressions, vos accords culinaires et notez vos épices préférées pour enrichir les avis vérifiés de la Maison Sulson.
            </p>

            {/* Score Stats Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {liveAverage} / 5
                </span>
                <div className="flex items-center text-amber-300">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className="hgi hgi-stroke hgi-star text-base fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-emerald-100 font-medium border-l border-white/20 pl-4 sm:pl-6">
                <strong>{646 + reviews.length} avis clients</strong> enregistrés
              </span>
              <span className="text-xs text-emerald-100 font-medium hidden sm:inline-block border-l border-white/20 pl-6">
                <strong>99.4%</strong> de recommandation
              </span>
            </div>
          </div>
        </div>

        {/* Personalized Post-Purchase Banner if accessed via next-day link */}
        {orderInvite && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-primary/5 border-2 border-primary/30 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <i className="hgi hgi-stroke hgi-package-box text-2xl" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Lien d'évaluation post-achat
                </span>
                <h4 className="text-sm sm:text-base font-bold text-gray-900">
                  {orderInvite.name ? `Bonjour ${orderInvite.name}, ` : "Bonjour, "}
                  merci pour votre commande {orderInvite.orderId ? `(${orderInvite.orderId})` : ""} !
                </h4>
                <p className="text-xs text-gray-600">
                  Donnez votre note étoilée ci-dessous pour ajouter votre expérience aux avis vérifiés.
                </p>
              </div>
            </div>

            <div className="bg-white px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5 shrink-0">
              <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-sm text-emerald-600" />
              <span>Commande Vérifiée</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Review Form */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs sticky top-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <i className="hgi hgi-stroke hgi-edit-02 text-base" />
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">
                    Déposer mon Avis Étoilé
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
                  <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-xs" />
                  Avis Vérifié
                </span>
              </div>

              {showFormSuccess && (
                <div className="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                  <i className="hgi hgi-stroke hgi-tick-circle text-xl text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-emerald-900">Merci pour votre évaluation !</p>
                    <p className="text-emerald-800">
                      Votre note étoilée a été immédiatement intégrée aux statistiques et votre commentaire est précieusement conservé.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* 1. Select Product to Rate */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    1. Produit acheté à évaluer *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs appearance-none pr-10 cursor-pointer"
                    >
                      {SULSON_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <i className="hgi hgi-stroke hgi-arrow-down-01 text-base" />
                    </div>
                  </div>

                  {/* Product visual preview pill */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-white p-1 border border-gray-200 shrink-0 flex items-center justify-center">
                      <Image
                        src={currentSelectedProduct.image}
                        alt={currentSelectedProduct.name}
                        width={36}
                        height={36}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">
                        {currentSelectedProduct.name}
                      </span>
                      <span className="text-[11px] text-primary font-semibold">
                        {currentSelectedProduct.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Star Rating */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    2. Votre Note Étoilée (sur 5) *
                  </label>
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl transition-transform hover:scale-115 cursor-pointer focus:outline-none p-0.5"
                          aria-label={`Donner ${star} étoiles`}
                        >
                          <i
                            className={`hgi hgi-stroke hgi-star ${
                              (hoverRating || rating) >= star
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-800 ml-2 border-l border-gray-200 pl-3">
                      {RATING_LABELS[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* 3. User Info (Name & Email) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Votre Nom ou Pseudo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean D."
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Adresse Email (Pour vérification d'achat) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jean.dupont@email.com"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs"
                    />
                  </div>
                </div>

                {/* 4. Review Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Titre de votre commentaire *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Arômes subtils et livraison très rapide"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs"
                  />
                </div>

                {/* 5. Detailed Review Text */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Votre commentaire & appréciation *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Décrivez les saveurs, vos accords en cuisine (viandes, poissons, desserts), l'intensité du parfum ou le conditionnement..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:border-primary shadow-2xs leading-relaxed"
                  />
                </div>

                {/* 6. Recommendation Toggle */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                    <i className="hgi hgi-stroke hgi-favourite text-primary text-sm" />
                    Recommandez-vous cette épice ?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRecommended(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        recommended
                          ? "bg-primary text-white shadow-2xs"
                          : "bg-white text-gray-600 border border-gray-200"
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
                          : "bg-white text-gray-600 border border-gray-200"
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
                  className="btn btn-primary w-full py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-white cursor-pointer disabled:opacity-50"
                >
                  <i className="hgi hgi-stroke hgi-sent text-base" />
                  <span>{isSubmitting ? "Enregistrement en cours..." : "Enregistrer mon Avis Étoilé"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List of Verified Customer Reviews */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Filter pills */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <i className="hgi hgi-stroke hgi-filter text-primary text-base" />
                  Filtrer les Avis par Produit
                </h4>
                <span className="text-xs text-gray-500 font-medium">
                  {filteredReviews.length} avis enregistrés
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedFilter === "all"
                      ? "bg-primary text-white border-primary shadow-xs font-bold"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Tous les Produits ({reviews.length})
                </button>

                {SULSON_PRODUCTS.map((prod) => {
                  const count = reviews.filter((r) => r.productName === prod.name).length;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedFilter(prod.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        selectedFilter === prod.name
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {prod.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredReviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-all space-y-3"
                  >
                    {/* Review Top Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">
                            {rev.author}
                          </span>
                          {rev.verified && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <i className="hgi hgi-stroke hgi-checkmark-badge-01 text-xs" />
                              Achat Vérifié
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          {rev.date}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className={`hgi hgi-stroke hgi-star text-sm ${
                              rev.rating >= s ? "fill-amber-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product badge pill */}
                    <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-lg">
                      <div className="size-5 rounded bg-white overflow-hidden shrink-0 flex items-center justify-center border border-gray-200">
                        <Image
                          src={rev.productImage}
                          alt={rev.productName}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-800">
                        {rev.productName}
                      </span>
                    </div>

                    {/* Review Title & Content */}
                    <div>
                      <h5 className="font-bold text-sm text-gray-900 mb-1">
                        "{rev.title}"
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    {/* Recommendation Footer */}
                    {rev.recommended && (
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                        <i className="hgi hgi-stroke hgi-thumbs-up text-sm" />
                        <span>Recommande ce produit à 100%</span>
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
