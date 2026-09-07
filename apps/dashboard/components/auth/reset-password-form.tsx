"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Mail, Send } from "lucide-react";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Veuillez saisir votre adresse email.");
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
    <div className="space-y-6">
      {/* Logos & Header */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block transition-transform hover:scale-102">
          <Image
            src="/images/logo/logo.png"
            alt="Les Épices de Sulson"
            width={160}
            height={50}
            priority
            className="h-12 w-auto mx-auto object-contain"
          />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Mot de Passe Oublié
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Recevez un lien sécurisé pour redéfinir votre mot de passe administrateur
          </p>
        </div>
      </div>

      {sent ? (
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 text-center space-y-3">
          <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="text-sm font-bold text-emerald-950">
            Email de réinitialisation envoyé !
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Si l'adresse <span className="font-bold">{email}</span> correspond à un compte administrateur, vous recevrez un lien d'accès dans quelques instants.
          </p>
          <div className="pt-2">
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retour à la page de connexion</span>
            </Link>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="email">
              Adresse email du compte
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@epicesdesulson.com"
                required
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Send className="size-4" />
            <span>{loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}</span>
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/signin"
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 font-semibold transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retourner à la connexion</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
