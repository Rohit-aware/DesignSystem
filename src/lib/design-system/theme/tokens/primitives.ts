import type {
  TypographyScale, FontWeightScale, LineHeightScale, LetterSpacingScale,
  SpacingScale, BorderRadiusScale, ShadowScale, ZIndexScale,
} from '../../types';

/**
 * Font size scale (px)
 */
export const typographyScale: TypographyScale = {
  /** 10px — captions, helper text */
  xs: 10,

  /** 12px — secondary text, labels */
  sm: 12,

  /** 14px — default body text */
  md: 14,

  /** 16px — emphasized body, small headings */
  lg: 16,

  /** 18px — section headings */
  xl: 18,

  /** 20px — large headings */
  '2xl': 20,

  /** 24px — title text */
  '3xl': 24,

  /** 30px — large titles */
  '4xl': 30,

  /** 36px — hero / display text */
  '5xl': 36,
};

/**
 * Font weights
 */
export const fontWeights: FontWeightScale = {
  /** 100 — ultra thin */
  thin: '100',

  /** 300 — light text */
  light: '300',

  /** 400 — default body weight */
  regular: '400',

  /** 500 — medium emphasis */
  medium: '500',

  /** 600 — semi-bold (buttons, labels) */
  semibold: '600',

  /** 700 — strong emphasis */
  bold: '700',

  /** 800 — heavy headings */
  extrabold: '800',

  /** 900 — maximum weight */
  black: '900',
};

/**
 * Line height multipliers
 */
export const lineHeights: LineHeightScale = {
  /** Tight — dense headings */
  tight: 1.1,

  /** Slightly tight */
  snug: 1.2,

  /** Default body readability */
  normal: 1.4,

  /** Comfortable reading */
  relaxed: 1.6,

  /** Very loose spacing (long content) */
  loose: 2.0,
};

/**
 * Letter spacing (tracking)
 */
export const letterSpacing: LetterSpacingScale = {
  /** Very tight (large headings) */
  tighter: -0.8,

  /** Slightly tight */
  tight: -0.4,

  /** Default */
  normal: 0,

  /** Slightly spaced (buttons, labels) */
  wide: 0.4,

  /** More spacing */
  wider: 0.8,

  /** Maximum spacing (uppercase UI text) */
  widest: 1.6,
};

/**
 * Spacing scale (px) — based on 4px grid
 */
export const spacing: SpacingScale = {
  /** 0px */
  0: 0,

  /** 2px — micro spacing */
  0.5: 2,

  /** 4px — tight spacing */
  1: 4,

  /** 6px */
  1.5: 6,

  /** 8px — default small gap */
  2: 8,

  /** 10px */
  2.5: 10,

  /** 12px */
  3: 12,

  /** 14px */
  3.5: 14,

  /** 16px — standard spacing */
  4: 16,

  /** 20px */
  5: 20,

  /** 24px */
  6: 24,

  /** 28px */
  7: 28,

  /** 32px — large spacing */
  8: 32,

  /** 36px */
  9: 36,

  /** 40px */
  10: 40,

  /** 44px */
  11: 44,

  /** 48px */
  12: 48,

  /** 56px */
  14: 56,

  /** 64px */
  16: 64,

  /** 80px */
  20: 80,

  /** 96px */
  24: 96,

  /** 112px */
  28: 112,

  /** 128px */
  32: 128,

  /** 144px */
  36: 144,

  /** 160px */
  40: 160,

  /** 192px */
  48: 192,

  /** 224px */
  56: 224,

  /** 256px */
  64: 256,

  /** 288px */
  72: 288,

  /** 320px */
  80: 320,

  /** 384px */
  96: 384,
};

/**
 * Border radius (px)
 */
export const borderRadius: BorderRadiusScale = {
  /** 0px — sharp edges */
  none: 0,

  /** 2px — subtle rounding */
  xs: 2,

  /** 4px — inputs, small elements */
  sm: 4,

  /** 8px — default (cards, buttons) */
  md: 8,

  /** 12px — medium containers */
  lg: 12,

  /** 16px — large surfaces */
  xl: 16,

  /** 20px — extra rounded */
  '2xl': 20,

  /** 24px — max rounded before circle */
  '3xl': 24,

  /** 9999px — pill / circle */
  full: 9999,
};

/**
 * Shadow tokens
 */
export const shadows: ShadowScale = {
  /** No shadow */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  /** Very subtle elevation */
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  /** Small shadow (cards) */
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  /** Default shadow */
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },

  /** Medium elevation */
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },

  /** High elevation (modals) */
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 12,
  },

  /** Maximum elevation */
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 24,
  },
};

/**
 * Z-index layers
 */
export const zIndex: ZIndexScale = {
  /** Hidden elements */
  hide: -1,

  /** Default layer */
  base: 0,

  /** Slightly elevated */
  raised: 10,

  /** Dropdown menus */
  dropdown: 100,

  /** Sticky headers */
  sticky: 200,

  /** Overlay backgrounds */
  overlay: 300,

  /** Modals/dialogs */
  modal: 400,

  /** Popovers */
  popover: 500,

  /** Toast notifications */
  toast: 600,

  /** Tooltips (top-most) */
  tooltip: 700,
};