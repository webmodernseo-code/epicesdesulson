"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="container relative z-20 -mb-10 px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center bg-white rounded-3xl p-6 sm:p-7 border border-gray-100"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 py-0.5 px-3 rounded-full inline-flex items-center gap-1 mb-2">
          <i className="hgi hgi-stroke hgi-gift text-xs" />
          Offre Spéciale : -10%
        </span>
        <h3 className="mb-1 text-xl sm:text-2xl font-bold text-gray-900">
          Abonnez-vous à notre Newsletter
        </h3>
        <p className="mb-5 text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Recevez nos nouvelles récoltes, conseils d'experts et profitez de <strong className="text-gray-800">10% de réduction</strong> immédiate.
        </p>

        {/* Form with clean soft shadow effect */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto flex items-center gap-2 p-1.5 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
        >
          <div className="flex items-center gap-2 flex-1 pl-4">
            <i className="hgi hgi-stroke hgi-mail-02 text-base text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1.5"
              placeholder="Votre adresse email..."
              name="email"
              id="email"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary py-2.5 px-6 rounded-full text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap"
          >
            {subscribed ? "✓ Inscrit !" : "S'abonner"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
