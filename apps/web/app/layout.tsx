import type { Metadata } from "next";
import Image from "next/image";
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
          <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f6ef] px-5 py-12 text-[#18362b] sm:px-8">
            <div aria-hidden="true" className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-[#dce8d7]/70 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-56 -right-32 size-[38rem] rounded-full bg-[#ead9ad]/55 blur-3xl" />
            <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#18362b]/10 bg-white/90 px-6 py-10 text-center shadow-[0_28px_90px_rgba(28,55,42,0.12)] backdrop-blur sm:px-14 sm:py-14">
              <Image src="/images/logo-sulson.png" alt="Les Épices de Sulson" width={190} height={72} priority className="mx-auto h-16 w-auto object-contain" />
              <span className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-[#b89142]/25 bg-[#fbf6e9] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6827]">
                <span className="size-1.5 rounded-full bg-[#c49a45]" /> Pause temporaire
              </span>
              <h1 className="mx-auto mt-7 max-w-2xl font-urbanist text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-[#17382b] sm:text-6xl">Notre atelier prend un instant.</h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#66736d] sm:text-lg">{maintenance.message}</p>
              {maintenance.expectedBackAt && (
                <div className="mx-auto mt-7 w-fit rounded-xl bg-[#f1f5ef] px-5 py-3 text-sm font-semibold text-[#29483b]">
                  Retour prévu le {maintenance.expectedBackAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                </div>
              )}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="https://wa.me/33695545723?text=Bonjour%20Les%20%C3%89pices%20de%20Sulson%2C%20j%27ai%20une%20question%20pendant%20la%20maintenance%20de%20la%20boutique." target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#17382b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24533f]">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5"><path d="M12.03 2A9.84 9.84 0 0 0 3.5 16.73L2 22l5.4-1.42A9.97 9.97 0 1 0 12.03 2Zm0 18.18a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.2.84.85-3.1-.2-.32a8.14 8.14 0 1 1 7.03 3.9Zm4.47-6.1c-.24-.12-1.45-.71-1.67-.79-.23-.08-.4-.12-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.53.06-1.44-.72-2.39-1.29-3.35-2.92-.25-.44.25-.41.72-1.36.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.3-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.45-.6 1.65-1.17.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.47-.28Z" /></svg>
                  Nous écrire sur WhatsApp
                </a>
                <a href="mailto:contact@epicesdesulson.com" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#17382b]/20 px-6 py-3 text-sm font-bold text-[#17382b] transition hover:bg-[#f1f5ef]">Envoyer un e-mail</a>
              </div>
              <p className="mt-8 text-xs leading-5 text-[#8a948f]">Vos commandes déjà confirmées continuent d'être suivies par notre équipe.</p>
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
        <CookieConsent />
          </>
        )}
        <ChatbotBubble />
      </body>
    </html>
  );
}
