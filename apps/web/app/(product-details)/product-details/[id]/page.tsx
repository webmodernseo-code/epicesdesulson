import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductsService, SULSON_CATALOGUE } from "@/lib/products-service";
import { ProductDetailJsonLd } from "@/components/seo/json-ld";
import ProductDetailClient from "./product-detail-client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SULSON_CATALOGUE.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await ProductsService.getProductById(id);

  if (!product) {
    return {
      title: "Produit non trouvé | Les Épices de Sulson",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";
  const title = `${product.title} (100g) - Épice Artisanale | Les Épices de Sulson`;
  const description = `${product.subtitle}. ${product.description} Disponible en sachet fraîcheur 100g. Livraison rapide à Paris, Lyon et partout en France.`;

  return {
    title,
    description,
    keywords: [
      product.title,
      product.category,
      "épices de sulson",
      "epices de sulson",
      "epice sulson",
      "épice paris",
      "épices lyon",
      "épices artisanales cameroun",
      "mélange épices gastronomiques",
    ],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/product-details/${product.id}`,
      images: [
        {
          url: `${baseUrl}${product.imageRecto}`,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${product.imageRecto}`],
    },
    alternates: {
      canonical: `${baseUrl}/product-details/${product.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await ProductsService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetailJsonLd product={product} />
      <ProductDetailClient product={product} />
    </>
  );
}
