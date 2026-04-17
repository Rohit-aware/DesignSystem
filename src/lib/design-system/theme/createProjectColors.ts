/**
 * @module ProjectThemeFactory
 *
 * @group Project SDK
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN SYSTEM SDK - PROJECT THEME BUILDER
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This module is the high-level entry point for creating a full theme system
 * from minimal brand inputs.
 *
 * It abstracts:
 *   • Color scale generation
 *   • Semantic mapping (light/dark)
 *   • Theme construction
 *   • Font integration
 *
 * Result:
 *   → A production-ready Theme object compatible with the DS core system
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO THINK ABOUT THIS FILE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This is NOT a utility file.
 * This is a "factory API".
 *
 * You do NOT modify internal logic in apps.
 * You only configure inputs.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * USAGE LEVELS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * LEVEL 1 (most common):
 *   createProjectTheme({ primary: "#00AEEF" }, fontConfig)
 *
 * LEVEL 2 (advanced branding):
 *   add secondary + overrides
 *
 * LEVEL 3 (system customization):
 *   override semantic colors directly
 */

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

import { createHexScale } from './generateScale';
import { lightColors, darkColors, palette } from '@ds';
import { buildTheme } from '@ds';
import type {
    SemanticColors,
    ColorPalette,
    Theme,
    ThemeMode,
    FontConfig,
} from '@ds';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectThemeInput = {
    palette?: {
        primary?: string;
        secondary?: string;
    };

    light: Partial<SemanticColors>;
    dark?: Partial<SemanticColors>;

    overrides?: Partial<SemanticColors>;

    extraColors?: Record<string, string>;
};

/**
 * @group Project SDK › Output
 *
 * Fully resolved color system used by the Theme engine.
 */
export type ProjectColors = {
    light: SemanticColors;
    dark: SemanticColors;
    palette: ColorPalette;
};

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM FACTORY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Project SDK › Factory
 *
 * Builds a complete semantic color system from minimal inputs.
 *
 * Pipeline:
 *   1. Generate color scales
 *   2. Merge with base palette
 *   3. Map to semantic roles
 *   4. Apply overrides
 *
 * @example
 * const colors = createProjectColors({
 *   primary: "#01A48F",
 * });
 */
export function createProjectColors(input: ProjectThemeInput): ProjectColors {
    const light: SemanticColors = {
        ...lightColors,
        ...input.light,
        ...input.overrides,
    };

    const dark: SemanticColors = {
        ...darkColors,
        ...input.dark,
        ...input.overrides,
    };

    return {
        light,
        dark,
        palette: {
            ...palette,
            ...(input.palette?.primary && {
                primary: createHexScale(input.palette.primary),
            }),
            ...(input.palette?.secondary && {
                secondary: createHexScale(input.palette.secondary),
            }),
            ...input.extraColors,
        },
    };
}
// ─────────────────────────────────────────────────────────────────────────────
// THEME FACTORY (SDK ENTRY POINT)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Project SDK › Factory
 *
 * Creates a production-ready Theme builder function.
 *
 * This function:
 *   • Precomputes light/dark themes
 *   • Freezes objects for immutability
 *   • Injects project colors + fonts
 *   • Eliminates runtime theme computation
 *
 * @example
 * export const buildProjectTheme =
 *   createProjectTheme({ primary: "#00AEEF" }, fontConfig);
 */
export function createProjectTheme(
    input: ProjectThemeInput,
    fontConfig: FontConfig,
): (mode: ThemeMode) => Theme {

    const colors = createProjectColors(input);

    const themes: Record<ThemeMode, Theme> = {
        light: Object.freeze({
            ...buildTheme('light', fontConfig),
            colors: colors.light,
            palette: colors.palette,
        }),
        dark: Object.freeze({
            ...buildTheme('dark', fontConfig),
            colors: colors.dark,
            palette: colors.palette,
        }),
    };

    /**
     * @group Project SDK › Runtime
     *
     * Returns precomputed theme instance (no allocations).
     */
    return (mode: ThemeMode) => themes[mode];
}