const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log("💾 Enregistrement de la configuration SMTP dans Neon PostgreSQL...");
  const config = await prisma.smtpEmailConfig.upsert({
    where: { id: 'default_smtp' },
    update: {
      host: 'mail.epicesdesulson.com',
      port: 465,
      secure: true,
      user: 'contact@epicesdesulson.com',
      password: 'Epicesdesulson226@',
      fromName: 'Les Épices de Sulson',
      fromEmail: 'contact@epicesdesulson.com',
      isEnabled: true,
    },
    create: {
      id: 'default_smtp',
      host: 'mail.epicesdesulson.com',
      port: 465,
      secure: true,
      user: 'contact@epicesdesulson.com',
      password: 'Epicesdesulson226@',
      fromName: 'Les Épices de Sulson',
      fromEmail: 'contact@epicesdesulson.com',
      isEnabled: true,
    },
  });

  console.log("✅ Configuration SMTP enregistrée en base :", config.host, config.user);

  // Test connection to o2switch
  console.log("📡 Test de vérification avec le serveur o2switch...");
  const transporter = nodemailer.createTransport({
    host: 'mail.epicesdesulson.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@epicesdesulson.com',
      pass: 'Epicesdesulson226@',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log("🎉 Authentification SMTP o2switch réussie avec succès !");
  } catch (err) {
    console.warn("Notice de test transporteur o2switch:", err.message);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
