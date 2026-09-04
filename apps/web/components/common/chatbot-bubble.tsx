"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getChatbotConfig,
  formatWhatsappUrl,
  type ChatbotConfig,
  DEFAULT_CHATBOT_CONFIG,
} from "@/lib/chatbot-config";
import { generateBotReply, type BotMessage } from "@/lib/chatbot-engine";

export default function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>(DEFAULT_CHATBOT_CONFIG);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load config and listen for changes
  useEffect(() => {
    setConfig(getChatbotConfig());

    const handleConfigUpdate = () => {
      setConfig(getChatbotConfig());
    };

    const handleOpenChatbot = () => {
      setIsOpen(true);
      setShowTooltip(false);
      setHasUnread(false);
    };

    window.addEventListener("sulson_chatbot_config_updated", handleConfigUpdate);
    window.addEventListener("storage", handleConfigUpdate);
    window.addEventListener("sulson_open_chatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("sulson_chatbot_config_updated", handleConfigUpdate);
      window.removeEventListener("storage", handleConfigUpdate);
      window.removeEventListener("sulson_open_chatbot", handleOpenChatbot);
    };
  }, []);

  // Initial welcome message (exact greeting requested by user)
  useEffect(() => {
    const welcome = config.welcomeMessage || DEFAULT_CHATBOT_CONFIG.welcomeMessage;
    setMessages([
      {
        id: "welcome-1",
        sender: "bot",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        chips: [
          "Quelle épice pour mon plat ?",
          "Délais et livraison",
          "Avez-vous un code promo ?",
          "Origines et qualité",
          "Discuter sur WhatsApp",
        ],
      },
    ]);

    // Show tooltip for 6 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [config.welcomeMessage]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    // Add user message
    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // 2 to 3 seconds typing simulation delay as requested by user
    const typingDuration = Math.floor(Math.random() * 800) + 2200; // 2.2s to 3.0s

    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMsg: BotMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showWhatsappButton: reply.showWhatsappButton,
        whatsappMessage: reply.whatsappMessage || text,
        chips: reply.chips,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, typingDuration);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openWhatsapp = (customMessage?: string) => {
    const message = customMessage || config.defaultWhatsappMessage;
    const url = formatWhatsappUrl(config.whatsappNumber, message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!config.isEnabled) return null;

  return (
    <>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[390px] h-[550px] max-h-[82vh] z-60 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-darker via-primary-dark to-primary p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full bg-white/20 p-1 flex items-center justify-center border border-white/30 shrink-0">
                  <i className="hgi hgi-stroke hgi-customer-support text-xl text-white" />
                  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-400 border-2 border-primary-darker" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight text-white flex items-center gap-1.5">
                    {config.assistantName}
                  </h4>
                  <p className="text-[11px] text-emerald-200/90 font-medium">
                    En ligne • Conseils & Service Client
                  </p>
                </div>
              </div>

              {/* Actions Header */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openWhatsapp()}
                  title="Discuter directement sur WhatsApp"
                  className="size-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <i className="hgi hgi-stroke hgi-whatsapp text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le chat"
                  className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <i className="hgi hgi-stroke hgi-multiplication-sign text-lg" />
                </button>
              </div>
            </div>

            {/* Quick banner info */}
            <div className="bg-emerald-50 px-4 py-1.5 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
              <span className="flex items-center gap-1.5">
                <i className="hgi hgi-stroke hgi-gift text-xs text-primary" /> Code promo -10% : <strong className="font-bold">SULSON10</strong>
              </span>
              <button
                onClick={() => openWhatsapp()}
                className="text-primary hover:underline font-bold text-[11px] inline-flex items-center gap-0.5"
              >
                WhatsApp direct <i className="hgi hgi-stroke hgi-arrow-right-02 text-xs" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-xs font-medium"
                        : "bg-white text-gray-800 rounded-bl-xs border border-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* WhatsApp Redirect Button (if fallback or requested) */}
                    {msg.showWhatsappButton && (
                      <div className="mt-3 pt-2.5 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => openWhatsapp(msg.whatsappMessage)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                        >
                          <i className="hgi hgi-stroke hgi-whatsapp text-base" />
                          <span>Discuter sur WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && msg.sender === "bot" && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (chip === "Discuter sur WhatsApp") {
                              openWhatsapp();
                            } else {
                              handleSend(chip);
                            }
                          }}
                          className="text-[11px] font-semibold bg-white hover:bg-primary hover:text-white text-gray-700 border border-gray-200 hover:border-primary px-2.5 py-1 rounded-full transition-all shadow-2xs text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Realistic typing simulation with animation & status */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 max-w-[85%]"
                >
                  <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                    <i className="hgi hgi-stroke hgi-customer-support text-xs" />
                  </div>
                  <div className="bg-gray-50 border border-gray-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2 shadow-2xs flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-medium italic">
                      En train d'écrire
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-duration:0.8s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:border-primary focus-within:bg-white transition-all shadow-inner">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question sur nos épices..."
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                  aria-label="Envoyer le message"
                  className="size-8 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-xs"
                >
                  <i className="hgi hgi-stroke hgi-sent text-base" />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-2">
                <button
                  type="button"
                  onClick={() => openWhatsapp()}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <i className="hgi hgi-stroke hgi-whatsapp text-sm" />
                  <span>Joindre la conseillère WhatsApp</span>
                </button>
                <span className="text-[10px] text-gray-400">Les Épices de Sulson</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble Button ── */}
      <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end">
        {/* Tooltip Bubble at start */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="mb-3 bg-white text-gray-900 border border-gray-100 shadow-xl rounded-2xl py-2 px-3.5 text-xs font-semibold flex items-center gap-2 cursor-pointer hover:border-primary transition-all max-w-[240px]"
            >
              <i className="hgi hgi-stroke hgi-bubble-chat text-base text-primary shrink-0" />
              <span>Besoin d'un conseil pour vos épices ? <strong>Discutez ici !</strong></span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-gray-600 ml-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Main Bubble Button */}
        <motion.button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
            setHasUnread(false);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Ouvrir l'assistant Les Épices de Sulson"
          className="relative size-14 sm:size-15 rounded-full bg-gradient-to-tr from-primary-darker via-primary to-amber-500 text-white shadow-xl flex items-center justify-center border-2 border-white/80 cursor-pointer group"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping [animation-duration:3s]" />

          {/* Icon */}
          <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:rotate-12">
            {isOpen ? (
              <i className="hgi hgi-stroke hgi-multiplication-sign text-2xl" />
            ) : (
              <i className="hgi hgi-stroke hgi-bubble-chat-notification text-2xl" />
            )}
          </span>

          {/* Online green indicator badge */}
          <span className="absolute top-0 right-0 size-4 rounded-full bg-emerald-400 border-2 border-white shadow-xs" />
        </motion.button>
      </div>
    </>
  );
}
