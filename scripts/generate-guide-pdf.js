const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const docsDir = path.join(__dirname, '..', 'apps', 'web', 'public', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const currentDate = new Date().toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Guide de Gestion & Présentation — Les Épices de Sulson</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      line-height: 1.65;
      padding: 40px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .doc-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 55px 60px;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
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

    /* Header */
    .header-block {
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 25px;
      margin-bottom: 30px;
    }
    .badge-gold {
      display: inline-block;
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 14px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .doc-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      color: #064e3b;
      line-height: 1.25;
      margin-bottom: 10px;
    }
    .doc-subtitle {
      font-size: 14.5px;
      color: #64748b;
      font-weight: 500;
      max-width: 680px;
    }
    .doc-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 14px;
      font-size: 11.5px;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Sommaire */
    .toc-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px 24px;
      margin-bottom: 35px;
    }
    .toc-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 20px;
      font-size: 12.5px;
      color: #334155;
    }
    .toc-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toc-item span {
      font-weight: 700;
      color: #059669;
    }

    /* Sections */
    .section-block {
      margin-bottom: 38px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 1.5px solid #f1f5f9;
    }
    .section-num {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #059669;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
    }

    p {
      font-size: 13.5px;
      color: #334155;
      margin-bottom: 12px;
      line-height: 1.65;
    }
    p strong {
      color: #0f172a;
    }

    /* Feature Grid / Cards */
    .feature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 16px 0;
    }
    .feature-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .feature-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .feature-icon {
      font-size: 16px;
    }
    .feature-card-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }
    .feature-card-desc {
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }

    /* Step Cards (Timeline) */
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 16px 0;
    }
    .step-item {
      display: flex;
      gap: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 18px;
    }
    .step-badge {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #0f172a;
      color: white;
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .step-content h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 3px;
    }
    .step-content p {
      font-size: 12.5px;
      color: #475569;
      margin-bottom: 0;
    }

    /* Highlight Callouts */
    .callout-success {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 14px 0;
    }
    .callout-success h4 {
      color: #065f46;
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .callout-success p {
      color: #047857;
      font-size: 12.5px;
      margin-bottom: 0;
    }

    .callout-info {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 14px 0;
    }
    .callout-info h4 {
      color: #1e40af;
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .callout-info p {
      color: #1d4ed8;
      font-size: 12.5px;
      margin-bottom: 0;
    }

    .callout-warning {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 14px 0;
    }
    .callout-warning h4 {
      color: #92400e;
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .callout-warning p {
      color: #b45309;
      font-size: 12.5px;
      margin-bottom: 0;
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 16px 0;
      font-size: 12.5px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
    }
    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      text-align: left;
      padding: 10px 14px;
      border-bottom: 1px solid #e2e8f0;
    }
    td {
      padding: 10px 14px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    tr:last-child td {
      border-bottom: none;
    }

    /* Footer */
    .doc-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #f1f5f9;
      text-align: center;
      font-size: 11.5px;
      color: #94a3b8;
    }
    .doc-footer strong {
      color: #064e3b;
    }
  </style>
</head>
<body>

  <div class="doc-container">

    <!-- Header Block -->
    <div class="header-block">
      <span class="badge-gold">Guide Pratique & Non-Technique</span>
      <h1 class="doc-main-title">Prendre en main votre Boutique en Ligne</h1>
      <p class="doc-subtitle">
        Toutes les fonctionnalités de votre site <strong>Les Épices de Sulson</strong> expliquées simplement, pas à pas, pour gérer vos ventes, vos commandes et vos clients en toute autonomie.
      </p>
      <div class="doc-meta">
        <span>🏪 Boutique : Les Épices de Sulson</span>
        <span>🌐 Site : epicesdesulson.com</span>
        <span>📅 Édition : ${currentDate}</span>
      </div>
    </div>

    <!-- Sommaire -->
    <div class="toc-card">
      <div class="toc-title">📖 Sommaire du Guide</div>
      <div class="toc-grid">
        <div class="toc-item"><span>1.</span> La vitrine de votre boutique</div>
        <div class="toc-item"><span>5.</span> Gérer vos produits & vos prix</div>
        <div class="toc-item"><span>2.</span> Comment un client commande</div>
        <div class="toc-item"><span>6.</span> Créer des codes promotionnels</div>
        <div class="toc-item"><span>3.</span> Comment vous encaissez l'argent</div>
        <div class="toc-item"><span>7.</span> Avis clients & Messages</div>
        <div class="toc-item"><span>4.</span> Préparer & expédier une commande</div>
        <div class="toc-item"><span>8.</span> Vos réflexes du quotidien (FAQ)</div>
      </div>
    </div>

    <!-- Section 1 : La Vitrine -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">1</div>
        <h2 class="section-title">La Vitrine de votre Boutique (Ce que voient vos clients)</h2>
      </div>
      <p>
        Votre site internet a été conçu comme une <strong>boutique artisanale haut de gamme</strong>. Il fonctionne 24h/24 et 7j/7 sur ordinateur, tablette et smartphone.
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">🌿</span>
            <div class="feature-card-title">La Page d'Accueil</div>
          </div>
          <div class="feature-card-desc">
            Présente l'histoire des Épices de Sulson, la récolte artisanale 100% naturelle du Cameroun, les 4 saveurs et le Coffret Pack Intégral.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">👁️</span>
            <div class="feature-card-title">Fiches Produits Détaillées</div>
          </div>
          <div class="feature-card-desc">
            Accessible en un clic sur l'icône <strong>Œil</strong>. Elle affiche les photos recto/verso du sachet, les ingrédients, le terroir, les recettes et les avis clients.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">🛍️</span>
            <div class="feature-card-title">Panier Latéral Fluide</div>
          </div>
          <div class="feature-card-desc">
            Le client peut ajouter des sachets en 1 clic sans quitter sa page. Une jauge lui indique combien il lui reste pour obtenir la livraison gratuite.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">⭐</span>
            <div class="feature-card-title">Avis Vérifiés avec Étoiles</div>
          </div>
          <div class="feature-card-desc">
            Les clients satisfaits déposent des commentaires qui rassurent immédiatement les nouveaux visiteurs et augmentent vos ventes.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2 : Parcours Client -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">2</div>
        <h2 class="section-title">Comment un Client passe une Commande</h2>
      </div>
      <p>
        Tout est automatisé pour que le client achète en moins de 2 minutes en toute sécurité :
      </p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-badge">1</div>
          <div class="step-content">
            <h4>Choix des épices</h4>
            <p>Le client choisit son sachet 100g (Poulet, Viande, Poisson, Gourmande) ou le Pack 4 Saveurs et clique sur <strong>"Ajouter au panier"</strong>.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">2</div>
          <div class="step-content">
            <h4>Saisie des coordonnées & livraison</h4>
            <p>Le client renseigne son adresse postale, son numéro de téléphone et choisit son mode de livraison (Colissimo Domicile ou Point Relais).</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">3</div>
          <div class="step-content">
            <h4>Paiement 100% sécurisé</h4>
            <p>Le client règle en toute confiance par <strong>Carte Bancaire (Visa, Mastercard)</strong>, <strong>Apple Pay</strong>, <strong>Google Pay</strong>, ou <strong>PayPal</strong> (avec option 4x sans frais).</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">4</div>
          <div class="step-content">
            <h4>Confirmation instantanée</h4>
            <p>Le client reçoit immédiatement son <strong>email de confirmation</strong> avec son numéro de commande et sa facture officielle en pièce jointe.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 3 : Encaissement de l'argent -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">3</div>
        <h2 class="section-title">Comment vous encaissez votre Argent</h2>
      </div>
      <p>
        Vous n'avez aucune manipulation technique à faire pour recevoir votre argent. Vos paiements sont gérés automatiquement par <strong>Stripe</strong> et <strong>PayPal</strong>, les leaders mondiaux du commerce en ligne.
      </p>

      <div class="callout-success">
        <h4>💶 Virement automatique direct sur votre compte bancaire</h4>
        <p>
          Dès qu'un client paie sur votre site, l'argent est sécurisé. Stripe et PayPal effectuent des <strong>virements automatiques réguliers</strong> directement sur votre compte bancaire professionnel (par exemple tous les jours ou chaque semaine, selon votre préférence).
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Mode de paiement</th>
            <th>Ce que fait le client</th>
            <th>Où va l'argent ?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Carte Bancaire / Apple Pay</strong></td>
            <td>Paiement direct sécurisé 3D-Secure</td>
            <td>Compte Stripe ➔ Virement automatique sur votre Banque</td>
          </tr>
          <tr>
            <td><strong>PayPal / 4x sans frais</strong></td>
            <td>Connexion à son compte PayPal</td>
            <td>Compte PayPal ➔ Virement vers votre Banque</td>
          </tr>
          <tr>
            <td><strong>Virement Bancaire</strong></td>
            <td>Reçoit votre RIB et fait le virement</td>
            <td>Arrive directement sur votre compte bancaire</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4 : Traitement des commandes -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">4</div>
        <h2 class="section-title">Le Guide du Quotidien : Préparer et Expédier une Commande</h2>
      </div>
      <p>
        Voici les <strong>5 étapes très simples</strong> à suivre chaque fois qu'une commande arrive :
      </p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-badge">A</div>
          <div class="step-content">
            <h4>Vous recevez une alerte email</h4>
            <p>Dès qu'un achat est validé, vous recevez un email : <em>"Nouvelle commande #1042 reçue - 23,96 €"</em> avec la liste des épices achetées et l'adresse du client.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">B</div>
          <div class="step-content">
            <h4>Ouvrez votre Tableau de Bord (Dashboard)</h4>
            <p>Connectez-vous sur votre espace d'administration à l'onglet <strong>Commandes (Orders)</strong> pour voir le détail de la commande.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">C</div>
          <div class="step-content">
            <h4>Préparez le colis</h4>
            <p>Prenez les sachets d'épices demandés, glissez-les dans votre carton/enveloppe bullée et imprimez le bon de commande depuis le dashboard pour l'ajouter dans le paquet.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">D</div>
          <div class="step-content">
            <h4>Collez l'étiquette de transport</h4>
            <p>Générez votre étiquette Colissimo ou Mondial Relay, collez-la sur le colis et déposez-le en bureau de poste ou point relais.</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-badge">E</div>
          <div class="step-content">
            <h4>Passez la commande en "Expédiée"</h4>
            <p>Dans votre tableau de bord, cliquez sur la commande, collez le <strong>numéro de suivi du colis</strong> et cliquez sur <strong>"Marquer comme expédiée"</strong>. Le client reçoit automatiquement un email avec le lien pour suivre son paquet en temps réel !</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 5 : Gestion des Produits -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">5</div>
        <h2 class="section-title">Gérer vos Produits et vos Prix</h2>
      </div>
      <p>
        Depuis l'onglet <strong>Produits (Products)</strong> de votre tableau de bord, vous avez la main totale sur votre catalogue :
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">🏷️</span>
            <div class="feature-card-title">Modifier un Prix</div>
          </div>
          <div class="feature-card-desc">
            Vous souhaitez changer le prix d'un sachet ou créer un prix barré promotionnel ? Cliquez sur le produit, modifiez le montant et validez. Le site se met à jour immédiatement.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">📦</span>
            <div class="feature-card-title">Mettre en Rupture Temporaire</div>
          </div>
          <div class="feature-card-desc">
            Si une saveur est momentanément épuisée, vous pouvez cocher <em>"Rupture de stock"</em> en un clic. Le bouton du site indiquera alors <em>"Prévenez-moi"</em> et empêchera les commandes.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 6 : Codes Promos -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">6</div>
        <h2 class="section-title">Créer des Codes Promotionnels (Coupons)</h2>
      </div>
      <p>
        Idéal pour récompenser vos fidèles clients, lancer une campagne sur les réseaux sociaux (Instagram, TikTok) ou fêter un événement :
      </p>

      <div class="callout-info">
        <h4>💡 Exemple d'opération commerciale</h4>
        <p>
          Dans l'onglet <strong>Coupons</strong>, vous créez le code <strong>SULSON10</strong> qui offre <strong>10% de réduction</strong> pour toute commande supérieure à 20 €. Vos clients n'ont plus qu'à taper ce mot dans leur panier pour voir la remise s'appliquer instantanément !
        </p>
      </div>

      <p><strong>Ce que vous pouvez configurer facilement :</strong></p>
      <ul style="margin-left: 20px; font-size: 13px; color: #334155; line-height: 1.8;">
        <li><strong>Nom du code</strong> : ex. <em>BIENVENUE</em>, <em>FETES2026</em>, <em>MERCI</em>.</li>
        <li><strong>Montant de la remise</strong> : en pourcentage (ex. <em>-15%</em>) ou en euros (ex. <em>-5 €</em>).</li>
        <li><strong>Condition</strong> : un montant minimum d'achat (ex. <em>dès 30 €</em>).</li>
        <li><strong>Date limite</strong> : expiration automatique après une date précise.</li>
      </ul>
    </div>

    <!-- Section 7 : Avis et Contact -->
    <div class="section-block">
      <div class="section-header">
        <div class="section-num">7</div>
        <h2 class="section-title">Avis Clients et Messages de Contact</h2>
      </div>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">💬</span>
            <div class="feature-card-title">Messages des Clients (Boîte de réception)</div>
          </div>
          <div class="feature-card-desc">
            Quand un visiteur remplit le formulaire de la page <em>Contact</em>, son message arrive directement dans votre boîte email et dans l'onglet <strong>Support / Messages</strong> de votre dashboard.
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-card-header">
            <span class="feature-icon">⭐</span>
            <div class="feature-card-title">Gestion des Avis & Notes</div>
          </div>
          <div class="feature-card-desc">
            Vous pouvez consulter les retours d'expérience laissés par vos clients et modérer les commentaires pour maintenir une réputation irréprochable.
          </div>
        </div>
      </div>
    </div>

    <!-- Section 8 : FAQ & Réflexes -->
    <div class="section-block page-break">
      <div class="section-header">
        <div class="section-num">8</div>
        <h2 class="section-title">Vos Réflexes du Quotidien (Questions Fréquentes)</h2>
      </div>

      <div class="callout-warning">
        <h4>❓ Un client s'est trompé dans son adresse de livraison ?</h4>
        <p>
          Pas de panique ! Tant que le colis n'est pas déposé en poste, vous pouvez ouvrir la commande dans votre tableau de bord et modifier l'adresse avant d'imprimer l'étiquette.
        </p>
      </div>

      <div class="callout-info">
        <h4>❓ Comment effectuer un remboursement en cas de besoin ?</h4>
        <p>
          Si un client annule sa commande, vous pouvez vous rendre sur votre compte Stripe ou PayPal, sélectionner la transaction et cliquer sur <strong>"Rembourser"</strong> en 1 clic. Le client est recrédité sous 2 à 4 jours ouvrés.
        </p>
      </div>

      <div class="callout-success">
        <h4>❓ Comment suivre la performance de vos ventes ?</h4>
        <p>
          Sur la page d'accueil de votre tableau de bord, vous avez des graphiques clairs et lisibles : Chiffre d'affaires du mois, nombre total de commandes passées, panier moyen et produits les plus vendus.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="doc-footer">
      <p><strong>Les Épices de Sulson</strong> — Boutique E-commerce d'Épices Fines & Rares du Cameroun</p>
      <p style="margin-top: 4px;">Document de formation & guide d'utilisation propriétaire — Tous droits réservés.</p>
    </div>

  </div>

</body>
</html>`;

const htmlFilePath = path.join(docsDir, 'Guide_Gestion_Les_Epices_de_Sulson.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
console.log('✓ HTML guide written to:', htmlFilePath);

// Generate PDF using msedge headless
const pdfFileName = 'Guide_Gestion_Les_Epices_de_Sulson.pdf';
const pdfFilePath = path.join(docsDir, pdfFileName);
const rootPdfPath = path.join(__dirname, '..', pdfFileName);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const altEdgePath = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const chosenEdge = fs.existsSync(edgePath) ? edgePath : altEdgePath;

try {
  console.log('⚡ Generating PDF with Microsoft Edge headless...');
  const cmd = `"${chosenEdge}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfFilePath}" "${htmlFilePath}"`;
  execSync(cmd, { stdio: 'inherit' });
  
  if (fs.existsSync(pdfFilePath)) {
    fs.copyFileSync(pdfFilePath, rootPdfPath);
    const stats = fs.statSync(pdfFilePath);
    console.log(`✓ PDF successfully generated (${(stats.size / 1024).toFixed(1)} KB):`);
    console.log('  1. Public route:', pdfFilePath);
    console.log('  2. Root document:', rootPdfPath);
  }
} catch (err) {
  console.error('Error during PDF conversion:', err.message);
}
