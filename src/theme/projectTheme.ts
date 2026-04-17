import { createFontConfig, setActiveFontConfig, createProjectTheme } from '@ds';

/* ────────────────────────────────────────────────────────────────
   🎨 PROJECT THEME CONFIGURATION
   ────────────────────────────────────────────────────────────────
   This file is the ONLY project-specific entrypoint for:
   - Fonts
   - Brand colors
   - Semantic overrides
   - Theme initialization

   💡 Design Principle:
   → Core design system is reusable
   → This file defines “brand identity layer”

   ⚠️ Lifecycle Rule:
   - Fonts MUST be activated BEFORE React mounts (index.js / main entry)
   - Theme factory is safe to pass into <ThemeProvider />
────────────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────────
   🔤 STEP 1 — FONT SYSTEM CONFIGURATION
────────────────────────────────────────────────────────────────── */

/**
 * Project font configuration
 *
 * Roles:
 * - display → headings, hero text
 * - body    → paragraphs, UI text
 * - mono    → code / technical content
 *
 * ⚠️ IMPORTANT:
 * Variant keys MUST match actual font file names (without .ttf extension)
 *
 * Example:
 *   Inter-SemiBold.ttf → 'Inter-SemiBold'
 *
 * Setup:
 * Run once after adding fonts:
 *   npx react-native-asset
 */
export const projectFontConfig = createFontConfig(
  {
    display: 'Inter',
    body: 'Inter',
    mono: 'HindMadurai',
  },
  {
    Inter: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    HindMadurai: {
      regular: 'HindMadurai-Regular',
      medium: 'HindMadurai-Medium',
      semibold: 'HindMadurai-SemiBold',
      bold: 'HindMadurai-Bold',
    },
  },
);

/* ────────────────────────────────────────────────────────────────
   🎨 STEP 2 — BRAND COLOR SYSTEM
────────────────────────────────────────────────────────────────── */

/**
 * Theme builder for the project.
 *
 * Input model:
 * - primary   → main brand color (buttons, focus, links)
 * - secondary → optional accent color
 * - overrides → direct semantic overrides (highest priority)
 *
 * Color system behavior:
 * - primary/secondary automatically generate 50–900 scales
 * - semantic tokens inherit from design system defaults
 * - overrides apply last (final authority layer)
 *
 * ⚠️ Override rule:
 * Only use overrides for truly brand-specific deviations.
 */
export const buildProjectTheme = createProjectTheme(
  {
    primary: '#01A48F',
    secondary: '#1F6CDF',
    overrides: {
      textPrimary: '#231F20',
      textSecondary: '#5A5758',
      textTertiary: '#918F8F',
      border: '#EAE3E3',
      background: '#FAFAFA',
      backgroundSecondary: '#F5F5F5',
      surface: '#FFFFFF',
      error: '#D20A0A',
      success: '#01A841',
      warning: '#FFA726',
    },
  },
  projectFontConfig,
);

/* ────────────────────────────────────────────────────────────────
   ⚡ STEP 3 — FONT ACTIVATION (APP BOOTSTRAP ONLY)
────────────────────────────────────────────────────────────────── */

/**
 * Activates font configuration globally.
 *
 * WHY THIS EXISTS:
 * - Theme system resolves font families at runtime
 * - Font config must be set BEFORE first render
 *
 * ⚠️ CRITICAL RULE:
 * Call this ONLY in entry file (index.js / main.tsx)
 *
 * ❌ NEVER call inside React components
 * ❌ NEVER call after app mount
 *
 * Correct usage:
 *   import { activateFonts } from './theme/projectTheme';
 *   activateFonts();
 *   AppRegistry.registerComponent(...)
 */
export function activateFonts(): void {
  setActiveFontConfig(projectFontConfig);
}