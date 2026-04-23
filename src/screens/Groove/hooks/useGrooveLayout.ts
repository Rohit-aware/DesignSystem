import { useTheme } from "@/theme";

export type GrooveLayout = {
  screenWidth: number;
  columns: number;
  heroHeight: number;
  moodCardWidth: number;
  moodCardHeight: number;
  shopCardWidth: number;
  sectionPadding: number;
  gridSpacing: number;
};

export function useGrooveLayout(): GrooveLayout {
  const { theme } = useTheme();
  const { deviceForm, isFolded, isLandscape } = theme.layout;

  const isTablet = deviceForm === "tablet";
  const columns = isTablet && !isFolded ? 4 : isTablet || isLandscape ? 3 : 2;

  const heroHeight = theme.responsive({ xs: 400, md: 500, lg: 600 });
  const moodCardWidth = theme.responsive({ xs: 140, md: 180, lg: 220 });
  const moodCardHeight = theme.responsive({ xs: 200, md: 250, lg: 290 });
  const shopCardWidth = theme.responsive({ xs: 160, md: 200, lg: 240 });
  const sectionPadding = theme.responsive({ xs: 16, md: 24, lg: 32 });
  const gridSpacing = theme.responsive({ xs: 8, md: 12, lg: 16 });

  return {
    screenWidth: theme.layout.width,
    columns,
    heroHeight,
    moodCardWidth,
    moodCardHeight,
    shopCardWidth,
    sectionPadding,
    gridSpacing,
  };
}
