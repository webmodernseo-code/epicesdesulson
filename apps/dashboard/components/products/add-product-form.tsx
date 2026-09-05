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
  Tag, 
  Flame, 
  Globe, 
  Layers,
  Euro,
  FileText
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

const TEXTURES = [
  "Mouture fine / Poudre",
  "Concassé / Flocons",
  "Grains entiers / Baies",
  "Gousses entières",
  "Mélange d'herbes & épices",
];

export default function AddProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [sku, setSku] = useState(`SUL-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [format, setFormat] = useState(FORMATS[0]);
  const [texture, setTexture] = useState(TEXTURES[0]);
  const [price, setPrice] = useState("6.90");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("100");
  const [lowStockThreshold, setLowStockThreshold] = useState("15");
  const [intensity, setIntensity] = useState<"1" | "2" | "3" | "4" | "5">("3");
  const [aromaticNotes, setAromaticNotes] = useState("");
  const [culinaryPairing, setCulinaryPairing] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Photo uploads
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [textureImage, setTextureImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "primary" | "texture") => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (type === "primary") setPrimaryImage(preview); else setTextureImage(preview);
      const form = new FormData(); form.set("file", file);
      try { const response = await fetch("/api/admin/uploads", { method: "POST", body: form }); const json = await response.json(); if (!response.ok) throw new Error(json.error); if (type === "primary") setPrimaryImage(json.data.url); else setTextureImage(json.data.url); URL.revokeObjectURL(preview); toast.success("Image envoyée sur Cloudinary."); } catch (error) { toast.error(error instanceof Error ? error.message : "Téléversement impossible."); }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Veuillez indiquer le nom de l'épice.");
      return;
    }

    if (!primaryImage || primaryImage.startsWith("blob:")) { toast.error("Ajoutez d'abord une image produit via Cloudinary."); return; }
    setSaving(true);
    try {
      const response = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, sku, category, origin, format, price, comparePrice, stock: Number(stock), description, image: primaryImage, secondaryImage: textureImage?.startsWith("blob:") ? null : textureImage, isPublished }) });
      const json = await response.json(); if (!response.ok) throw new Error(json.error);
      toast.success(`L'épice "${name}" a été ajoutée au catalogue.`); router.push("/products");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Enregistrement impossible."); setSaving(false); }
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
              Ajouter une Nouvelle Épice
            </h1>
            <p className="text-xs text-gray-500">
              Formulaire dédié au catalogue gourmet des Épices de Sulson
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
            {saving ? "Enregistrement..." : "Publier l'épice"}
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
                  placeholder="ex: Épice Spéciale Poulet & Rôtis, Poivre Noir Voatsiperifery..."
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
                    placeholder="ex: Boisé, poivré, touches d'agrumes, fumé..."
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
                    placeholder="ex: Poulet rôti, grillades, poissons blancs, sauces..."
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
                  placeholder="Décrivez l'histoire de cette épice, son terroir, son parfum à l'ouverture du sachet et la meilleure manière de la cuisiner..."
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
                  placeholder="6.90"
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
                  placeholder="Facultatif (ex: 8.90)"
                  className="w-full h-11 pl-3.5 pr-8 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  €
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Affiché comme prix barré pour indiquer une remise.
              </p>
            </div>
          </div>

          {/* Card: Stock & Disponibilité */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Package className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">Stock & Logistique</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Quantité en stock disponible
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
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
                placeholder="15"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Une alerte orange apparaîtra sur le cockpit en dessous de ce seuil.
              </p>
            </div>
          </div>

          {/* Card: Statut & Mise en ligne */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Mise en Ligne</h3>
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
                <span>{saving ? "Publication..." : "Enregistrer et publier"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
