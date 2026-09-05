"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HERO_SLIDES = [
  {
    id: 1,
    productImage: "/images/products/pack-4-saveurs-sulson.jpg",
    offer: "Offre Intégrale",
    discount: "-15% sur le Lot",
    title: "Pack 4 Saveurs Authentiques",
    subtitle: "Poulet • Viande • Poisson • Gourmande",
    description:
      "100% Naturel & Fait au Cameroun. Réunissez les 4 trésors d'épices de Sulson dans un pack d'exception pour sublimer toutes vos recettes du quotidien.",
    cta: "Commander le Pack",
  },
  {
    id: 2,
    productImage: "/images/products/epice-poulet-recto.jpg",
    offer: "100% Naturel",
    discount: "Spécial Volailles",
    title: "Épice Spéciale Poulet",
    subtitle: "Rôtis, Grillades & Cuisses Dorées",
    description:
      "L'alliance magique du curcuma frais, paprika doux, gingembre et muscade pour une chair tendre, parfumée et dorée à chaque cuisson.",
    cta: "Découvrir le Poulet",
  },
  {
    id: 3,
    productImage: "/images/products/epice-viande-recto.jpg",
    offer: "Saveur Voluptueuse",
    discount: "Barbecue & Rôtis",
    title: "Épice Spéciale Viande",
    subtitle: "Pour Bœufs, Agneaux & Grillades",
    description:
      "Un mélange noble au paprika, poivre noir sauvage, clou de girofle et laurier conçu pour révéler la richesse de vos viandes au feu ou au four.",
    cta: "Découvrir la Viande",
  },
  {
    id: 4,
    productImage: "/images/products/epice-poisson-recto.jpg",
    offer: "Recette Traditionnelle",
    discount: "Poisson Braisé",
    title: "Épice Spéciale Poisson",
    subtitle: "Poissons Grillés & Marinades",
    description:
      "L'arôme authentique du poivre de Guinée, céleri, graines de moutarde et thym pour des poissons marinés et grillés à la perfection.",
    cta: "Découvrir le Poisson",
  },
  {
    id: 5,
    productImage: "/images/products/epice-gourmande-recto.jpg",
    offer: "Création Signature",
    discount: "Le Secret de Sulson",
    title: "Épice Saveur Gourmande",
    subtitle: "Sublime Tous Vos Plats Mijotés",
    description:
      "L'assaisonnement signature universel pour vos sauces onctueuses, légumes sautés et créations du Chef. Une explosion de goût 100% naturel.",
    cta: "Découvrir la Gourmande",
  },
];

export default function HomeThreeHero() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("nos-epices");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="pt-3 sm:pt-5 md:pt-6">
      <div className="container">
        <div className="w-full relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={600}
            loop={true}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{
              el: ".home-three-hero-pagination-dots",
              clickable: true,
            }}
            navigation={{ prevEl, nextEl }}
            className="rounded-2xl sm:rounded-3xl bg-primary-darker overflow-hidden shadow-xl relative"
          >
            {HERO_SLIDES.map((slide) => (
              <SwiperSlide key={slide.id} className="bg-primary-darker">
                <div className="relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] flex items-center px-4 sm:px-8 md:px-12 lg:px-16 py-5 sm:py-8 md:py-10 overflow-hidden">
                  <div className="grid grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-center w-full z-10 pb-4 sm:pb-6">
                    {/* Left Column: Responsive & Balanced Typography */}
                    <div className="col-span-7 sm:col-span-7 flex flex-col items-start justify-center">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2.5">
                        <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/25 shadow-2xs whitespace-nowrap">
                          {slide.offer}
                        </span>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-gray-950 text-[10px] sm:text-xs md:text-sm font-bold bg-warning-light rounded-full shadow-2xs whitespace-nowrap">
                          {slide.discount}
                        </span>
                      </div>

                      <h2 className="text-white text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight my-1 sm:my-1.5">
                        {slide.title}
                        <span className="block text-amber-300 text-xs sm:text-base md:text-xl lg:text-2xl font-bold mt-1 sm:mt-1.5 line-clamp-1 sm:line-clamp-none">
                          {slide.subtitle}
                        </span>
                      </h2>

                      {/* Description visible and readable */}
                      <p className="text-white/85 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed max-w-xl my-1.5 sm:my-3 line-clamp-2 md:line-clamp-none">
                        {slide.description}
                      </p>

                      <div className="mt-2 sm:mt-4">
                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className="btn btn-primary text-white text-xs sm:text-sm md:text-base font-bold rounded-full py-2 px-4 sm:py-2.5 sm:px-6 md:py-3.5 md:px-8 inline-flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                        >
                          <span>{slide.cta}</span>
                          <i className="hgi hgi-stroke hgi-arrow-down-02 text-xs sm:text-base animate-bounce" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Studio Card Showcase */}
                    <div className="col-span-5 sm:col-span-5 flex items-center justify-center">
                      <div className="relative w-full max-w-[150px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[420px] h-[140px] sm:h-[200px] md:h-[270px] lg:h-[350px] flex items-center justify-center">
                        {/* Luxury Ambient Glow */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/25 via-emerald-400/20 to-transparent rounded-3xl blur-md -z-10" />
                        
                        {/* Studio Card Frame */}
                        <div className="relative w-full h-full rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25 p-1.5 sm:p-3 shadow-xl flex items-center justify-center overflow-hidden group/card hover:scale-103 transition-transform duration-300">
                          <Image
                            src={slide.productImage}
                            alt={slide.title}
                            width={420}
                            height={350}
                            unoptimized
                            className="object-contain w-full h-full max-h-full max-w-full rounded-lg sm:rounded-xl transition-transform duration-500 group-hover/card:scale-105 drop-shadow-md"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Signature Bottom Scooped Cutout with Centered Pagination Dots */}
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-6 sm:h-9 px-4 sm:px-8 bg-white rounded-t-[14px] sm:rounded-t-[24px] flex items-center justify-center z-30 shadow-xs pointer-events-auto">
            <div className="home-three-hero-pagination-dots flex items-center justify-center gap-1.5 sm:gap-2" />
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button
            ref={setPrevEl}
            aria-label="Précédent"
            className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 size-8 sm:size-10 rounded-full bg-black/30 hover:bg-primary text-white items-center justify-center z-30 transition-all pointer-events-auto backdrop-blur-xs hidden lg:flex opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
          >
            <i className="hgi hgi-stroke hgi-arrow-left-01 text-lg sm:text-xl" />
          </button>
          <button
            ref={setNextEl}
            aria-label="Suivant"
            className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 size-8 sm:size-10 rounded-full bg-black/30 hover:bg-primary text-white items-center justify-center z-30 transition-all pointer-events-auto backdrop-blur-xs hidden lg:flex opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
          >
            <i className="hgi hgi-stroke hgi-arrow-right-01 text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
