import React, { memo, useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { createStyles, fontConfig, useTheme } from "@/theme";
import { useGrooveLayout } from "../hooks/useGrooveLayout";

const useStyles = createStyles((theme) => ({
  container: { position: "relative" as const, overflow: "hidden" as const },
  image: { width: "100%", height: "100%", resizeMode: "cover" as const },
  overlay: {
    position: "absolute" as const,
    inset: 0,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.38)",
    justifyContent: "flex-end" as const,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  tag: {
    color: theme.colors.accent,
    letterSpacing: 3,
    marginBottom: theme.spacing.sm,
    ...fontConfig.InterSemiBoldXs,
  },
  heading: {
    color: "#FFFFFF",
    lineHeight: 52,
    marginBottom: theme.spacing.md,
    ...fontConfig.PlayfairBoldDisplay,
  },
  subtitle: {
    color: "rgba(255,255,255,0.78)",
    marginBottom: theme.spacing.xl,
    ...fontConfig.InterRegularMd,
  },
  cta: {
    alignSelf: "flex-start" as const,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  ctaText: {
    color: "#FFFFFF",
    letterSpacing: 2,
    ...fontConfig.InterBoldSm,
  },
}));

export const GrooveHero = memo(function GrooveHero() {
  const styles = useStyles();
  const { heroHeight } = useGrooveLayout();
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: theme.accessibility.reduceMotion ? 0 : 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { height: heroHeight, opacity }]}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=90" }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.tag}>JOCKEY GROOVE SS25</Text>
        <Text style={styles.heading}>{"Wear the\nRhythm"}</Text>
        <Text style={styles.subtitle}>A collection born from movement, built for life.</Text>
        <TouchableOpacity style={styles.cta} activeOpacity={0.8}>
          <Text style={styles.ctaText}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});
