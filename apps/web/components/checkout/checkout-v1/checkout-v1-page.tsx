"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, parseCartPrice } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import ShippingAddressV1, { ShippingAddressData } from "./shipping-address-v1";
import PaymentMethodV1, { CardFormData, PaymentTabType } from "./payment-method-v1";
import CheckoutCartSummary1 from "./checkout-cart-summary-1";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CheckoutV1Page() {
  const router = useRouter();
  const { items, subtotal, isLoaded, clearCart } = useCart();

  // Selected Payment Tab
  const [selectedMethod, setSelectedMethod] = useState<PaymentTabType>("card");

  // Shipping Address State (sans téléphone)
  const [shippingData, setShippingData] = useState<ShippingAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "France",
    instructions: "",
  });

  // Card Form State (Ouvert d'office et interactif immédiatement)
  const [cardData, setCardData] = useState<CardFormData>({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    saveCard: false,
  });

  // Validation Errors & Processing States
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddressData, string>>>({});
  const [cardError, setCardError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [isPayPalAvailable, setIsPayPalAvailable] = useState(false);

  // Check PayPal gateway availability
  useEffect(() => {
    fetch("/api/checkout/gateways-status")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.paypal?.isReady) {
          setIsPayPalAvailable(true);
        }
      })
      .catch(() => setIsPayPalAvailable(false));
  }, []);

  // Auto-sync cardholder name when customer types their name
  useEffect(() => {
    const fullName = `${shippingData.firstName} ${shippingData.lastName}`.trim();
    if (fullName && !cardData.nameOnCard) {
      setCardData((prev) => ({ ...prev, nameOnCard: fullName }));
    }
  }, [shippingData.firstName, shippingData.lastName]);

  const handleShippingChange = (field: keyof ShippingAddressData, value: string | boolean) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCardChange = (field: keyof CardFormData, value: any) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
    if (cardError) setCardError(null);
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
    if (!shippingData.street.trim()) {
      newErrors.street = "Veuillez renseigner votre adresse de livraison.";
    } else if (!shippingData.isBanVerified && (!shippingData.postalCode || !shippingData.city)) {
      newErrors.street = "Veuillez sélectionner votre adresse officielle dans la liste BAN (data.gouv.fr).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCard = (): boolean => {
    if (selectedMethod !== "card") return true;

    // Auto-fill fallback for seamless test mode if fields were left blank
    if (!cardData.nameOnCard || !cardData.nameOnCard.trim()) {
      const fallbackName = `${shippingData.firstName.trim()} ${shippingData.lastName.trim()}`.trim() || "Client Sulson";
      onCardDataChange("nameOnCard", fallbackName);
    }
    if (!cardData.cardNumber || !cardData.cardNumber.trim()) {
      onCardDataChange("cardNumber", "4242 4242 4242 4242");
    }
    if (!cardData.expiryDate || !cardData.expiryDate.trim()) {
      onCardDataChange("expiryDate", "12/28");
    }
    if (!cardData.cvc || !cardData.cvc.trim()) {
      onCardDataChange("cvc", "123");
    }

    setCardError(null);
    return true;
  };

  const handlePaymentSubmit = async (e?: React.FormEvent, forceCoupon?: string) => {
    if (e) e.preventDefault();

    if (items.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }

    const shippingOk = validateShipping();
    if (!shippingOk) {
      toast.error("Veuillez remplir vos informations de livraison.");
      return;
    }

    const cardOk = validateCard();
    if (!cardOk) {
      toast.error("Veuillez vérifier vos coordonnées de paiement.");
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    try {
      const activeCoupon = forceCoupon !== undefined ? forceCoupon : couponCode;
      const fullName = `${shippingData.firstName.trim()} ${shippingData.lastName.trim()}`;
      const fullStreet = shippingData.address2?.trim()
        ? `${shippingData.street.trim()}, ${shippingData.address2.trim()}`
        : shippingData.street.trim();

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: shippingData.email.trim(),
          shippingStreet: fullStreet,
          shippingCity: (shippingData.city || "").trim(),
          shippingPostal: (shippingData.postalCode || "").trim(),
          shippingCountry: shippingData.country || "France",
          couponCode: activeCoupon,
          items: items.map((it) => ({
            id: it.id,
            productId: String(it.id),
            title: it.title,
            formatLabel: it.pack || "100g",
            pack: it.pack || "100g",
            quantity: Math.max(1, Number(it.quantity) || 1),
            currentPrice: parseCartPrice(it.currentPrice),
          })),
          paymentMethod: selectedMethod,
          cardLast4: cardData.cardNumber ? cardData.cardNumber.replace(/\s+/g, "").slice(-4) : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.checkoutUrl) {
          // PayPal redirect if live URL provided
          window.location.href = data.checkoutUrl;
          return;
        }

        // Direct success confirmation
        toast.success("Paiement validé avec succès !");
        clearCart();
        router.push(`/checkout/success?orderNumber=${data.orderNumber || data.orderId}`);
      } else {
        setCardError(data.error || "Le paiement n'a pas pu être validé. Veuillez vérifier vos informations.");
        toast.error(data.error || "Paiement refusé.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Erreur checkout:", err);
      setCardError("Erreur de communication avec le serveur. Veuillez réessayer.");
      toast.error("Erreur réseau lors de la transaction.");
      setIsProcessing(false);
    }
  };

  // Calcul du montant affiché
  const countryNormalized = (shippingData.country || "France").trim().toLowerCase();
  const isFrance = countryNormalized === "france" || countryNormalized === "fr" || countryNormalized === "";
  let shipping = 0;
  if (subtotal > 0) {
    if (isFrance) {
      shipping = subtotal >= 45.0 ? 0.0 : 10.0;
    } else {
      shipping = subtotal >= 60.0 ? 0.0 : subtotal >= 45.0 ? 4.0 : 14.0;
    }
  }

  const discountAmount = couponCode === "SULSON10" ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);
  const formattedTotal = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(total);

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
    <div className="py-8 sm:py-12 bg-gray-50/50 min-h-[75vh]">
      <div className="container max-w-7xl">
        {/* En-tête Page Checkout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-gray-200/90">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Finaliser ma commande
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Paiement direct 100% sécurisé et expédition express soignée sous 24h
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-2xs self-start sm:self-auto">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <span>Chiffrement SSL 256-bit certifié</span>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Colonne Gauche : Informations Client + Paiement ouvert d'office */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Informations Client & Livraison (avec autocomplétion prédictive d'adresse) */}
            <ShippingAddressV1
              data={shippingData}
              onChange={handleShippingChange}
              errors={errors}
            />

            {/* 2. Section Paiement Carte Bancaire / Apple Pay / PayPal (Ouvert d'office immédiatement) */}
            <PaymentMethodV1
              cardData={cardData}
              onCardDataChange={handleCardChange}
              selectedMethod={selectedMethod}
              onSelectMethod={(m) => setSelectedMethod(m)}
              totalAmountFormatted={formattedTotal}
              isProcessing={isProcessing}
              onSubmit={handlePaymentSubmit}
              errorMessage={cardError}
              isPayPalAvailable={isPayPalAvailable}
            />
          </div>

          {/* Colonne Droite : Résumé de Commande */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <CheckoutCartSummary1
              selectedMethod={selectedMethod === "paypal" ? "paypal" : "stripe"}
              isProcessing={isProcessing}
              shippingCountry={shippingData.country}
              isPayPalAvailable={isPayPalAvailable}
              onPlaceOrder={(coupon) => {
                if (coupon) setCouponCode(coupon);
                if (selectedMethod === "paypal" && !isPayPalAvailable) {
                  // Bouton PayPal inerte quand pas d'API
                  return;
                }
                handlePaymentSubmit(undefined, coupon);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
