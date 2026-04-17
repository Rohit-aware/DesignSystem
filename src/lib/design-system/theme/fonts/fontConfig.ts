import type { FontConfig, FontFamilyConfig, FontVariantConfig, ResolvedFontFamilies } from '../../types';

// ─── Font Configuration System ────────────────────────────────────────────────
//
// Centralized font system that supports:
// - Multiple font families (display, body, mono, etc.)
// - Multiple font weights per family
// - Runtime switching (theme/branding)
//
// Designed for scalability:
// → Add new font configs without modifying existing logic
// → Swap fonts globally via setActiveFontConfig()

/**
 * Default system font configuration.
 *
 * Uses platform-native fonts (no loading required).
 *
 * Use this:
 * - As a fallback
 * - For performance-critical environments
 * - During development (before custom fonts load)
 */
export const systemFontConfig: FontConfig = {
  families: {
    /** Used for headings / display text */
    display: 'System',

    /** Used for body text (default) */
    body: 'System',

    /** Used for code / monospace content */
    mono: 'Courier',
  },
  variants: {
    /** System font only supports regular weight mapping here */
    System: { regular: 'System' },

    /** Basic monospace fallback */
    Courier: { regular: 'Courier' },
  },
};

/**
 * Inter (UI) + JetBrains Mono (code) font configuration.
 *
 * ⚠️ Important:
 * Fonts must be loaded BEFORE using this config.
 *
 * Example (Expo):
 * await Font.loadAsync({
 *   'Inter-Regular':  require('...'),
 *   'Inter-Medium':   require('...'),
 *   'Inter-SemiBold': require('...'),
 *   'Inter-Bold':     require('...'),
 * });
 *
 * Use this:
 * - For modern UI apps
 * - When consistent typography across platforms is required
 */
export const interFontConfig: FontConfig = {
  families: {
    /** Headings */
    display: 'Inter',

    /** Default body text */
    body: 'Inter',

    /** Code blocks / monospace */
    mono: 'JetBrainsMono',
  },
  variants: {
    /**
     * Inter font weight mappings
     *
     * Maps semantic weights → actual font file names
     */
    Inter: {
      thin: 'Inter-Thin',
      light: 'Inter-Light',
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
      extrabold: 'Inter-ExtraBold',
      black: 'Inter-Black',
    },

    /**
     * JetBrains Mono variants
     */
    JetBrainsMono: {
      regular: 'JetBrainsMono-Regular',
      bold: 'JetBrainsMono-Bold',
    },
  },
};

/**
 * Factory to create a custom font configuration.
 *
 * Allows full customization of:
 * - Font families (display, body, mono, etc.)
 * - Weight-to-file mappings
 *
 * Example:
 * const brandFont = createFontConfig(
 *   { display: 'Playfair', body: 'Nunito', mono: 'FiraCode' },
 *   {
 *     Playfair: { regular: 'PlayfairDisplay-Regular', bold: 'PlayfairDisplay-Bold' },
 *     Nunito:   { regular: 'Nunito-Regular', bold: 'Nunito-Bold' },
 *     FiraCode: { regular: 'FiraCode-Regular' },
 *   }
 * );
 *
 * Use this:
 * - For white-label apps
 * - Multi-brand systems
 * - Dynamic theming
 */
export function createFontConfig(
  families: FontFamilyConfig,
  variants: FontConfig['variants'],
): FontConfig {
  return { families, variants };
}

/**
 * Resolves the actual font family string for a given:
 * - Family role (display, body, mono, etc.)
 * - Font weight (regular, bold, etc.)
 *
 * Fallback order:
 * 1. Exact weight match
 * 2. `regular` variant
 * 3. Raw family name
 *
 * Example:
 * resolveFontFamily(config, 'body', 'bold')
 * → "Inter-Bold"
 *
 * resolveFontFamily(config, 'body', 'extrabold')
 * → falls back to "Inter-Regular" if not defined
 *
 * Use this:
 * - Inside style generators
 * - When applying fontFamily dynamically
 */
export function resolveFontFamily(
  config: FontConfig,
  familyKey: string,
  weight: keyof NonNullable<FontConfig['variants'][string]> = 'regular',
): string {
  const familyName = config.families[familyKey] ?? config.families.body;
  const variantMap = config.variants[familyName];

  if (!variantMap) return familyName;

  return (variantMap as Record<string, string | undefined>)[weight as string]
    ?? variantMap.regular
    ?? familyName;
}

// ─── Resolve families to variant maps ─────────────────────────────────────────

/**
 * Converts font config into a fully resolved structure:
 *
 * Output:
 * {
 *   body: { regular: 'Inter-Regular', bold: 'Inter-Bold', ... },
 *   display: { ... },
 *   mono: { ... }
 * }
 *
 * Ensures:
 * - Every family has at least a `regular` variant
 * - Missing configs fallback safely
 *
 * Use this:
 * - When exposing fonts to theme (e.g. theme.typography.families)
 * - For autocomplete-friendly access:
 *   theme.typography.families.body.bold
 */
export function resolveFamilies(config: FontConfig): ResolvedFontFamilies {
  const result: Record<string, FontVariantConfig> = {};

  for (const [key, familyName] of Object.entries(config.families)) {
    result[key] = config.variants[familyName] ?? { regular: familyName };
  }

  return result as ResolvedFontFamilies;
};