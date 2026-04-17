import type { ViewStyle, TextStyle } from 'react-native';

/**
 * ─────────────────────────────────────────────────────────────
 * Static Style Primitives (Zero-runtime cost system)
 * ─────────────────────────────────────────────────────────────
 *
 * These are **precomputed immutable style objects** created once
 * at module initialization.
 *
 * Design goals:
 * - No runtime allocation
 * - No theme dependency
 * - Fully tree-shakeable
 * - Safe for direct spread into `StyleSheet` or `createStyles`
 *
 * ⚠️ IMPORTANT:
 * These are NOT dynamic styles.
 * Do NOT inject theme values here.
 *
 * ─────────────────────────────────────────────────────────────
 * Why `satisfies` is used instead of `as ViewStyle`
 * ─────────────────────────────────────────────────────────────
 *
 * ✔ Ensures every property is valid ViewStyle/TextStyle
 * ✔ Preserves literal types for IntelliSense
 * ✔ Prevents silent type-casting bugs
 * ✔ Enables autocomplete like:
 *     flex.one → { flex: 1 }
 *
 * ❌ `as ViewStyle`:
 *   - disables type checking
 *   - hides invalid values
 *
 * ✔ `satisfies`:
 *   - validates structure
 *   - preserves inference
 *   - keeps DX intact
 */

// ─── Flex utilities ──────────────────────────────────────────────────────────

/**
 * Flexbox shorthand utilities
 *
 * All values are static (no calculations)
 */
export const flex = Object.freeze({
  one: { flex: 1 },
  zero: { flex: 0 },
  two: { flex: 2 },
  shrink: { flexShrink: 1 },
  grow: { flexGrow: 1 },
  wrap: { flexWrap: 'wrap' },
} satisfies Record<string, ViewStyle>);

/**
 * Basic layout direction helpers
 */
export const row: ViewStyle = Object.freeze({ flexDirection: 'row' });
export const column: ViewStyle = Object.freeze({ flexDirection: 'column' });

// ─── Layout composition presets ───────────────────────────────────────────────

/**
 * Prebuilt flex layout patterns
 *
 * ⚠️ These are opinionated UI shortcuts:
 * - rowCenter → horizontal + vertical center alignment
 * - rowBetween → space-between layout
 * - rowEvenly → evenly distributed children
 */
export const layout = Object.freeze({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  rowReverse: { flexDirection: 'row-reverse' },
  colReverse: { flexDirection: 'column-reverse' },

  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowAround: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  rowEvenly: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },

  rowEnd: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  rowStart: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },

  rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
} satisfies Record<string, ViewStyle>);

// ─── Alignment utilities ──────────────────────────────────────────────────────

/**
 * Alignment helpers for flex containers and items
 */
export const align = Object.freeze({
  center: { alignItems: 'center' },
  start: { alignItems: 'flex-start' },
  end: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
  baseline: { alignItems: 'baseline' },

  selfCenter: { alignSelf: 'center' },
  selfStart: { alignSelf: 'flex-start' },
  selfEnd: { alignSelf: 'flex-end' },
  selfStretch: { alignSelf: 'stretch' },
} satisfies Record<string, ViewStyle>);

// ─── Justification utilities ─────────────────────────────────────────────────

/**
 * Main-axis alignment helpers (justifyContent)
 */
export const justify = Object.freeze({
  center: { justifyContent: 'center' },
  start: { justifyContent: 'flex-start' },
  end: { justifyContent: 'flex-end' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
} satisfies Record<string, ViewStyle>);

// ─── Center helpers ──────────────────────────────────────────────────────────

/**
 * Perfect center alignment (horizontal + vertical)
 */
export const center: ViewStyle = Object.freeze({
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Full flex center container
 *
 * ⚠️ Uses flex: 1 → takes full available space
 */
export const centerFlex: ViewStyle = Object.freeze({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

// ─── Position utilities ──────────────────────────────────────────────────────

/**
 * Absolute/relative positioning shortcuts
 *
 * ⚠️ `fill` variants assume parent has defined dimensions
 */
export const position = Object.freeze({
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },

  fill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  fillTop: { position: 'absolute', top: 0, left: 0, right: 0 },
  fillBot: { position: 'absolute', bottom: 0, left: 0, right: 0 },
} satisfies Record<string, ViewStyle>);

// ─── Overflow utilities ──────────────────────────────────────────────────────

/**
 * Overflow behavior helpers
 */
export const overflow = Object.freeze({
  hidden: { overflow: 'hidden' },
  visible: { overflow: 'visible' },
} satisfies Record<string, ViewStyle>);

// ─── Text utilities ──────────────────────────────────────────────────────────

/**
 * Text alignment and transformation helpers
 */
export const text = Object.freeze({
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  justify: { textAlign: 'justify' },

  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
} satisfies Record<string, TextStyle>);

// ─── Dimension utilities ─────────────────────────────────────────────────────

/**
 * Size shortcuts for width/height
 *
 * ⚠️ `square` uses aspectRatio — requires width or height constraint
 */
export const dimensions = Object.freeze({
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  fullScreen: { width: '100%', height: '100%' },
  square: { aspectRatio: 1 },
} satisfies Record<string, ViewStyle>);