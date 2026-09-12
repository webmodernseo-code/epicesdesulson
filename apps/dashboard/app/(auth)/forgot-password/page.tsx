import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mot de Passe Oublié — Les Épices de Sulson",
  description: "Récupération sécurisée du mot de passe administrateur.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-2xl bg-gray-100" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
