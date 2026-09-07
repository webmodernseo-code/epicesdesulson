import type { Metadata } from "next";
import Breadcrumb from "@/components/common/breadcrumb";
import StorySection from "@/components/about/story-section";
import FounderSection from "@/components/about/founder-section";

export const metadata: Metadata = {
  title: "L'Histoire & la Maison | Les Épices de Sulson",
  description:
    "Découvrez l'histoire et les valeurs de la maison Les Épices de Sulson : créations d'épices artisanales 100g, terroirs nobles du Cameroun et passion de la gastronomie authentique.",
  keywords: [
    "Les Épices de Sulson",
    "histoire épices de sulson",
    "fondatrice épices de sulson",
    "épicerie fine cameroun",
    "épices artisanales paris",
    "épices lyon",
    "assemblages gastronomiques 100g",
  ],
  openGraph: {
    title: "L'Histoire & la Maison | Les Épices de Sulson",
    description:
      "Maison d'épices d'exception : sélection de terroirs nobles, mélanges artisanaux 100% naturels et passion culinaire.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "À propos de notre maison",
          },
        ]}
      />

      {/* SECTION 1 : L'Histoire & L'Idée des Épices de Sulson */}
      <StorySection />

      {/* SECTION 2 : L'Auteure & la Créatrice des Recettes */}
      <FounderSection />
    </main>
  );
}
