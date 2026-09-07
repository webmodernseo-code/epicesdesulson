export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8 md:p-10">
          {children}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Les Épices de Sulson — Cockpit Administrateur Privé
        </p>
      </div>
    </div>
  );
}
