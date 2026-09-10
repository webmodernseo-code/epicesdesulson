"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogModal, { type BlogArticle } from "../blog/blog-modal";

const SPICE_GUIDES: BlogArticle[] = [
  {
    id: "epice-viande-recette",
    slug: "epice-viande-100g",
    image: "/images/products/epice-viande-recto.jpg",
    imageVerso: "/images/products/epice-viande-verso.jpg",
    category: "Secrets de Grillades & Rôtis",
    title: "Épice Sulson Viande : L'Art des Grillades & Rôtis Fondants",
    subtitle: "Pour Bœufs, Agneaux, Travers de Porc & Brochettes Suya",
    description:
      "Découvrez comment sublimer vos pièces de viande au barbecue, à la poêle ou au four avec un assemblage chaleureux au paprika doux, poivre noir de Penja et aromates sauvages.",
    price: 6.90,
    weight: "100g",
    origin: "Cameroun (Recette Traditionnelle)",
    ingredients: [
      "Paprika doux & fumé",
      "Poivre noir de Penja IGP",
      "Ail rôti & Oignon séché",
      "Gingembre sauvage",
      "Clous de girofle moulus",
      "Feuilles de laurier broyées",
      "Thym & Muscade râpée",
    ],
    cookingSteps: [
      {
        step: 1,
        title: "La Marinade Express (15 à 30 min)",
        description:
          "Mélangez 2 cuillères à café d'épice avec un filet d'huile d'olive ou d'arachide, et le jus d'un demi-citron vert.",
      },
      {
        step: 2,
        title: "Le Massage & Imprégnation",
        description:
          "Frottez généreusement la viande sur toutes les faces pour faire pénétrer les arômes jusqu'au cœur des fibres.",
      },
      {
        step: 3,
        title: "La Cuisson & Caramélisation",
        description:
          "Saisissez à feu vif sur les braises ou dans une poêle bien chaude pour former une croûte parfumée et croustillante.",
      },
      {
        step: 4,
        title: "La Finition en Sauces Mijotées",
        description:
          "Pour vos ragoûts et plats en sauce, ajoutez une demi-cuillère en cours de mijotage pour lier les sucs.",
      },
    ],
    pairings: [
      "Côtes de bœuf grillées",
      "Brochettes Suya camerounaises",
      "Gigot d'agneau rôti",
      "Ragoûts & Mijotés",
    ],
    tip: "Ne salez pas à l'excès : les arômes intenses de notre mélange révèlent naturellement le goût authentique de la viande sans artifice !",
  },
  {
    id: "epice-poulet-recette",
    slug: "epice-poulet-100g",
    image: "/images/products/epice-poulet-recto.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    category: "Secrets de Volailles & Braises",
    title: "Épice Sulson Poulet : Poulet Braisé Doré & Volaille Juteuse",
    subtitle: "Rôtis au four, Ailes marinées & Braise à l'Africaine",
    description:
      "L'harmonie parfaite du curcuma de terroir frais, paprika noble, ail et gingembre pour une couleur dorée éclatante et une chair tendre, fondante et parfumée à cœur.",
    price: 6.90,
    weight: "100g",
    origin: "Cameroun (Recette Traditionnelle)",
    ingredients: [
      "Curcuma frais moulu",
      "Paprika doux noble",
      "Gingembre artisanal",
      "Ail & Oignon en poudre",
      "Noix de muscade",
      "Poivre noir moulu",
      "Graines de coriandre",
    ],
    cookingSteps: [
      {
        step: 1,
        title: "La Préparation de la Volaille",
        description:
          "Pratiquez de légères incisions sur les cuisses ou la poitrine du poulet pour faciliter la pénétration des épices.",
      },
      {
        step: 2,
        title: "La Marinade Onctueuse",
        description:
          "Délayez 2 cuillères d'épice poulet dans 2 cuillères d'huile avec une touche de yaourt nature ou de moutarde douce.",
      },
      {
        step: 3,
        title: "Le Repos au Frais",
        description:
          "Laissez reposer au réfrigérateur pendant 30 minutes (ou toute une nuit pour un résultat exceptionnel).",
      },
      {
        step: 4,
        title: "La Cuisson Dorée",
        description:
          "Enfournez à 190°C ou posez sur le grill en arrosant régulièrement avec le jus de cuisson.",
      },
    ],
    pairings: [
      "Poulet rôti du dimanche",
      "Cuisses de poulet à la braise",
      "Ailes marinées au four",
      "Émincés de dinde sautés",
    ],
    tip: "Arrosez votre poulet avec son propre jus toutes les 15 minutes au four pour obtenir une peau croustillante irrésistible !",
  },
  {
    id: "secret-sulson-gourmande",
    slug: "secret-de-sulson-100g",
    image: "/images/products/epice-gourmande-recto.jpg",
    imageVerso: "/images/products/epice-gourmande-verso.jpg",
    category: "Assaisonnement Universel",
    title: "Le Secret de Sulson : L'Assaisonnement Magique Tout-en-Un",
    subtitle: "Sauces, Légumes Sautés, Riz Parfumé & Féculents",
    description:
      "L'assemblage signature de la maison Sulson : 12 épices nobles torréfiées conçues à l'Africaine pour rehausser instantanément vos repas du quotidien.",
    price: 6.90,
    weight: "100g",
    origin: "Cameroun (Le Secret de Sulson)",
    ingredients: [
      "12 Épices précieuses camerounaises",
      "Curcuma doux & Paprika",
      "Ail blanc & Échalote séchée",
      "Gingembre & Poivres rares",
      "Aromates fins 100% naturels",
    ],
    cookingSteps: [
      {
        step: 1,
        title: "L'Assaisonnement Direct",
        description:
          "Saupoudrez 1 cuillère à café directement sur vos poêlées de légumes, sauces tomate ou gratins pendant la cuisson.",
      },
      {
        step: 2,
        title: "Dans l'Eau de Cuisson du Riz",
        description:
          "Ajoutez une demi-cuillère dans l'eau bouillante de votre riz basmati ou pilaf pour lui donner un parfum envoûtant.",
      },
      {
        step: 3,
        title: "En Vinaigrette & Sauces Apéro",
        description:
          "Incorporez une pincée dans vos vinaigrettes maison ou sauces au fromage blanc pour tremper des légumes croquants.",
      },
      {
        step: 4,
        title: "Remplacement Malin du Bouillon Cube",
        description:
          "Remplacez avantageusement les cubes industriels saturés de glutamate par une cuillère de Secret de Sulson 100% sain.",
      },
    ],
    pairings: [
      "Riz parfumé & Pilaf",
      "Sauces tomate mijotées",
      "Poêlées de légumes & Woks",
      "Gratins de pâtes & pommes de terre",
    ],
    tip: "Véritable touche magique en fin de cuisson : une simple pincée transforme une simple poêlée de légumes en plat de fête !",
  },
  {
    id: "epice-poisson-recette",
    slug: "epice-poisson-100g",
    image: "/images/products/epice-poisson-recto.jpg",
    imageVerso: "/images/products/epice-poisson-verso.jpg",
    category: "Spécialité Marine & Braises",
    title: "Poisson Braisé aux Épices de Sulson : Le Secret Maritime",
    subtitle: "Bars, Dorades, Tilapias, Saumons & Gambas Braisées",
    description:
      "Le secret des grands maîtres braiseurs : l'arôme authentique du poivre de Guinée (maniguette), thym citronné, ail et herbes côtières qui magnifient les poissons sans masquer leur finesse.",
    price: 6.90,
    weight: "100g",
    origin: "Cameroun (Poivre de Guinée)",
    ingredients: [
      "Poivre de Guinée (Maniguette)",
      "Rondelles & Pèbè traditionnel",
      "Ail & Gingembre séché",
      "Thym citronné",
      "Céleri & Graines aromatiques",
      "Herbes locales du littoral",
    ],
    cookingSteps: [
      {
        step: 1,
        title: "La Préparation du Poisson Frais",
        description:
          "Écaillez, videz et faites 3 belles entailles transversales sur chaque flanc du poisson.",
      },
      {
        step: 2,
        title: "La Marinade Maritime",
        description:
          "Mélangez 15g d'épice poisson avec du jus de citron vert frais, un peu d'huile neutre et une pointe d'ail écrasé.",
      },
      {
        step: 3,
        title: "L'Enduit Intérieur & Extérieur",
        description:
          "Badigeonnez l'intérieur du ventre et les incisions. Laissez mariner 20 à 30 minutes au frais.",
      },
      {
        step: 4,
        title: "La Braise & Cuisson",
        description:
          "Grillez sur braises douces ou enfournez à 200°C pendant 20 minutes en badigeonnant d'huile parfumée.",
      },
    ],
    pairings: [
      "Bar & Dorade braisés à la flamme",
      "Papillotes de saumon",
      "Gambas poêlées à l'ail",
      "Soupes & Bouillons de poisson",
    ],
    tip: "Servez avec des bananes plantains frites (alloco), du manioc à la vapeur et une tranche de citron vert pour un voyage culinaire total !",
  },
];

