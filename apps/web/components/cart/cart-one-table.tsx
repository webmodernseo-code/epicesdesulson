"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart, parseCartPrice } from "@/context/cart-context";

export default function CartOneTable() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="border border-gray-200 rounded-3xl p-10 bg-white text-center flex flex-col items-center justify-center">
        <span className="size-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          <i className="hgi hgi-stroke hgi-shopping-cart-01 text-4xl" />
        </span>
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          Votre panier est actuellement vide
        </h4>
        <p className="text-base text-gray-600 max-w-md mb-6">
          Découvrez nos épices authentiques, poivres rares et notre pack 4 saveurs pour commencer vos achats.
        </p>
        <Link
          href="/#nos-epices"
          className="btn btn-primary text-white font-bold text-base rounded-full py-3.5 px-8 shadow-md"
        >
          Découvrir nos Épices
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-800">
            <tr>
              <th className="py-4 px-5 font-extrabold text-base text-gray-900">Produit</th>
              <th className="py-4 px-4 font-extrabold text-base text-gray-900">Prix unitaire</th>
              <th className="py-4 px-4 font-extrabold text-base text-gray-900 text-center">Quantité</th>
              <th className="py-4 px-4 font-extrabold text-base text-gray-900 text-right">Total</th>
              <th className="py-4 px-5 font-extrabold text-base text-gray-900 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const priceNum = parseCartPrice(item.currentPrice);
              const qty = Math.max(1, Number(item.quantity) || 1);
              const totalRow = (priceNum * qty).toFixed(2);

              return (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-5 px-5">
                    <div className="flex items-center gap-x-4">
                      <div className="size-20 rounded-2xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-1.5">
                        <Image
                          src={item.image || "/images/products/pack-4-saveurs-sulson.jpg"}
                          alt={item.title}
                          width={80}
                          height={80}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-y-1">
                        <h5 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-1">
                          {item.title}
                        </h5>
                        {item.pack && (
                          <span className="text-sm font-semibold text-gray-600">
                            Format : <strong className="text-primary font-bold">{item.pack}</strong>
                          </span>
                        )}
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit">
                          En stock • Expédié sous 24h
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-4 font-extrabold text-base sm:text-lg text-gray-950 whitespace-nowrap">
                    {item.currentPrice}
                  </td>

                  <td className="py-5 px-4 text-center whitespace-nowrap">
                    <div className="border border-gray-200 inline-flex items-center justify-center rounded-full py-1.5 px-3.5 gap-x-3 bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:text-primary transition-colors text-gray-700 cursor-pointer"
                        aria-label="Diminuer quantité"
                      >
                        <i className="hgi hgi-stroke hgi-remove-circle text-xl" />
                      </button>
                      <span className="text-base font-extrabold text-gray-950 min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:text-primary transition-colors text-gray-700 cursor-pointer"
                        aria-label="Augmenter quantité"
                      >
                        <i className="hgi hgi-stroke hgi-add-circle text-xl" />
                      </button>
                    </div>
                  </td>

                  <td className="py-5 px-4 text-right font-extrabold text-lg sm:text-xl text-gray-950 whitespace-nowrap">
                    {totalRow} €
                  </td>

                  <td className="py-5 px-5 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center justify-center size-10 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                      title="Supprimer cet article"
                    >
                      <i className="hgi hgi-stroke hgi-delete-01 text-xl" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
