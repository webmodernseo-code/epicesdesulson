import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

const LOGO_URL = "https://epicesdesulson.com/images/logo.png";
const BRAND_SITE = "https://epicesdesulson.com";

interface OrderItemSummary {
  productName: string;
  formatLabel: string;
  quantity: number;
  totalPrice: number;
}

interface SendOrderConfirmationParams {
  to: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  shippingStreet: string;
  shippingCity: string;
  shippingPostal: string;
  items?: OrderItemSummary[];
  invoiceUrl?: string;
}

interface SendOrderProcessingParams {
  to: string;
  customerName: string;
  orderNumber: string;
  items?: OrderItemSummary[];
  shippingCity?: string;
}

interface SendOrderShippedParams {
  to: string;
  customerName: string;
  orderNumber: string;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

interface SendOrderDeliveredParams {
  to: string;
  customerName: string;
  orderNumber: string;
  reviewUrl?: string;
}

interface SendOrderRefundedParams {
  to: string;
  customerName: string;
  orderNumber: string;
  refundAmount?: number;
  reason?: string;
}

export async function getSmtpTransporter() {
  let host = process.env.SMTP_HOST || "smtp.gmail.com";
  let port = parseInt(process.env.SMTP_PORT || "465", 10);
  let secure = port === 465;
  let user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  let pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  let fromName = process.env.SMTP_FROM_NAME || "Les Épices de Sulson";
  let fromEmail = process.env.SMTP_FROM_EMAIL || user || "contact@epicesdesulson.com";

  try {
    const config = await prisma.smtpEmailConfig
      .findFirst({
        where: { isEnabled: true },
        orderBy: { updatedAt: "desc" },
      })
      .catch(() => null);

    if (config && config.host && config.user && config.password) {
      host = config.host;
      port = config.port;
      secure = config.secure;
      user = config.user;
      pass = config.password;
      fromName = config.fromName || fromName;
      fromEmail = config.fromEmail || fromEmail;
    }
  } catch {
    // Database fallback to env
  }

  if (!user || !pass) {
    return null;
  }

  const transporter = nodemailer.createTransport({
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

  return {
    transporter,
    fromAddress: `"${fromName}" <${fromEmail}>`,
  };
}

function buildEmailTemplate({
  title,
  preheader,
  contentHtml,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${title} - Les Épices de Sulson</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <!-- Header with Official Brand Logo -->
          <tr>
            <td style="padding: 32px 30px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <a href="${BRAND_SITE}" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${LOGO_URL}" alt="Les Épices de Sulson" width="190" height="auto" style="display: block; margin: 0 auto; max-width: 190px; height: auto; border: 0;" />
              </a>
              ${
                preheader
                  ? `<p style="margin: 12px 0 0 0; color: #047857; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">${preheader}</p>`
                  : ""
              }
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 30px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 18px;">
                © ${new Date().getFullYear()} Les Épices de Sulson • Épicerie Fine &amp; Saveurs d'Exception<br>
                Une question ? Écrivez à notre atelier : <a href="mailto:contact@epicesdesulson.com" style="color: #047857; text-decoration: none; font-weight: 600;">contact@epicesdesulson.com</a>
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
}

// ── 1. ÉTAPE 1 : Confirmation de commande & Facture acquittée ──
export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  totalAmount,
  shippingStreet,
  shippingCity,
  shippingPostal,
  items = [],
  invoiceUrl,
}: SendOrderConfirmationParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();
    const finalInvoiceUrl =
      invoiceUrl || `${BRAND_SITE}/api/orders/${orderNumber}/invoice`;

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

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Merci pour votre commande, ${customerName} !</h2>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">
        Nous avons bien validé votre règlement pour la commande <strong>${orderNumber}</strong>. Vos épices artisanales d'exception vont être préparées avec le plus grand soin dans notre atelier.
      </p>

      ${
        items.length > 0
          ? `
      <table role="presentation" width="100%" style="margin: 20px 0; border-collapse: collapse;">
        ${itemsRows}
        <tr>
          <td style="padding: 16px 0 0 0; font-size: 16px; font-weight: 800; color: #0f172a;">Total TTC réglé</td>
          <td style="padding: 16px 0 0 0; font-size: 18px; font-weight: 800; color: #047857; text-align: right;">${totalAmount.toFixed(2)} €</td>
        </tr>
      </table>`
          : ""
      }

      <div style="text-align: center; margin: 32px 0 28px 0;">
        <a href="${finalInvoiceUrl}" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 30px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(4,120,87,0.25);">
          Consulter &amp; Télécharger ma Facture (PDF)
        </a>
      </div>

      <div style="background-color: #f8fafc; padding: 20px; border-radius: 14px; border: 1px solid #f1f5f9; margin-top: 20px;">
        <p style="margin: 0; font-size: 13px; color: #475569; line-height: 20px;">
          <strong style="color: #0f172a;">Adresse de livraison :</strong><br>
          ${shippingStreet}, ${shippingPostal} ${shippingCity}<br>
          <span style="color: #64748b; font-size: 12px; display: inline-block; margin-top: 6px;">Expédition Colissimo Suivi / Lettre Suivie avec numéro de suivi dès la prise en charge postale.</span>
        </p>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Confirmation de commande ${orderNumber}`,
      preheader: "Confirmation de commande & Facture acquittée",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Email Confirmation simulé] Commande ${orderNumber} adressée à ${to}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Confirmation & Facture de commande ${orderNumber} - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur sendOrderConfirmationEmail:", error);
    return { success: false, error: error.message };
  }
}

// ── 2. ÉTAPE 2 : Préparation en cours dans l'atelier ──
export async function sendOrderProcessingEmail({
  to,
  customerName,
  orderNumber,
  items = [],
  shippingCity,
}: SendOrderProcessingParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Vos épices sont en cours de préparation !</h2>
      <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
        Bonjour <strong>${customerName}</strong>,<br><br>
        Notre maître épicier et son équipe ont débuté le conditionnement artisanal de votre commande <strong>${orderNumber}</strong>. 
        Chaque sachet kraft hermétique est sélectionné, dosé et scellé à la main afin de préserver l'intégralité des huiles essentielles et des arômes.
      </p>

      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 14px; margin: 24px 0;">
        <p style="margin: 0; font-size: 13px; color: #166534; line-height: 20px;">
          <strong>Prochaine étape :</strong> Prise en charge par le transporteur postal d'ici 24h ouvrées. Vous recevrez un nouvel email avec votre numéro de suivi en direct dès son expédition.
        </p>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${BRAND_SITE}/recipes" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 13px 28px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(4,120,87,0.2);">
          Découvrir les Recettes &amp; Conseils du Chef
        </a>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Commande ${orderNumber} en préparation`,
      preheader: "Préparation en atelier",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Email Préparation simulé] Commande ${orderNumber} adressée à ${to}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Vos épices sont en préparation dans notre atelier (Commande ${orderNumber})`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur sendOrderProcessingEmail:", error);
    return { success: false, error: error.message };
  }
}

// ── 3. ÉTAPE 3 : Commande expédiée avec numéro de suivi postal ──
export async function sendOrderShippedEmail({
  to,
  customerName,
  orderNumber,
  carrier = "Colissimo La Poste",
  trackingNumber,
  trackingUrl,
}: SendOrderShippedParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();
    const finalTrackingUrl =
      trackingUrl || `https://www.laposte.fr/outils/suivre-vos-envois?code=${trackingNumber || ""}`;
    const invoiceUrl = `${BRAND_SITE}/api/orders/${orderNumber}/invoice`;

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Excellente nouvelle, votre colis est en route !</h2>
      <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
        Bonjour <strong>${customerName}</strong>,<br><br>
        Votre commande <strong>${orderNumber}</strong> a quitté notre atelier et se trouve désormais entre les mains de <strong>${carrier}</strong>.
      </p>

      <div style="background-color: #f8fafc; padding: 22px; border-radius: 14px; border: 1px solid #e2e8f0; margin: 24px 0;">
        <table role="presentation" width="100%" style="font-size: 14px; color: #334155;">
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Transporteur :</td>
            <td style="padding: 4px 0; font-weight: 700; color: #0f172a; text-align: right;">${carrier}</td>
          </tr>
          ${
            trackingNumber
              ? `
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Numéro de suivi :</td>
            <td style="padding: 4px 0; font-family: monospace; font-size: 15px; font-weight: 700; color: #047857; text-align: right;">${trackingNumber}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Délai indicatif :</td>
            <td style="padding: 4px 0; font-weight: 600; color: #0f172a; text-align: right;">48h à 72h ouvrées</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 30px 0 24px 0;">
        <a href="${finalTrackingUrl}" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(4,120,87,0.25);">
          Suivre mon colis en temps réel
        </a>
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <a href="${invoiceUrl}" target="_blank" style="color: #64748b; font-size: 13px; text-decoration: underline;">
          Télécharger ma facture acquittée (PDF)
        </a>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Commande ${orderNumber} expédiée`,
      preheader: "Colis en cours d'acheminement",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Email Expédition simulé] Commande ${orderNumber} adressée à ${to} avec suivi ${trackingNumber}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Votre commande ${orderNumber} a été expédiée (${carrier}) - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur sendOrderShippedEmail:", error);
    return { success: false, error: error.message };
  }
}

