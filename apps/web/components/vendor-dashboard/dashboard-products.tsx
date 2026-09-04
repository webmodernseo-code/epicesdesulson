import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sales: number;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    image: "/images/home-3/eggs.png",
    category: "Grocery",
    name: "Diabetes test strips",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 2,
    image: "/images/vitamin-c.png",
    category: "Grocery",
    name: "Diabetes test strips",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 3,
    image: "/images/home-3/watermelon.png",
    category: "Grocery",
    name: "Pain relief spray",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 4,
    image: "/images/home-3/apple-juice.png",
    category: "Grocery",
    name: "Diabetes test strips",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 5,
    image: "/images/home-3/orange.png",
    category: "Grocery",
    name: "Immunity booster",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 6,
    image: "/images/home-3/papaya.png",
    category: "Grocery",
    name: "Hand sanitizer 500ml",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 7,
    image: "/images/apple-juice.png",
    category: "Grocery",
    name: "Heart health supplements",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
  {
    id: 8,
    image: "/images/home-3/eggs.png",
    category: "Grocery",
    name: "Protein powder for women",
    price: 27.49,
    originalPrice: 29.95,
    stock: 5,
    sales: 150,
  },
];

export default function DashboardProducts() {
  return (
    <div className="flex flex-col gap-y-6">
      <h4 className="text-light-primary-text font-bold">All Product</h4>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="wishlist-table-wrapper border-gray-300 rounded-2xl border overflow-x-auto p-6">
            <table className="w-full wishlist-table">
              <thead className="bg-primary-lighter">
                <tr className="rounded-full">
                  <th className="text-left pl-4 py-4 font-semibold product rounded-l-lg">
                    Product
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-price">
                    Price
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-stock">
                    Stock
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-sales">
                    Sales
                  </th>
                  <th className="text-left pl-4 py-4 font-semibold product-action rounded-r-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS_DATA.map((product) => (
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
                          <p className="text-sm leading-[22px] font-normal text-light-disabled-text">
                            {product.category}
                          </p>
                          <Link
                            href="/product-details"
                            className="flex items-center gap-x-1 text-light-primary-text font-semibold hover:text-primary transition-colors duration-300 ease-in-out"
                          >
                            <span className="truncate max-w-[200px] inline-block">
                              {product.name}
                            </span>
                            <span className="flex items-center justify-center">
                              <i className="hgi hgi-stroke hgi-arrow-up-right-01 text-base font-bold" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td
                      data-title="Price"
                      className="capitalize py-4 lg:pl-4 product-price"
                    >
                      <div className="flex items-center gap-x-3">
                        <span className="text-primary font-bold">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm leading-[22px] line-through text-light-disabled-text font-normal">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      data-title="Stock"
                      className="capitalize py-4 lg:pl-4 product-stock"
                    >
                      <p
                        className={
                          product.stock < 10
                            ? "text-error font-semibold"
                            : "text-success font-semibold"
                        }
                      >
                        {product.stock}
                      </p>
                    </td>
                    <td
                      data-title="Sales"
                      className="capitalize py-4 lg:pl-4 product-sales"
                    >
                      <p className="text-light-primary-text font-medium">
                        {product.sales}
                      </p>
                    </td>
                    <td
                      data-title="Action"
                      className="capitalize py-4 lg:pl-4 product-action"
                    >
                      <div className="flex items-center md:gap-x-10 gap-x-5">
                        <button className="hover:text-primary transition-colors duration-300">
                          <i className="hgi hgi-stroke hgi-edit-02 text-2xl" />
                        </button>
                        <button className="hover:text-error transition-colors duration-300">
                          <i className="hgi hgi-stroke hgi-delete-01 text-2xl" />
                        </button>
                      </div>
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
