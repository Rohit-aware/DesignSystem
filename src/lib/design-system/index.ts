/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 🧩 RN DESIGN SYSTEM — PUBLIC SDK SURFACE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This is the SINGLE entry point for all consumers of the design system.
 *
 * ❌ NEVER import from internal modules:
 *    import { colors } from '@/design-system/theme/tokens'
 *
 * ✅ ALWAYS import from this file:
 *    import { useTheme, createStyles, bg } from '@/design-system'
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 DESIGN PHILOSOPHY
 *
 * This SDK is structured as a layered system:
 *
 *   1. 🧱 Types Layer
 *      → Strong contracts for Theme, Layout, Styles, Fonts
 *
 *   2. 🎨 Tokens Layer
 *      → Raw design primitives (colors, spacing, radius, typography)
 *
 *   3. 🎭 Theme Engine
 *      → Builds runtime Theme objects (light/dark + project overrides)
 *
 *   4. ⚛️ React Runtime Layer
 *      → Provider + hooks (theme reactivity system)
 *
 *   5. 🎨 Styling API Layer
 *      → Static + dynamic style composition utilities
 *
 *   6. 📐 Layout & Responsive Engine
 *      → Breakpoints, scaling, device detection
 *
 *   7. ♿ Accessibility & Platform Layer
 *      → RTL, reduced motion, platform-specific helpers
 *
 *   8. 🧪 Advanced SDK Extensions
 *      → Project theming + scale generation
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */


/* ─────────────────────────────────────────────────────────────────────────────
   🧱 1. TYPES — CORE CONTRACTS
   (Static type system for the entire SDK)
───────────────────────────────────────────────────────────────────────────── */

export type {
  Theme,
  ThemeMode,

  SemanticColors,
  ColorPalette,
  ColorScale,

  FontConfig,
  FontFamilyConfig,
  FontVariantConfig,
  ResolvedFontFamilies,

  SpacingKey,
  SpacingScale,

  RadiusKey,
  BorderRadiusScale,

  ShadowKey,
  ShadowScale,
  ShadowToken,

  TypographyScale,
  FontWeightScale,
  LineHeightScale,
  LetterSpacingScale,
  ZIndexScale,

  NamedStyles,
  AnyStyle,
  StyleFactory,
  StyleCreator,

  Breakpoint,
  DeviceForm,
  LayoutState,
} from './types';


/* ─────────────────────────────────────────────────────────────────────────────
   🎨 2. DESIGN TOKENS — PRIMITIVE VISUAL SYSTEM
   (Raw values, framework-agnostic)
───────────────────────────────────────────────────────────────────────────── */

export { palette } from './theme/tokens/colors';

export {
  lightColors,
  darkColors,
} from './theme/tokens/semanticColors';

export {
  typographyScale,
  fontWeights,
  lineHeights,
  letterSpacing,
  spacing,
  borderRadius,
  shadows,
  zIndex,
} from './theme/tokens/primitives';


/* ─────────────────────────────────────────────────────────────────────────────
   🎭 3. THEME ENGINE — RUNTIME DESIGN SYSTEM
   (Transforms tokens → usable Theme objects)
───────────────────────────────────────────────────────────────────────────── */

export {
  buildTheme,
  lightTheme,
  darkTheme,
  getTheme,
  getCurrentTheme,
} from './theme/buildTheme';


/* ─────────────────────────────────────────────────────────────────────────────
   🔤 4. FONT SYSTEM — TYPOGRAPHY ENGINE
   (Font resolution + variant mapping)
───────────────────────────────────────────────────────────────────────────── */

export {
  systemFontConfig,
  interFontConfig,
  createFontConfig,
  resolveFontFamily,
  resolveFamilies,
} from './theme/fonts/fontConfig';


/* ─────────────────────────────────────────────────────────────────────────────
   ⚛️ 5. REACT RUNTIME — CONTEXT + HOOKS
   (Theme reactivity system)
───────────────────────────────────────────────────────────────────────────── */

export {
  ThemeProvider,
  useTheme,
} from './providers/ThemeProvider';


/* ─────────────────────────────────────────────────────────────────────────────
   🎨 6. STYLING SDK — COMPOSITION API
   (Core developer-facing styling system)
───────────────────────────────────────────────────────────────────────────── */

/**
 * STATIC STYLE PRIMITIVES
 * → Zero-cost constants (no theme dependency)
 * → Safe to use anywhere
 */
export { flex, row, column, layout, align, justify, center, centerFlex, position, overflow, text, dimensions } from './styles/staticHelpers';


/**
 * DYNAMIC STYLE SYSTEM
 * → Theme-aware helpers
 * → Intended for createStyles() usage
 */
export {
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  gap, gapX, gapY,
  padding, margin,

  rounded,
  roundedB,
  roundedL,
  roundedR,
  roundedTL,
  roundedTR,
  roundedBL,
  roundedBR,

  shadow,
  bg,
  color,
  fSize,
  fWeight,
  fFamily,
  lHeight,
  textStyle,

  border,
  borderT,
  borderB,

  sz,
  minSz,
  maxSz,
  opacity,

  ios,
  android,
  platform,
  merge,
} from './styles/dynamicHelpers';


/**
 * STYLE FACTORY CORE
 * → Typed + cached style creation system
 */
export {
  createStyles,
  withTheme,
} from './styles/createStyles';


/* ─────────────────────────────────────────────────────────────────────────────
   📐 7. LAYOUT ENGINE — RESPONSIVE SYSTEM
   (Device, breakpoint, scaling logic)
───────────────────────────────────────────────────────────────────────────── */

export {
  getLayoutState,
  scaleW,
  scaleH,
  moderateScale,
  hairline,
  dpToPx,

  responsive,
  useLayout,
  useBreakpoint,
  useResponsive,
} from './utils/scaling';

export type { ResponsiveValues } from './utils/scaling';


/* ─────────────────────────────────────────────────────────────────────────────
   ♿ 8. ACCESSIBILITY + PLATFORM SYSTEM
   (RTL, motion preferences, OS helpers)
───────────────────────────────────────────────────────────────────────────── */

export {
  isRTL,
  rtlStyle,
  dir,
  clampedFont,

  useReduceMotion,
  useBoldText,

  durations,
  easings,
  animDuration,
} from './utils/accessibility';


/* ─────────────────────────────────────────────────────────────────────────────
   🪝 9. CONVENIENCE HOOKS — HIGH-LEVEL API
   (Developer shortcuts for common theme access)
───────────────────────────────────────────────────────────────────────────── */

export {
  useThemedStyles,
  useThemedValue,

  useIsDark,
  useColors,
  useSpacing,
  useTypography,
  useRadius,
  useShadows,
} from './hooks/useThemedStyles';


/* ─────────────────────────────────────────────────────────────────────────────
   🧪 10. ADVANCED SDK EXTENSIONS — OPTIONAL LAYER
   (Used for project-level customization)
───────────────────────────────────────────────────────────────────────────── */

export { createHexScale, generateScales } from './theme/generateScale';
export { createProjectColors, createProjectTheme } from './theme/createProjectColors';