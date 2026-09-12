import type { Metadata } from "next";
import { Public_Sans, Urbanist, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import NewsLetter from "@/components/common/news-letter";
import Navbar from "@/components/layout/navbar";
import ScrollToTop from "@/components/common/scroll-to-top";
import { QuickViewProvider } from "@/context/quick-view-context";
import { CartProvider } from "@/context/cart-context";
import { RatingsProvider } from "@/context/ratings-context";
import NextTopLoader from "nextjs-toploader";
import { getMaintenanceStatus } from "@/lib/maintenance";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://epicesdesulson.com"),
  title: {
    default: "Les Épices de Sulson - Épices Fines, Poivres Rares & Saveurs d'Exception",
    template: "%s | Les Épices de Sulson",
  },
  description:
    "Découvrez la boutique en ligne Les Épices de Sulson : une sélection d'épices d'exception, poivres rares, mélanges gourmets et condiments artisanaux pour sublimer vos créations culinaires.",
  keywords: [
    "Les Épices de Sulson",
    "épices de sulson",
    "epices de sulson",
    "epice de sulson",
    "epice sulson",
    "épice paris",
    "boutique épices paris",
    "épicerie fine paris",
    "épices lyon",
    "épices auvergne rhône alpes",
    "épices fines",
    "mélange épices poulet rôti",
    "mélange épices viande grillade barbecue",
    "poivre de guinée poisson",
    "secret de sulson saveur gourmande",
    "coffret épices artisanales 100g",
    "saveurs du cameroun",
    "terroirs gastronomiques",
  ],
  authors: [{ name: "Les Épices de Sulson" }],
  creator: "Les Épices de Sulson",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Les Épices de Sulson - Épices Fines, Poivres Rares & Saveurs d'Exception",
    description:
      "Boutique en ligne officielle Les Épices de Sulson : mélanges artisanaux 100g (Poulet, Viande, Poisson, Gourmande) et Pack Intégral livrés à Paris, Lyon et partout en France.",
    type: "website",
    locale: "fr_FR",
    siteName: "Les Épices de Sulson",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Épices de Sulson - Épices Fines & Saveurs d'Exception",
    description:
      "Boutique officielle Les Épices de Sulson : mélanges gourmets 100g et coffrets authentiques.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=sulson_official_2026", sizes: "any" },
      { url: "/favicon-48x48.png?v=sulson_official_2026", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png?v=sulson_official_2026", sizes: "96x96", type: "image/png" },
      { url: "/favicon.png?v=sulson_official_2026", sizes: "192x192", type: "image/png" },
      { url: "/icon.png?v=sulson_official_2026", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=sulson_official_2026",
    apple: [
      { url: "/apple-icon.png?v=sulson_official_2026", sizes: "180x180", type: "image/png" },
    ],
  },
};

import ChatbotBubble from "@/components/common/chatbot-bubble";
import CookieConsent from "@/components/common/cookie-consent";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/json-ld";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maintenance = await getMaintenanceStatus();

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico?v=sulson_official_2026" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=sulson_official_2026" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=sulson_official_2026" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=sulson_official_2026" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=sulson_official_2026" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png?v=sulson_official_2026" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=sulson_official_2026" />
        <link rel="stylesheet" href="/icons/hugeicons/hgi-stroke-rounded.css" />
      </head>
      <body
        className={`${publicSans.variable} ${urbanist.variable} ${dmSans.variable} antialiased`}
      >
        {maintenance.enabled ? (
          <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-6 py-16 text-[#1b1b18]">
            <section className="w-full max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8a6a2f]">Les Épices de Sulson</p>
              <div className="mx-auto my-8 h-px w-16 bg-[#b8975a]" />
              <h1 className="font-urbanist text-4xl font-semibold tracking-tight sm:text-6xl">La boutique fait une courte pause.</h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#5c5a52] sm:text-lg">{maintenance.message}</p>
              {maintenance.expectedBackAt && (
                <p className="mt-8 text-sm font-semibold text-[#34332e]">
                  Retour prévu le {maintenance.expectedBackAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                </p>
              )}
              <a href="mailto:contact@epicesdesulson.com" className="mt-10 inline-flex border-b border-[#1b1b18] pb-1 text-sm font-semibold">contact@epicesdesulson.com</a>
            </section>
          </main>
        ) : (
          <>
        <OrganizationAndWebsiteJsonLd />
        <NextTopLoader color="#ffc107" showSpinner={false} />
        <CartProvider>
          <RatingsProvider>
            <QuickViewProvider>
              <Navbar />
              {children}
            </QuickViewProvider>
          </RatingsProvider>
        </CartProvider>
        <NewsLetter />
        <Footer />
        <ScrollToTop />
        <ChatbotBubble />
        <CookieConsent />
          </>
        )}
      </body>
    </html>
  );
}
