"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const NAVIGATION_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Nos Épices & Packs", href: "/#nos-epices" },
  { label: "Avis & Témoignages", href: "/avis" },
  { label: "À propos de Sulson", href: "/about" },
  { label: "Foire Aux Questions", href: "/faq" },
  { label: "Contact & Support", href: "/contact" },
];

const POLITIQUE_LINKS = [
  { label: "Conditions Générales de Vente", href: "/terms-and-conditions" },
  { label: "Politique de Confidentialité", href: "/privacy-policy" },
  { label: "Politique de Retour & Remboursement", href: "/return-policy" },
  { label: "Expéditions & Délais de Livraison", href: "/faq" },
  { label: "Mentions Légales", href: "/terms-and-conditions" },
  { label: "Gestion des cookies", href: "#cookies", isCookieTrigger: true },
];

export default function Footer() {
  // Mobile accordion states (default: closed on mobile)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    navigation: false,
    politique: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <footer className="pb-10 md:pb-14 bg-primary-darker pt-16 sm:pt-20 xl:rounded-tr-[22px] xl:rounded-tl-[22px]">
        <div className="container">
          {/* <!-- ========== Footer Top Section Start ========== --> */}
          <div className="pb-8 grid grid-cols-12 gap-6 md:gap-8">
            {/* ── Logo & Brand Presentation Column ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col gap-y-4"
            >
              <div>
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Les Épices de Sulson"
                    width={170}
                    height={55}
                    className="h-12 w-auto object-contain brightness-110"
                  />
                </Link>
              </div>
              <p className="text-primary-lighter text-xs sm:text-sm leading-relaxed">
                Les Épices de Sulson : Sélection rigoureuse des meilleures épices du Cameroun, poivres rares et mélanges artisanaux 100% naturels pour sublimer toutes vos créations culinaires.
              </p>
              
              {/* Social networks */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <a
                  className="inline-flex items-center justify-center size-8 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="Facebook"
                >
                  <i className="hgi hgi-stroke hgi-facebook-01 text-lg"></i>
                </a>
                <a
                  className="inline-flex items-center justify-center size-8 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="Instagram"
                >
                  <i className="hgi hgi-stroke hgi-instagram text-lg"></i>
                </a>
                <a
                  className="inline-flex items-center justify-center size-8 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <i className="hgi hgi-stroke hgi-linkedin-01 text-lg"></i>
                </a>
              </div>
            </motion.div>

            {/* ── Colonne 1 : NAVIGATION ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="col-span-12 md:col-span-6 xl:col-span-3"
            >
              <button
                type="button"
                onClick={() => toggleSection("navigation")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-3 md:pb-5 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold text-sm sm:text-base tracking-wide">NAVIGATION</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.navigation
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-lg`}
                  />
                </span>
              </button>
              <div
                className={`${
                  openSections.navigation ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-1.5 pt-3">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <li
                      key={index}
                      className="py-0.5 flex items-center gap-x-2"
                    >
                      <span className="inline-flex items-center">
                        <i className="hgi hgi-stroke hgi-arrow-right-01 text-xs text-primary-lighter"></i>
                      </span>
                      <Link
                        href={link.href}
                        className="text-primary-lighter text-xs sm:text-sm font-medium hover:underline hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Colonne 2 : POLITIQUE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="col-span-12 md:col-span-6 xl:col-span-3"
            >
              <button
                type="button"
                onClick={() => toggleSection("politique")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-3 md:pb-5 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold text-sm sm:text-base tracking-wide">POLITIQUE & LÉGAL</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.politique
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-lg`}
                  />
                </span>
              </button>
              <div
                className={`${
                  openSections.politique ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-1.5 pt-3">
                  {POLITIQUE_LINKS.map((link, index) => (
                    <li
                      key={index}
                      className="py-0.5 flex items-center gap-x-2"
                    >
                      <span className="inline-flex items-center">
                        <i className="hgi hgi-stroke hgi-arrow-right-01 text-xs text-primary-lighter"></i>
                      </span>
                      {link.isCookieTrigger ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              window.dispatchEvent(new CustomEvent("open-cookie-settings"));
                            }
                          }}
                          className="text-primary-lighter text-xs sm:text-sm font-medium hover:underline hover:text-white transition-colors text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-primary-lighter text-xs sm:text-sm font-medium hover:underline hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Colonne 3 (Droite) : CONTACT ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col gap-y-3"
            >
              <button
                type="button"
                onClick={() => toggleSection("contact")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-3 md:pb-5 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold text-sm sm:text-base tracking-wide">CONTACT & SUPPORT</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.contact
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-lg`}
                  />
                </span>
              </button>

              <div
                className={`${
                  openSections.contact ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-2.5 pt-2">
                  <li className="flex items-center gap-x-2.5">
                    <span className="size-7 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-white shrink-0">
                      <i className="hgi hgi-stroke hgi-mail-02 text-base"></i>
                    </span>
                    <a
                      href="mailto:contact@epicesdesulson.com"
                      className="text-primary-lighter hover:text-white text-xs sm:text-sm font-semibold transition-colors truncate"
                    >
                      contact@epicesdesulson.com
                    </a>
                  </li>

                  <li className="flex items-center gap-x-2.5">
                    <span className="size-7 inline-flex items-center justify-center rounded-full bg-emerald-600/30 text-emerald-400 shrink-0">
                      <i className="hgi hgi-stroke hgi-whatsapp text-base"></i>
                    </span>
                    <Link
                      href="/contact"
                      className="text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-bold transition-colors"
                    >
                      Support WhatsApp en direct
                    </Link>
                  </li>

                  <li className="flex items-center gap-x-2.5">
                    <span className="size-7 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-white shrink-0">
                      <i className="hgi hgi-stroke hgi-clock-01 text-base"></i>
                    </span>
                    <span className="text-primary-lighter text-xs font-medium">
                      Lun - Sam : 9h00 - 18h00
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          {/* <!-- ========== Footer Top Section End ========== --> */}

          {/* ── Secure Payment Methods ALWAYS VISIBLE ON MOBILE & DESKTOP ── */}
          <div className="py-5 border-t border-[rgba(145,158,171,0.18)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="size-6 inline-flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <i className="hgi hgi-stroke hgi-shield-check text-sm" />
              </span>
              <p className="text-[11px] sm:text-xs text-primary-lighter uppercase font-bold tracking-wider">
                Paiement 100% Sécurisé & Chiffré (SSL / Stripe)
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <Image
                src="/images/payments/visa.svg"
                alt="Visa"
                width={38}
                height={24}
                className="h-5 sm:h-6 w-auto rounded shadow-2xs bg-white/90 p-0.5"
              />
              <Image
                src="/images/payments/mastercard.svg"
                alt="Mastercard"
                width={38}
                height={24}
                className="h-5 sm:h-6 w-auto rounded shadow-2xs bg-white/90 p-0.5"
              />
              <Image
                src="/images/payments/amex.svg"
                alt="American Express"
                width={38}
                height={24}
                className="h-5 sm:h-6 w-auto rounded shadow-2xs bg-white/90 p-0.5"
              />
              <Image
                src="/images/payments/apple-pay.svg"
                alt="Apple Pay"
                width={38}
                height={24}
                className="h-5 sm:h-6 w-auto rounded shadow-2xs bg-white/90 p-0.5"
              />
              <Image
                src="/images/payments/google-pay.svg"
                alt="Google Pay"
                width={38}
                height={24}
                className="h-5 sm:h-6 w-auto rounded shadow-2xs bg-white/90 p-0.5"
              />
            </div>
          </div>

          {/* <!-- ========== Footer Bottom Section Start ========== --> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center text-white/80 text-[11px] sm:text-xs pt-4 border-t border-[rgba(145,158,171,0.12)]"
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <span>{new Date().getFullYear()} © Les Épices de Sulson. Tous droits réservés.</span>
              <span aria-hidden="true" className="hidden text-white/25 sm:inline">·</span>
              <a
                href={process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://admin.epicesdesulson.com"}
                className="inline-flex items-center gap-1.5 text-white/40 transition-colors hover:text-white/70"
                rel="nofollow"
              >
                <i className="hgi hgi-stroke hgi-lock-password text-[12px]" aria-hidden="true" />
                <span>Espace administration</span>
              </a>
            </div>
          </motion.div>
          {/* ========== Footer Bottom Section End ========== */}
        </div>
      </footer>
    </>
  );
}
