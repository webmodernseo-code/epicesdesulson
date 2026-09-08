import nodemailer from "nodemailer";

interface SendPasswordResetParams {
  to: string;
  resetUrl: string;
}

interface SendOrderShippedParams {
  to: string;
  customerName: string;
  orderNumber: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
}

interface SendOrderConfirmationParams {
  to: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  shippingStreet: string;
  shippingCity: string;
  shippingPostal: string;
  items: {
    productName: string;
    formatLabel: string;
    quantity: number;
    totalPrice: number;
  }[];
}

interface SendAbandonedCartReminderParams {
  to: string;
  customerName: string;
  cartUrl: string;
  discountCode?: string;
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
      rejectUnauthorized: false,
    },
  });
}

// 1. Password Reset Email
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
  <title>Réinitialisation de mot de passe</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <h2 style="margin: 0; color: #047857; font-size: 22px; font-weight: 800;">Les Épices de Sulson</h2>
              <p style="margin: 4px 0 0 0; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Cockpit Administrateur</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 19px; font-weight: 700; color: #0f172a;">Réinitialisation de votre accès</h1>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
                Bonjour,<br><br>
                Une demande de réinitialisation de mot de passe a été initiée pour le compte <strong>${to}</strong>.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px 0; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px;">Définir un nouveau mot de passe</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Ce lien est valable 1 heure.</p>
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
      console.log(`🔗 [Lien de réinitialisation généré] : ${resetUrl}`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: "Réinitialisation de votre mot de passe — Les Épices de Sulson",
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 2. Order Shipped Notification Email
export async function sendOrderShippedEmail({
  to,
  customerName,
  orderNumber,
  carrier,
  trackingNumber,
  trackingUrl,
}: SendOrderShippedParams): Promise<{ success: boolean; error?: string }> {
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
  <title>Votre commande ${orderNumber} est en route !</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden;">
          <tr>
            <td style="padding: 32px; background-color: #047857; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800;">Les Épices de Sulson</h1>
              <p style="margin: 4px 0 0 0; color: #a7f3d0; font-size: 12px; font-weight: 600;">Expédition de votre commande</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a;">Bonjour ${customerName},</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
                Bonne nouvelle ! Vos épices précieuses viennent d'être préparées avec soin dans notre atelier et confiées à notre transporteur <strong>${carrier}</strong>.
              </p>
              
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 14px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Numéro de commande : <strong style="color: #0f172a;">${orderNumber}</strong></p>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">Transporteur : <strong style="color: #0f172a;">${carrier}</strong></p>
                <p style="margin: 0; font-size: 13px; color: #64748b;">Numéro de suivi : <strong style="color: #047857;">${trackingNumber}</strong></p>
              </div>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px 0; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="${trackingUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px;">Suivre mon colis en temps réel</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0 0; font-size: 12px; color: #64748b; line-height: 18px;">
                Délai indicatif d'acheminement : 48h à 72h ouvrées en France métropolitaine.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">© ${new Date().getFullYear()} Les Épices de Sulson — Saveurs d'exception & Terroirs</p>
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
      console.log(`📦 [Email Expédition simulé] Commande ${orderNumber} envoyée à ${to} avec suivi ${trackingNumber}`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `Votre commande ${orderNumber} a été expédiée ! — Les Épices de Sulson`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 3. Order Confirmation Email
export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  totalAmount,
  shippingStreet,
  shippingCity,
  shippingPostal,
  items,
}: SendOrderConfirmationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getSmtpTransporter();
    const fromAddress =
      process.env.SMTP_FROM ||
      `"Les Épices de Sulson" <${process.env.SMTP_USER || "contact@epicesdesulson.com"}>`;

    const itemsRows = items
      .map(
        (it) => `
      <tr>
        <td style="padding: 10px 0; font-size: 13px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
          <strong>${it.quantity}x</strong> ${it.productName} (${it.formatLabel})
        </td>
        <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right; border-bottom: 1px solid #f1f5f9;">
          ${it.totalPrice.toFixed(2)} €
        </td>
      </tr>
    `
      )
      .join("");

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Confirmation de commande ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden;">
          <tr>
            <td style="padding: 32px; background-color: #047857; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800;">Les Épices de Sulson</h1>
              <p style="margin: 4px 0 0 0; color: #a7f3d0; font-size: 12px; font-weight: 600;">Confirmation de votre commande</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a;">Merci pour votre confiance, ${customerName} !</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
                Nous avons bien enregistré votre commande <strong>${orderNumber}</strong>. Nos équipes la préparent avec soin.
              </p>

              <table role="presentation" width="100%" style="margin: 20px 0; border-collapse: collapse;">
                ${itemsRows}
                <tr>
                  <td style="padding: 14px 0 0 0; font-size: 15px; font-weight: 800; color: #0f172a;">Total TTC réglé</td>
                  <td style="padding: 14px 0 0 0; font-size: 16px; font-weight: 800; color: #047857; text-align: right;">${totalAmount.toFixed(2)} €</td>
                </tr>
              </table>

              <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; margin-top: 20px;">
                <p style="margin: 0; font-size: 12px; color: #64748b;">
                  <strong>Adresse de livraison :</strong><br>
                  ${shippingStreet}, ${shippingPostal} ${shippingCity} (France)
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">© ${new Date().getFullYear()} Les Épices de Sulson</p>
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
      console.log(`✉️ [Confirmation Commande simulée] ${orderNumber} envoyée à ${to}`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `Confirmation de votre commande ${orderNumber} — Les Épices de Sulson`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 4. Abandoned Cart Reminder Email
export async function sendAbandonedCartReminderEmail({
  to,
  customerName,
  cartUrl,
  discountCode = "SULSON10",
}: SendAbandonedCartReminderParams): Promise<{ success: boolean; error?: string }> {
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
  <title>Vos épices vous attendent !</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden;">
          <tr>
            <td style="padding: 32px; background-color: #047857; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800;">Les Épices de Sulson</h1>
              <p style="margin: 4px 0 0 0; color: #a7f3d0; font-size: 12px; font-weight: 600;">Votre panier a été réservé</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #0f172a;">Bonjour ${customerName || "Gourmet"},</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
                Vous avez laissé d'authentiques épices Sulson dans votre panier. Ne passez pas à côté de saveurs d'exception pour vos prochains plats !
              </p>

              <div style="background-color: #f0fdf4; border: 1px dashed #22c55e; padding: 18px; border-radius: 12px; text-align: center; margin: 24px 0;">
                <p style="margin: 0 0 6px 0; font-size: 13px; color: #15803d; font-weight: 600;">Profitez de 10% de remise immédiate avec le code :</p>
                <span style="font-size: 20px; font-weight: 800; color: #047857; letter-spacing: 2px;">${discountCode}</span>
              </div>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px 0; width: 100%;">
                <tr>
                  <td align="center">
                    <a href="${cartUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px;">Finaliser ma commande</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">© ${new Date().getFullYear()} Les Épices de Sulson</p>
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
      console.log(`🛒 [Relance Panier simulée] envoyée à ${to}`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `Vos épices favorites vous attendent (-10% avec ${discountCode}) — Les Épices de Sulson`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
