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

/** Official Pure Visa Vector SVG (User Exact SVG) */
export function VisaSvg({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0.5 0.5 999 323.684"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Visa"
    >
      <path
        d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454z"
        fill="#1434cb"
      />
    </svg>
  );
}

/** Official Visa Rounded Badge */
export function VisaBadgeSvg({ className = "h-5 sm:h-5.5 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-white border border-gray-200 px-2 py-1 rounded-md shadow-2xs h-7">
      <VisaSvg className="h-3.5 sm:h-4 w-auto" />
    </span>
  );
}

/** Official Pure Mastercard Vector SVG */
export function MastercardSvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mastercard"
    >
      <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <g transform="translate(8, 5)">
        <circle cx="10" cy="11" r="9" fill="#EB001B" />
        <circle cx="22" cy="11" r="9" fill="#F79E1B" />
        <path
          d="M16 4.36a8.96 8.96 0 0 1 3 6.64 8.96 8.96 0 0 1-3 6.64 8.96 8.96 0 0 1 3-6.64z"
          fill="#FF5F00"
        />
      </g>
    </svg>
  );
}

/** Official Mastercard Rounded Badge */
export function MastercardBadgeSvg({ className = "h-5 sm:h-5.5 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-white border border-gray-200 px-1.5 py-1 rounded-md shadow-2xs h-7">
      <svg
        className="h-4.5 sm:h-5 w-auto"
        viewBox="0 0 32 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mastercard"
      >
        <circle cx="10" cy="11" r="9" fill="#EB001B" />
        <circle cx="22" cy="11" r="9" fill="#F79E1B" />
        <path
          d="M16 4.36a8.96 8.96 0 0 1 3 6.64 8.96 8.96 0 0 1-3 6.64 8.96 8.96 0 0 1 3-6.64z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

/** Official Pure Apple Pay Logo Vector (User Exact SVG) */
export function ApplePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-7.8 0 519.8 210.2"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple Pay"
    >
      <path d="m93.6 27.1c-6 7.1-15.6 12.7-25.2 11.9-1.2-9.6 3.5-19.8 9-26.1 6-7.3 16.5-12.5 25-12.9 1 10-2.9 19.8-8.8 27.1m8.7 13.8c-13.9-.8-25.8 7.9-32.4 7.9-6.7 0-16.8-7.5-27.8-7.3-14.3.2-27.6 8.3-34.9 21.2-15 25.8-3.9 64 10.6 85 7.1 10.4 15.6 21.8 26.8 21.4 10.6-.4 14.8-6.9 27.6-6.9 12.9 0 16.6 6.9 27.8 6.7 11.6-.2 18.9-10.4 26-20.8 8.1-11.8 11.4-23.3 11.6-23.9-.2-.2-22.4-8.7-22.6-34.3-.2-21.4 17.5-31.6 18.3-32.2-10-14.8-25.6-16.4-31-16.8m80.3-29v155.9h24.2v-53.3h33.5c30.6 0 52.1-21 52.1-51.4s-21.1-51.2-51.3-51.2zm24.2 20.4h27.9c21 0 33 11.2 33 30.9s-12 31-33.1 31h-27.8zm129.8 136.7c15.2 0 29.3-7.7 35.7-19.9h.5v18.7h22.4v-77.6c0-22.5-18-37-45.7-37-25.7 0-44.7 14.7-45.4 34.9h21.8c1.8-9.6 10.7-15.9 22.9-15.9 14.8 0 23.1 6.9 23.1 19.6v8.6l-30.2 1.8c-28.1 1.7-43.3 13.2-43.3 33.2 0 20.2 15.7 33.6 38.2 33.6zm6.5-18.5c-12.9 0-21.1-6.2-21.1-15.7 0-9.8 7.9-15.5 23-16.4l26.9-1.7v8.8c0 14.6-12.4 25-28.8 25zm82 59.7c23.6 0 34.7-9 44.4-36.3l42.5-119.2h-24.6l-28.5 92.1h-.5l-28.5-92.1h-25.3l41 113.5-2.2 6.9c-3.7 11.7-9.7 16.2-20.4 16.2-1.9 0-5.6-.2-7.1-.4v18.7c1.4.4 7.4.6 9.2.6z" />
    </svg>
  );
}

