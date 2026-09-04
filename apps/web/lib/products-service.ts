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
  code: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  origin: string;
  basePrice: number;
  baseOldPrice?: number;
  ratingScore: number;
  ratingCount: number;
  imageRecto: string;
  imageVerso?: string;
  isPack?: boolean;
  formats: ProductFormatModel[];
}

export const SULSON_CATALOGUE: SulsonProductModel[] = [
  {
    id: "301",
    code: "SUL-301",
    title: "Épice de Sulson - Spéciale Poulet",
    subtitle: "Rôtis, Grillades & Cuisses Dorées",
    category: "Épices Volailles & Rôtis",
    description: "L'alliance magique du curcuma frais, paprika, gingembre, muscade, ail et poivre noir pour des volailles dorées, juteuses et tendres.",
    origin: "Cameroun (Recette Traditionnelle)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.9,
    ratingCount: 196,
    imageRecto: "/images/products/epice-poulet-recto.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    formats: [
      { label: "50g", weightGrams: 50, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "100g", weightGrams: 100, multiplier: 1.85, price: 12.77, oldPrice: 15.70 },
      { label: "250g", weightGrams: 250, multiplier: 4.2, price: 28.98, oldPrice: 35.70 },
      { label: "500g", weightGrams: 500, multiplier: 7.8, price: 53.82, oldPrice: 66.30 },
      { label: "1 Kg", weightGrams: 1000, multiplier: 14.5, price: 100.05, oldPrice: 123.25 },
    ],
  },
  {
    id: "302",
    code: "SUL-302",
    title: "Épice de Sulson - Spéciale Viande",
    subtitle: "Pour Bœufs, Agneaux & Grillades",
    category: "Épices Viandes & Grillades",
    description: "Un mélange noble et chaleureux au paprika, poivre noir, clou de girofle, laurier et muscade pour sublimer viandes rouges et barbecues.",
    origin: "Cameroun (Recette Traditionnelle)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.9,
    ratingCount: 228,
    imageRecto: "/images/products/epice-viande-recto.jpg",
    imageVerso: "/images/products/epice-viande-verso.jpg",
    formats: [
      { label: "50g", weightGrams: 50, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "100g", weightGrams: 100, multiplier: 1.85, price: 12.77, oldPrice: 15.70 },
      { label: "250g", weightGrams: 250, multiplier: 4.2, price: 28.98, oldPrice: 35.70 },
      { label: "500g", weightGrams: 500, multiplier: 7.8, price: 53.82, oldPrice: 66.30 },
      { label: "1 Kg", weightGrams: 1000, multiplier: 14.5, price: 100.05, oldPrice: 123.25 },
    ],
  },
  {
    id: "303",
    code: "SUL-303",
    title: "Épice de Sulson - Spéciale Poisson",
    subtitle: "Poissons Grillés, Braisés & Soupes",
    category: "Épices Poissons & Marinades",
    description: "L'arôme authentique et vibrant du poivre de Guinée, céleri, graines de moutarde et thym pour poissons marinés et braisés à la perfection.",
    origin: "Cameroun (Poivre de Guinée)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.8,
    ratingCount: 184,
    imageRecto: "/images/products/epice-poisson-recto.jpg",
    imageVerso: "/images/products/epice-poisson-verso.jpg",
    formats: [
      { label: "50g", weightGrams: 50, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "100g", weightGrams: 100, multiplier: 1.85, price: 12.77, oldPrice: 15.70 },
      { label: "250g", weightGrams: 250, multiplier: 4.2, price: 28.98, oldPrice: 35.70 },
      { label: "500g", weightGrams: 500, multiplier: 7.8, price: 53.82, oldPrice: 66.30 },
      { label: "1 Kg", weightGrams: 1000, multiplier: 14.5, price: 100.05, oldPrice: 123.25 },
    ],
  },
  {
    id: "304",
    code: "SUL-304",
    title: "Épice de Sulson - Saveur Gourmande",
    subtitle: "Le Secret de Sulson • Assaisonnement Universel",
    category: "Assaisonnements Signatures",
    description: "La création signature de Sulson conçue à l'Africaine : équilibre subtil pour sauces mijotées, poêlées de légumes et créations gourmandes.",
    origin: "Cameroun (Le Secret de Sulson)",
    basePrice: 6.90,
    baseOldPrice: 8.50,
    ratingScore: 4.9,
    ratingCount: 215,
    imageRecto: "/images/products/epice-gourmande-recto.jpg",
    imageVerso: "/images/products/epice-gourmande-verso.jpg",
    formats: [
      { label: "50g", weightGrams: 50, multiplier: 1, price: 6.90, oldPrice: 8.50 },
      { label: "100g", weightGrams: 100, multiplier: 1.85, price: 12.77, oldPrice: 15.70 },
      { label: "250g", weightGrams: 250, multiplier: 4.2, price: 28.98, oldPrice: 35.70 },
      { label: "500g", weightGrams: 500, multiplier: 7.8, price: 53.82, oldPrice: 66.30 },
      { label: "1 Kg", weightGrams: 1000, multiplier: 14.5, price: 100.05, oldPrice: 123.25 },
    ],
  },
  {
    id: "305",
    code: "SUL-305",
    title: "Le Pack Intégral : Les 4 Saveurs Authentiques de Sulson",
    subtitle: "Poulet • Viande • Poisson • Gourmande",
    category: "Packs & Coffrets Gourmets",
    description: "L'assortiment complet réunissant nos 4 trésors artisanaux (Jaune, Rouge, Bleu, Orange). 100% Naturel, sans conservateur ni additif.",
    origin: "Atelier Sulson (Pack Lot 4)",
    basePrice: 24.90,
    baseOldPrice: 27.60,
    ratingScore: 5.0,
    ratingCount: 312,
    imageRecto: "/images/products/pack-4-saveurs-sulson.jpg",
    isPack: true,
    formats: [
      { label: "Pack 4x50g", weightGrams: 200, multiplier: 1, price: 24.90, oldPrice: 27.60 },
      { label: "Pack 4x100g", weightGrams: 400, multiplier: 1.8, price: 44.90, oldPrice: 52.00 },
      { label: "Pack 4x250g", weightGrams: 1000, multiplier: 3.97, price: 99.00, oldPrice: 115.00 },
      { label: "Pack 4x500g", weightGrams: 2000, multiplier: 7.18, price: 179.00, oldPrice: 210.00 },
      { label: "Pack 4x1 Kg", weightGrams: 4000, multiplier: 12.85, price: 320.00, oldPrice: 380.00 },
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
          return dbProducts.map((p) => ({
            id: p.id,
            code: p.code,
            title: p.title,
            subtitle: p.subtitle || "",
            category: p.category?.name || "Épices Sulson",
            description: p.description,
            origin: p.origin,
            basePrice: Number(p.basePrice),
            baseOldPrice: p.baseOldPrice ? Number(p.baseOldPrice) : undefined,
            ratingScore: Number(p.ratingScore),
            ratingCount: p.ratingCount,
            imageRecto: p.imageRecto,
            imageVerso: p.imageVerso || undefined,
            isPack: p.code === "SUL-305",
            formats: p.formats.map((f) => ({
              label: f.label,
              weightGrams: f.weightGrams,
              multiplier: Number(f.multiplier),
              price: Number(f.price),
              oldPrice: f.oldPrice ? Number(f.oldPrice) : undefined,
            })),
          }));
        }
      }
    } catch (err) {
      console.warn("Prisma products fetch failed, falling back to static catalogue:", err);
    }
    return SULSON_CATALOGUE;
  }

  static async getProductById(id: string): Promise<SulsonProductModel | null> {
    try {
      if (process.env.DATABASE_URL) {
        const { prisma } = await import("./prisma");
        const dbProduct = await prisma.product.findFirst({
          where: {
            OR: [
              { id },
              { code: id },
              { slug: id },
              { code: `SUL-${id}` },
            ],
          },
          include: {
            category: true,
            formats: true,
          },
        });

        if (dbProduct) {
          return {
            id: dbProduct.id,
            code: dbProduct.code,
            title: dbProduct.title,
            subtitle: dbProduct.subtitle || "",
            category: dbProduct.category?.name || "Épices Sulson",
            description: dbProduct.description,
            origin: dbProduct.origin,
            basePrice: Number(dbProduct.basePrice),
            baseOldPrice: dbProduct.baseOldPrice ? Number(dbProduct.baseOldPrice) : undefined,
            ratingScore: Number(dbProduct.ratingScore),
            ratingCount: dbProduct.ratingCount,
            imageRecto: dbProduct.imageRecto,
            imageVerso: dbProduct.imageVerso || undefined,
            isPack: dbProduct.code === "SUL-305",
            formats: dbProduct.formats.map((f) => ({
              label: f.label,
              weightGrams: f.weightGrams,
              multiplier: Number(f.multiplier),
              price: Number(f.price),
              oldPrice: f.oldPrice ? Number(f.oldPrice) : undefined,
            })),
          };
        }
      }
    } catch (err) {
      console.warn("Prisma product by ID fetch failed, falling back:", err);
    }
    return SULSON_CATALOGUE.find((p) => p.id === id || p.code === id || p.code === `SUL-${id}`) || null;
  }

  static async calculatePrice(productId: string, formatLabel: string): Promise<{ unitPrice: number; oldPrice?: number } | null> {
    const product = await this.getProductById(productId);
    if (!product) return null;
    const format = product.formats.find((f) => f.label.toLowerCase() === formatLabel.toLowerCase());
    if (!format) return { unitPrice: product.basePrice, oldPrice: product.baseOldPrice };
    return { unitPrice: format.price, oldPrice: format.oldPrice };
  }
}
