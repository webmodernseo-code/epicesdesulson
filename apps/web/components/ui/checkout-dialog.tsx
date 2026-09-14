"use client";

import React, { useState } from "react";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X, ShoppingBag, CreditCard, Lock, ShieldCheck } from "lucide-react";

interface CheckoutDialogProps {
  triggerText?: string;
  title?: string;
  description?: string;
  amountFormatted?: string;
  onPay?: (data: { nameOnCard: string; cardNumber: string; expiryDate: string; cvc: string }) => void;
}

export default function CheckoutDialog({
  triggerText = "Paiement Rapide",
  title = "Confirmer et payer",
  description = "Paiement 100% sécurisé et garanti.",
  amountFormatted = "5,99 €",
  onPay,
}: CheckoutDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "pack">("standard");
  const [paymentData, setPaymentData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPay?.(paymentData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer inline-flex items-center justify-center shadow-2xs">
          {triggerText}
        </button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className="data-[state=open]:animate-backdrop-in data-[state=closed]:animate-backdrop-out fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <Dialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Content className="data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <Dialog.CloseTrigger asChild>
              <button
                aria-label="Fermer"
                className="absolute right-3.5 top-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.CloseTrigger>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 shrink-0">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <Dialog.Title className="text-base font-bold text-gray-950">
                    {title}
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-gray-500">
                    {description}
                  </Dialog.Description>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name on Card */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Nom sur la carte
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jean Dupont"
                    value={paymentData.nameOnCard}
                    onChange={(e) =>
                      handleInputChange("nameOnCard", e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition shadow-2xs"
                  />
                </div>

                {/* Card Details */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Coordonnées bancaires
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Numéro de carte"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition shadow-2xs"
                    />
                    <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      value={paymentData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition shadow-2xs"
                    />

                    <input
                      type="text"
                      required
                      placeholder="CVC"
                      value={paymentData.cvc}
                      onChange={(e) => handleInputChange("cvc", e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition shadow-2xs"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <Lock className="size-4" />
                  <span>Payer {amountFormatted}</span>
                </button>

                {/* Footer Text */}
                <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-gray-500 pt-1">
                  <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                  <span>Chiffrement SSL 256-bit certifié PCI-DSS</span>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
