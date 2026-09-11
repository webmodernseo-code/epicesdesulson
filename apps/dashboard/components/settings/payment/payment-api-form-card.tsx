"use client";

import { useState } from "react";
import Switch from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

interface PaymentApiFormCardProps {
  title: string;
  description: string;
  isActive: boolean;
  logo: string;
  onToggle: (val: boolean) => void;
}

export default function PaymentApiFormCard({
  title,
  description,
  isActive,
  logo,
  onToggle,
}: PaymentApiFormCardProps) {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="border border-gray-500/20 rounded-2xl p-4 bg-white flex flex-col gap-4 sm:gap-6">
      <div className="flex justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="size-12 rounded-full overflow-hidden shrink-0">
            <Image
              src={logo}
              alt={title}
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
          <div>
            <h4 className="font-semibold text-light-primary-text text-base mb-0.5">
              {title}
            </h4>
            <p className="text-sm text-light-secondary-text">{description}</p>
          </div>
        </div>
        <Switch checked={isActive} onChange={() => onToggle(!isActive)} />
      </div>

      <div className="space-y-4">
        <FloatingInput label="Public Key" className="h-10" />
        <div className="relative">
          <FloatingInput
            label="Secret Key"
            type={showSecret ? "text" : "password"}
            className="h-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowSecret(!showSecret)}
            tabIndex={-1}
            aria-label={showSecret ? "Masquer" : "Afficher"}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <FloatingInput label="Webhook Endpoint" className="h-10" />
      </div>

      <div>
        <Button variant="outline">Test Connection</Button>
      </div>
    </div>
  );
}
