import Image from "next/image";
import Link from "next/link";

interface RecentOrder {
  id: string;
  image: string;
  name: string;
  category: string;
  orderId: string;
  date: string;
  status: "Processing" | "Complete" | "Pending" | "Cancelled";
}

const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "1",
    image: "/images/home-3/lime-chips.png",
    name: "Happy Bite Cookies",
    category: "Grocery",
    orderId: "#254834",
    date: "01 Jul, 2022",
    status: "Processing",
  },
  {
    id: "2",
    image: "/images/home-3/greek-yogurt.png",
    name: "Happy Bite Cookies",
    category: "Grocery",
    orderId: "#254834",
    date: "01 Jul, 2022",
    status: "Processing",
  },
  {
    id: "3",
    image: "/images/home-3/fresh-beans.png",
    name: "Happy Bite Cookies",
    category: "Grocery",
    orderId: "#254834",
    date: "01 Jul, 2022",
    status: "Processing",
  },
  {
    id: "4",
    image: "/images/home-3/veggie-pops.png",
    name: "Happy Bite Cookies",
    category: "Grocery",
    orderId: "#254834",
    date: "01 Jul, 2022",
    status: "Processing",
  },
];

const getStatusStyles = (status: RecentOrder["status"]) => {
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

export default function RecentOrdersTable() {
  return (
    <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-light-primary-text font-bold">Recent Orders</h5>
      </div>
      <table className="w-full wishlist-table">
        <thead className="bg-primary-lighter">
          <tr className="rounded-full">
            <th className="text-left pl-4 py-4 font-semibold product rounded-l-lg">
              Product
            </th>
            <th className="text-left pl-4 py-4 font-semibold product-price">
              Order ID
            </th>
            <th className="text-left pl-4 py-4 font-semibold product-sale">
              Date
            </th>
            <th className="text-left pl-4 py-4 rounded-r-lg font-semibold product-sale">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {RECENT_ORDERS.map((order) => (
            <tr
              key={order.id}
              className="py-4 border-b border-gray-300 last:border-b-0"
            >
              <td data-title="Product" className="py-3 lg:pl-4 product">
                <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row items-end md:items-start text-right md:text-left">
                  <div className="product-thumbnail relative w-[60px] h-[60px] rounded-2xl overflow-hidden flex-none">
                    <Image
                      src={order.image}
                      alt={order.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p className="text-sm leading-[22px] font-normal text-light-disabled-text">
                      {order.category}
                    </p>
                    <Link
                      href="/product-details"
                      className="text-light-primary-text font-semibold hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                      {order.name}
                    </Link>
                  </div>
                </div>
              </td>
              <td
                data-title="Order ID"
                className="capitalize py-4 lg:pl-4 product-order-id"
              >
                <span className="text-light-primary-text font-semibold">
                  {order.orderId}
                </span>
              </td>
              <td
                data-title="Date"
                className="capitalize py-4 lg:pl-4 product-date"
              >
                <p className="text-light-primary-text font-semibold">
                  {order.date}
                </p>
              </td>
              <td
                data-title="Status"
                className="capitalize py-4 lg:pl-4 product-status"
              >
                <span
                  className={`inline-flex items-center justify-center text-xs font-bold leading-[18px] rounded-[100px] py-px px-2 ${getStatusStyles(order.status)}`}
                >
                  {order.status}
                </span>
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
  );
}
