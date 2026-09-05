const path = require("node:path");
const { randomBytes, scryptSync } = require("node:crypto");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const { PrismaClient } = require("@prisma/client");

async function main() {
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  const email = (process.env.ADMIN_EMAIL || "contact@epicesdesulson.com").toLowerCase();
  if (!password || password.length < 12) throw new Error("ADMIN_INITIAL_PASSWORD doit contenir au moins 12 caractères.");
  const salt = randomBytes(16).toString("hex");
  const passwordHash = `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
  const prisma = new PrismaClient();
  try {
    await prisma.user.upsert({ where: { email }, update: { passwordHash, role: "MASTER_ADMIN" }, create: { email, name: "Administrateur Sulson", passwordHash, role: "MASTER_ADMIN" } });
    console.log(`Compte administrateur prêt : ${email}`);
  } finally { await prisma.$disconnect(); }
}
main().catch((error) => { console.error(error instanceof Error ? error.message : "Initialisation impossible"); process.exit(1); });
