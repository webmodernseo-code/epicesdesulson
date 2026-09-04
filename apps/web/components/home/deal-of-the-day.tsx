"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const target = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative py-16 md:py-24 text-center rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Background Image */}
          <Image
            src="/images/home/spices-timer-bg.jpg"
            alt="Épices et Saveurs du Terroir"
            fill
            unoptimized
            priority
            className="object-cover object-center"
          />

          {/* Light Dark Overlay (Léger & Net) - Preserves 100% Color Vibrancy & Sharp HD Details */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Foreground Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-xl mx-auto px-4 relative z-10"
          >
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-950 bg-warning py-1.5 px-4 inline-flex items-center rounded-full shadow-lg">
                Offre Exceptionnelle du Moment
              </span>
            </div>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold pt-3.5 pb-6 leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)]">
              Jusqu'à -15% sur le Pack Intégral & nos Épices Fraîches
            </h2>
            <div className="flex justify-center gap-3 sm:gap-4 text-center pb-8">
              {[
                { val: timeLeft.days, label: "Jours" },
                { val: timeLeft.hours, label: "Heures" },
                { val: timeLeft.minutes, label: "Min" },
                { val: timeLeft.seconds, label: "Sec" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="bg-white text-gray-950 font-extrabold text-xl sm:text-2xl size-14 sm:size-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                    {item.val}
                  </div>
                  <span className="text-white text-xs font-bold pt-1.5 drop-shadow-sm">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/#nos-epices"
              className="btn btn-primary text-white font-bold text-sm sm:text-base rounded-full py-3.5 px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>En Profiter Maintenant</span>
              <i className="hgi hgi-stroke hgi-arrow-right-02 text-lg" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
