"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Leaf, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export default function StorySection() {
  const pillars = [
    {
      icon: <Leaf className="size-5 text-emerald-700" />,
      title: "100% Pur & Naturel",
      description:
        "Aucun additif, aucun conservateur ni exhausteur artificiel. Rien que des épices brutes séchées au soleil et moulues avec soin.",
    },
    {
      icon: <Sparkles className="size-5 text-amber-600" />,
      title: "Terroirs d'Origine Rares",
      description:
        "Une sélection minutieuse auprès de petits producteurs du Cameroun et des grands terroirs africains aux terres volcaniques fertiles.",
    },
    {
      icon: <ShieldCheck className="size-5 text-emerald-700" />,
      title: "Recettes Signatures Équilibrées",
      description:
        "Des assemblages prêts à l'emploi savamment dosés pour sublimer instantanément le poulet, la viande, le poisson et les légumes.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80">
              <Sparkles className="size-3.5 text-emerald-600" />
              <span>L'ÂME DE NOTRE MAISON</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              L'Art des Épices Nobles & le Goût des Saveurs Authentiques
            </h1>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-emerald-950/80 font-medium leading-relaxed">
              Née de l'amour de la gastronomie et de la richesse des terroirs africains, la maison{" "}
              <strong className="text-gray-900 font-bold">Les Épices de Sulson</strong> a été créée pour faire redécouvrir le plaisir incomparable d'une cuisine parfumée, saine et vibrante.
            </p>

            {/* Story text */}
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed pt-1">
              <p>
                Tout commence par un constat simple : les grands assaisonnements font les grands souvenirs. Au cœur des terres fertiles du Cameroun, le climat et les sols uniques donnent naissance à des baies, des racines et des écorces aux arômes d'une intensité inégalée — du poivre blanc de Penja au poivre de Guinée, en passant par le curcuma doré et le gingembre sauvage.
              </p>
              <p>
                Dans notre atelier, nous célébrons cette tradition en composant des mélanges artisanaux uniques. Chaque recette est travaillée pour trouver l'équilibre parfait entre force aromatique et délicatesse, sans jamais dénaturer le goût véritable de vos aliments.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all"
                >
                  <div className="size-9 rounded-xl bg-white shadow-2xs flex items-center justify-center border border-gray-100">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action link */}
            <div className="pt-2">
              <Link
                href="/#nos-epices"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-sm transition-all group cursor-pointer"
              >
                <span>Explorer nos créations d'épices</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: High-End Culinary Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 bg-gray-100">
              <Image
                src="/images/about/spice-heritage.jpg"
                alt="Sélection d'épices artisanales Les Épices de Sulson"
                width={700}
                height={550}
                className="w-full h-[420px] sm:h-[480px] object-cover"
                priority
              />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center gap-3.5">
                <div className="size-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <HeartHandshake className="size-6 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Savoir-Faire Artisanal & Terroirs d'Origine
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Mouture fraîche et emballage hermétique pour préserver 100% des huiles essentielles.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
