"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface BlogArticle {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  paragraphs: {
    heading?: string;
    text: string;
  }[];
  tip?: string;
}

interface BlogModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export default function BlogModal({ article, onClose }: BlogModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {article && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image with close button */}
            <div className="relative h-48 sm:h-60 w-full bg-gray-100 shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-4 right-4 size-9 bg-white/90 hover:bg-white text-gray-800 hover:text-black rounded-full flex items-center justify-center transition-all shadow-md z-10"
              >
                <i className="hgi hgi-stroke hgi-multiplication-sign text-xl" />
              </button>

              {/* Title & Category over image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow-xs">
                  {article.category}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold leading-snug drop-shadow-xs">
                  {article.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed italic border-l-4 border-primary pl-3 bg-amber-50/50 py-2 rounded-r-lg">
                {article.description}
              </p>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                {article.paragraphs.map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    {p.heading && (
                      <h4 className="text-gray-900 font-bold text-sm sm:text-base flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary inline-block" />
                        {p.heading}
                      </h4>
                    )}
                    <p className="text-gray-600 pl-4">{p.text}</p>
                  </div>
                ))}
              </div>

              {article.tip && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3 mt-4">
                  <span className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                    <i className="hgi hgi-stroke hgi-idea-01 text-xl" />
                  </span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">
                      Conseil de la Maison Sulson
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {article.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-primary py-2 px-6 rounded-full text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
