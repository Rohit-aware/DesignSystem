import { useCallback, useState } from "react";

export type ProductDetailData = {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: { id: string; label: string; hex: string }[];
};

const EXTRA_IMAGES: Record<string, string[]> = {
  p1: [
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=85",
    "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=85",
  ],
  p2: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85",
    "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&q=85",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85",
  ],
};

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85",
];

export function useProductDetails(product: {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
}): ProductDetailData {
  return {
    ...product,
    images: EXTRA_IMAGES[product.id] ?? [product.image, ...DEFAULT_IMAGES.slice(1)],
    description:
      "Experience unmatched comfort with Jockey's premium range. Crafted from 100% combed cotton with moisture-wicking technology, this product offers a tapered fit that flatters your silhouette. Perfect for casual wear or smart-casual occasions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { id: "white", label: "White", hex: "#FFFFFF" },
      { id: "navy", label: "Navy", hex: "#1A237E" },
      { id: "black", label: "Black", hex: "#0A0A0A" },
      { id: "grey", label: "Grey", hex: "#9E9E9E" },
      { id: "olive", label: "Olive", hex: "#558B2F" },
    ],
  };
}

export function useVariantSelection() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const toggleDescription = useCallback(() => {
    setDescriptionExpanded((prev) => !prev);
  }, []);

  return {
    selectedSize,
    selectedColor,
    descriptionExpanded,
    setSelectedSize,
    setSelectedColor,
    toggleDescription,
  };
}
