import { useMemo } from "react";

export type MoodCard = { id: string; label: string; image: string };
export type ShopProduct = { id: string; name: string; price: number; originalPrice: number; image: string };
export type EditorialBanner = { id: string; tag: string; heading: string; body: string; cta: string; image: string; imageRight: boolean };
export type GridProduct = { id: string; name: string; brand: string; price: number; originalPrice: number; discount: number; image: string; tag?: string };

const MOOD_CARDS: MoodCard[] = [
  { id: "m1", label: "Street", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&q=80" },
  { id: "m2", label: "Active", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
  { id: "m3", label: "Lounge", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
  { id: "m4", label: "Studio", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80" },
  { id: "m5", label: "Night", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
];

const SHOP_PRODUCTS: ShopProduct[] = [
  { id: "s1", name: "Groove Tee", price: 799, originalPrice: 1199, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: "s2", name: "Drop Jogger", price: 1499, originalPrice: 2199, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
  { id: "s3", name: "Seamless Set", price: 2199, originalPrice: 2999, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80" },
  { id: "s4", name: "Rib Tank", price: 599, originalPrice: 899, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80" },
];

const EDITORIAL_BANNERS: EditorialBanner[] = [
  { id: "e1", tag: "NEW DROP", heading: "Move in\nEvery Direction", body: "Engineered for the way you live — unrestricted, unstoppable.", cta: "DISCOVER", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85", imageRight: false },
  { id: "e2", tag: "WOMEN'S GROOVE", heading: "Soft Power,\nBold Form", body: "Premium fabrication meets contemporary silhouettes.", cta: "SHOP WOMEN", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85", imageRight: true },
];

const GRID_PRODUCTS: GridProduct[] = [
  { id: "g1", name: "Classic Tee", brand: "Jockey", price: 699, originalPrice: 999, discount: 30, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&q=80", tag: "BESTSELLER" },
  { id: "g2", name: "Slim Jogger", brand: "Jockey", price: 1299, originalPrice: 1799, discount: 28, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80" },
  { id: "g3", name: "Sports Bra", brand: "Jockey", price: 899, originalPrice: 1299, discount: 31, image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", tag: "NEW" },
  { id: "g4", name: "Boxer Brief", brand: "Jockey", price: 499, originalPrice: 699, discount: 29, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80" },
  { id: "g5", name: "Seamless Leg", brand: "Jockey", price: 1199, originalPrice: 1699, discount: 29, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80", tag: "GROOVE" },
  { id: "g6", name: "Ankle Socks", brand: "Jockey", price: 249, originalPrice: 399, discount: 38, image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=400&q=80" },
];

export function useGrooveData() {
  return {
    moodCards: useMemo(() => MOOD_CARDS, []),
    shopProducts: useMemo(() => SHOP_PRODUCTS, []),
    editorialBanners: useMemo(() => EDITORIAL_BANNERS, []),
    gridProducts: useMemo(() => GRID_PRODUCTS, []),
  };
}
