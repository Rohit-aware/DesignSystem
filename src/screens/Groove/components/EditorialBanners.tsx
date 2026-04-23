import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import type { EditorialBanner } from "../hooks/useGrooveData";
import { useGrooveLayout } from "../hooks/useGrooveLayout";

type Props = { banners: EditorialBanner[] };

export const EditorialBanners = memo(
  function EditorialBanners({ banners }: Props) {
    const styles = useStyles();
    const { sectionPadding } = useGrooveLayout();

    return (
      <View style={[styles.section, { marginVertical: sectionPadding }]}>
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={[styles.banner, banner.imageRight && styles.bannerReverse]}
          >
            <View style={styles.imageWrap}>
              <Image source={{ uri: banner.image }} style={styles.image} />
            </View>
            <View style={styles.content}>
              <Text style={styles.tag}>{banner.tag}</Text>
              <Text style={styles.heading}>{banner.heading}</Text>
              <Text style={styles.body}>{banner.body}</Text>
              <TouchableOpacity style={styles.cta} activeOpacity={0.75}>
                <Text style={styles.ctaText}>{banner.cta}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    );
  });


const useStyles = createStyles((theme) => ({
  section: { gap: 2 },
  banner: {
    flexDirection: "row" as const,
    height: 320,
    overflow: "hidden" as const,
  },
  bannerReverse: { flexDirection: "row-reverse" as const },
  imageWrap: { flex: 1 },
  image: { width: "100%", height: "100%", resizeMode: "cover" as const },
  content: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: "center" as const,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  tag: {
    color: theme.colors.accent,
    letterSpacing: 3,
    ...fontConfig.InterSemiBoldXs,
  },
  heading: {
    color: theme.colors.text,
    lineHeight: 36,
    ...fontConfig.PlayfairBoldXxl,
  },
  body: {
    color: theme.colors.textMuted,
    lineHeight: 22,
    ...fontConfig.InterRegularSm,
  },
  cta: {
    alignSelf: "flex-start" as const,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
    paddingBottom: 2,
  },
  ctaText: {
    color: theme.colors.text,
    letterSpacing: 1.5,
    ...fontConfig.InterBoldXs,
  },
}));
