/**
 * @module ProjectThemeFactory
 *
 * @group Project SDK
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN SYSTEM SDK - PROJECT THEME BUILDER (ENHANCED)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createHexScale } from './generateScale';
import { lightColors, darkColors, palette } from '@ds';
import type {
    SemanticColors,
    ColorPalette,
    Theme,
    ThemeMode,
    FontConfig,
} from '@ds';

// ─── Enhanced Types for Flexible Configuration ────────────────────────────────

export type CustomPaletteInput = Record<string, string>;

export type ProjectColorConfig<
    TLightColors extends Partial<SemanticColors> = Partial<SemanticColors>,
    TDarkColors extends Partial<SemanticColors> = Partial<SemanticColors>,
    TCustomPalette extends CustomPaletteInput = CustomPaletteInput,
> = {
    /** Primary brand color (required) - auto generates 50-900 scale */
    primary: string;

    /** Secondary brand color (optional) - auto generates scale */
    secondary?: string;

    /** Custom palette colors - each generates its own scale */
    customPalette?: TCustomPalette;

    /** User-defined light mode semantic colors */
    lightColors: TLightColors;

    /** User-defined dark mode semantic colors */
    darkColors: TDarkColors;

    /** Overrides applied to BOTH modes (highest priority) */
    overrides?: Partial<SemanticColors>;
};

// Legacy support for simple config
export type ProjectColorInput = {
    primary: string;
    secondary?: string;
    overrides?: Partial<SemanticColors>;
};

export type ProjectColors<
    TLight = SemanticColors,
    TDark = SemanticColors,
    TPalette = ColorPalette
> = {
    light: TLight;
    dark: TDark;
    palette: TPalette;
};

// ─── Enhanced Color System Factory ────────────────────────────────────────────

/**
 * Creates a complete color system with user-defined light/dark colors
 */
export function createProjectColors<
    TLightColors extends Partial<SemanticColors>,
    TDarkColors extends Partial<SemanticColors>,
    TCustomPalette extends CustomPaletteInput,
>(
    config: ProjectColorConfig<TLightColors, TDarkColors, TCustomPalette>
): ProjectColors<
    TLightColors & SemanticColors,
    TDarkColors & SemanticColors,
    ColorPalette & { [K in keyof TCustomPalette]: ReturnType<typeof createHexScale> }
> {
    // Generate primary scale
    const primaryScale = createHexScale(config.primary);

    // Generate secondary scale
    const secondaryScale = config.secondary
        ? createHexScale(config.secondary)
        : palette.secondary;

    // Build custom scales
    const customScales = {} as Record<string, ReturnType<typeof createHexScale>>;
    if (config.customPalette) {
        for (const [key, value] of Object.entries(config.customPalette)) {
            customScales[key] = createHexScale(value);
        }
    }

    // Merge complete palette
    const projectPalette = {
        ...palette,
        primary: primaryScale,
        secondary: secondaryScale,
        ...customScales,
    };

    // Build light mode (user colors + defaults + overrides)
    const light: SemanticColors = {
        ...lightColors, // System defaults
        ...config.lightColors, // User's light mode colors
        ...config.overrides, // Global overrides
    };

    // Build dark mode (user colors + defaults + overrides)
    const dark: SemanticColors = {
        ...darkColors, // System defaults
        ...config.darkColors, // User's dark mode colors
        ...config.overrides, // Global overrides
    };

    return {
        light: light as TLightColors & SemanticColors,
        dark: dark as TDarkColors & SemanticColors,
        palette: projectPalette as any,
    };
}

// ─── Enhanced Theme Factory ───────────────────────────────────────────────────

/**
 * Creates a production-ready Theme builder with full TypeScript inference
 */
export function createProjectTheme<
    TLightColors extends Partial<SemanticColors>,
    TDarkColors extends Partial<SemanticColors>,
    TCustomPalette extends CustomPaletteInput,
>(
    config: ProjectColorConfig<TLightColors, TDarkColors, TCustomPalette>,
    fontConfig: FontConfig,
) {
    const colors = createProjectColors(config);

    type ThemeType = Theme & {
        colors: typeof colors.light;
        palette: typeof colors.palette;
    };

    // Import buildTheme dynamically to avoid circular deps
    const { buildTheme } = require('@ds') as {
        buildTheme: (mode: ThemeMode, fontConfig: FontConfig) => Omit<Theme, 'colors' | 'palette'>;
    };

    const themes: Record<ThemeMode, ThemeType> = {
        light: Object.freeze({
            ...buildTheme('light', fontConfig),
            colors: colors.light,
            palette: colors.palette,
        }) as ThemeType,
        dark: Object.freeze({
            ...buildTheme('dark', fontConfig),
            colors: colors.dark,
            palette: colors.palette,
        }) as unknown as ThemeType,
    };

    return (mode: ThemeMode): ThemeType => themes[mode];
}
