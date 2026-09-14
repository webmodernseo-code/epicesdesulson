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
      "100% Naturel & Fait au Cameroun. Réunissez les 4 trésors d'épices de Sulson dans un coffret d'exception pour sublimer toutes vos recettes du quotidien.",
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
      "L'assaisonnement signature universel pour vos sauces onctueuses, poêlées de légumes et créations du Chef. Une explosion de goût 100% naturel.",
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
    <section className="pt-2 sm:pt-4 md:pt-6 lg:pt-7">
      <div className="container">
        <div className="w-full relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={700}
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
                <div className="relative w-full min-h-[440px] sm:min-h-[480px] md:min-h-[530px] lg:min-h-[580px] xl:min-h-[620px] flex items-center px-4 sm:px-7 md:px-10 lg:px-14 xl:px-16 py-6 sm:py-8 md:py-10 pb-12 sm:pb-14 md:pb-10 overflow-hidden">
                  <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center w-full z-10">
                    {/* Left / Bottom Column: Typography & Action */}
                    <div className="w-full md:col-span-7 lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left justify-center">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full border border-white/25 shadow-2xs whitespace-nowrap">
                          {slide.offer}
                        </span>
                        <span className="px-3 py-1 text-gray-950 text-[10px] sm:text-xs md:text-sm font-bold bg-warning-light rounded-full shadow-2xs whitespace-nowrap">
                          {slide.discount}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-[1.18] tracking-tight my-1 sm:my-1.5">
                        {slide.title}
                        <span className="block text-amber-300 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold mt-1 sm:mt-1.5">
                          {slide.subtitle}
                        </span>
                      </h2>

                      {/* Description */}
                      <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg lg:max-w-xl my-2 sm:my-3">
                        {slide.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-2.5 sm:mt-3.5 md:mt-4 w-full sm:w-auto flex justify-center md:justify-start">
                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className="btn btn-primary text-white text-xs sm:text-sm md:text-base font-bold rounded-full py-2.5 px-6 sm:py-3 sm:px-8 inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                        >
                          <span>{slide.cta}</span>
                          <i className="hgi hgi-stroke hgi-arrow-down-02 text-xs sm:text-base animate-bounce" />
                        </button>
                      </div>
                    </div>

                    {/* Right / Top Column: Studio Product Showcase */}
                    <div className="w-full md:col-span-5 lg:col-span-5 flex items-center justify-center">
                      <div className="relative w-full max-w-[170px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[430px] h-[145px] sm:h-[190px] md:h-[260px] lg:h-[330px] xl:h-[380px] flex items-center justify-center">
                        {/* Luxury Ambient Glow */}
                        <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/25 via-emerald-400/20 to-transparent rounded-3xl blur-md -z-10" />
                        
                        {/* Studio Card Frame */}
                        <div className="relative w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm border border-white/25 p-2 sm:p-3 shadow-xl flex items-center justify-center overflow-hidden group/card hover:scale-103 transition-transform duration-300">
                          <Image
                            src={slide.productImage}
                            alt={slide.title}
                            width={400}
                            height={320}
                            unoptimized
                            className="object-contain w-full h-full max-h-full max-w-full rounded-xl transition-transform duration-500 group-hover/card:scale-105 drop-shadow-md"
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
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-7 sm:h-8 md:h-9 px-5 sm:px-8 bg-white rounded-t-[16px] sm:rounded-t-[24px] flex items-center justify-center z-30 shadow-xs pointer-events-auto">
            <div className="home-three-hero-pagination-dots flex items-center justify-center gap-1.5 sm:gap-2" />
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button
            ref={setPrevEl}
            aria-label="Précédent"
            className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 lg:left-6 size-9 sm:size-10 lg:size-11 rounded-full bg-black/30 hover:bg-primary text-white items-center justify-center z-30 transition-all pointer-events-auto backdrop-blur-xs hidden lg:flex opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
          >
            <i className="hgi hgi-stroke hgi-arrow-left-01 text-lg sm:text-xl" />
          </button>
          <button
            ref={setNextEl}
            aria-label="Suivant"
            className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 lg:right-6 size-9 sm:size-10 lg:size-11 rounded-full bg-black/30 hover:bg-primary text-white items-center justify-center z-30 transition-all pointer-events-auto backdrop-blur-xs hidden lg:flex opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
          >
            <i className="hgi hgi-stroke hgi-arrow-right-01 text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
