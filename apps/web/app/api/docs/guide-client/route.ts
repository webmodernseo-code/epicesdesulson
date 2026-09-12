import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Manuel Propriétaire — Les Épices de Sulson</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
      padding: 40px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .doc-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 50px 55px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }

    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .doc-container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-before: always;
        break-before: page;
      }
    }

    /* Print / Action Bar */
    .action-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .action-bar button {
      background: #065f46;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 12.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .action-bar button:hover {
      background: #047857;
    }

    /* Header */
    .header-block {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .brand-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #065f46;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 3px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .doc-main-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.3;
      margin-bottom: 8px;
      letter-spacing: -0.2px;
    }
    .doc-subtitle {
      font-size: 13.5px;
      color: #475569;
      font-weight: 400;
      max-width: 680px;
      line-height: 1.55;
    }
    .doc-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 14px;
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
    }

    /* Sommaire */
    .toc-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 22px;
      margin-bottom: 30px;
    }
    .toc-title {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #334155;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 18px;
      font-size: 12px;
      color: #475569;
    }
    .toc-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toc-item span {
      font-weight: 700;
      color: #065f46;
      font-family: monospace;
      font-size: 11.5px;
    }

    /* Sections */
    .section-block {
      margin-bottom: 30px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }
    .section-num {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #0f172a;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.2px;
    }

    p {
      font-size: 13px;
      color: #334155;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    p strong {
      color: #0f172a;
      font-weight: 600;
    }

    /* Cards */
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 12px 0;
    }
    .feature-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 14px;
    }
    .feature-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .svg-icon {
      width: 16px;
      height: 16px;
      stroke: #065f46;
      flex-shrink: 0;
    }
    .feature-card-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #0f172a;
    }
    .feature-card-desc {
      font-size: 11.5px;
      color: #64748b;
      line-height: 1.5;
    }

    /* Steps */
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 12px 0;
    }
    .step-item {
      display: flex;
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 14px;
      align-items: flex-start;
    }
    .step-badge {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #0f172a;
      color: white;
      font-size: 10.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .step-content h4 {
      font-size: 12.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .step-content p {
      font-size: 12px;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.5;
    }

    /* Editorial Callouts */
    .editorial-box {
      border: 1px solid #e2e8f0;
      border-left: 3px solid #065f46;
      background: #ffffff;
      border-radius: 8px;
      padding: 10px 14px;
      margin: 12px 0;
    }
    .editorial-box h4 {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .editorial-box p {
      font-size: 12px;
      color: #475569;
      margin-bottom: 0;
      line-height: 1.5;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 12px 0;
      font-size: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
    }
    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    td {
      padding: 9px 12px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      font-size: 12px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:nth-child(even) td {
      background: #fafafa;
    }

    /* Footer */
    .doc-footer {
      margin-top: 30px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    .doc-footer strong {
      color: #065f46;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <div class="doc-container">

    <!-- Action Bar (Hidden on Print) -->
    <div class="action-bar no-print">
      <div>
        <strong style="font-size: 13px;">Manuel Propriétaire — Les Épices de Sulson</strong>
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">Ce document peut être imprimé ou sauvegardé en PDF via votre navigateur.</p>
      </div>
      <button onclick="window.print()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Imprimer / Télécharger en PDF
      </button>
    </div>

    <!-- Header Block -->
    <div class="header-block">
      <div class="brand-eyebrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        Document Officiel & Guide Pratique
      </div>
      <h1 class="doc-main-title">Manuel de Gestion de votre Boutique en Ligne</h1>
      <p class="doc-subtitle">
        Synthèse claire et opérationnelle pour piloter la boutique <strong>Les Épices de Sulson</strong> : gestion des commandes, expéditions, encaissements et catalogue sans prérequis technique.
      </p>
      <div class="doc-meta">
        <span>Boutique : Les Épices de Sulson</span>
        <span>Domaine : epicesdesulson.com</span>
        <span>Mise à jour : ${currentDate}</span>
      </div>
    </div>

    <!-- Sommaire -->
    <div class="toc-card">
      <div class="toc-title">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        Sommaire Opérationnel
      </div>
      <div class="toc-grid">
        <div class="toc-item"><span>01.</span> Vitrine & Expérience client</div>
        <div class="toc-item"><span>05.</span> Gestion des tarifs & stocks</div>
        <div class="toc-item"><span>02.</span> Parcours d'achat en ligne</div>
        <div class="toc-item"><span>06.</span> Création de codes promotionnels</div>
        <div class="toc-item"><span>03.</span> Encaissement & Versements bancaires</div>
        <div class="toc-item"><span>07.</span> Gestion des messages & avis</div>
        <div class="toc-item"><span>04.</span> Traitement & Expédition des commandes</div>
        <div class="toc-item"><span>08.</span> Réponses aux questions fréquentes</div>
      </div>
    </div>

    <!-- Section 1 : La Vitrine -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">1</div>
        <h2 class="section-title">La Vitrine de la Boutique (L'Espace Visiteur)</h2>
      </div>
      <p>
        Votre boutique en ligne est accessible en permanence sur tous les supports (mobiles, tablettes et ordinateurs). Elle valorise vos créations artisanales du Cameroun avec un rendu haut de gamme :
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <div class="feature-card-title">Page d'Accueil & Présentation</div>
          </div>
          <div class="feature-card-desc">
            Met en lumière les 4 recettes authentiques (Poulet, Viande, Poisson, Saveur Gourmande) ainsi que le Pack Intégral 4 Saveurs.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <div class="feature-card-title">Fiches Produits Détaillées</div>
          </div>
          <div class="feature-card-desc">
            Chaque produit dispose d'un bouton œil permettant d'accéder aux photos recto/verso, aux ingrédients, à l'histoire du terroir et aux idées recettes.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <div class="feature-card-title">Panier Interactif</div>
          </div>
          <div class="feature-card-desc">
            Ouverture latérale fluide permettant au client de modifier ses quantités instantanément et de suivre la jauge de livraison offerte.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <div class="feature-card-title">Réassurance & Sécurité</div>
          </div>
          <div class="feature-card-desc">
            Avis vérifiés, protocoles de paiement chiffrés SSL 256-bit et informations de livraison claires pour instaurer une confiance totale.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2 : Parcours Client -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">2</div>
        <h2 class="section-title">Le Parcours d'une Commande Client</h2>
      </div>
      <p>
        Le tunnel de commande a été conçu pour être rapide, intuitif et sans friction :
      </p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-badge">1</div>
          <div class="step-content">
            <h4>Sélection des épices</h4>
            <p>Le client choisit ses sachets fraîcheur 100g ou son Pack Intégral et valide son panier.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">2</div>
          <div class="step-content">
            <h4>Coordonnées & Mode de livraison</h4>
            <p>Le client saisit son adresse postale et sélectionne son option de transport (Colissimo Domicile ou Point Relais).</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">3</div>
          <div class="step-content">
            <h4>Paiement sécurisé</h4>
            <p>Règlement par Carte Bancaire (Visa, Mastercard, 3D-Secure), Apple Pay, Google Pay ou PayPal (avec option de paiement en 4 fois).</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">4</div>
          <div class="step-content">
            <h4>Confirmation & Facturation automatique</h4>
            <p>Le client reçoit immédiatement un email de confirmation récapitulant sa commande avec son reçu officiel en pièce jointe.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3 : Encaissement de l'argent -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">3</div>
        <h2 class="section-title">Gestion des Encaissements & Versements Bancaires</h2>
      </div>
      <p>
        Les encaissements sont entièrement automatisés par les passerelles bancaires <strong>Stripe</strong> et <strong>PayPal</strong>. Aucune saisie manuelle n'est nécessaire.
      </p>

      <div class="editorial-box">
        <h4>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Transfert direct sur votre compte bancaire
        </h4>
        <p>
          Les fonds réglés par vos clients sont automatiquement transférés depuis Stripe et PayPal vers votre compte bancaire professionnel selon la fréquence configurée (quotidienne ou hebdomadaire).
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Canal de paiement</th>
            <th>Procédure client</th>
            <th>Destination des fonds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Carte Bancaire / Apple Pay</strong></td>
            <td>Paiement direct sécurisé 3D-Secure</td>
            <td>Compte Stripe ➔ Virement automatique sur votre banque</td>
          </tr>
          <tr>
            <td><strong>PayPal / Paiement 4x</strong></td>
            <td>Identification sur le portail PayPal</td>
            <td>Compte PayPal ➔ Virement direct sur votre banque</td>
          </tr>
          <tr>
            <td><strong>Virement Bancaire</strong></td>
            <td>Réception des coordonnées IBAN de la boutique</td>
            <td>Crédit direct sur votre compte bancaire</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4 : Protocole de traitement des commandes -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">4</div>
        <h2 class="section-title">Protocole Opérationnel : Préparation & Expédition</h2>
      </div>
      <p>
        Lorsqu'une nouvelle commande est validée, suivez ce cheminement simple en 5 étapes :
      </p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-badge">A</div>
          <div class="step-content">
            <h4>Notification de commande</h4>
            <p>Vous recevez un email automatique contenant le numéro de commande, la liste des produits et l'adresse de livraison du client.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">B</div>
          <div class="step-content">
            <h4>Consultation dans le tableau de bord</h4>
            <p>Accédez à la section <strong>Commandes</strong> de votre espace d'administration pour consulter le récapitulatif détaillé.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">C</div>
          <div class="step-content">
            <h4>Conditionnement du colis</h4>
            <p>Rassemblez les sachets d'épices commandés, préparez l'emballage d'expédition et imprimez le bon de commande pour le joindre au paquet.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">D</div>
          <div class="step-content">
            <h4>Affranchissement du transporteur</h4>
            <p>Générez votre étiquette d'expédition Colissimo ou Point Relais, collez-la sur le colis et déposez l'envoi auprès du transporteur.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">E</div>
          <div class="step-content">
            <h4>Clôture & Suivi d'expédition</h4>
            <p>Dans votre tableau de bord, saisissez le numéro de suivi postal et passez la commande au statut <strong>"Expédiée"</strong>. Le client reçoit instantanément son lien de suivi par email.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 5 : Gestion du Catalogue -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">5</div>
        <h2 class="section-title">Gestion du Catalogue, Tarifs & Disponibilités</h2>
      </div>
      <p>
        Depuis la rubrique <strong>Produits</strong> de votre tableau de bord, vous pilotez l'ensemble de votre offre commerciale :
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <div class="feature-card-title">Modification des Prix</div>
          </div>
          <div class="feature-card-desc">
            Ajustez le tarif d'un produit ou appliquez un prix barré promotionnel. La mise à jour est immédiate sur la boutique.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <div class="feature-card-title">Gestion des Stocks & Ruptures</div>
          </div>
          <div class="feature-card-desc">
            En cas de rupture momentanée sur une récolte, désactivez la disponibilité en un clic pour éviter toute commande imprévue.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 6 : Codes Promotionnels -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">6</div>
        <h2 class="section-title">Création de Codes Promotionnels (Coupons)</h2>
      </div>
      <p>
        Pour animer vos réseaux sociaux ou récompenser une cliente fidèle, vous pouvez créer des codes de réduction dans l'onglet <strong>Coupons</strong> :
      </p>

      <div class="editorial-box">
        <h4>Paramètres configurables pour vos offres</h4>
        <p>
          • <strong>Code d'activation</strong> : mot-clé que le client saisira au panier (ex: <em>SULSON10</em>, <em>BIENVENUE</em>).<br>
          • <strong>Valeur de la réduction</strong> : remise en pourcentage (ex: <em>-10%</em>) ou montant fixe (ex: <em>-5 €</em>).<br>
          • <strong>Conditions de validité</strong> : montant d'achat minimum requis ou date limite d'expiration.
        </p>
      </div>
    </div>

    <!-- Section 7 : Relation Client & Avis -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">7</div>
        <h2 class="section-title">Relation Client, Messages & Modération des Avis</h2>
      </div>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div class="feature-card-title">Messages de Contact</div>
          </div>
          <div class="feature-card-desc">
            Les demandes adressées depuis le formulaire de contact parviennent directement sur votre messagerie et dans l'onglet <strong>Support</strong>.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <div class="feature-card-title">Avis & Retours d'Expérience</div>
          </div>
          <div class="feature-card-desc">
            Consultez les notes attribuées par vos acheteurs et valorisez les témoignages positifs pour renforcer votre crédibilité.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 8 : FAQ Opérationnelle -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">8</div>
        <h2 class="section-title">Réponses aux Questions Fréquentes (Situations Usuelles)</h2>
      </div>

      <div class="editorial-box">
        <h4>Modification d'adresse de livraison après commande</h4>
        <p>
          Tant que le colis n'a pas été remis au transporteur, ouvrez la commande dans votre tableau de bord pour corriger l'adresse avant d'éditer le bordereau postal.
        </p>
      </div>

      <div class="editorial-box">
        <h4>Procédure de remboursement</h4>
        <p>
          En cas d'annulation demandée par un client, connectez-vous sur votre espace Stripe ou PayPal, sélectionnez la transaction concernée et validez le remboursement. Les fonds sont recrédités sous 48 à 72 heures.
        </p>
      </div>

      <div class="editorial-box">
        <h4>Suivi de votre chiffre d'affaires</h4>
        <p>
          Le tableau de bord centralise en temps réel vos statistiques clés : chiffre d'affaires consolidé, volume de commandes, panier moyen et articles les plus plébiscités.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="doc-footer">
      <div>
        <strong>Les Épices de Sulson</strong> — Boutique E-commerce d'Épices Fines & Rares du Cameroun
      </div>
      <div>Document réservé à la direction de boutique</div>
    </div>

  </div>

</body>
</html>`;

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
