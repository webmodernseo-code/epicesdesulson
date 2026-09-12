"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

function AcceptInvitationForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 12) return setMessage("Le mot de passe doit contenir au moins 12 caractères.");
    if (password !== confirmation) return setMessage("Les mots de passe ne correspondent pas.");
    setLoading(true);
    const response = await fetch("/api/auth/accept-invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Impossible d'accepter l'invitation.");
      setLoading(false);
      return;
    }
    router.push("/signin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-5">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Accepter l'invitation</h1>
        <p className="text-sm text-gray-600">Choisissez votre mot de passe pour activer votre accès administrateur.</p>
        <label className="block text-sm font-semibold text-gray-700">Mot de passe
          <span className="relative mt-2 block">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} minLength={12} required className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-12" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </span>
        </label>
        <label className="block text-sm font-semibold text-gray-700">Confirmation
          <span className="relative mt-2 block">
            <input type={showConfirmation ? "text" : "password"} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} minLength={12} required className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-12" />
            <button type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? "Masquer la confirmation" : "Afficher la confirmation"} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900">
              {showConfirmation ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </span>
        </label>
        {message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
        <button disabled={loading || !token} className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
          {loading ? "Activation..." : "Activer mon compte"}
        </button>
        <Link href="/signin" className="block text-center text-sm text-emerald-700">Retour à la connexion</Link>
      </form>
    </main>
  );
}

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center">Chargement...</main>}>
      <AcceptInvitationForm />
    </Suspense>
  );
}
