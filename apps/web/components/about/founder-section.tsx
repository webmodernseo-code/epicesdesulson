"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Quote, Utensils, Award, MessageCircle, Heart, CheckCircle2 } from "lucide-react";

/**
 * Placeholder Tag Component
 * Displays customizable fields in a clean, highlighted badge format
 * so the user can easily identify and replace them with their real personal info.
 */
function SlotTag({ text, helper }: { text: string; helper?: string }) {
  return (
    <span
      className="inline-flex items-baseline px-2.5 py-0.5 mx-1 rounded-md bg-amber-100/90 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 shadow-2xs font-mono"
      title={helper || "Champ à personnaliser"}
    >
      [{text}]
    </span>
  );
}

export default function FounderSection() {
  const commitments = [
    {
      icon: <Award className="size-5 text-emerald-700" />,
      title: "Mon Exigence sur la Fraîcheur",
      text: (
        <>
          « Je teste et affine moi-même chaque formule d'assemblage dans notre atelier.{" "}
          <SlotTag text="Détail sur votre méthode de sélection / mouture" /> afin de garantir une intensité aromatique constante et intacte dès l'ouverture du sachet. »
        </>
      ),
    },
    {
      icon: <Utensils className="size-5 text-amber-600" />,
      title: "Mon Secret d'Assaisonnement",
      text: (
        <>
          « Pour sublimer vos volailles ou viandes rouges :{" "}
          <SlotTag text="Votre astuce signature / ex: massez la chair 30 min avant avec une cuillère d'huile d'olive et le mélange Sulson" />. Le secret réside dans le temps de pénétration des épices. »
        </>
      ),
    },
    {
      icon: <Heart className="size-5 text-rose-600" />,
      title: "Le Lien Direct avec Vous",
      text: (
        <>
          « Ce projet est avant tout une aventure humaine et de partage.{" "}
          <SlotTag text="Votre message aux clients / ex: Vos retours et photos de plats mijotés sont ma plus belle fierté et mon inspiration quotidienne" />. »
        </>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gray-50/60 border-t border-gray-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            <Quote className="size-3.5 text-amber-600" />
            <span>LA VOIX DERRIÈRE LA MAISON</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            La Créatrice & l'Auteure des Recettes
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Derrière chaque flacon et chaque sachet d'épices, il y a une histoire de passion, d'héritage familial et d'amour du bon goût.
          </p>
        </div>

        {/* Main Founder Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Portrait / Atelier Visual + Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5"
          >
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
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                    Fondatrice & Assemblages Signatures
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    <SlotTag text="Prénom Nom de la Créatrice" />
                  </h3>
                  <p className="text-xs text-gray-300">
                    Maison Les Épices de Sulson
                  </p>
                </div>
              </div>
            </div>

            {/* Highlight Quote Box */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs relative">
              <Quote className="size-8 text-emerald-100 absolute top-4 right-4 -scale-x-100" />
              <p className="text-sm sm:text-base font-serif italic text-gray-800 leading-relaxed relative z-10">
                « Cuisiner avec des épices d'exception, ce n'est pas seulement nourrir ceux qu'on aime : c'est leur offrir un voyage sensoriel, de la chaleur et des souvenirs partagés. »
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-800">
                  — <SlotTag text="Prénom" />
                </span>
                <span className="text-gray-400 font-medium">Créatrice culinaire</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Fillable Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-6"
          >
            {/* Biography Paragraphs with Slots */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Le Parcours & la Vision de la Fondatrice
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Originaire de <SlotTag text="Votre Ville / Région d'origine ou d'adoption" />, j'ai grandi entourée des parfums enivrants de la cuisine traditionnelle. Depuis toujours, j'ai été fascinée par la capacité d'une simple pincée d'épices à transformer un plat ordinaire en festin mémorable.
              </p>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                C'est en <SlotTag text="Année de lancement / ex: 2023" /> que j'ai donné naissance aux{" "}
                <strong className="text-gray-900 font-bold">Épices de Sulson</strong> avec une ambition claire :{" "}
                <SlotTag text="Votre ambition / ex: rendre hommage au patrimoine gastronomique du Cameroun et permettre à chacun de cuisiner comme un chef au quotidien" />.
              </p>
            </div>

            {/* Commitments Accordion / List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-gray-500">
                Les 3 Engagements Personnels
              </h4>
              <div className="space-y-3">
                {commitments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50/70 border border-gray-200/80 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-lg bg-white shadow-2xs flex items-center justify-center border border-gray-100 shrink-0">
                        {item.icon}
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-9">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Contact / Exchange Box */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
              <div className="flex items-center gap-3 text-left">
                <span className="size-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Une question sur nos mélanges ou une recette ?
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Échangez directement avec notre équipe via notre support client.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors text-center shrink-0 cursor-pointer"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
