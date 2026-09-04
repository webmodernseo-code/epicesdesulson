import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Vendor Cart | Sellzy - Multivendor eCommerce Template",
  description: "Review and manage items from multiple vendors in your shopping cart. Enjoy a seamless multi-vendor checkout experience.",
  openGraph: {
    title: "Multi-Vendor Cart | Sellzy - Multivendor eCommerce Template",
    description: "Review and manage items from multiple vendors in your shopping cart. Enjoy a seamless multi-vendor checkout experience.",
  },
};

import CartQualitySection from "@/components/cart/cart-quality-section";
import CartSummaryTwo from "@/components/cart/cart-summary-two";
import CartTwoTable from "@/components/cart/cart-two-table";
import NewBrandedProductCarousel from "@/components/cart/new-branded-porduct-carousel";
import Breadcrumb from "@/components/common/breadcrumb";

export default function CartMultiVendorPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Cart Multi Vendor" }]} />
      <section className="pb-[70px]">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="xl:col-span-8 col-span-12">
              <div className="flex items-center justify-between mb-6 xl:px-2 px-0">
                <div className="flex items-center gap-x-1">
                  <h5>Cart</h5>
                  <p>(3 item)</p>
                </div>
                <div className="flex items-center">
                  <button className="inline-flex gap-x-1 items-center justify-center font-semibold leading-[26px] text-error">
                    <i className="hgi hgi-stroke hgi-cancel-01 text-xl leading-5 font-semibold" />
                    Remove All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="xl:col-span-8 col-span-12">
              <CartTwoTable />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <CartSummaryTwo />
            </div>
          </div>
        </div>
      </section>

      <CartQualitySection />
      <NewBrandedProductCarousel />
    </div>
  );
}
