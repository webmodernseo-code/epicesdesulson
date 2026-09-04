"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SulsonProductModel } from "@/lib/products-service";
import { useCart } from "@/context/cart-context";
import StarRating from "@/components/common/star-rating";
import { toast } from "@/lib/toast";

export default function ProductDetailClient({ product }: { product: SulsonProductModel }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.imageRecto);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const images = [product.imageRecto, product.imageVerso].filter(Boolean) as string[];

  const handleAddToCart = () => {
    addItem({
      id: Number(product.id),
      title: product.title,
      price: product.basePrice,
      image: product.imageRecto,
      quantity: quantity,
      format: product.isPack ? "Pack 4x100g" : "100g",
    });
    setIsAdded(true);
    toast.success(`${product.title} (${quantity}x) ajouté au panier !`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Fil d'Ariane SEO */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-emerald-700 transition">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/#products" className="hover:text-emerald-700 transition">
                Nos Épices
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-gray-800 line-clamp-1">{product.title}</li>
          </ol>
        </nav>

        {/* Fiche Produit Principale */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Galerie d'images */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                priority
              />
              <span className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                {product.isPack ? "Pack 4x100g" : "Sachet 100g"}
              </span>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === img
                        ? "border-emerald-700 shadow-md ring-2 ring-emerald-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} vue ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations et Achat */}
          <div className="flex flex-col">
            <div className="inline-block bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 self-start">
              {product.category}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>

            <p className="text-sm md:text-base text-gray-500 mt-1 italic font-medium">
              {product.subtitle}
            </p>

            {/* Avis et Étoiles */}
            <div className="flex items-center gap-2 mt-4">
              <StarRating rating={product.ratingScore} />
              <span className="text-sm font-bold text-gray-800">{product.ratingScore} / 5</span>
              <span className="text-xs text-gray-400">({product.ratingCount} avis vérifiés)</span>
            </div>

            {/* Prix */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-emerald-800">
                {product.basePrice.toFixed(2)} €
              </span>
              {product.baseOldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.baseOldPrice.toFixed(2)} €
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                En stock • Expédié sous 24h
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-gray-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Caractéristiques Clés */}
            <div className="mt-6 border-t border-b border-gray-100 py-4 grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Origine :{" "}
                <strong className="text-gray-900">{product.origin}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Format :{" "}
                <strong className="text-gray-900">{product.isPack ? "4 x 100g (400g)" : "100g net"}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> 100% Naturel, sans conservateur
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span> Sachet hermétique zip fraîcheur
              </div>
            </div>

            {/* Sélecteur de Quantité & Bouton Panier */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-200 font-bold text-lg"
                >
                  -
                </button>
                <span className="px-4 py-3 font-bold text-gray-900 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-200 font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-emerald-700/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base"
              >
                <span>🛒</span>
                <span>{isAdded ? "Ajouté au panier !" : `Ajouter au Panier • ${(product.basePrice * quantity).toFixed(2)} €`}</span>
              </button>
            </div>

            {/* Garanties */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
              <div>
                <p className="font-bold text-gray-900">🇫🇷 Livraison France</p>
                <p>Paris, Lyon & Régions</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">🔒 Paiement Sécurisé</p>
                <p>CB, Stripe, Apple Pay</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">⭐ Qualité Gourmet</p>
                <p>Satisfaction garantie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maillage Régional SEO & Suggestions */}
        <section className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Découvrez nos créations culinaires et livraisons régionales
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            Les Épices de Sulson sont conçues pour les passionnés de gastronomie et les professionnels exigeants. Commandez en ligne vos sachets de 100g avec expédition rapide partout en France.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/epices-paris"
              className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition"
            >
              📍 Épices Paris & Île-de-France ➔
            </Link>
            <Link
              href="/epices-lyon-auvergne-rhone-alpes"
              className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition"
            >
              📍 Épices Lyon & Auvergne-Rhône-Alpes ➔
            </Link>
            <Link
              href="/#products"
              className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
            >
              🌿 Tout le Catalogue 100g ➔
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
