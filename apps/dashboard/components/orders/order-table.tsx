"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import SearchInput from "../common/search-input";
type Status = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
type Order = { id:string; orderNumber:string; customerName:string; customerEmail:string; totalAmount:number; paymentStatus:string; paymentMethod:string; status:Status; createdAt:string; items:{productName:string;formatLabel:string;quantity:number}[] };
const labels:Record<Status,string>={PENDING:"En attente",PAID:"Payée",PROCESSING:"En préparation",SHIPPED:"Expédiée",DELIVERED:"Livrée",CANCELLED:"Annulée",REFUNDED:"Remboursée"};
const nextStatus:Partial<Record<Status,Status>>={PAID:"PROCESSING",PROCESSING:"SHIPPED",SHIPPED:"DELIVERED"};
const euros=new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"});
export default function OrderTable(){
 const [orders,setOrders]=useState<Order[]>([]),[query,setQuery]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const load=useCallback(()=>{setLoading(true);fetch("/api/admin/orders",{cache:"no-store"}).then(async r=>{const j=await r.json();if(!r.ok)throw new Error(j.error);return j}).then(j=>setOrders(j.data)).catch(e=>setError(e.message||"Données indisponibles")).finally(()=>setLoading(false))},[]);
 useEffect(load,[load]);
 const filtered=useMemo(()=>orders.filter(o=>`${o.orderNumber} ${o.customerName} ${o.customerEmail}`.toLowerCase().includes(query.toLowerCase())),[orders,query]);
 async function advance(order:Order){const status=nextStatus[order.status];if(!status)return;const r=await fetch(`/api/admin/orders/${order.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});const j=await r.json();if(!r.ok)return toast.error(j.error||"Mise à jour impossible");toast.success(`Commande ${order.orderNumber} : ${labels[status]}`);load()}
 async function refund(order:Order){if(!window.confirm(`Rembourser intégralement ${order.orderNumber} via ${order.paymentMethod} ?`))return;const r=await fetch(`/api/admin/orders/${order.id}/refund`,{method:"POST"});const j=await r.json();if(!r.ok)return toast.error(j.error||"Remboursement impossible");toast.success(j.message);load()}
 if(error)return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">{error}. Vérifiez la connexion Neon.</div>;
 return <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
  <div className="p-5 border-b flex flex-col sm:flex-row gap-3 justify-between sm:items-center"><div><h2 className="font-bold text-gray-900">Commandes réelles</h2><p className="text-xs text-gray-500">Encaissement, préparation, expédition et remboursement.</p></div><SearchInput placeholder="Commande ou client…" onSearch={setQuery}/></div>
  <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 text-left text-xs text-gray-600"><tr><th className="p-4">Commande</th><th>Client</th><th>Articles</th><th>Paiement</th><th>Total</th><th>Statut</th><th className="pr-4 text-right">Actions</th></tr></thead><tbody>{!loading&&filtered.map(o=><tr key={o.id} className="border-t border-gray-100"><td className="p-4 font-bold">{o.orderNumber}<div className="text-[11px] font-normal text-gray-400">{new Date(o.createdAt).toLocaleString("fr-FR")}</div></td><td>{o.customerName}<div className="text-[11px] text-gray-400">{o.customerEmail}</div></td><td className="max-w-xs text-xs text-gray-600">{o.items.map(i=>`${i.quantity}× ${i.productName} (${i.formatLabel})`).join(", ")}</td><td className={o.paymentStatus==="PAID"?"text-emerald-700":"text-amber-700"}>{o.paymentMethod} · {o.paymentStatus}</td><td className="font-bold">{euros.format(o.totalAmount)}</td><td>{labels[o.status]}</td><td className="pr-4 text-right whitespace-nowrap">{nextStatus[o.status]&&<button onClick={()=>advance(o)} className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">{labels[nextStatus[o.status]!]}</button>}{o.paymentStatus==="PAID"&&o.status!=="REFUNDED"&&<button onClick={()=>refund(o)} className="ml-2 text-xs font-bold text-red-600">Rembourser</button>}<Link href={`/orders/${o.id}`} className="ml-2 text-xs font-bold text-emerald-800">Voir</Link></td></tr>)}</tbody></table></div>
  {loading&&<div className="p-8 text-center text-sm text-gray-500">Chargement…</div>}{!loading&&!filtered.length&&<div className="p-8 text-center text-sm text-gray-500">Aucune commande.</div>}
 </div>
}
