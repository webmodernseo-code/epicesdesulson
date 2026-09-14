"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Zap,
  AlertCircle,
} from "lucide-react";

/* ─── PURE VECTOR SVGS (Pixel-Perfect, Zero Pixellation) ─── */

export function VisaSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#1434CB" />
      <path
        d="M19.5 21L22 9H25.1L22.6 21H19.5ZM31.8 9.3C31.1 9 30 8.8 28.7 8.8C25.5 8.8 23.2 10.5 23.2 12.9C23.2 14.8 24.8 15.7 26 16.4C27.3 17.1 27.7 17.5 27.7 18.2C27.7 19.1 26.5 19.7 25.4 19.7C24 19.7 23 19.4 21.8 18.9L21.3 21.4C22.5 22 24.2 22.2 25.8 22.2C29.3 22.2 31.4 20.5 31.4 18.1C31.4 16.5 30.3 15.3 28.5 14.4C27.4 13.8 26.8 13.4 26.8 12.8C26.8 12.1 27.6 11.4 29 11.4C30.1 11.4 31 11.7 31.7 12L31.8 9.3ZM38.8 21H41.5L39.2 9H36.8C36.2 9 35.6 9.4 35.4 10.1L30.8 21H34L34.7 19.1H38.4L38.8 21ZM35.5 16.9L37 12.2L37.9 16.9H35.5ZM18.5 9H15.4C14.7 9 14.1 9.4 13.8 10L9.5 21H12.8L13.5 19.2C13.8 19.2 16.5 19.2 16.9 19.2C17 19.6 17.4 21 17.4 21H20.3L18.5 9Z"
        fill="white"
      />
    </svg>
  );
}

export function MastercardSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="30" rx="4" fill="#222326" />
      <circle cx="18" cy="15" r="8.5" fill="#EB001B" />
      <circle cx="30" cy="15" r="8.5" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M24 8.8C26.1 10.4 27.5 12.6 27.5 15C27.5 17.4 26.1 19.6 24 21.2C21.9 19.6 20.5 17.4 20.5 15C20.5 12.6 21.9 10.4 24 8.8Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

/** Official Pure Apple Pay Logo Vector (Apple glyph + "Pay" typography) */
export function ApplePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        {/* Apple glyph */}
        <path d="M19.78 0.5c1.02 1.29 1.63 3.09 1.42 4.9-1.57.07-3.44-.93-4.42-2.21-.87-1.14-1.6-2.96-1.38-4.75 1.76-.14 3.44.83 4.38 2.06zM22.21 7.08c-2.49-.15-4.61 1.42-5.79 1.42-1.21 0-3.01-1.35-4.99-1.31-2.57.04-4.95 1.5-6.27 3.82-2.7 4.67-.7 11.57 1.91 15.35 1.28 1.85 2.8 3.9 4.8 3.82 1.92-.08 2.66-1.24 4.99-1.24 2.3 0 2.98 1.24 4.99 1.2 2.06-.04 3.37-1.87 4.63-3.72 1.46-2.14 2.06-4.21 2.09-4.32-.04-.02-4.01-1.55-4.06-6.13-.04-3.84 3.14-5.67 3.28-5.76-1.8-2.64-4.6-2.94-5.57-2.99z" />
        {/* P */}
        <path d="M37.8 6.34h10.31c5.22 0 8.38 3.15 8.38 7.69 0 4.58-3.18 7.72-8.38 7.72h-4.88v9.63H37.8V6.34zm5.43 11.37h4.56c2.91 0 4.3-1.51 4.3-3.67 0-2.14-1.39-3.65-4.3-3.65h-4.56v7.32z" />
        {/* a */}
        <path d="M60.81 21.62c0-4.32 3.45-6.77 9.58-7.12l4.8-.27v-1.45c0-2.09-1.58-3.3-4.3-3.3-2.26 0-4.22.85-5.38 2.22l-2.97-2.5c1.97-2.36 5.15-3.61 8.75-3.61 5.5 0 8.77 3 8.77 7.97v15.53h-4.37v-3.31c-1.6 2.34-4.4 3.72-7.5 3.72-4.61 0-7.4-2.98-7.4-7.87zm14.39-2.41v-1.89l-4.25.25c-3.35.21-5.45 1.56-5.45 4.12 0 2.36 1.83 3.77 4.65 3.77 2.96 0 5.04-2.3 5.04-6.25z" />
        {/* y */}
        <path d="M81.95 10.03h5.38l6.1 16.24 6.08-16.24h5.36l-10.1 24.33c-1.94 4.64-4.48 6.32-8.62 6.32-1.16 0-2.34-.23-3.28-.63v-4.22c.87.37 1.69.5 2.54.5 2.39 0 3.77-1.01 4.96-4.06l.57-1.45-8.98-20.79z" />
      </g>
    </svg>
  );
}

