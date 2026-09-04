import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | Les Épices de Sulson",
  description: "Découvrez l'histoire, la passion et les valeurs de Les Épices de Sulson : la recherche des meilleures saveurs et épices d'exception.",
  openGraph: {
    title: "À propos | Les Épices de Sulson",
    description: "Découvrez l'histoire, la passion et les valeurs de Les Épices de Sulson.",
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
