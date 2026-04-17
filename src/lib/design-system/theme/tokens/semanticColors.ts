import type { SemanticColors } from '../../types';
import { palette } from './colors';

/**
 * Light theme semantic color tokens.
 *
 * These tokens define the visual language for light mode UI.
 * They map raw palette values into meaningful UI roles.
 *
 * ── DESIGN PRINCIPLES ─────────────────────────────────────────
 * - High contrast for readability
 * - Subtle surface layering
 * - Soft elevation using light grays
 *
 * ── USAGE MODEL ───────────────────────────────────────────────
 * Use semantic tokens instead of raw palette values:
 *   ❌ palette.neutral[900]
 *   ✅ theme.colors.textPrimary
 *
 * ── COLOR ROLES ───────────────────────────────────────────────
 * background        → main app background
 * surface           → card / container background
 * surfaceElevated   → elevated UI (modals, overlays)
 * overlay           → scrim for modals / dialogs
 *
 * textPrimary       → main readable text
 * textSecondary     → supporting text
 * textTertiary      → subtle text / metadata
 * textDisabled      → inactive UI text
 * textInverse       → text on dark backgrounds
 * textLink          → interactive links
 *
 * border            → default borders
 * borderStrong      → emphasized borders
 * borderFocus       → focused input / accessibility outline
 *
 * interactive       → primary interactive elements (buttons)
 * interactiveHover  → hover state (web) / elevated touch state
 * interactivePressed→ active/pressed state
 * interactiveDisabled→ disabled UI state
 *
 * success/warning/error/info
 * → semantic feedback colors for system states
 */
export const lightColors: SemanticColors = {
  background: palette.neutral[50],
  backgroundSecondary: palette.neutral[100],
  backgroundTertiary: palette.neutral[200],
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.5)',
  textPrimary: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textTertiary: palette.neutral[400],
  textDisabled: palette.neutral[300],
  textInverse: '#FFFFFF',
  textLink: palette.primary[600],
  border: palette.neutral[200],
  borderStrong: palette.neutral[400],
  borderFocus: palette.primary[500],
  interactive: palette.primary[600],
  interactiveHover: palette.primary[700],
  interactivePressed: palette.primary[800],
  interactiveDisabled: palette.neutral[300],
  success: palette.success[600],
  successSubtle: palette.success[50],
  warning: palette.warning[600],
  warningSubtle: palette.warning[50],
  error: palette.error[600],
  errorSubtle: palette.error[50],
  info: palette.info[600],
  infoSubtle: palette.info[50],
};

/**
 * Dark theme semantic color tokens.
 *
 * Designed for low-light environments with reduced eye strain.
 * Maintains contrast while preserving visual hierarchy.
 *
 * ── DESIGN PRINCIPLES ─────────────────────────────────────────
 * - Reduced luminance backgrounds
 * - Elevated surfaces instead of flat layering
 * - Softer semantic colors to prevent glare
 *
 * ── USAGE MODEL ───────────────────────────────────────────────
 * Same semantic API as light theme — only values differ:
 *   theme.colors.textPrimary
 *   theme.colors.surface
 *   theme.colors.interactive
 *
 * ── KEY DIFFERENCES FROM LIGHT MODE ───────────────────────────
 * - background uses deep neutral base
 * - surfaces are elevated via lighter dark grays
 * - borders are more subtle but still visible
 * - interactive colors are slightly desaturated
 * - success/warning/error use softened opacity variants
 */
export const darkColors: SemanticColors = {
  background: palette.neutral[900],
  backgroundSecondary: palette.neutral[800],
  backgroundTertiary: palette.neutral[700],
  surface: palette.neutral[800],
  surfaceElevated: palette.neutral[700],
  overlay: 'rgba(0,0,0,0.7)',
  textPrimary: palette.neutral[50],
  textSecondary: palette.neutral[400],
  textTertiary: palette.neutral[500],
  textDisabled: palette.neutral[600],
  textInverse: palette.neutral[900],
  textLink: palette.primary[400],
  border: palette.neutral[700],
  borderStrong: palette.neutral[500],
  borderFocus: palette.primary[400],
  interactive: palette.primary[500],
  interactiveHover: palette.primary[400],
  interactivePressed: palette.primary[300],
  interactiveDisabled: palette.neutral[600],
  success: palette.success[400],
  successSubtle: 'rgba(34,197,94,0.12)',
  warning: palette.warning[400],
  warningSubtle: 'rgba(245,158,11,0.12)',
  error: palette.error[400],
  errorSubtle: 'rgba(244,63,94,0.12)',
  info: palette.info[400],
  infoSubtle: 'rgba(14,165,233,0.12)',
};