/** Official Apple Pay Rounded Badge (for tabs, summaries and cards) */
export function ApplePayBadgeSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="84" height="36" rx="7" fill="#000000" />
      <g fill="#FFFFFF" transform="translate(6, 1) scale(0.65)">
        {/* Apple glyph */}
        <path d="M19.78 0.5c1.02 1.29 1.63 3.09 1.42 4.9-1.57.07-3.44-.93-4.42-2.21-.87-1.14-1.6-2.96-1.38-4.75 1.76-.14 3.44.83 4.38 2.06zM22.21 7.08c-2.49-.15-4.61 1.42-5.79 1.42-1.21 0-3.01-1.35-4.99-1.31-2.57.04-4.95 1.5-6.27 3.82-2.7 4.67-.7 11.57 1.91 15.35 1.28 1.85 2.8 3.9 4.8 3.82 1.92-.08 2.66-1.24 4.99-1.24 2.3 0 2.98 1.24 4.99 1.2 2.06-.04 3.37-1.87 4.63-3.72 1.46-2.14 2.06-4.21 2.09-4.32-.04-.02-4.01-1.55-4.06-6.13-.04-3.84 3.14-5.67 3.28-5.76-1.8-2.64-4.6-2.94-5.57-2.99z" />
        {/* P */}
        <path d="M37.8 6.34h10.31c5.22 0 8.38 3.15 8.38 7.69 0 4.58-3.18 7.72-8.38 7.72h-4.88v9.63H37.8V6.34zm5.43 11.37h4.56c2.91 0 4.3-1.51 4.3-3.67 0-2.14-1.39-3.65-4.3-3.65h-4.56v7.32z" />
        {/* a */}
        <path d="M60.81 21.62c0-4.32 3.45-6.77 9.58-7.12l4.8-.27v-1.45c0-2.09-1.58-3.3-4.3-3.3-2.26 0-4.22.85-5.38 2.22l-2.97-2.5c1.97-2.36 5.15-3.61 8.75-3.61 5.5 0 8.77 3 8.77 7.97v15.53h-4.37v-3.31c-1.6 2.34-4.4 3.72-7.5 3.72-4.61 0-7.4-2.98-7.4-7.87zm14.39-2.41v-1.89l-4.25.25c-3.35.21-5.45 1.56-5.45 4.12 0 2.36 1.83 3.77 4.65 3.77 2.96 0 5.04-2.3 5.04-6.25z" />
        {/* y */}
        <path d="M81.95 10.03h5.38l6.1 16.24 6.08-16.24h5.36l-10.1 24.33c-1.94 4.64-4.48 6.32-8.62 6.32-1.16 0-2.34-.23-3.28-.63v-4.22c.87.37 1.69.5 2.54.5 2.39 0 3.77-1.01 4.96-4.06l.57-1.45-8.98-20.79z" />
      </g>
    </svg>
  );
}

