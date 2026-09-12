import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <section className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-600">Erreur 403</p>
        <h1 className="text-3xl font-bold text-gray-900">Accès refusé</h1>
        <p className="mt-4 text-gray-600">
          Cette section est réservée au super administrateur.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800"
        >
          Retour au tableau de bord
        </Link>
      </section>
    </main>
  );
}
