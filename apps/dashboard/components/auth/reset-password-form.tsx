"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Veuillez renseigner votre adresse email.");
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
          Mot de Passe Oublié
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Saisissez votre adresse email pour recevoir les instructions de réinitialisation.
        </p>
      </div>

      {sent ? (
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 mb-6">
          <div className="size-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-5" />
          </div>
          <p className="text-sm text-emerald-900 font-medium">
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
            className="w-full h-12 py-3 text-base font-bold flex items-center justify-center gap-2 cursor-pointer"
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
