export interface Message {
  id: string;
  content: string;
  sender: "me" | "other" | "bot";
  time: string;
  type?: "text" | "order_event" | "ai_suggestion";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  initials: string;
  orderNumber?: string;
  orderStatus?: string;
  orderTotal?: number;
  shippingAddress?: string;
  itemsCount?: number;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isActive?: boolean;
  category: "all" | "customers" | "support" | "ai";
  messages: Message[];
}

export const INITIAL_AI_USER: User = {
  id: "ai-chef-sulson",
  name: "Assistant IA Sulson (Chef Sulson Pro)",
  email: "assistant@epicesdesulson.com",
  avatar: "/images/logo.png",
  initials: "IA",
  lastMessage: "Posez-moi une question sur nos épices, recettes ou commandes clients...",
  time: "En direct",
  isActive: true,
  category: "ai",
  messages: [
    {
      id: "m_ai_1",
      content: "Bonjour Chef ! Je suis votre Assistant IA Sulson. Je peux vous aider à rédiger des réponses clients, calculer les dosages d'épices, expliquer les règles de livraison ou générer des idées de recettes.",
      sender: "bot",
      time: "En direct",
      type: "text",
    },
  ],
};
