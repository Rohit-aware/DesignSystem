import { useMemo } from "react";

export type Banner = {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  align: "left" | "right";
};

export type Category = {
  id: string;
  label: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  tag?: string;
};

export type PromoBanner = {
  id: string;
  image: string;
  label: string;
  cta: string;
};

const BANNERS: Banner[] = [
  {
    id: "b1",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85",
    tag: "NEW COLLECTION",
    title: "Comfort\nRedefined",
    subtitle: "Premium innerwear crafted for everyday life",
    cta: "SHOP NOW",
    align: "left",
  },
  {
    id: "b2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85",
    tag: "WOMEN'S EDIT",
    title: "Style Meets\nComfort",
    subtitle: "Discover our latest women's collection",
    cta: "EXPLORE",
    align: "left",
  },
  {
    id: "b3",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85",
    tag: "UP TO 50% OFF",
    title: "End of\nSeason Sale",
    subtitle: "Limited time. Premium styles.",
    cta: "GRAB NOW",
    align: "left",
  },
];

const CATEGORIES: Category[] = [
  { id: "c1", label: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&q=80" },
  { id: "c2", label: "Women", image: "https://images.unsplash.com/photo-1774556448921-123497fe8076?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "c3", label: "Kids", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200&q=80" },
  { id: "c4", label: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80" },
  { id: "c5", label: "Innerwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80" },
  { id: "c6", label: "Socks", image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=200&q=80" },
  { id: "c7", label: "Thermals", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=200&q=80" },
];

const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "pr1",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    label: "Men's Collection",
    cta: "Shop Men",
  },
  {
    id: "pr2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85",
    label: "Women's Collection",
    cta: "Shop Women",
  },
];

const PRODUCTS: Product[] = [
  { id: "p1", title: "Classic Slim Fit Shirt", brand: "Jockey", price: 1299, originalPrice: 1999, discount: 35, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80", rating: 4.5, reviews: 1243, tag: "BESTSELLER" },
  { id: "p2", title: "Premium Cotton Tee", brand: "Jockey", price: 699, originalPrice: 999, discount: 30, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", rating: 4.3, reviews: 892 },
  { id: "p3", title: "Stretch Comfort Joggers", brand: "Jockey", price: 1499, originalPrice: 2199, discount: 32, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", rating: 4.6, reviews: 567, tag: "NEW" },
  { id: "p4", title: "Active Sports Bra", brand: "Jockey", price: 899, originalPrice: 1299, discount: 31, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", rating: 4.4, reviews: 2341 },
  { id: "p5", title: "Thermal Inner Set", brand: "Jockey", price: 1099, originalPrice: 1599, discount: 31, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80", rating: 4.2, reviews: 445 },
  { id: "p6", title: "Printed Boxer Shorts", brand: "Jockey", price: 599, originalPrice: 849, discount: 29, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85", rating: 4.1, reviews: 1102 },
  { id: "p7", title: "Ankle Length Socks 3-Pack", brand: "Jockey", price: 249, originalPrice: 399, discount: 38, image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=400&q=80", rating: 4.0, reviews: 3201, tag: "PACK" },
  { id: "p8", title: "Seamless Leggings", brand: "Jockey", price: 1199, originalPrice: 1799, discount: 33, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", rating: 4.7, reviews: 987, tag: "NEW" },
];

export function useHomeData() {
  return {
    banners: useMemo(() => BANNERS, []),
    categories: useMemo(() => CATEGORIES, []),
    products: useMemo(() => PRODUCTS, []),
    promoBanners: useMemo(() => PROMO_BANNERS, []),
  };
}
