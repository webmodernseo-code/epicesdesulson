export default function OrderSummary() {
  return (
    <div className="bg-gray-100 md:px-6 px-4 py-6 rounded-2xl">
      <div className="flex flex-col gap-y-6">
        <h5>Order Summary</h5>
        {/* total */}
        <div>
          <div className="flex flex-col gap-y-4 pb-4 border-b border-gray-300">
            <p className="flex items-center justify-between">
              Sub-Total<span className="text-gray-900">$20.00</span>
            </p>
            <p className="flex items-center justify-between">
              VAT (40%)<span className="text-gray-900">$4.00</span>
            </p>
            <p className="flex items-center justify-between">
              Discount<span className="text-gray-900">-$4.00</span>
            </p>
            <p className="flex items-center justify-between">
              Shipment<span className="text-gray-900">$0.00</span>
            </p>
            <p className="flex items-center justify-between">
              Tax<span className="text-gray-900">$0.00</span>
            </p>
          </div>
          <h6 className="flex items-center justify-between text-light-primary-text pt-4">
            Total<span className="text-gray-900">$20.00</span>
          </h6>
        </div>
      </div>
    </div>
  );
}
