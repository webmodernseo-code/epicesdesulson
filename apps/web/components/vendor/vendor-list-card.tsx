"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Vendor } from "@/components/vendor/vendor-grid-card";
import StarRating from "@/components/common/star-rating";

export interface VendorListCardProps {
  vendor: Vendor;
  delay?: number;
}

export default function VendorListCard({
  vendor,
  delay = 0.2,
}: VendorListCardProps) {
  const ratingPercentage = Math.min(
    Math.max((vendor.rating / 5) * 100, 0),
    100,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      className="border border-[rgba(145,158,171,0.24)] rounded-3xl"
    >
      <div className="max-h-[290px] md:h-[290px] h-[150px] relative overflow-hidden rounded-t-3xl border-b border-[rgba(145,158,171,0.24)]">
        <Image
          src={vendor.bannerImage}
          alt={`${vendor.companyName} banner`}
          fill
          className="object-cover w-full"
        />
      </div>
      {/* content section */}
      <div className="px-6 pt-[62px] relative">
        <div className="absolute -top-[50px] left-6 w-[100px] h-[100px] inline-flex items-center justify-center rounded-full border-[3px] border-white bg-white overflow-hidden z-10">
          <div className="relative w-full h-full border-[3px] border-white rounded-full overflow-hidden bg-white">
            <Image
              src={vendor.profileImage}
              alt={`${vendor.companyName} profile`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <Link href={vendor.storeUrl || "#"}>
            <h6 className="hover:text-primary">{vendor.companyName}</h6>
          </Link>
          <div className="rating-section flex items-center">
            <StarRating ratingPercentage={`${ratingPercentage}%`} />
            <span className="text-sm leading-[22px] font-normal inline-block ml-1">
              ({vendor.reviewCount})
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 border-b border-b-[rgba(145,158,171,0.24)] pb-5">
          <a
            href={`tel:${vendor.phone}`}
            className="flex items-center gap-x-2.5"
          >
            <span className="inline-flex items-center justify-center">
              <i className="hgi hgi-stroke hgi-call text-2xl leading-6" />
            </span>
            <span className="text-light-primary-text">{vendor.phone}</span>
          </a>
          <a
            href={`mailto:${vendor.email}`}
            className="flex items-center gap-x-2.5"
          >
            <span className="inline-flex items-center justify-center">
              <i className="hgi hgi-stroke hgi-mail-01 text-2xl leading-6" />
            </span>
            <span className="text-light-primary-text">{vendor.email}</span>
          </a>
          <p className="flex items-center gap-x-2.5 text-light-primary-text">
            <span className="inline-flex items-center justify-center min-w-[24px]">
              <i className="hgi hgi-stroke hgi-location-06 text-2xl leading-6" />
            </span>
            <span className="line-clamp-2">{vendor.address}</span>
          </p>
        </div>
        {/* button */}
        <div className="flex items-center lg:justify-end justify-center xl:gap-x-6 gap-x-2 md:gap-x-4 pt-5 pb-6">
          <Link
            href={vendor.messageUrl || "#"}
            className="btn btn-large btn-default outline shadow-none py-2.5 md:px-[100px] px-5.5 rounded-[100px] flex items-center justify-center gap-x-1"
          >
            <span className="inline-flex items-center justify-center">
              <i className="hgi hgi-stroke hgi-wechat text-2xl leading-6" />
            </span>
            Message
          </Link>
          <Link
            href={vendor.storeUrl || "#"}
            className="btn btn-large btn-primary py-[11px] md:px-[94px] px-5.5 rounded-[100px] flex items-center justify-center gap-x-1"
          >
            <span className="inline-flex items-center justify-center">
              <i className="hgi hgi-stroke hgi-store-01 text-2xl leading-6" />
            </span>
            Visit Store
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
