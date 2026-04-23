import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { createStyles, useTheme } from "@/theme";
import { useGrooveData } from "./hooks/useGrooveData";
import { GrooveHero } from "./components/GrooveHero";
import { MoodStrip } from "./components/MoodStrip";
import { ShopTheLook } from "./components/ShopTheLook";
import { EditorialBanners } from "./components/EditorialBanners";
import { GrooveGrid } from "./components/GrooveGrid";

const useScreenStyles = createStyles((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  divider: { height: 6, backgroundColor: theme.colors.background },
}));

export function GrooveScreen() {
  const { theme } = useTheme();
  const styles = useScreenStyles();
  const { moodCards, shopProducts, editorialBanners, gridProducts } = useGrooveData();

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.surface}
      />
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <GrooveHero />
        <View style={styles.divider} />
        <MoodStrip cards={moodCards} />
        <View style={styles.divider} />
        <ShopTheLook products={shopProducts} />
        <EditorialBanners banners={editorialBanners} />
        <GrooveGrid products={gridProducts} />
      </ScrollView>
    </View>
  );
}
