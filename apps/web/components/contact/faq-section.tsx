"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "1. Quels sont les délais et frais de livraison ?",
    answer:
      "La livraison est offerte dès 50€ d'achat en France métropolitaine ! Vos commandes sont préparées avec soin dans notre atelier et expédiées sous 24h à 48h ouvrées via Colissimo ou Mondial Relay avec numéro de suivi.",
  },
  {
    question: "2. D'où proviennent vos poivres rares et épices ?",
    answer:
      "Nous sélectionnons nos épices directement auprès de producteurs passionnés et coopératives artisanales dans leurs terroirs d'origine : Cambodge pour le Poivre de Kampot IGP, Madagascar pour la Vanille Bourbon et le Poivre Sauvage Voatsiperifery, Sri Lanka pour la Cannelle de Ceylan et Guérande pour nos fleurs de sel.",
  },
  {
    question: "3. Comment bien conserver mes épices pour préserver leurs arômes ?",
    answer:
      "Conservez vos pots hermétiquement fermés, à l'abri de la lumière directe, de l'humidité et de la chaleur. Évitez de saupoudrer directement au-dessus d'une casserole fumante pour empêcher la vapeur de pénétrer dans le bocal.",
  },
  {
    question: "4. Quels moyens de paiement sont acceptés ?",
    answer:
      "Nous acceptons les règlements par Carte Bancaire (Visa, MasterCard), Stripe, PayPal et Apple Pay. Toutes les transactions sont entièrement sécurisées par protocole crypté SSL 3D-Secure.",
  },
  {
    question: "5. Comment utiliser mon code promo de bienvenue ?",
    answer:
      "Il vous suffit d'indiquer le code SULSON10 dans le champ prévu à cet effet lors de la validation de votre panier pour bénéficier de 10% de réduction immédiate sur votre commande.",
  },
  {
    question: "6. Proposez-vous des coffrets cadeaux ou des formats pour professionnels ?",
    answer:
      "Oui ! Nous proposons nos élégants Coffrets Grand Cru en bois gravé, ainsi que des conditionnements au kilo pour les restaurateurs et passionnés. Contactez-nous sur WhatsApp ou par email pour toute demande sur-mesure.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mb-[70px]">
      <div className="container">
        <div className="text-center">
          <motion.h3
            className="pb-3"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Foire Aux Questions
          </motion.h3>
          <motion.p
            className="pb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Retrouvez ici toutes les réponses concernant nos épices, la livraison et vos commandes.
          </motion.p>
        </div>
        <div className="grid grid-cols-12">
          <div className="lg:col-start-2 md:col-start-2 col-start-1 xl:col-end-12 md:col-end-12 col-end-13">
            <div className="accordion">
              {FAQS.map((faq, index) => (
                <motion.div
                  key={index}
                  className="accordion-item"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div
                    className={`accordion-header cursor-pointer select-none ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <h6>{faq.question}</h6>
                    <i className="hgi hgi-stroke hgi-minus-sign" />
                    <i className="hgi hgi-stroke hgi-plus-sign" />
                  </div>
                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
