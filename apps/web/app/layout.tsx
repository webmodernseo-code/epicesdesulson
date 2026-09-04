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
  metadataBase: new URL("https://lesepicesdesulson.com"),
  title: {
    default: "Les Épices de Sulson - Épices Fines, Poivres Rares & Saveurs d'Exception",
    template: "%s | Les Épices de Sulson",
  },
  description:
    "Découvrez la boutique en ligne Les Épices de Sulson : une sélection d'épices d'exception, poivres rares, mélanges gourmets et condiments artisanaux pour sublimer vos créations culinaires.",
  keywords: [
    "Les Épices de Sulson",
    "épices fines",
    "poivres rares",
    "condiments artisanaux",
    "mélanges d'épices",
    "boutique épices",
    "gastronomie",
    "saveurs du monde",
    "épices bio",
    "terroirs",
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
    title: "Les Épices de Sulson - Épices Fines & Saveurs d'Exception",
    description:
      "Boutique en ligne d'épices d'exception, poivres rares et mélanges gourmets.",
    type: "website",
    locale: "fr_FR",
    siteName: "Les Épices de Sulson",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Épices de Sulson - Épices Fines & Saveurs d'Exception",
    description:
      "Boutique en ligne d'épices d'exception, poivres rares et mélanges gourmets.",
  },
};

import ChatbotBubble from "@/components/common/chatbot-bubble";

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
