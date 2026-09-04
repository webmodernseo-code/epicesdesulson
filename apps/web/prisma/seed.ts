import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du Seed Neon PostgreSQL pour Les Épices de Sulson...");

  // 1. Nettoyage initial (ordre respectant les clés étrangères)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productFormat.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  // 2. Création des Catégories
  const catPoulet = await prisma.category.create({
    data: {
      slug: "volailles-rotis",
      name: "Épices Volailles & Rôtis",
      description: "Mélanges d'épices d'exception pour poulets rôtis, braisés, marinades et volailles de fête.",
      image: "/images/category/volailles.png",
    },
  });

  const catViande = await prisma.category.create({
    data: {
      slug: "viandes-grillades",
      name: "Épices Viandes & Grillades",
      description: "Sublimez vos viandes rouges, gibiers, ragoûts, grillades et barbecues au feu de bois.",
      image: "/images/category/viandes.png",
    },
  });

  const catPoisson = await prisma.category.create({
    data: {
      slug: "poissons-marinades",
      name: "Épices Poissons & Marinades",
      description: "Une fraîcheur aromatique inégalée pour poissons entiers, papillotes, gambas et crustacés.",
      image: "/images/category/poissons.png",
    },
  });

  const catSignature = await prisma.category.create({
    data: {
      slug: "assaisonnements-signatures",
      name: "Assaisonnements Signatures",
      description: "La touche gastronomique secrète Sulson pour assaisonner tous vos plats du quotidien.",
      image: "/images/category/signature.png",
    },
  });

  const catPacks = await prisma.category.create({
    data: {
      slug: "packs-coffrets",
      name: "Packs & Coffrets Gourmets",
      description: "L'assortiment complet des 4 créations Sulson dans un coffret prestige à tarif préférentiel.",
      image: "/images/category/packs.png",
    },
  });

  console.log("✅ 5 Catégories créées.");

  // 3. Création des Produits & Formats
  // Produit 1 : Poulet
  const prodPoulet = await prisma.product.create({
    data: {
      code: "SUL-301",
      slug: "epice-sulson-speciale-poulet",
      title: "Épice de Sulson - Spéciale Poulet",
      subtitle: "L'art de sublimer vos volailles",
      description: "Un mélange secret d'épices nobles, herbes aromatiques et écorces rares, spécialement dosé pour révéler la tendreté et les sucs naturels des volailles, poulets braisés, rôtis et marinades traditionnelles.",
      origin: "Cameroun (Recette Traditionnelle)",
      basePrice: 6.90,
      baseOldPrice: 8.50,
      ratingScore: 4.95,
      ratingCount: 248,
      imageRecto: "/images/products/sachet-poulet-recto.png",
      imageVerso: "/images/products/sachet-poulet-verso.png",
      isFeatured: true,
      categoryId: catPoulet.id,
      formats: {
        create: [
          { label: "100g", weightGrams: 100, multiplier: 1.0, price: 6.90, oldPrice: 8.50 },
        ],
      },
    },
  });

  // Produit 2 : Viande
  const prodViande = await prisma.product.create({
    data: {
      code: "SUL-302",
      slug: "epice-sulson-speciale-viande",
      title: "Épice de Sulson - Spéciale Viande",
      subtitle: "Puissance et caractère pour vos viandes rouges",
      description: "Une sélection rigoureuse d'épices torréfiées et poivres de terroir conférant une note fumée, profonde et chaleureuse à vos viandes rouges, gibiers, grillades au barbecue et ragoûts mijotés.",
      origin: "Cameroun (Recette Traditionnelle)",
      basePrice: 6.90,
      baseOldPrice: 8.50,
      ratingScore: 4.92,
      ratingCount: 196,
      imageRecto: "/images/products/sachet-viande-recto.png",
      imageVerso: "/images/products/sachet-viande-verso.png",
      isFeatured: true,
      categoryId: catViande.id,
      formats: {
        create: [
          { label: "100g", weightGrams: 100, multiplier: 1.0, price: 6.90, oldPrice: 8.50 },
        ],
      },
    },
  });

  // Produit 3 : Poisson
  const prodPoisson = await prisma.product.create({
    data: {
      code: "SUL-303",
      slug: "epice-sulson-speciale-poisson",
      title: "Épice de Sulson - Spéciale Poisson",
      subtitle: "L'élégance iodée et zestée",
      description: "Une alchimie fine d'épices douces, d'herbes côtières et de notes d'agrumes, conçue pour magnifier la délicatesse des poissons blancs, saumons, papillotes, crustacés et sauces marinières.",
      origin: "Cameroun (Recette Traditionnelle)",
      basePrice: 6.90,
      baseOldPrice: 8.50,
      ratingScore: 4.96,
      ratingCount: 178,
      imageRecto: "/images/products/sachet-poisson-recto.png",
      imageVerso: "/images/products/sachet-poisson-verso.png",
      isFeatured: true,
      categoryId: catPoisson.id,
      formats: {
        create: [
          { label: "100g", weightGrams: 100, multiplier: 1.0, price: 6.90, oldPrice: 8.50 },
        ],
      },
    },
  });

  // Produit 4 : Saveur Gourmande
  const prodGourmande = await prisma.product.create({
    data: {
      code: "SUL-304",
      slug: "epice-sulson-saveur-gourmande",
      title: "Épice de Sulson - Saveur Gourmande",
      subtitle: "La signature aromatique universelle",
      description: "La création signature polyvalente de la Maison Sulson. Un équilibre parfait pour rehausser légumes sautés, féculents, soupes, sauces onctueuses et créations culinaires du quotidien.",
      origin: "Cameroun (Recette Traditionnelle)",
      basePrice: 6.90,
      baseOldPrice: 8.50,
      ratingScore: 4.98,
      ratingCount: 312,
      imageRecto: "/images/products/sachet-gourmande-recto.png",
      imageVerso: "/images/products/sachet-gourmande-verso.png",
      isFeatured: true,
      categoryId: catSignature.id,
      formats: {
        create: [
          { label: "100g", weightGrams: 100, multiplier: 1.0, price: 6.90, oldPrice: 8.50 },
        ],
      },
    },
  });

  // Produit 5 : Le Pack Intégral 4 Saveurs
  const prodPack = await prisma.product.create({
    data: {
      code: "SUL-305",
      slug: "le-pack-integral-4-saveurs-sulson",
      title: "Le Pack Intégral : 4 Saveurs Authentiques",
      subtitle: "Le coffret prestige regroupant toute la collection Sulson",
      description: "Le coffret indispensable pour tout amateur de haute gastronomie épicée. Réunit les 4 créations emblématiques Sulson (Poulet, Viande, Poisson & Gourmande) pour une palette gustative complète.",
      origin: "Cameroun (Recette Traditionnelle)",
      basePrice: 24.90,
      baseOldPrice: 27.60,
      ratingScore: 5.00,
      ratingCount: 420,
      imageRecto: "/images/products/pack-4-saveurs.png",
      imageVerso: "/images/products/pack-4-saveurs.png",
      isFeatured: true,
      categoryId: catPacks.id,
      formats: {
        create: [
          { label: "Pack 4x100g", weightGrams: 400, multiplier: 1.0, price: 24.90, oldPrice: 27.60 },
        ],
      },
    },
  });

  console.log("✅ 5 Produits Sulson (100g) créés.");

  // 4. Utilisateur Admin & Avis de dégustation
  const adminUser = await prisma.user.create({
    data: {
      name: "Chef Sulson",
      email: "contact@epicesdesulson.com",
      role: "MASTER_ADMIN",
    },
  });

  await prisma.review.createMany({
    data: [
      {
        productId: prodPoulet.id,
        authorName: "Jean-Pierre M.",
        rating: 5,
        comment: "Un poulet rôti au four avec cette épice et vos convives vous demandent la recette secrète. Exceptionnel !",
        verified: true,
      },
      {
        productId: prodViande.id,
        authorName: "Marc D.",
        rating: 5,
        comment: "La note torréfiée sur une côte de bœuf au barbecue est juste incroyable. Bravo Sulson !",
        verified: true,
      },
      {
        productId: prodGourmande.id,
        authorName: "Aïssatou B.",
        rating: 5,
        comment: "Je l'utilise absolument partout, même dans mes sauces et légumes sautés. Le goût est magique.",
        verified: true,
      },
    ],
  });

  console.log("✅ Données de démonstration et avis insérés.");
  console.log("🎉 Seed Neon PostgreSQL terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
