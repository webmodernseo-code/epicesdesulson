import CheckoutCartSummary1 from "./checkout-cart-summary-1";
import PaymentMethodV1 from "./payment-method-v1";
import ShippingAddressV1 from "./shipping-address-v1";

export default function CheckoutV1Page() {
  return (
    <div className="py-8 sm:py-12">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form: Shipping Address & Stripe Payment */}
          <div className="xl:col-span-8 col-span-12 space-y-6">
            <ShippingAddressV1 />
            <PaymentMethodV1 />
          </div>

          {/* Sticky Order Summary */}
          <div className="xl:col-span-4 col-span-12">
            <CheckoutCartSummary1 />
          </div>
        </div>
      </div>
    </div>
  );
}
