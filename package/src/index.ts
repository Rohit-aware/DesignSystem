export { createProjectTheme, baseLightColors, baseDarkColors } from "./theme";
export type {
  ColorMap,
  FinalColors,
  Theme,
  ProjectTheme,
  ProjectThemeConfig,
  SpacingScale,
  RadiusScale,
  ShadowStyle,
  ShadowScale,
  ShadowToken,
  Shadows,
} from "./theme";
export type { BaseColors } from "./theme";

export { ThemeProvider } from "./provider";
export type { ThemeProviderProps } from "./provider";

export { ThemeContext } from "./provider";
export type { ThemeContextValue } from "./provider";

export { createThemeKit, createThemeHook } from "./provider";
export type { ThemeKit, BoundThemeKit } from "./provider";

export { useTheme, useThemeMode, useLayoutState, useAccessibilityState, useComposedTheme } from "./provider";
export type { ThemeModeResult } from "./provider";

export { createStyles, createDynamicStyles } from "./styles";
export type { RNStyle, StyleValue } from "./styles";

export { createFontConfig } from "./fonts";
export type {
  FontFamiliesConfig,
  FontFamilyConfig,
  FontSizeConfig,
  FontConfigInput,
  FontStyles,
  FontStyleValue,
  FontVariantInput,
  FontVariantObject,
  NormalizedVariant,
  StaticFontKey,
  DynamicFontKey,
  DynamicFontFn,
  FontWeight,
  FontStyle,
} from "./fonts";

export { buildLayoutInfo, resolveResponsive, buildAccessibilityInfo, readAccessibilitySnapshot, platform } from "./utils";
export type {
  Breakpoint,
  DeviceForm,
  LayoutInfo,
  ResponsiveValue,
  A11yInfo,
  AccessibilitySnapshot,
} from "./utils";

export { buildColorScaleMap } from "./colors";
