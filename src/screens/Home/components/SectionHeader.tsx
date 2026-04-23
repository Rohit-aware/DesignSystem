import React, { memo } from "react";
import { createStyles, fontConfig } from "@/theme";
import { Text, TouchableOpacity, View } from "react-native";


const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.sm,
  },
  left: { gap: 2 },
  eyebrow: {
    color: theme.colors.accent,
    letterSpacing: 2,
    ...fontConfig.InterSemiBoldXs,
  },
  title: {
    color: theme.colors.text,
    ...fontConfig.InterBoldLg,
  },
  seeAll: {
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    ...fontConfig.InterMediumXs,
  },
}));

type Props = {
  eyebrow?: string;
  title: string;
  onSeeAll?: () => void;
};

export const SectionHeader = memo(function SectionHeader({ eyebrow, title, onSeeAll }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {eyebrow !== undefined && <Text style={styles.eyebrow}>{eyebrow}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>
      {onSeeAll !== undefined && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>VIEW ALL →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
