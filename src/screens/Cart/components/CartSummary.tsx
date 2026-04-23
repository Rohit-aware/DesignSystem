import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";

type Props = { subtotal: number };

export const CartSummary = memo(
  function CartSummary({ subtotal }: Props) {
    const styles = useStyles();
    const fmt = subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 });

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>₹{fmt}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.cta}>
          <View style={styles.priceBlock}>
            <Text style={styles.total}>₹{fmt}</Text>
            <Text style={styles.taxNote}>Incl. of all taxes</Text>
          </View>
          <TouchableOpacity style={styles.placeBtn} activeOpacity={0.88}>
            <Text style={styles.placeBtnText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    ...fontConfig.InterBoldMd,
  },
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },
  label: {
    color: theme.colors.textMuted,
    ...fontConfig.InterRegularSm,
  },
  value: {
    color: theme.colors.text,
    ...fontConfig.InterSemiBoldSm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  cta: {
    flexDirection: "row" as const,
    overflow: "hidden" as const,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.base.sm,
  },
  priceBlock: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    justifyContent: "center" as const,
  },
  total: {
    color: theme.colors.text,
    ...fontConfig.InterBoldLg,
  },
  taxNote: {
    color: theme.colors.textMuted,
    marginTop: 2,
    ...fontConfig.InterRegularXs,
  },
  placeBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.text,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: theme.spacing.xs,
    ...theme.shadows.base.sm,
  },
  placeBtnText: {
    color: theme.colors.surface,
    letterSpacing: 1.5,
    ...fontConfig.InterBoldSm,
  },
}));