"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import StarRating from "@/components/common/star-rating";

export interface Vendor {
  id?: string | number;
  bannerImage: string;
  profileImage: string;
  companyName: string;
  rating: number; // e.g., 4 or 4.5
  reviewCount: number;
  phone: string;
  email: string;
  address: string;
  storeUrl?: string;
  messageUrl?: string;
}

export interface VendorGridCardProps {
  vendor: Vendor;
  delay?: number; // Animation delay
}

export default function VendorGridCard({
  vendor,
  delay = 0.2,
}: VendorGridCardProps) {
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
      className="xl:col-span-4 md:col-span-6 col-span-12"
    >
      <div className="border border-[rgba(145,158,171,0.24)] border-t-0 rounded-3xl">
        <div className="w-full h-[150px] md:h-[180px] xl:h-full relative overflow-hidden rounded-t-2xl">
          <Image
            src={vendor.bannerImage}
            alt={`${vendor.companyName} banner`}
            width={451}
            height={162}
            className="object-cover w-full"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* content section */}
        <div className="px-6 pt-[42px] pb-6 relative">
          <div className="absolute -top-8 left-6 w-16 h-16 flex items-center justify-center rounded-full border-[3px] border-white bg-white overflow-hidden z-10">
            <div className="relative w-full h-full">
              <Image
                src={vendor.profileImage}
                alt={`${vendor.companyName} profile`}
                fill
                className="object-cover"
                sizes="64px"
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
          <div className="flex flex-col gap-y-5 border-b border-[rgba(145,158,171,0.24)] pb-5">
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
          <div className="flex items-center xl:gap-x-6 gap-x-2 md:gap-x-4 pt-5">
            <Link
              href={vendor.messageUrl || "#"}
              className="btn btn-large btn-default shadow-none w-[47%] outline rounded-[100px] py-2.5 flex items-center justify-center gap-x-1"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-wechat text-2xl leading-6" />
              </span>
              Message
            </Link>
            <Link
              href={vendor.storeUrl || "#"}
              className="btn btn-large btn-primary w-[47%] rounded-[100px] py-[11px] flex items-center justify-center gap-x-1"
            >
              <span className="inline-flex items-center justify-center">
                <i className="hgi hgi-stroke hgi-store-01 text-2xl leading-6" />
              </span>
              Visit Store
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
