import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutSuccessClient from "./checkout-success-client";

export const metadata: Metadata = {
  title: "Paiement Confirmé | Les Épices de Sulson",
  description: "Merci pour votre commande. Votre paiement a été validé avec succès et vos épices sont en cours de préparation.",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">Chargement de votre confirmation de commande...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
