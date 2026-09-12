"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!oldPassword) {
      setStatusMessage({ type: "error", text: "Veuillez renseigner votre mot de passe actuel." });
      return;
    }
    if (!newPassword || newPassword.length < 12 || newPassword.length > 128) {
      setStatusMessage({ type: "error", text: "Le nouveau mot de passe doit comporter entre 12 et 128 caractères." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "Les deux nouveaux mots de passe ne correspondent pas." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const message = data.error || "Échec de la mise à jour du mot de passe.";
        setStatusMessage({ type: "error", text: message });
        toast.error(message);
      } else {
        const message = data.message || "Mot de passe modifié avec succès !";
        setStatusMessage({ type: "success", text: message });
        toast.success(message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: "Erreur réseau. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
        <Lock className="size-5 text-emerald-600" />
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Sécurité du Compte & Mot de Passe
          </h3>
          <p className="text-xs text-gray-500">
            Mettre à jour vos identifiants d'accès administrateur
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="size-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Mot de passe actuel
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              tabIndex={-1}
              aria-label={showOld ? "Masquer" : "Afficher"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Nouveau mot de passe
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={12}
              maxLength={128}
              className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              tabIndex={-1}
              aria-label={showNew ? "Masquer" : "Afficher"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p className={`mt-1 text-[11px] ${newPassword.length > 0 && newPassword.length < 12 ? "text-red-600 font-semibold" : "text-gray-500"}`}>
            12 caractères minimum ({newPassword.length}/12)
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={12}
              maxLength={128}
              className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
              aria-label={showConfirm ? "Masquer" : "Afficher"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Mise à jour...</span>
            </>
          ) : (
            <span>Modifier et vérifier mon mot de passe</span>
          )}
        </button>
      </div>
    </form>
  );
}

