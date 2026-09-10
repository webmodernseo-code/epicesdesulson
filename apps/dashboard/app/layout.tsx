import type { Metadata } from "next";
import { DM_Sans, Public_Sans, Urbanist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Les Épices de Sulson - Dashboard Administrateur",
    default: "Les Épices de Sulson - Dashboard Administrateur",
  },
  description:
    "Tableau de bord de gestion et administration pour la boutique e-commerce Les Épices de Sulson.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=sulson_2026_v4", sizes: "any" },
      { url: "/icon.png?v=sulson_2026_v4", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png?v=sulson_2026_v4", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=sulson_2026_v4",
    apple: [
      { url: "/apple-icon.png?v=sulson_2026_v4", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico?v=sulson_2026_v4" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=sulson_2026_v4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=sulson_2026_v4" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png?v=sulson_2026_v4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=sulson_2026_v4" />
      </head>
      <body
        className={`${dmSans.variable} ${publicSans.variable} ${urbanist.variable} antialiased`}
      >
        {children}
        <Toaster
          richColors
          position="top-right"
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
