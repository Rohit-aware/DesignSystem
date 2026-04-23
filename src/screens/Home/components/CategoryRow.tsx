import React, { memo, useCallback } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig } from "@/theme";
import type { Category } from "../hooks/useHomeData";


const useStyles = createStyles((theme) => ({
  container: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  item: {
    alignItems: "center" as const,
    gap: theme.spacing.xs,
    width: 68,
  },
  imageWrap: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.full,
    overflow: "hidden" as const,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.base.xs,
  },
  imageActive: {
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover" as const,
  },
  label: {
    color: theme.colors.text,
    textAlign: "center" as const,
    ...fontConfig.InterMediumXs,
  },
  labelActive: {
    color: theme.colors.accent,
    ...fontConfig.InterBoldXs,
  },
}));

type Props = {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export const CategoryRow = memo(function CategoryRow({ categories, activeId, onSelect }: Props) {
  const styles = useStyles();

  const renderItem = useCallback(({ item }: { item: Category }) => {
    const isActive = item.id === activeId;
    return (
      <TouchableOpacity style={styles.item} onPress={() => onSelect(item.id)} activeOpacity={0.75}>
        <View style={[styles.imageWrap, isActive && styles.imageActive]}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  }, [activeId, onSelect, styles]);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});
