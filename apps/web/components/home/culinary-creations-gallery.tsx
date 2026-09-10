"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Eye,
  Clock,
  Flame,
  Sparkles,
  X,
  ChevronRight,
  CheckCircle2,
  Share2,
  ZoomIn,
  ChefHat,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

export interface CulinaryItem {
  id: string;
  type: "image" | "video" | "poster";
  title: string;
  subtitle: string;
  category: "all" | "poisson" | "poulet" | "viande" | "video";
  categoryLabel: string;
  badge: {
    label: string;
    variant: "live" | "success" | "poster" | "video";
  };
  imageSrc: string;
  videoUrl?: string;
  time?: string;
  serving?: string;
  spiceUsed: {
    name: string;
    weight: string;
    link: string;
  };
  description: string;
  steps: string[];
  chefTip: string;
  healthBenefits?: string[];
}

const CULINARY_ITEMS: CulinaryItem[] = [
  {
    id: "poster-sulson-bienfaits",
    type: "poster",
    title: "La Cuisine de Sulson : Le goût qui prend soin de vous",
    subtitle: "Affiche officielle & charte qualité 100% naturelle",
    category: "all",
    categoryLabel: "Affiche Officielle",
    badge: {
      label: "🌿 100% Naturel • Sans Additifs",
      variant: "poster",
    },
    imageSrc: "/images/recipes/affiche-sulson-bienfaits.png",
    description:
      "La gamme complète Épices de Sulson allie plaisir gastronomique et bien-être au quotidien. Des formulations authentiques sans conservateurs, sans glutamate (MSG) et sans produits chimiques.",
    healthBenefits: [
      "Renforce l'immunité naturelle",
      "Facilite la digestion et apaise l'estomac",
      "Bon pour le cœur et riche en antioxydants",
      "Sans MSG, sans additifs ni arômes artificiels",
      "Idéal pour toute la famille et toutes les cuissons",
    ],
    spiceUsed: {
      name: "Pack Intégral 4 Saveurs Sulson",
      weight: "4x 100g (400g)",
      link: "/products/pack-integral-4-saveurs",
    },
    steps: [
      "Sélection rigoureuse des meilleures épices du terroir camerounais.",
      "Séchage traditionnel et mouture artisanale préservant les huiles essentielles.",
      "Conditionnement en sachet hermétique zippé pour une fraîcheur garantie.",
    ],
    chefTip:
      "Pour profiter au maximum des bienfaits des herbes et poivres rares, assaisonnez vos viandes et poissons 20 à 30 minutes avant cuisson.",
  },
  {
    id: "marinade-poisson-frais",
    type: "image",
    title: "Marinade Minute de Poissons Frais & Dorades",
    subtitle: "En direct du plan de travail : assaisonnement avant braise",
    category: "poisson",
    categoryLabel: "Poissons & Braises",
    badge: {
      label: "🔴 En direct de la cuisine",
      variant: "live",
    },
    imageSrc: "/images/recipes/marinade-poisson-frais-sulson.jpg",
    time: "20 min de marinade",
    serving: "4 personnes",
    description:
      "Préparation de bars et dorades fraîches au bol inox avec le mélange Sulson Poisson (50g) associé au Secret de Sulson (100g). Les incisions permettent aux épices de pénétrer la chair en profondeur.",
    spiceUsed: {
      name: "Épice Sulson Poisson & Secret de Sulson",
      weight: "50g & 100g",
      link: "/products/epice-poisson-50g",
    },
    steps: [
      "Nettoyer et entailler les poissons de 3 incisions diagonales par face.",
      "Mélanger 2 cuillères à soupe d'Épice Sulson Poisson avec 1 cuillère de Secret de Sulson et un filet d'huile.",
      "Masser généreusement l'intérieur et les incisions du poisson.",
      "Laisser reposer 20 minutes au frais avant de saisir sur braise vive ou au four à 200°C.",
    ],
    chefTip:
      "Ajoutez le jus d'un demi-citron vert juste avant de poser le poisson sur le grill pour fixer la marinade croustillante !",
  },
  {
    id: "poulet-fermier-roti",
    type: "image",
    title: "Poulet Fermier Rôti Doré aux Épices Nobles",
    subtitle: "Chair tendre et peau ultra-croustillante au four",
    category: "poulet",
    categoryLabel: "Volailles & Rôtis",
    badge: {
      label: "🔥 Plat Réussi",
      variant: "success",
    },
    imageSrc: "/images/recipes/poulet-roti-sulson.jpg",
    time: "50 min de cuisson",
    serving: "4 à 6 personnes",
    description:
      "Un rôti de volaille magnifiquement doré grâce au curcuma, au paprika doux et aux herbes aromatiques de l'Épice Sulson Poulet. Le jus de cuisson parfume délicatement la garniture.",
    spiceUsed: {
      name: "Épice de Sulson - Spéciale Poulet",
      weight: "100g",
      link: "/products/epice-poulet-100g",
    },
    steps: [
      "Badigeonner le poulet d'un mélange d'Épice Poulet Sulson, d'huile d'olive et d'une noisette de beurre mou.",
      "Glisser quelques brins de romarin et deux gousses d'ail à l'intérieur de la volaille.",
      "Enfourner à 190°C pendant 45 à 50 minutes en arrosant régulièrement avec le jus.",
      "Laisser reposer 10 minutes sous feuille d'aluminium avant de découper.",
    ],
    chefTip:
      "Arrosez le poulet avec son propre jus toutes les 15 minutes pour obtenir une peau dorée et une chair fondante à souhait.",
  },
  {
    id: "grillades-viande-suya",
    type: "image",
    title: "Brochettes de Bœuf & Grillades Braisées",
    subtitle: "Marinade sèche et fumet authentique au barbecue",
    category: "viande",
    categoryLabel: "Grillades & Viandes",
    badge: {
      label: "🔥 Braise & Barbecue",
      variant: "live",
    },
    imageSrc: "/images/recipes/grillades-viande-sulson.jpg",
    time: "15 min sur braise",
    serving: "4 personnes",
    description:
      "Tranches de bœuf et brochettes assaisonnées au rub d'épices Sulson Viande. La croûte d'épices caramélise sur la braise pour révéler des notes fumées et chaleureuses sans piquant agressif.",
    spiceUsed: {
      name: "Épice de Sulson - Spéciale Viande",
      weight: "100g",
      link: "/products/epice-viande-100g",
    },
    steps: [
      "Découper la viande en morceaux réguliers ou fines tranches.",
      "Enrober avec l'Épice Viande Sulson, une pincée de sel marin et un filet d'huile neutre.",
      "Enfiler sur des piques en bois préalablement trempées dans l'eau.",
      "Griller 3 à 4 minutes par face sur braises bien chaudes.",
    ],
    chefTip:
      "Ne piquez pas la viande pendant la cuisson pour préserver tous les sucs à l'intérieur des morceaux.",
  },
  {
    id: "tuto-video-poisson-braise",
    type: "video",
    title: "Démonstration Vidéo : Réussir son Poisson Braisé",
    subtitle: "Tuto pas-à-pas : dosage des épices et cuisson parfaite",
    category: "video",
    categoryLabel: "Tutos Vidéos",
    badge: {
      label: "🎬 Vidéo / Démonstration",
      variant: "video",
    },
    imageSrc: "/images/recipes/marinade-poisson-frais-sulson.jpg",
    time: "Vidéo 2 min",
    serving: "Tuto pas-à-pas",
    description:
      "Regardez en direct les gestes précis pour mariner un poisson entier avec les épices Sulson et obtenir ce goût fumé et savoureux typique des meilleures tables africaines.",
    spiceUsed: {
      name: "Duo Sulson Poisson + Secret 100g",
      weight: "Duo Épices",
      link: "/products/pack-integral-4-saveurs",
    },
    steps: [
      "Étape 1 : Préparation de la pâte d'épices avec huile et citron vert.",
      "Étape 2 : Imprégnation profonde dans la chair du poisson.",
      "Étape 3 : Cuisson au grill avec retournement unique.",
    ],
    chefTip:
      "Utilisez le reste de marinade tiédie comme sauce d'accompagnement sur vos bananes plantains ou riz parfumé.",
  },
];

