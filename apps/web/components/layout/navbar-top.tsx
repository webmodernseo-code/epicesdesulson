import Link from "next/link";

export default function NavbarTop() {
  return (
    <div className="bg-primary header-top">
      <div className="container">
        <div className="flex items-center xl:justify-between justify-center py-2.5">
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
          <div className="text-center py-1">
            <p className="flex items-center gap-x-[7px] text-white text-sm leading-[22px] font-dm-sans">
              <span className="inline-flex items-center">
                <i className="hgi hgi-stroke hgi-discount-01 text-white text-xl" />
              </span>
              Épices d'exception & Poivres rares
              <span className="bg-warning py-0.5 px-2.5 text-xs font-bold rounded-[60px] text-gray-900">
                Livraison offerte dès 50€
              </span>
            </p>
          </div>
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

