"use client";

import { useEffect, useState } from "react";

type Summary = { revenue: number; revenueTrend: number | null; paidOrders: number; averageOrder: number; activeProducts: number; lowStock: number };

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function DashboardStatsGrid() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("/api/admin/summary", { cache: "no-store" }).then(async (res) => {
      if (!res.ok) throw new Error();
      return res.json();
    }).then((json) => setData(json.data)).catch(() => setError(true));
  }, []);

  if (error) return <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">Données indisponibles : vérifiez la connexion Neon dans la configuration du déploiement.</div>;
  if (!data) return <div className="h-28 animate-pulse rounded-xl bg-gray-100" />;

  const stats = [
    { label: "Chiffre d’affaires du mois", value: euros.format(data.revenue), note: data.revenueTrend == null ? "Premier mois mesuré" : `${data.revenueTrend >= 0 ? "+" : ""}${data.revenueTrend.toFixed(1)} % vs mois précédent`, color: "bg-emerald-50 border-emerald-100" },
    { label: "Commandes payées", value: String(data.paidOrders), note: "Mois en cours", color: "bg-amber-50 border-amber-100" },
    { label: "Panier moyen", value: euros.format(data.averageOrder), note: "Commandes encaissées", color: "bg-blue-50 border-blue-100" },
    { label: "Catalogue actif", value: String(data.activeProducts), note: data.lowStock ? `${data.lowStock} produit(s) en stock bas` : "Stocks suffisants", color: "bg-purple-50 border-purple-100" },
  ];
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">{stats.map((stat) => <div key={stat.label} className={`${stat.color} border p-5 rounded-2xl`}><p className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{stat.label}</p><h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3><p className="mt-3 text-xs text-gray-600">{stat.note}</p></div>)}</div>;
}
