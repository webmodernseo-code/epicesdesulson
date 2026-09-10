import { NextResponse } from "next/server";
import { OrdersService } from "@/lib/orders-service";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Identifiant de commande requis", { status: 400 });
    }

    // Lookup order in domain service / DB
    let order = await OrdersService.getOrderById(id);

    if (!order && process.env.DATABASE_URL) {
      try {
        const dbOrder = await prisma.order.findFirst({
          where: {
            OR: [
              { id },
              { orderNumber: id },
              { orderNumber: `SUL-${id}` },
            ],
          },
          include: {
            items: true,
          },
        });

        if (dbOrder) {
          order = {
            id: dbOrder.id,
            orderNumber: dbOrder.orderNumber,
            customerName: dbOrder.customerName,
            customerEmail: dbOrder.customerEmail,
            subtotal: Number(dbOrder.subtotal),
            shippingCost: Number(dbOrder.shippingCost),
            discountAmount: Number(dbOrder.discountAmount),
            totalAmount: Number(dbOrder.totalAmount),
            status: dbOrder.status as any,
            paymentStatus: dbOrder.paymentStatus as any,
            items: dbOrder.items.map((it) => ({
              productId: it.productId || "SUL-301",
              productName: it.productName,
              formatLabel: it.formatLabel || "100g",
              quantity: it.quantity,
              unitPrice: Number(it.unitPrice),
              totalPrice: Number(it.totalPrice),
            })),
            createdAt: dbOrder.createdAt.toISOString(),
          };
        }
      } catch (dbErr) {
        console.warn("DB Invoice lookup failed:", dbErr);
      }
    }

    if (!order) {
      return new NextResponse("Commande introuvable", { status: 404 });
    }

    const invoiceNumber = `FAC-${new Date(order.createdAt).getFullYear()}-${order.orderNumber.replace(/[^0-9]/g, "")}`;
    const invoiceDate = new Date(order.createdAt).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const vatRate = 0.055; // 5.5% TVA alimentaire France
    const totalTtc = order.totalAmount;
    const totalHt = parseFloat((totalTtc / (1 + vatRate)).toFixed(2));
    const totalTva = parseFloat((totalTtc - totalHt).toFixed(2));
    const subtotalHt = parseFloat((order.subtotal / (1 + vatRate)).toFixed(2));

    const itemsHtml = order.items
      .map((item) => {
        const itemHt = parseFloat((item.totalPrice / (1 + vatRate)).toFixed(2));
        const unitHt = parseFloat((item.unitPrice / (1 + vatRate)).toFixed(2));
        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 14px 12px; font-weight: 600; color: #0f172a;">
              ${item.productName}
              <div style="font-size: 11px; font-weight: 400; color: #64748b; margin-top: 2px;">
                Format : ${item.formatLabel}
              </div>
            </td>
            <td style="padding: 14px 12px; text-align: center; color: #334155; font-weight: 600;">
              ${item.quantity}
            </td>
            <td style="padding: 14px 12px; text-align: right; color: #334155;">
              ${unitHt.toFixed(2)} €
            </td>
            <td style="padding: 14px 12px; text-align: center; color: #64748b; font-size: 12px;">
              5,5 %
            </td>
            <td style="padding: 14px 12px; text-align: right; font-weight: 700; color: #0f172a;">
              ${item.totalPrice.toFixed(2)} €
            </td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Facture ${invoiceNumber} - Les Épices de Sulson</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 30px 15px;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 45px 50px;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 30px;
      border-bottom: 2px solid #f1f5f9;
      gap: 20px;
    }
    .brand-logo {
      font-size: 24px;
      font-weight: 800;
      color: #047857;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
      font-weight: 500;
    }
    .invoice-title-block {
      text-align: right;
    }
    .invoice-badge {
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }
    .invoice-number {
      font-family: 'Space Mono', monospace;
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      padding: 30px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .meta-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    .meta-content {
      font-size: 13px;
      color: #334155;
    }
    .meta-content strong {
      color: #0f172a;
      font-weight: 700;
      font-size: 14px;
    }
    table.items-table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
      font-size: 13px;
    }
    table.items-table th {
      background: #f8fafc;
      padding: 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
    }
    .totals-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
    .totals-table {
      width: 320px;
      font-size: 13px;
    }
    .totals-table td {
      padding: 6px 0;
      color: #475569;
    }
    .totals-table td.amount {
      text-align: right;
      font-weight: 600;
      color: #0f172a;
    }
    .totals-table tr.total-ttc td {
      padding-top: 14px;
      border-top: 2px solid #0f172a;
      font-size: 17px;
      font-weight: 800;
      color: #047857;
    }
    .totals-table tr.total-ttc td.amount {
      font-size: 20px;
    }
    .footer-note {
      margin-top: 40px;
      padding-top: 25px;
      border-top: 1px solid #f1f5f9;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.6;
    }
    .print-actions {
      max-width: 800px;
      margin: 0 auto 20px auto;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-print {
      background: #047857;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06);
      transition: background 0.2s;
    }
    .btn-print:hover {
      background: #065f46;
    }
    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .print-actions {
        display: none !important;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>

  <!-- Print Actions Header -->
  <div class="print-actions">
    <button onclick="window.print()" class="btn-print">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      Imprimer / Enregistrer en PDF
    </button>
  </div>

  <div class="invoice-card">
    <!-- Header -->
    <div class="header-row">
      <div>
        <div style="margin-bottom: 6px;">
          <img src="/images/logo.png" alt="Les Épices de Sulson" style="height: 48px; width: auto; max-width: 220px; object-fit: contain; display: block;" onerror="this.onerror=null; this.src='https://epicesdesulson.com/images/logo.png';" />
        </div>
        <div class="brand-sub">Épicerie Fine &amp; Saveurs d'Exception</div>
        <div class="meta-content" style="margin-top: 8px; font-size: 12px; color: #64748b; line-height: 18px;">
          75001 Paris, France<br>
          contact@epicesdesulson.com • www.epicesdesulson.com
        </div>
      </div>

      <div class="invoice-title-block">
        <div class="invoice-badge">Facture Acquittée</div>
        <div class="invoice-number">${invoiceNumber}</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Date : ${invoiceDate}</div>
        <div style="font-size: 12px; color: #64748b;">Commande N° : <strong>${order.orderNumber}</strong></div>
      </div>
    </div>

    <!-- Meta Grid -->
    <div class="meta-grid">
      <div>
        <div class="meta-title">Facturé &amp; Livré à</div>
        <div class="meta-content">
          <strong>${order.customerName}</strong><br>
          ${order.customerEmail}
        </div>
      </div>

      <div>
        <div class="meta-title">Règlement &amp; Statut</div>
        <div class="meta-content">
          Mode de paiement : <strong>Carte Bancaire / Stripe</strong><br>
          Statut : <strong style="color: #047857;">Paiement Validé</strong><br>
          Devise : <strong>Euro (€)</strong>
        </div>
      </div>
    </div>

    <!-- Items Table -->
    <table class="items-table">
      <thead>
        <tr>
          <th style="text-align: left;">Désignation de l'épice</th>
          <th style="text-align: center;">Qté</th>
          <th style="text-align: right;">Prix Unit. HT</th>
          <th style="text-align: center;">TVA</th>
          <th style="text-align: right;">Total TTC</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals-wrapper">
      <table class="totals-table">
        <tr>
          <td>Sous-total HT :</td>
          <td class="amount">${subtotalHt.toFixed(2)} €</td>
        </tr>
        <tr>
          <td>TVA (5,5 %) :</td>
          <td class="amount">${totalTva.toFixed(2)} €</td>
        </tr>
        <tr>
          <td>Frais de livraison :</td>
          <td class="amount">${order.shippingCost === 0 ? "Offerts (0,00 €)" : order.shippingCost.toFixed(2) + " €"}</td>
        </tr>
        ${
          order.discountAmount > 0
            ? `
        <tr>
          <td style="color: #047857;">Remise fidélité :</td>
          <td class="amount" style="color: #047857;">-${order.discountAmount.toFixed(2)} €</td>
        </tr>`
            : ""
        }
        <tr class="total-ttc">
          <td>Total TTC payé :</td>
          <td class="amount">${totalTtc.toFixed(2)} €</td>
        </tr>
      </table>
    </div>

    <!-- Footer Note -->
    <div class="footer-note">
      TVA non applicable selon art. 293 B du CGI ou TVA à 5,5 % selon art. 278-0 bis du Code Général des Impôts.<br>
      Les Épices de Sulson • Merci pour votre confiance gastronomique !
    </div>
  </div>

  <script>
    // Auto-trigger print dialog if requested with ?print=true
    if (window.location.search.includes('print=true')) {
      window.addEventListener('load', () => window.print());
    }
  </script>
</body>
</html>
    `;

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: any) {
    return new NextResponse("Erreur lors de la génération de la facture: " + error.message, {
      status: 500,
    });
  }
}
