import React, { memo, useCallback, useRef } from "react";
import { createStyles, fontConfig, useTheme } from "@/theme";
import type { GridProduct } from "../hooks/useGrooveData";
import { useGrooveLayout } from "../hooks/useGrooveLayout";
import { Animated, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";


const GridCard = memo(function GridCard({ item, styles, reduceMotion }: { item: GridProduct; styles: ReturnType<typeof useStyles>; reduceMotion: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = useCallback(() => {
    if (!reduceMotion) Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  }, [reduceMotion, scale]);
  const onPressOut = useCallback(() => {
    if (!reduceMotion) Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 3 }).start();
  }, [reduceMotion, scale]);

  return (
    <Animated.View style={{ flex: 1, transform: [{ scale }] }}>
      <Pressable style={styles.card} onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />
          {item.tag !== undefined && (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
          )}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <Text style={styles.addBtnIcon}>🛍</Text>
            <Text style={styles.addBtnLabel}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.brand} numberOfLines={1}>{item.brand.toUpperCase()}</Text>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
            <Text style={styles.original}>₹{item.originalPrice.toLocaleString()}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
})



type Props = { products: GridProduct[] };

export const GrooveGrid = memo(function GrooveGrid({ products }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  const { columns, gridSpacing, sectionPadding } = useGrooveLayout();
  const reduceMotion = theme.accessibility.reduceMotion;

  const renderItem = useCallback(({ item }: { item: GridProduct }) => (
    <View style={{ flex: 1, padding: gridSpacing / 2 }}>
      <GridCard item={item} styles={styles} reduceMotion={reduceMotion} />
    </View>
  ), [gridSpacing, styles, reduceMotion]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.eyebrow}>THE COLLECTION</Text>
          <Text style={styles.title}>Groove Essentials</Text>
        </View>
        <Text style={styles.viewAll}>VIEW ALL →</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={columns}
        key={`groove-grid-${columns}`}
        contentContainerStyle={{
          paddingHorizontal: sectionPadding - gridSpacing / 2,
          paddingBottom: sectionPadding,
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});


const useStyles = createStyles((theme) => ({
  section: { paddingBottom: theme.spacing.xxl },
  header: {
    flexDirection: "row" as const,
    alignItems: "baseline" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  left: { gap: 2 },
  eyebrow: { color: theme.colors.accent, letterSpacing: 3, ...fontConfig.InterSemiBoldXs },
  title: { color: theme.colors.text, ...fontConfig.InterBoldLg },
  viewAll: { color: theme.colors.textMuted, letterSpacing: 0.5, ...fontConfig.InterMediumXs },
  card: {
    backgroundColor: theme.colors.card,
    overflow: "hidden" as const,
    ...theme.shadows.base.sm,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 0.82,
    backgroundColor: theme.colors.background,
    position: "relative" as const,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" as const },
  tagBadge: {
    position: "absolute" as const,
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  tagText: { color: "#FFFFFF", letterSpacing: 0.5, ...fontConfig.InterBoldXs },
  discountBadge: {
    position: "absolute" as const,
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  discountText: { color: theme.colors.error, ...fontConfig.InterBoldXs },
  addBtn: {
    position: "absolute" as const,
    bottom: 0, left: 0, right: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.text,
  },
  addBtnIcon: { fontSize: 12 },
  addBtnLabel: { color: theme.colors.surface, letterSpacing: 0.5, ...fontConfig.InterBoldXs },
  info: {
    padding: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    gap: 3,
  },
  brand: { color: theme.colors.textMuted, letterSpacing: 1, ...fontConfig.InterMediumXs },
  name: { color: theme.colors.text, lineHeight: 17, ...fontConfig.InterMediumSm },
  priceRow: { flexDirection: "row" as const, alignItems: "center" as const, gap: theme.spacing.sm, marginTop: 2 },
  price: { color: theme.colors.text, ...fontConfig.InterSemiBoldSm },
  original: { color: theme.colors.textMuted, textDecorationLine: "line-through" as const, ...fontConfig.InterRegularXs },
}));
