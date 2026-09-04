import React from "react";
import { SulsonProductModel } from "@/lib/products-service";

export function OrganizationAndWebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Les Épices de Sulson",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/logo.png`,
          caption: "Les Épices de Sulson",
        },
        description:
          "Maison artisanale d'épices fines, poivres rares et mélanges gastronomiques authentiques du Cameroun.",
        email: "contact@epicesdesulson.com",
        telephone: "+33 6 00 00 00 00",
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
          addressRegion: "Île-de-France / Auvergne-Rhône-Alpes",
        },
        areaServed: [
          { "@type": "Country", name: "France" },
          { "@type": "AdministrativeArea", name: "Île-de-France" },
          { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
          { "@type": "City", name: "Paris" },
          { "@type": "City", name: "Lyon" },
        ],
        knowsAbout: [
          "Épices fines",
          "Mélange pour poulet rôti",
          "Mélange pour viande et barbecue",
          "Poivre de Guinée pour poisson",
          "Assaisonnements naturels gastronomiques",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Les Épices de Sulson",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "fr-FR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/shop?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd({
  region,
  city,
  title,
  description,
}: {
  region: string;
  city: string;
  title: string;
  description: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "GourmetStore",
    name: `Les Épices de Sulson - ${title}`,
    url: baseUrl,
    description: description,
    image: `${baseUrl}/images/products/pack-4-saveurs-sulson.jpg`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Credit Card, Stripe, Apple Pay, Visa, Mastercard",
    areaServed: [
      { "@type": "City", name: city },
      { "@type": "AdministrativeArea", name: region },
      { "@type": "Country", name: "France" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catalogue Épices Artisanales 100g",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Épice de Sulson - Spéciale Poulet (100g)",
            price: "6.90",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Épice de Sulson - Spéciale Viande (100g)",
            price: "6.90",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Épice de Sulson - Spéciale Poisson (100g)",
            price: "6.90",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Épice de Sulson - Saveur Gourmande (100g)",
            price: "6.90",
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Pack Intégral 4 Saveurs Authentiques (4x100g)",
            price: "24.90",
            priceCurrency: "EUR",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductDetailJsonLd({ product }: { product: SulsonProductModel }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [
      `${baseUrl}${product.imageRecto}`,
      product.imageVerso ? `${baseUrl}${product.imageVerso}` : "",
    ].filter(Boolean),
    description: product.description,
    sku: product.code,
    mpn: product.code,
    brand: {
      "@type": "Brand",
      name: "Les Épices de Sulson",
    },
    category: product.category,
    countryOfOrigin: {
      "@type": "Country",
      name: "Cameroun",
    },
    weight: {
      "@type": "QuantitativeValue",
      value: product.isPack ? 400 : 100,
      unitCode: "GRM",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/product-details/${product.id}`,
      priceCurrency: "EUR",
      price: product.basePrice.toFixed(2),
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Les Épices de Sulson",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingScore.toString(),
      reviewCount: product.ratingCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
