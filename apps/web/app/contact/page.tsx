import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactez-nous | Les Épices de Sulson",
  description: "Contactez notre équipe Les Épices de Sulson. Nous sommes à votre écoute pour vous conseiller sur nos épices, vos commandes et vos recettes.",
  openGraph: {
    title: "Contactez-nous | Les Épices de Sulson",
    description: "Contactez notre équipe Les Épices de Sulson pour toute question.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import AssistGrid from "@/components/contact/assist-grid";
import FAQSection from "@/components/contact/faq-section";

export default function ContactPage() {
  return (
    <div className="py-6">
      <Breadcrumb
        items={[
          {
            label: "Contact",
          },
        ]}
      />
      <AssistGrid />
      <FAQSection />
    </div>
  );
}
