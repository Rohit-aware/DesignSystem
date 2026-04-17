import type { TextStyle, ViewStyle, ImageStyle } from 'react-native';

/**
 * Represents a single style value.
 *
 * ⚠️ Important:
 * Currently this only supports plain style objects.
 *
 * If you want to support dynamic styles (functions),
 * this type must be updated to include function signatures.
 *
 * Example:
 * {
 *   container: { padding: 16 }
 * }
 */
export type StyleValue = ViewStyle & TextStyle & ImageStyle;

/**
 * Maps style keys to style definitions.
 *
 * Used as the base constraint for style factories.
 *
 * Example:
 * {
 *   container: { ... },
 *   title: { ... }
 * }
 */
export type NamedStyles<T> = { [P in keyof T]: AnyStyle };

// ─── Color Tokens ─────────────────────────────────────────────────────────────

/**
 * Allowed opacity steps for color scales.
 *
 * Example usage:
 * color.primary[50] → 50% opacity variant
 */
export type OpacityStep =
  | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50
  | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;

/**
 * Represents a color with opacity variants.
 *
 * Example:
 * primary: {
 *   100: '#FF0000',
 *   50: 'rgba(...)'
 * }
 */
export type ColorScale = string & {
  [K in OpacityStep]: string;
};

/**
 * Full color palette (raw colors, not semantic).
 */
export type BasePalette = {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
};

export type ColorPalette = BasePalette & Record<string, ColorScale>;

/**
 * Semantic color system (context-aware usage).
 *
 * These should be used instead of raw palette values.
 *
 * Example:
 * background → screen background
 * textPrimary → main text color
 */
export type SemanticColors = {
  /** App background */
  background: string;

  primary: string;
  secondary: string;
  /** Secondary background (cards, sections) */
  backgroundSecondary: string;

  /** Tertiary background (subtle layers) */
  backgroundTertiary: string;

  /** Surface (cards, sheets) */
  surface: string;

  /** Elevated surfaces (modals, overlays) */
  surfaceElevated: string;

  /** Overlay background (modals, backdrops) */
  overlay: string;

  /** Primary text */
  textPrimary: string;

  /** Secondary text */
  textSecondary: string;

  /** Tertiary / muted text */
  textTertiary: string;

  /** Disabled text */
  textDisabled: string;

  /** Inverse text (dark on light / light on dark) */
  textInverse: string;

  /** Links */
  textLink: string;

  /** Default border */
  border: string;

  /** Strong border */
  borderStrong: string;

  /** Focus state border */
  borderFocus: string;

  /** Primary interactive color */
  interactive: string;

  /** Hover state */
  interactiveHover: string;

  /** Pressed state */
  interactivePressed: string;

  /** Disabled state */
  interactiveDisabled: string;

  /** Success color */
  success: string;

  /** Subtle success background */
  successSubtle: string;

  /** Warning color */
  warning: string;

  /** Subtle warning background */
  warningSubtle: string;

  /** Error color */
  error: string;

  /** Subtle error background */
  errorSubtle: string;

  /** Info color */
  info: string;

  /** Subtle info background */
  infoSubtle: string;
};

// ─── Typography Tokens ────────────────────────────────────────────────────────

/**
 * Font size scale (px)
 */
export type TypographyScale = {
  /** 10px — captions */
  xs: number;

  /** 12px — labels */
  sm: number;

  /** 14px — body (default) */
  md: number;

  /** 16px — emphasized body */
  lg: number;

  /** 18px — headings */
  xl: number;

  /** 20px — large headings */
  '2xl': number;

  /** 24px — titles */
  '3xl': number;

  /** 30px — large titles */
  '4xl': number;

  /** 36px — hero text */
  '5xl': number;
};

/**
 * Font weight tokens
 */
export type FontWeightScale = {
  thin: TextStyle['fontWeight'];
  light: TextStyle['fontWeight'];
  regular: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semibold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
  extrabold: TextStyle['fontWeight'];
  black: TextStyle['fontWeight'];
};

/**
 * Line height multipliers (relative to font size)
 */
export type LineHeightScale = {
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
};

/**
 * Letter spacing values
 */
export type LetterSpacingScale = {
  tighter: number;
  tight: number;
  normal: number;
  wide: number;
  wider: number;
  widest: number;
};

/**
 * Font family roles
 *
 * Can be extended with custom roles (e.g. brand, headingAlt)
 */
export type FontFamilyConfig<
  F extends Record<string, string> = Record<string, string>
> = {
  display: string;
  body: string;
  mono: string;
} & F;

