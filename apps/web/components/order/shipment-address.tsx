export default function ShipmentAddress() {
  return (
    <div className="xl:col-span-8 col-span-12">
      <div className="flex flex-col gap-y-6">
        {/* Address */}
        <div className="border border-gray-300 rounded-2xl">
          <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
            <h5>Order Details</h5>
          </div>
          {/* Home-Address-details */}
          <div className="md:px-6 px-3 py-6">
            <ul className="flex flex-col gap-y-4">
              <li className="flex items-center justify-between">
                <p className="text-light-primary-text font-normal inline-flex items-center gap-x-4">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-delivery-box-01 text-2xl leading-6" />
                  </span>
                  Order ID
                </p>
                <span className="font-semibold text-light-primary-text">
                  #65937
                </span>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-light-primary-text font-normal inline-flex items-center gap-x-4">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-delivery-box-01 text-2xl leading-6" />
                  </span>
                  Order status
                </p>
                <button className="text-[12px] leading-[18px] rounded-md font-normal px-2 py-[7px] text-warning-dark bg-[rgba(255,193,7,0.16)]">
                  Processing
                </button>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-light-primary-text font-normal inline-flex items-center gap-x-4">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-payment-success-01 text-2xl leading-6" />
                  </span>
                  Amount Payable
                </p>
                <p className="font-semibold text-light-primary-text">
                  $40:00
                  <span className="text-primary ml-0.5">(Paid)</span>
                </p>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-light-primary-text font-normal inline-flex items-center gap-x-4">
                  <span className="inline-flex items-center justify-center">
                    <i className="hgi hgi-stroke hgi-calendar-03 text-2xl leading-6" />
                  </span>
                  Order Date:
                </p>
                <span className="font-semibold text-light-primary-text">
                  11:12 AM, 24 April, 2027
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* Shipping Address */}
        <div className="border border-gray-300 rounded-2xl">
          <div className="py-4 px-6 bg-gray-200 rounded-t-2xl">
            <h5 className="text-light-primary-text">Shipment Address</h5>
          </div>
          {/* Shipping Home Address-details */}
          <div className="md:px-6 px-3 py-6">
            <ul className="flex flex-col gap-y-5">
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
                  <i className="hgi hgi-stroke hgi-cargo-ship text-2xl leading-6" />
                </span>
                Free Delivery
              </li>
            </ul>
          </div>
        </div>
        {/*  FeedBack  */}
        <div className="border border-gray-300 rounded-2xl">
          <div className="md:px-6 px-4 py-6">
            <h5 className="mb-6">Give as a feedback</h5>
            <form className="flex flex-col items-end gap-y-6">
              <div className="relative w-full">
                <textarea
                  id="feedback_comment"
                  className="form-control peer input-group medium rounded-[20px] ps-4 pe-6 resize-none placeholder-transparent focus:placeholder-transparent focus:outline-none"
                  rows={4}
                  placeholder="Share your experience*"
                  defaultValue={""}
                />
                <label
                  htmlFor="feedback_comment"
                  className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-6 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                >
                  Share your experience*
                </label>
              </div>
              <div className="relative w-full">
                <input
                  id="name"
                  type="text"
                  className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Name *"
                />
                <label
                  htmlFor="name"
                  className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                >
                  Name *
                </label>
              </div>
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  className="peer form-control input-group medium rounded-[80px] px-3.5 placeholder-transparent focus:placeholder-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Email *"
                />
                <label
                  htmlFor="email"
                  className="absolute left-[14px] top-1/2 -translate-y-1/2 text-xs leading-[18px] transition-all peer-placeholder-shown:text-light-disabled-text peer-focus:text-light-disabled-text peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 peer-focus:text-[12px] peer-focus:top-0 peer-[:not(:placeholder-shown)]:text-[12px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:px-1"
                >
                  Email *
                </label>
              </div>
              <button className="btn btn-primary btn-large rounded-[80px] px-[35px] py-[11px] w-full md:w-auto">
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
