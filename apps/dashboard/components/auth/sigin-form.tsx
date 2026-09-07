"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, ArrowRight, Loader2 } from "lucide-react";

export function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          keepSignedIn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Identifiants administrateur incorrects.");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("userRole", "master");
      }

      toast.success("Connexion réussie. Bienvenue sur le tableau de bord !");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Impossible de joindre le serveur. Vérifiez votre connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Logo */}
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
            Espace Administrateur
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Connectez-vous pour piloter les commandes, stocks et clients
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="email">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@epicesdesulson.com"
            required
            autoComplete="email"
            disabled={loading}
            className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-white disabled:opacity-50"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-gray-700" htmlFor="password">
              Mot de passe
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              disabled={loading}
              className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-white disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              title={showPassword ? "Masquer" : "Afficher"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="keep-signed-in"
            checked={keepSignedIn}
            onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
            disabled={loading}
          />
          <label
            htmlFor="keep-signed-in"
            className="text-xs text-gray-600 font-medium cursor-pointer select-none"
          >
            Mémoriser cette session sur cet appareil
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Vérification en cours...</span>
            </>
          ) : (
            <>
              <span>Se connecter au tableau de bord</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Security Reassurance Footer */}
      <div className="pt-2 border-t border-gray-100 text-center">
        <p className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
          <Lock className="size-3 text-emerald-600" />
          <span>Accès privé chiffré SSL 256-bit certifié PCI-DSS</span>
        </p>
      </div>
    </div>
  );
}
