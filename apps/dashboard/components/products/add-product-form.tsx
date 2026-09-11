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
  Euro,
  Image as ImageIcon,
  ChefHat,
  Leaf
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
  "Cameroun (Recette Traditionnelle)",
  "Cameroun (Poivre de Guinée)",
  "Cameroun (Le Secret de Sulson)",
  "Cameroun (Recette Artisanale)",
  "Atelier Sulson (Pack Lot 4)",
  "Madagascar (Sambava / Terroir Sauvage)",
  "Cambodge (Kampot IGP)",
  "Inde (Madras / Kerala)",
  "Sri Lanka (Ceylan)",
  "France (Atelier Sulson)",
  "Autre terroir d'exception",
];

export default function AddProductForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sku, setSku] = useState(`SUL-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [chefTip, setChefTip] = useState("");
  const [price, setPrice] = useState("6.90");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("100");
  const [isPublished, setIsPublished] = useState(true);

  // Cloudinary Images
  const [rectoImage, setRectoImage] = useState<string | null>(null);
  const [versoImage, setVersoImage] = useState<string | null>(null);
  const [uploadingSide, setUploadingSide] = useState<"recto" | "verso" | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: "recto" | "verso") => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (side === "recto") setRectoImage(preview);
      else setVersoImage(preview);

      setUploadingSide(side);
      const form = new FormData();
      form.set("file", file);

      try {
        const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);

        if (side === "recto") setRectoImage(json.data.url);
        else setVersoImage(json.data.url);

        URL.revokeObjectURL(preview);
        toast.success(`Photo ${side === "recto" ? "Face (Recto)" : "Dos (Verso)"} enregistrée sur Cloudinary !`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Téléversement impossible.");
      } finally {
        setUploadingSide(null);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Veuillez indiquer le nom de l'épice.");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      toast.error("Veuillez indiquer un prix valide.");
      return;
    }
    if (!rectoImage || rectoImage.startsWith("blob:")) {
      toast.error("Veuillez ajouter la photo de Face (Recto) de l'épice.");
      return;
    }

    setSaving(true);
    try {
      // Create slug from name
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          subtitle: subtitle.trim(),
          slug: `${slug}-100g`,
          sku: sku.trim(),
          category,
          origin,
          format: "100g",
          price,
          comparePrice: comparePrice || null,
          stock: Number(stock) || 0,
          description: description.trim() || name.trim(),
          image: rectoImage,
          imageVerso: versoImage || null,
          ingredients: ingredients.trim(),
          chefTip: chefTip.trim(),
          isPublished,
        }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error);

      toast.success(`L'article "${name}" a été créé et sa page produit est disponible !`);
      router.push("/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enregistrement impossible.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Navigation & Actions */}
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
              Ajouter un Nouvel Article
            </h1>
            <p className="text-xs text-gray-500">
              Téléversez vos visuels Cloudinary et publiez la nouvelle fiche produit automatiquement
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
            disabled={saving || uploadingSide !== null}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-full text-xs cursor-pointer shadow-sm disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Publier l'article"}
          </Button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Informations & Cloudinary Photos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Sparkles className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                Informations Principales
              </h2>
            </div>

            <div className="space-y-4">
              {/* Nom de l'épice */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Nom de l'épice *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Épice de Sulson - Spéciale Poulet"
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Sous-titre culinaire */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Sous-titre / Spécialité (ex: Rôtis, Grillades & Cuisses Dorées)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="ex: Pour Bœufs, Agneaux & Brochettes Suya"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description & Histoire */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Description & Histoire du mélange *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'épice, son profil aromatique et son secret de fabrication..."
                  required
                  className="w-full p-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Cloudinary Photos: Face & Dos */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <ImageIcon className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                Photos du Sachet (Hébergées sur Cloudinary)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo Face (Recto) */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900">Face (Recto) *</span>
                    <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                      Obligatoire
                    </span>
                  </div>

                  {rectoImage ? (
                    <div className="space-y-2 text-center">
                      <div className="w-full h-44 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shadow-2xs overflow-hidden">
                        <img
                          src={rectoImage.startsWith("http") || rectoImage.startsWith("blob:") || rectoImage.startsWith("data:") || rectoImage.startsWith("/") ? rectoImage : `/images/products/${rectoImage}`}
                          alt="Face Recto"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (sku?.includes("301") || name?.toLowerCase().includes("poulet")) {
                              target.src = "/images/products/epice-poulet-recto.jpg";
                            } else if (sku?.includes("302") || name?.toLowerCase().includes("viande")) {
                              target.src = "/images/products/epice-viande-recto.jpg";
                            } else if (sku?.includes("303") || name?.toLowerCase().includes("poisson")) {
                              target.src = "/images/products/epice-poisson-recto.jpg";
                            } else if (sku?.includes("304") || name?.toLowerCase().includes("gourmande") || name?.toLowerCase().includes("secret")) {
                              target.src = "/images/products/epice-gourmande-recto.jpg";
                            } else {
                              target.src = "/images/products/pack-4-saveurs-sulson.jpg";
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <label className="text-xs text-emerald-600 hover:underline font-bold cursor-pointer">
                          Changer
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "recto")}
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-300">•</span>
                        <button
                          type="button"
                          onClick={() => setRectoImage(null)}
                          className="text-xs text-red-500 hover:underline font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-xl p-6 text-center transition-all bg-white">
                      <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                        <UploadCloud className="size-5" />
                      </div>
                      <span className="block text-xs font-bold text-gray-800">
                        {uploadingSide === "recto" ? "Téléversement..." : "Photo de Face"}
                      </span>
                      <span className="block text-[10px] text-gray-400 mt-0.5">
                        JPG, PNG ou WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "recto")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Photo Dos (Verso) */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900">Dos (Verso)</span>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      Facultatif
                    </span>
                  </div>

                  {versoImage ? (
                    <div className="space-y-2 text-center">
                      <div className="w-full h-44 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shadow-2xs overflow-hidden">
                        <img
                          src={versoImage.startsWith("http") || versoImage.startsWith("blob:") || versoImage.startsWith("data:") || versoImage.startsWith("/") ? versoImage : `/images/products/${versoImage}`}
                          alt="Dos Verso"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (sku?.includes("301") || name?.toLowerCase().includes("poulet")) {
                              target.src = "/images/products/epice-poulet-verso.jpg";
                            } else if (sku?.includes("302") || name?.toLowerCase().includes("viande")) {
                              target.src = "/images/products/epice-viande-verso.jpg";
                            } else if (sku?.includes("303") || name?.toLowerCase().includes("poisson")) {
                              target.src = "/images/products/epice-poisson-verso.jpg";
                            } else if (sku?.includes("304") || name?.toLowerCase().includes("gourmande") || name?.toLowerCase().includes("secret")) {
                              target.src = "/images/products/epice-gourmande-verso.jpg";
                            } else {
                              target.src = "/images/products/epice-poulet-verso.jpg";
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <label className="text-xs text-emerald-600 hover:underline font-bold cursor-pointer">
                          Changer
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "verso")}
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-300">•</span>
                        <button
                          type="button"
                          onClick={() => setVersoImage(null)}
                          className="text-xs text-red-500 hover:underline font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-xl p-6 text-center transition-all bg-white">
                      <div className="size-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center mx-auto mb-2">
                        <UploadCloud className="size-5" />
                      </div>
                      <span className="block text-xs font-bold text-gray-800">
                        {uploadingSide === "verso" ? "Téléversement..." : "Photo de Dos"}
                      </span>
                      <span className="block text-[10px] text-gray-400 mt-0.5">
                        Ingrédients & Conseils
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "verso")}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Culinary Insights: Ingredients & Chef Tips */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Leaf className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                Composition & Savoir-faire Culinaire
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Ingrédients 100% Naturels (séparés par des virgules)
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="ex: Curcuma frais, Paprika doux, Gingembre sauvage, Ail, Muscade, Poivre noir"
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <ChefHat className="size-4 text-primary" />
                <span>Conseil & Astuce du Chef Sulson</span>
              </label>
              <textarea
                rows={2}
                value={chefTip}
                onChange={(e) => setChefTip(e.target.value)}
                placeholder="ex: Mélangez avec un filet d'huile et du jus de citron. Massez généreusement avant de laisser reposer 30 minutes."
                className="w-full p-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Tarifs, Stock & Statut */}
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
                Prix barré de référence (€)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder="Facultatif (ex: 8.50)"
                  className="w-full h-11 pl-3.5 pr-8 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  €
                </span>
              </div>
            </div>
          </div>

          {/* Card: Stock & SKU */}
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
                Référence interne (SKU)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Card: Mise en ligne */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Mise en Ligne</h3>
                <p className="text-xs text-gray-500">
                  {isPublished ? "Visible sur la boutique" : "Brouillon masqué"}
                </p>
              </div>
              <Switch checked={isPublished} onChange={setIsPublished} />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Button
                type="submit"
                disabled={saving || uploadingSide !== null}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full text-xs cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
