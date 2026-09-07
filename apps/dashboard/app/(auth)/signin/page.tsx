import { Suspense } from "react";
import { SigninForm } from "@/components/auth/sigin-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion Administrateur — Les Épices de Sulson",
  description: "Accès sécurisé au tableau de bord Les Épices de Sulson.",
};

export default function SigninPage() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-xs text-gray-400">Chargement...</div>}>
      <SigninForm />
    </Suspense>
  );
}
