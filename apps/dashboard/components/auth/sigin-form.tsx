"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FloatingInput } from "@/components/ui/floating-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("admin@epicesdesulson.com");
  const [password, setPassword] = useState("");
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
          password: password.trim(),
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

      toast.success("Connexion réussie. Bienvenue sur le cockpit !");
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Impossible de joindre le serveur. Vérifiez votre connexion.");
      setLoading(false);
    }
  };

  const loginQuick = async (role: "master" | "seller") => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@epicesdesulson.com",
          password: "sulson",
          keepSignedIn: true,
        }),
      });

      if (res.ok) {
        if (typeof window !== "undefined") {
          localStorage.setItem("userRole", role);
        }
        toast.success(`Connecté en tant que ${role === "master" ? "Administrateur Principal" : "Gestionnaire"}`);
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error("Échec de connexion rapide.");
      }
    } catch {
      toast.error("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
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
            src="/images/auth/sigin-illustration.png"
            alt="Illustration Connexion"
            width={120}
            height={120}
            className="w-24 h-24 object-contain"
          />
        </div>
        <h1 className="text-2xl font-public-sans font-bold text-light-primary-text mb-1">
          Espace Administrateur
        </h1>
        <p className="text-gray-600 font-public-sans text-sm">
          Connectez-vous avec votre email et mot de passe pour accéder au tableau de bord.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
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

        <FloatingInput
          label="Mot de passe"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="admin123 ou sulson"
          required
          disabled={loading}
          className="h-12"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="keep-signed-in"
              checked={keepSignedIn}
              onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
              disabled={loading}
            />
            <label
              htmlFor="keep-signed-in"
              className="text-sm font-public-sans text-light-secondary-text font-medium cursor-pointer select-none"
            >
              Mémoriser ma session
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-[13px] font-bold text-primary hover:text-primary-dark transition-colors"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 py-3 text-base font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Vérification...</span>
            </>
          ) : (
            <span>Se connecter</span>
          )}
        </Button>

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-light-secondary-text text-xs">
              Accès rapide
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full h-12 text-xs sm:text-sm font-semibold"
            onClick={() => loginQuick("master")}
          >
            Accès Admin Direct
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            className="w-full h-12 text-xs sm:text-sm font-semibold"
            onClick={() => loginQuick("seller")}
          >
            Accès Vendeuse
          </Button>
        </div>
      </form>
    </div>
  );
}
