import React from 'react';
import { Appearance } from 'react-native';
import type { Theme, ThemeMode, FontConfig } from '../types';
import { buildTheme, lightTheme } from '../theme/buildTheme';


/**
 * Theme data exposed via context.
 */
type ThemeData = {
  /** Fully resolved theme object */
  theme: Theme;

  /** Current theme mode */
  mode: ThemeMode;
};

/**
 * Theme mutation actions.
 *
 * These are stable references and do not trigger re-renders.
 */
type ThemeActions = {
  /** Set theme mode manually */
  setMode: (mode: ThemeMode) => void;

  /** Toggle between light and dark */
  toggleTheme: () => void;
};

/** Combined context value */
type ThemeContextValue = ThemeData & ThemeActions;

/**
 * Internal theme context.
 *
 * ⚠️ Do not consume directly.
 * Use {@link useTheme}.
 */
const ThemeContext = React.createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: 'light',
  setMode: () => { },
  toggleTheme: () => { },
});

/* ────────────────────────────────────────────────────────────────
   📦 Provider Props
────────────────────────────────────────────────────────────────── */

/**
 * Props for {@link ThemeProvider}.
 */
type ThemeProviderProps = {
  /** React subtree */
  children: React.ReactNode;

  /**
   * Controlled theme mode.
   *
   * Overrides internal state and disables system syncing.
   */
  mode?: ThemeMode;

  /**
   * Follow system appearance.
   *
   * @default true
   */
  followSystem?: boolean;

  /**
   * Optional font configuration.
   *
   * Used only with default builder.
   *
   * ⚠️ Keep reference stable.
   */
  fontConfig?: FontConfig;

  /**
   * Custom theme builder.
   *
   * Signature:
   * `(mode: ThemeMode) => Theme`
   *
   * @example
   * <ThemeProvider buildTheme={buildProjectTheme} />
   */
  buildTheme?: (mode: ThemeMode) => Theme;
};

/* ────────────────────────────────────────────────────────────────
   ⚡ Internal Cache
────────────────────────────────────────────────────────────────── */

/**
 * Cache of theme pairs per builder.
 *
 * @internal
 */
const builderCache = new WeakMap<
  (mode: ThemeMode) => Theme,
  Readonly<Record<ThemeMode, Theme>>
>();

/**
 * Returns cached light/dark themes for a builder.
 *
 * @internal
 */
function resolveThemePair(
  builder: (mode: ThemeMode) => Theme,
): Readonly<Record<ThemeMode, Theme>> {
  const cached = builderCache.get(builder);
  if (cached) return cached;

  const pair = Object.freeze({
    light: builder('light'),
    dark: builder('dark'),
  });

  builderCache.set(builder, pair);
  return pair;
}

/**
 * Default theme builder factory.
 *
 * Injects optional font config.
 *
 * @internal
 */
function makeDefaultBuilder(
  fontConfig?: FontConfig,
): (mode: ThemeMode) => Theme {
  return (mode: ThemeMode) => buildTheme(mode, fontConfig);
}

/* ────────────────────────────────────────────────────────────────
   🎨 ThemeProvider
────────────────────────────────────────────────────────────────── */

/**
 * Provides theme context to the React tree.
 *
 * ---
 * ### Features
 * - Light / Dark mode support
 * - System appearance syncing
 * - Theme caching (per builder)
 * - Optional font configuration
 *
 * ---
 * ### Usage
 *
 * #### Basic
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * #### With custom theme
 * ```tsx
 * <ThemeProvider buildTheme={buildProjectTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * #### Controlled mode
 * ```tsx
 * <ThemeProvider mode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * ---
 * ### Behavior
 *
 * Mode priority:
 * 1. `mode` prop
 * 2. System (if enabled)
 * 3. `'light'`
 *
 * ---
 * ### Performance
 *
 * - Themes are cached per builder
 * - Context updates only when `mode` or `theme` changes
 * - Builders must be pure
 */
export function ThemeProvider({
  children,
  mode: modeProp,
  followSystem = true,
  fontConfig,
  buildTheme: buildThemeProp,
}: ThemeProviderProps) {
  const getSystemMode = React.useCallback(
    (): ThemeMode =>
      Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
    [],
  );

  const [mode, setModeState] = React.useState<ThemeMode>(
    () => modeProp ?? (followSystem ? getSystemMode() : 'light'),
  );

  const setMode = React.useCallback(
    (next: ThemeMode) => {
      setModeState(next);
    }, []);

  const toggleTheme = React.useCallback(
    () => {
      setModeState(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

  React.useEffect(() => {
    if (modeProp !== undefined || !followSystem) return;

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setModeState(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => sub.remove();
  }, [modeProp, followSystem]);

  React.useEffect(() => {
    if (modeProp !== undefined) {
      setModeState(modeProp);
    }
  }, [modeProp]);

  const builder = React.useMemo(
    () => buildThemeProp ?? makeDefaultBuilder(fontConfig),
    [buildThemeProp, fontConfig],
  );

  const themePair = resolveThemePair(builder);
  const theme = themePair[mode];

  const value = React.useMemo(
    () => ({ theme, mode, setMode, toggleTheme }),
    [theme, mode, setMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Access the current theme and controls.
 *
 * @returns Theme + mode + actions
 *
 * @example
 * const { theme } = useTheme();
 *
 * @example
 * const { toggleTheme } = useTheme();
 *
 * @throws Error in development if used outside provider
 */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);

  if (__DEV__ && ctx === undefined) {
    throw new Error(
      '[DS] useTheme() must be used inside <ThemeProvider>',
    );
  }

  return ctx;
}

export { ThemeContext };
export type {
  ThemeProviderProps,
  ThemeContextValue,
  ThemeData,
  ThemeActions,
};