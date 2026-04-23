import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
  },
  icon: { fontSize: 56 },
  title: { color: theme.colors.text, textAlign: "center" as const, ...fontConfig.InterBoldLg },
  sub: { color: theme.colors.textMuted, textAlign: "center" as const, ...fontConfig.InterRegularSm },
  btn: {
    backgroundColor: theme.colors.text,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.sm,
  },
  btnText: { color: theme.colors.surface, letterSpacing: 1.5, ...fontConfig.InterBoldSm },
}));

export const EmptyCart = memo(function EmptyCart({ onShop }: { onShop: () => void }) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛍</Text>
      <Text style={styles.title}>Your bag is empty</Text>
      <Text style={styles.sub}>Add items from the store to see them here.</Text>
      <TouchableOpacity style={styles.btn} onPress={onShop} activeOpacity={0.85}>
        <Text style={styles.btnText}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </View>
  );
});
