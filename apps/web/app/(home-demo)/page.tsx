import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Épices de Sulson - Épices Fines, Poivres Rares & Saveurs d'Exception",
  description:
    "Découvrez la boutique en ligne Les Épices de Sulson : une sélection d'épices d'exception, poivres rares, mélanges gourmets et condiments artisanaux pour sublimer vos créations culinaires.",
  openGraph: {
    title: "Les Épices de Sulson - Épices Fines & Saveurs d'Exception",
    description:
      "Découvrez la boutique en ligne Les Épices de Sulson : une sélection d'épices d'exception, poivres rares, mélanges gourmets et condiments artisanaux.",
  },
};

import LatestBlogThree from "@/components/home/latest-blog-three";
import DealOfTheDay from "@/components/home/deal-of-the-day";
import HomeThreeHero from "@/components/home/home-three-hero";
import FirmFreshGrocery from "@/components/home/firm-fresh-grocery";
import CulinaryCreationsGallery from "@/components/home/culinary-creations-gallery";
import FAQAccordionThree from "@/components/home/faq-accordion-three";

export default function Home() {
  return (
    <div>
      <HomeThreeHero />
      <FirmFreshGrocery />
      <DealOfTheDay />
      <LatestBlogThree />
      <CulinaryCreationsGallery />
      <FAQAccordionThree />
    </div>
  );
}
