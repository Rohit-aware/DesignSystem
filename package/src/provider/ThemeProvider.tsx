import React, { useMemo } from "react";
import type { ColorScaleMap, ProjectTheme } from "../types";
import type { ThemeContextValue } from "./ThemeContext";
import { ThemeContext } from "./ThemeContext";
import { useThemeMode } from "./hooks/useThemeMode";
import { useLayoutState } from "./hooks/useLayoutState";
import { useAccessibilityState } from "./hooks/useAccessibilityState";
import { useComposedTheme } from "./hooks/useComposedTheme";

export type ThemeProviderProps<TColors extends ColorScaleMap<string>> = {
  projectTheme: ProjectTheme<TColors>;
  initialMode?: "light" | "dark";
  followSystem?: boolean;
  children: React.ReactNode;
};

export function ThemeProvider<TColors extends ColorScaleMap<string>>({
  projectTheme,
  initialMode,
  followSystem = false,
  children,
}: ThemeProviderProps<TColors>): React.ReactElement {
  const { mode, toggleTheme } = useThemeMode(initialMode, followSystem);
  const layout = useLayoutState();
  const a11ySnapshot = useAccessibilityState();

  const baseTheme = mode === "dark" ? projectTheme.dark : projectTheme.light;
  const theme = useComposedTheme<TColors>(baseTheme, layout, a11ySnapshot);

  const value = useMemo<ThemeContextValue<TColors>>(
    () => ({ theme, mode, toggleTheme }),
    [theme, mode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
