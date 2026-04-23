import { useContext } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import type { ColorScaleMap, Theme } from "../types";
import { ThemeContext } from "../provider/ThemeContext";

export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type StyleValue = RNStyle | ((...args: never[]) => RNStyle);

type StyleCache = WeakMap<object, Record<string, StyleValue>>;

const staticCache = new WeakMap<object, StyleCache>();
const dynamicCache = new WeakMap<object, WeakMap<object, Map<string, Record<string, StyleValue>>>>();

export function makeCreateStyles<TTheme extends Theme<ColorScaleMap<string>>>(
  getTheme: () => TTheme
) {
  return function createStyles<T extends Record<string, StyleValue>>(
    factory: (theme: TTheme) => T
  ): () => T {
    return function useStyles(): T {
      const theme = getTheme();

      let factoryMap = staticCache.get(factory as object);
      if (!factoryMap) {
        factoryMap = new WeakMap();
        staticCache.set(factory as object, factoryMap);
      }

      const cached = factoryMap.get(theme as object);
      if (cached) return cached as T;

      const styles = factory(theme);
      factoryMap.set(theme as object, styles as Record<string, StyleValue>);
      return styles;
    };
  };
}

export function makeCreateDynamicStyles<TTheme extends Theme<ColorScaleMap<string>>>(
  getTheme: () => TTheme
) {
  return function createDynamicStyles<
    TArgs extends readonly unknown[],
    T extends Record<string, StyleValue>
  >(
    factory: (theme: TTheme, ...args: TArgs) => T
  ): (...args: TArgs) => T {
    return function useDynamicStyles(...args: TArgs): T {
      const theme = getTheme();

      let factoryMap = dynamicCache.get(factory as object);
      if (!factoryMap) {
        factoryMap = new WeakMap();
        dynamicCache.set(factory as object, factoryMap);
      }

      let themeMap = factoryMap.get(theme as object);
      if (!themeMap) {
        themeMap = new Map();
        factoryMap.set(theme as object, themeMap);
      }

      const key = JSON.stringify(args);
      const cached = themeMap.get(key);
      if (cached) return cached as T;

      const styles = factory(theme, ...args);
      themeMap.set(key, styles as Record<string, StyleValue>);
      return styles;
    };
  };
}

function getThemeFromContext<TColors extends ColorScaleMap<string>>(): Theme<TColors> {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("createStyles hooks must be used inside <ThemeProvider>");
  return ctx.theme as Theme<TColors>;
}

export const createStyles = makeCreateStyles(getThemeFromContext);
export const createDynamicStyles = makeCreateDynamicStyles(getThemeFromContext);
