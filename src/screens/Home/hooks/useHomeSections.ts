import { useCallback, useMemo, useRef, useState } from 'react';
import { ViewToken, ViewabilityConfig } from 'react-native';
import { useHomeData } from './useHomeData';
import type { Banner, Category, Product, PromoBanner } from './useHomeData';

// ─── Section type discriminated union ─────────────────────────────────────────

export type HomeSectionType =
  | 'BANNER_CAROUSEL'
  | 'CATEGORY_ROW'
  | 'STRIP'
  | 'PROMO_BANNERS'
  | 'SECTION_HEADER'
  | 'PRODUCT_GRID'
  | 'SHOP_CTA'
  | 'PROMO_VIDEO'
  | 'PROMO_VIDEOS';

export type VideoItem = {
  id: string;
  url: string;
};

export type HomeSection = {
  id: string;
  type: HomeSectionType;
  data?: {
    banners?: Banner[];
    categories?: Category[];
    products?: Product[];
    promoBanners?: PromoBanner[];
    videos?: VideoItem[];
    eyebrow?: string;
    title?: string;
  };
};

// ─── Sample videos for carousel testing ──────────────────────────────────────

const SAMPLE_VIDEO: VideoItem[] = [
  { id: 'video-1', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];
const SAMPLE_VIDEOS: VideoItem[] = [
  { id: 'videos-1', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'videos-2', url: 'https://www.w3schools.com/html/movie.mp4' },
  { id: 'videos-3', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

// ─── Viewability config ───────────────────────────────────────────────────────
// 70% threshold ensures video is substantially on-screen before autoplay

export const VIEWABILITY_CONFIG: ViewabilityConfig = {
  itemVisiblePercentThreshold: 70,
  minimumViewTime: 300, // Debounce rapid scroll flickers
};

/**
 * useHomeSections
 *
 * Transforms the raw home data into a FlatList-ready section array
 * with a PROMO_VIDEO section inserted between PromoBanners and the
 * trending products section.
 *
 * Also provides:
 * - A stable `onViewableItemsChanged` callback (required to be stable by FlatList)
 * - A set of visible section IDs to drive video autoplay
 */
export function useHomeSections() {
  const { banners, categories, products, promoBanners } = useHomeData();

  // ── Visible items tracking (for video autoplay) ───────────────────────

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  // FlatList requires onViewableItemsChanged to be stable across renders.
  // Using useRef + useCallback guarantees this.
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const newIds = new Set(
        viewableItems
          .filter((item) => item.isViewable)
          .map((item) => item.key)
      );
      setVisibleIds(newIds);
    }
  ).current;

  // ── Build section list ────────────────────────────────────────────────

  const sections: HomeSection[] = useMemo(
    () => [
      {
        id: 'banner-carousel',
        type: 'BANNER_CAROUSEL',
        data: { banners },
      },
      {
        id: 'category-row',
        type: 'CATEGORY_ROW',
        data: { categories },
      },
      {
        id: 'strip-1',
        type: 'STRIP',
      },
      {
        id: 'promo-banners',
        type: 'PROMO_BANNERS',
        data: { promoBanners },
      },
      {
        id: 'strip-2',
        type: 'STRIP',
      },
      // ── Promo video inserted between promo banners and trending section ──
      {
        id: 'section-header-trending',
        type: 'SECTION_HEADER',
        data: { eyebrow: 'TRENDING NOW', title: 'Best Sellers' },
      },
      {
        id: 'strip-3',
        type: 'STRIP',
      },
      {
        id: 'product-grid',
        type: 'PRODUCT_GRID',
        data: { products },
      },
      {
        id: 'promo-videos',
        type: 'PROMO_VIDEOS',
        data: { videos: SAMPLE_VIDEOS },
      },
      {
        id: 'shop-cta',
        type: 'SHOP_CTA',
      },
      {
        id: 'strip-4',
        type: 'STRIP',
      },
      {
        id: 'single-promo-video',
        type: 'PROMO_VIDEO',
        data: { videos: SAMPLE_VIDEO },
      },
      {
        id: 'strip-2',
        type: 'STRIP',
      },
    ],
    [banners, categories, products, promoBanners]
  );

  // ── Stable key extractor ──────────────────────────────────────────────

  const keyExtractor = useCallback((item: HomeSection) => item.id, []);

  return {
    sections,
    visibleIds,
    keyExtractor,
    onViewableItemsChanged,
    viewabilityConfig: VIEWABILITY_CONFIG,
  };
}
