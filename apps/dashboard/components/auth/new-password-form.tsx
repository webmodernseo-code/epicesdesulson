"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";

export function NewPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
            Nouveau Mot de Passe
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Définissez un mot de passe pour protéger votre accès administrateur
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="new-password">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              required
              disabled={loading}
              className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="confirm-password">
            Confirmer le mot de passe
          </label>
          <input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Répétez le nouveau mot de passe"
            required
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white disabled:opacity-50"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Enregistrement...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              <span>Valider le nouveau mot de passe</span>
            </>
          )}
        </Button>

        <div className="text-center pt-2">
          <Link
            href="/signin"
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 font-semibold transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Retour à la page de connexion</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
