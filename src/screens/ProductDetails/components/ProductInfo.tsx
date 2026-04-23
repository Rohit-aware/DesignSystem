import React, { memo } from "react";
import { Text, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";


const useStyles = createStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  brand: {
    color: theme.colors.textMuted,
    letterSpacing: 2,
    ...fontConfig.InterMediumXs,
  },
  title: {
    color: theme.colors.text,
    lineHeight: 34,
    ...fontConfig.PlayfairBoldXxl,
  },
  ratingRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  stars: {
    color: "#F5A623",
    fontSize: 12,
  },
  ratingText: {
    color: theme.colors.textMuted,
    ...fontConfig.InterRegularSm,
  },
  priceRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  price: {
    color: theme.colors.text,
    ...fontConfig.InterBoldXl,
  },
  original: {
    color: theme.colors.textMuted,
    textDecorationLine: "line-through" as const,
    ...fontConfig.InterRegularMd,
  },
  discountTag: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  discountText: {
    color: "#FFFFFF",
    ...fontConfig.InterBoldXs,
  },
}));

type Props = {
  brand: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
};

export const ProductInfo = memo(function ProductInfo({
  brand, title, price, originalPrice, discount, rating, reviews,
}: Props) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{brand.toUpperCase()}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>{"★".repeat(Math.round(rating))}</Text>
        <Text style={styles.ratingText}>{rating} ({reviews.toLocaleString()} reviews)</Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{price.toLocaleString()}</Text>
        <Text style={styles.original}>₹{originalPrice.toLocaleString()}</Text>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>{discount}% OFF</Text>
        </View>
      </View>
    </View>
  );
});