const CATEGORIES = [
  { id: "all", label: "Toutes les créations" },
  { id: "poisson", label: "🐟 Poissons & Marinades" },
  { id: "poulet", label: "🍗 Volailles & Rôtis" },
  { id: "viande", label: "🥩 Grillades & Braises" },
  { id: "video", label: "🎬 Vidéos & Tutos" },
];

export default function CulinaryCreationsGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<CulinaryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? CULINARY_ITEMS
      : CULINARY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-14 md:py-20 bg-linear-to-b from-white via-gray-50/70 to-white border-t border-b border-gray-200/70 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-5 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-5 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>En Direct de la Cuisine Sulson</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
          >
            Nos Recettes & Préparations en Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm md:text-base text-gray-600 leading-relaxed"
          >
            Découvrez comment nos épices 100% naturelles transforment chaque ingrédient en un chef-d’œuvre culinaire : marinades fraîches, rôtisseries dorées et grillades savoureuses.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gray-900 text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isPoster = item.type === "poster";
              const isVideo = item.type === "video";

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group bg-white rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden ${
                    isPoster ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Media Container */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        isPoster ? "object-top" : "object-center"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs ${
                          item.badge.variant === "live"
                            ? "bg-rose-600/90 text-white"
                            : item.badge.variant === "poster"
                            ? "bg-emerald-700/90 text-white"
                            : item.badge.variant === "video"
                            ? "bg-indigo-600/90 text-white"
                            : "bg-amber-600/90 text-white"
                        }`}
                      >
                        {item.badge.label}
                      </span>
                    </div>

                    {/* Video Play / Zoom Button Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 text-gray-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                        {isVideo ? (
                          <Play className="w-5 h-5 fill-gray-900 text-gray-900 translate-x-0.5" />
                        ) : (
                          <ZoomIn className="w-5 h-5 text-gray-900" />
                        )}
                      </div>
                    </div>

                    {/* Time pill if applicable */}
                    {item.time && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/70 text-white text-xs font-medium backdrop-blur-xs">
                          <Clock className="w-3 h-3 text-amber-300" />
                          {item.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="font-semibold text-emerald-700 uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                        {item.serving && <span>{item.serving}</span>}
                      </div>

                      <h3
                        onClick={() => setSelectedItem(item)}
                        className="text-base font-bold text-gray-900 hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer mb-1.5"
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer with Spice Link and Details Trigger */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                        <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate max-w-[160px]">
                          {item.spiceUsed.name}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>{isVideo ? "Voir le tuto" : "Recette"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Community Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 bg-emerald-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-700/40 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold mb-2">
                <ChefHat className="w-3.5 h-3.5" />
                Communauté Gourmande Sulson
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                Vous cuisinez avec Les Épices de Sulson ?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Partagez vos photos et vidéos de plats sur Instagram ou WhatsApp avec le tag{" "}
                <strong className="text-amber-300">#LaCuisineDeSulson</strong> pour être mis à l&apos;honneur sur notre site !
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/33758249826?text=Bonjour%20Sulson,%20voici%20une%20photo%20de%20ma%20recette%20!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs md:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-gray-950" />
                <span>Envoyer ma photo</span>
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs md:text-sm transition-colors border border-white/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Découvrir les épices</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Lightbox / Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 border border-gray-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Fermer"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Media */}
              <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-gray-950">
                <Image
                  src={selectedItem.imageSrc}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-md">
                    {selectedItem.badge.label}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold text-emerald-700 uppercase tracking-wider">
                    {selectedItem.categoryLabel}
                  </span>
                  {selectedItem.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {selectedItem.time}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-4">
                  {selectedItem.subtitle}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {/* Health Benefits (if poster) */}
                {selectedItem.healthBenefits && (
                  <div className="mb-6 bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200/80">
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Les Bienfaits Santé Authentiques :
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedItem.healthBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-emerald-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preparation Steps */}
                {selectedItem.steps && selectedItem.steps.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-amber-600" />
                      Étapes de la Recette / Préparation :
                    </h4>
                    <div className="space-y-2.5">
                      {selectedItem.steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200/60 text-xs sm:text-sm text-gray-700"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chef Tip */}
                {selectedItem.chefTip && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Astuce du Chef Sulson :</strong>{" "}
                      <span>{selectedItem.chefTip}</span>
                    </div>
                  </div>
                )}

                {/* Modal Footer CTA */}
                <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-gray-500 block">
                      Épice utilisée pour cette recette :
                    </span>
                    <strong className="text-sm font-bold text-gray-900">
                      {selectedItem.spiceUsed.name} ({selectedItem.spiceUsed.weight})
                    </strong>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      href={selectedItem.spiceUsed.link}
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Commander cette épice</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
