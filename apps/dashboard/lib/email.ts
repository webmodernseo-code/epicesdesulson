import nodemailer from "nodemailer";

interface SendPasswordResetParams {
  to: string;
  resetUrl: string;
}

export function getSmtpTransporter() {
  const host = process.env.SMTP_HOST || "mail.epicesdesulson.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = port === 465;
  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues with shared hosts
    },
  });
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: SendPasswordResetParams): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getSmtpTransporter();
    const fromAddress =
      process.env.SMTP_FROM ||
      `"Les Épices de Sulson" <${process.env.SMTP_USER || "contact@epicesdesulson.com"}>`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation de votre mot de passe</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Logo -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <h2 style="margin: 0; color: #047857; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                Les Épices de Sulson
              </h2>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">
                Maison d'Assemblages & Terroirs
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 19px; font-weight: 700; color: #0f172a;">
                Réinitialisation de votre accès Administrateur
              </h1>
              
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
                Bonjour,<br><br>
                Une demande de réinitialisation de mot de passe a été initiée pour votre compte <strong>${to}</strong> sur le cockpit administrateur.
              </p>

              <!-- Call To Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px 0; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px; box-shadow: 0 2px 4px rgba(4, 120, 87, 0.2);">
                      Définir un nouveau mot de passe
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px 0; font-size: 12px; line-height: 20px; color: #64748b;">
                Ce lien sécurisé est valable pendant <strong>1 heure</strong>. Si vous n'avez pas sollicité cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
              </p>
              
              <p style="margin: 20px 0 0 0; font-size: 11px; line-height: 18px; color: #94a3b8; word-break: break-all;">
                Si le bouton ne fonctionne pas, copiez-collez cette adresse dans votre navigateur :<br>
                <a href="${resetUrl}" style="color: #047857; text-decoration: underline;">${resetUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                © ${new Date().getFullYear()} Les Épices de Sulson — Cockpit Administrateur Privé
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    if (!transporter) {
      console.warn(
        "⚠️ [SMTP O2switch] Les identifiants SMTP_USER ou SMTP_PASS ne sont pas encore renseignés dans vos variables d'environnement."
      );
      console.log(`🔗 [Lien de réinitialisation généré] : ${resetUrl}`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: "Réinitialisation de votre mot de passe — Les Épices de Sulson",
      html: htmlContent,
      text: `Réinitialisation de votre mot de passe Les Épices de Sulson :\n\nPour définir votre nouveau mot de passe, cliquez sur ce lien :\n${resetUrl}\n\nCe lien est valable 1 heure.`,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Erreur lors de l'envoi de l'email via SMTP O2switch:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur d'envoi SMTP",
    };
  }
}
