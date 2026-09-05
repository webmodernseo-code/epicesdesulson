"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { toast } from "@/lib/toast";
import ShippingAddressV1, { ShippingAddressData } from "./shipping-address-v1";
import PaymentMethodV1, { CardFormData } from "./payment-method-v1";
import CheckoutCartSummary1 from "./checkout-cart-summary-1";

export default function CheckoutV1Page() {
  const { items } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");

  // Shipping Address Form State
  const [shippingData, setShippingData] = useState<ShippingAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    country: "France",
    instructions: "",
  });

  // Card Form State
  const [cardData, setCardData] = useState<CardFormData>({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    saveCard: false,
  });

  // Validation Errors
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddressData, string>>>({});

  const handleShippingChange = (field: keyof ShippingAddressData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCardChange = (field: keyof CardFormData, value: any) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  // Validate form fields for Card / Manual checkout
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddressData, string>> = {};

    if (!shippingData.firstName.trim()) {
      newErrors.firstName = "Veuillez renseigner votre prénom.";
    }
    if (!shippingData.lastName.trim()) {
      newErrors.lastName = "Veuillez renseigner votre nom.";
    }
    if (!shippingData.email.trim() || !/^\S+@\S+\.\S+$/.test(shippingData.email)) {
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
      toast.error("Veuillez remplir les informations obligatoires de livraison.");
      return false;
    }
    return true;
  };

  // Handle Checkout submission
  const handleSubmitOrder = async (methodOverride?: "stripe" | "paypal", couponCode?: string) => {
    const activeMethod = methodOverride || paymentMethod;

    const isValid = validateForm();
    if (!isValid) return;

    if (items.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }

    setIsProcessing(true);

    try {
      const fullName =
        shippingData.firstName.trim() && shippingData.lastName.trim()
          ? `${shippingData.firstName.trim()} ${shippingData.lastName.trim()}`
          : shippingData.firstName.trim() || "Client Sulson";

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: shippingData.email.trim() || "client@epicesdesulson.com",
          customerPhone: shippingData.phone.trim() || undefined,
          shippingStreet: shippingData.street.trim() || "Adresse de livraison",
          shippingCity: shippingData.city.trim() || "Paris",
          shippingPostal: shippingData.postalCode.trim() || "75001",
          shippingCountry: shippingData.country || "France",
          deliveryInstructions: shippingData.instructions.trim() || undefined,
          couponCode: couponCode || undefined,
          items,
          paymentMethod: activeMethod,
        }),
      });

      const data = await res.json();

      if (data.success && data.checkoutUrl) {
        toast.success(activeMethod === "paypal" ? "Redirection vers PayPal..." : "Redirection vers Stripe...");
        window.location.href = data.checkoutUrl;
      } else {
        toast.error(data.error || "Erreur lors de la validation du paiement.");
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error("Checkout submission failed:", err);
      toast.error("Erreur de communication avec le serveur.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-6 sm:py-10 bg-gray-50/50">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Checkout Form: Shipping Address & Payment Method */}
          <div className="xl:col-span-8 col-span-12 space-y-6">
            <ShippingAddressV1
              data={shippingData}
              onChange={handleShippingChange}
              errors={errors}
            />

            <PaymentMethodV1
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
              cardData={cardData}
              onCardDataChange={handleCardChange}
              onPaypalSubmit={() => handleSubmitOrder("paypal")}
              isProcessing={isProcessing}
            />
          </div>

          {/* Sticky Order Summary */}
          <div className="xl:col-span-4 col-span-12">
            <CheckoutCartSummary1
              selectedMethod={paymentMethod}
              isProcessing={isProcessing}
              onPlaceOrder={(coupon) => handleSubmitOrder(paymentMethod, coupon)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
