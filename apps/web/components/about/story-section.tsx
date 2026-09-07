"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function StorySection() {
  const pillars = [
    {
      iconClass: "hgi-leaf-01",
      title: "100% Naturel & Pur",
      description:
        "Épices brutes séchées au soleil et moulues avec soin. Sans aucun conservateur ni exhausteur artificiel.",
    },
    {
      iconClass: "hgi-sparkles",
      title: "Terroirs Rares du Cameroun",
      description:
        "Sélection auprès de petits producteurs sur les terres volcaniques fertiles de Penja et du littoral.",
    },
    {
      iconClass: "hgi-shield-tick",
      title: "Assemblages Équilibrés",
      description:
        "Formules prêtes à l'emploi savamment dosées pour magnifier viandes, volailles, poissons et légumes.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              <i className="hgi hgi-stroke hgi-sparkles text-sm" />
              <span>L&apos;HISTOIRE DE NOTRE MAISON</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-light-primary-text tracking-tight leading-tight">
              L&apos;Art des Épices Nobles &amp; le Goût des Saveurs Authentiques
            </h1>

            <p className="text-base sm:text-lg text-light-primary-text font-medium leading-relaxed">
              Née de la passion culinaire et de l&apos;amour des terroirs africains, la maison{" "}
              <strong className="font-bold text-primary">Les Épices de Sulson</strong> fait redécouvrir le plaisir incomparable d&apos;une cuisine saine, parfumée et généreuse.
            </p>

            <div className="space-y-4 text-sm sm:text-base text-light-secondary-text leading-relaxed">
              <p>
                Tout commence par une conviction profonde : ce sont les grands assaisonnements qui créent les grands souvenirs. Au cœur des terres fertiles du Cameroun, le climat équatorial et les sols volcaniques donnent naissance à des baies, des racines et des écorces aux arômes uniques — du prestigieux poivre blanc de Penja au poivre sauvage de Guinée, en passant par le curcuma doré et le gingembre des forêts.
              </p>
              <p>
                Dans notre atelier, nous honorons ce patrimoine en élaborant des mélanges d&apos;épices artisanaux prêts à l&apos;emploi. Chaque composition est pensée pour apporter un équilibre parfait entre force aromatique et subtilité, sans jamais masquer le goût véritable de vos ingrédients.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="size-10 rounded-xl bg-white shadow-2xs flex items-center justify-center border border-gray-100 text-primary">
                    <i className={`hgi hgi-stroke ${item.iconClass} text-xl`} />
                  </div>
                  <h3 className="text-sm font-bold text-light-primary-text leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-light-secondary-text leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action link */}
            <div className="pt-2">
              <Link
                href="/#nos-epices"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-all shadow-sm group"
              >
                <span>Découvrir nos créations d&apos;épices</span>
                <i className="hgi hgi-stroke hgi-arrow-right-01 text-base group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Culinary Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
              <Image
                src="/images/about/spice-heritage.jpg"
                alt="Sélection d'épices artisanales Les Épices de Sulson"
                width={700}
                height={550}
                className="w-full h-[400px] sm:h-[480px] object-cover"
                priority
              />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-md flex items-center gap-3.5">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <i className="hgi hgi-stroke hgi-award-01 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-light-primary-text leading-tight">
                    Savoir-Faire Artisanal &amp; Fraîcheur
                  </h4>
                  <p className="text-[11px] text-light-secondary-text mt-0.5">
                    Mouture soignée et conditionnement hermétique pour préserver 100% des huiles essentielles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
