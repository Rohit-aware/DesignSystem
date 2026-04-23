import { useContext } from "react";
import type { StyleValue } from "../styles";
import { ThemeContext } from "./ThemeContext";
import type { ThemeContextValue } from "./ThemeContext";
import type { ColorScaleMap, Theme, ProjectTheme } from "../types";
import { makeCreateStyles, makeCreateDynamicStyles } from "../styles/createStyles";

export type ThemeKit<TTheme extends Theme<ColorScaleMap<string>>> = {
  useTheme: () => ThemeContextValue<TTheme["colors"]>;
  createStyles: <T extends Record<string, StyleValue>>(
    factory: (theme: TTheme) => T
  ) => () => T;
  createDynamicStyles: <TArgs extends readonly unknown[], T extends Record<string, StyleValue>>(
    factory: (theme: TTheme, ...args: TArgs) => T
  ) => (...args: TArgs) => T;
};

export function createThemeKit<
  TColors extends ColorScaleMap<string>,
  TShadowKeys extends string = never
>(
  _projectTheme: ProjectTheme<TColors, TShadowKeys>
): ThemeKit<Theme<TColors, TShadowKeys>> {
  type TTheme = Theme<TColors, TShadowKeys>;

  function useTypedTheme(): ThemeContextValue<TColors> {
    const ctx = useContext(ThemeContext) as ThemeContextValue<TColors> | null;
    if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
    return ctx;
  }

  function getTheme(): TTheme {
    const ctx = useContext(ThemeContext) as ThemeContextValue<TColors> | null;
    if (!ctx) throw new Error("createStyles hooks must be used inside <ThemeProvider>");
    return ctx.theme as TTheme;
  }

  return {
    useTheme: useTypedTheme,
    createStyles: makeCreateStyles<TTheme>(getTheme),
    createDynamicStyles: makeCreateDynamicStyles<TTheme>(getTheme),
  };
}

export { createThemeKit as createThemeHook };
export type { ThemeKit as BoundThemeKit };
