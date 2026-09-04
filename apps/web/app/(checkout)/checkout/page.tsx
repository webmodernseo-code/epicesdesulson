import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement Sécurisé | Les Épices de Sulson",
  description:
    "Finalisez votre commande en toute sécurité par Carte Bancaire avec chiffrement SSL 256-bit et 3D-Secure Stripe.",
  openGraph: {
    title: "Paiement Sécurisé | Les Épices de Sulson",
    description:
      "Finalisez votre commande en toute sécurité par Carte Bancaire avec chiffrement SSL 256-bit et 3D-Secure Stripe.",
  },
};

import CheckoutV1Page from "@/components/checkout/checkout-v1/checkout-v1-page";
import Breadcrumb from "@/components/common/breadcrumb";

export default function CheckoutPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Panier", href: "/cart" },
          { label: "Paiement Sécurisé" },
        ]}
      />
      <CheckoutV1Page />
    </div>
  );
}
