import { prisma } from "@/lib/prisma";

export const DEFAULT_MAINTENANCE_MESSAGE =
  "Notre boutique est momentanément indisponible. Nous revenons très vite.";

export async function getMaintenanceStatus() {
  try {
    const config = await prisma.maintenanceConfig.findUnique({ where: { id: "site" } });
    return {
      enabled: Boolean(config?.enabled),
      message: config?.message || DEFAULT_MAINTENANCE_MESSAGE,
      expectedBackAt: config?.expectedBackAt || null,
    };
  } catch {
    // Une panne de configuration ne doit jamais fermer la boutique par accident.
    return { enabled: false, message: DEFAULT_MAINTENANCE_MESSAGE, expectedBackAt: null };
  }
}

export async function maintenanceResponse() {
  const status = await getMaintenanceStatus();
  return status.enabled ? status : null;
}
