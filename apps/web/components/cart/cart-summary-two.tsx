import Link from "next/link";

export default function CartSummaryTwo() {
  return (
    <div className="border border-gray-300 rounded-2xl md:px-6 md:py-6 px-3 py-4 flex flex-col gap-y-6">
      <div>
        <Link
          href="#"
          className="w-full px-4 py-4 inline-flex items-center gap-x-2 bg-[rgba(0,171,85,0.08)] text-light-primary-text text-sm leading-[22px] font-bold rounded-[100px]"
        >
          <span className="inline-flex items-center justify-center text-primary">
            <i className="hgi hgi-stroke hgi-car-03 text-2xl leading-6" />
          </span>
          Spend $60.00 for
          <span className="text-base leading-6 font-semibold text-primary">
            Free Shopping
          </span>
        </Link>
      </div>
      <div className="border border-gray-300 md:p-6 p-3 rounded-2xl">
        <div className="flex flex-col gap-y-6">
          <h5>Order Summary</h5>
          {/* Coupon code  */}
          <div className="input-group relative large w-full mx-auto ps-3.5 pe-24 py-3 rounded-[100px]">
            <input
              type="text"
              className="form-control"
              placeholder="Coupon Code"
            />
            <button className="btn btn-primary btn-large px-[22px] py-[11px] rounded-l-none rounded-r-[100px] absolute top-0 right-0 h-full w-auto">
              Apply
            </button>
          </div>
          {/* total */}
          <div>
            <div className="flex flex-col gap-y-6 pb-4 border-b border-gray-300">
              <p className="flex items-center justify-between">
                Sub-Total<span className="text-gray-900">$20.00</span>
              </p>
              <p className="flex items-center justify-between">
                VAT (40%)<span className="text-gray-900">$4.00</span>
              </p>
            </div>
            <h6 className="flex items-center justify-between text-light-primary-text pt-4">
              Total<span className="text-gray-900">$24.00</span>
            </h6>
          </div>
        </div>
      </div>
      {/* Checkbox */}
      <label className="flex items-center cursor-pointer">
        {/* custom checkbox */}
        <span className="has-[input:checked]:hover:bg-[#00AB55]/8 flex items-center justify-center w-10 h-10 bg-transparent rounded-full hover:bg-[#919EAB]/8 transition-colors duration-300 ease-in-out">
          <span className="relative inline-flex w-5 h-5 items-center justify-center">
            <input
              type="checkbox"
              className="peer appearance-none w-full h-full border-2 focus:outline-none checked:border-none border-gray-300 rounded-sm bg-white checked:bg-primary transition-all"
            />
            {/* checkbox tick icon */}
            <span className="absolute inset-0 inline-flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-all">
              <i className="hgi hgi-stroke hgi-tick-02 text-[18px] leading-[18px]" />
            </span>
          </span>
        </span>
        {/* label text */}
        <span>
          I agree with the{" "}
          <Link
            href="/terms-and-conditions"
            className="text-secondary underline font-semibold"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-and-conditions"
            className="text-secondary underline font-semibold"
          >
            Conditions
          </Link>
        </span>
      </label>
      {/* Checkout Buttons */}
      <div className="flex flex-col gap-y-6">
        <Link
          href="/order-successful"
          className="btn btn-primary py-3 w-full rounded-[80px]"
        >
          Proceed to checkout
        </Link>
        <Link
          href="/shop-left-sidebar"
          className="btn btn-default outline shadow-none w-full py-[11px] rounded-[80px]"
        >
          Continue Shopping
          <span className="inline-flex items-center justify-center">
            <i className="hgi hgi-stroke hgi-arrow-right-02 text-[22px] leading-[22px]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
