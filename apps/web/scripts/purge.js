const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Démarrage de la purge des commandes de test...");
  try {
    const it = await prisma.orderItem.deleteMany({});
    const o = await prisma.order.deleteMany({});
    console.log(`✅ Nettoyage terminé : ${it.count} articles et ${o.count} commandes de test supprimés.`);
    
    // Réinitialisation des stocks par défaut
    await prisma.product.updateMany({
      data: {
        stockQuantity: 100,
        isAvailable: true,
      },
    });
    console.log("✅ Stocks de produits réinitialisés et prêts pour la production.");
  } catch (err) {
    console.error("Erreur lors de la purge :", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
