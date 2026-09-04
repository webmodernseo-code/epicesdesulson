"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top btn btn-primary size-10 rounded-full z-50 inline-flex items-center justify-center fixed md:right-7.5 md:bottom-[95px] right-6 bottom-[95px] shadow-md transition-all duration-300 ease-in-out ${
        isVisible ? "active" : "hide"
      }`}
    >
      <i className="hgi hgi-stroke hgi-arrow-up-01 leading-6 text-2xl"></i>
    </button>
  );
}
