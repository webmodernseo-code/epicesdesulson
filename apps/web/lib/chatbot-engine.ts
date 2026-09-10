export interface BotAction {
  type: "link" | "whatsapp";
  label: string;
  url?: string;
}

export interface BotMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  action?: BotAction;
  showWhatsappButton?: boolean;
  whatsappMessage?: string;
  quickPrompts?: string[];
}

export interface FAQItem {
  id: string;
  category: string;
  keywords: string[];
  patterns?: RegExp[];
  question: string;
  answer: string;
  action?: BotAction;
  suggestWhatsapp?: boolean;
  quickPrompts?: string[];
}

// ── 🌿 BASE DE CONNAISSANCES OFFICIELLE — LES ÉPICES DE SULSON ──
export const SULSON_KNOWLEDGE_BASE: FAQItem[] = [
  // ── 1. PRODUITS & CATALOGUE ──
  {
    id: "catalogue-produits",
    category: "Catalogue",
    keywords: ["quelles epices", "produits", "vendez vous", "gamme", "catalogue", "melanges", "choix", "saveurs"],
    patterns: [/quelles?\s+(sont\s+vos\s+)?epices?/i, /que\s+vendez\s*vous/i, /vos\s+produits/i],
    question: "Quelles épices proposez-vous ?",
    answer:
      "Les Épices de Sulson vous proposent une gamme de 4 mélanges artisanaux d'exception du terroir camerounais :\n\n" +
      "1. 🍗 Épice Poulet (100g — 6,90 €) : pour volailles dorées et rôtis croustillants.\n" +
      "2. 🥩 Épice Viande (100g — 6,90 €) : pour bœuf, agneau, porc et grillades au barbecue.\n" +
      "3. 🐟 Épice Poisson (50g/100g — 6,90 €) : pour poissons braisés, papillotes et fruits de mer.\n" +
      "4. ✨ Le Secret de Sulson (100g — 6,90 €) : notre mélange signature universel pour tous vos plats.\n\n" +
      "🎁 Retrouvez également le Pack Intégral réunissant les 4 saveurs (400g) à 24,90 €.",
    action: {
      type: "link",
      label: "Découvrir la boutique",
      url: "/products",
    },
    quickPrompts: ["Pack 4 Saveurs", "Conseil pour le poulet", "Livraison gratuite ?"],
  },
  {
    id: "prix-tarifs",
    category: "Prix",
    keywords: ["prix", "combien", "tarif", "coute", "coutent", "cher"],
    patterns: [/c[' ]est\s+combien/i, /quel\s+est\s+le\s+prix/i, /combien\s+ca\s+coute/i],
    question: "Quels sont vos prix ?",
    answer:
      "Voici nos tarifs officiels :\n\n" +
      "• Sachet individuel (100g) : 6,90 €\n" +
      "• Pack Intégral 4 Saveurs (400g) : 24,90 € (au lieu de 27,60 €, soit près de 3 € d'économie)\n" +
      "• Livraison offerte en France métropolitaine dès 50 € d'achat !",
    action: {
      type: "link",
      label: "Voir le Pack 4 Saveurs (24,90 €)",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Commander le Pack", "Frais de livraison", "Code promo"],
  },
  {
    id: "pack-4-saveurs",
    category: "Catalogue",
    keywords: ["pack", "coffret", "4 saveurs", "pack 4", "integral", "tout gouter", "toutes les epices"],
    patterns: [/pack\s+4/i, /coffret/i, /pack\s+integral/i],
    question: "Que contient le Pack Intégral 4 Saveurs ?",
    answer:
      "Le Pack Intégral 4 Saveurs réunit l'ensemble de notre collection dans un coffret de 400g au total :\n\n" +
      "• 1x Épice Poulet (100g)\n" +
      "• 1x Épice Viande (100g)\n" +
      "• 1x Épice Poisson (100g)\n" +
      "• 1x Secret de Sulson (100g)\n\n" +
      "Il est proposé au tarif préférentiel de 24,90 € (au lieu de 27,60 €). C'est le choix idéal pour découvrir tout l'univers Sulson !",
    action: {
      type: "link",
      label: "Commander le Pack 4 Saveurs",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Frais de port", "Mode d'emploi", "Code promo"],
  },
  {
    id: "poids-contenance",
    category: "Produits",
    keywords: ["poids", "quantite", "grammage", "contenance", "taille sachet", "combien de gramme", "100g", "50g"],
    question: "Quel est le poids d'un sachet ?",
    answer:
      "Nos sachets individuels standards contiennent 100 g d'épices pures. Le Pack Intégral 4 Saveurs contient 4 sachets de 100 g, soit 400 g au total.",
    quickPrompts: ["Combien de temps ça dure ?", "Comment conserver ?"],
  },
  {
    id: "origine-terroir",
    category: "Qualité",
    keywords: ["origine", "d'ou viennent", "provenance", "cameroun", "afrique", "terroir", "fabrication"],
    question: "D'où proviennent vos épices ?",
    answer:
      "Nos épices sont cultivées et sélectionnées directement auprès de coopératives artisanales sur les terres volcaniques fertiles du Cameroun et d'Afrique centrale. Elles sont séchées au soleil et moulues selon des méthodes traditionnelles qui préservent l'intégralité de leurs huiles essentielles.",
    quickPrompts: ["Sont-elles 100% naturelles ?", "Y a-t-il du sel ?"],
  },
  {
    id: "naturel-msg-additifs",
    category: "Qualité",
    keywords: ["naturel", "bio", "additif", "msg", "glutamate", "conservateur", "chimique", "colorant"],
    patterns: [/sans\s+msg/i, /sans\s+glutamate/i, /est[- ]ce\s+naturel/i],
    question: "Vos épices sont-elles 100% naturelles et sans additifs ?",
    answer:
      "Oui, absolument ! Toutes les Épices de Sulson sont garanties :\n\n" +
      "✅ 100% naturelles et pures\n" +
      "✅ Sans glutamate ajouté (zéro MSG)\n" +
      "✅ Sans conservateurs ni colorants artificiels\n" +
      "✅ Sans arômes de synthèse\n\n" +
      "Une composition saine et authentique pour prendre soin de votre santé et de celle de vos proches.",
    quickPrompts: ["Et le sel ?", "Sont-elles piquantes ?"],
  },
  {
    id: "sel-ajoute",
    category: "Qualité",
    keywords: ["sel", "sale", "sel ajoute", "sodium", "sans sel"],
    question: "Y a-t-il du sel dans vos mélanges ?",
    answer:
      "Nos mélanges sont composés exclusivement d'épices et d'aromates nobles sans sel de remplissage. Cela vous laisse une liberté totale pour doser votre propre sel selon vos besoins diététiques.",
    quickPrompts: ["Conseil pour la viande", "Conseil pour le poisson"],
  },
  {
    id: "piquant-niveau",
    category: "Goût",
    keywords: ["piquant", "fort", "pique", "epice", "piment", "doux", "enfants"],
    patterns: [/est[- ]ce\s+que\s+ca\s+pique/i, /est[- ]ce\s+piquant/i, /trop\s+fort/i],
    question: "Est-ce que vos épices sont piquantes ?",
    answer:
      "Non, nos mélanges privilégient la profondeur aromatique, la chaleur et la gourmandise plutôt que la brûlure. Ils ne sont pas piquants et conviennent parfaitement à toute la famille, y compris aux enfants. Si vous aimez le piquant relevé, vous pouvez facilement ajouter votre propre piment frais !",
    quickPrompts: ["Adapté aux enfants ?", "Quelle épice choisir ?"],
  },
  {
    id: "enfants-famille",
    category: "Santé",
    keywords: ["enfant", "enfants", "bebe", "famille", "adapte enfant"],
    question: "Les épices conviennent-elles aux enfants ?",
    answer:
      "Oui, tout à fait ! Étant 100% naturelles, sans additifs chimiques et sans piquant agressif, elles sont idéales pour éveiller le palais des enfants aux vraies saveurs et cuisiner de bons petits plats familiaux.",
    quickPrompts: ["Recette poulet rôti", "Commander"],
  },
  {
    id: "conservation-duree",
    category: "Conseils",
    keywords: ["conservation", "conserver", "peremption", "duree", "ddm", "combien de temps"],
    question: "Combien de temps et comment conserver les épices ?",
    answer:
      "Nos épices se conservent parfaitement pendant 24 mois (2 ans). Nos sachets sont dotés d'un zip hermétique refermable. Après ouverture, gardez le sachet bien refermé dans un endroit sec, à l'abri de la lumière et de l'humidité.",
    quickPrompts: ["Voir les produits", "Conseils cuisine"],
  },

  // ── 2. CONSEILS CULINAIRES & PLATS ──
  {
    id: "conseil-poulet",
    category: "Cuisine",
    keywords: ["poulet", "volaille", "dinde", "cuisse poulet", "poulet roti", "poulet braise", "ailes de poulet"],
    patterns: [/pour\s+le\s+poulet/i, /epice\s+poulet/i],
    question: "Quelle épice utiliser pour le poulet ?",
    answer:
      "Pour le poulet, utilisez notre Épice Sulson Spéciale Poulet (100g — 6,90 €) !\n\n" +
      "👨‍🍳 Astuce du Chef : Mélangez 1 à 2 cuillères d'épices avec un filet d'huile et un peu de jus de citron. Massez votre poulet et laissez mariner 20 à 30 min avant de rôtir à 190°C ou de braiser. Le curcuma et les aromates donneront une chair juteuse et une peau dorée et croustillante !",
    action: {
      type: "link",
      label: "Voir l'Épice Poulet (6,90 €)",
      url: "/products/epice-poulet-100g",
    },
    quickPrompts: ["Épice pour la viande", "Épice pour le poisson", "Le Secret de Sulson"],
  },
  {
    id: "conseil-viande",
    category: "Cuisine",
    keywords: ["viande", "boeuf", "steak", "grillade", "barbecue", "suya", "brochette", "agneau", "porc", "cote de boeuf"],
    patterns: [/pour\s+la\s+viande/i, /pour\s+les\s+grillades/i, /epice\s+viande/i],
    question: "Quelle épice utiliser pour la viande et les grillades ?",
    answer:
      "Pour les viandes rouges, steaks, brochettes et rôtis, optez pour l'Épice Sulson Spéciale Viande (100g — 6,90 €) !\n\n" +
      "🔥 Elle associe paprika noble, poivre noir de Penja, ail, thym et laurier pour former une croûte parfumée et caramélisée irrésistible sur la braise ou à la poêle.",
    action: {
      type: "link",
      label: "Voir l'Épice Viande (6,90 €)",
      url: "/products/epice-viande-100g",
    },
    quickPrompts: ["Épice pour le poulet", "Épice pour le poisson", "Pack 4 Saveurs"],
  },
  {
    id: "conseil-poisson",
    category: "Cuisine",
    keywords: ["poisson", "dorade", "bar", "tilapia", "saumon", "crevette", "gambas", "fruits de mer", "poisson braise"],
    patterns: [/pour\s+le\s+poisson/i, /poisson\s+braise/i, /epice\s+poisson/i],
    question: "Quelle épice utiliser pour le poisson et les fruits de mer ?",
    answer:
      "L'Épice Sulson Spéciale Poisson (6,90 €) est l'incontournable des poissons braisés et marinades marines !\n\n" +
      "🐟 Formulée avec le poivre de Guinée (maniguette), des rondelles et des herbes du Cameroun, elle sublime bars, dorades, tilapias et crevettes sans en masquer la finesse.",
    action: {
      type: "link",
      label: "Voir l'Épice Poisson (6,90 €)",
      url: "/products/epice-poisson-50g",
    },
    quickPrompts: ["Le Secret de Sulson", "Pack 4 Saveurs", "Commander"],
  },
  {
    id: "secret-sulson-gourmande",
    category: "Cuisine",
    keywords: ["secret", "gourmande", "passe partout", "secret de sulson", "riz", "legumes", "sauce", "mijoté"],
    patterns: [/secret\s+de\s+sulson/i, /saveur\s+gourmande/i, /pour\s+le\s+riz/i, /pour\s+les\s+legumes/i, /pour\s+la\s+sauce/i],
    question: "Qu'est-ce que Le Secret de Sulson et comment l'utiliser ?",
    answer:
      "Le Secret de Sulson (100g — 6,90 €) est notre mélange signature passe-partout conçu à l'africaine !\n\n" +
      "✨ Polyvalent à l'extrême, il rehausse instantanément les sauces tomate, sauces mijotées, poêlées de légumes, riz parfumé, pâtes et marinades du quotidien.",
    action: {
      type: "link",
      label: "Voir Le Secret de Sulson (6,90 €)",
      url: "/products/secret-de-sulson-100g",
    },
    quickPrompts: ["Voir le Pack 4 Saveurs", "Frais de livraison"],
  },
  {
    id: "dosage-quantite",
    category: "Cuisine",
    keywords: ["dosage", "combien mettre", "quantite utiliser", "cuillere", "mode d'emploi"],
    question: "Combien d'épices dois-je mettre dans mon plat ?",
    answer:
      "Comptez en moyenne 1 cuillère à café rase pour 500g d'aliments (viande, poisson, légumes, riz) ou 1 à 2 cuillères à soupe pour une volaille entière ou un grand plat mijoté. Goûtez et ajustez selon vos préférences !",
    quickPrompts: ["Peut-on mélanger les épices ?", "Voir les recettes"],
  },
  {
    id: "melanger-plusieurs-epices",
    category: "Cuisine",
    keywords: ["melanger", "associer", "ensemble", "deux epices", "combiner"],
    question: "Peut-on mélanger plusieurs épices Sulson ensemble ?",
    answer:
      "Oui, absolument ! L'association la plus plébiscitée par nos clients est de marier l'Épice Poisson ou l'Épice Viande avec une touche de Secret de Sulson pour un résultat encore plus riche en bouche.",
    quickPrompts: ["Commander le Pack 4 Saveurs", "Astuces de marinade"],
  },

  // ── 3. RÉGIMES, ALLERGIES & SANTÉ ──
  {
    id: "gluten-allergene",
    category: "Santé",
    keywords: ["gluten", "sans gluten", "allergene", "allergie", "lactose", "arachide", "celeri"],
    question: "Vos épices contiennent-elles du gluten ou des allergènes ?",
    answer:
      "Nos épices sont composées à 100% de plantes et d'aromates purs. Elles sont naturellement SANS GLUTEN, sans lactose et sans produits laitiers. La liste exacte des ingrédients est indiquée sur chaque sachet.",
    quickPrompts: ["Est-ce vegan ?", "Est-ce halal ?"],
  },
  {
    id: "vegan-vegetarien",
    category: "Santé",
    keywords: ["vegan", "vegetarien", "vegetalien", "plantes", "animal"],
    question: "Les épices conviennent-elles aux régimes végétariens et vegans ?",
    answer:
      "Oui, à 100% ! Tous nos produits sont exclusivement d'origine végétale (épices, herbes aromatiques, graines et racines nobles).",
    quickPrompts: ["Est-ce halal ?", "Voir la boutique"],
  },
  {
    id: "halal-certification",
    category: "Santé",
    keywords: ["halal", "haram", "musulman", "certification halal"],
    question: "Vos produits sont-ils halal ?",
    answer:
      "Oui, 100% compatibles halal. Nos formulations sont entièrement végétales, pures, sans alcool, sans produits carnés et sans aucun dérivé animal.",
    quickPrompts: ["Voir le Pack 4 Saveurs", "Commander"],
  },

  // ── 4. COMMANDE, PAIEMENT & LIVRAISON ──
  {
    id: "delais-livraison",
    category: "Livraison",
    keywords: ["delai", "combien de temps", "quand arrive", "expedition", "temps livraison", "jours"],
    patterns: [/combien\s+de\s+temps\s+pour\s+la\s+livraison/i, /quand\s+est[- ]ce\s+que\s+je\s+recois/i, /delais/i],
    question: "Quels sont les délais de livraison ?",
    answer:
      "🚚 Vos commandes sont préparées et expédiées sous 24h à 48h ouvrées.\n\n" +
      "• France Métropolitaine : 48h à 72h ouvrées via Colissimo suivi.\n" +
      "• Europe (Belgique, Suisse, etc.) : 3 à 5 jours ouvrés.\n\n" +
      "Vous recevez un numéro de suivi La Poste dès le départ de votre colis !",
    quickPrompts: ["Frais de livraison", "Suivre ma commande"],
  },
  {
    id: "frais-livraison-gratuit",
    category: "Livraison",
    keywords: ["frais de port", "frais de livraison", "livraison gratuite", "offerte", "gratuit", "prix livraison"],
    patterns: [/livraison\s+gratuite/i, /frais\s+de\s+port/i],
    question: "La livraison est-elle gratuite ?",
    answer:
      "✨ La livraison est 100% GRATUITE dès 50 € d'achat en France métropolitaine !\n\nPour les commandes inférieures à 50 €, la livraison suivie Colissimo est calculée automatiquement à tarif réduit dans votre panier.",
    quickPrompts: ["Ajouter le Pack 4 Saveurs", "Moyens de paiement"],
  },
  {
    id: "zones-livraison",
    category: "Livraison",
    keywords: ["ou livrez vous", "pays", "europe", "belgique", "suisse", "france", "dom tom", "international"],
    patterns: [/ou\s+livrez\s*vous/i, /livrez\s*vous\s+en\s+belgique/i],
    question: "Où livrez-vous ?",
    answer:
      "Nous livrons partout en France Métropolitaine, en Corse, à Monaco, ainsi que dans toute l'Union Européenne (Belgique, Suisse, Luxembourg, Espagne, etc.).",
    quickPrompts: ["Délais de livraison", "Passer commande"],
  },
  {
    id: "suivi-commande",
    category: "Livraison",
    keywords: ["suivi", "suivre", "ou est mon colis", "numero de suivi", "colissimo", "retard"],
    patterns: [/ou\s+est\s+ma\s+commande/i, /suivre\s+mon\s+colis/i],
    question: "Comment suivre ma commande ?",
    answer:
      "Dès l'expédition de votre commande, vous recevez un email contenant votre numéro de suivi Colissimo. Il vous suffit de cliquer dessus pour voir l'acheminement de votre colis en temps réel. Si vous ne le trouvez pas, écrivez-nous directement sur WhatsApp au +33 6 95 54 57 23 avec votre nom !",
    action: {
      type: "whatsapp",
      label: "Contacter le support de suivi",
    },
    quickPrompts: ["Parler à un conseiller"],
  },
  {
    id: "moyens-paiement",
    category: "Paiement",
    keywords: ["paiement", "payer", "carte bancaire", "cb", "visa", "mastercard", "apple pay", "google pay", "paypal"],
    question: "Quels sont les moyens de paiement acceptés ?",
    answer:
      "Vous pouvez régler votre commande en toute sécurité avec :\n\n" +
      "💳 Carte bancaire (Visa, Mastercard, CB)\n" +
      "🍎 Apple Pay (1 clic sur iPhone/Mac)\n" +
      "🤖 Google Pay (1 clic sur Android)\n" +
      "🅿️ PayPal\n\n" +
      "Toutes les transactions sont chiffrées en SSL 256-bit certifié PCI-DSS via Stripe.",
    quickPrompts: ["Le paiement est-il sécurisé ?", "Vais-je recevoir une facture ?"],
  },
  {
    id: "facture-pdf",
    category: "Paiement",
    keywords: ["facture", "recu", "justificatif", "pdf", "telecharger facture"],
    question: "Vais-je recevoir une facture ?",
    answer:
      "Oui, automatiquement ! Une facture officielle au format PDF vous est envoyée par email dès validation de votre commande et reste téléchargeable à tout moment.",
    quickPrompts: ["Moyens de paiement", "Délai de livraison"],
  },
  {
    id: "code-promo",
    category: "Offres",
    keywords: ["code promo", "reduction", "remise", "promo", "bon d'achat", "code"],
    patterns: [/avez[- ]vous\s+un\s+code\s+promo/i, /code\s+promo/i, /reduction/i],
    question: "Avez-vous un code promo ?",
    answer:
      "🎁 Utilisez le code promo de bienvenue : SULSON10 pour bénéficier de -10% de réduction immédiate sur l'ensemble de votre panier !",
    action: {
      type: "link",
      label: "Utiliser le code dans la boutique",
      url: "/products",
    },
    quickPrompts: ["Voir les produits", "Commander le Pack"],
  },

  // ── 5. PROFESSIONNELS, CONTACT & SAV ──
  {
    id: "restaurants-pros",
    category: "Professionnels",
    keywords: ["restaurant", "pro", "professionnel", "traiteur", "chef", "revendeur", "gros volume", "kilo"],
    patterns: [/pour\s+les\s+restaurants/i, /commande\s+professionnelle/i],
    question: "Fournissez-vous les restaurants et professionnels ?",
    answer:
      "Oui ! Nous accompagnons régulièrement les restaurants, traiteurs et chefs avec des conditionnements professionnels (sacs de 1 kg à plusieurs dizaines de kilos) à tarifs dégressifs.",
    action: {
      type: "whatsapp",
      label: "Échanger avec le service Pro WhatsApp",
    },
    quickPrompts: ["Parler à un conseiller", "Voir le catalogue"],
  },
  {
    id: "retours-remboursement",
    category: "SAV",
    keywords: ["retour", "remboursement", "retractation", "abime", "endommage", "trompe"],
    question: "Comment effectuer un retour ou demander un remboursement ?",
    answer:
      "Vous disposez de 14 jours après réception pour exercer votre droit de retour. Pour des raisons d'hygiène alimentaire, les sachets doivent être intacts et scellés. Si votre colis arrive abîmé, nous vous renvoyons un colis neuf immédiatement à nos frais !",
    action: {
      type: "whatsapp",
      label: "Contacter le SAV sur WhatsApp",
    },
    quickPrompts: ["Contacter le support", "Horaires du service client"],
  },
  {
    id: "contact-humain-whatsapp",
    category: "Contact",
    keywords: ["humain", "parler a quelqu'un", "conseiller", "telephone", "appeler", "whatsapp", "joindre", "contact"],
    patterns: [/parler\s+a\s+quelqu[' ]un/i, /numero\s+de\s+telephone/i, /service\s+client/i],
    question: "Comment contacter un conseiller Sulson en direct ?",
    answer:
      "Notre équipe est à votre écoute du lundi au samedi de 9h00 à 19h00 :\n\n" +
      "📱 WhatsApp officiel : +33 6 95 54 57 23 (réponse en direct)\n" +
      "✉️ Email : contact@epicesdesulson.com\n\n" +
      "Cliquez ci-dessous pour discuter directement avec nous !",
    action: {
      type: "whatsapp",
      label: "Ouvrir WhatsApp (+33 6 95 54 57 23)",
    },
    quickPrompts: ["Horaires d'ouverture", "Voir les épices"],
  },
];

// ── NLP ENGINE INTELLIGENT ──
export function generateBotReply(userQuery: string): {
  text: string;
  action?: BotAction;
  showWhatsappButton?: boolean;
  whatsappMessage?: string;
  quickPrompts?: string[];
} {
  const query = userQuery.trim();
  const lowerQuery = query.toLowerCase();

  // 1. Guardrail sécurité données bancaires
  if (
    lowerQuery.match(/\b(?:\d[ -]*?){13,19}\b/) ||
    lowerQuery.includes("cvc") ||
    lowerQuery.includes("cryptogramme") ||
    lowerQuery.includes("code de carte")
  ) {
    return {
      text: "🔒 Pour votre sécurité, ne communiquez jamais vos coordonnées bancaires (numéro de carte, CVC ou mot de passe) dans cette conversation.\n\nVos règlements s'effectuent exclusivement via notre page de paiement officielle chiffrée SSL par Stripe et PayPal.",
      quickPrompts: ["Moyens de paiement sécurisés", "Frais de livraison", "Voir les produits"],
    };
  }

  // 2. Salutations naturelles & courtoises
  if (
    lowerQuery.match(/^(bonjour|salut|hello|bonsoir|coucou|hey|hi)\b/i) &&
    lowerQuery.length < 35
  ) {
    return {
      text: "Bonjour et bienvenue chez Les Épices de Sulson ! 🌿\n\nJe suis votre conseillère culinaire. Je peux vous orienter vers l'épice parfaite pour votre plat, vous donner des conseils de marinade, ou vous renseigner sur la livraison et votre commande.\n\nQue préparez-vous de bon aujourd'hui ?",
      quickPrompts: [
        "Pack Intégral 4 Saveurs",
        "Quelle épice pour mon plat ?",
        "Délais de livraison",
        "Code promo -10%",
      ],
    };
  }

  // 3. Questions sur "c'est combien ?" ou prix direct
  if (lowerQuery.match(/^(c[' ]est combien|quel est le prix|les prix|combien ca coute)\??$/i)) {
    return {
      text: "Voici nos tarifs officiels Les Épices de Sulson :\n\n• Sachet individuel (100g) : 6,90 €\n• Pack Intégral 4 Saveurs (400g) : 24,90 € (au lieu de 27,60 €)\n• Livraison GRATUITE dès 50 € d'achat !",
      action: {
        type: "link",
        label: "Voir le Pack 4 Saveurs",
        url: "/products/pack-integral-4-saveurs",
      },
      quickPrompts: ["Conseil pour le poulet", "Conseil pour la viande", "Livraison"],
    };
  }

  // 4. Recherche par mots-clés pondérés et patterns RegEx
  let bestMatch: FAQItem | null = null;
  let maxScore = 0;

  const queryTokens = lowerQuery
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  for (const item of SULSON_KNOWLEDGE_BASE) {
    let score = 0;

    // Pattern Regex direct hit = high priority
    if (item.patterns) {
      for (const pattern of item.patterns) {
        if (pattern.test(lowerQuery)) {
          score += 20;
        }
      }
    }

    // Keyword hits
    for (const kw of item.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) {
        score += 8;
      }
    }

    // Question token overlap
    const qTokens = item.question.toLowerCase().split(/\s+/);
    for (const token of queryTokens) {
      if (qTokens.includes(token)) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // Confident match found
  if (bestMatch && maxScore >= 6) {
    return {
      text: bestMatch.answer,
      action: bestMatch.action,
      showWhatsappButton: bestMatch.suggestWhatsapp,
      whatsappMessage: `Bonjour, j'ai une question complémentaire sur : "${bestMatch.question}"`,
      quickPrompts: bestMatch.quickPrompts || [
        "Pack 4 Saveurs",
        "Livraison & Délais",
        "Parler sur WhatsApp",
      ],
    };
  }

  // 5. Fallback sécurisé & professionnel avec redirection WhatsApp
  return {
    text: "Je n'ai pas la réponse exacte à cette question spécifique, mais notre équipe d'experts est disponible en direct pour vous accompagner !\n\nVous pouvez nous joindre instantanément sur notre WhatsApp officiel :",
    action: {
      type: "whatsapp",
      label: "Discuter sur WhatsApp (+33 6 95 54 57 23)",
    },
    showWhatsappButton: true,
    whatsappMessage: `Bonjour Les Épices de Sulson, j'ai une question sur votre boutique : "${userQuery}"`,
    quickPrompts: [
      "Quelle épice pour mon plat ?",
      "Pack Intégral 4 Saveurs",
      "Délais de livraison",
      "Code promo",
    ],
  };
}
