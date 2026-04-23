import React, { memo, useCallback } from "react";
import { createStyles, fontConfig } from "@/theme";
import type { Banner } from "../hooks/useHomeData";
import { useBannerCarousel } from "../hooks/useBannerCarousel";
import { useResponsiveGrid } from "../hooks/useResponsiveGrid";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type Props = { banners: Banner[] };

export const BannerCarousel = memo(
  function BannerCarousel({ banners }: Props) {
    const styles = useBannerStyles();
    const { bannerHeight, screenWidth } = useResponsiveGrid();
    const { activeIndex, flatListRef, scrollTo } = useBannerCarousel(banners.length);

    const renderItem = useCallback(({ item }: { item: Banner }) => (
      <View style={[styles.slide, { width: screenWidth, height: bannerHeight }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={[styles.overlay]}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={[styles.title]}>
            {item.title}
          </Text>
          <Text style={[styles.subtitle]}>
            {item.subtitle}
          </Text>
          <TouchableOpacity style={styles.cta} activeOpacity={0.85}>
            <Text style={styles.ctaText}>{item.cta}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dotsRow}>
          {banners.map((b, i) => (
            <View key={b.id} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>
      </View>
    ), [bannerHeight, screenWidth, activeIndex, banners, styles]);

    const getItemLayout = useCallback(
      (_: ArrayLike<Banner> | null | undefined, index: number) => ({
        length: screenWidth, offset: screenWidth * index, index,
      }),
      [screenWidth]
    );

    return (
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          scrollTo(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
        }}
        getItemLayout={getItemLayout}
      />
    );
  });

const useBannerStyles = createStyles((theme) => ({
  slide: {
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover" as const,
  },
  overlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
  },
  tag: {
    backgroundColor: theme.colors.accent,
    alignSelf: "flex-start" as const,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
    marginBottom: theme.spacing.sm,
  },
  tagText: {
    color: theme.colors.text,
    letterSpacing: 1.5,
    ...fontConfig.InterBoldXs,
  },
  title: {
    color: theme.colors.text,
    lineHeight: 40,
    marginBottom: theme.spacing.sm,
    ...fontConfig.PlayfairBoldXxl,
  },
  subtitle: {
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    ...fontConfig.InterRegularSm,
  },
  cta: {
    alignSelf: "flex-start" as const,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  ctaText: {
    color: theme.colors.text,
    letterSpacing: 1.5,
    ...fontConfig.InterBoldXs,
  },
  dotsRow: {
    position: "absolute" as const,
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.xs,
  },
  dot: {
    width: 20,
    height: 2,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    backgroundColor: theme.colors.text,
    width: 36,
  },
}));
