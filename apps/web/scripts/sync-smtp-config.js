const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

async function main() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = port === 465;
  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const fromName = process.env.SMTP_FROM_NAME || "Les Épices de Sulson";
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;

  if (!host || !user || !password || !fromEmail) {
    throw new Error("Configuration SMTP locale incomplète.");
  }

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass: password } });
  await transporter.verify();

  const prisma = new PrismaClient();
  try {
    const latest = await prisma.smtpEmailConfig.findFirst({ orderBy: { updatedAt: "desc" } });
    const data = { host, port, secure, user, password, fromName, fromEmail, isEnabled: true };
    if (latest) await prisma.smtpEmailConfig.update({ where: { id: latest.id }, data });
    else await prisma.smtpEmailConfig.create({ data });
    console.log("Configuration SMTP vérifiée et synchronisée dans Neon.");
  } finally {
    await prisma.$disconnect();
    transporter.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Synchronisation SMTP impossible.");
  process.exit(1);
});
