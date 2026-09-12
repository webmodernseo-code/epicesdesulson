"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  getChatbotConfig,
  formatWhatsappUrl,
  type ChatbotConfig,
  DEFAULT_CHATBOT_CONFIG,
} from "@/lib/chatbot-config";
import {
  generateBotReply,
  type BotMessage,
} from "@/lib/chatbot-engine";
import {
  Send,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

// Official Pure SVG Icons
function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.05-1.927-.487-1.503-.625-2.434-2.155-2.508-2.253-.075-.098-.598-.797-.598-1.518 0-.722.378-1.077.514-1.223.136-.146.297-.183.396-.183.099 0 .198.001.284.006.09.004.21-.034.329.252.122.293.418 1.019.454 1.093.036.073.06.16.012.257-.048.098-.073.159-.145.244-.073.085-.153.19-.219.255-.073.072-.15.15-.064.298.086.147.382.63 1.025 1.202.825.736 1.52.964 1.734 1.071.214.107.339.089.465-.054.126-.143.54-.63.684-.847.144-.217.288-.18.484-.108.196.072 1.246.588 1.46.695.214.107.357.161.409.25.052.089.052.518-.092.923zM12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.659 1.442 5.168L2 22l4.981-1.396C8.423 21.502 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.15-.494-4.417-1.341l-.317-.213-2.963.83.829-2.925-.231-.328A8.158 8.158 0 013.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
    </svg>
  );
}

const DEFAULT_PROMPTS = [
  "🍗 Épice pour le poulet",
  "🥩 Épice pour la viande",
  "🐟 Épice pour le poisson",
  "🎁 Pack Intégral 4 Saveurs",
  "🚚 Délais de livraison",
  "🏷️ Code promo -10%",
];

