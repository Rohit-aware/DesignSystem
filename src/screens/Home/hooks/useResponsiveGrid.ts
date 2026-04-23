import { useTheme } from "@/theme";

export type GridConfig = {
  columns: number;
  spacing: number;
  bannerHeight: number;
  sectionPadding: number;
  screenWidth: number;
  promoBannerHeight: number;
};

export function useResponsiveGrid(): GridConfig {
  const { theme } = useTheme();
  const { deviceForm, isFolded } = theme.layout;

  const columns =
    deviceForm === "tablet" && !isFolded ? 3
      : deviceForm === "tablet" && isFolded ? 2
        : theme.layout.width >= 768 ? 4
          : 2;

  return {
    columns,
    spacing: theme.responsive({ xs: 8, md: 12, lg: 16 }),
    bannerHeight: theme.responsive({ xs: 300, md: 350, lg: 400 }),
    promoBannerHeight: theme.responsive({ xs: 200, md: 250, lg: 300 }),
    sectionPadding: theme.responsive({ xs: 16, md: 20, lg: 28 }),
    screenWidth: theme.layout.width,
  };
}
