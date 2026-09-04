"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface RegisterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function RegisterDrawer({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="register-drawer"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="register-page-sidebar fixed xl:top-[30px] xl:right-[22px] right-0 top-0 xl:h-[calc(100vh-52px)] h-full z-99 max-w-[600px] w-full bg-white xl:rounded-2xl rounded-none shadow-dark-z-24"
        >
          <div className="register-page-sidebar-header px-6 pt-6 pb-4 border-b border-gray-300 relative">
            <h5>Create an Account</h5>
            <button
              onClick={onClose}
              aria-label="Close"
              className="close-sidebar-btn absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer inline-flex items-center justify-center size-9 rounded-full bg-[rgba(145,158,171,0.08)] hover:bg-[rgba(145,158,171,0.2)] transition-colors"
            >
              <i className="hgi hgi-stroke hgi-multiplication-sign text-xl leading-5 text-light-primary-text" />
            </button>
          </div>
          <div className="register-page-sidebar-content p-10 flex flex-col gap-y-10 overflow-y-auto max-h-[calc(100%-70px)]">
            <div className="image-wrapper mx-auto">
              <Image
                src="/images/authentication/register-illustration.png"
                alt="register"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <p className="text-light-disabled-text text-center relative before:absolute before:-z-1 before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-gray-300 before:left-0">
              <span className="bg-white px-4 z-1">Or sign up with</span>
            </p>
            <div className="flex items-center gap-x-4">
              <button className="btn btn-default outline btn-large rounded-[80px] flex-1 shadow-none">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.18173 12.2128C6.18173 11.5642 6.28946 10.9423 6.48173 10.359L3.11627 7.78906C2.46037 9.12081 2.09082 10.6214 2.09082 12.2128C2.09082 13.8028 2.45991 15.3025 3.11491 16.6333L6.47855 14.0583C6.28809 13.4778 6.18173 12.8582 6.18173 12.2128Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0908 6.31167C13.4998 6.31167 14.7726 6.81096 15.7726 7.62798L18.6817 4.72302C16.9089 3.17975 14.6362 2.22656 12.0908 2.22656C8.13894 2.22656 4.74257 4.48653 3.11621 7.78866L6.48167 10.3586C7.25712 8.00472 9.46757 6.31167 12.0908 6.31167Z"
                    fill="#EB4335"
                  />
                  <path
                    d="M12.0908 18.1134C9.46757 18.1134 7.25712 16.4203 6.48167 14.0664L3.11621 16.6359C4.74257 19.9385 8.13894 22.1985 12.0908 22.1985C14.5298 22.1985 16.8585 21.3324 18.6062 19.7098L15.4117 17.2401C14.5103 17.8079 13.3753 18.1134 12.0908 18.1134Z"
                    fill="#34A853"
                  />
                  <path
                    d="M21.6363 12.214C21.6363 11.624 21.5454 10.9885 21.409 10.3984H12.0908V14.2566H17.4545C17.1863 15.572 16.4563 16.5833 15.4117 17.2414L18.6063 19.7111C20.4422 18.0072 21.6363 15.469 21.6363 12.214Z"
                    fill="#4285F4"
                  />
                </svg>
                Google
              </button>
              <button className="btn btn-default outline btn-large rounded-[80px] flex-1 shadow-none">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 3.4982C17 3.22206 16.7761 2.9982 16.5 2.9982H14C11.3793 2.86766 9.14528 4.87829 9 7.4982V10.1982H6.5C6.22386 10.1982 6 10.4221 6 10.6982V13.2982C6 13.5743 6.22386 13.7982 6.5 13.7982H9V20.4982C9 20.7743 9.22386 20.9982 9.5 20.9982H12.5C12.7761 20.9982 13 20.7743 13 20.4982V13.7982H15.62C15.8487 13.8015 16.0505 13.6491 16.11 13.4282L16.83 10.8282C16.8703 10.6785 16.8389 10.5185 16.7449 10.3952C16.6509 10.2718 16.5051 10.1991 16.35 10.1982H13V7.4982C13.0515 6.9853 13.4845 6.59562 14 6.5982H16.5C16.7761 6.5982 17 6.37434 17 6.0982V3.4982Z"
                    fill="#1877F2"
                  />
                </svg>
                Facebook
              </button>
            </div>
            <div className="register-form">
              <form className="flex flex-col gap-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="first-name"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="First Name *"
                    />
                    <label
                      htmlFor="first-name"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      First Name *
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="last-name"
                      className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                      placeholder="Last Name *"
                    />
                    <label
                      htmlFor="last-name"
                      className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                    >
                      Last Name *
                    </label>
                  </div>
                </div>
                <div className="relative w-full">
                  <input
                    type="email"
                    id="register-email"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Email *"
                  />
                  <label
                    htmlFor="register-email"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Email *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="password"
                    id="register-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Password *"
                  />
                  <label
                    htmlFor="register-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Password *
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="password"
                    id="confirm-password"
                    className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none"
                    placeholder="Confirm Password *"
                  />
                  <label
                    htmlFor="confirm-password"
                    className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Confirm Password *
                  </label>
                </div>
                <div>
                  <button className="btn btn-primary btn-large rounded-[80px] w-full">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
            <div className="account-having-section">
              <p className="leading-[26px] font-semibold">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="text-primary"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
