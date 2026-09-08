"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import ShippingAddressV1, { ShippingAddressData } from "./shipping-address-v1";
import PaymentMethodV1, { CardFormData } from "./payment-method-v1";
import CheckoutCartSummary1 from "./checkout-cart-summary-1";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CheckoutV1Page() {
  const router = useRouter();
  const { items, subtotal, isLoaded, clearCart } = useCart();

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
  });

  // Validation Errors & Processing States
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddressData, string>>>({});
  const [cardError, setCardError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);

  // Auto-sync cardholder name when customer types their name
  useEffect(() => {
    const fullName = `${shippingData.firstName} ${shippingData.lastName}`.trim();
    if (fullName && !cardData.nameOnCard) {
      setCardData((prev) => ({ ...prev, nameOnCard: fullName }));
    }
  }, [shippingData.firstName, shippingData.lastName]);

  const handleShippingChange = (field: keyof ShippingAddressData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCardChange = (field: keyof CardFormData, value: string) => {
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
    }
    if (!shippingData.postalCode.trim()) {
      newErrors.postalCode = "Veuillez renseigner votre code postal.";
    }
    if (!shippingData.city.trim()) {
      newErrors.city = "Veuillez renseigner votre ville.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCard = (): boolean => {
    if (!cardData.nameOnCard.trim()) {
      setCardError("Veuillez indiquer le nom présent sur la carte.");
      return false;
    }
    const cleanNum = cardData.cardNumber.replace(/\s+/g, "");
    if (cleanNum.length < 15) {
      setCardError("Veuillez saisir un numéro de carte bancaire valide (16 chiffres).");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      setCardError("Date d'expiration invalide (format attendu : MM/AA).");
      return false;
    }
    if (cardData.cvc.length < 3) {
      setCardError("Code de sécurité CVC invalide (3 ou 4 chiffres).");
      return false;
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
      toast.error("Veuillez vérifier vos coordonnées de carte bancaire.");
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
          shippingCity: shippingData.city.trim(),
          shippingPostal: shippingData.postalCode.trim(),
          shippingCountry: shippingData.country || "France",
          couponCode: activeCoupon,
          items,
          paymentMethod: "stripe",
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirection vers confirmation de commande
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
  const discountAmount = couponCode === "SULSON10" ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.9;
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
          {/* Colonne Gauche : Informations Client + Paiement ouvert d'office */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* 1. Informations Client & Livraison (avec autocomplétion prédictive d'adresse) */}
            <ShippingAddressV1
              data={shippingData}
              onChange={handleShippingChange}
              errors={errors}
            />

            {/* 2. Section Paiement Carte Bancaire (Ouverte d'office immédiatement) */}
            <PaymentMethodV1
              cardData={cardData}
              onCardDataChange={handleCardChange}
              totalAmountFormatted={formattedTotal}
              isProcessing={isProcessing}
              onSubmit={handlePaymentSubmit}
              errorMessage={cardError}
            />
          </div>

          {/* Colonne Droite : Résumé de Commande */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <CheckoutCartSummary1
              selectedMethod="stripe"
              isProcessing={isProcessing}
              onPlaceOrder={(coupon) => {
                if (coupon) setCouponCode(coupon);
                handlePaymentSubmit(undefined, coupon);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
