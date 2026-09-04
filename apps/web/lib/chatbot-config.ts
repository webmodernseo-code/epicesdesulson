export interface ChatbotConfig {
  whatsappNumber: string;
  assistantName: string;
  welcomeMessage: string;
  defaultWhatsappMessage: string;
  isEnabled: boolean;
}

export const DEFAULT_CHATBOT_CONFIG: ChatbotConfig = {
  whatsappNumber: "+33612345678",
  assistantName: "Assistante Les Épices de Sulson",
  welcomeMessage:
    "Bonjour ! Ici l'assistante Les Épices de Sulson 🌿 Comment allez-vous et comment puis-je vous aider aujourd'hui ?",
  defaultWhatsappMessage:
    "Bonjour ! J'aimerais avoir des renseignements sur vos épices et produits Les Épices de Sulson.",
  isEnabled: true,
};

const STORAGE_KEY = "sulson_chatbot_config_v1";

export function getChatbotConfig(): ChatbotConfig {
  if (typeof window === "undefined") {
    return DEFAULT_CHATBOT_CONFIG;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CHATBOT_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_CHATBOT_CONFIG;
}

export function saveChatbotConfig(config: Partial<ChatbotConfig>): ChatbotConfig {
  const current = getChatbotConfig();
  const updated = { ...current, ...config };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // Dispatch custom event so listeners in the current tab/window update immediately
      window.dispatchEvent(new Event("sulson_chatbot_config_updated"));
    } catch {
      // ignore
    }
  }
  return updated;
}

export function formatWhatsappUrl(number: string, message: string): string {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