/** Official Google Pay Pure Vector SVG */
export function GooglePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="84" height="36" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
      {/* G Logo */}
      <path
        d="M23.6 18.2c0-.6-.1-1.2-.2-1.8H14v3.4h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 2.9-4.1 2.9-6.9z"
        fill="#4285F4"
      />
      <path
        d="M14 28c2.7 0 5-1 6.6-2.5l-3.1-2.4c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H5V22.3C6.7 25.7 10.1 28 14 28z"
        fill="#34A853"
      />
      <path
        d="M8.2 19.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8v-2.5H5C4.3 15 4 16.5 4 18s.3 3 1 4.3l3.2-2.5z"
        fill="#FBBC04"
      />
      <path
        d="M14 11.6c1.5 0 2.8.5 3.8 1.5l2.9-2.9C18.9 8.6 16.7 7.7 14 7.7 10.1 7.7 6.7 10 5 13.4l3.2 2.5c.8-2.4 3.1-4.3 5.8-4.3z"
        fill="#EA4335"
      />
      {/* Pay Text */}
      <path
        d="M32.8 11.5h4.6c1.5 0 2.6.4 3.4 1.2.8.8 1.2 1.8 1.2 3.1 0 1.3-.4 2.3-1.2 3.1-.8.8-1.9 1.2-3.4 1.2h-2.3v5.6h-2.3V11.5zm2.3 6.6h2.2c.8 0 1.4-.2 1.8-.7.4-.5.7-1.1.7-1.9s-.2-1.4-.7-1.9c-.4-.5-1-.7-1.8-.7h-2.2v5.2z"
        fill="#5F6368"
      />
      <path
        d="M48.7 21.2c0-1.4.5-2.5 1.5-3.2 1-.7 2.3-1.1 3.9-1.1h2.7v-.8c0-.9-.2-1.6-.7-2-.5-.5-1.3-.7-2.2-.7-.8 0-1.5.2-2 .6-.5.4-.9 1-1.1 1.7l-2.1-.9c.4-1.1 1-1.9 1.9-2.6 1-.7 2.2-1 3.6-1 1.6 0 2.9.4 3.9 1.3 1 .9 1.4 2.1 1.4 3.8v9.4h-2.2v-2.1c-1 1.6-2.5 2.4-4.3 2.4-1.4 0-2.6-.4-3.5-1.2-.9-.8-1.3-1.9-1.3-3.2zm6.9-1v-.9h-2.4c-.9 0-1.6.2-2 .7-.4.5-.7 1-.7 1.7 0 .7.3 1.2.8 1.6.5.4 1.1.6 1.9.6 1.1 0 1.8-.4 2.4-1.1.4-.6.7-1.3.7-2.6z"
        fill="#5F6368"
      />
      <path
        d="M66.4 15.6h2.5l4.3 10.7 4.1-10.7h2.5l-6.8 16.3c-.9 2.2-2.3 3.3-4.3 3.3-.7 0-1.3-.1-1.8-.4v-2c.4.2.9.3 1.4.3 1 0 1.8-.5 2.3-1.6l.6-1.5-4.8-14.4z"
        fill="#5F6368"
      />
    </svg>
  );
}

/** Official PayPal Pure Vector SVG */
export function PaypalSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-.02682843 0 123.63183286 30.17842908"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PayPal"
    >
      <path
        d="m46.211 6.749h-6.839a.95.95 0 0 0 -.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zm.789 6.405c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zm19.654-.079h-3.275a.57.57 0 0 0 -.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0 -.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zm22.007-6.374h-3.291a.954.954 0 0 0 -.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0 -.912-.678h-3.234a.57.57 0 0 0 -.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0 -.468-.895z"
        fill="#253b80"
      />
      <path
        d="m94.992 6.749h-6.84a.95.95 0 0 0 -.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zm19.653-.079h-3.273a.567.567 0 0 0 -.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0 -.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zm8.426-12.219-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0 -.562-.659h-3.16a.571.571 0 0 0 -.562.482z"
        fill="#179bd7"
      />
      <path
        d="m7.266 29.154.523-3.322-1.165-.027h-5.563l3.866-24.513a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1 -1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0 -.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1 -.096.035z"
        fill="#253b80"
      />
      <path
        d="m23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545h-2.752c-.661 0-1.218.48-1.321 1.132l-1.409 8.936-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0 -1.336-1.03z"
        fill="#179bd7"
      />
      <path
        d="m21.754 7.151a9.757 9.757 0 0 0 -1.203-.267 15.284 15.284 0 0 0 -2.426-.177h-7.352a1.172 1.172 0 0 0 -1.159.992l-1.564 9.906-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0 -1.017-.429 9.045 9.045 0 0 0 -.277-.087z"
        fill="#222d65"
      />
      <path
        d="m9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392-1.399-1.593-3.924-2.275-7.155-2.275h-9.38c-.66 0-1.223.48-1.325 1.133l-3.907 24.765a.806.806 0 0 0 .795.932h5.791l1.454-9.225z"
        fill="#253b80"
      />
    </svg>
  );
}