/** Official Apple Pay Rounded Badge (for tabs, summaries and cards) */
export function ApplePayBadgeSvg({ className = "h-5 sm:h-5.5 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-black text-white px-2 py-1 rounded-md shadow-2xs">
      <ApplePaySvg className="h-3.5 sm:h-4 w-auto text-white" />
    </span>
  );
}

/** Official Google Pay Pure Vector SVG (User Exact SVG) */
export function GooglePaySvg({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 356.44 141.39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Pay"
    >
      <g fill="#5f6368">
        <path d="M168.58 20.77V56.5h22.04c5.25 0 9.59-1.76 13.02-5.29 3.53-3.52 5.29-7.72 5.29-12.58s-1.76-8.91-5.29-12.44c-3.44-3.62-7.78-5.43-13.02-5.43h-22.04zm0 48.32v41.45h-13.16V8.19h34.91c8.87 0 16.39 2.96 22.6 8.86 6.31 5.9 9.45 13.1 9.45 21.58s-3.14 15.92-9.45 21.72c-6.1 5.82-13.64 8.72-22.6 8.72h-21.75zM235.68 89.08c0 3.44 1.45 6.29 4.37 8.58 2.91 2.28 6.32 3.43 10.23 3.43 5.54 0 10.46-2.05 14.8-6.14 4.34-4.1 6.51-8.91 6.51-14.43-4.1-3.25-9.83-4.86-17.17-4.86-5.34 0-9.8 1.29-13.37 3.86s-5.37 5.75-5.37 9.56m17.03-50.88c9.73 0 17.41 2.59 23.04 7.79s8.43 12.31 8.43 21.36v43.17h-12.59v-9.72h-.57c-5.44 8-12.68 12-21.74 12-7.73 0-14.2-2.28-19.39-6.85-5.2-4.58-7.8-10.29-7.8-17.16 0-7.24 2.73-13 8.22-17.28 5.49-4.29 12.81-6.43 21.96-6.43 7.82 0 14.26 1.43 19.31 4.29v-3c0-4.57-1.81-8.45-5.43-11.64-3.63-3.2-7.86-4.79-12.73-4.79-7.35 0-13.16 3.09-17.45 9.29l-11.6-7.29c6.4-9.15 15.84-13.72 28.34-13.72M356.44 40.49l-43.93 100.9h-13.59l16.31-35.3-28.9-65.6h14.31l20.89 50.31h.28l20.32-50.31z" />
      </g>
      <path d="M115.39 60.14c0-4.14-.35-8.14-1.01-11.96H58.86v22.65h31.79c-1.36 7.38-5.49 13.66-11.75 17.87v14.71h18.98c11.11-10.24 17.51-25.37 17.51-43.26" fill="#4285f4" />
      <path d="M58.86 117.61c15.89 0 29.26-5.21 39.02-14.2L78.9 88.7c-5.28 3.55-12.08 5.63-20.04 5.63-15.35 0-28.38-10.34-33.05-24.27H6.27v15.15c9.69 19.21 29.6 32.41 52.6 32.41" fill="#34a853" />
      <path d="M25.82 70.05c-1.19-3.55-1.85-7.34-1.85-11.25s.65-7.7 1.85-11.25V32.4H6.27C2.26 40.34 0 49.3 0 58.8s2.26 18.47 6.27 26.4z" fill="#fabb05" />
      <path d="M58.86 23.27c8.67 0 16.45 2.98 22.58 8.82s16.8-16.78 16.8-16.78C88.04 5.83 74.74 0 58.86 0 35.87 0 15.96 13.19 6.27 32.4l19.55 15.15c4.66-13.93 17.69-24.27 33.05-24.27" fill="#e94235" />
    </svg>
  );
}

