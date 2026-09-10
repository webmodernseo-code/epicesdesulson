"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
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
  Leaf,
  ChefHat
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

const DEFAULT_PRODUCTS_MAP: Record<string, {
  name: string;
  subtitle?: string;
  sku: string;
  category: string;
  origin: string;
  price: string;
  comparePrice: string;
  stock: string;
  description: string;
  ingredients?: string;
  chefTip?: string;
  image: string;
  imageVerso?: string;
  isPublished: boolean;
}> = {
  "SUL-301": {
    name: "Épice de Sulson - Spéciale Poulet",
    subtitle: "Rôtis, Grillades & Cuisses Dorées",
    sku: "SUL-301",
    category: "Épices Volailles & Rôtis",
    origin: "Cameroun (Recette Traditionnelle)",
    price: "6.90",
    comparePrice: "8.50",
    stock: "145",
    description: "L'alliance parfaite du curcuma frais, paprika doux, gingembre et muscade pour une chair tendre, parfumée et dorée.",
    ingredients: "Curcuma frais, Paprika doux noble, Gingembre artisanal, Ail, Oignon, Muscade, Poivre noir, Coriandre",
    chefTip: "Mélangez 2 cuillères d'épices avec un filet d'huile d'olive et un jus de citron. Massez généreusement avant cuisson.",
    image: "/images/products/epice-poulet-recto.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    isPublished: true,
  },
  "SUL-302": {
    name: "Épice de Sulson - Spéciale Viande",
    subtitle: "Pour Bœufs, Agneaux & Grillades",
    sku: "SUL-302",
    category: "Épices Viandes & Grillades",
    origin: "Cameroun (Recette Traditionnelle)",
    price: "6.90",
    comparePrice: "8.50",
    stock: "120",
    description: "Un mélange noble au paprika, poivre noir sauvage, clou de girofle et laurier conçu pour révéler la richesse de vos viandes.",
    ingredients: "Paprika fumé & doux, Poivre noir de Penja IGP, Ail, Oignon, Gingembre sauvage, Clou de girofle, Laurier, Thym",
    chefTip: "Frottez la viande à sec 20 minutes avant la cuisson au barbecue pour caraméliser les sucs.",
    image: "/images/products/epice-viande-recto.jpg",
    imageVerso: "/images/products/epice-viande-verso.jpg",
    isPublished: true,
  },
  "SUL-303": {
    name: "Épice de Sulson - Spéciale Poisson",
    subtitle: "Poissons Grillés, Braisés & Soupes",
    sku: "SUL-303",
    category: "Épices Poissons & Marinades",
    origin: "Cameroun (Poivre de Guinée)",
    price: "6.90",
    comparePrice: "8.50",
    stock: "98",
    description: "L'arôme authentique du poivre de Guinée, céleri, graines de moutarde et thym pour poissons marinés et braisés.",
    ingredients: "Poivre de Guinée (Maniguette), Rondelles, Pèbè camerounais, Ail, Gingembre, Thym citronné, Céleri",
    chefTip: "Entaillez le poisson, massez avec la marinade épices + huile + citron vert et saisissez à feu vif.",
    image: "/images/products/epice-poisson-recto.jpg",
    imageVerso: "/images/products/epice-poisson-verso.jpg",
    isPublished: true,
  },
  "SUL-304": {
    name: "Le Secret de Sulson - Saveur Gourmande",
    subtitle: "Assaisonnement Signature Universel & Passe-Partout",
    sku: "SUL-304",
    category: "Assaisonnements Signatures",
    origin: "Cameroun (Le Secret de Sulson)",
    price: "6.90",
    comparePrice: "8.50",
    stock: "210",
    description: "Notre composition signature secrète alliant herbes nobles et épices douces pour féculents, légumes sautés et sauces.",
    ingredients: "12 Épices précieuses camerounaises, Curcuma doux, Paprika, Ail, Échalote, Gingembre, Poivres rares",
    chefTip: "Saupoudrez 1 cuillère à café dans votre riz en cours de cuisson ou dans votre sauce mijotée.",
    image: "/images/products/epice-gourmande-recto.jpg",
    imageVerso: "/images/products/epice-gourmande-verso.jpg",
    isPublished: true,
  },
  "SUL-305": {
    name: "Le Pack Intégral : 4 Saveurs Authentiques",
    subtitle: "Poulet • Viande • Poisson • Secret de Sulson",
    sku: "SUL-305",
    category: "Packs & Coffrets Gourmets",
    origin: "Atelier Sulson (Pack Lot 4)",
    price: "24.90",
    comparePrice: "27.60",
    stock: "65",
    description: "L'assortiment complet réunissant nos 4 créations artisanales : Poulet (Jaune), Viande (Rouge), Poisson (Bleu) et Gourmande (Orange).",
    ingredients: "Lot de 4 sachets de 100g hermétiques zippés (400g au total)",
    chefTip: "Le cadeau parfait pour transformer toute votre cuisine en festival de saveurs.",
    image: "/images/products/pack-4-saveurs-sulson.jpg",
    imageVerso: "/images/products/epice-poulet-verso.jpg",
    isPublished: true,
  },
};

