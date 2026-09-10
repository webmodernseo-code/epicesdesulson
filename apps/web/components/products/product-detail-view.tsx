"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type SulsonProductModel } from "@/lib/products-service";
import { useCart } from "@/context/cart-context";
import { useProductRatings } from "@/context/ratings-context";
import StarRating from "@/components/common/star-rating";
import { toast } from "sonner";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Leaf,
  Sparkles,
  ChefHat,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Flame,
  Clock,
  Heart,
  Share2,
} from "lucide-react";

interface ProductDetailViewProps {
  product: SulsonProductModel;
  relatedProducts: SulsonProductModel[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem } = useCart();
  const { getRating, addReview } = useProductRatings();

  // Ratings for current product
  const ratingData = getRating(Number(product.id) || 301);

  // Gallery state (switch between Recto / Verso)
  const [selectedImage, setSelectedImage] = useState<string>(
    product.imageRecto || "/images/products/pack-4-saveurs-sulson.jpg"
  );
  const [activeSide, setActiveSide] = useState<"recto" | "verso">("recto");

  // Keep gallery image synchronized when product prop changes
  React.useEffect(() => {
    setSelectedImage(product.imageRecto || "/images/products/pack-4-saveurs-sulson.jpg");
    setActiveSide("recto");
  }, [product.imageRecto, product.id]);

