import React, { memo, useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";


type Props = {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  showError?: boolean;
};

export const SizeSelector = memo(function SizeSelector({ sizes, selected, onSelect, showError }: Props) {
  const styles = useStyles();

  const renderSize = useCallback((size: string) => {
    const isActive = size === selected;
    return (
      <TouchableOpacity
        key={size}
        style={[styles.sizeBtn, isActive && styles.sizeBtnActive]}
        onPress={() => onSelect(size)}
        activeOpacity={0.75}
      >
        <Text style={[styles.sizeText, isActive && styles.sizeTextActive]}>{size}</Text>
      </TouchableOpacity>
    );
  }, [selected, onSelect, styles]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>SELECT SIZE</Text>
        <Text style={styles.guide}>Size Guide</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.sizeWrap}>
          {sizes.map(renderSize)}
        </View>
      </ScrollView>
      {showError === true && (
        <Text style={styles.errorText}>Please select a size to continue</Text>
      )}
    </View>
  );
});
const useStyles = createStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  headerRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.text,
    ...fontConfig.InterBoldSm,
  },
  guide: {
    color: theme.colors.accent,
    ...fontConfig.InterMediumXs,
  },
  sizeWrap: {
    flexDirection: "row" as const,
    gap: theme.spacing.sm,
  },
  sizeBtn: {
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  sizeBtnActive: {
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.text,
  },
  sizeText: {
    color: theme.colors.text,
    ...fontConfig.InterMediumSm,
  },
  sizeTextActive: {
    color: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
    ...fontConfig.InterRegularXs,
  },
}));
