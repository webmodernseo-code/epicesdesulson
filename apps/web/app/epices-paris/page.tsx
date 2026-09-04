import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { SULSON_CATALOGUE } from "@/lib/products-service";

export const metadata: Metadata = {
  title: "Épice Paris & Île-de-France - Boutique d'Épices Fines & Rares | Les Épices de Sulson",
  description:
    "Boutique en ligne officielle Les Épices de Sulson à Paris et Île-de-France. Découvrez nos mélanges artisanaux 100g (Poulet, Viande, Poisson, Gourmande) et Pack 4x100g livrés rapidement à Paris.",
  keywords: [
    "épice paris",
    "boutique épices paris",
    "épices paris 11",
    "épices paris 17",
    "épicerie fine paris",
    "meilleures épices paris",
    "livraison épices paris",
    "épices de sulson paris",
    "épices africaines gastronomiques paris",
    "mélange épices chef paris",
  ],
  openGraph: {
    title: "Épice Paris & Île-de-France | Les Épices de Sulson",
    description:
      "Achetez vos épices artisanales d'exception à Paris. Mélanges gastronomiques 100g pour volailles, viandes, poissons et créations gourmandes.",
    type: "website",
    url: "https://epicesdesulson.com/epices-paris",
    images: ["https://epicesdesulson.com/images/products/pack-4-saveurs-sulson.jpg"],
  },
  alternates: {
    canonical: "https://epicesdesulson.com/epices-paris",
  },
};

export default function EpicesParisPage() {
  return (
    <>
      <LocalBusinessJsonLd
        city="Paris"
        region="Île-de-France"
        title="Boutique d'Épices Fines & Gastronomiques à Paris"
        description="Les Épices de Sulson fournissent les gourmets et chefs de Paris et d'Île-de-France en mélanges artisanaux 100% naturels."
      />

      <main className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section Paris */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#1c3829] to-[#0f241a] text-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <span className="inline-block bg-amber-400 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              📍 Pôle Paris & Île-de-France
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Épices Fines & Assaisonnements d'Exception à Paris
            </h1>
            <p className="mt-4 text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez la maison <strong>Les Épices de Sulson</strong> : des créations artisanales uniques en sachets fraîcheur <strong>100g</strong>, livrées en express à Paris (75) et dans toute l’Île-de-France (77, 78, 91, 92, 93, 94, 95).
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#products"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Commander nos Sachets 100g ➔
              </Link>
              <Link
                href="/product-details/305"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition"
              >
                Découvrir le Pack Intégral 4x100g
              </Link>
            </div>
          </div>
        </section>

        {/* Section Pourquoi les Parisiens choisissent Sulson */}
        <section className="py-16 container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              L'Épicerie Fine d'Épices Préférée des Gourmets Parisiens
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Que vous cuisiniez dans votre appartement parisien ou organisiez un grand dîner entre amis, nos mélanges transforment chaque plat en œuvre culinaire.
            </p>
          </div>

          {/* Grille des 4 Produits Phares */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SULSON_CATALOGUE.filter((p) => !p.isPack).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition"
              >
                <div className="relative w-36 h-36 mb-3">
                  <Image
                    src={product.imageRecto}
                    alt={`${product.title} Paris`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                  Format 100g
                </span>
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">{product.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.subtitle}</p>
                <div className="mt-auto pt-4 flex items-center justify-between w-full">
                  <span className="text-lg font-extrabold text-emerald-800">{product.basePrice.toFixed(2)} €</span>
                  <Link
                    href={`/product-details/${product.id}`}
                    className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-full transition"
                  >
                    Voir ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section FAQ SEO Locale Paris */}
        <section className="py-12 bg-white border-t border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Questions Fréquentes — Épices Paris & Île-de-France
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">
                  Comment commander des épices à Paris avec Les Épices de Sulson ?
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Vous pouvez commander directement sur notre boutique officielle. Toutes les commandes à destination de Paris intramuros (du 1er au 20e arrondissement) et de la petite/grande couronne sont préparées et expédiées sous 24h ouvrées.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">
                  Quels sont les mélanges d'épices les plus populaires à Paris ?
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Le <strong>Pack Intégral 4x100g</strong> est le plus prisé des gastronomes parisiens pour tester nos recettes Poulet rôti doré, Viandes grillées au poivre de Kampot, Poissons au poivre de Guinée et le Secret de Sulson Saveur Gourmande.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