/** Official Google Pay Badge (Rounded Card Pill) */
export function GooglePayBadgeSvg({ className = "h-5 sm:h-5.5 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-white border border-gray-200 px-2 py-1 rounded-md shadow-2xs">
      <GooglePaySvg className="h-3.5 sm:h-4 w-auto" />
    </span>
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
  isLocked?: boolean;
  onUnlockStep?: () => void;
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
  isLocked = false,
  onUnlockStep,
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
    <div
      className={`border rounded-2xl bg-white shadow-2xs overflow-hidden transition-all duration-300 ${
        isLocked ? "border-gray-200/70 opacity-90" : "border-gray-200/90"
      }`}
    >
      {/* ─── Header Apple / Stripe Style ─── */}
      <div className="py-4 sm:py-5 px-5 sm:px-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <span
            className={`size-8 rounded-full font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs ${
              isLocked
                ? "bg-gray-100 text-gray-400 border border-gray-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200/90"
            }`}
          >
            {isLocked ? <Lock className="size-4" /> : "2"}
          </span>
          <div>
            <h2 className="font-bold text-base sm:text-lg text-gray-950 tracking-tight">
              Paiement sécurisé
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isLocked
                ? "Débloqué après validation de vos informations de livraison"
                : "Toutes les transactions sont chiffrées et sécurisées"}
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isLocked ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200/80 font-medium whitespace-nowrap shrink-0">
              <Lock className="size-3 text-gray-400" />
              <span>Étape 2 / 2</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/90 px-3 py-1.5 rounded-full border border-emerald-200/70 font-semibold shadow-2xs whitespace-nowrap shrink-0">
              <Lock className="size-3.5 text-emerald-600" />
              <span>SSL 256-bit</span>
            </span>
          )}
        </div>
      </div>

      {isLocked ? (
        <div className="p-6 sm:p-8 bg-gray-50/40 text-center space-y-3.5">
          <div className="size-11 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto border border-gray-200/60 shadow-2xs">
            <Lock className="size-5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Étape 2 : Mode de paiement verrouillée
            </p>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto leading-relaxed">
              Veuillez renseigner et valider vos coordonnées de livraison à l'étape 1 ci-dessus pour débloquer les modes de paiement sécurisés (Carte Bancaire, Apple Pay, PayPal).
            </p>
          </div>
          {onUnlockStep && (
            <button
              type="button"
              onClick={onUnlockStep}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2 rounded-xl transition border border-emerald-200/60 shadow-2xs cursor-pointer"
            >
              <span>Compléter l'adresse de livraison</span>
              <span aria-hidden="true">↑</span>
            </button>
          )}
        </div>
      ) : (
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
                <VisaBadgeSvg />
                <MastercardBadgeSvg />
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
                        className="w-full h-11 sm:h-12 px-4 pr-24 text-base sm:text-sm font-mono tracking-wider rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs transition"
                      />

                      {/* Dynamic Brand Logo inside input */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        {currentBrand === "visa" ? (
                          <VisaBadgeSvg />
                        ) : currentBrand === "mastercard" ? (
                          <MastercardBadgeSvg />
                        ) : (
                          <div className="flex items-center gap-1 opacity-70">
                            <VisaBadgeSvg />
                            <MastercardBadgeSvg />
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
                <GooglePayBadgeSvg className="h-5 sm:h-5.5 w-auto" />
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

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="size-4.5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-amber-950">Statut du paiement PayPal</p>
                      <p className="leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  disabled={!isPayPalAvailable || isProcessing}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isPayPalAvailable && !isProcessing) onSubmit(e);
                  }}
                  className={`w-full h-12 rounded-xl text-base border transition-all flex items-center justify-center gap-2.5 select-none ${
                    isPayPalAvailable && !isProcessing
                      ? "bg-[#FFC439] hover:bg-[#F4BB30] active:scale-[0.99] text-gray-950 font-bold border-[#E5A800]/40 shadow-xs cursor-pointer"
                      : "bg-[#FFC439]/50 text-gray-700 font-semibold border-amber-300/40 opacity-70 cursor-not-allowed shadow-none"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm">
                      <Loader2 className="size-5 animate-spin text-gray-900" />
                      <span>Connexion à PayPal en cours...</span>
                    </div>
                  ) : (
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
                  )}
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
      )}
    </div>
  );
}
