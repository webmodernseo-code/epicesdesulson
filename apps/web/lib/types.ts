import type { Swiper as SwiperInstance } from "swiper";

export type SwiperRef = SwiperInstance | null;

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  rating?: number;
  category?: string[];
  delay?: number | string;
  discount?: string;
  [key: string]: unknown;
}

export interface ProductWithImages {
  id: number;
  images: string[];
  title: string;
  price: number;
  oldPrice: number;
  discount: string;
  delay: string;
  [key: string]: unknown;
}

export interface Deal {
  id: number;
  image: string;
  discount: string;
  title: string;
  rating: number;
  variants: string[];
  sold: number;
  available: number;
  progress: number;
  currentPrice: string;
  oldPrice: string;
  daysOut: number;
  [key: string]: unknown;
}

export interface HorizontalProduct {
  id: number;
  image: string;
  title: string;
  currentPrice: string;
  oldPrice: string;
  rating: number;
  [key: string]: unknown;
}

export interface CarouselProduct {
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  ratingCount: string;
  [key: string]: unknown;
}

export interface InputWithLabelProps {
  id: string;
  label: string;
  type?: string;
}

export interface RadioOptionProps {
  name: string;
  label: string;
}

export interface AddressCardProps {
  icon: string;
  title: string;
  address: string[];
}

export interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isLast: boolean;
}

export interface OrderItemCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice: string;
  category: string;
  variant: string;
  quantity: number;
  status: string;
}

export interface SummaryItemProps {
  label: string;
  value: string;
  isNegative?: boolean;
  isSuccess?: boolean;
}

export interface HotPickProduct {
  id: number;
  image: string;
  delay: string;
  [key: string]: unknown;
}
