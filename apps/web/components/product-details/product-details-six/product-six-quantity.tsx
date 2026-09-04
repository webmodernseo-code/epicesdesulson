"use client";

interface ProductSixQuantityProps {
  quantity: number;
  setQuantity: (q: number | ((prev: number) => number)) => void;
  isOutOfStock: boolean;
}

export default function ProductSixQuantity({
  quantity,
  setQuantity,
  isOutOfStock,
}: ProductSixQuantityProps) {
  return (
    <div className="product-add-to-cart-btn-section">
      <p className="font-semibold text-light-primary-text mb-4">Quantity:</p>
      <div className="flex items-center justify-between gap-x-4 gap-y-4 flex-wrap md:flex-nowrap md:gap-y-0">
        <div className="quantity-section flex-1 max-w-[185px] border border-gray-300 rounded-[80px] px-4 py-[11px] flex items-center justify-between">
          <button
            className="quantity-btn inline-flex items-center justify-center hover:text-primary"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <i className="hgi hgi-stroke hgi-minus-sign text-xl leading-5" />
          </button>
          <input
            type="text"
            className="quantity-input text-center w-full focus:outline-none font-semibold text-base leading-6 text-light-primary-text"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
          <button
            className="quantity-btn inline-flex items-center justify-center hover:text-primary"
            onClick={() => setQuantity((q) => q + 1)}
          >
            <i className="hgi hgi-stroke hgi-plus-sign text-xl leading-5" />
          </button>
        </div>
        {isOutOfStock ? (
          <>
            <button className="btn btn-warning btn-large rounded-[80px] flex-1">
              Notify Now
            </button>
            <button
              disabled
              className="btn btn-disabled btn-large rounded-[80px] flex-1"
            >
              Out of Stock
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-large rounded-[80px] flex-1">
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}
