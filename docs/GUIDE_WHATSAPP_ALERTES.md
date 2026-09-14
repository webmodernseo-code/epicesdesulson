# 📱 Guide d'Activation des Alertes WhatsApp Instantanées

Ce document résume la configuration de la passerelle **CallMeBot** pour recevoir instantanément chaque nouvelle commande passée sur la boutique *Les Épices de Sulson* directement sur votre smartphone via WhatsApp.

---

## 💡 Pourquoi ce système ?
- **100% Gratuit & Sans Abonnement** : Aucun coût récurrent ni carte bancaire requise.
- **Instantané** : Votre téléphone sonne dès qu'un client valide son paiement (Stripe, CB, Apple Pay, PayPal).
- **Détaillé** : Le message contient le numéro de commande, le nom du client, le montant, la liste des articles et l'adresse de livraison avec un lien direct vers le Cockpit.

---

## 🚀 Procédure d'activation en 3 étapes (1 minute)

### Étape 1 : Enregistrez le robot dans vos contacts WhatsApp
Ajoutez le numéro officiel de la passerelle européenne CallMeBot à votre carnet de contacts :
- **Numéro :** `+34 644 10 55 84` *(ou serveur secondaire `+34 644 20 47 56`)*
- **Nom du contact :** `Alerte Sulson WhatsApp`

*(L'indicatif `+34` correspond à l'Espagne où sont hébergés les serveurs conformes RGPD de CallMeBot).*

---

### Étape 2 : Envoyez le message d'autorisation
Ouvrez la discussion WhatsApp avec ce contact et envoyez ce texte exact :

```text
I allow callmebot to send me messages
```

---

### Étape 3 : Récupérez votre clé d'API personnelle
Dans la seconde, le robot vous répond automatiquement :

```text
API Activated. Your apikey is: 123456
```

---

## ⚙️ Configuration sur le Site (Vercel ou .env)

Ajoutez simplement ces 2 variables d'environnement dans votre projet Vercel ou dans le fichier `.env` :

```env
ADMIN_WHATSAPP_PHONE="33612345678"
ADMIN_WHATSAPP_APIKEY="123456"
```

> **Remarque sur le numéro :** Le système formate automatiquement le numéro en standard international (ex: `06 12 34 56 78` devient automatiquement `33612345678`).

---

## 🧪 Tester la connexion

Un point d'accès d'administration dédié permet de tester l'envoi d'un message test en 1 clic :
- **POST** `/api/admin/whatsapp/test`
- Payload : `{ "phone": "33612345678", "apikey": "123456" }`

---

## 📦 Format de l'alerte reçue

Dès qu'une commande est validée :

```text
🔔 NOUVELLE COMMANDE REÇUE !

📦 Commande : #SUL-48291
👤 Client : Marie Dupont
✉️ Email : marie.dupont@gmail.com
📞 Tél : 06 98 76 54 32
💶 Montant : 45,00 € (STRIPE)

🛒 Articles à préparer :
• Poivre Sauvage de Penja (100g) x 2
• Mélange Sulson Grillades (250g) x 1

📍 Adresse de livraison :
14 rue de la République, 75001 Paris France

🔗 Cockpit Commandes : https://epicesdesulson.com/orders
```
