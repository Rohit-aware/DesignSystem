import { createContext } from "react";
import type { ColorScaleMap, Theme } from "../types";

export type ThemeContextValue<TColors extends ColorScaleMap<string>> = {
  theme: Theme<TColors>;
  mode: "light" | "dark";
  toggleTheme: () => void;
};

// Internal context stores the widest possible type at runtime.
// Typed accessors in createThemeKit restore the concrete TColors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext = createContext<ThemeContextValue<any> | null>(null);
