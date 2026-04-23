import React, { memo } from "react";
import { createStyles, fontConfig } from "@/theme";
import type { PromoBanner } from "../hooks/useHomeData";
import { useResponsiveGrid } from "../hooks/useResponsiveGrid";
import { Image, Text, TouchableOpacity, View } from "react-native";


const useStyles = createStyles((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: "row" as const,
    gap: theme.spacing.sm,
  },
  tile: {
    flex: 1,
    overflow: "hidden" as const,
    position: "relative" as const,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover" as const,
  },
  overlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center" as const,
  },
  label: {
    color: "#FFFFFF",
    marginBottom: theme.spacing.xs,
    ...fontConfig.InterBoldSm,
  },
  cta: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
  },
  ctaText: {
    color: "#FFFFFF",
    letterSpacing: 1,
    ...fontConfig.InterMediumXs,
  },
}));

type Props = { banners: PromoBanner[] };

export const PromoBanners = memo(function PromoBanners({ banners }: Props) {
  const styles = useStyles();
  const { promoBannerHeight } = useResponsiveGrid();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {banners.map((b) => (
          <TouchableOpacity key={b.id} style={[styles.tile, { height: promoBannerHeight }]} activeOpacity={0.9}>
            <Image source={{ uri: b.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.label}>{b.label}</Text>
              <View style={styles.cta}>
                <Text style={styles.ctaText}>{b.cta}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
