import { NextRequest, NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";

export const dynamic = "force-dynamic";

/**
 * Route de relance automatique des paniers abandonnés / échecs de paiement
 * Exécutable via Vercel Cron ou tâche automatisée.
 * 
 * Règle stricte : N'envoie la relance QUE SI le client n'a pas finalisé d'achat.
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Protection optionnelle si CRON_SECRET est défini
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const url = new URL(req.url);
      const queryKey = url.searchParams.get("key");
      if (queryKey !== cronSecret) {
        return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
      }
    }

    const report = await OrdersService.processAbandonedOrdersRecovery();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      report,
    });
  } catch (error: any) {
    console.error("Erreur Cron Abandoned Orders Recovery:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Erreur lors de la relance des commandes abandonnées",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
