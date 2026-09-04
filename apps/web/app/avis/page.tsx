import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis Clients & Témoignages | Les Épices de Sulson",
  description:
    "Découvrez les retours d'expérience et notes de nos clients et chefs. Donnez votre avis sur nos poivres rares et épices d'exception.",
  openGraph: {
    title: "Avis Clients & Témoignages | Les Épices de Sulson",
    description:
      "Notes et avis vérifiés sur nos poivres et mélanges d'épices nobles. Partagez votre expérience gastronomique.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import CustomerReviewsPage from "@/components/reviews/customer-reviews-page";

export default function ReviewsPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Avis & Témoignages" },
        ]}
      />
      <CustomerReviewsPage />
    </div>
  );
}