export const OfficialPaypalLogo = PaypalSvg;

/* ─── TYPES & INTERFACES ─── */

export type PaymentTabType = "card" | "apple_pay" | "paypal";

export interface CardFormData {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCard?: boolean;
}

const defaultCardData: CardFormData = {
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
  saveCard: false,
};

interface PaymentMethodProps {
  cardData?: CardFormData;
  onCardDataChange?: (field: keyof CardFormData, value: any) => void;
  selectedMethod?: PaymentTabType;
  onSelectMethod?: (method: PaymentTabType) => void;
  totalAmountFormatted?: string;
  isProcessing?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  errorMessage?: string | null;
  isPayPalAvailable?: boolean;
}

export default function PaymentMethodV1({
  cardData = defaultCardData,
  onCardDataChange = () => {},
  selectedMethod = "card",
  onSelectMethod = () => {},
  totalAmountFormatted = "0,00 €",
  isProcessing = false,
  onSubmit = (e) => e.preventDefault(),
  errorMessage,
  isPayPalAvailable = false,
}: PaymentMethodProps = {}) {
  const [activeTab, setActiveTab] = useState<PaymentTabType>(selectedMethod);
  const [showCvcHelper, setShowCvcHelper] = useState(false);

  const handleTabChange = (tab: PaymentTabType) => {
    setActiveTab(tab);
    onSelectMethod(tab);
  };

  // Dynamic Card Brand Detection
  const getCardBrand = (number: string): "visa" | "mastercard" | "unknown" => {
    const clean = number.replace(/\D/g, "");
    if (!clean) return "unknown";
    if (clean.startsWith("4")) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    return "unknown";
  };

  const currentBrand = getCardBrand(cardData.cardNumber);

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    onCardDataChange("cardNumber", formatted);
  };

  // Format Expiry (MM/AA)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 2) {
      const mm = parseInt(value.slice(0, 2), 10);
      if (mm > 12) value = `12${value.slice(2)}`;
      else if (mm === 0) value = `01${value.slice(2)}`;
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    onCardDataChange("expiryDate", value);
  };

  // Format CVC (3 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    onCardDataChange("cvc", value);
  };

  // Sync activeTab with parent prop
  React.useEffect(() => {
    if (selectedMethod && selectedMethod !== activeTab) {
      setActiveTab(selectedMethod);
    }
  }, [selectedMethod]);

  return (
    <div className="border border-gray-200/90 rounded-2xl bg-white shadow-2xs overflow-hidden transition-all">
      {/* ─── Header Apple / Stripe Style ─── */}
      <div className="py-4 sm:py-5 px-5 sm:px-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <span className="size-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
            2
          </span>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-950 tracking-tight">
              Paiement sécurisé
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Toutes les transactions sont chiffrées et sécurisées
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-full border border-emerald-200/70 font-semibold shadow-2xs whitespace-nowrap shrink-0">
            <Lock className="size-3.5 text-emerald-600" />
            <span>SSL 256-bit</span>
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* ─── Mode de Paiement : Liste Accordion Verticale (Style Stripe & Apple) ─── */}
        <div className="space-y-3.5">
          {/* ─── OPTION 1 : CARTE BANCAIRE (VISA / MASTERCARD) ─── */}
          <div
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              activeTab === "card"
                ? "border-emerald-600 bg-white shadow-xs ring-1 ring-emerald-600/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* Header / Bouton Radio */}
            <button
              type="button"
              onClick={() => handleTabChange("card")}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    activeTab === "card"
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {activeTab === "card" && <div className="size-2 rounded-full bg-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-gray-950">Carte bancaire</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Règlement sécurisé par Visa, Mastercard ou CB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <VisaSvg className="h-5 sm:h-5.5 w-auto" />
                <MastercardSvg className="h-5 sm:h-5.5 w-auto" />
              </div>
            </button>

            {/* Formulaire Carte Bancaire Déplié */}
            {activeTab === "card" && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-gray-100 bg-gray-50/40">
                <form onSubmit={onSubmit} className="space-y-4 pt-2">
                  {/* Titulaire de la carte */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                      Titulaire de la carte <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jean Dupont"
                      value={cardData.nameOnCard}
                      onChange={(e) => onCardDataChange("nameOnCard", e.target.value)}
                      className="w-full h-11 sm:h-12 px-4 text-base sm:text-sm rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition placeholder:text-gray-400"
                    />
                  </div>

                  {/* Numéro de carte avec détection dynamique de la marque */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-semibold text-gray-800">
                        Numéro de carte bancaire <span className="text-red-500">*</span>
                      </label>
                      <span className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-emerald-600" />
                        <span>3D Secure 2.0</span>
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4242 •••• •••• 4242"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="w-full h-11 sm:h-12 px-4 pr-16 text-base sm:text-sm font-mono tracking-wider rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                      />

                      {/* Dynamic Brand Logo inside input */}
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        {currentBrand === "visa" ? (
                          <VisaSvg className="h-5.5 w-auto shadow-2xs" />
                        ) : currentBrand === "mastercard" ? (
                          <MastercardSvg className="h-5.5 w-auto shadow-2xs" />
                        ) : (
                          <div className="flex items-center gap-1 opacity-70">
                            <VisaSvg className="h-4.5 w-auto" />
                            <MastercardSvg className="h-4.5 w-auto" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date d'expiration & CVC alignés */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                        Expiration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={cardData.expiryDate}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className="w-full h-11 sm:h-12 px-4 text-base sm:text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-semibold text-gray-800">
                          CVC / CVV <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowCvcHelper(!showCvcHelper)}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          title="Aide CVC"
                        >
                          <HelpCircle className="size-4" />
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={handleCvcChange}
                          maxLength={3}
                          className="w-full h-11 sm:h-12 px-4 pr-9 text-base sm:text-sm font-mono rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                        />
                        <Lock className="size-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* CVC Info Bubble if toggled */}
                  {showCvcHelper && (
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 flex items-start gap-2.5">
                      <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        Le code de sécurité CVC correspond aux <strong>3 derniers chiffres</strong> situés au verso de votre carte bancaire.
                      </span>
                    </div>
                  )}

                  {/* Checkbox "Mémoriser cette carte" */}
                  <label className="flex items-center gap-3 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={cardData.saveCard || false}
                      onChange={(e) => onCardDataChange("saveCard", e.target.checked)}
                      className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-700">
                      Enregistrer cette carte pour mes futurs achats en toute sécurité
                    </span>
                  </label>

                  {/* Message d'erreur clair si applicable */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs sm:text-sm text-red-700 font-medium leading-relaxed flex items-start gap-2.5">
                      <AlertCircle className="size-4.5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Information de paiement requise</p>
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Bouton de Paiement Carte Principal */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full h-12 sm:h-13 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          <span>Validation du paiement sécurisé...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="size-4.5" />
                          <span>Payer {totalAmountFormatted}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ─── OPTION 2 : APPLE PAY & GOOGLE PAY ─── */}
          <div
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              activeTab === "apple_pay"
                ? "border-emerald-600 bg-white shadow-xs ring-1 ring-emerald-600/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* Header / Bouton Radio */}
            <button
              type="button"
              onClick={() => handleTabChange("apple_pay")}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    activeTab === "apple_pay"
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {activeTab === "apple_pay" && <div className="size-2 rounded-full bg-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-gray-950">Apple Pay & Google Pay</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Paiement express et instantané en 1 clic
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <ApplePayBadgeSvg className="h-5 sm:h-5.5 w-auto" />
                <GooglePaySvg className="h-5 sm:h-5.5 w-auto" />
              </div>
            </button>

            {/* Body Apple Pay & Google Pay Déplié */}
            {activeTab === "apple_pay" && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-gray-100 bg-gray-50/40 space-y-4">
                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                  <Zap className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Réglez instantanément avec Face ID, Touch ID ou Google Wallet sans devoir saisir manuellement votre numéro de carte.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Bouton Apple Pay Officiel */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={onSubmit}
                    className="w-full h-12 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white font-medium rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="size-5 animate-spin text-white" />
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <ApplePaySvg className="h-6 w-auto text-white shrink-0" />
                        <span className="font-bold text-sm text-white">• {totalAmountFormatted}</span>
                      </div>
                    )}
                  </button>

                  {/* Bouton Google Pay Officiel */}
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={onSubmit}
                    className="w-full h-12 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-900 border border-gray-300 font-medium rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Loader2 className="size-5 animate-spin text-gray-700" />
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <GooglePaySvg className="h-6 w-auto shrink-0" />
                        <span className="font-bold text-sm text-gray-900">• {totalAmountFormatted}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─── OPTION 3 : PAYPAL ─── */}
          <div
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              activeTab === "paypal"
                ? "border-emerald-600 bg-white shadow-xs ring-1 ring-emerald-600/30"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {/* Header / Bouton Radio */}
            <button
              type="button"
              onClick={() => handleTabChange("paypal")}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`size-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    activeTab === "paypal"
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {activeTab === "paypal" && <div className="size-2 rounded-full bg-white" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-bold text-gray-950">PayPal</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isPayPalAvailable
                      ? "Compte PayPal ou paiement en 4x sans frais"
                      : "Moyen de paiement momentanément indisponible"}
                  </p>
                </div>
              </div>
              <PaypalSvg
                className={`h-5 sm:h-5.5 w-auto shrink-0 ${
                  !isPayPalAvailable ? "opacity-50 grayscale-20" : ""
                }`}
              />
            </button>

            {/* Body PayPal Déplié */}
            {activeTab === "paypal" && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-gray-100 bg-gray-50/40 space-y-3.5">
                <p className="text-xs sm:text-sm text-gray-600 pt-1">
                  {isPayPalAvailable
                    ? "Vous allez être redirigé vers l'interface sécurisée de PayPal pour finaliser votre commande en toute tranquillité."
                    : "La passerelle de paiement PayPal est momentanément inactive. Veuillez privilégier le règlement par Carte Bancaire ou Apple Pay."}
                </p>

                <button
                  type="button"
                  disabled={!isPayPalAvailable || isProcessing}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isPayPalAvailable) onSubmit(e);
                  }}
                  className={`w-full h-12 rounded-xl text-base border transition-all flex items-center justify-center gap-2.5 select-none ${
                    isPayPalAvailable
                      ? "bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 font-bold border-[#E5A800]/40 shadow-xs cursor-pointer"
                      : "bg-[#FFC439]/50 text-gray-700 font-semibold border-amber-300/40 opacity-55 cursor-not-allowed shadow-none"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <PaypalSvg
                      className={`h-5.5 sm:h-6 w-auto shrink-0 ${!isPayPalAvailable ? "opacity-60 grayscale-20" : ""}`}
                    />
                    <span className="font-semibold text-xs sm:text-sm">
                      {isPayPalAvailable
                        ? `— Payer ${totalAmountFormatted}`
                        : "Moyen de paiement indisponible"}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── 3 Badges de Réassurance Discrets ─── */}
        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <ShieldCheck className="size-4.5 text-emerald-600 shrink-0" />
            <span className="font-medium">Chiffrement SSL 256-bit</span>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <Lock className="size-4.5 text-emerald-600 shrink-0" />
            <span className="font-medium">Protocole 3D Secure 2.0</span>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100/90 shadow-2xs">
            <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0" />
            <span className="font-medium">Satisfait ou remboursé</span>
          </div>
        </div>
      </div>
    </div>
  );
}
