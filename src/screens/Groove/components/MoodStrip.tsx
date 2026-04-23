import React, { memo, useCallback } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import type { MoodCard } from "../hooks/useGrooveData";
import { useGrooveLayout } from "../hooks/useGrooveLayout";

const useStyles = createStyles((theme) => ({
  section: { paddingVertical: theme.spacing.lg },
  header: {
    flexDirection: "row" as const,
    alignItems: "baseline" as const,
    justifyContent: "space-between" as const,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  title: { color: theme.colors.text, ...fontConfig.InterBoldLg },
  viewAll: { color: theme.colors.accent, letterSpacing: 0.5, ...fontConfig.InterMediumXs },
  listContent: { paddingHorizontal: theme.spacing.lg, gap: theme.spacing.sm },
  card: { overflow: "hidden" as const, position: "relative" as const },
  image: { width: "100%", height: "100%", resizeMode: "cover" as const },
  labelWrap: {
    position: "absolute" as const,
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    backgroundColor: "rgba(0,0,0,0.42)",
  },
  label: { color: "#FFFFFF", letterSpacing: 1, ...fontConfig.InterBoldSm },
}));

type Props = { cards: MoodCard[] };

export const MoodStrip = memo(function MoodStrip({ cards }: Props) {
  const styles = useStyles();
  const { moodCardWidth, moodCardHeight } = useGrooveLayout();

  const renderItem = useCallback(({ item }: { item: MoodCard }) => (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[styles.card, { width: moodCardWidth, height: moodCardHeight }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.labelWrap}>
        <Text style={styles.label}>{item.label.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  ), [moodCardWidth, moodCardHeight, styles]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop by Mood</Text>
        <Text style={styles.viewAll}>VIEW ALL →</Text>
      </View>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={moodCardWidth + 8}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: moodCardWidth + 8,
          offset: (moodCardWidth + 8) * index,
          index,
        })}
      />
    </View>
  );
});
