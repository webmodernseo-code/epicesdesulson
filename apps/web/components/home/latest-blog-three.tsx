"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BlogGridCard from "../blog/blog-grid-card";
import BlogModal, { type BlogArticle } from "../blog/blog-modal";

const SPICE_GUIDES: BlogArticle[] = [
  {
    id: "epice-viande-recette",
    image: "/images/products/epice-viande-recto.jpg",
    category: "Secrets de Grillades",
    title: "Épice de Sulson - Viande : Grillades & Rôtis Parfaits",
    description:
      "Conseils du Chef : comment sublimer vos pièces de bœuf, agneau, porc et brochettes au barbecue ou au four.",
    paragraphs: [
      {
        heading: "L'harmonie du paprika et des épices nobles",
        text: "Assemblage voluptueux de paprika, ail, oignon, gingembre, poivre noir, muscade, girofle, thym et laurier pour une saveur intensément parfumée.",
      },
      {
        heading: "La marinade pour viandes rouges & brochettes",
        text: "Mélangez les épices avec un filet d'huile et un peu de jus de citron ou d'ail écrasé. Frottez la viande et laissez reposer 30 minutes avant de saisir à feu vif.",
      },
      {
        heading: "Astuce du Chef",
        text: "Pour un rôti fondant, ajoutez une cuillère d'épice viande dans votre fond de sauce en cours de mijotage.",
      },
    ],
    tip: "Idéal pour parfumer vos marinades, rôtis au four, sauces mijotées et barbecues du weekend !",
  },
  {
    id: "epice-poulet-recette",
    image: "/images/products/epice-poulet-recto.jpg",
    category: "Secrets de Volailles",
    title: "Épice de Sulson - Poulet : Marinades & Rôtis Parfaits",
    description:
      "Conseils du Chef : comment sublimer vos cuisses, filets et poulets entiers au four ou à la braise.",
    paragraphs: [
      {
        heading: "L'harmonie du curcuma et des épices nobles",
        text: "Mélange subtil de curcuma frais, paprika, ail, oignon, gingembre, muscade, poivre noir et coriandre pour une couleur dorée et une chair tendre et parfumée.",
      },
      {
        heading: "La marinade parfaite",
        text: "Massez généreusement la volaille avec l'épice Sulson, un filet d'huile, du jus de citron ou du yaourt. Laissez reposer 30 minutes avant de cuire à cœur.",
      },
    ],
    tip: "Arrosez régulièrement avec le jus de cuisson au four pour obtenir une peau croustillante et dorée !",
  },
  {
    id: "secret-sulson-gourmande",
    image: "/images/products/epice-gourmande-recto.jpg",
    category: "Secrets Gourmands",
    title: "Le Secret de Sulson : Saveurs Gourmandes d'Afrique",
    description:
      "Guide du Chef : comment utiliser cette déclinaison originale conçue à l'Africaine pour sublimer tous vos plats.",
    paragraphs: [
      {
        heading: "L'assemblage d'épices nobles",
        text: "Une déclinaison gourmande avec paprika doux, ail, oignon, gingembre, muscade, girofle, thym et laurier pour une saveur riche et authentique.",
      },
      {
        heading: "Conseils d'utilisation",
        text: "Ajoutez selon votre goût en cours de cuisson ou en marinade avec un filet d'huile et du citron pour révéler le vrai goût de vos créations culinaires.",
      },
    ],
    tip: "Polyvalent et parfumé, ce mélange sublime aussi bien les légumes mijotés que les sauces et grillades !",
  },
  {
    id: "epice-poisson-recette",
    image: "/images/products/epice-poisson-recto.jpg",
    category: "Recette Traditionnelle",
    title: "Poisson Braisé aux Épices de Sulson : Le Secret",
    description:
      "Recette authentique camerounaise : comment réussir la marinade parfaite pour poissons grillés, braisés et soupes.",
    paragraphs: [
      {
        heading: "La préparation de la marinade",
        text: "Mélangez 15g d'épice poisson Sulson avec un filet de jus de citron vert, un peu d'huile neutre, de l'ail et de l'oignon finement hachés.",
      },
      {
        heading: "Le temps de repos",
        text: "Entaillez le poisson frais et frottez généreusement la marinade. Laissez reposer 20 à 30 minutes au frais pour que les arômes de poivre de Guinée et gingembre pénètrent en profondeur.",
      },
    ],
    tip: "Faites braiser ou griller à feu moyen. Un pur délice avec des bananes plantains frites ou du manioc !",
  },
];

export default function LatestBlogThree() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section className="py-10">
      <div className="container">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 pb-3 border-b border-gray-200"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Conseils & Savoir-faire
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-0.5">
              Inspirations & Secrets d'Épices
            </h3>
          </div>
          <span className="text-xs text-gray-500 mt-1 sm:mt-0">
            Cliquez sur une fiche pour découvrir les astuces
          </span>
        </motion.div>

        {/* Horizontal Alternating Articles (Zig-Zag Layout) */}
        <div className="flex flex-col gap-y-8 sm:gap-y-10">
          {SPICE_GUIDES.map((guide, index) => {
            const isImageRight = index % 2 === 0;

            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group bg-white border border-gray-200 hover:border-primary/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`flex flex-col ${
                    isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-12 justify-between`}
                >
                  {/* Text Content Column */}
                  <div className="w-full lg:w-7/12 flex flex-col items-start justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-gray-900 bg-warning-light px-3.5 py-1 rounded-full shadow-2xs">
                        {guide.category}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        • Fiche Conseil & Recette
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h4>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                      {guide.description}
                    </p>

                    {/* Key Highlights / Paragraph Preview */}
                    <div className="w-full space-y-2.5 mb-6 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                      {guide.paragraphs.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <i className="hgi hgi-stroke hgi-tick-02 text-xs font-bold" />
                          </span>
                          <p className="text-xs sm:text-sm text-gray-700 leading-snug">
                            <strong className="text-gray-900 font-bold">{p.heading} :</strong>{" "}
                            {p.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(guide)}
                      className="btn btn-primary text-white font-bold text-sm sm:text-base rounded-full py-3 px-7 inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
                    >
                      <span>Consulter la recette complète</span>
                      <i className="hgi hgi-stroke hgi-arrow-right-02 text-lg" />
                    </button>
                  </div>

                  {/* Image Column */}
                  <div className="w-full lg:w-5/12 flex items-center justify-center">
                    <div
                      onClick={() => setSelectedArticle(guide)}
                      role="button"
                      tabIndex={0}
                      className="relative w-full max-w-[360px] h-[260px] sm:h-[300px] md:h-[340px] rounded-3xl bg-gray-50 p-4 flex items-center justify-center border border-gray-100 shadow-2xs group-hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        width={320}
                        height={320}
                        unoptimized
                        className="object-contain max-h-full max-w-full drop-shadow-lg scale-105 group-hover:scale-112 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] font-bold py-1 px-3 rounded-full shadow-xs flex items-center gap-1 border border-gray-200">
                        <i className="hgi hgi-stroke hgi-view text-xs text-primary" />
                        <span>Agrandir</span>
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
