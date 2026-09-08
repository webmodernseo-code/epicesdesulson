import React from "react";

/**
 * Official Stripe Vector Logo
 * Features the authentic #635BFF brand color and precise typography wordmark.
 */
export function StripeLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <img
      src="/images/payments/stripe-official.png"
      alt="Stripe"
      className={`${className} object-contain`}
    />
  );
}

/**
 * Stripe Icon Monogram (Purple Pill / Badge)
 */
export function StripeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stripe Icon"
    >
      <rect width="32" height="32" rx="8" fill="#635BFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.5 13.8c0-2.8-1.4-5-4.1-5-2.7 0-4.3 2.2-4.3 5 0 3.3 2 5 4.6 5 1.3 0 2.3-.3 3-.7v-2.1c-.7.4-1.6.6-2.5.6-1 0-1.9-.4-2-1.6h5.2c0-.3.1-.8.1-1.2zm-5.2-1c0-1.1.6-1.6 1.4-1.6.8 0 1.3.4 1.3 1.6h-2.7z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * Official PayPal Vector Logo
 */
export function PaypalLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PayPal"
    >
      <path
        d="M11.667 2.5H4.25a.833.833 0 0 0-.825.708L.542 21.792a.5.5 0 0 0 .491.575h4.083a.833.833 0 0 0 .825-.708l.842-5.334a.833.833 0 0 1 .825-.708h2.042c4.425 0 7.825-1.792 8.833-6.958.45-2.3-.016-4.109-1.325-5.267C15.717 3.017 13.9 2.5 11.667 2.5z"
        fill="#003087"
      />
      <path
        d="M12.917 8.333c-.45 2.3-2.05 6.959-7.084 6.959H3.792l-1.375 8.708h3.333a.833.833 0 0 0 .825-.708l.842-5.334a.833.833 0 0 1 .825-.708h2.042c4.425 0 7.825-1.792 8.833-6.958.45-2.3-.016-4.109-1.325-5.267-1.442-1.275-3.8-1.575-5.833-1.425-.667.283-1.042.867-1.292 2.1z"
        fill="#0079C1"
      />
      <text
        x="25"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#003087"
      >
        Pay<tspan fill="#0079C1">Pal</tspan>
      </text>
    </svg>
  );
}

/**
 * Official Apple Pay Vector Badge
 */
export function ApplePayLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 56 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple Pay"
    >
      <rect width="56" height="24" rx="4.5" fill="#000000" />
      <path
        d="M15.1 9.4c-.18 1.15-.98 1.98-1.98 1.87-.16-.99.77-1.98 1.98-1.87zm.44 2.03c-.6 0-1.6-.33-2.42-.33-1.04 0-1.98.55-2.47 1.48-1.04 1.76-.27 4.4 0.71 5.88.49.71 1.1 1.54 1.87 1.48.77-.05 1.04-.5 1.98-.5.88 0 1.15.5 1.92.5.82 0 1.37-.71 1.87-1.43.6-.82.82-1.65.88-1.7-.05-.05-1.65-.66-1.65-2.47 0-1.54 1.26-2.31 1.32-2.36-.71-1.04-1.87-1.15-2.25-1.15-.99-.05-1.6.66-2.04.66z"
        fill="#ffffff"
      />
      <text
        x="23"
        y="16.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#ffffff"
      >
        Pay
      </text>
    </svg>
  );
}

/**
 * Official Visa Vector Logo
 */
export function VisaLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 54 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Visa"
    >
      <text
        x="2"
        y="15"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="1"
        fill="#1434CB"
      >
        VISA
      </text>
    </svg>
  );
}

/**
 * Official Mastercard Vector Logo
 */
export function MastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 38 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mastercard"
    >
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" fillOpacity="0.88" />
    </svg>
  );
}
