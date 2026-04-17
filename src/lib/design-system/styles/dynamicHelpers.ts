import { Platform } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { Theme, SpacingKey, RadiusKey, ShadowKey, ShadowToken, AnyStyle, KnownFontRoles, FontVariantConfig, } from '../types';

/**
 * ─────────────────────────────────────────────────────────────
 * Dynamic Style System (Theme DSL Layer)
 * ─────────────────────────────────────────────────────────────
 *
 * This file is a **pure style function toolkit** that converts theme tokens
 * into React Native style objects.
 *
 * Design goals:
 * - Zero logic inside components
 * - Fully theme-driven UI
 * - Composable style primitives
 * - Safe to use inside `createStyles()` (cached)
 *
 * ⚠️ All functions are PURE:
 * Same inputs → same outputs (no side effects)
 */

// ─── Spacing ──────────────────────────────────────────────────────────────────

/**
 * Padding helpers
 *
 * @returns {ViewStyle}
 * Only sets padding (no merging)
 *
 * Example:
 * p(theme, 4) → { padding: 16 }
 */
export const p = (t: Theme, k: SpacingKey): ViewStyle => ({ padding: t.spacing[k] });

export const px = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingHorizontal: t.spacing[k] });
export const py = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingVertical: t.spacing[k] });
export const pt = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingTop: t.spacing[k] });
export const pb = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingBottom: t.spacing[k] });
export const pl = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingLeft: t.spacing[k] });
export const pr = (t: Theme, k: SpacingKey): ViewStyle => ({ paddingRight: t.spacing[k] });

/**
 * Margin helpers
 *
 * ⚠️ Uses theme spacing scale (NOT raw numbers)
 */
export const m = (t: Theme, k: SpacingKey): ViewStyle => ({ margin: t.spacing[k] });
export const mx = (t: Theme, k: SpacingKey): ViewStyle => ({ marginHorizontal: t.spacing[k] });
export const my = (t: Theme, k: SpacingKey): ViewStyle => ({ marginVertical: t.spacing[k] });
export const mt = (t: Theme, k: SpacingKey): ViewStyle => ({ marginTop: t.spacing[k] });
export const mb = (t: Theme, k: SpacingKey): ViewStyle => ({ marginBottom: t.spacing[k] });
export const ml = (t: Theme, k: SpacingKey): ViewStyle => ({ marginLeft: t.spacing[k] });
export const mr = (t: Theme, k: SpacingKey): ViewStyle => ({ marginRight: t.spacing[k] });

/**
 * Layout spacing helpers (RN 0.71+ gap support)
 *
 * ⚠️ Not supported on older RN versions
 */
export const gap = (t: Theme, k: SpacingKey): ViewStyle => ({ gap: t.spacing[k] });
export const gapX = (t: Theme, k: SpacingKey): ViewStyle => ({ columnGap: t.spacing[k] });
export const gapY = (t: Theme, k: SpacingKey): ViewStyle => ({ rowGap: t.spacing[k] });

// ─── Composite spacing helpers ────────────────────────────────────────────────

/**
 * Padding shorthand
 *
 * @param v vertical padding
 * @param h horizontal padding (optional)
 */
export function padding(t: Theme, v: SpacingKey, h?: SpacingKey): ViewStyle {
  return h !== undefined
    ? { paddingVertical: t.spacing[v], paddingHorizontal: t.spacing[h] }
    : { padding: t.spacing[v] };
}

/**
 * Margin shorthand
 */
export function margin(t: Theme, v: SpacingKey, h?: SpacingKey): ViewStyle {
  return h !== undefined
    ? { marginVertical: t.spacing[v], marginHorizontal: t.spacing[h] }
    : { margin: t.spacing[v] };
}

// ─── Border Radius ────────────────────────────────────────────────────────────

/**
 * Border radius helpers
 *
 * ⚠️ Values come from theme.radius scale (px-based)
 */
export const rounded = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderRadius: t.radius[k],
});

export const roundedTL = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderTopLeftRadius: t.radius[k],
  borderTopRightRadius: t.radius[k],
});

export const roundedB = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderBottomLeftRadius: t.radius[k],
  borderBottomRightRadius: t.radius[k],
});

export const roundedL = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderTopLeftRadius: t.radius[k],
  borderBottomLeftRadius: t.radius[k],
});

export const roundedR = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderTopRightRadius: t.radius[k],
  borderBottomRightRadius: t.radius[k],
});

export const roundedTR = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderTopRightRadius: t.radius[k]
});
export const roundedBL = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderBottomLeftRadius: t.radius[k]
});
export const roundedBR = (t: Theme, k: RadiusKey): ViewStyle => ({
  borderBottomRightRadius: t.radius[k]
});


// ─── Shadow ───────────────────────────────────────────────────────────────────

/**
 * Shadow token accessor
 *
 * ⚠️ Returns full ShadowToken (not style object)
 * Use `merge()` or manual mapping when applying to ViewStyle
 */
export const shadow = (t: Theme, k: ShadowKey): ShadowToken => t.shadows[k];

