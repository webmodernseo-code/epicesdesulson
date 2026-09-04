"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "D'où proviennent vos épices et poivres d'exception ?",
    answer:
      "Nous sélectionnons nos épices directement auprès de producteurs passionnés et coopératives artisanales dans leurs terroirs d'origine (Cambodge pour le poivre de Kampot, Madagascar pour la vanille bourbon et le poivre sauvage, Sri Lanka pour la cannelle de Ceylan). Cette démarche garantit une fraîcheur, une traçabilité et une intensité aromatique inégalées.",
  },
  {
    question: "Comment bien conserver ses épices pour préserver tous leurs arômes ?",
    answer:
      "Toutes nos épices sont conditionnées dans des emballages hermétiques refermables de qualité supérieure. Nous vous conseillons de les garder à l'abri de la lumière directe, de la chaleur et de l'humidité afin de préserver l'intégralité de leurs huiles essentielles et de leurs saveurs.",
  },
  {
    question: "Proposez-vous le conditionnement au kilo (1 Kg) ?",
    answer:
      "Oui ! Chaque fiche produit dispose d'options de poids allant de 100g à 1 Kg (Kilo) pour satisfaire aussi bien les amateurs exigeants que les chefs cuisiniers et restaurateurs. Pour des commandes en gros volumes, notre équipe est également disponible via la page Contact.",
  },
  {
    question: "Quels sont les délais et tarifs de livraison ?",
    answer:
      "Toutes les commandes sont soigneusement préparées et expédiées sous 24h à 48h ouvrées. La livraison est offerte en France métropolitaine dès 50€ d'achat avec un suivi en temps réel de votre colis.",
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, Carte Bleue) ainsi que les paiements sécurisés via notre passerelle cryptée SSL aux normes bancaires les plus strictes.",
  },
];

export default function FAQAccordionThree() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-wider text-gray-950 bg-warning-light py-1 px-3.5 rounded-full inline-block mb-3 shadow-xs"
          >
            Foire Aux Questions
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
          >
            Questions Fréquentes
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            Tout ce que vous devez savoir sur nos origines, nos formats et la livraison de vos épices.
          </motion.p>
        </div>

        {/* Accordions List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-primary/40 bg-white shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <span
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <i
                      className={`hgi hgi-stroke ${
                        isOpen ? "hgi-minus-sign" : "hgi-plus-sign"
                      } text-base leading-none`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-1">
                        <p className="pt-3">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