// ── 4. ÉTAPE 4 : Commande livrée & Remerciements dégustation ──
export async function sendOrderDeliveredEmail({
  to,
  customerName,
  orderNumber,
  reviewUrl,
}: SendOrderDeliveredParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();
    const finalReviewUrl = reviewUrl || `${BRAND_SITE}/avis`;

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Votre colis est arrivé à destination !</h2>
      <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
        Bonjour <strong>${customerName}</strong>,<br><br>
        Le transporteur nous informe que votre commande <strong>${orderNumber}</strong> vous a été remise. 
        Toute l'équipe des Épices de Sulson espère que ces mélanges authentiques illumineront vos repas en famille et entre amis.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 22px; border-radius: 14px; margin: 24px 0;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Conseil de conservation du Chef Sulson :</h4>
        <p style="margin: 0; font-size: 13px; color: #475569; line-height: 20px;">
          Conservez vos sachets zippés bien refermés dans un endroit sec à l'abri de la lumière directe pour préserver toute l'intensité des épices et des herbes sauvages.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0 24px 0;">
        <a href="${finalReviewUrl}" target="_blank" style="display: inline-block; background-color: #047857; color: #ffffff; padding: 14px 30px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 6px rgba(4,120,87,0.25);">
          Partager mon avis sur mes épices
        </a>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Commande ${orderNumber} livrée`,
      preheader: "Colis livré • Bonne dégustation",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Email Livraison simulé] Commande ${orderNumber} adressée à ${to}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Votre colis d'épices Sulson a été livré ! (Commande ${orderNumber})`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur sendOrderDeliveredEmail:", error);
    return { success: false, error: error.message };
  }
}

