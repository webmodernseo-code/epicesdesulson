"use client";

import { ProgressBar } from "../ui/progress-bar";
import { DashboardCard } from "@/components/ui/dashboard-card";

const fulfillmentData = [
  {
    label: "Expédiées (Colissimo / Relais)",
    count: 148,
    percentage: 62,
    color: "bg-emerald-500",
    trackColor: "bg-emerald-100",
  },
  {
    label: "Livrées & Réceptionnées",
    count: 185,
    percentage: 78,
    color: "bg-teal-600",
    trackColor: "bg-teal-100",
  },
  {
    label: "En préparation à l'atelier",
    count: 42,
    percentage: 18,
    color: "bg-amber-500",
    trackColor: "bg-amber-100",
  },
  {
    label: "En attente de paiement",
    count: 12,
    percentage: 5,
    color: "bg-blue-500",
    trackColor: "bg-blue-100",
  },
  {
    label: "Retours & Rétractations",
    count: 3,
    percentage: 1,
    color: "bg-rose-500",
    trackColor: "bg-rose-100",
  },
];

export default function OrderFulfillmentStatus() {
  return (
    <DashboardCard
      title="Suivi Logistique & Expéditions"
      subtitle="Progression globale du traitement des colis"
    >
      <div className="space-y-5 pt-3">
        {fulfillmentData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-gray-800">
                {item.label}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">
                  {item.count}
                </span>
                <span className="text-gray-400 text-xs">
                  ({item.percentage}%)
                </span>
              </div>
            </div>
            <ProgressBar
              value={item.percentage}
              color={item.color}
              trackColor={item.trackColor}
              className="h-2 rounded-full"
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
