import React, { memo } from "react";
import { createStyles, fontConfig } from "@/theme";
import { Text, TouchableOpacity, View } from "react-native";

export const ShopCTA = memo(function ShopCTA() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SINCE 1994</Text>
      <Text style={styles.title}>{"Wear the\nJockey Difference"}</Text>
      <Text style={styles.subtitle}>Premium comfort. Everyday quality.</Text>
      <TouchableOpacity style={styles.btn} activeOpacity={0.85}>
        <Text style={styles.btnText}>SHOP ALL</Text>
      </TouchableOpacity>
    </View>
  );
});
const useStyles = createStyles((theme) => ({
  container: {
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.xl,
    backgroundColor: theme.colors.text,
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center" as const,
    gap: theme.spacing.md,
    borderRadius: theme.spacing.md
  },
  eyebrow: {
    color: theme.colors.accent,
    letterSpacing: 3,
    ...fontConfig.InterSemiBoldXs,
  },
  title: {
    color: theme.colors.surface,
    textAlign: "center" as const,
    lineHeight: 36,
    ...fontConfig.PlayfairBoldXxl,
  },
  subtitle: {
    color: theme.colors.textInverse,
    textAlign: "center" as const,
    ...fontConfig.InterRegularSm,
  },
  btn: {
    borderWidth: 1,
    borderColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  btnText: {
    color: theme.colors.background,
    letterSpacing: 2,
    ...fontConfig.InterBoldSm,
  },
}));
