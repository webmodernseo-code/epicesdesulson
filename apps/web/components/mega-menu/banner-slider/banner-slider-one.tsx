"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function BannerSliderOne() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".banner-left-sidebar-slider-nav .slider-next",
          prevEl: ".banner-left-sidebar-slider-nav .slider-prev",
        }}
        className="banner-left-sidebar-slider rounded-3xl relative md:bg-transparent bg-[#E6F9FF] sellzy-slider"
      >
        <SwiperSlide>
          <div className="lg:p-0 p-8 pb-15 md:bg-[url('/images/banner-left-sidebar/banner-1.png')] bg-center bg-no-repeat bg-cover rounded-3xl xl:pr-[91px] lg:pr-[50px] single-hero-slider-item flex items-center h-[470px]">
            {/* Content Section */}
            <div className="single-hero-slider-content lg:min-w-[566px] min-w-full ml-auto relative">
              <h2 className="pb-[7px] text-gray-900">Big Savings Await!</h2>
              <h4 className="text-black font-bold text-2xl leading-9 mb-[27px]">
                Up to 50% OFF on Your Favorite Picks 🎉
              </h4>
              <span className="absolute lg:top-[110px] md:top-[85px] top-20 lg:right-[405px] md:right-[405px] right-[405px]">
                <svg
                  width={113}
                  height={7}
                  viewBox="0 0 113 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M68.9065 0.0540253C73.9562 -0.0978374 78.998 0.103468 84.0398 0.251799C90.1651 0.431915 96.2903 0.686216 102.412 1.02173C105.782 1.20537 109.089 1.8552 112.351 2.64983C112.627 2.71693 113.023 2.73813 112.999 3.05245C112.967 3.45153 112.527 3.38442 112.223 3.37736C109.317 3.34204 106.434 3.01007 103.551 2.74166C100.664 2.47325 97.7657 2.33905 94.871 2.2119C85.3712 1.79517 75.8714 1.44906 66.3596 1.66096C59.5066 1.81282 52.6617 2.09535 45.8247 2.52974C40.687 2.85466 35.5532 3.20077 30.4195 3.5716C24.4901 3.99893 18.5887 4.6629 12.6954 5.39396C8.7451 5.88487 4.76287 6.17798 0.860601 6.96908C0.560734 7.02912 0.268853 7.02207 0.0889331 6.76072C-0.126971 6.44287 0.0889439 6.19918 0.324839 6.0014C0.82062 5.58466 1.45633 5.42927 2.10404 5.33744C6.0423 4.7759 9.98856 4.2285 13.9268 3.66696C19.0885 2.93237 24.2542 2.24368 29.4599 1.82694C33.2183 1.52675 36.9766 1.22655 40.7389 1.01112C46.9642 0.65442 53.1934 0.318901 59.4267 0.0752145C62.5813 -0.0483946 65.7439 0.0540253 68.9065 0.0540253Z"
                    fill="#212529"
                  />
                </svg>
              </span>
              <a
                href="#"
                className="btn btn-primary text-white btn-large rounded-[60px] group py-2 pl-5 pr-3"
              >
                Shop Now
                <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl text-primary-darker" />
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="lg:p-0 p-8 pb-15 md:bg-[url('/images/banner-left-sidebar/banner-2.png')] bg-center bg-no-repeat bg-cover rounded-3xl xl:pr-[91px] lg:pr-[50px] single-hero-slider-item flex items-center h-[470px]">
            {/* Content Section */}
            <div className="single-hero-slider-content lg:max-w-[566px] relative xl:pl-[100px] lg:pl-[50px]">
              <h2 className="pb-[7px] text-gray-900">Exclusive Online Sale</h2>
              <h4 className="text-black font-bold text-2xl leading-9 mb-[27px]">
                Up to 50% OFF on Your Favorite Picks 🎉
              </h4>
              <span className="absolute lg:top-[110px] md:top-[85px] top-20 lg:right-[290px] md:right-[265px] right-[165px]">
                <svg
                  width={113}
                  height={7}
                  viewBox="0 0 113 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M68.9065 0.0540253C73.9562 -0.0978374 78.998 0.103468 84.0398 0.251799C90.1651 0.431915 96.2903 0.686216 102.412 1.02173C105.782 1.20537 109.089 1.8552 112.351 2.64983C112.627 2.71693 113.023 2.73813 112.999 3.05245C112.967 3.45153 112.527 3.38442 112.223 3.37736C109.317 3.34204 106.434 3.01007 103.551 2.74166C100.664 2.47325 97.7657 2.33905 94.871 2.2119C85.3712 1.79517 75.8714 1.44906 66.3596 1.66096C59.5066 1.81282 52.6617 2.09535 45.8247 2.52974C40.687 2.85466 35.5532 3.20077 30.4195 3.5716C24.4901 3.99893 18.5887 4.6629 12.6954 5.39396C8.7451 5.88487 4.76287 6.17798 0.860601 6.96908C0.560734 7.02912 0.268853 7.02207 0.0889331 6.76072C-0.126971 6.44287 0.0889439 6.19918 0.324839 6.0014C0.82062 5.58466 1.45633 5.42927 2.10404 5.33744C6.0423 4.7759 9.98856 4.2285 13.9268 3.66696C19.0885 2.93237 24.2542 2.24368 29.4599 1.82694C33.2183 1.52675 36.9766 1.22655 40.7389 1.01112C46.9642 0.65442 53.1934 0.318901 59.4267 0.0752145C62.5813 -0.0483946 65.7439 0.0540253 68.9065 0.0540253Z"
                    fill="#212529"
                  />
                </svg>
              </span>
              <a
                href="#"
                className="btn btn-primary text-white btn-large rounded-[60px] group py-2 pl-5 pr-3"
              >
                Shop Now
                <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl text-primary-darker" />
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="lg:p-0 p-8 pb-15 md:bg-[url('/images/banner-left-sidebar/banner-3.png')] bg-center bg-no-repeat bg-cover rounded-3xl xl:pr-[91px] lg:pr-[50px] single-hero-slider-item flex items-center h-[470px]">
            {/* Content Section */}
            <div className="single-hero-slider-content lg:max-w-[566px] relative xl:pl-[106px] lg:pl-[50px]">
              <h2 className="pb-[7px] text-gray-900">Shop Big. Save Bigger.</h2>
              <h4 className="text-black font-bold text-2xl leading-9 mb-[27px]">
                Up to 50% OFF on Your Favorite Picks 🎉
              </h4>
              <span className="absolute xl:top-[170px] lg:top-[105px] md:top-[85px] top-20 xl:right-[300px] lg:right-[320px] md:right-[265px] right-[165px]">
                <svg
                  width={113}
                  height={7}
                  viewBox="0 0 113 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M68.9065 0.0540253C73.9562 -0.0978374 78.998 0.103468 84.0398 0.251799C90.1651 0.431915 96.2903 0.686216 102.412 1.02173C105.782 1.20537 109.089 1.8552 112.351 2.64983C112.627 2.71693 113.023 2.73813 112.999 3.05245C112.967 3.45153 112.527 3.38442 112.223 3.37736C109.317 3.34204 106.434 3.01007 103.551 2.74166C100.664 2.47325 97.7657 2.33905 94.871 2.2119C85.3712 1.79517 75.8714 1.44906 66.3596 1.66096C59.5066 1.81282 52.6617 2.09535 45.8247 2.52974C40.687 2.85466 35.5532 3.20077 30.4195 3.5716C24.4901 3.99893 18.5887 4.6629 12.6954 5.39396C8.7451 5.88487 4.76287 6.17798 0.860601 6.96908C0.560734 7.02912 0.268853 7.02207 0.0889331 6.76072C-0.126971 6.44287 0.0889439 6.19918 0.324839 6.0014C0.82062 5.58466 1.45633 5.42927 2.10404 5.33744C6.0423 4.7759 9.98856 4.2285 13.9268 3.66696C19.0885 2.93237 24.2542 2.24368 29.4599 1.82694C33.2183 1.52675 36.9766 1.22655 40.7389 1.01112C46.9642 0.65442 53.1934 0.318901 59.4267 0.0752145C62.5813 -0.0483946 65.7439 0.0540253 68.9065 0.0540253Z"
                    fill="#212529"
                  />
                </svg>
              </span>
              <a
                href="#"
                className="btn btn-primary text-white btn-large rounded-[60px] group py-2 pl-5 pr-3"
              >
                Shop Now
                <span className="size-8 bg-white inline-flex items-center justify-center rounded-full rotate-[-40deg] transform group-hover:rotate-0 transition-all duration-300">
                  <i className="hgi hgi-stroke hgi-arrow-right-02 text-xl text-primary-darker" />
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Navigation Arrows for Swiper (Hidden on md, shown on lg) */}
      <div className="banner-left-sidebar-slider-nav absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full px-6 pointer-events-none z-10 hidden lg:flex items-center justify-between">
        <button className="slider-btn slider-prev size-12 rounded-full inline-flex items-center justify-center transition-colors duration-300 group/slider-btn cursor-pointer pointer-events-auto">
          <i className="hgi hgi-stroke hgi-arrow-left-01 text-xl" />
        </button>
        <button className="slider-btn slider-next size-12 rounded-full inline-flex items-center justify-center transition-colors duration-300 group/slider-btn cursor-pointer pointer-events-auto">
          <i className="hgi hgi-stroke hgi-arrow-right-01 text-xl" />
        </button>
      </div>
    </div>
  );
}
