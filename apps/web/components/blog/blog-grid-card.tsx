"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogGridCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  onClick?: () => void;
  delay?: number;
  className?: string;
}

export default function BlogGridCard({
  image,
  category,
  title,
  description,
  onClick,
  className,
  delay = 0.1,
}: BlogGridCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.4 }}
      className={cn("h-full", className)}
    >
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        className="group bg-white border border-gray-200 hover:border-primary/40 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer text-left"
      >
        {/* Image */}
        <div className="mb-3 h-[190px] relative w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-1">
          <Image
            src={image}
            alt={title}
            width={240}
            height={180}
            unoptimized
            className="object-contain max-h-full max-w-full scale-105 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Category Tag in Yellow */}
        <div className="mb-2">
          <span className="text-[11px] font-bold text-gray-950 bg-warning-light px-2.5 py-0.5 rounded-full inline-block">
            {category}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1.5 leading-snug">
          {title}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 grow leading-relaxed">
          {description}
        </p>

        {/* Read action */}
        <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark transition-colors">
          <span>Lire les conseils</span>
          <span className="size-6 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
            <i className="hgi hgi-stroke hgi-arrow-right-02 text-xs" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
