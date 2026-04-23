import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, StatusBar, View } from 'react-native';
import { useTheme, createStyles } from '@rohit-dev/design-system';
import { useHomeSections, type HomeSection } from './hooks/useHomeSections';
import { Header } from './components/Header';
import { BannerCarousel } from './components/BannerCarousel';
import { CategoryRow } from './components/CategoryRow';
import { PromoBanners } from './components/PromoBanners';
import { ProductGrid } from './components/ProductGrid';
import { SectionHeader } from './components/SectionHeader';
import { ShopCTA } from './components/ShopCTA';
import { PromoVideoCarousel } from './components/PromoVideoCarousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PromoVideoSection } from './components/PromoVideoSection';


export function HomeScreen() {
  const { theme } = useTheme();
  const styles = useScreenStyles();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const {
    sections,
    visibleIds,
    keyExtractor,
    onViewableItemsChanged,
    viewabilityConfig,
  } = useHomeSections();

  const onCategorySelect = useCallback((id: string) => {
    setActiveCategoryId((prev) => (prev === id ? null : id));
  }, []);

  const renderSection: ListRenderItem<HomeSection> = useCallback(
    ({ item }) => {
      switch (item.type) {
        case 'BANNER_CAROUSEL':
          return <BannerCarousel banners={item.data?.banners ?? []} />;

        case 'CATEGORY_ROW':
          return (
            <CategoryRow
              categories={item.data?.categories ?? []}
              activeId={activeCategoryId}
              onSelect={onCategorySelect}
            />
          );

        case 'STRIP':
          return <View style={styles.strip} />;

        case 'PROMO_BANNERS':
          return <PromoBanners banners={item.data?.promoBanners ?? []} />;

        case 'PROMO_VIDEOS':
          return (
            <PromoVideoCarousel
              videos={item.data?.videos ?? []}
              isVisible={visibleIds.has(item.id)}
            />
          );
        case 'PROMO_VIDEO':
          return (
            <View style={styles.margingView}>
              <PromoVideoSection
                videoUrl={item.data?.videos?.[0].url ?? ''}
                isVisible={visibleIds.has(item.id)}
                aspectRatio={12 / 6}
                muted={true}
                borderRadius={16}
              />
            </View>
          );

        case 'SECTION_HEADER':
          return (
            <SectionHeader
              eyebrow={item.data?.eyebrow}
              title={item.data?.title ?? ''}
              onSeeAll={() => { }}
            />
          );

        case 'PRODUCT_GRID':
          return <ProductGrid products={item.data?.products ?? []} />;

        case 'SHOP_CTA':
          return <ShopCTA />;

        default:
          return null;
      }
    },
    [activeCategoryId, onCategorySelect, visibleIds]
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.surface}
      />
      <Header onSearchPress={() => { }} />
      <FlatList
        data={sections}
        keyExtractor={keyExtractor}
        renderItem={renderSection}
        showsVerticalScrollIndicator={false}
        bounces
        // ── Viewability-driven video autoplay ────────────────────────────
        // FlatList tracks which sections are ≥70% visible and feeds that
        // into the PROMO_VIDEO component via the `visibleIds` set.
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={7}
        initialNumToRender={4}
      />
    </SafeAreaView>
  );
}


const useScreenStyles = createStyles((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  strip: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  margingView: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: theme.spacing.md,
  }
}));