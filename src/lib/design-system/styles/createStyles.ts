import React, { useContext, useMemo } from 'react';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeContext } from '../providers/ThemeProvider';
import type { Theme, ResolvedStyles } from '../types';

// ─── Core types ───────────────────────────────────────────────────────────────

/**
 * Any valid React Native style object
 */
export type AnyStyle = ViewStyle | TextStyle | ImageStyle;

/**
 * Style function with arbitrary arguments
 *
 * ⚠️ Note:
 * Arguments are intentionally `any[]` to allow flexible dynamic styles
 * (e.g. variants, states, flags).
 */
export type StyleFn = (...args: any[]) => AnyStyle;

/**
 * A style entry can be:
 * - static style object
 * - dynamic function returning a style object
 */
export type StyleEntry = AnyStyle | StyleFn;

/**
 * Typed styles object returned by `createStyles`
 */
export type NamedStyles<T> = { [P in keyof T]: StyleEntry };

/**
 * Internal return type of createStyles factory
 */
export type RetrunTypeOfCreateStyle =
  Record<string, AnyStyle | ((...args: any[]) => AnyStyle)>;

function wrapStyleFn(fn: StyleFn) {
  const cache = new Map<string, AnyStyle>();

  return (...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) return cache.get(key)!;

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
// ─── createStyles - Cached Theme Style Factory ────────────────────────────────

/**
 * createStyles — theme-aware style factory with memoized caching.
 *
 * Designed for:
 * - reusable style modules
 * - high-performance style creation
 * - consistent theming across app
 *
 * ─────────────────────────────────────────────────────────────
 * 🔥 Caching behavior
 * ─────────────────────────────────────────────────────────────
 * Uses WeakMap<Theme, StylesObject>:
 *
 * - Same Theme reference → returns cached styles
 * - New Theme instance → recomputes styles
 *
 * ⚠️ IMPORTANT:
 * Cache depends on **theme object identity**, not deep equality.
 * Do NOT mutate theme objects.
 *
 * ─────────────────────────────────────────────────────────────
 * 💡 Performance model
 * ─────────────────────────────────────────────────────────────
 * - Factory runs once per Theme instance
 * - No recomputation on re-renders
 * - Safe for large style trees
 *
 * ─────────────────────────────────────────────────────────────
 * @example
 * const styles = createStyles(theme => ({
 *   container: {
 *     backgroundColor: theme.colors.surface,
 *   },
 * }));
 */
export function createStyles<T extends RetrunTypeOfCreateStyle>(
  factory: (theme: Theme) => T,
): {
  useStyles: () => T;
  getStyles: (theme: Theme) => T;
} {
  /**
   * Cache is scoped per module instance.
   * One cache per style file.
   */
  const cache = new WeakMap<Theme, T>();

  /**
   * Returns cached or newly created styles for a theme
   */
  function getStyles(theme: Theme): T {
    const cached = cache.get(theme);
    if (cached) return cached;
    const styles = factory(theme);

    const wrapped = {} as T;

    for (const key in styles) {
      const value = styles[key];

      if (typeof value === 'function') {
        wrapped[key] = wrapStyleFn(value as StyleFn) as any;
      } else {
        wrapped[key] = value as any;
      }
    }

    return Object.freeze(wrapped);
  }
  /**
   * Hook version — reactive to theme changes
   *
   * Recomputes only when theme reference changes.
   */
  function useStyles(): T {
    const { theme } = useContext(ThemeContext);
    return getStyles(theme);
  }
  return { useStyles, getStyles };
}

// ─── withTheme HOC ───────────────────────────────────────────────────────────

/**
 * withTheme — injects theme as a prop into class components or HOCs.
 *
 * Use cases:
 * - legacy class components
 * - third-party components that cannot use hooks
 *
 * @example
 * class MyComponent extends React.Component<{ theme: Theme }> {}
 * export default withTheme(MyComponent);
 *
 * ─────────────────────────────────────────────────────────────
 * ⚠️ Note:
 * This does NOT subscribe to layout changes separately.
 * Only theme updates trigger re-render.
 */
export function withTheme<P extends { theme: Theme }>(
  Component: React.ComponentType<P>,
): React.ComponentType<Omit<P, 'theme'>> {
  const Wrapped = (props: Omit<P, 'theme'>) => {
    const { theme } = useContext(ThemeContext);

    return React.createElement(Component, {
      ...(props as P),
      theme,
    });
  };

  Wrapped.displayName = `withTheme(${Component.displayName ?? Component.name ?? 'Component'
    })`;

  return Wrapped;
}