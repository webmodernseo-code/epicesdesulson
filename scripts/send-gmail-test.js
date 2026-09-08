const nodemailer = require('nodemailer');

async function sendTestToGmail() {
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

  const testHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Test de Connexion SMTP Réussi</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 32px; background-color: #047857; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">🌿 Les Épices de Sulson</h1>
              <p style="margin: 6px 0 0 0; color: #a7f3d0; font-size: 13px; font-weight: 600;">Validation du Serveur SMTP Transactionnel</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 30px;">
              <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">
                <span style="color: #047857; font-size: 12px; font-weight: 700;">✓ Connexion SMTP Opérationnelle</span>
              </div>
              <h2 style="margin: 0 0 12px 0; font-size: 19px; color: #0f172a;">Bonjour !</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
                Votre serveur SMTP o2switch est <strong>parfaitement opérationnel et authentifié</strong>.
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
                Désormais, votre boutique e-commerce <strong>Les Épices de Sulson</strong> peut distribuer en temps réel :
              </p>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 22px;">
                <li>Les <strong>confirmations de commande avec facture PDF acquittée</strong></li>
                <li>Les <strong>notifications d'expédition avec numéro de suivi Colissimo</strong></li>
                <li>Les <strong>liens de réinitialisation de mot de passe administrateur</strong></li>
                <li>Les <strong>relances de paniers abandonnés</strong></li>
              </ul>
              <div style="background-color: #f1f5f9; padding: 18px; border-radius: 14px; font-size: 12px; color: #64748b; line-height: 20px;">
                <strong style="color: #0f172a;">Détails de la configuration :</strong><br>
                • Hôte : <span style="font-family: monospace; color: #0f172a;">mail.epicesdesulson.com:465</span> (SSL)<br>
                • Expéditeur : <span style="color: #0f172a;">Les Épices de Sulson &lt;contact@epicesdesulson.com&gt;</span><br>
                • Destinataire : <span style="font-family: monospace; color: #047857; font-weight: bold;">webmodernseo@gmail.com</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">© ${new Date().getFullYear()} Les Épices de Sulson — Épicerie Fine & Terroirs</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  console.log("🚀 Envoi de l'e-mail de test à webmodernseo@gmail.com...");
  const info = await transporter.sendMail({
    from: '"Les Épices de Sulson" <contact@epicesdesulson.com>',
    to: 'webmodernseo@gmail.com',
    replyTo: 'contact@epicesdesulson.com',
    subject: `✓ Test SMTP Réussi — Les Épices de Sulson`,
    html: testHtml,
  });

  console.log("✅ Message envoyé avec succès !");
  console.log("ID de réponse:", info.response);
  console.log("MessageId:", info.messageId);
}

sendTestToGmail().catch(console.error);
