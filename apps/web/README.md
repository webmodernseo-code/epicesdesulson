# Sellzy — Multipurpose eCommerce Storefront

A comprehensive, modern multipurpose eCommerce storefront template built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

## ✨ Features

- **5 Homepage Demos** — Unique layouts with hero sliders, category grids, deal timers, and promotional banners
- **23 Mega-Menu Shop Layouts** — Category filters, sidebar shops, full-banner layouts, horizontal filters, and list views (2–6 column variants)
- **6 Product Detail Pages** — Image galleries, accordions, size/color pickers, and related product sliders
- **Vendor & Marketplace** — Vendor grid/list, dashboard with charts, account settings, and marketplace layouts
- **Blog System** — Grid and list layouts with individual detail views, search, pagination, and sidebar widgets
- **Cart & Checkout** — Single-vendor and multi-vendor carts, two checkout variants, order success page
- **Wishlist & Compare** — Two wishlist styles and a product comparison table
- **User Account** — Dashboard with profile, orders, addresses, and wishlist tabs
- **Interactive Drawers** — QuickView, Cart, Login, Register, OTP, Mobile Sidebar, and more
- **Utility Pages** — About, Contact, FAQ, Privacy Policy, Return Policy, Terms & Conditions, Coming Soon, 404
- **Animations** — Framer Motion scroll-triggered animations, Swiper.js carousels, sticky navigation

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router) |
| React | 19.2.3 | UI Library |
| Tailwind CSS | v4 | Styling (via `@tailwindcss/postcss`) |
| Framer Motion | 12.x | Animations |
| Swiper.js | 12.x | Carousels & sliders |
| ApexCharts | 5.x | Vendor dashboard charts |
| Huge Icons | — | Icons (CSS + React) |
| nextjs-toploader | 3.x | Page transition progress bar |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.

## 📁 Project Structure

```
sellzy-frontend/
├── app/
│   ├── (home-demo)/      # 5 homepage demos
│   ├── (mega-menu)/      # 23 shop/mega-menu layouts
│   ├── (product-details)/ # 6 product detail styles
│   ├── (vendor)/         # Vendor marketplace pages
│   ├── (blogs)/          # Blog grid & list pages
│   ├── (cart)/           # Cart pages
│   ├── (checkout)/       # Checkout pages
│   ├── (wishlist)/       # Wishlist pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── faq/              # FAQ page
│   ├── my-account/       # User account
│   ├── compare/          # Product comparison
│   ├── privacy-policy/   # Privacy policy
│   ├── return-policy/    # Return policy
│   ├── terms-and-conditions/
│   ├── coming-soon/
│   ├── order-successful/
│   ├── globals.css       # Design system tokens & component styles
│   └── layout.tsx        # Root layout (fonts, navbar, footer)
├── components/           # 146+ React components in 26 modules
│   ├── layout/           # Navbar, Footer, MainMenu, MobileMenu
│   ├── card/             # ProductCardOne, ProductCardTwo, ProductCardFour
│   ├── drawer/           # QuickView, Cart, Login, Register, etc.
│   ├── common/           # Breadcrumb, StarRating, NewsLetter, etc.
│   ├── home-one/ → home-five/  # Homepage-specific sections
│   ├── mega-menu/        # Filter bars, shop components
│   ├── product-details/  # Product detail component sets
│   └── vendor/           # Vendor listing & marketplace
├── context/              # QuickViewProvider (React Context)
├── lib/                  # cn() utility (clsx + tailwind-merge)
└── public/               # Images, icons, and static assets
```

## 🎨 Theming

All design tokens are in `app/globals.css` under the `@theme` directive:

- **Colors:** Primary (teal), Secondary (blue), Info, Success, Warning, Error — each with 5 shade variants
- **Fonts:** Public Sans, Urbanist, DM Sans (loaded via `next/font`)
- **Shadows:** Light and dark elevation system (z-1 through z-24)
- **Buttons:** `.btn-primary`, `.btn-secondary`, etc. with solid and outline variants

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm run start
```

Deploy easily on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