export default function LatestBlogThree() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section className="py-12 sm:py-16 bg-gray-50/50">
      <div className="container">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 pb-4 border-b border-gray-200"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Savoir-Faire & Gastronomie
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-950 mt-1">
              Inspirations, Recettes & Secrets d'Épices
            </h3>
          </div>
          <span className="text-xs text-gray-500 mt-2 sm:mt-0 font-medium">
            Cliquez sur un guide pour ouvrir la fiche recette pas à pas
          </span>
        </motion.div>

        {/* Horizontal Alternating Articles (Zig-Zag Layout) */}
        <div className="flex flex-col gap-y-8 sm:gap-y-12">
          {SPICE_GUIDES.map((guide, index) => {
            const isImageRight = index % 2 === 0;

            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white border border-gray-200 hover:border-primary/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`flex flex-col ${
                    isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-12 justify-between`}
                >
                  {/* Text Content Column */}
                  <div className="w-full lg:w-7/12 flex flex-col items-start justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full shadow-2xs">
                        {guide.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">
                        • 100% Naturel
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-950 leading-tight mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h4>

                    {guide.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-primary mb-3">
                        {guide.subtitle}
                      </p>
                    )}

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                      {guide.description}
                    </p>

                    {/* Step Preview Snippets */}
                    {guide.cookingSteps && (
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                        {guide.cookingSteps.slice(0, 2).map((st) => (
                          <div key={st.step} className="flex items-start gap-2">
                            <span className="size-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {st.step}
                            </span>
                            <p className="text-xs text-gray-700 leading-snug">
                              <strong className="text-gray-900 font-bold">{st.title} :</strong>{" "}
                              {st.description.slice(0, 75)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(guide)}
                        className="btn btn-primary text-white font-bold text-xs sm:text-sm rounded-full py-3 px-6 inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>Découvrir la recette complète</span>
                        <i className="hgi hgi-stroke hgi-arrow-right-02 text-base" />
                      </button>

                      <Link
                        href={`/products/${guide.slug}`}
                        className="py-3 px-5 text-xs sm:text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:border-primary hover:text-primary rounded-full transition-all inline-flex items-center gap-1.5"
                      >
                        <i className="hgi hgi-stroke hgi-shopping-bag-01 text-sm" />
                        <span>Fiche Produit (6,90 €)</span>
                      </Link>
                    </div>
                  </div>

                  {/* Image Column: Clean Uncropped Display */}
                  <div className="w-full lg:w-5/12 flex items-center justify-center">
                    <div
                      onClick={() => setSelectedArticle(guide)}
                      role="button"
                      tabIndex={0}
                      className="relative w-full max-w-[360px] h-[280px] sm:h-[320px] rounded-3xl bg-linear-to-b from-gray-50 to-amber-50/30 p-6 flex items-center justify-center border border-gray-200/80 shadow-2xs group-hover:border-primary/40 transition-all cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        width={280}
                        height={280}
                        unoptimized
                        className="object-contain max-h-full max-w-full drop-shadow-md scale-100 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-gray-800 text-[11px] font-bold py-1 px-3 rounded-full shadow-xs flex items-center gap-1 border border-gray-200">
                        <i className="hgi hgi-stroke hgi-view text-xs text-primary" />
                        <span>Ouvrir la fiche</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* In-page Popup Modal */}
      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
