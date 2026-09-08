import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Définir un Nouveau Mot de Passe — Les Épices de Sulson",
  description: "Réinitialisation sécurisée du mot de passe administrateur.",
};

export default function SetNewPasswordPage() {
  return (
    <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-gray-400">Chargement...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
}
