import React, { memo, useCallback, useRef } from "react";
import { Animated, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import type { ShopProduct } from "../hooks/useGrooveData";
import { useGrooveLayout } from "../hooks/useGrooveLayout";

const useStyles = createStyles((theme) => ({
  section: { paddingVertical: theme.spacing.lg },
  header: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: 2,
  },
  eyebrow: { color: theme.colors.accent, letterSpacing: 3, ...fontConfig.InterSemiBoldXs },
  title: { color: theme.colors.text, ...fontConfig.PlayfairBoldXl },
  listContent: { paddingHorizontal: theme.spacing.lg, gap: theme.spacing.md },
  card: {
    backgroundColor: theme.colors.card,
    overflow: "hidden" as const,
    ...theme.shadows.base.sm,
  },
  imageWrap: {
    position: "relative" as const,
    backgroundColor: theme.colors.background,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" as const },
  addBtn: {
    position: "absolute" as const,
    bottom: 0, left: 0, right: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  addIcon: { fontSize: 13 },
  addLabel: { color: theme.colors.surface, letterSpacing: 0.5, ...fontConfig.InterBoldXs },
  info: {
    padding: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    gap: 2,
  },
  name: { color: theme.colors.text, ...fontConfig.InterMediumSm },
  priceRow: { flexDirection: "row" as const, alignItems: "center" as const, gap: theme.spacing.sm },
  price: { color: theme.colors.text, ...fontConfig.InterSemiBoldSm },
  original: {
    color: theme.colors.textMuted,
    textDecorationLine: "line-through" as const,
    ...fontConfig.InterRegularXs,
  },
}));

type Props = { products: ShopProduct[] };

export const ShopTheLook = memo(function ShopTheLook({ products }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  const { shopCardWidth } = useGrooveLayout();
  const imageHeight = shopCardWidth * 1.2;
  const reduceMotion = theme.accessibility.reduceMotion;

  const renderItem = useCallback(({ item }: { item: ShopProduct }) => {
    const scale = { current: new Animated.Value(1) };
    const onPressIn = () => {
      if (!reduceMotion) {
        Animated.spring(scale.current, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
      }
    };
    const onPressOut = () => {
      if (!reduceMotion) {
        Animated.spring(scale.current, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 3 }).start();
      }
    };
    return (
      <Animated.View style={{ transform: [{ scale: scale.current }], width: shopCardWidth }}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <View style={[styles.imageWrap, { height: imageHeight }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.addBtn}>
              <Text style={styles.addIcon}>🛍</Text>
              <Text style={styles.addLabel}>ADD TO BAG</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
              <Text style={styles.original}>₹{item.originalPrice.toLocaleString()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [shopCardWidth, imageHeight, styles, reduceMotion]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EDITORIAL PICKS</Text>
        <Text style={styles.title}>Shop the Look</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={shopCardWidth + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: shopCardWidth + 16,
          offset: (shopCardWidth + 16) * index,
          index,
        })}
      />
    </View>
  );
});
