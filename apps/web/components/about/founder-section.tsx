"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
  const commitments = [
    {
      iconClass: "hgi-award-01",
      title: "L'Exigence de la Fraîcheur",
      text: "Chaque formule d'assemblage est testée et affinée dans notre atelier afin de garantir une intensité aromatique intacte dès l'ouverture du sachet.",
    },
    {
      iconClass: "hgi-chef-hat",
      title: "L'Équilibre Culinaire",
      text: "Nos mélanges sont élaborés pour assaisonner viandes, poissons et légumes avec justesse : une cuillère suffit pour révéler toute la saveur de vos recettes.",
    },
    {
      iconClass: "hgi-heart-rounded",
      title: "La Passion du Partage",
      text: "Une aventure humaine guidée par l'envie de transmettre la richesse des terroirs africains et de faire de chaque repas un moment chaleureux et mémorable.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-50/70 border-t border-gray-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warning-lighter text-warning-darker text-xs font-bold">
            <i className="hgi hgi-stroke hgi-quote-up text-sm" />
            <span>L&apos;ÂME DE L&apos;ATELIER</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-light-primary-text tracking-tight">
            La Passion Culinaire &amp; le Savoir-Faire Artisanal
          </h2>

          <p className="text-sm sm:text-base text-light-secondary-text leading-relaxed">
            Derrière chaque flacon et chaque sachet d&apos;épices Sulson, découvrez l&apos;amour du terroir et le plaisir d&apos;une cuisine généreuse.
          </p>
        </div>

        {/* Main Founder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white">
              <Image
                src="/images/about/founder-atelier.jpg"
                alt="Atelier de création Les Épices de Sulson"
                width={650}
                height={550}
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-widest text-primary-light">
                    Maison Artisanale
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Les Épices de Sulson
                  </h3>
                  <p className="text-xs text-gray-300">
                    Créations d&apos;épices &amp; recettes signatures
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Box */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs relative">
              <i className="hgi hgi-stroke hgi-quote-up text-3xl text-primary/15 absolute top-4 right-4" />
              <p className="text-sm sm:text-base italic text-light-primary-text leading-relaxed relative z-10">
                « Cuisiner avec des épices d&apos;exception, ce n&apos;est pas seulement nourrir ceux qu&apos;on aime : c&apos;est leur offrir un voyage sensoriel, de la chaleur et des souvenirs partagés autour de la table. »
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-primary">
                  — Maison Les Épices de Sulson
                </span>
                <span className="text-light-disabled-text font-medium">Artisan créateur</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio and Commitments */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <i className="hgi hgi-stroke hgi-checkmark-circle-02 text-primary text-xl" />
                <h3 className="text-base sm:text-lg font-bold text-light-primary-text">
                  L&apos;Histoire d&apos;une Passion Gastronomique
                </h3>
              </div>

              <p className="text-sm sm:text-base text-light-secondary-text leading-relaxed">
                Bercée depuis l&apos;enfance par les parfums enivrants des marchés africains et les marmites familiales qui mijotaient de longues heures, j&apos;ai toujours été fascinée par la magie d&apos;une pincée d&apos;épices bien choisie.
              </p>

              <p className="text-sm sm:text-base text-light-secondary-text leading-relaxed">
                La maison <strong className="text-light-primary-text font-bold">Les Épices de Sulson</strong> est née de la volonté de rendre accessible à tous ce patrimoine d&apos;une richesse inouïe. Nous sélectionnons des épices pures de terroirs volcaniques pour créer des assemblages harmonieux qui subliment chaque plat en toute simplicité.
              </p>
            </div>

            {/* Commitments */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-light-disabled-text">
                Nos 3 Engagements Qualité
              </h4>
              <div className="space-y-3">
                {commitments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50/70 border border-gray-200/80 space-y-1.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-white shadow-2xs flex items-center justify-center border border-gray-100 shrink-0 text-primary">
                        <i className={`hgi hgi-stroke ${item.iconClass} text-lg`} />
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-light-primary-text">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-light-secondary-text leading-relaxed pl-10">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Contact Banner */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 text-left">
                <span className="size-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <i className="hgi hgi-stroke hgi-bubble-chat text-xl" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-light-primary-text">
                    Une question sur nos mélanges ou une recette ?
                  </h4>
                  <p className="text-[11px] text-light-secondary-text mt-0.5">
                    Notre équipe est à votre écoute pour vous conseiller.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors text-center shrink-0"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
