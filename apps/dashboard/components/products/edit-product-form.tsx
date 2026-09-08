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

export default function EditProductForm() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State (Simplifié & Essentiel)
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("6.90");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("100");
  const [isPublished, setIsPublished] = useState(true);

  // Image Upload
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    async function loadProduct() {
      try {
        const res = await fetch(`/api/admin/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.product) {
            const p = data.product;
            setName(p.title || "");
            setSku(p.code || "");
            if (p.category?.name) setCategory(p.category.name);
            if (p.origin) setOrigin(p.origin);
            setDescription(p.description || "");
            setPrice(p.basePrice ? String(p.basePrice) : "6.90");
            setComparePrice(p.baseOldPrice ? String(p.baseOldPrice) : "");
            setStock(p.stockQuantity ? String(p.stockQuantity) : "100");
            setIsPublished(p.isAvailable !== false);
            setPrimaryImage(p.imageRecto || null);
          }
        }
      } catch (err) {
        console.error("Erreur chargement produit:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPrimaryImage(preview);
      setIsUploading(true);
      const form = new FormData();
      form.set("file", file);
      try {
        const response = await fetch("/api/admin/uploads", { method: "POST", body: form });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error);
        setPrimaryImage(json.data.url);
        URL.revokeObjectURL(preview);
        toast.success("Photo du produit mise à jour.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Téléversement impossible.");
      } finally {
        setIsUploading(false);
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
      const targetUrl = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = productId ? "PUT" : "POST";
      const response = await fetch(targetUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          sku: sku.trim(),
          category,
          origin,
          price,
          comparePrice: comparePrice || null,
          stock: Number(stock) || 0,
          description: description.trim() || name.trim(),
          image: primaryImage,
          isPublished,
        }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Erreur de mise à jour");

      toast.success(`Les modifications pour "${name}" ont été enregistrées !`);
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
              Mise à jour rapide des informations, tarifs et stocks
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
            disabled={saving || isUploading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-full text-xs cursor-pointer shadow-sm disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Mettre à jour"}
          </Button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne Gauche (2/3) : Fiche Produit & Description & Photo */}
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
                  placeholder="ex: Épice Spéciale Poulet & Rôtis, Poivre Noir de Penja..."
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description & Conseils */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Description & Conseils d'utilisation *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'épice, son profil aromatique, ses accords culinaires..."
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

              {/* Photo du Produit */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Photo du Produit
                </label>
                <div className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-all bg-gray-50/50">
                  {primaryImage ? (
                    <div className="space-y-3">
                      <img
                        src={primaryImage}
                        alt="Aperçu produit"
                        className="size-36 object-cover rounded-xl mx-auto border border-gray-200 shadow-2xs"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <label className="text-xs text-emerald-600 hover:underline font-bold cursor-pointer">
                          Changer la photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-300">•</span>
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(null)}
                          className="text-xs text-red-500 hover:underline font-medium"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block space-y-2.5 py-4">
                      <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                        <UploadCloud className="size-6" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-800">
                          Cliquez pour ajouter la photo du produit
                        </span>
                        <span className="block text-[11px] text-gray-400 mt-0.5">
                          Format JPG, PNG ou WEBP (recommandé 800×800)
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite (1/3) : Tarifs, Stock & Statut */}
        <div className="space-y-6">
          {/* Card: Tarification */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Euro className="size-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-gray-900">Tarification</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Prix de Vente Réel TTC (€) *
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
                  placeholder="Facultatif (ex: 8.50)"
                  className="w-full h-11 pl-3.5 pr-8 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                  €
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Affiché barré pour mettre en avant une réduction.
              </p>
            </div>
          </div>

          {/* Card: Stock & Logistique */}
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
                disabled={saving || isUploading}
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
