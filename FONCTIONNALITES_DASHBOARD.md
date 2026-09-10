# 📊 FONCTIONNALITÉS IMPORTANTES DU DASHBOARD ADMINISTRATEUR

> **Plateforme :** Les Épices de Sulson  
> **Application :** Back-Office de Gestion (`apps/dashboard` — `admin.epicesdesulson.com`)  
> **Objectif :** Guide exhaustif des fonctionnalités clés permettant le pilotage complet, la gestion commerciale et la configuration technique du site e-commerce sans écrire une seule ligne de code.

---

## 📑 SOMMAIRE

1. [Vue d'Ensemble & Accès Sécurisé](#1-vue-densemble--accès-sécurisé)
2. [Pilotage des Ventes & Statistiques en Temps Réel](#2-pilotage-des-ventes--statistiques-en-temps-réel)
3. [Gestion du Catalogue Produits & Formats](#3-gestion-du-catalogue-produits--formats)
4. [Pilotage des Stocks & Alertes de Réapprovisionnement](#4-pilotage-des-stocks--alertes-de-réapprovisionnement)
5. [Gestion des Commandes & Expéditions](#5-gestion-des-commandes--expéditions)
6. [Gestion des Retours & Remboursements](#6-gestion-des-retours--remboursements)
7. [Suivi des Paniers Abandonnés](#7-suivi-des-paniers-abandonnés)
8. [Journal des Transactions & Rapprochement Financier](#8-journal-des-transactions--rapprochement-financier)
9. [Modération des Avis Clients & Preuve Sociale](#9-modération-des-avis-clients--preuve-sociale)
10. [Centre de Configuration Technique (Sans Code)](#10-centre-de-configuration-technique-sans-code)
11. [Gestion des Administrateurs & Sécurité](#11-gestion-des-administrateurs--sécurité)
12. [Support Client & Boîte de Réception](#12-support-client--boîte-de-réception)
13. [Cartographie des Routes & Pages du Dashboard](#13-cartographie-des-routes--pages-du-dashboard)

---

## 1. Vue d'Ensemble & Accès Sécurisé

Le Dashboard est l'application centrale réservée à l'équipe commerciale et technique pour piloter l'ensemble de la boutique.

* **Authentification Robuste** : Connexion par identifiant/mot de passe sécurisé.
* **Sécurité Anti-Piratage** : Sessions gérées par des **cookies `HttpOnly`** inaccessibles au code JavaScript du navigateur, protégeant l'administration contre toute tentative de vol de session (failles XSS).
* **Hiérarchie des Rôles** : Contrôle strict des droits (`MASTER_ADMIN`, `ADMIN`).

---

## 2. Pilotage des Ventes & Statistiques en Temps Réel

Le tableau de bord d'accueil (`/`) fournit une vision panoramique et instantanée de la santé financière et commerciale du site :

* **Indicateurs Clés de Performance (KPIs)** :
  * **Chiffre d'Affaires Total & Périodique** (exprimé en Euros `€`).
  * **Nombre total de commandes** enregistrées et payées.
  * **Panier Moyen** par client.
  * **Taux de Conversion** des visiteurs en acheteurs.
* **Graphiques d'Activité Dynamiques** : Évolution des ventes par jour, semaine, mois ou année.
* **Flux des Dernières Commandes** : Notification et affichage en temps réel des derniers achats entrants avec leur état de traitement.

---

## 3. Gestion du Catalogue Produits & Formats

Le module `/products` permet de gérer l'intégralité du catalogue des Épices de Sulson :

* **Gestion Complète des Fiches Produits (CRUD)** :
  * Création, modification, archivage ou suppression de produits.
  * Rédaction des titres, sous-titres, origines du terroir camerounais et descriptions culinaires détaillées.
  * Saisie des prix de base et prix promotionnels barrés.
* **Gestion Multi-Formats & Déclinaisons (`ProductFormat`)** :
  * Configuration des grammages standards : **Sachet 100g** (6,90 €), **Pack 4 Saveurs 400g** (24,90 €).
  * Extensibilité immédiate : ajout de formats 50g, 250g, 500g ou 1 Kg avec calcul automatique des multiplicateurs de prix.
* **Gestion des Visuels HD** :
  * Association des photos officielles haute résolution des sachets (face recto et face verso avec composition).
* **Catégorisation Métier** :
  * Affectation aux catégories culinaires (*Spéciale Poulet, Spéciale Viande, Spéciale Poisson, Saveur Gourmande, Packs & Coffrets*).

---

## 4. Pilotage des Stocks & Alertes de Réapprovisionnement

Accessible via `/products/stocks` :

* **Visibilité en Direct** : Suivi exact du nombre d'unités physiques disponibles pour chaque référence et chaque format.
* **Décrémentation Automatique** : Dès qu'une commande est validée par Stripe ou PayPal, le stock correspondant est automatiquement réduit côté serveur.
* **Alertes de Stock Critique** : Notification visuelle dès qu'un produit passe sous le seuil minimal défini pour anticiper les ruptures et relancer la production.
* **Ajustement Manuel** : Possibilité de réajuster les stocks lors de réceptions de nouveaux arrivages ou d'inventaires.

---

## 5. Gestion des Commandes & Expéditions

Accessible via `/orders` :

* **Tableau de Suivi Consolidé** : Vue d'ensemble de toutes les commandes avec filtres par date, statut ou montant.
* **Cycle de Traitement des Commandes** :
  * Changement de statut en 1 clic : `En attente` ➔ `Payée` ➔ `En préparation` ➔ `Expédiée` ➔ `Livrée` ➔ `Annulée`.
* **Fiche Détail par Commande (`/orders/[id]`)** :
  * Coordonnées complètes du client (Nom, Email, Téléphone).
  * Adresse exacte de livraison et de facturation.
  * Détail des sachets commandés, grammages, quantités et sous-totaux.
  * Identifiant unique de la transaction bancaire.
* **Facturation Automatisée** :
  * Bouton direct pour générer, visualiser et imprimer la **facture officielle** normée (PDF / HTML).

---

## 6. Gestion des Retours & Remboursements

Accessible via `/orders/return-and-refund` :

* **Traitement des Demandes Clients** : Suivi des colis retournés ou des réclamations de rétractation.
* **Validation des Remboursements** : Déclenchement et traçabilité des remboursements.
* **Réintégration des Stocks** : Remise automatique en stock des articles retournés conformes.

---

## 7. Suivi des Paniers Abandonnés

Accessible via `/abandon-cart` ou `/orders/abandon-cart` :

* **Détection des Sessions Inachevées** : Liste des paniers créés dont le processus d'achat s'est arrêté avant le paiement.
* **Analyse de Conversion** : Identification des articles fréquemment abandonnés et des points de friction dans le tunnel d'achat.
* **Opportunité de Relance** : Base d'informations pour relancer les prospects qualifiés.

---

## 8. Journal des Transactions & Rapprochement Financier

Accessible via `/transactions` :

* **Traçabilité Financière Complète** : Registre chronologique de tous les paiements perçus.
* **Identifiants Bancaires Uniques** : Correspondance directe avec les sessions Stripe (`stripePaymentId`, `stripeSessionId`) et PayPal.
* **Statuts Financiers** : Suivi des règlements validés, des échecs de paiement et des remboursements en devise Euros (`€`).

---

## 9. Modération des Avis Clients & Preuve Sociale

Accessible via `/products/review` :

* **Lecture & Modération** : Consultation de tous les avis et notes (de 1 à 5 étoiles) rédigés par les clients.
* **Contrôle Avant Publication** : Approbation en 1 clic des avis vérifiés pour les publier sur la boutique publique, ou rejet des messages inappropriés/spam.
* **Calcul Automatique de la Note Moyenne** : Mise à jour en temps réel de la note globale (ex: 4.9/5) affichée sur la page d'accueil et les fiches produits.

---

## 10. Centre de Configuration Technique (Sans Code)

Le module `/settings` permet d'administrer l'intégralité des briques techniques et intégrations tierces sans modifier le code source :

### A. Passerelles de Paiement (`/settings/payment-api`)
* Renseignement des clés d'API Stripe en toute sécurité :
  * Clé publique (`pk_live_...` ou `pk_test_...`)
  * Clé secrète (`sk_live_...` ou `sk_test_...`)
  * Clé secrète de Webhook (`whsec_...`)
* Renseignement des identifiants PayPal (`Client ID`, `Secret Key`).
* **Bascule Immédiate Test / Live** : Activation du mode simulation pour tester ou du mode réel pour encaisser.

### B. Serveur d'Emails Transactionnels SMTP (`/settings/smtp`)
* Configuration du serveur d'envoi (Gmail, OVH, Hostinger, Resend, etc.) : Hôte SMTP, Port (465/587), SSL, Identifiant et Mot de passe.
* Personnalisation du nom et de l'adresse d'expéditeur (ex: *« Les Épices de Sulson <contact@epicesdesulson.com> »*).
* **Bouton de Test d'Envoi** : Vérification immédiate de la bonne réception des emails de confirmation de commande.

### C. Stockage Médias Cloud (`/settings/media`)
* Configuration du service **Cloudinary** (Cloud Name, API Key, API Secret) pour héberger et optimiser automatiquement les photos de produits en haute définition.

### D. Assistant IA & Redirection WhatsApp (`/settings/chatbot`)
* Personnalisation du numéro de téléphone WhatsApp officiel du service client.
* Modification du nom de l'assistante virtuelle et du message de bienvenue.
* Configuration du texte pré-rempli pour les clients contactant la boutique.

### E. Référencement & SEO (`/settings/seo`)
* Gestion des titres et descriptions méta par défaut pour les moteurs de recherche (Google, Bing).

### F. Mode Maintenance & Paramètres Boutique (`/settings/maintenance`, `/settings/shop`, `/settings/general`)
* Coordonnées légales de l'entreprise, devise par défaut (€).
* **Interrupteur Mode Maintenance** : Affichage temporaire d'une page élégante d'indisponibilité lors de mises à jour majeures.

---

## 11. Gestion des Administrateurs & Sécurité

Accessible via `/admin-users` :

* **Création et Gestion des Comptes d'Équipe** : Ajout d'administrateurs avec nom, email et mot de passe chiffré.
* **Rôles & Permissions** :
  * `MASTER_ADMIN` : Accès intégral incluant les configurations financières et la gestion des utilisateurs.
  * `ADMIN` : Accès opérationnel (produits, commandes, stocks, avis, support).

---

## 12. Support Client & Boîte de Réception

Accessible via `/inbox`, `/support` et `/faq` :

* **Boîte de Réception Centralisée (`/inbox`)** : Réception et consultation des messages envoyés par les clients depuis le formulaire de contact du site.
* **Gestionnaire de FAQ (`/faq`)** : Ajout, modification et réorganisation des questions et réponses affichées dans la foire aux questions publique.

---

## 13. Cartographie des Routes & Pages du Dashboard

| Section | Route URL | Rôle Principal |
| :--- | :--- | :--- |
| **Accueil** | `/` | KPIs, graphiques de vente, flux des commandes en direct |
| **Produits** | `/products` | Liste, création, modification du catalogue et des prix |
| **Ajout Produit** | `/products/add` | Formulaire d'ajout d'une nouvelle référence d'épice |
| **Stocks** | `/products/stocks` | Suivi des quantités, alertes réapprovisionnement |
| **Avis** | `/products/review` | Modération et approbation des avis clients |
| **Commandes** | `/orders` | Suivi des commandes et mise à jour des statuts de livraison |
| **Détail Commande** | `/orders/[id]` | Vue détaillée, adresses, articles et facture PDF |
| **Retours** | `/orders/return-and-refund` | Gestion des retours colis et remboursements |
| **Paniers Abandonnés** | `/abandon-cart` | Analyse des sessions d'achat non finalisées |
| **Transactions** | `/transactions` | Historique financier et identifiants Stripe / PayPal |
| **Paiements API** | `/settings/payment-api` | Configuration des clés Stripe & PayPal (Test/Live) |
| **Serveur SMTP** | `/settings/smtp` | Configuration de l'envoi d'emails transactionnels |
| **Médias Cloud** | `/settings/media` | Configuration du stockage d'images Cloudinary |
| **Chatbot & WhatsApp** | `/settings/chatbot` | Numéro WhatsApp et messages de l'assistant |
| **SEO** | `/settings/seo` | Méta-titres et descriptions Google |
| **Maintenance** | `/settings/maintenance` | Interrupteur d'activation de la page de maintenance |
| **Utilisateurs Admin** | `/admin-users` | Gestion des comptes et rôles de l'équipe |
| **Messagerie Client** | `/inbox` | Traitement des messages du formulaire de contact |
| **Gestion FAQ** | `/faq` | Administration des questions/réponses du site |

---

## 🎯 Synthèse Opérationnelle

Grâce à ce dashboard, le propriétaire de la boutique bénéficie d'une **autonomie totale à 100%** pour :
1. **Vendre & Encaisser** en toute sécurité (Stripe / PayPal).
2. **Gérer les Stocks & Expédier** les commandes en quelques clics.
3. **Fidéliser les Clients** grâce aux factures automatiques, aux emails de confirmation et aux avis vérifiés.
4. **Adapter le Site** (prix, formats, photos, WhatsApp, SEO) sans aucune compétence en programmation.
