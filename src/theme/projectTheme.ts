// projectTheme.ts

import { createFontConfig, createProjectTheme } from '@ds';

/* ────────────────────────────────────────────────────────────────
   🔤 FONT CONFIGURATION
────────────────────────────────────────────────────────────────── */

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
   🎨 ENHANCED THEME CONFIGURATION
   Now with full control over light/dark modes
────────────────────────────────────────────────────────────────── */

export const buildProjectTheme = createProjectTheme(
  {
    primary: '#01A48F',
    secondary: '#1F6CDF',

    // Custom palette with auto-generated scales
    customPalette: {
      accent: '#FF6B6B',
      brandSecondary: '#4ECDC4',
      // Now accessible as theme.palette.accent[500]
    },

    // LIGHT MODE - Full control
    lightColors: {
      background: '#FAFAFA',
      backgroundSecondary: '#F5F5F5',
      backgroundTertiary: '#EEEEEE',
      surface: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',

      textPrimary: '#231F20',
      textSecondary: '#5A5758',
      textTertiary: '#918F8F',
      textDisabled: '#C4C4C4',
      textInverse: '#FFFFFF',
      textLink: '#01A48F',

      border: '#EAE3E3',
      borderStrong: '#D0C9C9',
      borderFocus: '#01A48F',

      interactive: '#01A48F',
      interactiveHover: '#018F7C',
      interactivePressed: '#017A69',
      interactiveDisabled: '#E0E0E0',

      success: '#01A841',
      successSubtle: '#E6F7EC',
      warning: '#FFA726',
      warningSubtle: '#FFF3E0',
      error: '#D20A0A',
      errorSubtle: '#FDE8E8',
      info: '#1F6CDF',
      infoSubtle: '#E8F0FE',
    },

    // DARK MODE - Full control
    darkColors: {
      background: '#121212',
      backgroundSecondary: '#1E1E1E',
      backgroundTertiary: '#2C2C2C',
      surface: '#1E1E1E',
      surfaceElevated: '#2C2C2C',
      overlay: 'rgba(0, 0, 0, 0.7)',

      textPrimary: '#FFFFFF',
      textSecondary: '#B0B0B0',
      textTertiary: '#808080',
      textDisabled: '#4A4A4A',
      textInverse: '#121212',
      textLink: '#01A48F',

      border: '#2C2C2C',
      borderStrong: '#404040',
      borderFocus: '#01A48F',

      interactive: '#01A48F',
      interactiveHover: '#02B3A0',
      interactivePressed: '#01C4B1',
      interactiveDisabled: '#3A3A3A',

      success: '#02C852',
      successSubtle: '#0A2E1A',
      warning: '#FFB74D',
      warningSubtle: '#3A2A10',
      error: '#F44336',
      errorSubtle: '#3A1010',
      info: '#4285F4',
      infoSubtle: '#102A4A',
    },

    // Global overrides (applied to BOTH modes)
    overrides: {
      // Example: Force same error color in both modes
      // error: '#D20A0A',
    },

  },
  projectFontConfig,
);

// Export theme type for use in components
export type AppTheme = ReturnType<typeof buildProjectTheme>;