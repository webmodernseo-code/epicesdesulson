import CartItems from "@/components/order/cart-items";
import OrderSummary from "@/components/order/order-summary";
import ShipmentAddress from "@/components/order/shipment-address";

export default function OrderWrapper() {
  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {/* Address part */}
          <ShipmentAddress />
          {/* Cart items part */}
          <div className="xl:col-span-4 col-span-12">
            <div className="border border-gray-300 rounded-2xl md:px-6 px-3 py-6 flex flex-col gap-y-6">
              {/* cart-items */}
              <CartItems />
              {/* order-summary */}
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
