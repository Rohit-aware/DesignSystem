import type { ColorMap, FinalColors, ProjectTheme, ProjectThemeConfig, SpacingScale, RadiusScale, Shadows, ShadowScale, ColorScaleMap } from "../types";
import { defaultSpacing } from "../tokens/spacing";
import { defaultRadius } from "../tokens/radius";
import { baseLightColors, baseDarkColors } from "../tokens/colors";
import { getShadowScale } from "../shadows/shadowCache";
import { buildColorScaleMap } from "../colors/buildColorScaleMap";
import { themeCache } from "./themeCache";

export function createProjectTheme<
  TUser extends ColorMap,
  TDark extends { [K in keyof FinalColors<TUser>]: string },
  TShadowKeys extends string = never
>(
  config: ProjectThemeConfig<TUser, TDark, TShadowKeys>
): ProjectTheme<FinalColors<TUser>, TShadowKeys> {
  const cached = themeCache.get(config);
  if (cached) {
    return cached as ProjectTheme<FinalColors<TUser>, TShadowKeys>;
  }

  const spacing: SpacingScale = { ...defaultSpacing, ...config.spacing };
  const radius: RadiusScale = { ...defaultRadius, ...config.radius };

  const base: ShadowScale = getShadowScale("#000");
  const variants = {} as { [K in TShadowKeys]: ShadowScale };

  if (config.shadows !== undefined) {
    for (const key of Object.keys(config.shadows) as TShadowKeys[]) {
      const color = (config.shadows as Record<string, string>)[key];
      if (color !== undefined) {
        variants[key] = getShadowScale(color);
      }
    }
  }

  const shadows: Shadows<TShadowKeys> = { base, ...variants };

  const mergedLight = {
    ...baseLightColors,
    ...config.lightColors,
  } as Record<string, string>;

  const mergedDark = {
    ...baseDarkColors,
    ...config.darkColors,
  } as Record<string, string>;

  const lightColors = buildColorScaleMap(mergedLight) as FinalColors<TUser>;
  const darkColors = buildColorScaleMap(mergedDark) as FinalColors<TUser>;

  const light = {
    colors: lightColors,
    mode: "light" as const,
    spacing,
    radius,
    shadows,
  };

  const dark = {
    colors: darkColors,
    mode: "dark" as const,
    spacing,
    radius,
    shadows,
  };

  const result: ProjectTheme<FinalColors<TUser>, TShadowKeys> = { light, dark };
  themeCache.set(config, result as ProjectTheme<ColorScaleMap<string>>);
  return result;
}
