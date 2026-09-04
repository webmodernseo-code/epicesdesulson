import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'Histoire & la Maison | Les Épices de Sulson",
  description:
    "Découvrez l'histoire et les valeurs de la maison Les Épices de Sulson : créations d'épices artisanales 100g, poivres rares et recettes authentiques livrées à Paris, Lyon et dans toute la France.",
  keywords: [
    "Les Épices de Sulson",
    "épices de sulson",
    "epice de sulson",
    "epice sulson",
    "épice paris",
    "épices lyon",
    "épices auvergne rhône alpes",
    "épicerie fine",
    "épices artisanales cameroun",
  ],
  openGraph: {
    title: "L'Histoire & la Maison | Les Épices de Sulson",
    description:
      "Maison d'épices d'exception : mélanges artisanaux 100g pour volailles, viandes, poissons et créations gourmandes.",
  },
};

import { AboutHero } from "@/components/about/about-hero";
import DeliveryFeature from "@/components/about/delivery-feature";
import OurFocus from "@/components/about/our-focus";
import OurTeam from "@/components/about/our-team";
import QualitySection from "@/components/about/quality-section";
import Breadcrumb from "@/components/common/breadcrumb";
import Testimonial from "@/components/common/testimonial";

export default function AboutPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "À propos",
          },
        ]}
      />
      <AboutHero />
      <QualitySection />
      <DeliveryFeature />
      <Testimonial />
      <OurFocus />
      <OurTeam />
    </div>
  );
}
