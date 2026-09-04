"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import StarRating from "@/components/common/star-rating";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Robert Fox",
    time: "12:40PM, 14 Nov, 2026",
    image: "/images/vendors-list/vendor-profile.png",
    rating: 4.5,
    ratingWidth: "90%",
    content:
      "I was honestly surprised at how fast the delivery was. The product came well-packaged and exactly as described. Great quality, and the free fast shipping made the experience even better!",
  },
  {
    id: 2,
    name: "James Smith",
    time: "12:40PM, 14 Nov, 2026",
    image: "/images/vendors-list/vendor-profile.png",
    rating: 4.5,
    ratingWidth: "90%",
    content:
      "From browsing to checkout, everything was super easy. Loved how I didn't have to pay anything extra for shipping, and my item arrived the next day. Highly recommend!",
  },
  {
    id: 3,
    name: "Esther Howard",
    time: "12:40PM, 14 Nov, 2026",
    image: "/images/vendors-list/vendor-profile.png",
    rating: 4.8,
    ratingWidth: "96%",
    content:
      "The customer service was exceptional. I had a query about a product and they answered within minutes. Shipping was extremely fast and the product exceeded my expectations.",
  },
];

export default function Testimonial() {
  return (
    <section className="pb-[70px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:bg-white bg-[#A0E2E0] py-12 lg:pt-0 lg:pb-[23px] text-center lg:max-w-[704px] mx-auto lg:rounded-[164px] lg:-mb-[103px] relative z-10 lg:before:bg-[#A0E2E0] lg:after:bg-[#A0E2E0] lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:h-full lg:before:w-[145px] lg:before:bg-[url(/images/slider-left-shape.png)] lg:before:bg-no-repeat lg:before:z-11 lg:after:absolute lg:after:bottom-0 lg:after:right-0 lg:after:h-full lg:after:w-[145px] lg:after:bg-[url(/images/slider-right-shape.png)] lg:after:bg-no-repeat lg:after:z-11"
      >
        <h3 className="mb-2">Trusted by Customers</h3>
        <p>Join thousands of happy customers around the globe.</p>
      </motion.div>

      <div className="xl:max-w-[1728px] w-full mx-auto relative bg-[#A0E2E0] xl:rounded-5xl pb-[70px] lg:pt-[172px]">
        <div className="container">
          <div className="about-us-testimonial-wrapper grid grid-cols-12">
            <div className="col-start-1 col-end-13 lg:col-start-2 lg:col-end-12">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                navigation={{
                  nextEl: ".testimonial-next",
                  prevEl: ".testimonial-prev",
                }}
                breakpoints={{
                  1025: { slidesPerView: 2 },
                }}
                className="testimonial-slider"
              >
                {TESTIMONIALS.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-3xl p-10 h-full border border-transparent transition-all duration-300  hover:shadow-light-z-24"
                    >
                      <div className="flex items-center gap-x-4 pb-6">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full size-12 flex-none object-cover"
                        />
                        <div className="flex-1">
                          <p className="pb-1 font-semibold text-light-primary-text">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-light-secondary-text leading-[22px]">
                            {testimonial.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center pb-3">
                        <div className="rating-section flex items-center border-r border-gray-300 pr-3">
                          <StarRating
                            ratingPercentage={testimonial.ratingWidth}
                          />
                          <span className="text-sm leading-[22px] font-normal inline-flex ml-2 text-light-primary-text mt-1">
                            {testimonial.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-1 pl-3">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5269 3.13379L13.9331 3.67969L13.7065 6.13965L15.3335 8L13.7065 9.86035L13.9331 12.3203L11.5269 12.8662L10.2661 14.9932L7.99951 14.0195L5.73291 15L4.47314 12.873L2.06689 12.3271L2.29346 9.86035L0.666504 8L2.29346 6.13379L2.06689 3.66699L4.47314 3.12695L5.73291 1L7.99951 1.97363L10.2661 1L11.5269 3.13379ZM6.72607 9.17285L5.18018 7.62012L4.19287 8.60645L6.72607 11.1465L11.6128 6.24707L10.6265 5.25977L6.72607 9.17285Z"
                              fill="#088178"
                            />
                          </svg>
                          <p className="text-primary text-sm leading-[22px]">
                            Verified purchase
                          </p>
                        </div>
                      </div>
                      <p className="text-light-secondary-text">
                        {testimonial.content}
                      </p>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Custom Navigation */}
            <div className="about-us-testimonial-slider-nav mt-12 flex items-center justify-center gap-x-6 col-span-12">
              <button className="testimonial-prev slider-btn size-11 inline-flex items-center hover:text-white justify-center rounded-full transition-all duration-300 ">
                <i className="hgi hgi-stroke hgi-arrow-left-01 text-[22px]" />
              </button>
              <button className="testimonial-next slider-btn size-11 inline-flex items-center justify-center rounded-full  hover:text-white transition-all duration-300 ">
                <i className="hgi hgi-stroke hgi-arrow-right-01 text-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
