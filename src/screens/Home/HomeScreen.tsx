import React, { useCallback, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { useTheme, createStyles } from "@rohit-dev/design-system";
import { useHomeData } from "./hooks/useHomeData";
import { Header } from "./components/Header";
import { BannerCarousel } from "./components/BannerCarousel";
import { CategoryRow } from "./components/CategoryRow";
import { PromoBanners } from "./components/PromoBanners";
import { ProductGrid } from "./components/ProductGrid";
import { SectionHeader } from "./components/SectionHeader";
import { ShopCTA } from "./components/ShopCTA";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const { theme } = useTheme();
  const styles = useScreenStyles();
  const { banners, categories, products, promoBanners } = useHomeData();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const onCategorySelect = useCallback((id: string) => {
    setActiveCategoryId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.surface}
      />
      <Header onSearchPress={() => { }} />
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <BannerCarousel banners={banners} />

        <CategoryRow
          categories={categories}
          activeId={activeCategoryId}
          onSelect={onCategorySelect}
        />

        <View style={styles.strip} />

        <PromoBanners banners={promoBanners} />

        <View style={styles.strip} />

        <SectionHeader
          eyebrow="TRENDING NOW"
          title="Best Sellers"
          onSeeAll={() => { }}
        />
        <ProductGrid products={products} />
        <ShopCTA />
        <View style={styles.strip} />
      </ScrollView>
    </SafeAreaView>
  );
};

const useScreenStyles = createStyles((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  strip: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
}));