import React from "react";

/**
 * Official Stripe Vector / Brand Logo
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
 * Stripe Icon Monogram
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
 * Official Visa Vector Card Badge (Real Colors: #1434CB & #F7B600)
 */
export function VisaLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Visa"
    >
      <rect width="48" height="32" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path
        d="M19.4 21.5h-2.9l1.8-11h2.9l-1.8 11zm11.7-10.7c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.6-5.1 3.8 0 1.7 1.5 2.6 2.7 3.2 1.2.6 1.6 1 1.6 1.5 0 .8-.9 1.2-1.8 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.3.6 3.2 0 5.2-1.5 5.2-3.9 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.6-1 1.8-1 .9 0 1.6.2 2.2.5l.3.1.7-2.2zm7.4 0h-2.3c-.7 0-1.3.2-1.6.9l-4.5 9.8h3.1l.6-1.7h3.8l.4 1.7h2.7l-2.2-10.7zm-3.8 6.7c.3-.7 1.4-3.7 1.4-3.7l.4 1.8.4 1.9h-2.2zm-19.1-6.7l-2.8 7.5-.3-1.5c-.5-1.7-2.1-3.6-3.9-4.5l2.5 9.2h3.1l4.6-10.7h-3.2z"
        fill="#1434CB"
      />
      <path
        d="M8.2 10.8H3.3l-.1.4c3.8 1 6.3 3.3 7.3 6.1l-1.1-5.3c-.2-.7-.7-1.1-1.2-1.2z"
        fill="#F7B600"
      />
    </svg>
  );
}

/**
 * Official Mastercard Vector Card Badge (Real Colors: #EB001B, #F79E1B, #FF5F00)
 */
export function MastercardLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mastercard"
    >
      <rect width="48" height="32" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <g transform="translate(8, 5)">
        <circle cx="10" cy="11" r="9" fill="#EB001B" />
        <circle cx="22" cy="11" r="9" fill="#F79E1B" />
        <path
          d="M16 4.36a8.96 8.96 0 0 1 3 6.64 8.96 8.96 0 0 1-3 6.64 8.96 8.96 0 0 1-3-6.64 8.96 8.96 0 0 1 3-6.64z"
          fill="#FF5F00"
        />
      </g>
    </svg>
  );
}

/**
 * Official Apple Pay Vector Badge
 */
export function ApplePayLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple Pay"
    >
      <rect width="48" height="32" rx="5" fill="#000000" />
      <path
        d="M14.28 15.35c0-1.7 1.38-2.52 1.45-2.57-.79-1.16-2.02-1.32-2.46-1.34-1.04-.11-2.04.62-2.57.62-.53 0-1.36-.6-2.22-.59-1.15.02-2.2.67-2.79 1.7-1.2 2.08-.31 5.16.85 6.84.57.82 1.25 1.74 2.14 1.71.85-.04 1.18-.55 2.21-.55 1.03 0 1.33.55 2.22.53.91-.01 1.49-.83 2.05-1.65.65-.95.92-1.87.93-1.92-.02-.01-1.81-.7-1.81-2.78z"
        fill="#FFFFFF"
      />
      <path
        d="M12.98 10.3c.47-.57.79-1.36.7-2.16-.68.03-1.5.45-1.99 1.02-.43.5-.81 1.3-.71 2.08.76.06 1.53-.37 2-.94z"
        fill="#FFFFFF"
      />
      <path
        d="M18.8 11.2h3.2c1.7 0 2.8 1.1 2.8 2.7 0 1.6-1.1 2.7-2.8 2.7h-1.6v3.6H18.8V11.2zm1.6 4h1.5c.8 0 1.4-.5 1.4-1.3 0-.8-.6-1.3-1.4-1.3h-1.5v2.6z"
        fill="#FFFFFF"
      />
      <path
        d="M25.7 17.5c0-1.7 1.3-2.6 3.6-2.7l1.7-.1v-.6c0-.8-.6-1.3-1.6-1.3-.8 0-1.5.3-1.9.8l-1.1-.9c.7-.9 1.8-1.3 3.1-1.3 2 0 3.1 1.1 3.1 2.9v5.9h-1.5v-1.3c-.6.9-1.6 1.4-2.7 1.4-1.7 0-2.7-1.1-2.7-2.8zm5.3-.9v-.7l-1.5.1c-1.3.1-2.1.6-2.1 1.6 0 .9.7 1.5 1.7 1.5 1.1 0 1.9-.9 1.9-2.5z"
        fill="#FFFFFF"
      />
      <path
        d="M33.4 13.9h1.7l2 5.5 2-5.5h1.7l-3.3 8.3c-.6 1.5-1.5 2.1-2.9 2.1-.4 0-.8-.1-1.1-.2v-1.4c.3.1.6.1.9.1.8 0 1.3-.3 1.7-1.4l.2-.5-2.9-7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Official Google Pay Vector Badge (Real 4-Color Google G + Pay Typography)
 */
