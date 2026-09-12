"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2, Power, Store } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_MESSAGE = "Notre boutique est momentanément indisponible. Nous revenons très vite.";

export default function MaintenanceForm() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [expectedBackAt, setExpectedBackAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings/maintenance", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setEnabled(Boolean(result.data.enabled));
        setMessage(result.data.message || DEFAULT_MESSAGE);
        setExpectedBackAt(result.data.expectedBackAt ? new Date(result.data.expectedBackAt).toISOString().slice(0, 16) : "");
      })
      .catch(() => toast.error("Impossible de charger l'état de la boutique."))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    try {
      const response = await fetch("/api/settings/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled, message, expectedBackAt: expectedBackAt || null }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Enregistrement impossible.");
      toast.success(enabled ? "Mode maintenance activé. Les commandes sont suspendues." : "Boutique rouverte. Les commandes sont de nouveau autorisées.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex min-h-48 items-center justify-center"><Loader2 className="size-5 animate-spin text-zinc-500" /></div>;

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <header className="flex items-start justify-between gap-5 border-b border-zinc-200 p-6">
        <div className="flex gap-4">
          <span className={`flex size-11 items-center justify-center rounded-full ${enabled ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
            {enabled ? <AlertTriangle className="size-5" /> : <Store className="size-5" />}
          </span>
          <div>
            <h1 className="text-lg font-bold text-zinc-950">Disponibilité de la boutique</h1>
            <p className="mt-1 max-w-xl text-sm text-zinc-500">Fermez temporairement la boutique publique et bloquez toute nouvelle commande. Le dashboard reste accessible.</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${enabled ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`}>
          {enabled ? "Maintenance active" : "Boutique ouverte"}
        </span>
      </header>

      <div className="space-y-6 p-6">
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 p-4">
          <span><span className="block text-sm font-bold text-zinc-900">Activer le mode maintenance</span><span className="mt-1 block text-xs text-zinc-500">Les visiteurs verront le message ci-dessous et ne pourront plus commander.</span></span>
          <input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} className="size-5 accent-zinc-900" />
        </label>

        <label className="block text-sm font-semibold text-zinc-800">Message affiché aux visiteurs
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={500} rows={4} className="mt-2 w-full resize-none rounded-xl border border-zinc-300 p-3 text-sm font-normal outline-none focus:border-zinc-900" />
        </label>

        <label className="block max-w-sm text-sm font-semibold text-zinc-800">Retour prévu <span className="font-normal text-zinc-400">(facultatif)</span>
          <input type="datetime-local" value={expectedBackAt} onChange={(event) => setExpectedBackAt(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-zinc-300 px-3 text-sm font-normal outline-none focus:border-zinc-900" />
        </label>

        <div className="flex justify-end border-t border-zinc-100 pt-5">
          <button onClick={save} disabled={saving} className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white disabled:opacity-50 ${enabled ? "bg-amber-700 hover:bg-amber-800" : "bg-zinc-900 hover:bg-zinc-800"}`}>
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Power className="size-4" />}
            Enregistrer l'état
          </button>
        </div>
      </div>
    </section>
  );
}
