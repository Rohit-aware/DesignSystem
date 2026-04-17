import React from 'react';
import { Appearance } from 'react-native';
import type { Theme, ThemeMode, FontConfig } from '../types';
import { buildTheme, lightTheme } from '../theme/buildTheme';

// ─── Context shape (split: data vs actions to minimise re-renders) ────────────

/**
 * Theme state exposed via context
 */
type ThemeData = {
  /** Current resolved theme object */
  theme: Theme;

  /** Current theme mode */
  mode: ThemeMode;
};

/**
 * Theme actions exposed via context
 */
type ThemeActions = {
  /** Manually set theme mode */
  setMode: (mode: ThemeMode) => void;

  /** Toggle between light and dark */
  toggleTheme: () => void;
};

/**
 * Full context value (data + actions)
 */
type ThemeContextValue = ThemeData & ThemeActions;

/**
 * Internal React context for theming
 *
 * ⚠️ Do not use directly — use `useTheme()` hook instead
 */
const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: 'light',
  setMode: () => { },
  toggleTheme: () => { },
});

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * ThemeProvider — supplies theme context to the app.
 *
 * Supports:
 * - Light / Dark mode
 * - System theme following
 * - Controlled mode (via prop)
 * - Font configuration overrides
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * @example (controlled mode)
 * <ThemeProvider mode="dark">
 *   <App />
 * </ThemeProvider>
 *
 * @example (custom fonts)
 * <ThemeProvider fontConfig={interFontConfig}>
 *   <App />
 * </ThemeProvider>
 */
type ThemeProviderProps = {
  children: React.ReactNode;

  /**
   * Controlled mode.
   *
   * If provided:
   * - Overrides internal state
   * - Disables system following
   */
  mode?: ThemeMode;

  /**
   * Follow system appearance (default: true)
   *
   * Only applies when `mode` is NOT provided.
   */
  followSystem?: boolean;

  /**
   * Override font configuration for this subtree
   */
  fontConfig?: FontConfig;

  /**
   * Custom theme builder (advanced use)
   *
   * Allows full override of theme creation logic
   */
  buildTheme?: (mode: ThemeMode, fontConfig?: FontConfig) => Theme;
};

/**
 * ThemeProvider implementation
 */
export function ThemeProvider({
  children,
  mode: modeProp,
  followSystem = true,
  fontConfig,
  buildTheme: buildThemeProp,
}: ThemeProviderProps) {
  /**
   * Reads current system theme (light/dark)
   */
  const getSystemMode = (): ThemeMode =>
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

  /**
   * Internal mode state
   *
   * Priority:
   * 1. Controlled prop (modeProp)
   * 2. System theme (if followSystem = true)
   * 3. Fallback → light
   */
  const [mode, setModeState] = React.useState<ThemeMode>(
    modeProp ?? (followSystem ? getSystemMode() : 'light'),
  );

  /**
   * Sync with system theme changes (uncontrolled mode only)
   */
  React.useEffect(() => {
    if (modeProp !== undefined || !followSystem) return;

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setModeState(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => sub.remove();
  }, [modeProp, followSystem]);

  /**
   * Sync controlled mode prop → internal state
   */
  React.useEffect(() => {
    if (modeProp !== undefined) {
      setModeState(modeProp);
    }
  }, [modeProp]);

  /**
   * Set theme mode manually
   */
  const setMode = React.useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  /**
   * Toggle light ↔ dark
   */
  const toggleTheme = React.useCallback(() => {
    setModeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  /**
   * Theme instance
   *
   * Recomputes ONLY when:
   * - mode changes
   * - fontConfig reference changes
   * - buildTheme function changes
   *
   * ⚠️ Important:
   * Keep `fontConfig` reference stable to avoid unnecessary recomputation.
   */
  const theme = React.useMemo(
    () => (buildThemeProp ?? buildTheme)(mode, fontConfig),
    [mode, fontConfig, buildThemeProp]
  );

  /**
   * Memoized context value
   *
   * Prevents unnecessary re-renders in consumers
   */
  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, mode, setMode, toggleTheme }),
    [theme, mode, setMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─── Primary hook ─────────────────────────────────────────────────────────────

/**
 * useTheme — access theme + actions
 *
 * Returns:
 * - theme → full theme object
 * - mode → current mode
 * - setMode → manually set mode
 * - toggleTheme → switch modes
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 *
 * @example
 * const { theme } = useTheme();
 * theme.colors.background
 *
 * ⚠️ Must be used inside <ThemeProvider>
 */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);

  if (__DEV__ && !ctx) {
    throw new Error('useTheme() must be called inside <ThemeProvider>');
  }

  return ctx;
}

export { ThemeContext };