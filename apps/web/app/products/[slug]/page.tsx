import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsService } from "@/lib/products-service";
import ProductDetailView from "@/components/products/product-detail-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await ProductsService.getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await ProductsService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé | Les Épices de Sulson",
      description: "Le produit demandé n'est pas disponible.",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";
  const canonicalUrl = `${appUrl}/products/${product.slug}`;

  return {
    title: `${product.title} - 100% Naturel | Les Épices de Sulson`,
    description: `${product.subtitle} - ${product.description}. Ingrédients nobles du Cameroun, sans glutamate (zéro MSG). Commandez en ligne avec livraison 24/48h.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | Les Épices de Sulson`,
      description: product.description,
      url: canonicalUrl,
      images: [
        {
          url: product.imageRecto,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await ProductsService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await ProductsService.getAllProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
