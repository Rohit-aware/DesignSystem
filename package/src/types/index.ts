import type { ViewStyle } from "react-native";
import type { LayoutInfo, ResponsiveValue, A11yInfo } from "../utils";
import type { BaseColors } from "../tokens/colors";
import type { ColorMap, ColorScaleMap } from "../colors/types";

export type { ColorMap, ColorScaleMap };

export type ShadowStyle = Pick<
  ViewStyle,
  "shadowColor" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "elevation"
>;

export type ShadowToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type ShadowScale = Record<ShadowToken, ShadowStyle>;

export type Shadows<TShadowKeys extends string = never> = {
  base: ShadowScale;
} & { [K in TShadowKeys]: ShadowScale };

export type SpacingScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type RadiusScale = {
  none: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
};

export type FinalColorKeys<TUser extends ColorMap> =
  | keyof Omit<BaseColors, keyof TUser>
  | keyof TUser;

export type FinalColors<TUser extends ColorMap> = ColorScaleMap<
  Extract<FinalColorKeys<TUser>, string>
>;

export type Theme<TColors extends ColorScaleMap<string>, TShadowKeys extends string = never> = {
  colors: TColors;
  mode: "light" | "dark";
  spacing: SpacingScale;
  radius: RadiusScale;
  shadows: Shadows<TShadowKeys>;
  layout: LayoutInfo;
  accessibility: A11yInfo;
  responsive: (values: ResponsiveValue<number>) => number;
};

export type ProjectThemeConfig<
  TUser extends ColorMap,
  TDark extends { [K in keyof FinalColors<TUser>]: string },
  TShadowKeys extends string = never
> = {
  lightColors?: Partial<BaseColors> & TUser;
  darkColors?: TDark;
  spacing?: Partial<SpacingScale>;
  radius?: Partial<RadiusScale>;
  shadows?: Record<TShadowKeys, string>;
};

export type ProjectTheme<
  TColors extends ColorScaleMap<string>,
  TShadowKeys extends string = never
> = {
  light: Omit<Theme<TColors, TShadowKeys>, "layout" | "accessibility" | "responsive">;
  dark: Omit<Theme<TColors, TShadowKeys>, "layout" | "accessibility" | "responsive">;
};
