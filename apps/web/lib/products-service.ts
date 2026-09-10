// Products Domain Service for Les Épices de Sulson

export interface ProductFormatModel {
  label: string;
  weightGrams: number;
  multiplier: number;
  price: number;
  oldPrice?: number;
}

export interface SulsonProductModel {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription?: string;
  origin: string;
  basePrice: number;
  baseOldPrice?: number;
  ratingScore: number;
  ratingCount: number;
  imageRecto: string;
  imageVerso?: string;
  isPack?: boolean;
  ingredients: string[];
  healthBenefits: string[];
  chefTip: string;
  pairings: string[];
  formats: ProductFormatModel[];
}

export const SULSON_CATALOGUE: SulsonProductModel[] = [
  {
    id: "301",
    slug: "epice-poulet-100g",
    code: "SUL-301",
    title: "Épice de Sulson - Spéciale Poulet",
    subtitle: "Rôtis, Grillades & Cuisses Dorées",
    category: "Épices Volailles & Rôtis",
    description: "L'alliance magique du curcuma frais, paprika, gingembre, muscade, ail et poivre noir pour des volailles dorées, juteuses et tendres.",
    longDescription: "Spécialement élaboré pour magnifier toutes vos préparations de volailles, ce mélange artisanal apporte une délicieuse couleur dorée et une texture croustillante à vos rôtis de poulet, cuisses, ailes et filets sautés. Ses notes subtiles et chaudes pénètrent la chair sans jamais la dessécher.",
    origin: "Cameroun (Recette Traditionnelle)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.9,
    ratingCount: 168,
    imageRecto: "/images/products/epice-poulet-recto.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    ingredients: [
      "Curcuma de terroir frais",
      "Paprika doux noble",
      "Gingembre artisanal séché",
      "Ail & Oignon en poudre",
      "Noix de muscade râpée",
      "Poivre noir moulu",
      "Coriandre & Aromates fins",
    ],
    healthBenefits: [
      "100% Naturel sans conservateur",
      "Zéro Glutamate ajouté (Sans MSG)",
      "Curcuma riche en antioxydants",
      "Facilite la digestion",
    ],
    chefTip: "Mélangez 2 cuillères d'épices avec un filet d'huile d'olive et un jus de citron. Massez généreusement votre poulet et laissez mariner 30 minutes avant cuisson.",
    pairings: ["Poulet rôti au four", "Cuisses de poulet à la braise", "Ailes marinées", "Brochettes de dinde"],
    formats: [
      { label: "Sachet 100g", weightGrams: 100, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "Pack 4 Saveurs 400g", weightGrams: 400, multiplier: 3.6, price: 24.90, oldPrice: 27.60 },
    ],
  },
  {
    id: "302",
    slug: "epice-viande-100g",
    code: "SUL-302",
    title: "Épice de Sulson - Spéciale Viande",
    subtitle: "Pour Bœufs, Agneaux & Grillades",
    category: "Épices Viandes & Grillades",
    description: "Un mélange noble et chaleureux au paprika, poivre noir, clou de girofle, laurier et muscade pour sublimer viandes rouges et barbecues.",
    longDescription: "Conçu pour révéler toute la noblesse des viandes rouges et grillades, ce mélange chaleureux associe le puissant poivre noir de Penja à des aromates soigneusement torréfiés. Il forme une croûte parfumée et caramélisée irrésistible sur les braises tout en conservant les sucs tendres de la viande.",
    origin: "Cameroun (Recette Traditionnelle)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.9,
    ratingCount: 184,
    imageRecto: "/images/products/epice-viande-recto.jpg",
    imageVerso: "/images/products/epice-viande-verso.jpg",
    ingredients: [
      "Paprika fumé & doux",
      "Poivre noir de Penja IGP",
      "Ail & Oignon en poudre",
      "Gingembre sauvage",
      "Clous de girofle moulus",
      "Feuilles de laurier broyées",
      "Thym noble & Muscade",
    ],
    healthBenefits: [
      "100% Naturel sans additif chimique",
      "Zéro Glutamate (Sans MSG)",
      "Stimule le système immunitaire",
      "Sans sel de remplissage superflu",
    ],
    chefTip: "Frottez la viande à sec avec les épices 20 minutes avant la cuisson au barbecue pour caraméliser les sucs.",
    pairings: ["Côtes de bœuf grillées", "Brochettes Suya", "Gigot d'agneau au four", "Ragoûts mijotés"],
    formats: [
      { label: "Sachet 100g", weightGrams: 100, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "Pack 4 Saveurs 400g", weightGrams: 400, multiplier: 3.6, price: 24.90, oldPrice: 27.60 },
    ],
  },
  {
    id: "303",
    slug: "epice-poisson-100g",
    code: "SUL-303",
    title: "Épice de Sulson - Spéciale Poisson",
    subtitle: "Poissons Grillés, Braisés & Soupes",
    category: "Épices Poissons & Marinades",
    description: "L'arôme authentique et vibrant du poivre de Guinée, céleri, graines de moutarde et thym pour poissons marinés et braisés à la perfection.",
    longDescription: "Le secret des grands poissons braisés à la camerounaise ! Ce mélange emblématique utilise le précieux poivre de Guinée (maniguette), des rondelles et des aromates du terroir côtier pour apporter une fraîcheur parfumée unique sans jamais masquer la finesse iodée du poisson.",
    origin: "Cameroun (Poivre de Guinée)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.8,
    ratingCount: 152,
    imageRecto: "/images/products/epice-poisson-recto.jpg",
    imageVerso: "/images/products/epice-poisson-verso.jpg",
    ingredients: [
      "Poivre de Guinée (Maniguette)",
      "Rondelles & Pèbè camerounais",
      "Ail & Gingembre frais séché",
      "Thym citronné",
      "Céleri & Graines aromatiques",
      "Herbes locales du terroir",
    ],
    healthBenefits: [
      "100% Végétal et Pur",
      "Zéro MSG ni conservateur",
      "Améliore le confort digestif",
      "Riche en principes actifs naturels",
    ],
    chefTip: "Entaillez le poisson de 3 incisions par face, massez avec la marinade épices + huile + citron vert et saisissez à feu vif.",
    pairings: ["Bars & Dorades braisées", "Papillotes de saumon", "Gambas poêlées", "Soupes & bouillons de poisson"],
    formats: [
      { label: "Sachet 100g", weightGrams: 100, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "Pack 4 Saveurs 400g", weightGrams: 400, multiplier: 3.6, price: 24.90, oldPrice: 27.60 },
    ],
  },
  {
    id: "304",
    slug: "secret-de-sulson-100g",
    code: "SUL-304",
    title: "Le Secret de Sulson - Saveur Gourmande",
    subtitle: "Assaisonnement Signature Universel & Passe-Partout",
    category: "Assaisonnements Signatures",
    description: "La création signature de Sulson conçue à l'Africaine : équilibre subtil pour sauces mijotées, poêlées de légumes et créations gourmandes.",
    longDescription: "Véritable chef-d'œuvre de la maison Sulson, Le Secret de Sulson est l'assaisonnement universel par excellence. Composé de 12 épices nobles du terroir africain, il rehausse instantanément n'importe quel plat du quotidien : sauces tomate, féculents, légumes rôtis, pâtes et marinades de dernière minute.",
    origin: "Cameroun (Le Secret de Sulson)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 5.0,
    ratingCount: 240,
    imageRecto: "/images/products/epice-gourmande-recto.jpg",
    imageVerso: "/images/products/epice-gourmande-verso.jpg",
    ingredients: [
      "Assemblage secret de 12 épices camerounaises",
      "Curcuma doux & Paprika noble",
      "Ail blanc & Échalote séchée",
      "Gingembre & Poivres rares",
      "Aromates traditionnels sans glutamate",
    ],
    healthBenefits: [
      "100% Naturel et Sain",
      "Zéro Glutamate ajouté",
      "Remplace avantageusement les bouillons cubes industriels",
      "Favorise le bien-être cardiovasculaire",
    ],
    chefTip: "Saupoudrez 1 cuillère à café dans votre riz en cours de cuisson ou dans votre sauce mijotée pour un parfum envoûtant.",
    pairings: ["Riz parfumé & Pilaf", "Sauces tomate & mijotés", "Poêlées de légumes & Woks", "Pâtes & Féculents"],
    formats: [
      { label: "Sachet 100g", weightGrams: 100, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "Pack 4 Saveurs 400g", weightGrams: 400, multiplier: 3.6, price: 24.90, oldPrice: 27.60 },
    ],
  },
  {
    id: "305",
    slug: "pack-integral-4-saveurs",
    code: "SUL-305",
    title: "Le Pack Intégral : Les 4 Saveurs Authentiques de Sulson",
    subtitle: "Poulet • Viande • Poisson • Secret de Sulson",
    category: "Packs & Coffrets Gourmets",
    description: "L'assortiment complet réunissant nos 4 trésors artisanaux (Jaune, Rouge, Bleu, Orange). 100% Naturel, sans conservateur ni additif.",
    longDescription: "Le coffret prestige indispensable pour les passionnés de cuisine et les amateurs d'authenticité ! Réunissant les 4 mélanges phares des Épices de Sulson dans leur format généreux de 100g chacun (400g au total), il vous offre la palette aromatique complète pour sublimer absolument tous vos repas de la semaine.",
    origin: "Atelier Sulson (Pack Lot 4)",
    basePrice: 24.90,
    baseOldPrice: 27.60,
    ratingScore: 5.0,
    ratingCount: 310,
    imageRecto: "/images/products/pack-4-saveurs-sulson.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    isPack: true,
    ingredients: [
      "1x Sachet Épice Poulet 100g",
      "1x Sachet Épice Viande 100g",
      "1x Sachet Épice Poisson 100g",
      "1x Sachet Secret de Sulson 100g",
    ],
    healthBenefits: [
      "400g d'épices nobles 100% pures",
      "Économie immédiate de près de 3 €",
      "Zéro additifs, zéro conservateurs, sans MSG",
      "Livraison suivie rapide Colissimo",
    ],
    chefTip: "Le cadeau idéal ou le pack parfait pour transformer toute votre cuisine en festival de saveurs.",
    pairings: ["Toutes les viandes", "Tous les poissons", "Toutes les sauces", "Tous les légumes & féculents"],
    formats: [
      { label: "Pack Intégral 4x100g (400g)", weightGrams: 400, multiplier: 1, price: 24.90, oldPrice: 27.60 },
    ],
  },
];

