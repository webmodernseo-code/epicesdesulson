import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProductsService } from "@/lib/products-service";
import StarRating from "@/components/common/star-rating";
import { Sparkles, ChevronRight, CheckCircle2, ShoppingBag, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Boutique d'Épices Fines & Packs | Les Épices de Sulson",
  description:
    "Découvrez l'ensemble de notre collection d'épices d'exception 100% naturelles du terroir camerounais : Poulet, Viande, Poisson, Secret de Sulson et le Pack Intégral.",
  alternates: {
    canonical: "https://epicesdesulson.com/products",
  },
};

export default async function ProductsCataloguePage() {
  const products = await ProductsService.getAllProducts();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* ── Hero Header ── */}
      <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white py-10 sm:py-18">
        <div className="container text-center max-w-3xl px-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Collection Gastronomique
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 text-white">
            Nos Épices Nobles du Cameroun
          </h1>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Mélanges artisanaux 100% naturels, sans conservateurs, sans glutamate (MSG) et sans sel de remplissage pour sublimer votre cuisine au quotidien.
          </p>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div className="container pt-8 sm:pt-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {products.map((product) => {
            const isPack = product.isPack;

            return (
              <div
                key={product.id}
                className={`group bg-white rounded-3xl border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative ${
                  isPack ? "sm:col-span-2 lg:col-span-1 ring-2 ring-emerald-600/30" : ""
                }`}
              >
                {/* Image Stage Container */}
                <div className="relative w-full aspect-square bg-gray-50/80 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                  {isPack && (
                    <span className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-emerald-700 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                      ⭐ Pack Recommandé (-3 €)
                    </span>
                  )}

                  {/* Floating Eye Action Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`Voir la fiche détaillée de ${product.title}`}
                    title="Voir la fiche produit & recettes"
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 size-8 sm:size-9 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-emerald-700 border border-gray-200/90 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Eye className="size-4 sm:size-4.5" />
                  </Link>

                  <Link
                    href={`/products/${product.slug}`}
                    className="absolute inset-0 z-1 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src={product.imageRecto}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 gap-1.5 mb-2">
                      <span className="font-bold text-emerald-800 uppercase tracking-wider whitespace-nowrap">
                        {product.category}
                      </span>
                      <span className="font-semibold text-gray-400 whitespace-nowrap">
                        {product.origin}
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1.5 line-clamp-1">
                        {product.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <StarRating rating={product.ratingScore} />
                      <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                        {product.ratingScore.toFixed(1)}/5
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        ({product.ratingCount} avis)
                      </span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-950 whitespace-nowrap">
                          {product.basePrice.toFixed(2)} €
                        </span>
                        {product.baseOldPrice && (
                          <span className="text-xs text-gray-400 line-through whitespace-nowrap">
                            {product.baseOldPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-500 whitespace-nowrap">
                        {product.formats[0]?.label || "100g"}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Commander</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
