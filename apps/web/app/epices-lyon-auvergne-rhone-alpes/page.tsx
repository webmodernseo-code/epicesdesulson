import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { SULSON_CATALOGUE } from "@/lib/products-service";

export const metadata: Metadata = {
  title: "Épices Lyon & Auvergne-Rhône-Alpes - Épicerie Fine & Saveurs d'Exception | Les Épices de Sulson",
  description:
    "Boutique d'épices d'exception à Lyon et en Auvergne-Rhône-Alpes. Découvrez nos mélanges artisanaux 100g et coffrets 4x100g pour sublimer bouchons lyonnais, viandes, volailles et poissons.",
  keywords: [
    "épices lyon",
    "boutique épices lyon",
    "épices auvergne rhône alpes",
    "épicerie fine lyon",
    "épices lyon presqu'île",
    "épices croix rousse lyon",
    "épices grenoble clermont annecy",
    "mélange épices barbecue lyon",
    "épices de sulson lyon",
  ],
  openGraph: {
    title: "Épices Lyon & Auvergne-Rhône-Alpes | Les Épices de Sulson",
    description:
      "Assaisonnements gastronomiques et mélanges d'épices d'exception à Lyon et en Auvergne-Rhône-Alpes. Sachets 100g et Pack Intégral.",
    type: "website",
    url: "https://epicesdesulson.com/epices-lyon-auvergne-rhone-alpes",
    images: ["https://epicesdesulson.com/images/products/pack-4-saveurs-sulson.jpg"],
  },
  alternates: {
    canonical: "https://epicesdesulson.com/epices-lyon-auvergne-rhone-alpes",
  },
};

export default function EpicesLyonPage() {
  return (
    <>
      <LocalBusinessJsonLd
        city="Lyon"
        region="Auvergne-Rhône-Alpes"
        title="Boutique d'Épices Artisanales & Gastronomie à Lyon"
        description="Les Épices de Sulson apportent la haute gastronomie des épices aux chefs et passionnés de cuisine de Lyon et de toute la région Auvergne-Rhône-Alpes."
      />

      <main className="min-h-screen bg-[#faf8f5]">
        {/* Hero Section Lyon */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#1c3829] to-[#0f241a] text-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <span className="inline-block bg-amber-400 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
              📍 Pôle Lyon & Auvergne-Rhône-Alpes
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Épices Fines au Cœur de la Capitale de la Gastronomie
            </h1>
            <p className="mt-4 text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              La maison <strong>Les Épices de Sulson</strong> célèbre l'art culinaire à <strong>Lyon</strong> et dans toute la région <strong>Auvergne-Rhône-Alpes</strong> (Rhône, Isère, Puy-de-Dôme, Haute-Savoie, Loire...). Nos sachets fraîcheur <strong>100g</strong> subliment viandes mijotées, volailles rôties, poissons et barbecues.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/#products"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Découvrir la Gamme 100g ➔
              </Link>
              <Link
                href="/product-details/305"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition"
              >
                Commander le Pack 4x100g
              </Link>
            </div>
          </div>
        </section>

        {/* Section Pourquoi la Région Lyonnaise Craque pour Sulson */}
        <section className="py-16 container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Des Épices Nobles pour les Amoureux du Goût
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base max-w-2xl mx-auto">
              Dans la patrie des grands chefs et des bouchons gourmets, Les Épices de Sulson offrent l'équilibre parfait entre tradition africaine et raffinement culinaire.
            </p>
          </div>

          {/* Grille des 4 Produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SULSON_CATALOGUE.filter((p) => !p.isPack).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition"
              >
                <div className="relative w-36 h-36 mb-3">
                  <Image
                    src={product.imageRecto}
                    alt={`${product.title} Lyon`}
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

        {/* Section FAQ SEO Locale Lyon */}
        <section className="py-12 bg-white border-t border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Questions Fréquentes — Épices Lyon & Auvergne-Rhône-Alpes
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">
                  Livrez-vous à Lyon, Grenoble, Saint-Étienne, Annecy et Clermont-Ferrand ?
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Oui ! Nous expédions partout dans les 12 départements de la région Auvergne-Rhône-Alpes ainsi que dans toute la métropole de Lyon. Vos sachets d'épices 100g sont livrés à domicile ou en point relais sous 48h.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base">
                  Quelle épice choisir pour les viandes et barbecues régionaux ?
                </h3>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  L'<strong>Épice Spéciale Viande (Sachet Rouge 100g)</strong> avec son mélange noble de poivre noir, clou de girofle et laurier est idéale pour relever côtes de bœuf, pièces d'agneau et grillades d'été.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
