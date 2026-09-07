"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Veuillez renseigner votre email.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Instructions envoyées par email !");
    }, 500);
  };

  return (
    <div>
      {/* Logos & Illustration */}
      <div className="flex flex-col items-start mb-8">
        <Link href="/" className="mb-6">
          <Image
            src="/images/logo/logo.png"
            alt="Les Épices de Sulson"
            width={180}
            height={55}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>
        <div className="relative mb-4">
          <Image
            src="/images/auth/reset-pass-illustration.png"
            alt="Reset Password Illustration"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
          />
        </div>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-1">
          Mot de Passe Oublié
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Saisissez votre adresse email pour recevoir les instructions de réinitialisation.
        </p>
      </div>

      {sent ? (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 mb-6">
          <p className="text-xs text-emerald-800 font-medium">
            Un email avec les instructions a été envoyé à <b>{email}</b>.
          </p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FloatingInput
            label="Adresse email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="h-12"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 py-3 text-base font-bold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <span>Envoyer les instructions</span>
            )}
          </Button>
        </form>
      )}

      <p className="mt-8 text-sm text-light-secondary-text">
        Retour à la{" "}
        <Link
          href="/signin"
          className="ml-1 font-bold text-primary hover:text-primary-dark transition-colors"
        >
          Connexion
        </Link>
      </p>
    </div>
  );
}
