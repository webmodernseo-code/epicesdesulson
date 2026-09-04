"use client";

import { AnimatePresence, motion } from "framer-motion";

interface LoginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: () => void;
  onOpenForgotPassword: () => void;
}

export default function LoginDrawer({
  isOpen,
  onClose,
  onOpenForgotPassword,
}: LoginDrawerProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard (port 3001) or admin session
    window.location.href = "http://localhost:3001";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="login-drawer"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="login-page-sidebar fixed right-0 top-0 h-full z-99 max-w-[460px] w-full bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between relative bg-white">
            <div>
              <h5 className="font-bold text-gray-900 text-lg">
                Espace Vendeuse & Administration
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                Connexion sécurisée au tableau de bord
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="cursor-pointer inline-flex items-center justify-center size-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-lg text-gray-700" />
            </button>
          </div>

          {/* Content & Form */}
          <div className="p-6 sm:p-8 flex flex-col gap-y-6 overflow-y-auto flex-1">
            <div className="text-center py-2">
              <div className="size-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
                <i className="hgi hgi-stroke hgi-lock-sync-01 text-3xl" />
              </div>
              <h4 className="text-base font-bold text-gray-900">
                Identification Gestionnaire
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Veuillez renseigner vos accès pour piloter la boutique.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                >
                  Identifiant ou Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="hgi hgi-stroke hgi-user-circle text-lg" />
                  </span>
                  <input
                    type="text"
                    id="admin-username"
                    required
                    defaultValue="admin@lesepicesdesulson.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="admin@lesepicesdesulson.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="hgi hgi-stroke hgi-shield-security text-lg" />
                  </span>
                  <input
                    type="password"
                    id="admin-password"
                    required
                    defaultValue="••••••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenForgotPassword();
                  }}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <i className="hgi hgi-stroke hgi-login-03 text-lg text-white" />
                  <span>Accéder à l'administration</span>
                </button>
              </div>
            </form>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-center flex items-center justify-center gap-2">
              <i className="hgi hgi-stroke hgi-lock-password text-sm text-gray-600" />
              <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                Espace strictement réservé à l'équipe Les Épices de Sulson.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
