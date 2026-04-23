import { useContext } from "react";
import type { ColorScaleMap, Theme } from "../../types";
import { ThemeContext } from "../ThemeContext";
import type { ThemeContextValue } from "../ThemeContext";

export function useTheme<TColors extends ColorScaleMap<string>>(): ThemeContextValue<TColors> {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return (ctx as ThemeContextValue<TColors>);
}

export function useThemeFromContext<TColors extends ColorScaleMap<string>>(): Theme<TColors> {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("Must be used inside <ThemeProvider>");
  return ctx.theme as Theme<TColors>;
}
