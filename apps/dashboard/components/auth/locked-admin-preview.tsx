"use client";

import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function LockedAdminPreview() {
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden rounded-[28px] border border-white/80 bg-white/75 shadow-[0_24px_80px_rgba(8,129,120,0.08)]">
      <div aria-hidden="true" className="pointer-events-none select-none p-5 sm:p-8 blur-[7px] opacity-35">
        <div className="mb-8 h-9 w-56 rounded-xl bg-slate-300" />
        <div className="flex gap-3 border-b border-slate-200 pb-5">
          {[140, 190, 155, 120].map((width) => <div key={width} className="h-5 rounded bg-slate-300" style={{ width }} />)}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-32 rounded-2xl border border-slate-200 bg-slate-100" />)}
        </div>
        <div className="mt-5 h-72 rounded-2xl border border-slate-200 bg-slate-100" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-white/40 p-5 backdrop-blur-[2px]">
        <div className="w-full max-w-md rounded-[24px] border border-emerald-100 bg-white/95 p-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:p-9">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-[#E8F8F3] text-[#088178] ring-1 ring-[#088178]/10">
            <LockKeyhole className="size-6" strokeWidth={1.8} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#088178]">Accès protégé</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Réservé au super administrateur</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Cette section contient des réglages sensibles. Elle est visible dans le menu, mais son contenu et ses actions ne sont pas chargés avec votre rôle.
          </p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#088178] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#067169]">
            <ShieldCheck className="size-4" /> Retour au tableau de bord
          </Link>
        </div>
      </div>
    </section>
  );
}
