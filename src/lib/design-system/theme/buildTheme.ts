import type { Theme, ThemeMode, FontConfig } from '../types';
import { palette } from './tokens/colors';
import { lightColors, darkColors } from './tokens/semanticColors';
import {
  typographyScale, fontWeights, lineHeights,
  letterSpacing, spacing, borderRadius, shadows, zIndex,
} from './tokens/primitives';
import { resolveFamilies, systemFontConfig } from './fonts/fontConfig';
import { Appearance } from 'react-native';

/**
 * Builds a complete Theme object from design tokens.
 *
 * Characteristics:
 * - Pure function (no side effects)
 * - Deterministic (same input → same output)
 * - Fully immutable (deep frozen at top level)
 *
 * Composition:
 * - Semantic colors (light/dark)
 * - Primitive tokens (spacing, radius, shadows, etc.)
 * - Typography (including resolved font families)
 *
 * @param mode - Theme mode ('light' | 'dark')
 * @param fontConfig - Optional custom font configuration
 *
 * @returns Frozen Theme object
 *
 * @example
 * const theme = buildTheme('light');
 *
 * @example
 * const theme = buildTheme('dark', customFontConfig);
 *
 * ⚠️ Note:
 * Prefer using `getTheme()` instead of calling this directly in most cases,
 * as prebuilt singletons are already available.
 */
export function buildTheme(mode: ThemeMode, fontConfig?: FontConfig): Theme {
  const fc = fontConfig ?? systemFontConfig;

  return Object.freeze({
    /** Current theme mode */
    mode,

    /** Boolean flag for quick checks */
    isDark: mode === 'dark',

    /** Semantic color tokens (context-aware) */
    colors: mode === 'dark' ? darkColors : lightColors,

    /** Raw color palette (non-semantic) */
    palette,

    /** Typography system */
    typography: Object.freeze({
      /** Font sizes */
      scale: typographyScale,

      /** Font weights */
      weights: fontWeights,

      /** Line heights */
      lineHeights,

      /** Letter spacing */
      letterSpacing,

      /**
       * Resolved font families with variants
       *
       * Example:
       * theme.typography.families.body.bold
       */
      families: resolveFamilies(fc),
    }),

    /** Spacing scale (margin, padding, gap) */
    spacing,

    /** Border radius tokens */
    radius: borderRadius,

    /** Shadow tokens (cross-platform) */
    shadows,

    /** Z-index layering system */
    zIndex,
  });
}

// ─── Singleton instances ──────────────────────────────────────────────────────
// These are created ONCE and reused across the app.
//
// Benefits:
// - Referential equality (important for memoization)
// - Zero runtime cost after initialization
// - Works seamlessly with WeakMap-based style caching

/**
 * Prebuilt light theme (singleton).
 *
 * Use this instead of calling buildTheme('light') repeatedly.
 */
export const lightTheme: Theme = buildTheme('light');

/**
 * Prebuilt dark theme (singleton).
 *
 * Use this instead of calling buildTheme('dark') repeatedly.
 */
export const darkTheme: Theme = buildTheme('dark');

/**
 * Returns the prebuilt theme singleton for a given mode.
 *
 * Use this:
 * - Outside React components
 * - In style factories
 * - In services / navigation configs
 *
 * @param mode - 'light' | 'dark'
 *
 * @returns Theme singleton (stable reference)
 *
 * @example
 * const theme = getTheme('light');
 * const styles = myStyles.getStyles(theme);
 *
 * 💡 Tip:
 * Store the theme once instead of calling repeatedly.
 */
export function getTheme(mode: ThemeMode): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

/**
 * Returns the current system theme based on OS appearance.
 *
 * Uses React Native's Appearance API to detect:
 * - Light mode
 * - Dark mode
 *
 * Use this:
 * - Outside React (non-hook environments)
 * - Navigation configs
 * - Background services
 *
 * @returns Theme singleton (lightTheme or darkTheme)
 *
 * @example
 * const theme = getCurrentTheme();
 *
 * ⚠️ Note:
 * This does NOT subscribe to changes.
 * For reactive updates, use Appearance listeners or a theme provider.
 */
export function getCurrentTheme(): Theme {
  const scheme = Appearance.getColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}