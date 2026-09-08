"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { toast } from "sonner";
import { ShieldCheck, UserPlus, CheckCircle2 } from "lucide-react";

const roleOptions = [
  { value: "Gestionnaire Logistique & Stocks", label: "Gestionnaire Logistique & Stocks" },
  { value: "Préparateur de Commandes", label: "Préparateur de Commandes Atelier" },
  { value: "Support Client & Relation Acheteur", label: "Support Client & Relation Acheteur" },
  { value: "Administrateur Délégué", label: "Administrateur Délégué" },
];

export default function AddAdminForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Gestionnaire Logistique & Stocks");
  const [tempPassword, setTempPassword] = useState("Sulson2026!");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Administrateur ${name} (${email}) créé avec le rôle "${role}" !`);
      router.push("/admin-users");
    }, 400);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-8 border border-gray-200 shadow-2xs max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
        <PageHeader
          title="Ajouter un Collaborateur / Administrateur"
          backHref="/admin-users"
        />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <ShieldCheck className="size-3.5" />
          <span>Accès Cockpit Sulson</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-200/90 rounded-2xl p-5 sm:p-6 bg-gray-50/40 space-y-5">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Informations & Permissions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Jean Dupont"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Adresse email professionnelle *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex: logistique@epicesdesulson.com"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Rôle & Niveau d'accès *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Mot de passe temporaire *
              </label>
              <input
                type="text"
                required
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Notes internes / Périmètre de responsabilité
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ex: En charge de l'étiquetage et des expéditions Colissimo depuis l'entrepôt..."
                className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin-users")}
            className="w-full sm:w-auto rounded-full text-xs font-bold border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            Annuler
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting || !name || !email}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 rounded-full text-xs shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="size-3.5" />
            <span>{isSubmitting ? "Création..." : "Enregistrer le compte"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
