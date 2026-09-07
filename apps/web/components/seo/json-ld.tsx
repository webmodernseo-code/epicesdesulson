import React from "react";

export function OrganizationAndWebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Les Épices de Sulson",
        alternateName: [
          "Épices de Sulson",
          "Epices de Sulson",
          "Epice de Sulson",
          "Epice Sulson",
          "Les Epices de Sulson",
          "Épice Paris - Les Épices de Sulson",
        ],
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/logo.png`,
          caption: "Les Épices de Sulson",
        },
        description:
          "Maison gastronomique d'épices artisanales, poivres rares et mélanges traditionnels d'exception du Cameroun. Livraison express à Paris, Lyon, et dans toute la France.",
        email: "contact@epicesdesulson.com",
        telephone: "+33 6 00 00 00 00",
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
          addressRegion: "France / Paris & Île-de-France / Auvergne-Rhône-Alpes (Lyon)",
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
          "Épice Paris",
          "Épices Lyon",
          "Épices de Sulson",
          "Mélange pour poulet rôti (100g)",
          "Mélange pour viande et barbecue (100g)",
          "Poivre de Guinée pour poisson (100g)",
          "Secret de Sulson Saveur Gourmande (100g)",
          "Pack Intégral 4 Saveurs Authentiques (4x100g)",
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
          target: `${baseUrl}/?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "GourmetStore",
        "@id": `${baseUrl}/#store`,
        name: "Les Épices de Sulson - Épicerie Fine & Épices d'Exception",
        url: baseUrl,
        image: `${baseUrl}/images/products/pack-4-saveurs-sulson.jpg`,
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Credit Card, Stripe, Apple Pay, Visa, Mastercard",
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
          addressRegion: "France / Paris / Lyon",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Catalogue Épices Artisanales 100g",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Épice de Sulson - Spéciale Poulet (100g)",
                description: "Mélange curcuma frais, paprika, gingembre, muscade, ail et poivre noir pour des volailles dorées et juteuses.",
                image: `${baseUrl}/images/products/epice-poulet-recto.jpg`,
                sku: "SUL-301",
                brand: { "@type": "Brand", name: "Les Épices de Sulson" },
                offers: {
                  "@type": "Offer",
                  price: "6.90",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.4",
                  reviewCount: "68",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Épice de Sulson - Spéciale Viande (100g)",
                description: "Mélange noble au paprika, poivre noir, clou de girofle, laurier et muscade pour viandes rouges et barbecues.",
                image: `${baseUrl}/images/products/epice-viande-recto.jpg`,
                sku: "SUL-302",
                brand: { "@type": "Brand", name: "Les Épices de Sulson" },
                offers: {
                  "@type": "Offer",
                  price: "6.90",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.5",
                  reviewCount: "74",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Épice de Sulson - Spéciale Poisson (100g)",
                description: "Poivre de Guinée, céleri, graines de moutarde et thym pour poissons marinés et braisés.",
                image: `${baseUrl}/images/products/epice-poisson-recto.jpg`,
                sku: "SUL-303",
                brand: { "@type": "Brand", name: "Les Épices de Sulson" },
                offers: {
                  "@type": "Offer",
                  price: "6.90",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.3",
                  reviewCount: "52",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Épice de Sulson - Saveur Gourmande (100g)",
                description: "La création signature Le Secret de Sulson : assaisonnement universel pour sauces mijotées et légumes.",
                image: `${baseUrl}/images/products/epice-gourmande-recto.jpg`,
                sku: "SUL-304",
                brand: { "@type": "Brand", name: "Les Épices de Sulson" },
                offers: {
                  "@type": "Offer",
                  price: "6.90",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.4",
                  reviewCount: "61",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Le Pack Intégral : Les 4 Saveurs Authentiques de Sulson (4x100g)",
                description: "L'assortiment complet réunissant les 4 trésors artisanaux (Poulet, Viande, Poisson, Gourmande). 100% Naturel.",
                image: `${baseUrl}/images/products/pack-4-saveurs-sulson.jpg`,
                sku: "SUL-305",
                brand: { "@type": "Brand", name: "Les Épices de Sulson" },
                offers: {
                  "@type": "Offer",
                  price: "24.90",
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.5",
                  reviewCount: "79",
                },
              },
            },
          ],
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
