const nodemailer = require("nodemailer");

async function main() {
  console.log("Connecting to SMTP mail.epicesdesulson.com:465...");
  const transporter = nodemailer.createTransport({
    host: "mail.epicesdesulson.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@epicesdesulson.com",
      pass: "MadameNelly237@",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ AUTHENTICATION REUSSIE sur mail.epicesdesulson.com:465 !");

    const info = await transporter.sendMail({
      from: '"Les Epices de Sulson" <contact@epicesdesulson.com>',
      to: "contact@epicesdesulson.com",
      subject: "Test SMTP - Les Epices de Sulson",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #047857;">Les Epices de Sulson</h2>
          <p>Votre serveur SMTP fonctionne parfaitement !</p>
          <p>Date du test : ${new Date().toLocaleString("fr-FR")}</p>
        </div>
      `,
    });

    console.log("✅ EMAIL DE TEST ENVOYE AVEC SUCCES ! ID:", info.messageId);
  } catch (err) {
    console.error("❌ ERREUR SMTP:", err);
  }
}

main();