/**
 * Defines available font variants for a family.
 *
 * Example:
 * {
 *   regular: 'Inter-Regular',
 *   bold: 'Inter-Bold'
 * }
 */
export type FontVariantConfig = {
  thin?: string;
  light?: string;
  regular: string;
  medium?: string;
  semibold?: string;
  bold?: string;
  extrabold?: string;
  black?: string;
  regularItalic?: string;
  boldItalic?: string;
};

/**
 * Complete font configuration
 */
export type FontConfig<
  F extends Record<string, string> = Record<string, string>,
  V extends Record<string, FontVariantConfig> = Record<string, FontVariantConfig>,
> = {
  families: FontFamilyConfig<F>;
  variants: V;
};

/**
 * Fully resolved font families (used in Theme)
 *
 * Example:
 * theme.typography.families.body.bold
 */
export type ResolvedFontFamilies = {
  display: FontVariantConfig;
  body: FontVariantConfig;
  mono: FontVariantConfig;
} & Record<string, FontVariantConfig>;

/**
 * Known built-in font roles
 */
export type KnownFontRoles = 'display' | 'body' | 'mono';

// ─── Spacing / Layout Tokens ──────────────────────────────────────────────────

/**
 * Spacing keys based on 4px grid system
 */
export type SpacingKey =
  | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8
  | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40
  | 48 | 56 | 64 | 72 | 80 | 96;

/**
 * Spacing scale mapping
 */
export type SpacingScale = Record<SpacingKey, number>;

/**
 * Border radius keys
 */
export type RadiusKey =
  | 'none' | 'xs' | 'sm' | 'md'
  | 'lg' | 'xl' | '2xl' | '3xl'
  | 'full';

/**
 * Border radius scale (px)
 */
export type BorderRadiusScale = Record<RadiusKey, number>;

/**
 * Shadow definition (cross-platform)
 */
export type ShadowToken = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

/**
 * Shadow scale keys
 */
export type ShadowKey = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Shadow scale mapping
 */
export type ShadowScale = Record<ShadowKey, ShadowToken>;

/**
 * Z-index layering system
 */
export type ZIndexScale = {
  hide: number;
  base: number;
  raised: number;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  toast: number;
  tooltip: number;
};

// ─── Full Theme ───────────────────────────────────────────────────────────────

/**
 * Supported theme modes
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Complete Theme object
 *
 * This is the central object passed across the styling system.
 */
export type Theme = Readonly<{
  mode: ThemeMode;
  isDark: boolean;
  colors: SemanticColors;
  palette: ColorPalette;

  typography: Readonly<{
    scale: TypographyScale;
    weights: FontWeightScale;
    lineHeights: LineHeightScale;
    letterSpacing: LetterSpacingScale;
    families: ResolvedFontFamilies;
  }>;

  spacing: SpacingScale;
  radius: BorderRadiusScale;
  shadows: ShadowScale;
  zIndex: ZIndexScale;
}>;

// ─── Style System Types ───────────────────────────────────────────────────────

/**
 * Any valid React Native style
 */
export type AnyStyle = ViewStyle | TextStyle | ImageStyle;

/**
 * Style factory function
 *
 * Receives theme → returns styles
 *
 * Example:
 * const styles = (theme) => ({
 *   container: { backgroundColor: theme.colors.background }
 * })
 */
export type StyleFactory<T extends NamedStyles<T>> = (theme: Theme) => T;

/**
 * Style creator output
 *
 * Provides:
 * - useStyles → inside components (reactive)
 * - getStyles → outside components
 */
export type StyleCreator<T extends NamedStyles<T>> = {
  /** React hook (subscribes to theme changes) */
  useStyles: () => T;

  /** Static usage (manual theme) */
  getStyles: (theme: Theme) => T;
};

// ─── Responsive Types ─────────────────────────────────────────────────────────

/**
 * Breakpoints (screen sizes)
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Device categories
 */
export type DeviceForm = 'phone' | 'tablet' | 'foldable' | 'desktop';

/**
 * Layout state (responsive info)
 */
export type LayoutState = {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
  isLandscape: boolean;
  breakpoint: Breakpoint;
  deviceForm: DeviceForm;
  isFolded: boolean;
};

/**
 * Resolves style return types
 *
 * Enables:
 * - styles.container → object
 * - styles.variant(isActive) → function call
 */
export type ResolvedStyles<T extends NamedStyles<T>> = {
  [K in keyof T]: T[K] extends (...args: infer A) => StyleValue
  ? (...args: A) => StyleValue
  : StyleValue;
};