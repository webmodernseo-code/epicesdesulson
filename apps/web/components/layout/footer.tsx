"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const NAVIGATION_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Avis & Témoignages", href: "/avis" },
  { label: "À propos", href: "/about" },
  { label: "Foire Aux Questions", href: "/faq" },
  { label: "Contact & Support", href: "/contact" },
];

const POLITIQUE_LINKS = [
  { label: "Conditions Générales de Vente", href: "/terms-and-conditions" },
  { label: "Politique de Confidentialité", href: "/privacy-policy" },
  { label: "Politique de Retour & Remboursement", href: "/return-policy" },
  { label: "Expéditions & Délais de Livraison", href: "/faq" },
  { label: "Mentions Légales", href: "/terms-and-conditions" },
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
      <footer className="pb-12 md:pb-15 bg-primary-darker pt-20 sm:pt-24 xl:rounded-tr-[22px] xl:rounded-tl-[22px]">
        <div className="container">
          {/* <!-- ========== Footer Top Section Start ========== --> */}
          <div className="pb-10 grid grid-cols-12 gap-6 md:gap-8">
            {/* ── Logo & Brand Presentation Column ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col gap-y-5"
            >
              <div>
                <Link href="/">
                  <Image
                    src="/images/footer-logo.svg"
                    alt="Les Épices de Sulson"
                    width={155}
                    height={42}
                  />
                </Link>
              </div>
              <p className="text-primary-lighter text-sm leading-relaxed">
                Les Épices de Sulson : Sélection rigoureuse des meilleures épices du monde, poivres rares et mélanges artisanaux pour sublimer tous vos plats.
              </p>
              
              {/* Social networks */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  className="inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="Facebook"
                >
                  <i className="hgi hgi-stroke hgi-facebook-01 text-xl"></i>
                </a>
                <a
                  className="inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="Instagram"
                >
                  <i className="hgi hgi-stroke hgi-instagram text-xl"></i>
                </a>
                <a
                  className="inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.16)] hover:bg-primary hover:text-white transition-all text-white"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <i className="hgi hgi-stroke hgi-linkedin-01 text-xl"></i>
                </a>
              </div>
            </motion.div>

            {/* ── Colonne 1 : NAVIGATION ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-12 md:col-span-6 xl:col-span-3"
            >
              <button
                type="button"
                onClick={() => toggleSection("navigation")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-4 md:pb-6 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold tracking-wide">NAVIGATION</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.navigation
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-xl`}
                  />
                </span>
              </button>
              <div
                className={`${
                  openSections.navigation ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-2 pt-4">
                  {NAVIGATION_LINKS.map((link, index) => (
                    <li
                      key={index}
                      className="py-1 flex items-center gap-x-2"
                    >
                      <span className="inline-flex items-center">
                        <i className="hgi hgi-stroke hgi-arrow-right-01 text-base text-primary-lighter"></i>
                      </span>
                      <Link
                        href={link.href}
                        className="text-primary-lighter text-sm font-semibold hover:underline hover:text-white transition-colors"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-12 md:col-span-6 xl:col-span-3"
            >
              <button
                type="button"
                onClick={() => toggleSection("politique")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-4 md:pb-6 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold tracking-wide">POLITIQUE</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.politique
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-xl`}
                  />
                </span>
              </button>
              <div
                className={`${
                  openSections.politique ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-2 pt-4">
                  {POLITIQUE_LINKS.map((link, index) => (
                    <li
                      key={index}
                      className="py-1 flex items-center gap-x-2"
                    >
                      <span className="inline-flex items-center">
                        <i className="hgi hgi-stroke hgi-arrow-right-01 text-base text-primary-lighter"></i>
                      </span>
                      <Link
                        href={link.href}
                        className="text-primary-lighter text-sm font-semibold hover:underline hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Colonne 3 (Droite) : CONTACT & PAIEMENT ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col gap-y-4"
            >
              <button
                type="button"
                onClick={() => toggleSection("contact")}
                className="w-full text-left md:pointer-events-none flex items-center justify-between pb-4 md:pb-6 border-b border-[rgba(145,158,171,0.24)]"
              >
                <h5 className="text-primary-lighter font-bold tracking-wide">CONTACT & PAIEMENT</h5>
                <span className="md:hidden text-primary-lighter transition-transform duration-200">
                  <i
                    className={`hgi hgi-stroke ${
                      openSections.contact
                        ? "hgi-arrow-up-01"
                        : "hgi-arrow-down-01"
                    } text-xl`}
                  />
                </span>
              </button>

              <div
                className={`${
                  openSections.contact ? "block" : "hidden md:block"
                } transition-all`}
              >
                <ul className="flex flex-col gap-y-3 pt-2">
                  <li className="flex items-center gap-x-3">
                    <span className="size-8 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-white shrink-0">
                      <i className="hgi hgi-stroke hgi-mail-02 text-lg"></i>
                    </span>
                    <a
                      href="mailto:contact@epicesdesulson.com"
                      className="text-primary-lighter hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                    >
                      contact@epicesdesulson.com
                    </a>
                  </li>

                  <li className="flex items-center gap-x-3">
                    <span className="size-8 inline-flex items-center justify-center rounded-full bg-emerald-600/30 text-emerald-400 shrink-0">
                      <i className="hgi hgi-stroke hgi-whatsapp text-lg"></i>
                    </span>
                    <Link
                      href="/contact"
                      className="text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-bold transition-colors"
                    >
                      Support WhatsApp en direct
                    </Link>
                  </li>

                  <li className="flex items-center gap-x-3">
                    <span className="size-8 inline-flex items-center justify-center rounded-full bg-[rgba(145,158,171,0.16)] text-white shrink-0">
                      <i className="hgi hgi-stroke hgi-clock-01 text-lg"></i>
                    </span>
                    <span className="text-primary-lighter text-xs font-medium">
                      Lun - Sam : 9h00 - 18h00
                    </span>
                  </li>
                </ul>

                {/* Secure Payment methods */}
                <div className="pt-4 border-t border-[rgba(145,158,171,0.15)] mt-3">
                  <p className="text-[11px] text-primary-lighter/80 uppercase font-bold tracking-wider mb-2.5">
                    Transactions 100% Sécurisées (Stripe)
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Image
                      src="/images/payments/visa.svg"
                      alt="Visa"
                      width={38}
                      height={24}
                      className="h-6 w-auto rounded shadow-2xs"
                    />
                    <Image
                      src="/images/payments/mastercard.svg"
                      alt="Mastercard"
                      width={38}
                      height={24}
                      className="h-6 w-auto rounded shadow-2xs"
                    />
                    <Image
                      src="/images/payments/amex.svg"
                      alt="American Express"
                      width={38}
                      height={24}
                      className="h-6 w-auto rounded shadow-2xs"
                    />
                    <Image
                      src="/images/payments/apple-pay.svg"
                      alt="Apple Pay"
                      width={38}
                      height={24}
                      className="h-6 w-auto rounded shadow-2xs"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* <!-- ========== Footer Top Section End ========== --> */}

          {/* <!-- ========== Footer Bottom Section Start ========== --> */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-white/80 text-xs sm:text-sm bg-[url(/images/bottom-border.png)] pt-6 bg-center pb-px bg-no-repeat border-t border-[rgba(145,158,171,0.15)]"
          >
            {new Date().getFullYear()} © Les Épices de Sulson. Tous droits réservés.
          </motion.div>
          {/* ========== Footer Bottom Section End ========== */}
        </div>
      </footer>
    </>
  );
}
