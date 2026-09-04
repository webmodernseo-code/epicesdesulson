import PaymentMethodV1 from "../checkout-v1/payment-method-v1";
import CheckoutCartSummary2 from "./checkout-cart-summary-2";

export default function CheckoutV2Page() {
  return (
    <div className="pb-[70px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {/* Address part */}
          <div className="xl:col-span-8 col-span-12">
            <div className="flex flex-col gap-y-6">
              {/* Address */}
              <div className="border border-gray-300 rounded-2xl">
                <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h5>Address</h5>
                    <a
                      href="#"
                      className="text-primary hover:underline font-semibold leading-[26px]"
                    >
                      Add New Address
                    </a>
                  </div>
                </div>
                {/* Home-Address-details */}
                <div className="md:px-6 px-3 py-6">
                  <div className="border border-gray-300 rounded-xl">
                    <div className="flex items-center justify-between border-b border-gray-300 p-4">
                      <h5>Home Address</h5>
                      <a
                        href="#"
                        className="btn btn-default btn-small outline shadow-none rounded-[80px]"
                      >
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-edit-02 text-[18px] leading-[18px] text-light-primary-text" />
                        </span>
                        Change
                      </a>
                    </div>
                    <ul className="p-4 flex flex-col gap-y-5 overflow-x-auto">
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-user-square text-2xl leading-6" />
                        </span>
                        Arlene McCoy
                      </li>
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-call text-2xl leading-6" />
                        </span>
                        (555) 123-4567
                      </li>
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-mail-01 text-2xl leading-6" />
                        </span>
                        debbie.baker@example.com
                      </li>
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-location-06 text-2xl leading-6" />
                        </span>
                        1234 Elm Street, Springfield, CA, 90210, United States
                      </li>
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-clock-01 text-2xl leading-6" />
                        </span>
                        08:00 AM - 11:00 AM or 11:00 AM - 02:00 PM
                      </li>
                      <li className="flex items-center gap-x-3 text-light-primary-text">
                        <span className="inline-flex items-center justify-center">
                          <i className="hgi hgi-stroke hgi-cargo-ship text-2xl leading-6" />
                        </span>
                        Flat Rate Shipment
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Payment */}
              <PaymentMethodV1 />
            </div>
          </div>
          {/* Cart items part */}
          <div className="xl:col-span-4 col-span-12">
            <CheckoutCartSummary2 />
          </div>
        </div>
      </div>
    </div>
  );
}