export default function EditProductForm() {
  const router = useRouter();
  const params = useParams();
  const productId = (params?.id as string) || "";

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sku, setSku] = useState("");
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

  useEffect(() => {
    const upperId = productId.toUpperCase();
    const fallback = DEFAULT_PRODUCTS_MAP[upperId] || DEFAULT_PRODUCTS_MAP[productId];

    if (fallback) {
      setName(fallback.name);
      setSubtitle(fallback.subtitle || "");
      setSku(fallback.sku);
      setCategory(fallback.category);
      setOrigin(fallback.origin);
      setDescription(fallback.description);
      setIngredients(fallback.ingredients || "");
      setChefTip(fallback.chefTip || "");
      setPrice(fallback.price);
      setComparePrice(fallback.comparePrice);
      setStock(fallback.stock);
      setIsPublished(fallback.isPublished);
      setRectoImage(fallback.image);
      setVersoImage(fallback.imageVerso || null);
    }

    if (!productId) {
      setLoading(false);
      return;
    }

    async function loadProduct() {
      try {
        const res = await fetch(`/api/admin/products/${encodeURIComponent(productId)}`);
        if (res.ok) {
          const json = await res.json();
          const p = json?.data || json?.product;
          if (p) {
            setName(p.title || p.name || "");
            setSubtitle(p.subtitle || "");
            setSku(p.code || p.sku || "");
            if (p.category?.name) setCategory(p.category.name);
            else if (typeof p.category === "string") setCategory(p.category);
            if (p.origin) setOrigin(p.origin);
            setDescription(p.description || "");
            if (p.ingredients) {
              setIngredients(Array.isArray(p.ingredients) ? p.ingredients.join(", ") : p.ingredients);
            }
            if (p.chefTip) setChefTip(p.chefTip);
            setPrice(p.basePrice != null ? String(p.basePrice) : "6.90");
            setComparePrice(p.baseOldPrice != null ? String(p.baseOldPrice) : "");
            setStock(p.stockQuantity != null ? String(p.stockQuantity) : "100");
            setIsPublished(p.isAvailable !== false);
            if (p.imageRecto || p.image) setRectoImage(p.imageRecto || p.image);
            if (p.imageVerso) setVersoImage(p.imageVerso);
          }
        }
      } catch (err) {
        console.warn("Information chargée depuis le catalogue local:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

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
        toast.success(`Photo ${side === "recto" ? "Face (Recto)" : "Dos (Verso)"} mise à jour sur Cloudinary !`);
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

    setSaving(true);
    try {
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const payload = {
        name: name.trim(),
        subtitle: subtitle.trim(),
        slug: `${slug}-100g`,
        sku: (sku.trim() || productId || `SUL-${Math.floor(100 + Math.random() * 900)}`).toUpperCase(),
        category,
        origin,
        price,
        comparePrice: comparePrice || null,
        stock: Number(stock) || 0,
        description: description.trim() || name.trim(),
        ingredients: ingredients.trim(),
        chefTip: chefTip.trim(),
        image: rectoImage || "/images/products/epice-poulet-recto.jpg",
        imageVerso: versoImage || null,
        isPublished,
      };

      // Try PUT on specific ID first
      let response = await fetch(`/api/admin/products/${encodeURIComponent(productId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Erreur de mise à jour");

      toast.success(`Les modifications pour "${name}" ont été enregistrées avec succès !`);
      router.push("/products");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Mise à jour impossible.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center text-sm text-gray-500">
        Chargement des informations de l'article...
      </div>
    );
  }

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
              Modifier l'Article {name ? `: ${name}` : ""}
            </h1>
            <p className="text-xs text-gray-500">
              Mise à jour des photos Cloudinary, informations, tarifs et stocks
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
            {saving ? "Enregistrement..." : "Mettre à jour"}
          </Button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
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
                  placeholder="ex: Épice Spéciale Poulet & Rôtis"
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Sous-titre */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Sous-titre / Spécialité
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="ex: Pour Bœufs, Agneaux & Brochettes Suya"
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Description & Conseils d'utilisation *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'épice et son profil aromatique..."
                  required
                  className="w-full p-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>

              {/* Catégorie & Terroir */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Catégorie
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

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Terroir d'origine
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
              </div>
            </div>
          </div>

          {/* Cloudinary Photos: Face & Dos */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <ImageIcon className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">
                Photos du Sachet (Cloudinary)
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
                      <div className="w-full h-44 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shadow-2xs">
                        <img
                          src={rectoImage}
                          alt="Face Recto"
                          className="max-h-full max-w-full object-contain"
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
                      <div className="w-full h-44 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-2 shadow-2xs">
                        <img
                          src={versoImage}
                          alt="Dos Verso"
                          className="max-h-full max-w-full object-contain"
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

          {/* Composition & Tips */}
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
                placeholder="ex: Curcuma frais, Paprika doux, Gingembre sauvage, Ail, Muscade"
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
                placeholder="ex: Massez généreusement avec un filet d'huile avant cuisson."
                className="w-full p-3.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
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

          {/* Card: Statut & Mise en ligne */}
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
                <span>{saving ? "Enregistrement..." : "Enregistrer les modifications"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
