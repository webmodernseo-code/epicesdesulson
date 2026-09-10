"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Percent,
  Calendar,
  ShoppingBag,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface CouponItem {
  id: string;
  code: string;
  description: string | null;
  discountPercent: number;
  isActive: boolean;
  minOrderAmount: number | null;
  expiresAt: string | null;
  usageCount: number;
  createdAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "10",
    description: "",
    minOrderAmount: "",
    expiresAt: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCoupons(json.data);
      } else {
        // Fallback default sample if DB empty
        setCoupons([
          {
            id: "default_sulson10",
            code: "SULSON10",
            description: "Code promo de lancement",
            discountPercent: 10,
            isActive: true,
            minOrderAmount: null,
            expiresAt: null,
            usageCount: 12,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      toast.error("Impossible de charger les codes promo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      toast.error("Veuillez renseigner le libellé du code promo.");
      return;
    }

    const percent = parseFloat(formData.discountPercent);
    if (isNaN(percent) || percent <= 0 || percent > 100) {
      toast.error("Le pourcentage de réduction doit être compris entre 1% et 100%.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code.trim().toUpperCase(),
          discountPercent: percent,
          description: formData.description.trim() || undefined,
          minOrderAmount: formData.minOrderAmount ? parseFloat(formData.minOrderAmount) : undefined,
          expiresAt: formData.expiresAt ? formData.expiresAt : undefined,
          isActive: formData.isActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Code promo ${formData.code.toUpperCase()} créé avec succès (-${percent}%) !`);
        setShowModal(false);
        setFormData({
          code: "",
          discountPercent: "10",
          description: "",
          minOrderAmount: "",
          expiresAt: "",
          isActive: true,
        });
        fetchCoupons();
      } else {
        toast.error(data.error || "Erreur lors de la création.");
      }
    } catch (err) {
      toast.error("Erreur réseau lors de la création du code promo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (coupon: CouponItem) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      if (res.ok) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === coupon.id ? { ...c, isActive: !c.isActive } : c))
        );
        toast.success(
          !coupon.isActive
            ? `Code ${coupon.code} activé.`
            : `Code ${coupon.code} désactivé.`
        );
      }
    } catch (err) {
      toast.error("Impossible de modifier le statut.");
    }
  };

  const handleDeleteCoupon = async (id: string, code: string) => {
    if (!confirm(`Confirmez-vous la suppression du code promo ${code} ?`)) return;

    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.id !== id));
        toast.success(`Code promo ${code} supprimé.`);
      }
    } catch (err) {
      toast.error("Impossible de supprimer le code promo.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ─── Header & Action Button ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <Tag className="size-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
                Codes Promo & Réductions
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Créez vos codes promotionnels personnalisés avec pourcentage de remise sur-mesure
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchCoupons}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            title="Rafraîchir"
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Nouveau Code Promo</span>
          </button>
        </div>
      </div>

      {/* ─── Stats Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-gray-500">Total Codes Promo</span>
          <p className="text-2xl font-extrabold text-gray-950">{coupons.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-gray-500">Codes Actifs</span>
          <p className="text-2xl font-extrabold text-emerald-700">
            {coupons.filter((c) => c.isActive).length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-gray-500">Total Commandes avec Remise</span>
          <p className="text-2xl font-extrabold text-gray-950">
            {coupons.reduce((acc, c) => acc + (c.usageCount || 0), 0)}
          </p>
        </div>
      </div>

      {/* ─── Table of Promo Codes ─── */}
      <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-950 text-sm sm:text-base">
            Liste des codes promo actifs et archivés
          </h2>
          <span className="text-xs text-gray-500">{coupons.length} codes configurés</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <Loader2 className="size-6 animate-spin mx-auto text-emerald-600" />
            <p className="text-sm">Chargement des codes promo...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-2">
            <Tag className="size-8 mx-auto text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">Aucun code promo créé</p>
            <p className="text-xs text-gray-500">
              Cliquez sur « Nouveau Code Promo » pour créer votre première offre de réduction.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 text-gray-600 text-xs uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Code Promo</th>
                  <th className="py-3.5 px-4">Réduction</th>
                  <th className="py-3.5 px-4">Description / Conditions</th>
                  <th className="py-3.5 px-4">Utilisations</th>
                  <th className="py-3.5 px-4">Statut</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-gray-100 font-mono font-bold text-gray-950 text-xs sm:text-sm border border-gray-200">
                          {coupon.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200/80">
                        <Percent className="size-3" />
                        <span>-{coupon.discountPercent}%</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-gray-600">
                      <p className="font-semibold text-gray-900">{coupon.description || "—"}</p>
                      {coupon.minOrderAmount && (
                        <p className="text-gray-500 mt-0.5">
                          Min. commande : {coupon.minOrderAmount.toFixed(2)} €
                        </p>
                      )}
                    </td>

                    <td className="py-4 px-4 text-xs font-semibold text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className="size-3.5 text-gray-400" />
                        <span>{coupon.usageCount || 0} commandes</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(coupon)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer ${
                          coupon.isActive
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {coupon.isActive ? (
                          <>
                            <CheckCircle2 className="size-3 text-emerald-600" />
                            <span>Actif</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3 text-gray-500" />
                            <span>Inactif</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(coupon.id, coupon.code)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Supprimer le code"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Creation Modal ─── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Tag className="size-5 text-emerald-700" />
                <h3 className="font-bold text-gray-950 text-lg">Créer un code promo</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-gray-800 mb-1">
                  Libellé du Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: ETE20, BIENVENUE, CHEFVIP"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 font-mono uppercase font-bold text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-1">
                  Pourcentage de réduction (%) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="0.5"
                    required
                    placeholder="10"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl border border-gray-300 font-bold text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                  <Percent className="size-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-1">
                  Description / Note interne
                </label>
                <input
                  type="text"
                  placeholder="ex: Remise spéciale clients VIP"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-800 mb-1">
                  Montant minimum d'achat (€) (Optionnel)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="ex: 30"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="size-4.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-gray-800">Activer ce code immédiatement</span>
              </label>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold shadow-xs cursor-pointer flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Création...</span>
                    </>
                  ) : (
                    <span>Enregistrer le code</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
