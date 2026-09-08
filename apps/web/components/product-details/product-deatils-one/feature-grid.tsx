"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "hgi-leaf-01",
    title: "Origine 100% Certifiée",
    description: "Traçabilité directe auprès des producteurs et coopératives artisanales",
    delay: 0.1,
  },
  {
    icon: "hgi-truck",
    title: "Expédition 24/48h",
    description: "Livraison offerte dès 35€ d'achat avec numéro de suivi Colissimo",
    delay: 0.2,
  },
  {
    icon: "hgi-archive",
    title: "Fraîcheur & Arômes",
    description: "Conditionnement hermétique garantissant une conservation de 24 mois",
    delay: 0.3,
  },
  {
    icon: "hgi-shield-security",
    title: "Paiement 100% Sécurisé",
    description: "Cartes Bancaires, Apple Pay & protocole de paiement chiffré SSL Stripe",
    delay: 0.4,
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-8 bg-gray-50/60 border-y border-gray-200/80">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          {FEATURES.map((item, idx) => (
            <div key={idx} className="md:col-span-6 col-span-12 xl:col-span-3">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: item.delay }}
                className="p-5 bg-white border border-gray-200 rounded-2xl text-center shadow-2xs hover:shadow-sm hover:border-primary/40 transition-all flex flex-col items-center justify-center h-full"
              >
                <span className="inline-flex items-center justify-center size-12 bg-primary/10 text-primary rounded-full mb-2">
                  <i className={`hgi hgi-stroke ${item.icon} text-2xl`} />
                </span>
                <h5 className="pt-1 pb-1 text-sm font-bold text-gray-900">{item.title}</h5>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
