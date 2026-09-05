"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Switch from "@/components/ui/switch";
import { 
  ArrowLeft, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Package, 
  Flame, 
  Layers,
  Euro,
  Trash2
} from "lucide-react";

const CATEGORIES = [
  "Épices Volailles & Rôtis",
  "Épices Viandes & Grillades",
  "Épices Poissons & Marinades",
  "Assaisonnements Signatures",
  "Poivres Rares & Baies",
  "Vanilles d'Exception",
  "Packs & Coffrets Gourmets",
  "Sels & Condiments Nobles",
];

const ORIGINS = [
  "Cameroun (Recette Artisanale)",
  "Madagascar (Sambava / Terroir Sauvage)",
  "Cambodge (Kampot IGP)",
  "Inde (Madras / Kerala)",
  "Sri Lanka (Ceylan)",
  "France (Atelier Sulson)",
  "Autre terroir d'exception",
];

const FORMATS = [
  "Sachet kraft fraîcheur 100g",
  "Sachet kraft fraîcheur 250g",
  "Format économique 500g",
  "Grand Format Chef 1 Kg (1000g)",
  "Pot verre hermétique 50g",
  "Tube verre 3 gousses entières",
  "Coffret dégustation 4 saveurs",
];

export default function EditProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("Épice de Sulson - Spéciale Poulet");
  const [sku, setSku] = useState("SUL-301");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [format, setFormat] = useState(FORMATS[0]);
  const [price, setPrice] = useState("6.90");
  const [comparePrice, setComparePrice] = useState("8.50");
  const [stock, setStock] = useState("145");
  const [lowStockThreshold, setLowStockThreshold] = useState("20");
  const [intensity, setIntensity] = useState<"1" | "2" | "3" | "4" | "5">("3");
  const [aromaticNotes, setAromaticNotes] = useState("Poivré, herbes aromatiques, touches de gingembre sauvage");
  const [culinaryPairing, setCulinaryPairing] = useState("Poulet rôti, cuisses au four, marinades de volaille");
  const [description, setDescription] = useState("Mélange d'épices d'exception spécialement équilibré pour sublimer les volailles et rôtis. Une recette artisanale riche en arômes.");
  const [isPublished, setIsPublished] = useState(true);

  // Photo preview
  const [primaryImage, setPrimaryImage] = useState<string | null>("/images/products/epice-poulet-recto.jpg");
  const [textureImage, setTextureImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "primary" | "texture") => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "primary") setPrimaryImage(url);
      else setTextureImage(url);
      toast.success("Image mise à jour");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(`Les modifications pour "${name}" ont été enregistrées !`);
      router.push("/products");
    }, 500);
  };

  return (
    <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="size-9 rounded-xl bg-gray-100 hover:bg-gray-200/80 flex items-center justify-center text-gray-700 transition-colors"
          >
            <ArrowLeft className="size-4.5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Modifier l'Épice : {name}
            </h1>
            <p className="text-xs text-gray-500">
              Mise à jour des informations, tarifs et stocks boutique
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href="/products"
            className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <Button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-full text-xs cursor-pointer shadow-sm"
          >
            {saving ? "Enregistrement..." : "Mettre à jour"}
          </Button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Identité & Origine */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Sparkles className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                1. Identité de l'Épice & Origine
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nom de l'épice *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Référence interne (SKU)
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Catégorie d'épice
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Terroir d'origine & Récolte
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {ORIGINS.map((orig) => (
                      <option key={orig} value={orig}>
                        {orig}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Format & Poids net
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Profil Aromatique & Accords */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Flame className="size-5 text-amber-500" />
              <h2 className="text-sm font-bold text-gray-900">
                2. Profil Gustatif & Accords Culinaires
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Intensité aromatique / Piquant (Échelle 1 à 5)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(["1", "2", "3", "4", "5"] as const).map((level) => {
                    const labels = ["Très Doux", "Doux", "Équilibré", "Puissant", "Très Piquant"];
                    const isSelected = intensity === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setIntensity(level)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-500 text-white border-amber-600 shadow-xs font-bold"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 font-medium"
                        }`}
                      >
                        <span className="block text-sm">Niv. {level}</span>
                        <span className="block text-[10px] opacity-80 mt-0.5 truncate">
                          {labels[parseInt(level) - 1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Notes aromatiques dominantes
                  </label>
                  <input
                    type="text"
                    value={aromaticNotes}
                    onChange={(e) => setAromaticNotes(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Accords culinaires recommandés
                  </label>
                  <input
                    type="text"
                    value={culinaryPairing}
                    onChange={(e) => setCulinaryPairing(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Description de l'épice & Conseils de dégustation
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Visuels Photos */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <UploadCloud className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                3. Visuels Photos du Produit
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1: Packaging */}
              <div className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-5 text-center transition-all bg-gray-50/50">
                {primaryImage ? (
                  <div className="space-y-3">
                    <img
                      src={primaryImage}
                      alt="Aperçu principal"
                      className="size-32 object-cover rounded-xl mx-auto border border-gray-200 shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(null)}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      Remplacer la photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block space-y-2">
                    <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <UploadCloud className="size-6" />
                    </div>
                    <span className="block text-xs font-bold text-gray-800">
                      Photo Principale (Sachet / Pot)
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      Format JPG ou PNG (recommandé 800x800)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "primary")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Photo 2: Texture / Zoom */}
              <div className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-5 text-center transition-all bg-gray-50/50">
                {textureImage ? (
                  <div className="space-y-3">
                    <img
                      src={textureImage}
                      alt="Aperçu texture"
                      className="size-32 object-cover rounded-xl mx-auto border border-gray-200 shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setTextureImage(null)}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      Remplacer la photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block space-y-2">
                    <div className="size-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                      <Layers className="size-6" />
                    </div>
                    <span className="block text-xs font-bold text-gray-800">
                      Photo Texture / Grains (Optionnel)
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      Zoom sur la poudre ou les grains
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "texture")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Pricing & Stock & Status */}
        <div className="space-y-6">
          {/* Card: Tarification */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Euro className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">Tarification</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Prix de Vente TTC (€) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full h-11 pl-3.5 pr-8 rounded-xl border border-gray-300 text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  €
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Prix barré / Référence (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  className="w-full h-11 pl-3.5 pr-8 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  €
                </span>
              </div>
            </div>
          </div>

          {/* Card: Stock & Logistique */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Package className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">Stock & Disponibilité</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Quantité en stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Seuil d'alerte stock bas
              </label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Card: Statut */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Visibilité Boutique</h3>
                <p className="text-xs text-gray-500">
                  {isPublished ? "Visible sur epicesdesulson.com" : "Brouillon masqué"}
                </p>
              </div>
              <Switch checked={isPublished} onChange={setIsPublished} />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full text-xs cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="size-4" />
                <span>{saving ? "Enregistrement..." : "Sauvegarder les modifications"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
