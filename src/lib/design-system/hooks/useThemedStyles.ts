import { useMemo } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { useLayout } from '../utils/scaling';
import type { Theme, LayoutState, NamedStyles } from '../types';

/**
 * useThemedStyles — create component-scoped styles using theme + layout.
 *
 * Designed for:
 * - One-off styles inside a component
 * - Styles that depend on layout (breakpoints, orientation, etc.)
 *
 * Memoization:
 * - Recomputes ONLY when:
 *   → theme changes (e.g. light/dark switch)
 *   → layout changes (e.g. screen resize, rotation)
 *   → factory reference changes
 *
 * @param factory - Function receiving (theme, layout) → returns styles object
 *
 * @returns Memoized styles object
 *
 * @example
 * const styles = useThemedStyles((theme, layout) => ({
 *   card: {
 *     backgroundColor: theme.colors.surface,
 *     padding: layout.breakpoint === 'xs'
 *       ? theme.spacing[3]
 *       : theme.spacing[6],
 *   },
 * }));
 *
 * ⚠️ Important:
 * Define the factory inline OR memoize it.
 *
 * ❌ Bad (new function every render → breaks memoization)
 * useThemedStyles((theme) => ({ container: {} }));
 *
 * ✅ Good (stable reference)
 * const styles = useThemedStyles(factory);
 *
 * 💡 Tip:
 * For reusable styles across components, prefer `createStyles()`
 * (better caching + avoids re-creating styles per component).
 */
export function useThemedStyles<T extends NamedStyles<T>>(
  factory: (theme: Theme, layout: LayoutState) => T,
): T {
  const { theme } = useTheme();
  const layout = useLayout();

  return useMemo(() => factory(theme, layout), [theme, layout, factory]);
}

/**
 * useThemedValue — derive a single value from the theme.
 *
 * Useful when:
 * - You only need one value (not full styles)
 * - Avoids creating unnecessary style objects
 *
 * Memoization:
 * - Recomputes only when theme or selector changes
 *
 * @param selector - Function receiving theme → returns value
 *
 * @example
 * const primaryColor = useThemedValue(t => t.colors.primary);
 *
 * const spacing = useThemedValue(t => t.spacing[4]);
 *
 * ⚠️ Note:
 * Keep selector stable for optimal performance.
 */
export function useThemedValue<T>(selector: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => selector(theme), [theme, selector]);
}

/**
 * useIsDark — quick access to dark mode flag.
 *
 * @returns boolean
 *
 * @example
 * const isDark = useIsDark();
 */
export const useIsDark = (): boolean => useTheme().theme.isDark;

/**
 * useColors — access semantic color tokens.
 *
 * @example
 * const colors = useColors();
 * colors.background
 * colors.textPrimary
 */
export const useColors = (): Theme['colors'] => useTheme().theme.colors;

/**
 * useSpacing — access spacing scale.
 *
 * @example
 * const spacing = useSpacing();
 * spacing[4] // 16px
 */
export const useSpacing = (): Theme['spacing'] => useTheme().theme.spacing;

/**
 * useTypography — access typography tokens.
 *
 * @example
 * const typography = useTypography();
 * typography.scale.md
 * typography.weights.bold
 */
export const useTypography = (): Theme['typography'] => useTheme().theme.typography;

/**
 * useRadius — access border radius tokens.
 *
 * @example
 * const radius = useRadius();
 * radius.md // 8
 */
export const useRadius = (): Theme['radius'] => useTheme().theme.radius;

/**
 * useShadows — access shadow tokens.
 *
 * @example
 * const shadows = useShadows();
 * shadows.md
 */
export const useShadows = (): Theme['shadows'] => useTheme().theme.shadows;