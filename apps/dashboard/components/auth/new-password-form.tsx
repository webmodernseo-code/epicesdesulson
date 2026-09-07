"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";

export function NewPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Mot de passe mis à jour avec succès !");
      router.push("/signin");
    }, 400);
  };

  return (
    <div>
      {/* Brand Logo & Header */}
      <div className="flex flex-col items-start mb-8">
        <Link href="/" className="mb-6 inline-block transition-transform hover:scale-102">
          <Image
            src="/images/logo/logo.png"
            alt="Les Épices de Sulson"
            width={210}
            height={65}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-1.5">
          Nouveau Mot de Passe
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Définissez un nouveau mot de passe pour sécuriser votre compte.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FloatingInput
          label="Nouveau mot de passe"
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="h-12"
        />
        <FloatingInput
          label="Confirmer le mot de passe"
          id="confirm-new-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          className="h-12"
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 py-3 text-base font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Enregistrement...</span>
            </>
          ) : (
            <span>Valider le mot de passe</span>
          )}
        </Button>
      </form>

      <p className="mt-8 text-sm text-light-secondary-text">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Retour à la page de connexion</span>
        </Link>
      </p>
    </div>
  );
}