export function GooglePayLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Pay"
    >
      <rect width="48" height="32" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <g transform="translate(6, 9)">
        <path
          d="M6.86 3.43c0-.24-.02-.47-.06-.69H0v1.31h3.85c-.17.89-.67 1.64-1.42 2.14v1.78h2.3c1.35-1.24 2.13-3.06 2.13-4.54z"
          transform="translate(6.86, 3.52)"
          fill="#4285F4"
        />
        <path
          d="M6.86 10.42c1.85 0 3.41-.61 4.54-1.67L9.1 6.97c-.61.41-1.4.65-2.24.65-1.72 0-3.19-1.17-3.71-2.74H.79v1.83c1.14 2.27 3.48 3.71 6.07 3.71z"
          fill="#34A853"
        />
        <path
          d="M3.15 4.88c-.14-.41-.21-.83-.21-1.27s.07-.86.21-1.27V.51H.79C.29 1.51 0 2.62 0 3.61s.29 2.1.79 3.1l2.36-1.83z"
          fill="#FBBC04"
        />
        <path
          d="M6.86 2.08c1.01 0 1.92.35 2.63 1.03l1.97-1.97C10.27.43 8.71 0 6.86 0 4.27 0 1.93 1.44.79 3.71l2.36 1.83c.52-1.57 1.99-2.74 3.71-2.74z"
          fill="#EA4335"
        />
      </g>
      <path
        d="M21.5 11h3.3c1.7 0 2.8 1.1 2.8 2.7 0 1.6-1.1 2.7-2.8 2.7h-1.6v3.6h-1.7V11zm1.7 3.8h1.5c.8 0 1.4-.4 1.4-1.1 0-.7-.6-1.1-1.4-1.1h-1.5v2.2z"
        fill="#5F6368"
      />
      <path
        d="M28.3 16.9c0-1.6 1.2-2.4 3.3-2.5l1.6-.1v-.5c0-.7-.5-1.2-1.5-1.2-.7 0-1.4.3-1.8.7l-1-.8c.7-.8 1.7-1.2 2.9-1.2 1.9 0 2.9 1 2.9 2.7v5h-1.4v-1.2c-.6.8-1.5 1.3-2.5 1.3-1.6 0-2.5-1-2.5-2.5zm4.9-.8v-.6l-1.4.1c-1.2.1-1.9.5-1.9 1.5 0 .8.6 1.4 1.6 1.4 1 0 1.7-.8 1.7-2.4z"
        fill="#5F6368"
      />
      <path
        d="M35.6 13.5h1.6l1.9 5.1 1.9-5.1h1.6l-3.1 7.7c-.6 1.4-1.4 1.9-2.7 1.9-.4 0-.7-.1-1-.2v-1.3c.3.1.6.1.8.1.7 0 1.2-.3 1.6-1.3l.2-.5-2.8-6.4z"
        fill="#5F6368"
      />
    </svg>
  );
}

/**
 * Official American Express Vector Badge
 */
export function AmexLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="American Express"
    >
      <rect width="48" height="32" rx="5" fill="#006FCF" />
      <text
        x="6"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="9"
        fontWeight="900"
        fill="#FFFFFF"
        letterSpacing="0.5"
      >
        AMEX
      </text>
    </svg>
  );
}