  // Selected format
  const [selectedFormat, setSelectedFormat] = useState(
    product.formats[0]?.label || "100g"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<
    "description" | "ingredients" | "recipes" | "delivery" | "reviews"
  >("description");

  // Review Form state
  const [reviewerName, setReviewerName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Price calculations
  const activeFormatObj =
    product.formats.find((f) => f.label === selectedFormat) ||
    product.formats[0];
  const currentPrice = activeFormatObj?.price || product.basePrice;
  const currentOldPrice = activeFormatObj?.oldPrice || product.baseOldPrice;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedFormat}`,
      title: `${product.title} (${selectedFormat})`,
      currentPrice: `${currentPrice.toFixed(2)} €`,
      image: product.imageRecto,
      pack: selectedFormat,
      quantity: quantity,
    });

    setIsAdded(true);
    toast.success(`${quantity}x ${product.title} ajouté au panier !`, {
      description: "Vous pouvez poursuivre vos achats ou finaliser votre commande.",
    });

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview(Number(product.id) || 301, {
      author: reviewerName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: "Aujourd'hui",
      verifiedPurchase: true,
    });

    setReviewSubmitted(true);
    toast.success("Merci ! Votre avis a été enregistré avec succès.");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* ── Breadcrumb Navigation ── */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-3.5">
        <div className="container">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/products" className="hover:text-emerald-700 transition-colors">
              Nos Épices
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container pt-6 sm:pt-12">
        {/* ── Main Product Presentation Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left Column: Media Gallery (Recto / Verso with ZERO zoom-crop) ── */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Stage Image Container */}
            <div className="relative w-full aspect-square max-h-[500px] rounded-3xl bg-linear-to-b from-gray-50 to-gray-100/70 border border-gray-200/90 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-xs">
              {/* Quality & Promo Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-xs whitespace-nowrap">
                  <Leaf className="w-3 h-3" />
                  100% Naturel
                </span>
                {currentOldPrice && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-xs whitespace-nowrap">
                    Économie de {(currentOldPrice - currentPrice).toFixed(2)} €
                  </span>
                )}
              </div>

              {/* Main Image with perfect object-contain framing */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  unoptimized
                  className="object-contain drop-shadow-md"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {/* Thumbnail Selectors (Recto Face & Verso Composition) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(product.imageRecto);
                  setActiveSide("recto");
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activeSide === "recto"
                    ? "border-emerald-700 bg-emerald-50/50 shadow-xs"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="relative size-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={product.imageRecto}
                    alt="Face Recto"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-900 block leading-tight whitespace-nowrap">
                    Face Avant (Recto)
                  </span>
                  <span className="text-[11px] text-gray-500 whitespace-nowrap">Packaging officiel</span>
                </div>
              </button>

              {product.imageVerso && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(product.imageVerso!);
                    setActiveSide("verso");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    activeSide === "verso"
                      ? "border-emerald-700 bg-emerald-50/50 shadow-xs"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="relative size-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={product.imageVerso}
                      alt="Face Verso"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-gray-900 block leading-tight whitespace-nowrap">
                      Face Arrière (Verso)
                    </span>
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">Ingrédients & Conseils</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* ── Right Column: Purchase & Gastronomic Details ── */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Category & Origin Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                {product.category}
              </span>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                {product.origin}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {product.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium mb-4">
              {product.subtitle}
            </p>

            {/* Verified Rating & Social Proof */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 pb-6 border-b border-gray-100">
              <StarRating rating={ratingData.ratingScore} />
              <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                {ratingData.ratingScore.toFixed(1)}/5
              </span>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                ({ratingData.ratingCount} avis vérifiés)
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full whitespace-nowrap sm:ml-auto">
                En Stock • Prêt à expédier
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50/90 border border-gray-200/80 mb-6 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2.5 sm:gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
                    {currentPrice.toFixed(2)} €
                  </span>
                  {currentOldPrice && (
                    <span className="text-base text-gray-400 line-through font-medium">
                      {currentOldPrice.toFixed(2)} €
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    TTC
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Livraison suivie Colissimo • Offerte dès 50 € d&apos;achat
                </p>
              </div>
            </div>

            {/* Format Selector */}
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2.5">
                Sélectionnez votre Conditionnement :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.formats.map((fmt) => (
                  <button
                    key={fmt.label}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.label)}
                    className={`p-3.5 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      selectedFormat === fmt.label
                        ? "border-emerald-700 bg-emerald-50/40 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                        {fmt.label}
                      </span>
                      <span className="text-xs font-black text-emerald-800 whitespace-nowrap">
                        {fmt.price.toFixed(2)} €
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 block">
                      {fmt.weightGrams}g d&apos;épices pures
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-gray-300 rounded-2xl px-4 py-3 sm:w-36 shrink-0 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="font-bold text-gray-700 hover:text-emerald-700 text-lg px-2 cursor-pointer"
                >
                  -
                </button>
                <span className="font-extrabold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="font-bold text-gray-700 hover:text-emerald-700 text-lg px-2 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Primary Add To Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer ${
                  isAdded
                    ? "bg-emerald-800 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {isAdded
                    ? "Ajouté au panier !"
                    : `Ajouter au Panier • ${(currentPrice * quantity).toFixed(2)} €`}
                </span>
              </button>
            </div>

            {/* Reassurance Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">100% Naturel • Zéro MSG</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">Expédition 24/48h Colissimo</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">Paiement Chiffré SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">Garantie Satisfait 14 Jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Navigation Section ── */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-gray-200 pb-4">
            {[
              { id: "description", label: "Description & Histoire" },
              { id: "ingredients", label: "Ingrédients & Bienfaits" },
              { id: "recipes", label: "Conseils & Accords Culinaires" },
              { id: "delivery", label: "Livraison & Retours" },
              { id: "reviews", label: `Avis Clients (${ratingData.ratingCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === "description" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base"
            >
              <h3 className="text-xl font-bold text-gray-900">
                L&apos;Authenticité des Terroirs Camerounais
              </h3>
              <p>{product.longDescription || product.description}</p>
              <p>
                Récolté et conditionné dans le respect des traditions gastronomiques ancestrales, chaque sachet garantit une fraîcheur maximale grâce à son opercule hermétique zippé. Les huiles essentielles naturelles restent intactes jusqu&apos;à votre assiette.
              </p>
            </motion.div>
          )}

          {/* Tab 2: Ingredients & Health */}
          {activeTab === "ingredients" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  Composition 100% Végétale
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-600" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200/80">
                <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Bienfaits pour votre Santé
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
                  {product.healthBenefits.map((ben, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Chef Recipes & Pairings */}
          {activeTab === "recipes" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200/80">
                <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-600" />
                  L&apos;Astuce Secrète du Chef Sulson
                </h4>
                <p className="text-sm text-amber-900 leading-relaxed font-medium">
                  {product.chefTip}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                  Accords Culinaires Recommandés
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.pairings.map((p, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-800 shadow-2xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Delivery & Returns */}
          {activeTab === "delivery" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-4 text-sm text-gray-700 leading-relaxed"
            >
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Délais et Modes de Livraison
                </h4>
                <p className="mb-2">
                  Toutes les commandes sont soigneusement préparées dans notre atelier et expédiées sous <strong>24h à 48h ouvrées</strong>.
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                  <li><strong>France métropolitaine :</strong> 48h à 72h via Colissimo Suivi La Poste.</li>
                  <li><strong>Livraison 100% Offerte :</strong> Dès 50 € d&apos;achat.</li>
                  <li><strong>Europe (Belgique, Suisse, etc.) :</strong> 3 à 5 jours ouvrés.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  Retours et Rétractation
                </h4>
                <p className="text-xs text-gray-600">
                  Vous disposez d&apos;un délai légal de <strong>14 jours</strong> après réception pour nous notifier un retour. Pour des raisons d&apos;hygiène alimentaire, les sachets doivent être intacts et scellés.
                </p>
              </div>
            </motion.div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {/* Existing Reviews List */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-gray-900">
                  Avis vérifiés de nos clients ({ratingData.ratingCount})
                </h4>
                {ratingData.reviews.slice(0, 5).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">
                          {rev.author}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Achat vérifié
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} />
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Partager votre expérience avec cette épice
                </h4>
                {reviewSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold text-center">
                    Merci ! Votre avis a été enregistré avec succès.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Votre Nom / Prénom
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="Ex: Marie L."
                          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Votre Note
                        </label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:border-emerald-600 focus:outline-none"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5/5) Exceptionnel</option>
                          <option value={4}>⭐⭐⭐⭐ (4/5) Très bon</option>
                          <option value={3}>⭐⭐⭐ (3/5) Bon</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Votre Commentaire culinaire
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Racontez comment vous avez cuisiné cette épice et ce que vous avez pensé du résultat..."
                        className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Publier mon avis
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Related Products Carousel / Grid ── */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-12">
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 text-center">
              Découvrez également nos autres mélanges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200/90 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 p-4 flex items-center justify-center">
                    <Image
                      src={rel.imageRecto}
                      alt={rel.title}
                      fill
                      unoptimized
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider truncate mb-0.5">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
                    {rel.title}
                  </h4>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-gray-950 whitespace-nowrap">
                      {rel.basePrice.toFixed(2)} €
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 whitespace-nowrap">
                      Voir la fiche <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
