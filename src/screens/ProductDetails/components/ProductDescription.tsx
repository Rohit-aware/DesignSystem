import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";


const useStyles = createStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    color: theme.colors.text,
    ...fontConfig.InterBoldSm,
  },
  chevron: {
    color: theme.colors.textMuted,
    fontSize: 16,
  },
  text: {
    color: theme.colors.textMuted,
    lineHeight: 22,
    marginTop: theme.spacing.md,
    ...fontConfig.InterRegularSm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.lg,
  },
}));

type Props = {
  description: string;
  expanded: boolean;
  onToggle: () => void;
};

export const ProductDescription = memo(function ProductDescription({ description, expanded, onToggle }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <Text style={styles.label}>PRODUCT DESCRIPTION</Text>
        <Text style={styles.chevron}>{expanded ? "−" : "+"}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.text}>{description}</Text>}
      <View style={styles.divider} />
    </View>
  );
});
