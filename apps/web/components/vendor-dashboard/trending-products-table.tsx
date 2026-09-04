import Image from "next/image";
import Link from "next/link";

interface TrendingProduct {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  sales: number;
}

const TRENDING_PRODUCTS: TrendingProduct[] = [
  {
    id: 1,
    image: "/images/home-3/eggs.png",
    name: "Happy Bite Cookies – 300g",
    category: "Grocery",
    price: 27.49,
    sales: 16,
  },
  {
    id: 2,
    image: "/images/home-3/watermelon.png",
    name: "Happy Bite Cookies – 300g",
    category: "Grocery",
    price: 27.49,
    sales: 16,
  },
  {
    id: 3,
    image: "/images/home-3/3-eggs.png",
    name: "Happy Bite Cookies – 300g",
    category: "Grocery",
    price: 27.49,
    sales: 16,
  },
  {
    id: 4,
    image: "/images/home-3/orange.png",
    name: "Happy Bite Cookies – 300g",
    category: "Grocery",
    price: 27.49,
    sales: 16,
  },
];

export default function TrendingProductsTable() {
  return (
    <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-light-primary-text font-bold">Trending Products</h5>
      </div>
      <table className="w-full wishlist-table">
        <thead className="bg-primary-lighter">
          <tr className="rounded-full">
            <th className="text-left pl-4 py-4 font-semibold product rounded-l-lg">
              Product
            </th>
            <th className="text-left pl-4 py-4 font-semibold product-price">
              Price
            </th>
            <th className="text-left pl-4 py-4 rounded-r-lg font-semibold product-sale">
              Sale
            </th>
          </tr>
        </thead>
        <tbody>
          {TRENDING_PRODUCTS.map((product) => (
            <tr
              key={product.id}
              className="py-4 border-b border-gray-300 last:border-b-0"
            >
              <td data-title="Product" className="py-3 lg:pl-4 product">
                <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row items-end md:items-start text-right md:text-left">
                  <div className="product-thumbnail relative w-[60px] h-[60px] rounded-2xl overflow-hidden flex-none">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Link
                      href="/product-details"
                      className="text-light-primary-text font-semibold hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm leading-[22px] font-normal text-light-disabled-text">
                      {product.category}
                    </p>
                  </div>
                </div>
              </td>
              <td
                data-title="Price"
                className="capitalize py-4 lg:pl-4 product-price"
              >
                <span className="text-light-primary-text font-semibold">
                  ${product.price}
                </span>
              </td>
              <td
                data-title="Sales"
                className="capitalize py-4 lg:pl-4 product-sales"
              >
                <p className="text-light-primary-text font-semibold">
                  {product.sales}
                </p>
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