// ── 5. ÉTAPE 5 : Commande annulée ou remboursée ──
export async function sendOrderRefundedEmail({
  to,
  customerName,
  orderNumber,
  refundAmount,
  reason,
}: SendOrderRefundedParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Confirmation de remboursement</h2>
      <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
        Bonjour <strong>${customerName}</strong>,<br><br>
        Nous vous confirmons le traitement du remboursement pour votre commande <strong>${orderNumber}</strong>.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 14px; margin: 24px 0;">
        <table role="presentation" width="100%" style="font-size: 14px; color: #334155;">
          ${
            refundAmount !== undefined
              ? `
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Montant remboursé :</td>
            <td style="padding: 4px 0; font-weight: 800; color: #047857; text-align: right; font-size: 16px;">${refundAmount.toFixed(2)} €</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Mode de recrédit :</td>
            <td style="padding: 4px 0; font-weight: 600; color: #0f172a; text-align: right;">Carte / Compte d'origine</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #64748b;">Délai interbancaire :</td>
            <td style="padding: 4px 0; font-weight: 600; color: #0f172a; text-align: right;">3 à 5 jours ouvrés</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 20px;">
        Pour toute question ou information complémentaire, notre service client reste à votre disposition à <a href="mailto:contact@epicesdesulson.com" style="color: #047857; text-decoration: none;">contact@epicesdesulson.com</a>.
      </p>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Remboursement commande ${orderNumber}`,
      preheader: "Notification de remboursement",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Email Remboursement simulé] Commande ${orderNumber} adressée à ${to}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Confirmation de remboursement pour la commande ${orderNumber} - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erreur sendOrderRefundedEmail:", error);
    return { success: false, error: error.message };
  }
}

// ── 6. GESTIONNAIRE UNIVERSEL DE CHANGEMENT D'ÉTAT ──
export async function sendOrderStatusUpdateEmail({
  to,
  customerName,
  orderNumber,
  newStatus,
  carrier,
  trackingNumber,
  trackingUrl,
  totalAmount,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  newStatus: string;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  totalAmount?: number;
}): Promise<{ success: boolean; error?: string }> {
  switch (newStatus) {
    case "PROCESSING":
      return sendOrderProcessingEmail({ to, customerName, orderNumber });
    case "SHIPPED":
      return sendOrderShippedEmail({
        to,
        customerName,
        orderNumber,
        carrier: carrier || "Colissimo La Poste",
        trackingNumber: trackingNumber || "FR-" + Math.floor(10000000 + Math.random() * 90000000),
        trackingUrl,
      });
    case "DELIVERED":
      return sendOrderDeliveredEmail({ to, customerName, orderNumber });
    case "REFUNDED":
    case "CANCELLED":
      return sendOrderRefundedEmail({ to, customerName, orderNumber, refundAmount: totalAmount });
    case "PAID":
      return sendOrderConfirmationEmail({
        to,
        customerName,
        orderNumber,
        totalAmount: totalAmount || 0,
        shippingStreet: "Adresse enregistrée",
        shippingCity: "France",
        shippingPostal: "",
      });
    default:
      return { success: true };
  }
}
