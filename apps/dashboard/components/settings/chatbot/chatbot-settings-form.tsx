"use client";

import React, { useState, useEffect } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getChatbotConfig,
  saveChatbotConfig,
  formatWhatsappUrl,
  type ChatbotConfig,
  DEFAULT_CHATBOT_CONFIG,
} from "@/lib/chatbot-config";
import { CustomerSupportIcon } from "@/icons";

export default function ChatbotSettingsForm() {
  const [config, setConfig] = useState<ChatbotConfig>(DEFAULT_CHATBOT_CONFIG);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setConfig(getChatbotConfig());
  }, []);

  const handleSave = () => {
    saveChatbotConfig(config);
    setIsSaved(true);
    toast.success("Configuration WhatsApp et Chatbot enregistrée avec succès !");
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CHATBOT_CONFIG);
    saveChatbotConfig(DEFAULT_CHATBOT_CONFIG);
    toast.info("Paramètres réinitialisés aux valeurs par défaut");
  };

  const testUrl = formatWhatsappUrl(
    config.whatsappNumber,
    config.defaultWhatsappMessage || "Bonjour, je vous contacte depuis le site Les Épices de Sulson."
  );

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-primary-dark to-primary p-6 sm:p-8 rounded-3xl text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-amber-200 mb-3">
              <CustomerSupportIcon className="size-4 text-amber-200" /> Module Chatbot & Assistance WhatsApp
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-urbanist text-white">
              Gestion du Contact WhatsApp & Assistant Client
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1.5 leading-relaxed">
              Configurez le numéro WhatsApp vers lequel les clients sont redirigés en cas de question non résolue par le chatbot. Les modifications sont appliquées instantanément sur la boutique.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={testUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-xs transition-all hover:scale-105"
            >
              <span>📱</span> Tester le lien WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <DashboardCard title="Coordonnées WhatsApp & Redirection">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Numéro WhatsApp de la boutique (avec indicatif international)
              </label>
              <input
                type="text"
                value={config.whatsappNumber}
                onChange={(e) =>
                  setConfig({ ...config, whatsappNumber: e.target.value })
                }
                placeholder="+33 6 12 34 56 78 ou +241 ..."
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-primary focus:outline-none shadow-xs"
              />
              <p className="text-[11px] text-gray-500 mt-1.5">
                Exemples : <span className="font-mono text-gray-700">+33612345678</span> (France) ou <span className="font-mono text-gray-700">+241XXXXXXXX</span>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Nom de l'Assistante affiché aux clients
              </label>
              <input
                type="text"
                value={config.assistantName}
                onChange={(e) =>
                  setConfig({ ...config, assistantName: e.target.value })
                }
                placeholder="Assistante Les Épices de Sulson"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-primary focus:outline-none shadow-xs"
              />
              <p className="text-[11px] text-gray-500 mt-1.5">
                Nom qui apparaît en haut de la bulle de discussion.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Message d'accueil initial du Chatbot
            </label>
            <textarea
              rows={3}
              value={config.welcomeMessage}
              onChange={(e) =>
                setConfig({ ...config, welcomeMessage: e.target.value })
              }
              placeholder="Bonjour ! Ici l'assistante Les Épices de Sulson 🌿 Comment allez-vous et comment puis-je vous aider aujourd'hui ?"
              className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:border-primary focus:outline-none shadow-xs"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Premier message envoyé automatiquement au client dès l'ouverture du chat.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Texte par défaut pré-rempli lors de la redirection WhatsApp
            </label>
            <textarea
              rows={2}
              value={config.defaultWhatsappMessage}
              onChange={(e) =>
                setConfig({ ...config, defaultWhatsappMessage: e.target.value })
              }
              placeholder="Bonjour ! J'aimerais avoir des renseignements sur vos épices et produits Les Épices de Sulson."
              className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:border-primary focus:outline-none shadow-xs"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Ce message sera pré-rempli dans l'application WhatsApp du client lorsqu'il clique sur le bouton de contact.
            </p>
          </div>

          {/* Toggle status */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Statut du Chatbot sur la boutique
              </h4>
              <p className="text-xs text-gray-500">
                Activer ou masquer la bulle flottante sur le site public.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.isEnabled}
                onChange={(e) =>
                  setConfig({ ...config, isEnabled: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </DashboardCard>

      {/* Save Button Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="size-2 rounded-full bg-emerald-500 inline-block" />
          <span>Synchronisation instantanée avec le site public (Port 3000)</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl shadow-xs"
          >
            {isSaved ? "✓ Enregistré !" : "Enregistrer les modifications"}
          </Button>
        </div>
      </div>
    </div>
  );
}
