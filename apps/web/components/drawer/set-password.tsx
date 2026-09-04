"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SetPasswordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SetPasswordDrawer({
  isOpen,
  onClose,
}: SetPasswordDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="set-password-drawer"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="reset-password-page-sidebar fixed xl:top-[30px] xl:right-[22px] right-0 top-0 xl:h-[calc(100vh-52px)] h-full z-99 max-w-[600px] w-full bg-white xl:rounded-2xl rounded-none shadow-dark-z-24"
        >
          <div className="reset-password-page-sidebar-header px-6 pt-6 pb-4 border-b border-gray-300 relative">
            <h5>Reset Password</h5>
            <button
              onClick={onClose}
              aria-label="Close"
              className="close-sidebar-btn absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(145,158,171,0.2)] transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-xl leading-5 text-light-primary-text" />
            </button>
          </div>
          <div className="reset-password-page-sidebar-content p-10 flex flex-col gap-y-10 overflow-y-auto max-h-[calc(100%-70px)]">
            <div className="image-wrapper mx-auto">
              <Image
                src="/images/authentication/reset-illustration.png"
                alt="reset-password"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="reset-password-form">
              <form className="flex flex-col gap-y-6">
                <div className="relative w-full">
                  <input
                    type="password"
                    id="reset-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Password *"
                  />
                  <label
                    htmlFor="reset-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Password *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="password"
                    id="reset-confirm-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Confirm Password *"
                  />
                  <label
                    htmlFor="reset-confirm-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Confirm Password *
                  </label>
                </div>
                <div>
                  <button className="btn btn-primary btn-large rounded-[80px] w-full">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
            <div className="back-to-login-section">
              <a
                className="text-primary login-page-btn font-semibold leading-[26px]"
                href="#"
              >
                Back to Login
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
