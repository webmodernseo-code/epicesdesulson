"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SuccessScreen() {
  return (
    <section className="pb-16 pt-6">
      <div className="container">
        <div className="flex items-center justify-center flex-col max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/images/order-success-Illustration.png"
              alt="Commande confirmée Les Épices de Sulson"
              width={300}
              height={300}
              priority
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3"
          >
            <i className="hgi hgi-stroke hgi-tick-double-02 text-base text-emerald-600" />
            <span>Paiement & Commande Validés</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3"
          >
            Merci pour votre confiance !
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-600 leading-relaxed mb-6"
          >
            Nous préparons vos épices rares et d'exception avec le plus grand soin. Votre colis sera expédié sous 24h à 48h.
          </motion.p>

          {/* Post-Purchase Review Link Notice */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full bg-primary/5 border border-primary/20 rounded-3xl p-5 mb-8 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <i className="hgi hgi-stroke hgi-star text-xl text-amber-300" />
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-0.5">
                  Avis Étoilé Post-Achat
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Vous recevrez dès demain un lien exclusif par email pour attribuer vos étoiles et partager vos impressions culinaires.
                </p>
              </div>
            </div>

            <Link
              href="/avis?orderId=CMD-2026-SULSON&product=kampot-red&name=Client%20Privil%C3%A9gi%C3%A9"
              className="btn btn-primary text-white text-xs font-bold py-2 px-4 rounded-full shrink-0 whitespace-nowrap shadow-xs hover:shadow-md"
            >
              <i className="hgi hgi-stroke hgi-star text-sm" />
              <span>Tester le lien d'avis</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/"
              className="btn btn-primary text-white font-bold text-xs sm:text-sm rounded-full px-6 py-3 shadow-md"
            >
              Retourner à la boutique
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
