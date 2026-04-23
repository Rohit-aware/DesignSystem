import React, { memo } from "react";
import { createStyles, fontConfig } from "@/theme";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export const BottomCTA = memo(
  function BottomCTA({ onAddToCart, onBuyNow }: Props) {
    const styles = useStyles();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addBtn} onPress={onAddToCart} activeOpacity={0.8}>
          <Text style={styles.addBtnText}>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn} onPress={onBuyNow} activeOpacity={0.85}>
          <Text style={styles.buyBtnText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    );
  });

const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    gap: theme.spacing.md,
  },
  addBtn: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    color: theme.colors.text,
    letterSpacing: 1,
    ...fontConfig.InterBoldSm,
  },
  buyBtn: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: {
    color: theme.colors.surface,
    letterSpacing: 1,
    ...fontConfig.InterBoldSm,
  },
}));
