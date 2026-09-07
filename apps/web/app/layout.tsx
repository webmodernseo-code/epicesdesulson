import type { Metadata } from "next";
import { Public_Sans, Urbanist, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import NewsLetter from "@/components/common/news-letter";
import Navbar from "@/components/layout/navbar";
import ScrollToTop from "@/components/common/scroll-to-top";
import { QuickViewProvider } from "@/context/quick-view-context";
import { CartProvider } from "@/context/cart-context";
import NextTopLoader from "nextjs-toploader";

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
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

import ChatbotBubble from "@/components/common/chatbot-bubble";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/json-ld";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="/icons/hugeicons/hgi-stroke-rounded.css" />
      </head>
      <body
        className={`${publicSans.variable} ${urbanist.variable} ${dmSans.variable} antialiased`}
      >
        <OrganizationAndWebsiteJsonLd />
        <NextTopLoader color="#ffc107" showSpinner={false} />
        <CartProvider>
          <QuickViewProvider>
            <Navbar />
            {children}
          </QuickViewProvider>
        </CartProvider>
        <NewsLetter />
        <Footer />
        <ScrollToTop />
        <ChatbotBubble />
      </body>
    </html>
  );
}