export class ProductsService {
  static async getAllProducts(): Promise<SulsonProductModel[]> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const dbProducts = await prisma.product.findMany({
          include: {
            category: true,
            formats: true,
          },
          orderBy: { code: "asc" },
        });

        if (dbProducts && dbProducts.length > 0) {
          return dbProducts.map((p) => {
            const fallback = SULSON_CATALOGUE.find((c) => c.code === p.code || c.id === p.id);
            return {
              id: p.id,
              slug: p.slug || fallback?.slug || p.id,
              code: p.code,
              title: p.title,
              subtitle: p.subtitle || fallback?.subtitle || "",
              category: p.category?.name || fallback?.category || "Épices Sulson",
              description: p.description,
              longDescription: fallback?.longDescription || p.description,
              origin: p.origin,
              basePrice: Number(p.basePrice),
              baseOldPrice: p.baseOldPrice ? Number(p.baseOldPrice) : fallback?.baseOldPrice,
              ratingScore: Number(p.ratingScore),
              ratingCount: p.ratingCount,
              imageRecto: p.imageRecto,
              imageVerso: p.imageVerso || fallback?.imageVerso,
              isPack: p.code === "SUL-305",
              ingredients: fallback?.ingredients || ["100% Épices pures du Cameroun", "Sans conservateur", "Sans MSG"],
              healthBenefits: fallback?.healthBenefits || ["100% Naturel", "Sans additif", "Sans MSG"],
              chefTip: fallback?.chefTip || "Assaisonnez 20 minutes avant cuisson pour libérer tous les arômes.",
              pairings: fallback?.pairings || ["Volailles", "Viandes", "Poissons", "Légumes"],
              formats: p.formats.length > 0
                ? p.formats.map((f) => ({
                    label: f.label,
                    weightGrams: f.weightGrams,
                    multiplier: Number(f.multiplier),
                    price: Number(f.price),
                    oldPrice: f.oldPrice ? Number(f.oldPrice) : undefined,
                  }))
                : (fallback?.formats || [{ label: "100g", weightGrams: 100, multiplier: 1, price: Number(p.basePrice) }]),
            };
          });
        }
      }
    } catch (err) {
      console.warn("Prisma products fetch fallback to static catalogue:", err);
    }
    return SULSON_CATALOGUE;
  }

  static async getProductBySlug(slug: string): Promise<SulsonProductModel | null> {
    const cleanSlug = slug.toLowerCase().trim();
    
    // Check static catalogue first by slug or ID
    const foundStatic = SULSON_CATALOGUE.find(
      (p) =>
        p.slug.toLowerCase() === cleanSlug ||
        p.id === cleanSlug ||
        p.code.toLowerCase() === cleanSlug ||
        p.code.toLowerCase() === `sul-${cleanSlug}`
    );
    if (foundStatic) return foundStatic;

    // Check Prisma DB
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const dbProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { slug: cleanSlug },
              { id: cleanSlug },
              { code: cleanSlug },
              { code: `SUL-${cleanSlug}` },
            ],
          },
          include: {
            category: true,
            formats: true,
          },
        });

        if (dbProduct) {
          const fallback = SULSON_CATALOGUE.find((c) => c.code === dbProduct.code || c.id === dbProduct.id);
          return {
            id: dbProduct.id,
            slug: dbProduct.slug || fallback?.slug || dbProduct.id,
            code: dbProduct.code,
            title: dbProduct.title,
            subtitle: dbProduct.subtitle || fallback?.subtitle || "",
            category: dbProduct.category?.name || fallback?.category || "Épices Sulson",
            description: dbProduct.description,
            longDescription: fallback?.longDescription || dbProduct.description,
            origin: dbProduct.origin,
            basePrice: Number(dbProduct.basePrice),
            baseOldPrice: dbProduct.baseOldPrice ? Number(dbProduct.baseOldPrice) : fallback?.baseOldPrice,
            ratingScore: Number(dbProduct.ratingScore),
            ratingCount: dbProduct.ratingCount,
            imageRecto: dbProduct.imageRecto,
            imageVerso: dbProduct.imageVerso || fallback?.imageVerso,
            isPack: dbProduct.code === "SUL-305",
            ingredients: fallback?.ingredients || ["100% Épices pures du Cameroun", "Sans conservateur", "Sans MSG"],
            healthBenefits: fallback?.healthBenefits || ["100% Naturel", "Sans additif", "Sans MSG"],
            chefTip: fallback?.chefTip || "Assaisonnez 20 minutes avant cuisson pour libérer tous les arômes.",
            pairings: fallback?.pairings || ["Volailles", "Viandes", "Poissons", "Légumes"],
            formats: dbProduct.formats.length > 0
              ? dbProduct.formats.map((f) => ({
                  label: f.label,
                  weightGrams: f.weightGrams,
                  multiplier: Number(f.multiplier),
                  price: Number(f.price),
                  oldPrice: f.oldPrice ? Number(f.oldPrice) : undefined,
                }))
              : (fallback?.formats || [{ label: "100g", weightGrams: 100, multiplier: 1, price: Number(dbProduct.basePrice) }]),
          };
        }
      }
    } catch (err) {
      console.warn("Prisma getProductBySlug fallback:", err);
    }

    return null;
  }

  static async getProductById(id: string): Promise<SulsonProductModel | null> {
    return this.getProductBySlug(id);
  }

  static async calculatePrice(productId: string, formatLabel: string): Promise<{ unitPrice: number; oldPrice?: number } | null> {
    const product = await this.getProductById(productId);
    if (!product) return null;
    const format = product.formats.find((f) => f.label.toLowerCase() === formatLabel.toLowerCase());
    if (!format) return { unitPrice: product.basePrice, oldPrice: product.baseOldPrice };
    return { unitPrice: format.price, oldPrice: format.oldPrice };
  }
}
