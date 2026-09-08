"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import ShippingAddressV1, { ShippingAddressData } from "./shipping-address-v1";
import PaymentMethodV1 from "./payment-method-v1";
import CheckoutCartSummary1 from "./checkout-cart-summary-1";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CheckoutV1Page() {
  const { items, subtotal, isLoaded } = useCart();

  // Shipping Address State
  const [shippingData, setShippingData] = useState<ShippingAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "France",
    instructions: "",
  });

  // Cardholder Name
  const [cardHolderName, setCardHolderName] = useState("");

  // Validation Errors
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddressData, string>>>({});

  // Stripe Intent State
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | undefined>(undefined);
  const [serverTotal, setServerTotal] = useState<number | null>(null);
  const [isPreparingIntent, setIsPreparingIntent] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);

  // Sync cardHolderName with firstName + lastName
  useEffect(() => {
    const fullName = `${shippingData.firstName} ${shippingData.lastName}`.trim();
    if (fullName && !cardHolderName) {
      setCardHolderName(fullName);
    }
  }, [shippingData.firstName, shippingData.lastName]);

  const handleShippingChange = (field: keyof ShippingAddressData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddressData, string>> = {};

    if (!shippingData.firstName.trim()) {
      newErrors.firstName = "Veuillez renseigner votre prénom.";
    }
    if (!shippingData.lastName.trim()) {
      newErrors.lastName = "Veuillez renseigner votre nom.";
    }
    if (!shippingData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email.trim())) {
      newErrors.email = "Veuillez renseigner une adresse email valide.";
    }
    if (!shippingData.phone.trim()) {
      newErrors.phone = "Veuillez renseigner un numéro de téléphone pour la livraison.";
    }
    if (!shippingData.street.trim()) {
      newErrors.street = "Veuillez renseigner votre adresse de livraison.";
    }
    if (!shippingData.postalCode.trim()) {
      newErrors.postalCode = "Veuillez renseigner votre code postal.";
    }
    if (!shippingData.city.trim()) {
      newErrors.city = "Veuillez renseigner votre ville.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;
  };

  // Initialize or Refresh Stripe Payment Intent with server verification
  const handlePreparePaymentIntent = useCallback(
    async (forceCoupon?: string) => {
      if (items.length === 0) {
        return;
      }

      const isValid = validateShipping();
      if (!isValid) {
        toast.error("Veuillez remplir les informations obligatoires de livraison.");
        return;
      }

      setIsPreparingIntent(true);
      setInitError(null);

      try {
        const activeCoupon = forceCoupon !== undefined ? forceCoupon : couponCode;
        const res = await fetch("/api/checkout/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: shippingData,
            items,
            couponCode: activeCoupon,
          }),
        });

        const data = await res.json();

        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPublishableKey(data.publishableKey);
          setOrderNumber(data.orderNumber);
          setServerTotal(data.totalAmount);
          if (activeCoupon) setCouponCode(activeCoupon);
        } else {
          setInitError(data.error || "Impossible d'initialiser le paiement sécurisé.");
          toast.error(data.error || "Erreur d'initialisation du paiement.");
        }
      } catch (err: any) {
        console.error("Failed to create Stripe payment intent:", err);
        setInitError("Erreur de communication avec le serveur.");
        toast.error("Erreur de communication avec le serveur.");
      } finally {
        setIsPreparingIntent(false);
      }
    },
    [items, shippingData, couponCode]
  );

  // Auto-initialize PaymentIntent if shipping data is already completely filled
  useEffect(() => {
    if (
      !clientSecret &&
      !isPreparingIntent &&
      items.length > 0 &&
      shippingData.firstName.trim() &&
      shippingData.lastName.trim() &&
      shippingData.email.trim() &&
      shippingData.street.trim() &&
      shippingData.postalCode.trim() &&
      shippingData.city.trim()
    ) {
      handlePreparePaymentIntent();
    }
  }, [
    clientSecret,
    isPreparingIntent,
    items.length,
    shippingData.firstName,
    shippingData.lastName,
    shippingData.email,
    shippingData.street,
    shippingData.postalCode,
    shippingData.city,
    handlePreparePaymentIntent,
  ]);

  // Total formatted string (prioritizes authentic server calculation)
  const displayTotal = serverTotal !== null ? serverTotal : Math.max(0, subtotal + (subtotal >= 50 ? 0 : 4.9));
  const formattedTotal = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(displayTotal);

  const originUrl = typeof window !== "undefined" ? window.location.origin : "";
  const successRedirectUrl = `${originUrl}/checkout/success?orderNumber=${orderNumber || ""}`;

  if (isLoaded && items.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-gray-50/50">
        <div className="container max-w-lg mx-auto text-center px-4">
          <div className="size-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="size-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Votre panier est vide
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
            Découvrez nos mélanges d'épices d'exception et trésors gastronomiques pour finaliser votre commande.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition shadow-sm"
          >
            <ArrowLeft className="size-4" />
            <span>Découvrir la boutique</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-gray-50/50 min-h-[75vh]">
      <div className="container max-w-7xl">
        {/* En-tête Page Checkout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-200/80">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
              Finaliser ma commande
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Paiement direct sécurisé et expédition express sous 24h
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 self-start sm:self-auto">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>Chiffrement bancaire SSL 256-bit</span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Colonne Gauche (Desktop) / Partie 1 & 2 (Mobile) : Informations Client + Paiement */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 order-1">
            {/* 1. Informations Client & Livraison */}
            <ShippingAddressV1
              data={shippingData}
              onChange={handleShippingChange}
              errors={errors}
            />

            {/* 2. Section Paiement Sécurisé Stripe */}
            <PaymentMethodV1
              clientSecret={clientSecret}
              publishableKey={publishableKey}
              cardHolderName={cardHolderName}
              onCardHolderNameChange={setCardHolderName}
              totalAmountFormatted={formattedTotal}
              orderNumber={orderNumber}
              onSuccessRedirectUrl={successRedirectUrl}
              isPreparing={isPreparingIntent}
              onInitializeIntent={() => handlePreparePaymentIntent()}
              initError={initError}
            />
          </div>

          {/* Colonne Droite (Desktop) / Partie Résumé (Mobile) : Résumé de Commande */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:sticky lg:top-6">
            <CheckoutCartSummary1
              selectedMethod="stripe"
              isProcessing={isPreparingIntent}
              onPlaceOrder={(coupon) => handlePreparePaymentIntent(coupon)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
