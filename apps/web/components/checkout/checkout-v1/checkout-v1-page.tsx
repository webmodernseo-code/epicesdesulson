"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, parseCartPrice } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import ShippingAddressV1, { ShippingAddressData } from "./shipping-address-v1";
import PaymentMethodV1, { CardFormData, PaymentTabType } from "./payment-method-v1";
import CheckoutCartSummary1 from "./checkout-cart-summary-1";
import { ArrowLeft, ShoppingBag, ShieldCheck, Check, Edit3, MapPin, User, ArrowRight } from "lucide-react";

export default function CheckoutV1Page() {
  const router = useRouter();
  const { items, subtotal, isLoaded, clearCart } = useCart();

  // Current Step: 1 = Livraison, 2 = Paiement
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Selected Payment Tab
  const [selectedMethod, setSelectedMethod] = useState<PaymentTabType>("card");

  // Shipping Address State
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

  // Card Form State
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
    if (!shippingData.phone?.trim()) {
      newErrors.phone = "Veuillez renseigner votre numéro de téléphone pour le suivi de livraison.";
    }
    if (!shippingData.street.trim()) {
      newErrors.street = "Veuillez renseigner votre adresse de livraison.";
    } else if (!shippingData.isBanVerified && (!shippingData.postalCode || !shippingData.city)) {
      newErrors.street = "Veuillez sélectionner votre adresse officielle dans la liste BAN (data.gouv.fr).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    const isOk = validateShipping();
    if (isOk) {
      setCurrentStep(2);
      setCardError(null);
      // Smooth scroll to top of checkout container
      window.scrollTo({ top: 180, behavior: "smooth" });
      toast.success("Coordonnées validées ! Vous pouvez choisir votre mode de paiement.");
    } else {
      toast.error("Veuillez renseigner tous les champs obligatoires de livraison.");
    }
  };

  const validateCard = (): boolean => {
    if (selectedMethod !== "card") return true;
    const digits = cardData.cardNumber.replace(/\D/g, "");
    const [monthText, yearText] = cardData.expiryDate.split("/");
    const month = Number(monthText);
    const year = Number(yearText?.length === 2 ? `20${yearText}` : yearText);
    const expiry = new Date(year, month, 0, 23, 59, 59);
    if (
      !cardData.nameOnCard.trim() ||
      digits.length < 13 ||
      digits.length > 19 ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12 ||
      expiry < new Date() ||
      !/^\d{3,4}$/.test(cardData.cvc)
    ) {
      setCardError("Veuillez vérifier le nom, le numéro, la date d’expiration et le cryptogramme.");
      return false;
    }
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
      setCurrentStep(1);
      toast.error("Veuillez remplir vos informations de livraison à l'étape 1.");
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
          customerPhone: shippingData.phone?.trim() || undefined,
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
          // PayPal redirect URL
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-gray-200/90">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
              Finaliser ma commande
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Tunnel de commande sécurisé en 2 étapes simples
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-2xs self-start sm:self-auto">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <span>Chiffrement SSL 256-bit certifié</span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="mb-6 grid grid-cols-2 gap-3 max-w-xl">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
              currentStep === 1
                ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/30"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 2
                  ? "bg-emerald-600 text-white"
                  : currentStep === 1
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {currentStep === 2 ? <Check className="size-4 stroke-[3]" /> : "1"}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">1. Livraison</p>
              <p className="text-[11px] text-gray-500 truncate">
                {currentStep === 2 ? "Coordonnées validées" : "En cours de saisie"}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (validateShipping()) {
                setCurrentStep(2);
              } else {
                toast.error("Veuillez d'abord compléter vos informations de livraison.");
              }
            }}
            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
              currentStep === 2
                ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/30"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStep === 2
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              2
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">2. Paiement</p>
              <p className="text-[11px] text-gray-500 truncate">
                {currentStep === 2 ? "Mode de règlement" : "En attente livraison"}
              </p>
            </div>
          </button>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Colonne Gauche : Étapes 1 & 2 */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* ─── ÉTAPE 1 : COORDONNÉES & LIVRAISON ─── */}
            {currentStep === 1 ? (
              <ShippingAddressV1
                data={shippingData}
                onChange={handleShippingChange}
                errors={errors}
                onContinue={handleProceedToPayment}
              />
            ) : (
              /* Étape 1 Repliée & Validée */
              <div className="border border-emerald-300/80 bg-emerald-50/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-2xs transition-all">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="size-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="size-4.5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-sm sm:text-base text-gray-900">
                        1. Informations de livraison validées
                      </h2>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200/80">
                        Validé
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1 truncate">
                      <span className="font-semibold">{shippingData.firstName} {shippingData.lastName}</span> • {shippingData.email}{shippingData.phone ? ` • ${shippingData.phone}` : ""}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {shippingData.street}{shippingData.address2 ? `, ${shippingData.address2}` : ""}, {shippingData.postalCode} {shippingData.city}, {shippingData.country}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="self-start sm:self-center text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Edit3 className="size-3.5 text-emerald-700" />
                  <span>Modifier</span>
                </button>
              </div>
            )}

            {/* ─── ÉTAPE 2 : PAIEMENT SÉCURISÉ ─── */}
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
              isLocked={currentStep === 1}
              onUnlockStep={() => setCurrentStep(1)}
            />
          </div>

          {/* Colonne Droite : Résumé de Commande */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <CheckoutCartSummary1
              selectedMethod={selectedMethod === "paypal" ? "paypal" : "stripe"}
              isProcessing={isProcessing}
              shippingCountry={shippingData.country}
              isPayPalAvailable={isPayPalAvailable}
              currentStep={currentStep}
              onPlaceOrder={(coupon) => {
                if (coupon) setCouponCode(coupon);
                if (currentStep === 1) {
                  handleProceedToPayment();
                } else {
                  if (selectedMethod === "paypal" && !isPayPalAvailable) {
                    return;
                  }
                  handlePaymentSubmit(undefined, coupon);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