export default function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>(DEFAULT_CHATBOT_CONFIG);
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activePrompts, setActivePrompts] = useState<string[]>(DEFAULT_PROMPTS);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load configuration
  useEffect(() => {
    setConfig(getChatbotConfig());

    const handleConfigUpdate = () => {
      setConfig(getChatbotConfig());
    };

    const handleOpenChatbot = () => {
      setIsOpen(true);
      setShowTooltip(false);
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

  // Initialize first welcome message
  useEffect(() => {
    const welcome = config.welcomeMessage || DEFAULT_CHATBOT_CONFIG.welcomeMessage;
    setMessages([
      {
        id: "welcome-1",
        sender: "bot",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickPrompts: DEFAULT_PROMPTS,
      },
    ]);

    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [config.welcomeMessage]);

  // Smooth scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

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

    // Realistic human typing simulation (1.2s to 2.0s)
    const typingDuration = Math.floor(Math.random() * 600) + 1200;

    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMsg: BotMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: reply.action,
        showWhatsappButton: reply.showWhatsappButton,
        whatsappMessage: reply.whatsappMessage || text,
        quickPrompts: reply.quickPrompts,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (reply.quickPrompts && reply.quickPrompts.length > 0) {
        setActivePrompts(reply.quickPrompts);
      }
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

  const resetConversation = () => {
    const welcome = config.welcomeMessage || DEFAULT_CHATBOT_CONFIG.welcomeMessage;
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickPrompts: DEFAULT_PROMPTS,
      },
    ]);
    setActivePrompts(DEFAULT_PROMPTS);
  };

  if (!config.isEnabled) return null;

  return (
    <>
      {/* ── Chat Window (Luxury / Concierge Style) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-60 flex h-[100dvh] w-full flex-col overflow-hidden bg-white text-gray-900 sm:inset-auto sm:bottom-22 sm:right-6 sm:h-[580px] sm:max-h-[84vh] sm:w-[410px] sm:rounded-3xl sm:border sm:border-gray-200/90 sm:shadow-2xl"
          >
            {/* Header */}
            <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-gray-800 bg-gray-900 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/10 p-1 sm:size-10 sm:rounded-2xl">
                  <Image
                    src="/images/logo-sulson-trimmed.png"
                    alt="Sulson"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <span className="absolute top-1 right-1 size-2 rounded-full bg-emerald-400 ring-2 ring-gray-900 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <h4 className="flex min-w-0 items-center gap-1.5 truncate text-sm font-bold leading-tight text-white">
                    {config.assistantName || "Conseillère Sulson"}
                    <span className="hidden shrink-0 rounded-full border border-emerald-800/60 bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 min-[390px]:inline-flex">
                      En ligne
                    </span>
                  </h4>
                  <p className="truncate text-[10px] text-gray-400 sm:text-[11px]">
                    Conseils culinaires & service client
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={resetConversation}
                  title="Recommencer la discussion"
                  className="hidden size-8 items-center justify-center rounded-xl bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white min-[360px]:flex cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => openWhatsapp()}
                  title="Ouvrir WhatsApp direct"
                  className="size-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer"
                  className="size-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Micro-Notification Banner */}
            <div className="bg-emerald-50/90 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-950">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Code -10% : <strong className="font-bold text-emerald-900 font-mono">SULSON10</strong></span>
              </span>
              <button
                type="button"
                onClick={() => openWhatsapp()}
                className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/60">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed transition-all ${
                        isUser
                          ? "bg-gray-900 text-white rounded-br-xs font-medium shadow-2xs"
                          : "bg-white text-gray-800 rounded-bl-xs border border-gray-200/80 shadow-2xs"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Embedded Action Button (Product Link or WhatsApp) */}
                      {msg.action && (
                        <div className="mt-3 pt-2.5 border-t border-gray-100">
                          {msg.action.type === "link" && msg.action.url ? (
                            <Link
                              href={msg.action.url}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs"
                            >
                              <span>{msg.action.label}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openWhatsapp(msg.whatsappMessage)}
                              className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                            >
                              <WhatsappIcon className="w-4 h-4" />
                              <span>{msg.action.label}</span>
                            </button>
                          )}
                        </div>
                      )}

                      {/* Fallback WhatsApp Button */}
                      {!msg.action && msg.showWhatsappButton && (
                        <div className="mt-3 pt-2.5 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => openWhatsapp(msg.whatsappMessage)}
                            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                          >
                            <WhatsappIcon className="w-4 h-4" />
                            <span>Échanger sur WhatsApp (+33 6 95 54 57 23)</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Realistic Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="bg-white rounded-2xl rounded-bl-xs px-4 py-3 border border-gray-200/80 shadow-2xs flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-2 rounded-full bg-emerald-600 animate-bounce" />
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium animate-pulse">
                    La conseillère rédige sa réponse...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Quick Suggestion Pills (Clean & Organized Bar) */}
            {activePrompts.length > 0 && !isTyping && (
              <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider shrink-0 mr-1">
                  Suggestions :
                </span>
                {activePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-xs font-medium text-gray-700 hover:text-emerald-800 bg-gray-50 hover:bg-emerald-50 border border-gray-200/90 hover:border-emerald-300 px-3 py-1 rounded-full whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3.5 bg-white border-t border-gray-200 shrink-0">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question (recette, plat, livraison)..."
                  className="w-full bg-gray-50 border border-gray-300/80 focus:border-emerald-600 focus:bg-white rounded-2xl pl-4 pr-11 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                  aria-label="Envoyer"
                  className="absolute right-1.5 size-8 rounded-xl bg-gray-900 hover:bg-emerald-700 disabled:opacity-30 disabled:hover:bg-gray-900 text-white flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Conseiller officiel Les Épices de Sulson</span>
                </span>
                <span>WhatsApp : 06 95 54 57 23</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger Floating Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Tooltip speech bubble */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="hidden sm:flex items-center gap-2.5 bg-white text-gray-900 px-4 py-2.5 rounded-2xl shadow-xl border border-gray-200/90 text-xs font-semibold cursor-pointer hover:shadow-2xl transition-all"
            >
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Besoin d&apos;une idée de recette ? Discutez avec nous !</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          aria-label="Ouvrir le chat Sulson"
          className="relative size-14 rounded-2xl bg-gray-900 text-white shadow-xl hover:shadow-2xl border border-gray-800 flex items-center justify-center cursor-pointer transition-colors hover:bg-emerald-900"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <Image
                src="/images/logo-sulson-trimmed.png"
                alt="Sulson"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
