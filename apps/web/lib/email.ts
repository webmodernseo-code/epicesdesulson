import nodemailer from "nodemailer";

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
  invoiceUrl?: string;
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

/**
 * Send Transactional Order Confirmation with PDF Invoice Link
 */
export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  totalAmount,
  shippingStreet,
  shippingCity,
  shippingPostal,
  items,
  invoiceUrl,
}: SendOrderConfirmationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getSmtpTransporter();
    const fromAddress =
      process.env.SMTP_FROM ||
      `"Les Épices de Sulson" <${process.env.SMTP_USER || "contact@epicesdesulson.com"}>`;

    const finalInvoiceUrl =
      invoiceUrl || `https://epicesdesulson.com/api/orders/${orderNumber}/invoice`;

    const itemsRows = items
      .map(
        (it) => `
      <tr>
        <td style="padding: 12px 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
          <strong>${it.quantity}x</strong> ${it.productName} <span style="color: #64748b; font-size: 12px;">(${it.formatLabel})</span>
        </td>
        <td style="padding: 12px 0; font-size: 14px; font-weight: 700; color: #0f172a; text-align: right; border-bottom: 1px solid #f1f5f9;">
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
  <title>Confirmation de commande ${orderNumber} - Les Épices de Sulson</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
          <!-- Header -->
          <tr>
            <td style="padding: 36px 30px; background-color: #047857; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">🌿 Les Épices de Sulson</h1>
              <p style="margin: 6px 0 0 0; color: #a7f3d0; font-size: 13px; font-weight: 600;">Confirmation de commande & Facture acquittée</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Merci pour votre confiance, ${customerName} !</h2>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">
                Nous avons bien validé votre paiement pour la commande <strong>${orderNumber}</strong>. Vos épices artisanales d'exception sont en cours de préparation dans notre atelier.
              </p>

              <!-- Order items -->
              <table role="presentation" width="100%" style="margin: 20px 0; border-collapse: collapse;">
                ${itemsRows}
                <tr>
                  <td style="padding: 16px 0 0 0; font-size: 16px; font-weight: 800; color: #0f172a;">Total TTC réglé</td>
                  <td style="padding: 16px 0 0 0; font-size: 18px; font-weight: 800; color: #047857; text-align: right;">${totalAmount.toFixed(2)} €</td>
                </tr>
              </table>

              <!-- Invoice Download Button -->
              <div style="text-align: center; margin: 30px 0 25px 0;">
                <a href="${finalInvoiceUrl}" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                  📄 Télécharger ma Facture (PDF)
                </a>
              </div>

              <!-- Shipping Info -->
              <div style="background-color: #f8fafc; padding: 18px; border-radius: 14px; border: 1px solid #f1f5f9; margin-top: 20px;">
                <p style="margin: 0; font-size: 13px; color: #475569; line-height: 20px;">
                  <strong style="color: #0f172a;">Adresse de livraison :</strong><br>
                  ${shippingStreet}, ${shippingPostal} ${shippingCity} (France)<br>
                  <span style="color: #64748b; font-size: 12px; display: inline-block; margin-top: 4px;">🚚 Mode : Colissimo / Lettre Suivie avec numéro de tracking dès expédition.</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} Les Épices de Sulson • Épicerie Fine & Saveurs d'Exception<br>
                Une question ? Contactez notre atelier à <a href="mailto:contact@epicesdesulson.com" style="color: #047857; text-decoration: none;">contact@epicesdesulson.com</a>
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
      console.log(`✉️ [Confirmation Commande avec Facture PDF] Commande ${orderNumber} adressée à ${to} (Lien facture: ${finalInvoiceUrl})`);
      return { success: true };
    }

    await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `✓ Facture & Confirmation de commande ${orderNumber} - Les Épices de Sulson`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur envoi email confirmation commande:", error);
    return { success: false, error: error.message };
  }
}
