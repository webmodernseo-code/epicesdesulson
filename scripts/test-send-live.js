const nodemailer = require('nodemailer');

async function testSend() {
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
    debug: true,
    logger: true,
  });

  console.log("🚀 Envoi d'un e-mail de test en direct à contact@epicesdesulson.com...");
  const info = await transporter.sendMail({
    from: '"Les Épices de Sulson" <contact@epicesdesulson.com>',
    to: 'contact@epicesdesulson.com',
    subject: `Test direct o2switch - ${new Date().toISOString()}`,
    text: "Ceci est un test direct de distribution SMTP o2switch pour Les Épices de Sulson.",
  });

  console.log("Résultat:", info);
}

testSend().catch(console.error);
