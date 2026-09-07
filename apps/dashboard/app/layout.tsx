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
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${publicSans.variable} ${urbanist.variable}  antialiased`}
      >
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              toast: "bg-white border-primary border dark:bg-gray-800",
              title: "text-primary dark:text-white",
              description: "text-gray-500 dark:text-gray-400",
              actionButton: "bg-primary text-white",
              cancelButton: "bg-gray-100 text-gray-500",
              success: "text-green-600 border-green-600",
              error: "text-red-600 border-red-600",
            },
          }}
        />
      </body>
    </html>
  );
}
