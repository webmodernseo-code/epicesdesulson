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

// ── 🌿 BASE DE CONNAISSANCES OFFICIELLE & EXHAUSTIVE — LES ÉPICES DE SULSON ──
export const SULSON_KNOWLEDGE_BASE: FAQItem[] = [
  // ═══════════════════════════════════════════════════════════════
  // 1. PRODUITS ET ÉPICES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "quelles-epices",
    category: "Produits et épices",
    keywords: ["quelles epices", "vendez vous", "gamme", "catalogue", "produits", "saveurs", "melanges"],
    patterns: [/quelles?\s+(sont\s+vos\s+)?epices?/i, /que\s+vendez\s*vous/i, /vos\s+produits/i],
    question: "Quelles épices vendez-vous ?",
    answer:
      "Les Épices de Sulson vous proposent une gamme de 4 mélanges artisanaux d'exception du terroir camerounais :\n\n" +
      "1. 🍗 Épice Poulet (100g — 5,99 €) : pour volailles dorées, rôtis et marinades.\n" +
      "2. 🥩 Épice Viande (100g — 5,99 €) : pour bœuf, agneau, porc et grillades au barbecue.\n" +
      "3. 🐟 Épice Poisson (100g — 5,99 €) : pour poissons braisés, papillotes et soupes.\n" +
      "4. ✨ Le Secret de Sulson (100g — 5,99 €) : notre mélange signature universel pour tous vos plats.\n\n" +
      "🎁 Retrouvez également notre Pack Intégral réunissant les 4 saveurs (400g) à 23,96 €.",
    action: {
      type: "link",
      label: "Découvrir la boutique",
      url: "/products",
    },
    quickPrompts: ["Pack Intégral 4 Saveurs", "Conseil pour le poulet", "Livraison gratuite ?"],
  },
  {
    id: "difference-epices",
    category: "Produits et épices",
    keywords: ["difference", "different", "comparer", "distinguer", "profil aromatique"],
    patterns: [/difference\s+entre/i, /differentes\s+epices/i],
    question: "Quelle est la différence entre vos différentes épices ?",
    answer:
      "Chaque mélange possède une formule aromatique sur-mesure adaptée à un type d'ingrédient :\n\n" +
      "• Poulet : dominante douce et dorée (curcuma frais, paprika doux, coriandre, gingembre, muscade).\n" +
      "• Viande : notes chaudes, poivrées et fumées (paprika, poivre noir de Penja, ail, oignon, girofle, thym, laurier).\n" +
      "• Poisson : arômes marins et subtils (poivre de Guinée / maniguette, rondelles, ail, herbes locales).\n" +
      "• Secret de Sulson : assemblage universel et gourmand (12 épices nobles) qui relève sauces, riz, légumes et marinades.",
    quickPrompts: ["Conseil pour mon plat", "Pack 4 Saveurs", "Sont-elles piquantes ?"],
  },
  {
    id: "a-quoi-sert-epice",
    category: "Produits et épices",
    keywords: ["a quoi sert", "pourquoi utiliser", "utilite", "usage", "a quoi ca sert"],
    patterns: [/a\s+quoi\s+sert/i],
    question: "À quoi sert cette épice ?",
    answer:
      "Nos mélanges servent à assaisonner, mariner, parfumer et sublimer vos plats sans aucun ajout d'arômes artificiels ni de glutamate. Dites-moi quel ingrédient vous cuisinez (poulet, bœuf, poisson, riz, légumes) et je vous orienterai vers le mélange idéal !",
    quickPrompts: ["Pour le poulet", "Pour la viande", "Pour le poisson", "Le Secret de Sulson"],
  },
  {
    id: "gout-saveur-profil",
    category: "Produits et épices",
    keywords: ["gout", "saveur", "quel gout", "aromatique", "profil", "parfum"],
    patterns: [/quel\s+est\s+le\s+gout/i, /quel\s+gout/i],
    question: "Quel est le goût de cette épice ?",
    answer:
      "Nos épices offrent des saveurs riches, chaleureuses et authentiques du terroir africain. Elles développent une grande profondeur aromatique en bouche pour sublimer la saveur naturelle de vos aliments sans jamais masquer leur goût d'origine.",
    quickPrompts: ["Est-ce piquant ?", "Pack 4 Saveurs", "Conseils cuisine"],
  },
  {
    id: "piquant-niveau",
    category: "Produits et épices",
    keywords: ["piquant", "fort", "pique", "epice", "piment", "brule", "doux", "arrache"],
    patterns: [/est[- ]ce\s+piquant/i, /est[- ]ce\s+que\s+ca\s+pique/i, /trop\s+fort/i],
    question: "Est-ce que cette épice est piquante ?",
    answer:
      "Non, nos mélanges privilégient la richesse aromatique et la gourmandise plutôt que la brûlure. Ils ne sont pas piquants et conviennent à toute la famille. Si vous préférez un plat relevé, vous pouvez facilement y associer du piment frais selon vos goûts !",
    quickPrompts: ["Adapté aux enfants ?", "Quelle épice choisir ?", "Pack 4 Saveurs"],
  },
  {
    id: "adapte-enfants",
    category: "Produits et épices",
    keywords: ["enfant", "enfants", "bebe", "famille", "petit", "adapte enfant"],
    patterns: [/pour\s+les\s+enfants/i, /adapte\s+aux\s+enfants/i],
    question: "Est-ce adapté aux enfants ?",
    answer:
      "Oui, parfaitement ! Nos épices sont 100% naturelles, sans additifs chimiques et sans piquant agressif. Elles permettent d'habituer les enfants aux vraies saveurs et aux herbes saines dès le plus jeune âge.",
    quickPrompts: ["Ingrédients naturels", "Pack 4 Saveurs", "Commander"],
  },
  {
    id: "quantite-sachet-poids",
    category: "Produits et épices",
    keywords: ["quantite", "taille sachet", "combien contient", "sachet individuel"],
    patterns: [/quelle\s+quantite\s+contient/i, /contenance/i],
    question: "Quelle quantité contient un sachet ?",
    answer:
      "Nos sachets individuels standards contiennent 100 g d'épices pures (également disponible en format 50 g pour le poisson ou en découverte).",
    quickPrompts: ["Poids du Pack 4 Saveurs", "Prix d'un sachet"],
  },
  {
    id: "poids-produit-pack",
    category: "Produits et épices",
    keywords: ["poids", "gramme", "combien de gramme", "total poids", "100g", "400g"],
    patterns: [/quel\s+est\s+le\s+poids/i, /poids\s+du\s+produit/i],
    question: "Quel est le poids du produit ?",
    answer:
      "Un sachet individuel pèse 100 g. Si vous choisissez le Pack Intégral 4 Saveurs, vous recevez les 4 mélanges pour un total de 400 g d'épices nobles.",
    action: {
      type: "link",
      label: "Voir le Pack 4 Saveurs (400g)",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Prix du Pack", "Durée de conservation"],
  },
  {
    id: "ingredients-composition",
    category: "Produits et épices",
    keywords: ["ingredients", "composition", "recette", "composants", "contient quoi", "qu'y a t il dedans"],
    patterns: [/quels\s+sont\s+les\s+ingredients/i, /composition/i],
    question: "Quels sont les ingrédients ?",
    answer:
      "Toutes nos recettes sont composées à 100% d'épices et d'aromates nobles réduits en poudre (curcuma frais, poivres précieux de Penja et de Guinée, paprika doux, ail, oignon, gingembre, muscade, girofle, laurier, thym, coriandre). La composition exacte figure en toute transparence au dos de chaque sachet.",
    quickPrompts: ["Y a-t-il du sel ?", "Est-ce 100% naturel ?", "Sans MSG ?"],
  },
  {
    id: "sel-ajoute",
    category: "Produits et épices",
    keywords: ["sel", "sale", "sel ajoute", "sodium", "sans sel"],
    patterns: [/est[- ]ce\s+qu[' ]il\s+y\s+a\s+du\s+sel/i, /avec\s+ou\s+sans\s+sel/i],
    question: "Est-ce qu'il y a du sel ?",
    answer:
      "Non, nos mélanges sont composés d'épices pures, sans sel de remplissage superflu. Vous gardez ainsi la liberté totale de doser votre sel selon vos préférences diététiques et de santé.",
    quickPrompts: ["Sans additifs ?", "Origine des épices", "Voir les produits"],
  },
  {
    id: "additifs-conservateurs-msg",
    category: "Produits et épices",
    keywords: ["additif", "conservateur", "msg", "glutamate", "chimique", "colorant", "arome artificiel"],
    patterns: [/sans\s+additifs?/i, /sans\s+conservateurs?/i, /sans\s+msg/i, /sans\s+glutamate/i],
    question: "Est-ce qu'il y a des additifs ou des conservateurs ?",
    answer:
      "Absolument aucun ! Nos produits sont garantis :\n\n" +
      "✅ 100% naturels et purs\n" +
      "✅ Sans glutamate ajouté (zéro MSG)\n" +
      "✅ Sans conservateurs ni colorants artificiels\n" +
      "✅ Sans arômes de synthèse",
    quickPrompts: ["D'où viennent vos épices ?", "Combien de temps ça se conserve ?"],
  },
  {
    id: "est-ce-naturel",
    category: "Produits et épices",
    keywords: ["naturel", "bio", "naturelles", "pur", "purete", "artisanal"],
    patterns: [/est[- ]ce\s+naturel/i],
    question: "Est-ce naturel ?",
    answer:
      "Oui, 100% naturel ! Nos épices sont récoltées, séchées au soleil selon des méthodes artisanales et moulues traditionnellement pour préserver l'intégralité de leurs huiles essentielles.",
    quickPrompts: ["D'où viennent-elles ?", "Conseil pour le poulet"],
  },
  {
    id: "origine-terroir",
    category: "Produits et épices",
    keywords: ["origine", "d'ou viennent", "provenance", "cameroun", "afrique", "terroir", "pays"],
    patterns: [/d[' ]ou\s+viennent\s+vos\s+epices/i, /origine/i],
    question: "D'où viennent vos épices ?",
    answer:
      "Nos épices proviennent directement des terroirs agricoles réputés du Cameroun et d'Afrique centrale, sélectionnés pour la fertilité de leurs terres volcaniques et la puissance exceptionnelle de leurs arômes.",
    quickPrompts: ["Durée de conservation", "Pack 4 Saveurs", "Commander"],
  },
  {
    id: "duree-conservation",
    category: "Produits et épices",
    keywords: ["conservation", "conserver", "peremption", "ddm", "duree", "combien de temps"],
    patterns: [/combien\s+de\s+temps\s+peut[- ]on\s+conserver/i, /date\s+de\s+peremption/i],
    question: "Combien de temps peut-on conserver les épices ?",
    answer:
      "Nos épices se conservent de manière optimale pendant 24 mois (2 ans). La date de durabilité minimale (DDM) et le numéro de lot sont imprimés au dos de chaque sachet.",
    quickPrompts: ["Comment conserver après ouverture ?", "Voir la boutique"],
  },
  {
    id: "conservation-apres-ouverture",
    category: "Produits et épices",
    keywords: ["apres ouverture", "comment conserver", "garder sachet", "refermer", "humidite"],
    patterns: [/comment\s+conserver\s+les\s+epices\s+apres\s+ouverture/i],
    question: "Comment conserver les épices après ouverture ?",
    answer:
      "Nos sachets sont dotés d'une fermeture zip hermétique refermable. Après ouverture, refermez bien le sachet et conservez-le dans un endroit sec, à l'abri de la lumière directe, de la chaleur et des projections de vapeur.",
    quickPrompts: ["Voir les recettes", "Commander le Pack"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. CONSEILS POUR CHOISIR SON ÉPICE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "quelle-epice-conseil",
    category: "Conseils",
    keywords: ["conseillez vous", "recommander", "laquelle choisir", "quelle epice", "aidez moi a choisir"],
    patterns: [/quelle\s+epice\s+me\s+conseillez\s*vous/i, /laquelle\s+choisir/i],
    question: "Quelle épice me conseillez-vous ?",
    answer:
      "Tout dépend de votre menu !\n\n" +
      "• 🍗 Pour du poulet ou de la volaille : Épice Sulson Poulet (5,99 €)\n" +
      "• 🥩 Pour des viandes rouges ou grillades : Épice Sulson Viande (5,99 €)\n" +
      "• 🐟 Pour du poisson ou fruits de mer : Épice Sulson Poisson (5,99 €)\n" +
      "• ✨ Pour tout réussir (sauces, riz, légumes) : Le Secret de Sulson (5,99 €)\n" +
      "• 🎁 Pour tout avoir sous la main : Le Pack Intégral 4 Saveurs (23,96 €)",
    action: {
      type: "link",
      label: "Voir toute la collection",
      url: "/products",
    },
    quickPrompts: ["Pour le poulet", "Pour la viande", "Pour le poisson", "Pack 4 Saveurs"],
  },
  {
    id: "conseil-poulet",
    category: "Conseils",
    keywords: ["poulet", "volaille", "dinde", "cuisse", "poulet roti", "poulet braise", "ailes"],
    patterns: [/quelle\s+epice\s+utiliser\s+pour\s+le\s+poulet/i, /pour\s+le\s+poulet/i],
    question: "Quelle épice utiliser pour le poulet ?",
    answer:
      "L'Épice de Sulson - Poulet (100g — 5,99 €) est la référence absolue !\n\n" +
      "👨‍🍳 Astuce du Chef : Mélangez 1 à 2 cuillères à soupe d'épices avec un filet d'huile et du jus de citron. Massez votre volaille et laissez reposer 20 à 30 min. Le curcuma frais et les aromates offriront une chair juteuse et une peau dorée et croustillante au four ou à la braise.",
    action: {
      type: "link",
      label: "Voir l'Épice Poulet (5,99 €)",
      url: "/products/epice-poulet-100g",
    },
    quickPrompts: ["Pour la viande", "Pour le poisson", "Le Secret de Sulson"],
  },
  {
    id: "conseil-viande",
    category: "Conseils",
    keywords: ["viande", "boeuf", "steak", "grillade", "barbecue", "suya", "brochette", "agneau", "porc"],
    patterns: [/quelle\s+epice\s+utiliser\s+pour\s+la\s+viande/i, /pour\s+la\s+viande/i],
    question: "Quelle épice utiliser pour la viande ?",
    answer:
      "L'Épice de Sulson - Viande (100g — 5,99 €) est formulée pour les viandes rouges, steaks, brochettes Suya et rôtis.\n\n" +
      "🔥 Son alliance de paprika, poivre noir de Penja, ail et herbes nobles forme une croûte parfumée et caramélisée irrésistible sur la braise ou à la poêle.",
    action: {
      type: "link",
      label: "Voir l'Épice Viande (5,99 €)",
      url: "/products/epice-viande-100g",
    },
    quickPrompts: ["Pour le poulet", "Pour le poisson", "Pack 4 Saveurs"],
  },
  {
    id: "conseil-poisson",
    category: "Conseils",
    keywords: ["poisson", "dorade", "bar", "tilapia", "saumon", "crevette", "gambas", "fruits de mer", "poisson braise"],
    patterns: [/quelle\s+epice\s+utiliser\s+pour\s+le\s+poisson/i, /pour\s+le\s+poisson/i],
    question: "Quelle épice utiliser pour le poisson ?",
    answer:
      "L'Épice de Sulson - Poisson (5,99 €) est l'incontournable des poissons braisés, papillotes et soupes !\n\n" +
      "🐟 Avec le poivre de Guinée (maniguette), des rondelles et des herbes du Cameroun, elle apporte une note fraîche et parfumée sans masquer la délicatesse de la chair.",
    action: {
      type: "link",
      label: "Voir l'Épice Poisson (5,99 €)",
      url: "/products/epice-poisson-100g",
    },
    quickPrompts: ["Le Secret de Sulson", "Pack 4 Saveurs", "Commander"],
  },
  {
    id: "conseil-riz",
    category: "Conseils",
    keywords: ["riz", "parfumer riz", "riz saute", "riz pilaf", "riz rouge"],
    patterns: [/quelle\s+epice\s+pour\s+le\s+riz/i, /pour\s+le\s+riz/i],
    question: "Quelle épice pour le riz ?",
    answer:
      "Le Secret de Sulson (Saveur Gourmande) ! Ajoutez 1 cuillère à café dans votre eau de cuisson ou faites-la revenir dans un filet d'huile avec vos oignons pour obtenir un riz parfumé irrésistible.",
    action: {
      type: "link",
      label: "Voir Le Secret de Sulson (5,99 €)",
      url: "/products/secret-de-sulson-100g",
    },
    quickPrompts: ["Pour les légumes", "Pour les sauces", "Pack 4 Saveurs"],
  },
  {
    id: "conseil-legumes",
    category: "Conseils",
    keywords: ["legumes", "poelee", "patates douces", "wok", "legume roti"],
    patterns: [/quelle\s+epice\s+pour\s+les\s+legumes/i, /pour\s+les\s+legumes/i],
    question: "Quelle épice pour les légumes ?",
    answer:
      "Le Secret de Sulson ou l'Épice Poulet ! Saupoudrez sur vos poêlées de légumes, vos patates douces rôties ou vos woks pour apporter du goût, de la couleur et un délicieux parfum.",
    quickPrompts: ["Pour le riz", "Le Secret de Sulson"],
  },
  {
    id: "conseil-grillades",
    category: "Conseils",
    keywords: ["grillade", "grillades", "barbecue", "bbq", "braise", "brochettes"],
    patterns: [/quelle\s+epice\s+pour\s+les\s+grillades/i, /pour\s+le\s+barbecue/i],
    question: "Quelle épice pour les grillades ?",
    answer:
      "Pour le bœuf et l'agneau : Épice Viande. Pour les pilons de poulet grillés : Épice Poulet. Pour le poisson braisé : Épice Poisson. Si vous faites un grand barbecue mixte, le Pack 4 Saveurs est parfait !",
    quickPrompts: ["Pack Intégral 4 Saveurs", "Conseil marinade"],
  },
  {
    id: "conseil-sauce",
    category: "Conseils",
    keywords: ["sauce", "sauces", "sauce tomate", "ragout", "sauce mijotee", "sauce arachide"],
    patterns: [/quelle\s+epice\s+pour\s+une\s+sauce/i, /pour\s+les\s+sauces/i],
    question: "Quelle épice pour une sauce ?",
    answer:
      "Le Secret de Sulson est le maître incontesté des sauces tomate, sauces mijotées, sauces arachide et ragoûts. Il s'incorpore directement dans la sauce en cours de cuisson.",
    quickPrompts: ["Le Secret de Sulson", "Dosage recommandé"],
  },
  {
    id: "pas-trop-epice",
    category: "Conseils",
    keywords: ["pas trop epice", "pas piquant", "doux", "sensible", "leger"],
    patterns: [/pas\s+trop\s+epice/i, /la\s+plus\s+douce/i],
    question: "Je veux quelque chose de pas trop épicé. Laquelle choisir ?",
    answer:
      "Toutes nos épices privilégient les arômes et ne sont pas piquantes. Pour une douceur totale, Le Secret de Sulson et l'Épice Poulet sont d'un équilibre aromatique parfait.",
    quickPrompts: ["Le Secret de Sulson", "Pack 4 Saveurs"],
  },
  {
    id: "plus-populaire",
    category: "Conseils",
    keywords: ["populaire", "best seller", "preferee", "mieux vendue", "plus vendue", "succes"],
    patterns: [/quelle\s+est\s+votre\s+epice\s+la\s+plus\s+populaire/i, /le\s+best[- ]seller/i],
    question: "Quelle est votre épice la plus populaire ?",
    answer:
      "Notre best-seller individuel est Le Secret de Sulson pour sa polyvalence universelle, suivi de très près par le Pack Intégral 4 Saveurs choisi par 80% de nos nouveaux clients.",
    action: {
      type: "link",
      label: "Découvrir Le Secret de Sulson",
      url: "/products/secret-de-sulson-100g",
    },
    quickPrompts: ["Pack Intégral 4 Saveurs", "Prix et livraison"],
  },
  {
    id: "par-quoi-commencer",
    category: "Conseils",
    keywords: ["premiere commande", "decouverte", "commencer", "par quoi commencer", "decouvrir la marque"],
    patterns: [/par\s+quoi\s+commencer/i, /premiere\s+commande/i],
    question: "Je ne connais pas vos produits. Par quoi commencer ?",
    answer:
      "Le Pack Intégral 4 Saveurs (23,96 €) est le choix idéal pour une première commande : il vous permet de tester chaque mélange sur tous vos plats et vous fait bénéficier d'un tarif avantageux !",
    action: {
      type: "link",
      label: "Commander le Pack Découverte (23,96 €)",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Que contient le pack ?", "Livraison offerte dès 50 €"],
  },
  {
    id: "tester-la-marque",
    category: "Conseils",
    keywords: ["tester", "tester la marque", "essayer", "test"],
    patterns: [/quel\s+produit\s+pour\s+tester/i],
    question: "Quel produit me conseillez-vous pour tester la marque ?",
    answer:
      "Le Pack 4 Saveurs (400g) pour avoir la collection complète, ou Le Secret de Sulson (100g à 5,99 €) pour un premier test gourmand et universel.",
    quickPrompts: ["Pack 4 Saveurs", "Le Secret de Sulson"],
  },
  {
    id: "tous-les-jours",
    category: "Conseils",
    keywords: ["tous les jours", "quotidien", "chaque jour", "frequence", "regulier"],
    patterns: [/utiliser\s+ces\s+epices\s+tous\s+les\s+jours/i],
    question: "Est-ce que je peux utiliser ces épices tous les jours ?",
    answer:
      "Oui, absolument ! Elles sont conçues pour être vos assaisonnements sains du quotidien, sans additifs chimiques ni sel superflu, pour remplacer avantageusement les bouillons industriels.",
    quickPrompts: ["Sans MSG ni additifs", "Commander"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. PACK DE 4 ÉPICES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "pack-4-saveurs",
    category: "Pack de 4 épices",
    keywords: ["pack 4", "pack avec toutes les epices", "coffret 4", "pack integral"],
    patterns: [/pack\s+avec\s+toutes\s+les\s+epices/i, /pack\s+4/i],
    question: "Vous avez un pack avec toutes les épices ?",
    answer:
      "Oui ! Le Pack Intégral 4 Saveurs Sulson réunit l'ensemble de notre collection dans un seul coffret pratique de 400g.",
    action: {
      type: "link",
      label: "Voir le Pack 4 Saveurs (23,96 €)",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Que contient le pack ?", "Est-ce moins cher ?"],
  },
  {
    id: "que-contient-pack-4",
    category: "Pack de 4 épices",
    keywords: ["que contient le pack", "composition pack", "contenu pack"],
    patterns: [/que\s+contient\s+le\s+pack/i],
    question: "Que contient le pack de 4 ?",
    answer:
      "Il contient les 4 sachets complets de 100g :\n\n" +
      "• 1x Épice Poulet (100g)\n" +
      "• 1x Épice Viande (100g)\n" +
      "• 1x Épice Poisson (100g)\n" +
      "• 1x Secret de Sulson (100g)\n\n" +
      "Soit 400g d'épices nobles au total.",
    quickPrompts: ["Prix du pack", "Commander le Pack"],
  },
  {
    id: "pack-4-economie",
    category: "Pack de 4 épices",
    keywords: ["moins cher", "economie", "avantage pack", "reduction pack"],
    patterns: [/est[- ]ce\s+moins\s+cher\s+d[' ]acheter\s+le\s+pack/i],
    question: "Est-ce moins cher d'acheter le pack ?",
    answer:
      "Oui ! Le pack est proposé à 23,96 € pour réunir les 4 sachets de 100g (Poulet, Viande, Poisson, Secret de Sulson) à 5,99 € l'unité.",
    action: {
      type: "link",
      label: "Profiter du Pack 4 Saveurs (23,96 €)",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Frais de port", "Code promo"],
  },
  {
    id: "pack-4-choisir-epices",
    category: "Pack de 4 épices",
    keywords: ["choisir les epices", "personnaliser pack", "composer pack"],
    patterns: [/puis[- ]je\s+choisir\s+les\s+epices\s+de\s+mon\s+pack/i],
    question: "Puis-je choisir les épices de mon pack ?",
    answer:
      "Le Pack Intégral standard contient les 4 saveurs complémentaires (Poulet, Viande, Poisson, Secret). Si vous souhaitez des combinaisons spécifiques, vous pouvez sélectionner individuellement les sachets et quantités de votre choix sur la boutique.",
    quickPrompts: ["Voir la boutique", "Prendre le Pack 4"],
  },
  {
    id: "pack-plusieurs-meme-epice",
    category: "Pack de 4 épices",
    keywords: ["plusieurs fois la meme", "2 poulet", "3 viande", "quantite personnalisee"],
    patterns: [/plusieurs\s+fois\s+la\s+meme\s+epice/i],
    question: "Puis-je prendre plusieurs fois la même épice dans le pack ?",
    answer:
      "Pour commander plusieurs exemplaires d'une même saveur (par exemple 3 sachets Poulet et 1 Poisson), ajoutez simplement ces références individuellement à votre panier avec les quantités voulues.",
    quickPrompts: ["Voir la boutique", "Commander"],
  },
  {
    id: "difference-individuel-pack",
    category: "Pack de 4 épices",
    keywords: ["difference individuel pack", "unite ou pack", "achat individuel"],
    question: "Quelle est la différence entre acheter individuellement et prendre le pack ?",
    answer:
      "L'achat individuel (5,99 €) est idéal pour renouveler votre saveur préférée. Le Pack 4 Saveurs (23,96 €) vous offre la gamme complète pour toute votre cuisine.",
    quickPrompts: ["Pack Intégral 4 Saveurs", "Boutique"],
  },
  {
    id: "decouvrir-toutes-saveurs",
    category: "Pack de 4 épices",
    keywords: ["decouvrir toutes vos saveurs", "tout gouter", "tout tester"],
    patterns: [/decouvrir\s+toutes\s+vos\s+saveurs/i],
    question: "Je veux découvrir toutes vos saveurs. Que dois-je prendre ?",
    answer:
      "Choisissez directement notre Pack Intégral 4 Saveurs (23,96 €). Il réunit les 4 mélanges phares pour 400g d'épices nobles au total.",
    action: {
      type: "link",
      label: "Commander le Pack 4 Saveurs",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Frais de port", "Code promo"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. UTILISATION EN CUISINE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "comment-utiliser-epices",
    category: "Utilisation en cuisine",
    keywords: ["comment utiliser", "mode d'emploi", "utilisation", "cuisiner avec"],
    patterns: [/comment\s+utiliser\s+vos\s+epices/i],
    question: "Comment utiliser vos épices ?",
    answer:
      "C'est très simple :\n\n" +
      "1. En marinade : mélangez 1 à 2 cuillères à soupe d'épices avec un filet d'huile et du citron, massez votre ingrédient et laissez reposer 20 à 30 min.\n" +
      "2. En saupoudrage : parsemez directement sur vos poêlées, grillades ou rôtis avant cuisson.\n" +
      "3. En sauce : diluez directement dans vos sauces en cours de mijotage pour libérer les arômes.",
    quickPrompts: ["Quelle quantité mettre ?", "Peut-on faire une marinade ?"],
  },
  {
    id: "quantite-dosage",
    category: "Utilisation en cuisine",
    keywords: ["quantite", "dosage", "combien mettre", "cuillere", "dose"],
    patterns: [/quelle\s+quantite\s+dois[- ]je\s+mettre/i, /combien\s+mettre/i],
    question: "Quelle quantité dois-je mettre ?",
    answer:
      "Comptez environ 1 cuillère à café rase pour 500g d'ingrédients (viande, poisson, légumes, riz) ou 1 à 2 cuillères à soupe pour une volaille entière ou un poisson de 1 kg. Ajustez selon l'intensité désirée !",
    quickPrompts: ["Conseil marinade", "Voir les produits"],
  },
  {
    id: "faire-marinade",
    category: "Utilisation en cuisine",
    keywords: ["marinade", "mariner", "faire une marinade", "temps marinade"],
    patterns: [/faire\s+une\s+marinade/i, /comment\s+mariner/i],
    question: "Est-ce que je peux faire une marinade avec ?",
    answer:
      "Oui, elles sont spécialement formulées pour s'émulsionner avec l'huile (olive, tournesol) et pénétrer au cœur des chairs. Laissez mariner 20 à 30 min au frais avant cuisson pour un résultat ultra-parfumé.",
    quickPrompts: ["Marinade poisson", "Marinade poulet"],
  },
  {
    id: "cuisine-africaine-seulement",
    category: "Utilisation en cuisine",
    keywords: ["cuisine africaine", "seulement africain", "cuisine francaise", "plats europeens", "international"],
    patterns: [/uniquement\s+pour\s+la\s+cuisine\s+africaine/i],
    question: "Est-ce uniquement pour la cuisine africaine ?",
    answer:
      "Pas du tout ! Bien qu'issues de traditions nobles camerounaises, nos épices subliment toute la cuisine quotidienne et internationale : poulet rôti dominical, steaks et côtes de bœuf, légumes au four, pâtes, sauces crémeuses et barbecues.",
    quickPrompts: ["Voir les recettes", "Pack 4 Saveurs"],
  },
  {
    id: "melanger-plusieurs-epices",
    category: "Utilisation en cuisine",
    keywords: ["melanger", "associer", "ensemble", "combiner deux epices"],
    patterns: [/melanger\s+plusieurs\s+de\s+vos\s+epices/i],
    question: "Est-ce que je peux mélanger plusieurs de vos épices ?",
    answer:
      "Oui ! Par exemple, marier l'Épice Poisson avec une touche de Secret de Sulson donne un résultat exceptionnel sur des dorades ou des gambas braisées.",
    quickPrompts: ["Pack Intégral 4 Saveurs", "Boutique"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. ALLERGIES ET ALIMENTATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: "allergenes-presence",
    category: "Allergies et alimentation",
    keywords: ["allergene", "allergenes", "allergie", "fruits a coque", "arachide", "lactose", "celeri"],
    patterns: [/est[- ]ce\s+qu[' ]il\s+y\s+a\s+des\s+allergenes/i],
    question: "Est-ce qu'il y a des allergènes ?",
    answer:
      "Nos mélanges sont purs et formulés sans les allergènes majeurs courants (sans lactose, sans fruits à coque, sans céleri). Les compositions exactes figurent au dos de chaque sachet.",
    quickPrompts: ["Est-ce sans gluten ?", "Est-ce vegan ?", "Est-ce halal ?"],
  },
  {
    id: "sans-gluten",
    category: "Allergies et alimentation",
    keywords: ["gluten", "sans gluten", "celiaque", "ble", "farine"],
    patterns: [/est[- ]ce\s+sans\s+gluten/i],
    question: "Est-ce sans gluten ?",
    answer:
      "Oui ! Nos épices sont 100% pures et ne contiennent aucun ajout de farine, d'amidon ou de gluten.",
    quickPrompts: ["Est-ce vegan ?", "Est-ce halal ?"],
  },
  {
    id: "vegan-vegetarien",
    category: "Allergies et alimentation",
    keywords: ["vegan", "vegetarien", "vegetalien", "plantes", "sans viande"],
    patterns: [/est[- ]ce\s+vegan/i, /est[- ]ce\s+vegetarien/i],
    question: "Est-ce vegan ?",
    answer:
      "Oui, 100% vegan ! Tous nos ingrédients sont exclusivement d'origine végétale (épices, herbes, graines et racines nobles).",
    quickPrompts: ["Est-ce halal ?", "Voir la boutique"],
  },
  {
    id: "halal-compatibilite",
    category: "Allergies et alimentation",
    keywords: ["halal", "haram", "musulman", "certification halal"],
    patterns: [/est[- ]ce\s+halal/i],
    question: "Est-ce halal ?",
    answer:
      "Oui, 100% compatible halal. Nos mélanges sont entièrement végétaux et naturels, sans alcool, sans produits carnés ni dérivés animaux.",
    quickPrompts: ["Pack 4 Saveurs", "Commander"],
  },
  {
    id: "allergique-ingredient",
    category: "Allergies et alimentation",
    keywords: ["je suis allergique", "allergie a", "puis je consommer"],
    patterns: [/je\s+suis\s+allergique/i],
    question: "Je suis allergique à un ingrédient. Puis-je consommer votre produit ?",
    answer:
      "Consultez attentivement la liste des ingrédients sur la fiche du produit ou contactez-nous directement sur WhatsApp au +33 6 95 54 57 23 pour obtenir un conseil personnalisé avant de commander.",
    action: {
      type: "whatsapp",
      label: "Demander conseil sur WhatsApp",
    },
    quickPrompts: ["Ingrédients complets", "Parler à un conseiller"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. COMMANDE & PANIER
  // ═══════════════════════════════════════════════════════════════
  {
    id: "comment-passer-commande",
    category: "Commande",
    keywords: ["passer commande", "comment commander", "acheter", "processus achat"],
    patterns: [/comment\s+passer\s+une\s+commande/i, /comment\s+commander/i],
    question: "Comment passer une commande ?",
    answer:
      "C'est très simple :\n\n" +
      "1. Choisissez votre épice ou votre pack et cliquez sur « Ajouter au panier ».\n" +
      "2. Ouvrez votre panier en haut à droite et cliquez sur « Passer la commande ».\n" +
      "3. Renseignez votre adresse de livraison et réglez en toute sécurité par carte, Apple Pay, Google Pay ou PayPal.",
    action: {
      type: "link",
      label: "Voir la boutique",
      url: "/products",
    },
    quickPrompts: ["Où est mon panier ?", "Moyens de paiement"],
  },
  {
    id: "ajouter-au-panier",
    category: "Commande",
    keywords: ["ajouter au panier", "mettre au panier", "selectionner produit"],
    patterns: [/comment\s+ajouter\s+un\s+produit\s+au\s+panier/i],
    question: "Comment ajouter un produit au panier ?",
    answer:
      "Rendez-vous sur la page d'accueil ou sur la fiche du produit désiré, choisissez la quantité voulue puis cliquez sur le bouton « Ajouter au panier ». Le tiroir de commande s'ouvrira immédiatement.",
    quickPrompts: ["Où est mon panier ?", "Code promo"],
  },
  {
    id: "ou-est-panier",
    category: "Commande",
    keywords: ["ou est mon panier", "trouver panier", "voir panier", "icone panier"],
    patterns: [/ou\s+est\s+mon\s+panier/i],
    question: "Où est mon panier ?",
    answer:
      "Vous pouvez accéder à votre panier à tout moment grâce à l'icône de Sac/Panier située en haut à droite de l'écran sur mobile comme sur ordinateur.",
    quickPrompts: ["Passer commande", "Modifier quantité"],
  },
  {
    id: "modifier-quantite",
    category: "Commande",
    keywords: ["modifier quantite", "changer quantite", "plusieurs", "augmenter"],
    patterns: [/puis[- ]je\s+modifier\s+la\s+quantite/i],
    question: "Puis-je modifier la quantité ?",
    answer:
      "Oui ! Directement dans votre panier à l'aide des boutons + et - situés à côté de chaque article.",
    quickPrompts: ["Supprimer un produit", "Passer commande"],
  },
  {
    id: "supprimer-produit-panier",
    category: "Commande",
    keywords: ["supprimer", "enlever", "retirer du panier", "corbeille"],
    patterns: [/comment\s+supprimer\s+un\s+produit\s+du\s+panier/i],
    question: "Comment supprimer un produit du panier ?",
    answer:
      "Ouvrez votre panier et cliquez sur la petite icône de corbeille / croix à côté du produit. Le montant sera recalculé automatiquement.",
    quickPrompts: ["Voir la boutique", "Passer commande"],
  },
  {
    id: "commander-plusieurs-sachets",
    category: "Commande",
    keywords: ["plusieurs sachets", "commander plusieurs", "lot"],
    patterns: [/puis[- ]je\s+commander\s+plusieurs\s+sachets/i],
    question: "Puis-je commander plusieurs sachets ?",
    answer:
      "Oui, absolument ! Vous pouvez sélectionner plusieurs exemplaires du même produit ou mixer les saveurs, sous réserve des stocks disponibles.",
    quickPrompts: ["Pack Intégral 4 Saveurs", "Boutique"],
  },
  {
    id: "minimum-commande",
    category: "Commande",
    keywords: ["minimum commande", "montant minimum", "minimum d'achat"],
    patterns: [/y\s+a[- ]t[- ]il\s+un\s+minimum\s+de\s+commande/i],
    question: "Y a-t-il un minimum de commande ?",
    answer:
      "Aucun minimum de commande n'est imposé ! Vous pouvez commander un seul sachet à 5,99 €.",
    quickPrompts: ["Livraison gratuite dès 50 €", "Pack 4 Saveurs"],
  },
  {
    id: "grande-quantite",
    category: "Commande",
    keywords: ["grande quantite", "gros volume", "commander en gros", "evenement"],
    patterns: [/commander\s+en\s+grande\s+quantite/i],
    question: "Puis-je commander en grande quantité ?",
    answer:
      "Oui ! Pour les commandes en gros volume, contactez directement notre équipe par WhatsApp au +33 6 95 54 57 23 ou par email à contact@epicesdesulson.com pour bénéficier de tarifs préférentiels.",
    action: {
      type: "whatsapp",
      label: "Contacter pour commande en gros",
    },
    quickPrompts: ["Professionnels et restaurants", "Voir la boutique"],
  },
  {
    id: "restaurants-professionnels",
    category: "Commande",
    keywords: ["restaurant", "professionnel", "traiteur", "chef", "revendeur", "epicerie fine", "formats kilos"],
    patterns: [/pour\s+les\s+restaurants/i, /professionnels/i],
    question: "Faites-vous des commandes pour les restaurants ou professionnels ?",
    answer:
      "Oui ! Nous fournissons les restaurants, traiteurs et chefs (formats professionnels et kilos disponibles). Écrivez-nous à contact@epicesdesulson.com ou sur WhatsApp au +33 6 95 54 57 23.",
    action: {
      type: "whatsapp",
      label: "Échanger avec le service Pro",
    },
    quickPrompts: ["Contacter sur WhatsApp", "Boutique"],
  },
  {
    id: "utiliser-code-promo",
    category: "Commande",
    keywords: ["code promo", "reduction", "remise", "bon d'achat", "promo", "SULSON10"],
    patterns: [/comment\s+utiliser\s+un\s+code\s+promo/i, /avez[- ]vous\s+un\s+code\s+promo/i],
    question: "Comment utiliser un code promo ?",
    answer:
      "Saisissez votre code dans le champ « Code promo » de votre panier ou sur la page de paiement, puis cliquez sur « Appliquer ».\n\n🎁 Code de bienvenue actuel : SULSON10 pour -10% de réduction immédiate !",
    quickPrompts: ["Code ne fonctionne pas", "Passer commande"],
  },
  {
    id: "code-promo-bloque",
    category: "Commande",
    keywords: ["code promo ne fonctionne pas", "erreur code", "code invalide"],
    patterns: [/mon\s+code\s+promo\s+ne\s+fonctionne\s+pas/i],
    question: "Mon code promo ne fonctionne pas.",
    answer:
      "Vérifiez l'orthographe exacte (sans espace superflu) et sa validité. Si le souci persiste, contactez notre support par WhatsApp au +33 6 95 54 57 23.",
    quickPrompts: ["Contacter sur WhatsApp", "Voir le panier"],
  },
  {
    id: "modifier-commande-apres-paiement",
    category: "Commande",
    keywords: ["modifier commande", "apres paiement", "changer adresse", "changer article"],
    patterns: [/modifier\s+ma\s+commande\s+apres\s+(le\s+)?paiement/i],
    question: "Puis-je modifier ma commande après le paiement ?",
    answer:
      "Contactez-nous immédiatement par WhatsApp au +33 6 95 54 57 23 avec votre numéro de commande. Si votre colis n'est pas encore remis au transporteur Colissimo, nous pourrons effectuer la modification.",
    action: {
      type: "whatsapp",
      label: "Modifier ma commande sur WhatsApp",
    },
    quickPrompts: ["Annuler ma commande", "Suivi colis"],
  },
  {
    id: "annuler-commande",
    category: "Commande",
    keywords: ["annuler commande", "annulation", "annuler achat"],
    patterns: [/puis[- ]je\s+annuler\s+ma\s+commande/i],
    question: "Puis-je annuler ma commande ?",
    answer:
      "Vous pouvez annuler votre commande sans frais tant qu'elle n'a pas été expédiée. Contactez sans tarder notre service client au +33 6 95 54 57 23.",
    action: {
      type: "whatsapp",
      label: "Demander l'annulation",
    },
    quickPrompts: ["Contacter le SAV", "Voir la boutique"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. PAIEMENT & FACTURATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: "moyens-paiement-liste",
    category: "Paiement",
    keywords: ["moyens de paiement", "modes de paiement", "carte", "cb", "visa", "mastercard", "apple pay", "google pay", "paypal"],
    patterns: [/quels\s+moyens\s+de\s+paiement\s+acceptez\s*vous/i],
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons :\n\n" +
      "💳 Cartes Bancaires (Visa, Mastercard, Carte Bleue)\n" +
      "🍎 Apple Pay (1 clic sur iPhone/Mac)\n" +
      "🤖 Google Pay (1 clic sur Android)\n" +
      "🅿️ PayPal",
    quickPrompts: ["Paiement sécurisé ?", "Vais-je recevoir une facture ?"],
  },
  {
    id: "payer-carte-bancaire",
    category: "Paiement",
    keywords: ["payer par carte", "carte bancaire", "regler par carte", "cb"],
    patterns: [/puis[- ]je\s+payer\s+par\s+carte/i],
    question: "Puis-je payer par carte bancaire ?",
    answer:
      "Oui, directement et en toute simplicité lors de l'étape de paiement avec protection 3D-Secure de votre banque.",
    quickPrompts: ["Sécurité du paiement", "Moyens de paiement"],
  },
  {
    id: "paiement-securise",
    category: "Paiement",
    keywords: ["securise", "securite paiement", "chiffrement", "stripe", "ssl", "piratage"],
    patterns: [/le\s+paiement\s+est[- ]il\s+securise/i],
    question: "Le paiement est-il sécurisé ?",
    answer:
      "Oui, à 100%. Vos paiements sont chiffrés selon le protocole bancaire SSL 256-bit certifié PCI-DSS via Stripe et PayPal. Nous ne stockons jamais vos numéros de carte bancaire.",
    quickPrompts: ["Conservez-vous mes données ?", "Moyens de paiement"],
  },
  {
    id: "paiement-refuse",
    category: "Paiement",
    keywords: ["paiement refuse", "echec paiement", "carte refusee", "pourquoi refuse"],
    patterns: [/pourquoi\s+mon\s+paiement\s+a[- ]t[- ]il\s+ete\s+refuse/i],
    question: "Pourquoi mon paiement a-t-il été refusé ?",
    answer:
      "Cela peut arriver si l'authentification 3D-Secure n'a pas été validée sur votre application bancaire, si le plafond est atteint ou en cas de faute de frappe. Vous pouvez réessayez ou opter pour PayPal ou Apple Pay / Google Pay.",
    quickPrompts: ["Contacter le support", "Moyens de paiement"],
  },
  {
    id: "paiement-sans-confirmation",
    category: "Paiement",
    keywords: ["pas recu confirmation", "email confirmation", "paiement passe mais rien"],
    patterns: [/pas\s+recu\s+de\s+confirmation/i],
    question: "Mon paiement est passé mais je n'ai pas reçu de confirmation.",
    answer:
      "Vérifiez d'abord vos courriers indésirables / spams. Si vous ne trouvez rien après 5 minutes, écrivez-nous sur WhatsApp au +33 6 95 54 57 23 ou à contact@epicesdesulson.com avec votre nom : nous vérifierons votre commande et vous renverrons votre confirmation immédiatement.",
    action: {
      type: "whatsapp",
      label: "Vérifier ma confirmation sur WhatsApp",
    },
    quickPrompts: ["Contacter sur WhatsApp", "Où retrouver ma facture ?"],
  },
  {
    id: "conservation-donnees-bancaires",
    category: "Paiement",
    keywords: ["gardez vous carte", "conservez vous donnees", "stocker informations bancaires"],
    patterns: [/est[- ]ce\s+que\s+vous\s+conservez\s+mes\s+informations\s+bancaires/i],
    question: "Est-ce que vous conservez mes informations bancaires ?",
    answer:
      "Non, jamais. Aucune donnée bancaire sensible ne transite ni n'est enregistrée sur nos serveurs. Tout est géré directement par Stripe et PayPal.",
    quickPrompts: ["Sécurité du paiement", "Moyens de paiement"],
  },
  {
    id: "facture-pdf",
    category: "Paiement",
    keywords: ["facture", "recu", "justificatif", "pdf", "telecharger facture"],
    patterns: [/vais[- ]je\s+recevoir\s+une\s+facture/i],
    question: "Vais-je recevoir une facture ?",
    answer:
      "Oui, automatiquement ! Une facture officielle au format PDF est générée pour chaque commande, envoyée directement par email avec votre confirmation d'achat et téléchargeable en 1 clic.",
    quickPrompts: ["Où retrouver ma facture ?", "Livraison"],
  },
  {
    id: "ou-retrouver-facture",
    category: "Paiement",
    keywords: ["ou retrouver facture", "recuperer facture", "duplicata facture"],
    patterns: [/ou\s+puis[- ]je\s+retrouver\s+ma\s+facture/i],
    question: "Où puis-je retrouver ma facture ?",
    answer:
      "Elle est disponible en pièce jointe de votre e-mail de confirmation de commande et sur votre écran de fin de commande. Vous pouvez aussi nous demander un duplicata par email à contact@epicesdesulson.com.",
    quickPrompts: ["Suivi de commande", "Boutique"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. LIVRAISON & SUIVI
  // ═══════════════════════════════════════════════════════════════
  {
    id: "zones-livraison",
    category: "Livraison",
    keywords: ["ou livrez vous", "destinations", "pays", "zones livraison"],
    patterns: [/ou\s+livrez\s*vous/i],
    question: "Où livrez-vous ?",
    answer:
      "Nous livrons en France Métropolitaine, en Corse, à Monaco, ainsi que dans toute l'Union Européenne (Belgique, Luxembourg, Suisse, Espagne, Allemagne, etc.).",
    quickPrompts: ["Livrez-vous partout en France ?", "Délais de livraison"],
  },
  {
    id: "livraison-france",
    category: "Livraison",
    keywords: ["partout en france", "corse", "france metropolitaine", "monaco"],
    patterns: [/livrez\s*vous\s+partout\s+en\s+france/i],
    question: "Livrez-vous partout en France ?",
    answer:
      "Oui, nous assurons la livraison sur l'intégralité du territoire français métropolitain et en Corse directement à votre domicile ou en point relais.",
    quickPrompts: ["Délais de livraison", "Frais de port"],
  },
  {
    id: "livraison-europe",
    category: "Livraison",
    keywords: ["europe", "belgique", "suisse", "luxembourg", "allemagne", "espagne"],
    patterns: [/livrez\s*vous\s+en\s+europe/i, /livrez\s*vous\s+en\s+belgique/i],
    question: "Livrez-vous en Europe ?",
    answer:
      "Oui, nous expédions régulièrement vers la Belgique, la Suisse, le Luxembourg et les autres pays européens via le réseau postal international Colissimo.",
    quickPrompts: ["Délais de livraison", "Frais de livraison"],
  },
  {
    id: "livraison-etranger",
    category: "Livraison",
    keywords: ["etranger", "international", "monde", "dom tom", "outre mer"],
    patterns: [/livrez\s*vous\s+a\s+l[' ]etranger/i],
    question: "Livrez-vous à l'étranger ?",
    answer:
      "Oui, les envois internationaux sont possibles. Renseignez votre pays de destination lors du paiement pour afficher les options d'acheminement correspondantes.",
    quickPrompts: ["Délais de livraison", "Passer commande"],
  },
  {
    id: "prix-livraison",
    category: "Livraison",
    keywords: ["combien coute livraison", "frais de port", "tarif livraison", "prix livraison"],
    patterns: [/combien\s+coute\s+la\s+livraison/i, /frais\s+de\s+port/i],
    question: "Combien coûte la livraison ?",
    answer:
      "• LIVRAISON GRATUITE dès 50 € d'achat en France métropolitaine !\n• Pour les commandes inférieures à 50 €, la livraison standard suivie Colissimo est calculée automatiquement à tarif réduit dans votre panier.",
    quickPrompts: ["Délais de livraison", "Pack 4 Saveurs"],
  },
  {
    id: "livraison-gratuite-seuil",
    category: "Livraison",
    keywords: ["livraison gratuite", "offerte", "seuil gratuit", "50 euros", "a partir de combien"],
    patterns: [/la\s+livraison\s+est[- ]elle\s+gratuite/i],
    question: "La livraison est-elle gratuite à partir d'un certain montant ?",
    answer:
      "Oui ! La livraison est 100% offerte dès 50 € d'achat pour toute commande expédiée en France métropolitaine.",
    action: {
      type: "link",
      label: "Ajouter le Pack 4 Saveurs",
      url: "/products/pack-integral-4-saveurs",
    },
    quickPrompts: ["Délais de livraison", "Moyens de paiement"],
  },
  {
    id: "delai-livraison",
    category: "Livraison",
    keywords: ["delai de livraison", "combien de jours", "quand arrive", "temps livraison"],
    patterns: [/quel\s+est\s+le\s+delai\s+de\s+livraison/i, /combien\s+de\s+temps\s+pour\s+recevoir/i],
    question: "Quel est le délai de livraison ?",
    answer:
      "• En France Métropolitaine : 48h à 72h ouvrées (2 à 3 jours ouvrés).\n• En Europe : 3 à 5 jours ouvrés selon le pays.",
    quickPrompts: ["Quand ma commande sera expédiée ?", "Suivi de colis"],
  },
  {
    id: "expedition-preparation",
    category: "Livraison",
    keywords: ["quand expedie", "preparation commande", "depart colis"],
    patterns: [/quand\s+ma\s+commande\s+sera[- ]t[- ]elle\s+expediee/i],
    question: "Quand ma commande sera-t-elle expédiée ?",
    answer:
      "Vos commandes sont préparées et expédiées sous 24h à 48h ouvrées après réception de votre règlement. Vous recevez un email dès le départ du colis !",
    quickPrompts: ["Comment suivre ma commande ?", "Frais de livraison"],
  },
  {
    id: "suivre-commande",
    category: "Livraison",
    keywords: ["suivre commande", "suivi colis", "lien suivi", "colissimo suivi"],
    patterns: [/comment\s+suivre\s+ma\s+commande/i],
    question: "Comment suivre ma commande ?",
    answer:
      "Dès l'expédition, vous recevez un email contenant votre numéro de suivi Colissimo / La Poste. Vous pouvez cliquer dessus pour suivre l'acheminement de votre colis jusqu'à votre boîte aux lettres.",
    quickPrompts: ["Où trouver mon numéro de suivi ?", "Colis en retard"],
  },
  {
    id: "ou-trouver-numero-suivi",
    category: "Livraison",
    keywords: ["ou trouver numero de suivi", "numero de suivi manquant", "retrouver suivi"],
    patterns: [/ou\s+trouver\s+mon\s+numero\s+de\s+suivi/i],
    question: "Où trouver mon numéro de suivi ?",
    answer:
      "Il figure dans l'e-mail intitulé « Votre commande Les Épices de Sulson est en route ». Pensez à vérifier vos courriers indésirables si vous ne l'avez pas reçu sous 48h.",
    quickPrompts: ["Contacter le support WhatsApp", "Délais de livraison"],
  },
  {
    id: "colis-indique-livre-non-recu",
    category: "Livraison",
    keywords: ["indique livre", "pas recu", "colis introuvable", "livre mais rien"],
    patterns: [/indiquee?\s+comme\s+livree?\s+mais\s+je\s+ne\s+l[' ]ai\s+pas\s+recue?/i],
    question: "Ma commande est indiquée comme livrée mais je ne l'ai pas reçue.",
    answer:
      "Vérifiez d'abord votre boîte aux lettres, auprès de votre gardien ou de vos voisins immédiats. Si le colis est introuvable, contactez-nous au +33 6 95 54 57 23 ou par email à contact@epicesdesulson.com avec votre numéro de commande pour que nous ouvrions une enquête prioritaire avec La Poste.",
    action: {
      type: "whatsapp",
      label: "Signaler le problème sur WhatsApp",
    },
    quickPrompts: ["Parler à un conseiller", "SAV"],
  },
  {
    id: "colis-en-retard",
    category: "Livraison",
    keywords: ["colis en retard", "retard livraison", "pas encore arrive", "bloque"],
    patterns: [/mon\s+colis\s+est\s+en\s+retard/i, /retard/i],
    question: "Mon colis est en retard.",
    answer:
      "Consultez d'abord le lien de suivi Colissimo. Si l'acheminement est bloqué depuis plus de 72h ouvrées, écrivez-nous sur WhatsApp au +33 6 95 54 57 23 et nous interviendrons immédiatement.",
    action: {
      type: "whatsapp",
      label: "Contacter le support WhatsApp",
    },
    quickPrompts: ["Suivre ma commande", "Parler à un conseiller"],
  },
  {
    id: "colis-endommage",
    category: "Livraison",
    keywords: ["endommage", "abime", "colis casse", "sachet perce", "carton dechire"],
    patterns: [/mon\s+colis\s+est\s+arrive\s+endommage/i],
    question: "Mon colis est arrivé endommagé.",
    answer:
      "Prenez des photos nettes du carton et des sachets endommagés, et transmettez-les nous par WhatsApp au +33 6 95 54 57 23 ou à contact@epicesdesulson.com. Nous vous réexpédierons un nouveau colis immédiatement à nos frais !",
    action: {
      type: "whatsapp",
      label: "Envoyer les photos sur WhatsApp",
    },
    quickPrompts: ["Contacter le SAV", "Remboursement"],
  },
  {
    id: "mauvais-produit-recu",
    category: "Livraison",
    keywords: ["mauvais produit", "erreur produit", "pas le bon sachet", "trompe de produit"],
    patterns: [/j[' ]ai\s+recu\s+le\s+mauvais\s+produit/i],
    question: "J'ai reçu le mauvais produit.",
    answer:
      "Envoyez-nous simplement une photo du sachet reçu par WhatsApp (+33 6 95 54 57 23). Nous vous enverrons aussitôt le produit correspondant à votre commande initiale sans frais supplémentaires.",
    action: {
      type: "whatsapp",
      label: "Signaler l'erreur sur WhatsApp",
    },
    quickPrompts: ["Contacter le support", "SAV"],
  },
  {
    id: "produit-manquant",
    category: "Livraison",
    keywords: ["produit manquant", "manque un sachet", "incomplet", "article manquant"],
    patterns: [/il\s+manque\s+un\s+produit/i],
    question: "Il manque un produit dans ma commande.",
    answer:
      "Contactez-nous à contact@epicesdesulson.com ou au +33 6 95 54 57 23 en indiquant votre numéro de commande. Nous vérifierons le bon de préparation et vous expédierons l'article manquant dans les 24h.",
    action: {
      type: "whatsapp",
      label: "Signaler sur WhatsApp",
    },
    quickPrompts: ["Suivre ma commande", "Parler à un conseiller"],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. RETOURS, REMBOURSEMENT ET SAV
  // ═══════════════════════════════════════════════════════════════
  {
    id: "retours-remboursement",
    category: "SAV",
    keywords: ["retourner", "retour", "renvoyer", "remboursement", "retractation", "14 jours"],
    patterns: [/puis[- ]je\s+retourner\s+ma\s+commande/i],
    question: "Puis-je retourner ma commande ?",
    answer:
      "Conformément à la législation, vous disposez de 14 jours après réception pour nous notifier un retour. Pour des raisons strictes d'hygiène et de sécurité alimentaire, seuls les sachets intacts, scellés et non ouverts peuvent faire l'objet d'un retour et d'un remboursement.",
    quickPrompts: ["Comment demander un remboursement ?", "Contacter le SAV"],
  },
  {
    id: "delai-remboursement-demande",
    category: "SAV",
    keywords: ["delai remboursement", "combien de temps remboursement", "delai retour"],
    patterns: [/quel\s+est\s+le\s+delai\s+pour\s+demander\s+un\s+remboursement/i],
    question: "Quel est le délai pour demander un remboursement ?",
    answer:
      "Vous avez 14 jours suivant la date de réception de votre commande pour demander un retour ou un remboursement.",
    quickPrompts: ["Comment demander un remboursement ?", "Contacter le SAV"],
  },
  {
    id: "comment-demander-remboursement",
    category: "SAV",
    keywords: ["comment demander remboursement", "procedure remboursement", "se faire rembourser"],
    patterns: [/comment\s+demander\s+un\s+remboursement/i],
    question: "Comment demander un remboursement ?",
    answer:
      "Contactez notre service client par e-mail à contact@epicesdesulson.com ou par WhatsApp au +33 6 95 54 57 23 en précisant votre numéro de commande et le motif de votre demande. Le remboursement est émis sous 3 à 5 jours ouvrés sur la carte bancaire utilisée lors de l'achat.",
    action: {
      type: "whatsapp",
      label: "Faire une demande sur WhatsApp",
    },
    quickPrompts: ["Produit abîmé", "Service client"],
  },
  {
    id: "produit-abime-que-faire",
    category: "SAV",
    keywords: ["produit abime", "sachet perce", "endommage", "que faire abime"],
    patterns: [/j[' ]ai\s+recu\s+un\s+produit\s+abime/i],
    question: "J'ai reçu un produit abîmé, que faire ?",
    answer:
      "Envoyez-nous une photo du produit abîmé par WhatsApp au +33 6 95 54 57 23. Nous procédons au remplacement ou au remboursement intégral selon votre préférence.",
    action: {
      type: "whatsapp",
      label: "Envoyer photo sur WhatsApp",
    },
    quickPrompts: ["Contacter le SAV", "Parler à un conseiller"],
  },
  {
    id: "trompe-commande",
    category: "SAV",
    keywords: ["trompe", "erreur de ma part", "mauvais choix", "modifier choix"],
    patterns: [/je\s+me\s+suis\s+trompe\s+dans\s+ma\s+commande/i],
    question: "Je me suis trompé dans ma commande.",
    answer:
      "Si votre commande n'a pas encore été expédiée, prévenez-nous immédiatement par WhatsApp au +33 6 95 54 57 23 pour modifier la référence.",
    action: {
      type: "whatsapp",
      label: "Modifier sur WhatsApp",
    },
    quickPrompts: ["Annuler ma commande", "Suivi de colis"],
  },
  {
    id: "contacter-service-client",
    category: "SAV",
    keywords: ["contacter", "service client", "sav", "joindre", "support", "numero"],
    patterns: [/comment\s+contacter\s+le\s+service\s+client/i],
    question: "Comment contacter le service client ?",
    answer:
      "Vous disposez de plusieurs canaux de contact directs :\n\n" +
      "📱 WhatsApp officiel : +33 6 95 54 57 23 (réponse ultra-rapide)\n" +
      "✉️ E-mail : contact@epicesdesulson.com\n" +
      "📝 Formulaire : accessible sur la page Contact du site",
    action: {
      type: "whatsapp",
      label: "Ouvrir WhatsApp (+33 6 95 54 57 23)",
    },
    quickPrompts: ["Parler à une vraie personne", "Horaires du service client"],
  },
  {
    id: "parler-vraie-personne",
    category: "SAV",
    keywords: ["vraie personne", "humain", "parler a quelqu'un", "conseiller en direct", "telephone", "appeler"],
    patterns: [/puis[- ]je\s+parler\s+a\s+une\s+vraie\s+personne/i, /parler\s+a\s+quelqu[' ]un/i],
    question: "Puis-je parler à une vraie personne ?",
    answer:
      "Absolument ! Si vous souhaitez échanger directement avec un membre de l'équipe Sulson, écrivez-nous ou appelez-nous au +33 6 95 54 57 23.",
    action: {
      type: "whatsapp",
      label: "Échanger avec notre équipe",
    },
    quickPrompts: ["Horaires d'ouverture", "Délai de réponse"],
  },
  {
    id: "horaires-service-client",
    category: "SAV",
    keywords: ["horaires", "heures d'ouverture", "quand joindre", "disponibilite"],
    patterns: [/quels\s+sont\s+vos\s+horaires/i],
    question: "Quels sont vos horaires de service client ?",
    answer:
      "Notre service client est joignable du lundi au samedi, de 9h00 à 19h00. Vous pouvez nous laisser un message en dehors de ces horaires et nous vous répondrons dès l'ouverture.",
    quickPrompts: ["Délai de réponse", "Contacter sur WhatsApp"],
  },
  {
    id: "delai-reponse-sav",
    category: "SAV",
    keywords: ["delai reponse", "combien de temps reponse", "temps pour repondre"],
    patterns: [/combien\s+de\s+temps\s+faut[- ]il\s+pour\s+recevoir\s+une\s+reponse/i],
    question: "Combien de temps faut-il pour recevoir une réponse ?",
    answer:
      "• Sur WhatsApp : réponse moyenne en moins de 2 heures pendant les heures d'ouverture.\n• Par email : réponse garantie sous 24h ouvrées maximum.",
    quickPrompts: ["Ouvrir WhatsApp direct", "Voir la boutique"],
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

  // 2. Salutations naturelles & courtoises (« Salut » / « Bonjour » / « Bonsoir » / « Coucou »)
  if (
    lowerQuery.match(/^(bonjour|salut|hello|bonsoir|coucou|hey|hi)\b/i) &&
    lowerQuery.length < 35
  ) {
    return {
      text: "Bonjour 👋 Bienvenue chez Les Épices de Sulson ! Je suis votre conseillère culinaire. Je peux vous guider pour choisir le meilleur mélange pour votre recette, vous donner des conseils de marinade, ou vous renseigner sur votre commande et la livraison.\n\nQue cuisinez-vous aujourd'hui ? 😊",
      quickPrompts: [
        "🍗 Pour le poulet",
        "🥩 Pour la viande",
        "🐟 Pour le poisson",
        "🎁 Pack 4 Saveurs",
        "🚚 Délais de livraison",
        "🏷️ Code promo -10%",
      ],
    };
  }

  // 3. Expressions spontanées courantes
  // « Je cherche des épices »
  if (lowerQuery.match(/^(je cherche des epices|je veux des epices|trouver des epices)/i)) {
    return {
      text: "Vous êtes au bon endroit ! Nous proposons 4 mélanges 100% naturels (Poulet, Viande, Poisson, Secret de Sulson) en sachets 100g (5,99 €) ainsi que notre Pack Intégral 4 Saveurs à 23,96 € (400g).\n\nQuel type de plat souhaitez-vous sublimer aujourd'hui ?",
      action: {
        type: "link",
        label: "Voir tous les produits",
        url: "/products",
      },
      quickPrompts: ["Pour le poulet", "Pour la viande", "Pour le poisson", "Pack 4 Saveurs"],
    };
  }

  // « Je sais pas quoi prendre » / « Je ne sais pas »
  if (lowerQuery.match(/^(je (ne )?sais pas quoi prendre|je sais pas|aidez moi a choisir)/i)) {
    return {
      text: "Pas d'inquiétude ! Dites-moi ce que vous préparez le plus souvent : volaille, poisson, viandes grillées, riz ou plats mijotés ?\n\nSi vous souhaitez tout tester, notre Pack Intégral 4 Saveurs (23,96 €) est la formule idéale !",
      action: {
        type: "link",
        label: "Voir le Pack 4 Saveurs (23,96 €)",
        url: "/products/pack-integral-4-saveurs",
      },
      quickPrompts: ["Pour le poulet", "Pour la viande", "Pour le poisson", "Le Secret de Sulson"],
    };
  }

  // « C'est combien ? » / « Prix »
  if (lowerQuery.match(/^(c[' ]est combien|quel est le prix|les prix|combien ca coute)\??$/i)) {
    return {
      text: "Voici nos tarifs officiels Les Épices de Sulson :\n\n• Sachet individuel (100g) : 5,99 €\n• Pack Intégral 4 Saveurs (400g) : 23,96 €\n• Livraison GRATUITE dès 50 € d'achat !",
      action: {
        type: "link",
        label: "Voir le Pack 4 Saveurs",
        url: "/products/pack-integral-4-saveurs",
      },
      quickPrompts: ["Commander le Pack", "Frais de port", "Code promo"],
    };
  }

  // « Vous livrez ? »
  if (lowerQuery.match(/^(vous livrez|est[- ]ce que vous livrez|livraison possible)\??$/i)) {
    return {
      text: "Oui, nous livrons partout en France Métropolitaine, en Corse et dans toute l'Europe via Colissimo avec suivi en temps réel. La livraison est offerte dès 50 € de commande !",
      quickPrompts: ["Délais de livraison", "Frais de livraison", "Voir les produits"],
    };
  }

  // « Ça arrive quand ? »
  if (lowerQuery.match(/^(ca arrive quand|quand est[- ]ce que ca arrive|delai reception)\??$/i)) {
    return {
      text: "Votre colis est préparé sous 24/48h et livré en 48h à 72h ouvrées en France (3 à 5 jours en Europe). Si vous avez déjà passé commande, indiquez-moi votre numéro de commande pour vérifier son état d'avancement !",
      quickPrompts: ["Suivre ma commande", "Parler à un conseiller"],
    };
  }

  // « Ma commande est où ? »
  if (lowerQuery.match(/^(ma commande est ou|ou est ma commande|ou est mon colis)\??$/i)) {
    return {
      text: "Vous pouvez suivre votre commande grâce au lien Colissimo reçu dans votre email d'expédition. Si vous ne le retrouvez pas, écrivez-nous directement sur WhatsApp au +33 6 95 54 57 23 avec votre nom et prénom !",
      action: {
        type: "whatsapp",
        label: "Vérifier le suivi sur WhatsApp",
      },
      quickPrompts: ["Parler à un conseiller", "Voir les produits"],
    };
  }

  // « Je veux parler à quelqu'un »
  if (lowerQuery.match(/^(je veux parler a quelqu[' ]un|parler a un humain|conseiller direct)\??$/i)) {
    return {
      text: "Très bien ! Vous pouvez joindre directement notre équipe :\n\n📱 Sur WhatsApp au : +33 6 95 54 57 23 (conseiller en direct)\n✉️ Par email à : contact@epicesdesulson.com\n\nNous nous ferons un plaisir de vous répondre !",
      action: {
        type: "whatsapp",
        label: "Ouvrir WhatsApp (+33 6 95 54 57 23)",
      },
      quickPrompts: ["Horaires d'ouverture", "Voir les épices"],
    };
  }

  // « J'ai un problème »
  if (lowerQuery.match(/^(j[' ]ai un probleme|probleme de commande|souci)\??$/i)) {
    return {
      text: "Nous sommes là pour vous aider immédiatement. Votre demande concerne-t-elle le passage d'une commande, un paiement, le suivi d'un colis ou une question sur une recette ? Vous pouvez également contacter notre SAV direct au +33 6 95 54 57 23.",
      action: {
        type: "whatsapp",
        label: "Contacter le SAV (+33 6 95 54 57 23)",
      },
      quickPrompts: ["Suivi de colis", "Paiement refusé", "Produit abîmé"],
    };
  }

  // 4. Recherche par mots-clés pondérés et patterns RegEx dans la base de connaissances
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
          score += 25;
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
        "Pack Intégral 4 Saveurs",
        "Livraison & Délais",
        "Parler sur WhatsApp",
      ],
    };
  }

  // 5. Réponse de secours du Chatbot (lorsqu'il ne connaît pas la réponse)
  return {
    text: "Je n'ai pas suffisamment d'informations pour vous répondre avec certitude, et je préfère ne pas vous induire en erreur.\n\nVous pouvez reformuler votre question ou contacter directement un conseiller de l'équipe Sulson sur WhatsApp au +33 6 95 54 57 23 ou par email à contact@epicesdesulson.com !",
    action: {
      type: "whatsapp",
      label: "Discuter sur WhatsApp (+33 6 95 54 57 23)",
    },
    showWhatsappButton: true,
    whatsappMessage: `Bonjour Les Épices de Sulson, j'ai une question sur votre boutique : "${userQuery}"`,
    quickPrompts: [
      "🍗 Épice pour le poulet",
      "🥩 Épice pour la viande",
      "🐟 Épice pour le poisson",
      "🎁 Pack 4 Saveurs",
      "🚚 Délais de livraison",
    ],
  };
}
