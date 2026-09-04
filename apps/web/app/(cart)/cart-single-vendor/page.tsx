import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Sellzy - Multivendor eCommerce Template",
  description: "View your selected products, update quantities, and proceed to a fast and secure checkout.",
  openGraph: {
    title: "Shopping Cart | Sellzy - Multivendor eCommerce Template",
    description: "View your selected products, update quantities, and proceed to a fast and secure checkout.",
  },
};

import CartOneTable from "@/components/cart/cart-one-table";
import CartSummary from "@/components/cart/cart-summary";
import Breadcrumb from "@/components/common/breadcrumb";

export default function CartSingleVendorPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Cart Single Vendor" }]} />
      <div className="pb-[70px]">
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
              <CartOneTable />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
