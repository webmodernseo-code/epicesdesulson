import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Sellzy - Multivendor eCommerce Template",
  description: "Save and manage your favorite products. Easily move wishlist items to your cart when you are ready to buy.",
  openGraph: {
    title: "Wishlist | Sellzy - Multivendor eCommerce Template",
    description: "Save and manage your favorite products. Easily move wishlist items to your cart when you are ready to buy.",
  },
};

import Breadcrumb from "@/components/common/breadcrumb";
import WishlistTable from "@/components/wishlist/wislist-table";
import Link from "next/link";

export default function WishlistStyleV1Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <div className="pb-[70px]">
        <div className="container">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-5 pb-6">
            <div>
              <h3>Product Wishlist</h3>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto md:justify-start md:gap-x-12">
              <p className="font-semibold text-light-primary-text">
                2 items is selected
              </p>
              <Link
                href="/cart-single-vendor"
                className="btn btn-primary btn-large py-[11px] px-6 rounded-[80px]"
              >
                <span className="inline-flex items-center justify-center">
                  <i className="hgi hgi-stroke hgi-shopping-cart-02 text-2xl leading-6" />
                </span>
                Add to Cart
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <WishlistTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
