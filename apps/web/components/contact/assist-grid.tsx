"use client";

import { motion } from "framer-motion";
import { getChatbotConfig, formatWhatsappUrl } from "@/lib/chatbot-config";
import { useState, useEffect } from "react";

export default function AssistGrid() {
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/33695545723");

  useEffect(() => {
    const config = getChatbotConfig();
    setWhatsappUrl(
      formatWhatsappUrl(
        config.whatsappNumber,
        "Bonjour, je vous contacte depuis la page de contact Les Épices de Sulson."
      )
    );
  }, []);

  const openChatbot = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("sulson_open_chatbot"));
    }
  };

  const ASSIST_ITEMS = [
    {
      icon: "hgi-mail-02",
      title: "Email & Support",
      content: "contact@epicesdesulson.com",
      href: "mailto:contact@epicesdesulson.com",
    },
    {
      icon: "hgi-whatsapp",
      title: "WhatsApp Direct",
      content: "Échanger avec notre conseillère",
      href: whatsappUrl,
      isExternal: true,
    },
    {
      icon: "hgi-bubble-chat-notification",
      title: "Chatbot & Conseils",
      content: "Discuter en direct avec notre communauté",
      isChatbotTrigger: true,
    },
    {
      icon: "hgi-clock-01",
      title: "Horaires du Service Client",
      content: "Du Lundi au Samedi : 9h00 - 18h00",
    },
  ];

  return (
    <section className="pb-[70px]">
      <div className="container">
        <div className="text-center">
          <motion.h3
            className="pb-3"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Nous sommes à votre écoute
          </motion.h3>
          <motion.p
            className="pb-10"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ici pour vous conseiller et vous accompagner à chaque étape de votre commande.
          </motion.p>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {ASSIST_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              className="md:col-span-6 col-span-12 xl:col-span-3 border-gray-300 border p-6 rounded-2xl flex flex-col justify-between"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <div>
                <span className="inline-flex items-center justify-center size-12 bg-[#919EAB14] rounded-full">
                  <i
                    className={`hgi hgi-stroke ${item.icon} text-2xl text-light-primary-text`}
                  />
                </span>
                <p className="pt-4 pb-0.5 font-semibold text-light-primary-text">
                  {item.title}
                </p>
                {item.isChatbotTrigger ? (
                  <button
                    type="button"
                    onClick={openChatbot}
                    className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline cursor-pointer text-left inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{item.content}</span>
                    <i className="hgi hgi-stroke hgi-arrow-right-02 text-sm" />
                  </button>
                ) : item.href ? (
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="hover:text-primary transition-colors text-light-secondary-text"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
