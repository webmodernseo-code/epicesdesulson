import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
  status: "Processing" | "Complete" | "Pending" | "Cancelled";
}

const ORDERS_DATA: Order[] = [
  {
    id: "1",
    orderNumber: "#254834",
    date: "01 Jul, 2022",
    product: "Vitamin D supplements",
    price: 20,
    quantity: 2,
    total: 40,
    status: "Processing",
  },
  {
    id: "2",
    orderNumber: "#254835",
    date: "02 Jul, 2022",
    product: "Vitamin C pills",
    price: 15,
    quantity: 1,
    total: 15,
    status: "Complete",
  },
  {
    id: "3",
    orderNumber: "#254836",
    date: "03 Jul, 2022",
    product: "Iron tablets",
    price: 25,
    quantity: 3,
    total: 75,
    status: "Pending",
  },
  {
    id: "4",
    orderNumber: "#254837",
    date: "04 Jul, 2022",
    product: "Omega 3 capsules",
    price: 30,
    quantity: 1,
    total: 30,
    status: "Cancelled",
  },
  {
    id: "5",
    orderNumber: "#254838",
    date: "05 Jul, 2022",
    product: "Calcium chews",
    price: 12,
    quantity: 4,
    total: 48,
    status: "Processing",
  },
];

const getStatusStyles = (status: Order["status"]) => {
  switch (status) {
    case "Processing":
      return "bg-[rgba(255,193,7,0.16)] text-warning-dark";
    case "Complete":
      return "bg-[rgba(0,171,85,0.16)] text-primary";
    case "Pending":
      return "bg-[rgba(145,158,171,0.16)] text-light-disabled-text";
    case "Cancelled":
      return "bg-[rgba(255,86,48,0.16)] text-error";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function DashboardOrders() {
  return (
    <div className="flex flex-col gap-y-6">
      <h4 className="text-light-primary-text font-bold">Order Product</h4>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto p-6 bg-white">
            <table className="w-full wishlist-table">
              <thead className="bg-primary-lighter">
                <tr className="rounded-full">
                  <th className="text-left pl-4 py-4 rounded-l-lg font-semibold order">
                    Order ID
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold order-date">
                    Order Date
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product">
                    Product
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-price">
                    Price
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-quantity">
                    Quantity
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-total">
                    Total
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-status">
                    Status
                  </th>
                  <th className="text-left pl-4 py-4 rounded-r-lg font-semibold product-action">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ORDERS_DATA.map((order) => (
                  <tr
                    key={order.id}
                    className="py-4 border-b border-gray-300 last:border-b-0"
                  >
                    <td
                      data-title="Order ID"
                      className="py-4 lg:pl-4 product font-semibold text-light-primary-text"
                    >
                      {order.orderNumber}
                    </td>
                    <td
                      data-title="Order Date"
                      className="py-4 lg:pl-4 product text-light-secondary-text"
                    >
                      {order.date}
                    </td>
                    <td data-title="Product" className="py-4 lg:pl-4 product">
                      <Link
                        href="/product-details"
                        className="text-light-primary-text font-semibold hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        {order.product}
                      </Link>
                    </td>
                    <td
                      data-title="Price"
                      className="py-4 lg:pl-4 product-price"
                    >
                      ${order.price}
                    </td>
                    <td
                      data-title="Quantity"
                      className="py-4 lg:pl-4 product-stock font-medium"
                    >
                      {order.quantity}
                    </td>
                    <td
                      data-title="Total"
                      className="py-4 lg:pl-4 product-total font-bold text-light-primary-text"
                    >
                      ${order.total}
                    </td>
                    <td
                      data-title="Status"
                      className="py-4 lg:pl-4 product-status"
                    >
                      <span
                        className={`inline-flex items-center justify-center text-xs font-bold leading-[18px] rounded-[100px] py-px px-2 ${getStatusStyles(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td
                      data-title="Action"
                      className="py-4 lg:pl-4 product-action"
                    >
                      <button className="btn btn-error btn-small py-1 px-4 outline rounded-full hover:bg-white transition-all text-xs font-bold ">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
              <ul className="flex items-center md:justify-end justify-center gap-x-1.5 blog-pagination py-4">
                <li className="group blog-pagination-item">
                  <button className="inline-flex items-center justify-center size-8 rounded-[50px] bg-white border border-transparent hover:border-primary hover:bg-[rgba(0,171,85,0.08)] transition-all duration-300">
                    <i className="hgi hgi-stroke hgi-arrow-left-01 text-[20px] text-light-primary-text hover:text-primary" />
                  </button>
                </li>
                {[1, 2, 3, 4, 5].map((page) => (
                  <li key={page} className="blog-pagination-item">
                    <button
                      className={`inline-flex items-center justify-center size-8 rounded-[50px] text-base leading-6 transition-all duration-300 ${
                        page === 1
                          ? "bg-primary text-white font-semibold"
                          : "text-light-primary-text hover:text-primary hover:font-semibold bg-white border border-transparent hover:border-primary hover:bg-[rgba(0,171,85,0.08)]"
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className="blog-pagination-item">
                  <button className="inline-flex items-center justify-center size-8 rounded-[50px] bg-white">
                    <i className="hgi hgi-stroke hgi-more-horizontal text-[20px] text-light-primary-text" />
                  </button>
                </li>
                <li className="group blog-pagination-item">
                  <button className="inline-flex items-center justify-center size-8 rounded-[50px] bg-white border border-transparent hover:border-primary hover:bg-[rgba(0,171,85,0.08)] transition-all duration-300">
                    <i className="hgi hgi-stroke hgi-arrow-right-01 text-[20px] text-light-primary-text hover:text-primary" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
