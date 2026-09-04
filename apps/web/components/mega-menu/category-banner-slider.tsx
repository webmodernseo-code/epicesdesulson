"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    name: "Medical Equipment",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 12.5625C2 9.46891 2 7.92211 3.02513 6.96106C4.05025 6 5.70017 6 9 6H15C18.2998 6 19.9497 6 20.9749 6.96106C22 7.92211 22 9.46891 22 12.5625V14.4375C22 17.5311 22 19.0779 20.9749 20.0389C19.9497 21 18.2998 21 15 21H9C5.70017 21 4.05025 21 3.02513 20.0389C2 19.0779 2 17.5311 2 14.4375V12.5625Z"
          fill="#FFC107"
        />
        <path
          d="M2 12.5625C2 9.46891 2 7.92211 3.02513 6.96106C4.05025 6 5.70017 6 9 6H15C18.2998 6 19.9497 6 20.9749 6.96106C22 7.92211 22 9.46891 22 12.5625V14.4375C22 17.5311 22 19.0779 20.9749 20.0389C19.9497 21 18.2998 21 15 21H9C5.70017 21 4.05025 21 3.02513 20.0389C2 19.0779 2 17.5311 2 14.4375V12.5625Z"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 13.5H15M12 10.5L12 16.5"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 3H10C7.518 3 7 3.518 7 6H17C17 3.518 16.482 3 14 3Z"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Baby",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9994 10.0003C10.4263 10.0003 11.6298 8.97061 13.8958 6.91123C13.9548 6.85761 14.0432 6.93019 14.0008 6.99767..."
          fill="#FFC107"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.9994 10.0003C10.4263 10.0003 11.6298 8.97061 13.8958 6.91123C13.9548 6.85761 14.0432 6.93019 14.0008 6.99767C13.9997 6.99942 13.9988 7.00127 13.998 7.00319L12.6969 10.2559C12.3507 11.1213 12.1777 11.554 11.8878 11.9095C11.5979 12.2651 11.209 12.5218 10.431 13.0352L8.96874 14.0003L7.53197 13.0327C6.77135 12.5204 6.39103 12.2642 6.10735 11.9129C5.82366 11.5616 5.65337 11.1359 5.31279 10.2844L4.00029 7.00318C3.99952 7.00127 3.99859 6.99943 3.99749 6.99768C3.95501 6.93 4.04369 6.8573 4.10282 6.91104C6.36892 8.97055 7.57248 10.0003 8.9994 10.0003Z"
          fill="#FFC107"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 13C21 14.6569 19.6569 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C19.6569 10 21 11.3431 21 13Z"
          fill="#FFC107"
        />
        <path
          d="M13.0014 2C14.1053 2 15.0003 2.93126 15.0003 4.08003C15.0003 5.02915 15.0362 5.87375 14.2692 6.57196C11.7587 8.85732 10.5034 10 9.00027 10C7.49714 10 6.24187 8.85732 3.73133 6.57196C2.96426 5.87369 3.00027 5.029 3.00027 4.07981C3.00027 2.93116 3.8951 2 4.99893 2"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 14V17.4998C9 19.9852 11.0149 22.0001 13.5003 22.0001C15.9858 22.0001 18.0007 19.9852 18.0007 17.4998V16"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7L12.6978 10.2556C12.3516 11.121 12.1785 11.5537 11.8887 11.9092C11.5988 12.2648 11.2098 12.5215 10.4319 13.0349L8.9696 14L7.53283 13.0323C6.77221 12.5201 6.39189 12.2639 6.10821 11.9126C5.82452 11.5613 5.65423 11.1356 5.31365 10.2841L4 7"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 13C21 14.6569 19.6569 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C19.6569 10 21 11.3431 21 13Z"
          stroke="#161C24"
          strokeWidth="1.5"
        />
        <path
          d="M18.008 13L17.999 13"
          stroke="#161C24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Personal Care",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4626 3.99352C16.7809 2.3486 14.4404 3.01148 13.0344 4.06738C12.4578 4.50033 12.1696 4.7168 12 4.7168C11.8304 4.7168 11.5422 4.50033 10.9656 4.06738C9.55962 3.01148 7.21908 2.3486 4.53744 3.99352C1.01807 6.1523 0.221718 13.2742 8.33953 19.2827C9.88572 20.4272 10.6588 20.9994 12 20.9994C13.3412 20.9994 14.1143 20.4272 15.6605 19.2827C23.7783 13.2742 22.9819 6.1523 19.4626 3.99352Z"
          fill="#FFC107"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M19.4626 3.99352C16.7809 2.3486 14.4404 3.01148 13.0344 4.06738C12.4578 4.50033 12.1696 4.7168 12 4.7168C11.8304 4.7168 11.5422 4.50033 10.9656 4.06738C9.55962 3.01148 7.21909 2.3486 4.53744 3.99352C1.01807 6.1523 0.221719 13.2742 8.33953 19.2827C9.88572 20.4272 10.6588 20.9994 12 20.9994C13.3412 20.9994 14.1143 20.4272 15.6605 19.2827C23.7783 13.2742 22.9819 6.1523 19.4626 3.99352Z"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 9V15M9 12L15 12"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Wellness Devices",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 21C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95492 18.9389C2 17.6246 2 15.7497 2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95492C5.3754 3 7.25027 3 11 3L13 3C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11Z"
          fill="#FFC107"
        />
        <path
          d="M11.0023 21L13.0023 21C16.7521 21 18.6269 21 19.9412 20.0451C20.3657 19.7367 20.739 19.3634 21.0474 18.9389C21.7046 18.0343 21.9095 16.8642 21.9734 15L2.03125 15C2.09512 16.8642 2.3 18.0343 2.95724 18.9389C3.26563 19.3634 3.63892 19.7367 4.0634 20.0451C5.37772 21 7.25259 21 11.0023 21H11.0023Z"
          fill="white"
        />
        <path
          d="M11 21.5C7.25027 21.5 5.3754 21.5 4.06107 20.492C3.6366 20.1665 3.26331 19.7725 2.95492 19.3244C2 17.9371 2 15.9581 2 12C2 8.04195 2 6.06292 2.95491 4.67558C3.26331 4.22752 3.6366 3.8335 4.06107 3.50797C5.3754 2.5 7.25027 2.5 11 2.5L13 2.5C16.7497 2.5 18.6246 2.5 19.9389 3.50797C20.3634 3.8335 20.7367 4.22752 21.0451 4.67558C22 6.06292 22 8.04195 22 12C22 15.9581 22 17.9371 21.0451 19.3244C20.7367 19.7725 20.3634 20.1665 19.9389 20.492C18.6246 21.5 16.7497 21.5 13 21.5H11Z"
          stroke="#161C24"
          strokeWidth="1.5"
        />
        <path
          d="M2.5 15L21.5 15"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00896 18H7H7.00896Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 18H10.991H11Z"
          fill="white"
        />
        <path
          d="M7.00896 18H7M11 18H10.991"
          stroke="#161C24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10.2C16.5447 10.2 16.0655 10.2282 15.6569 9.97709C15.5011 9.88138 15.3977 9.74907 15.191 9.48446L13.25 7L10.75 11L8.94338 9.26564C8.68722 9.01973 8.43747 8.77042 8.09845 8.67176C7.85189 8.6 7.56792 8.6 7 8.6"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Health Supplements",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.503 4.0884L15.1279 2.5374C17.0001 1.43112 19.3942 2.08763 20.4751 4.00376C21.3435 5.54315 21.1002 7.4272 20.0002 8.6822L13.9696 11.9511L11.5002 8C10.6957 6.64308 11.145 4.89088 12.503 4.0884Z"
          fill="white"
        />
        <path
          d="M4.95785 8.5437L7.58272 6.99269C8.94196 6.18954 10.6949 6.63896 11.5 7.99703L13.9694 11.9481L6.5 15.997C5.29956 15.865 4.17499 15.1683 3.52508 14.0162C2.44415 12.1001 3.08563 9.64998 4.95785 8.5437Z"
          fill="#FFC107"
        />
        <path
          d="M10.0428 5.54203L15.1278 2.5374C17 1.43112 19.394 2.08763 20.4749 4.00376C21.3433 5.54315 21.1 7.4272 20 8.6822M10.0428 5.54203L4.95785 8.54667C3.08563 9.65294 2.44415 12.1031 3.52508 14.0192C4.17499 15.1713 5.29956 15.868 6.5 16M10.0428 5.54203L11.5 8"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.1932 13.001C21.8501 15.8708 20.8669 19.5403 17.9971 21.1972C15.1273 22.854 11.4578 21.8708 9.80094 19.001C8.14409 16.1312 9.12734 12.4617 11.9971 10.8048C14.8669 9.148 18.5364 10.1312 20.1932 13.001Z"
          fill="white"
        />
        <path
          d="M11.9971 10.8048C9.12734 12.4617 8.14409 16.1312 9.80094 19.001L20.1932 13.001C18.5364 10.1312 14.8669 9.148 11.9971 10.8048Z"
          fill="#FFC107"
        />
        <path
          d="M20.1932 13.001C21.8501 15.8708 20.8669 19.5403 17.9971 21.1972C15.1273 22.854 11.4578 21.8708 9.80094 19.001M20.1932 13.001C18.5364 10.1312 14.8669 9.148 11.9971 10.8048C9.12734 12.4617 8.14409 16.1312 9.80094 19.001M20.1932 13.001L9.80094 19.001"
          stroke="#161C24"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "Baby Accessories",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.9994 10.0003C10.4263 10.0003 11.6298 8.97061 13.8958 6.91123C13.9548 6.85761 14.0432 6.93019 14.0008 6.99767C13.9997 6.99942 13.9988 7.00127 13.998 7.00319L12.6969 10.2559C12.3507 11.1213 12.1777 11.554 11.8878 11.9095C11.5979 12.2651 11.209 12.5218 10.431 13.0352L8.96874 14.0003L7.53197 13.0327C6.77135 12.5204 6.39103 12.2642 6.10735 11.9129C5.82366 11.5616 5.65337 11.1359 5.31279 10.2844L4.00029 7.00318C3.99952 7.00127 3.99859 6.99943 3.99749 6.99768C3.95501 6.93 4.04369 6.8573 4.10282 6.91104C6.36892 8.97055 7.57248 10.0003 8.9994 10.0003Z"
          fill="#FFC107"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 13C21 14.6569 19.6569 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C19.6569 10 21 11.3431 21 13Z"
          fill="#FFC107"
        />
        <path
          d="M13.0014 2C14.1053 2 15.0003 2.93126 15.0003 4.08003C15.0003 5.02915 15.0362 5.87375 14.2692 6.57196C11.7587 8.85732 10.5034 10 9.00027 10C7.49714 10 6.24187 8.85732 3.73133 6.57196C2.96426 5.87369 3.00027 5.029 3.00027 4.07981C3.00027 2.93116 3.8951 2 4.99893 2"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 14V17.4998C9 19.9852 11.0149 22.0001 13.5003 22.0001C15.9858 22.0001 18.0007 19.9852 18.0007 17.4998V16"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7L12.6978 10.2556C12.3516 11.121 12.1785 11.5537 11.8887 11.9092C11.5988 12.2648 11.2098 12.5215 10.4319 13.0349L8.9696 14L7.53283 13.0323C6.77221 12.5201 6.39189 12.2639 6.10821 11.9126C5.82452 11.5613 5.65423 11.1356 5.31365 10.2841L4 7"
          stroke="#161C24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 13C21 14.6569 19.6569 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C19.6569 10 21 11.3431 21 13Z"
          stroke="#161C24"
          strokeWidth="1.5"
        />
        <path
          d="M18.008 13L17.999 13"
          stroke="#161C24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function CategoryBannerSlider() {
  return (
    <div className="pb-20">
      <div className="container relative">
        <div className="banner-category-hero-slider banner-category-hero-slider-wrapper md:-mx-3 md:px-3">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={6}
            slidesPerGroup={2}
            loop={true}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            pagination={{
              el: ".banner-category-hero-slider .swiper-pagination",
              clickable: true,
            }}
            navigation={{
              nextEl: ".banner-category-hero-slider-nav .slider-next",
              prevEl: ".banner-category-hero-slider-nav .slider-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 1, navigation: { enabled: false } },
              480: { slidesPerView: 2, navigation: { enabled: false } },
              769: { slidesPerView: 2 },
              1025: { slidesPerView: 3 },
              1200: { slidesPerView: 5 },
              1441: { slidesPerView: 5 },
              1600: { slidesPerView: 6 },
            }}
            className="rounded-3xl"
          >
            {categories.map((cat, idx) => (
              <SwiperSlide key={idx} className="silder-item group">
                <div className="p-6 border border-gray-300 rounded-2xl group-hover:border-primary transition-colors duration-300 ease-in-out mx-3 h-full cursor-pointer">
                  <div className="flex items-center justify-center flex-col gap-y-3">
                    <span className="inline-flex items-center justify-center size-14 bg-warning-lighter rounded-[50px] group-hover:bg-primary-lighter transition-colors duration-300 ease-in-out">
                      {cat.icon}
                    </span>
                    <p className="font-semibold group-hover:text-primary transition-colors duration-300 ease-in-out text-center">
                      {cat.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination"></div>
          <div className="banner-category-hero-slider-nav absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full items-center justify-between pointer-events-none z-10 hidden sm:flex">
            <button className="slider-btn slider-prev size-12 rounded-full inline-flex items-center justify-center transition-colors duration-300 group/slider-btn cursor-pointer pointer-events-auto">
              <i className="hgi hgi-stroke hgi-arrow-left-01 text-xl" />
            </button>
            <button className="slider-btn slider-next size-12 rounded-full inline-flex items-center justify-center transition-colors duration-300 group/slider-btn cursor-pointer pointer-events-auto">
              <i className="hgi hgi-stroke hgi-arrow-right-01 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
