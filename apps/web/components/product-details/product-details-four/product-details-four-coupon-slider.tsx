"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductDetailsFourCouponSlider() {
  const coupons = [
    { id: 1, discount: "15% OFF" },
    { id: 2, discount: "15% OFF" },
    { id: 3, discount: "15% OFF" },
    { id: 4, discount: "15% OFF" },
  ];

  return (
    <div className="coupon-section mb-6">
      <div className="coupon-section-title mb-4 flex items-center justify-between">
        <p className="font-semibold text-light-primary-text flex items-center gap-x-2.5">
          Useable Discount Codes:
        </p>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        className="coupon-items sellzy-slider"
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon.id} className="w-auto!">
            <div className="coupon-item p-3 rounded-xl bg-[rgba(255,72,66,0.08)] flex items-center gap-x-4">
              <div className="flex flex-col gap-y-1">
                <span className="text-error leading-tight">Coupon</span>
                <span className="text-error text-sm leading-[22px] font-medium">
                  {coupon.discount}
                </span>
              </div>
              <button className="btn btn-error btn-small rounded-[60px]">
                Apply
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
