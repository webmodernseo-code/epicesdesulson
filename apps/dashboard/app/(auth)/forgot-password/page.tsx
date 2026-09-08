import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de Passe Oublié — Les Épices de Sulson",
  description: "Récupération sécurisée du mot de passe administrateur.",
};

export default function ForgotPasswordPage() {
  return <ResetPasswordForm />;
}