// ─── Background & Color ───────────────────────────────────────────────────────

/**
 * Background color helper
 */
export const bg = (t: Theme, k: keyof Theme['colors']): ViewStyle => ({
  backgroundColor: t.colors[k] as string,
});

/**
 * Text color helper
 */
export const color = (t: Theme, k: keyof Theme['colors']): TextStyle => ({
  color: t.colors[k] as string,
});

// ─── Typography ───────────────────────────────────────────────────────────────

/**
 * Font size from theme scale
 */
export const fSize = (
  t: Theme,
  k: keyof Theme['typography']['scale'],
): TextStyle => ({
  fontSize: t.typography.scale[k],
});

/**
 * Font weight from theme tokens
 */
export const fWeight = (
  t: Theme,
  k: keyof Theme['typography']['weights'],
): TextStyle => ({
  fontWeight: t.typography.weights[k],
});

/**
 * Font family resolver
 *
 * ⚠️ Falls back safely to `regular` variant if missing
 */
export const fFamily = (
  t: Theme,
  k: keyof Theme['typography']['families'],
  variant: keyof FontVariantConfig = 'regular',
): TextStyle => ({
  fontFamily:
    (t.typography.families[k] as any)?.[variant] ??
    (t.typography.families[k] as any)?.regular,
});

/**
 * Composite typography helper
 *
 * Replaces static typography presets (e.g. TextXLBold)
 */
export function textStyle(
  t: Theme,
  size: keyof Theme['typography']['scale'],
  variant: keyof FontVariantConfig = 'regular',
  colorKey: keyof Theme['colors'] = 'textPrimary',
  familyRole: KnownFontRoles = 'body',
): TextStyle {
  return {
    fontSize: t.typography.scale[size],
    fontFamily:
      t.typography.families[familyRole]?.[variant] ??
      t.typography.families[familyRole]?.regular,
    fontWeight:
      t.typography.weights[variant as keyof Theme['typography']['weights']] ??
      t.typography.weights.regular,
    color: t.colors[colorKey],
  };
}

/**
 * Line height helper (computed)
 *
 * finalLineHeight = fontSize × multiplier
 */
export function lHeight(
  t: Theme,
  sizeKey: keyof Theme['typography']['scale'],
  heightKey: keyof Theme['typography']['lineHeights'],
): TextStyle {
  return {
    lineHeight: t.typography.scale[sizeKey] * t.typography.lineHeights[heightKey],
  };
}

// ─── Border ───────────────────────────────────────────────────────────────────

export const border = (
  t: Theme,
  k: keyof Theme['colors'],
  width = 1,
): ViewStyle => ({
  borderWidth: width,
  borderColor: t.colors[k] as string,
});

export const borderT = (t: Theme, k: keyof Theme['colors'], w = 1): ViewStyle => ({
  borderTopWidth: w,
  borderTopColor: t.colors[k] as string,
});

export const borderB = (t: Theme, k: keyof Theme['colors'], w = 1): ViewStyle => ({
  borderBottomWidth: w,
  borderBottomColor: t.colors[k] as string,
});

// ─── Dimensions ───────────────────────────────────────────────────────────────

/**
 * Size helper
 *
 * @example
 * sz(100) → { width: 100, height: 100 }
 * sz('50%') → responsive size
 */
export const sz = (
  w: number | `${number}%`,
  h?: number | `${number}%`,
): ViewStyle => ({
  width: w,
  height: h ?? w,
});

export const minSz = (w: number, h?: number): ViewStyle => ({
  minWidth: w,
  minHeight: h ?? w,
});

export const maxSz = (w: number, h?: number): ViewStyle => ({
  maxWidth: w,
  maxHeight: h ?? w,
});

export const opacity = (v: number): ViewStyle => ({ opacity: v });

// ─── Platform helpers ─────────────────────────────────────────────────────────

/**
 * iOS-only style injection
 */
export function ios<T extends ViewStyle | TextStyle>(s: T): T | Record<string, never> {
  return Platform.OS === 'ios' ? s : {};
}

/**
 * Android-only style injection
 */
export function android<T extends ViewStyle | TextStyle>(s: T): T | Record<string, never> {
  return Platform.OS === 'android' ? s : {};
}

/**
 * Cross-platform conditional styles
 */
export function platform<T extends ViewStyle | TextStyle>(opts: {
  ios?: Partial<T>;
  android?: Partial<T>;
  default?: Partial<T>;
}): Partial<T> {
  return (
    (Platform.OS === 'ios' ? opts.ios : undefined) ??
    (Platform.OS === 'android' ? opts.android : undefined) ??
    opts.default ??
    {}
  ) as Partial<T>;
}

// ─── Merge utility ────────────────────────────────────────────────────────────

/**
 * merge — combines multiple style objects into one.
 *
 * Use when helpers return multiple style properties.
 *
 * ⚠️ Creates a new object (1 allocation only).
 * Safe for use inside createStyles() due to caching.
 */
export function merge(...styles: AnyStyle[]): AnyStyle {
  return Object.assign({}, ...styles) as AnyStyle;
}