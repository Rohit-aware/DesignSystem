import { MainStackParamList } from "@/routes/types";
import React, { memo, useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import type { Product } from "@/screens/Home/hooks/useHomeData";
import { useCartStore, selectCartItem } from "@/store/cart/useCartStore";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animated, Image, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = { product: Product };

export const ProductCard = memo(
  function ProductCard({ product }: Props) {
    const { theme } = useTheme();
    const styles = useCardStyles();
    const scale = useRef(new Animated.Value(1)).current;
    const reduceMotion = theme.accessibility.reduceMotion;
    const btnScale = useRef(new Animated.Value(1)).current;
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const addToCart = useCartStore((s) => s.addToCart);
    const cartItem = useCartStore(selectCartItem(product.id));
    const qty = cartItem?.quantity ?? 0;

    const onPressIn = useCallback(() => {
      if (reduceMotion) return;
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
    }, [reduceMotion, scale]);

    const onPressOut = useCallback(() => {
      if (reduceMotion) return;
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 3 }).start();
    }, [reduceMotion, scale]);

    const handleCardPress = useCallback(() => {
      navigation.navigate("ProductDetails", { product });
    }, [navigation, product]);

    const handleAdd = useCallback(() => {
      addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
      if (reduceMotion) return;
      Animated.sequence([
        Animated.spring(btnScale, { toValue: 0.78, useNativeDriver: true, speed: 80, bounciness: 0 }),
        Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 8 }),
      ]).start();
    }, [addToCart, product, reduceMotion, btnScale]);

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          style={styles.card}
          onPress={handleCardPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <View style={styles.imageWrap}>
            <Image source={{ uri: product.image }} style={styles.image} />
            {product.tag !== undefined && (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{product.tag}</Text>
              </View>
            )}
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
            <TouchableOpacity
              onPress={handleAdd}
              hitSlop={{ top: 4, bottom: 4, left: 0, right: 0 }}
              activeOpacity={0.85}
            >
              <Animated.View
                style={[
                  styles.addBtn,
                  qty > 0 && styles.addBtnAdded,
                  { transform: [{ scale: btnScale }] },
                ]}
              >
                <Text style={styles.addBtnIcon}>🛍</Text>
                <Text style={[styles.addBtnLabel, qty > 0 && styles.addBtnLabelAdded]}>
                  {qty > 0 ? "ADDED" : "ADD TO BAG"}
                </Text>
                {qty > 0 && (
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyBadgeText}>{qty}</Text>
                  </View>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.brand} numberOfLines={1}>{product.brand.toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
              <Text style={styles.original}>₹{product.originalPrice.toLocaleString()}</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  });

const useCardStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    overflow: "hidden",
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 0.78,
    backgroundColor: theme.colors.background,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tagBadge: {
    position: "absolute",
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  tagText: {
    color: "#FFFFFF",
    letterSpacing: 0.5,
    ...fontConfig.InterBoldXs,
  },
  discountBadge: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  discountText: {
    color: theme.colors.error,
    ...fontConfig.InterBoldXs,
  },
  addBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  addBtnAdded: {
    backgroundColor: theme.colors.text,
    borderTopColor: theme.colors.text,
  },
  addBtnIcon: {
    fontSize: 13,
  },
  addBtnLabel: {
    color: theme.colors.text,
    letterSpacing: 0.5,
    ...fontConfig.InterSemiBoldXs,
  },
  addBtnLabelAdded: {
    color: theme.colors.surface,
  },
  qtyBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  qtyBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 11,
  },
  info: {
    paddingHorizontal: theme.spacing.xs,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    gap: 3,
  },
  brand: {
    color: theme.colors.textMuted,
    letterSpacing: 1,
    ...fontConfig.InterMediumXs,
  },
  title: {
    color: theme.colors.text,
    lineHeight: 18,
    ...fontConfig.InterMediumSm,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginTop: 2,
  },
  price: {
    color: theme.colors.text,
    ...fontConfig.InterBoldMd,
  },
  original: {
    color: theme.colors.textMuted,
    textDecorationLine: "line-through",
    ...fontConfig.InterRegularXs,
  },
}));