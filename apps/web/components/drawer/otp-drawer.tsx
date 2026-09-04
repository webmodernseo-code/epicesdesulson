"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface OtpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtpDrawer({ isOpen, onClose }: OtpDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="otp-drawer"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="otp-verification-page-sidebar fixed xl:top-[30px] xl:right-[22px] right-0 top-0 xl:h-[calc(100vh-52px)] h-full z-99 max-w-[600px] w-full bg-white xl:rounded-2xl rounded-none shadow-dark-z-24"
        >
          <div className="otp-verification-page-sidebar-header px-6 pt-6 pb-4 border-b border-gray-300 relative">
            <h5>OTP Verification</h5>
            <button
              onClick={onClose}
              aria-label="Close"
              className="close-sidebar-btn absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(145,158,171,0.2)] transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-xl leading-5 text-light-primary-text" />
            </button>
          </div>
          <div className="otp-verification-page-sidebar-content p-10 flex flex-col gap-y-10 overflow-y-auto max-h-[calc(100%-70px)]">
            <div className="image-wrapper mx-auto">
              <Image
                src="/images/authentication/otp-verification-illustration.png"
                alt="otp-verification"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="otp-verification-text">
              <h6 className="mb-2">Enter the verification code</h6>
              <p>Enter the 6-digit code sent to your email address</p>
            </div>
            <div className="otp-verification-form flex flex-col gap-y-6">
              <div className="otp-verification-form-input flex gap-x-6">
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
                <input
                  type="text"
                  className="form-control w-1/3 h-14 ring-1 ring-gray-300 rounded-[80px] focus:ring-light-primary-text text-center"
                  placeholder="-"
                  readOnly
                />
              </div>
              <div className="otp-verification-resend-code text-right">
                <a
                  href="#"
                  className="text-primary font-semibold leading-[26px]"
                >
                  Resend Code
                </a>
              </div>
              <div>
                <button className="btn btn-primary btn-large rounded-[80px] w-full">
                  Verify
                </button>
              </div>
            </div>
            <div className="back-to-forgot-password-section">
              <a
                className="text-primary forgot-password-page-btn font-semibold leading-[26px]"
                href="#"
              >
                Back to Forgot Password
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
