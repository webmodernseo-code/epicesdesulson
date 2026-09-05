import Link from "next/link";

export default function NavbarTop() {
  return (
    <div className="bg-primary header-top">
      <div className="container">
        <div className="flex items-center xl:justify-between justify-center py-1.5 sm:py-2">
          {/* Left: Support (Desktop only) */}
          <div className="xl:flex items-center gap-x-6 hidden">
            <p className="flex items-center gap-x-2 text-white text-sm leading-[22px]">
              <span>
                <i className="hgi hgi-stroke hgi-customer-support text-xl text-white" />
              </span>
              Besoin d'aide ?
              <Link
                href="/contact"
                className="bg-warning py-0.5 px-2.5 text-xs font-semibold rounded-[60px] text-gray-900 ml-1 hover:bg-warning/90 transition-colors"
              >
                Contactez-nous
              </Link>
            </p>
          </div>

          {/* Center: Strict Single Line Announcement on Mobile & Desktop */}
          <div className="text-center overflow-hidden">
            <p className="flex items-center justify-center gap-x-1.5 sm:gap-x-2 text-white text-[11px] sm:text-sm font-dm-sans whitespace-nowrap">
              <span className="inline-flex items-center shrink-0">
                <i className="hgi hgi-stroke hgi-discount-01 text-white text-sm sm:text-lg" />
              </span>
              <span className="hidden md:inline">Épices d'exception & Poivres rares —</span>
              <span className="font-semibold">Livraison offerte dès 50€</span>
              <span className="bg-warning py-0.5 px-2 text-[10px] sm:text-xs font-bold rounded-full text-gray-950 shrink-0">
                France & Europe
              </span>
            </p>
          </div>

          {/* Right: Quick Links (Desktop only) */}
          <div className="hidden xl:flex">
            <ul className="flex items-center text-white text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-warning transition-colors pr-4 mr-4 relative after:absolute after:h-4 after:w-px after:bg-white/30 after:right-0 after:top-1/2 after:-translate-y-1/2"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-warning transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
