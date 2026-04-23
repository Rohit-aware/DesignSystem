import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";


const useStyles = createStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  label: {
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    ...fontConfig.InterBoldSm,
  },
  row: {
    flexDirection: "row" as const,
    gap: theme.spacing.md,
    flexWrap: "wrap" as const,
  },
  swatch: {
    alignItems: "center" as const,
    gap: theme.spacing.xs,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  circleActive: {
    borderWidth: 2,
    borderColor: theme.colors.text,
  },
  swatchLabel: {
    color: theme.colors.textMuted,
    ...fontConfig.InterRegularXs,
  },
  swatchLabelActive: {
    color: theme.colors.text,
  },
}));

type Color = { id: string; label: string; hex: string };

type Props = {
  colors: Color[];
  selected: string | null;
  onSelect: (id: string) => void;
};

export const ColorSelector = memo(function ColorSelector({ colors, selected, onSelect }: Props) {
  const styles = useStyles();

  const renderColor = useCallback((color: Color) => {
    const isActive = color.id === selected;
    return (
      <TouchableOpacity
        key={color.id}
        style={styles.swatch}
        onPress={() => onSelect(color.id)}
        activeOpacity={0.75}
      >
        <View
          style={[
            styles.circle,
            { backgroundColor: color.hex },
            isActive && styles.circleActive,
          ]}
        />
        <Text style={[styles.swatchLabel, isActive && styles.swatchLabelActive]}>
          {color.label}
        </Text>
      </TouchableOpacity>
    );
  }, [selected, onSelect, styles]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SELECT COLOUR</Text>
      <View style={styles.row}>
        {colors.map(renderColor)}
      </View>
    </View>
  );
});
