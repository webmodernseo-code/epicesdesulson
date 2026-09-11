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
  shippingAddress?: string;
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

interface SendPasswordResetParams {
  to: string;
  resetUrl: string;
}

interface SendAbandonedCartReminderParams {
  to: string;
  customerName: string;
  cartUrl: string;
  discountCode?: string;
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
    // Fallback to env
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

/**
 * Standard Email Shell Wrapper with Official Brand Logo
 */
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

// ── 2. ÉTAPE 2 : Commande en cours de préparation dans l'atelier ──
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
  shippingAddress,
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

// ── 7. MOT DE PASSE OUBLIÉ ──
export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: SendPasswordResetParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();

    const bodyHtml = `
      <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0f172a;">Réinitialisation de votre accès</h1>
      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 24px; color: #475569;">
        Bonjour,<br><br>
        Une demande de réinitialisation de mot de passe a été initiée pour le compte <strong>${to}</strong>.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          Définir un nouveau mot de passe
        </a>
      </div>
      <p style="margin: 0; font-size: 12px; color: #64748b;">Ce lien sécurisé est valable pendant 1 heure.</p>
    `;

    const fullHtml = buildEmailTemplate({
      title: "Réinitialisation de mot de passe",
      preheader: "Cockpit Administrateur",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      return { success: false, error: "Configuration SMTP absente." };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: "Réinitialisation de votre mot de passe - Les Épices de Sulson",
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── 8. RELANCE PANIER ABANDONNÉ ──
export async function sendAbandonedCartReminderEmail({
  to,
  customerName,
  cartUrl,
  discountCode = "SULSON10",
}: SendAbandonedCartReminderParams): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();

    const bodyHtml = `
      <h2 style="margin: 0 0 12px 0; font-size: 19px; color: #0f172a;">Bonjour ${customerName || "Gourmet"},</h2>
      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #475569;">
        Vous avez laissé d'authentiques épices Sulson dans votre panier. Ne passez pas à côté de saveurs d'exception pour vos prochains plats !
      </p>

      <div style="background-color: #f0fdf4; border: 1px dashed #22c55e; padding: 18px; border-radius: 12px; text-align: center; margin: 24px 0;">
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #15803d; font-weight: 600;">Profitez de 10% de remise immédiate avec le code :</p>
        <span style="font-size: 20px; font-weight: 800; color: #047857; letter-spacing: 2px;">${discountCode}</span>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${cartUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          Finaliser ma commande
        </a>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: "Vos épices vous attendent",
      preheader: "Votre panier a été réservé",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Relance Panier simulée] envoyée à ${to}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `Vos épices favorites vous attendent (-10% avec ${discountCode}) - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── 9. NOTIFICATION NOUVELLE COMMANDE POUR L'ADMINISTRATEUR / GÉRANTE ──
export async function sendAdminNewOrderAlertEmail({
  to,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  totalAmount,
  paymentMethod,
  shippingAddress,
  items = [],
  dashboardUrl = "https://epicesdesulson.com/orders",
}: {
  to?: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  paymentMethod: string;
  shippingAddress?: string;
  items?: OrderItemSummary[];
  dashboardUrl?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();
    const recipient = to || process.env.ADMIN_EMAIL || process.env.SMTP_USER || "contact@epicesdesulson.com";

    const itemsHtml = items.length > 0
      ? `
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin: 16px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #0f172a;">Articles commandés :</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155;">
            ${items.map(it => `<li style="margin-bottom: 4px;"><strong>${it.quantity}x</strong> ${it.productName} <em>(${it.formatLabel})</em></li>`).join("")}
          </ul>
        </div>
      `
      : "";

    const bodyHtml = `
      <div style="border-left: 4px solid #047857; padding-left: 14px; margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 1px;">Alerte Boutique En Direct</span>
        <h1 style="margin: 4px 0 0 0; font-size: 21px; font-weight: 700; color: #0f172a;">Nouvelle commande reçue #${orderNumber}</h1>
      </div>

      <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #475569;">
        Un client vient de finaliser un achat sur votre boutique en ligne.
      </p>

      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #334155;">
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Client :</td>
            <td style="padding: 4px 0; font-weight: 700; color: #0f172a; text-align: right;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">E-mail :</td>
            <td style="padding: 4px 0; text-align: right;"><a href="mailto:${customerEmail}" style="color: #047857; text-decoration: none;">${customerEmail}</a></td>
          </tr>
          ${customerPhone ? `
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Téléphone :</td>
            <td style="padding: 4px 0; text-align: right;">${customerPhone}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Montant encaissé :</td>
            <td style="padding: 4px 0; font-weight: 800; color: #047857; font-size: 15px; text-align: right;">${new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalAmount)}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Moyen de paiement :</td>
            <td style="padding: 4px 0; text-align: right; text-transform: uppercase; font-weight: 600;">${paymentMethod}</td>
          </tr>
          ${shippingAddress ? `
          <tr>
            <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Adresse de livraison :</td>
            <td style="padding: 4px 0; text-align: right;">${shippingAddress}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      ${itemsHtml}

      <div style="text-align: center; margin: 28px 0;">
        <a href="${dashboardUrl}" style="display: inline-block; background-color: #047857; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 30px; border-radius: 12px; box-shadow: 0 2px 6px rgba(4,120,87,0.25);">
          Ouvrir la commande dans le Cockpit
        </a>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: `Nouvelle commande #${orderNumber}`,
      preheader: `Montant : ${totalAmount.toFixed(2)} € par ${customerName}`,
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Alerte Admin simulée] Nouvelle commande #${orderNumber} par ${customerName} (${totalAmount} €)`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to: recipient,
      subject: `[Nouvelle Commande] #${orderNumber} reçue (${new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalAmount)}) - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.warn("Erreur alerte email admin:", error);
    return { success: false, error: error.message };
  }
}

// ── 10. MESSAGE DIRECT AU CLIENT DEPUIS LE DESK SUPPORT ──
export async function sendCustomerDirectMessageEmail({
  to,
  customerName,
  subject,
  message,
}: {
  to: string;
  customerName: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const smtp = await getSmtpTransporter();

    const bodyHtml = `
      <h2 style="margin: 0 0 14px 0; font-size: 19px; color: #0f172a;">Bonjour ${customerName || "Gourmet"},</h2>
      <div style="font-size: 14px; line-height: 24px; color: #334155; margin-bottom: 24px; white-space: pre-line;">
        ${message}
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #64748b;">
        <p style="margin: 0 0 4px 0;"><strong>L'équipe Les Épices de Sulson</strong></p>
        <p style="margin: 0;">Besoin d'un conseil ? Répondez simplement à cet e-mail ou écrivez-nous sur WhatsApp.</p>
      </div>
    `;

    const fullHtml = buildEmailTemplate({
      title: subject,
      preheader: "Message du service client Les Épices de Sulson",
      contentHtml: bodyHtml,
    });

    if (!smtp) {
      console.log(`[Message direct simulé envoyé à ${to}] : ${message}`);
      return { success: true };
    }

    await smtp.transporter.sendMail({
      from: smtp.fromAddress,
      to,
      subject: `${subject} - Les Épices de Sulson`,
      html: fullHtml,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
