/**
 * StyleShowcase.styles.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT A JUNIOR LEARNS HERE:
 *   1. createStyles — define ALL styles outside the component, never inside
 *   2. merge()      — group multi-property helpers, one spread per block
 *   3. Direct t.*   — single-property values written as plain RN properties
 *   4. Conditional  — functions inside createStyles replace inline ternaries
 *   5. WeakMap cache — factory runs at most twice (light + dark), never more
 * ─────────────────────────────────────────────────────────────────────────────
 */
import {
  createStyles, merge, textStyle
} from '@ds';
import {
  border, borderB, rounded,
  px, py, pt, pb, gap, flex, layout, align, center,
} from '@ds';

export const showcaseStyles = createStyles((t) => {
  // ── Destructure once — factory runs at most twice (light+dark), cached ────
  const { colors, spacing, radius, shadows, typography, palette } = t;
  const { scale, weights, families, lineHeights } = typography;

  return {
    utilLable: {
      ...merge(textStyle(t, 'sm', 'bold', 'primary'))
    },
    // ─── Layout ───────────────────────────────────────────────────────────────
    // LEARN: flex.one from staticHelpers — frozen constant, zero allocation
    screen: {
      ...merge(flex.one),
      backgroundColor: colors.background,

    },
    scroll: {
      ...merge(flex.one),
    },
    scrollContent: (hasTabletPad: boolean) => ({
      paddingBottom: spacing[16],
      paddingHorizontal: hasTabletPad ? spacing[8] : 0,
    }),

    // ─── Section wrapper ──────────────────────────────────────────────────────
    section: {
      ...merge(px(t, 5)),
      marginBottom: spacing[8],
    },
    sectionLabel: {
      fontSize: scale.xs,
      fontWeight: weights.semibold,
      color: colors.textTertiary,
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      marginBottom: spacing[4],
      fontFamily: families.body.semibold,
    },
    divider: {
      height: 0.5,
      backgroundColor: colors.border,
      ...merge(mx(t, 5)),
      marginBottom: spacing[8],
    },

    // ─── Header ───────────────────────────────────────────────────────────────
    // LEARN: layout.rowBetween is a frozen multi-prop object → needs merge()
    //        single props like fontSize go directly — no helper needed
    header: {
      ...merge(px(t, 5), pt(t, 4), pb(t, 6)),
      backgroundColor: colors.surface,
      ...merge(borderB(t, 'border')),
      marginBottom: spacing[6],
    },
    headerTop: {
      ...merge(layout.rowBetween, align.center),
      marginBottom: spacing[2],
    },
    headerTitle: {
      ...textStyle(t, '3xl', 'bold', 'textPrimary', 'display'),
      letterSpacing: -0.5,
    },
    headerSub: {
      ...textStyle(t, 'sm', 'regular', 'textTertiary', 'body'),
      marginTop: spacing[1],
    },
    themeToggle: {
      ...merge(border(t, 'border'), rounded(t, 'full')),
      ...merge(px(t, 3), py(t, 1.5)),
    },
    themeToggleText: {
      fontSize: scale.xs,
      fontWeight: weights.medium,
      color: colors.textSecondary,
    },

    // ─── Color palette row ────────────────────────────────────────────────────
    colorRow: {
      ...merge(layout.row, gap(t, 2)),
      flexWrap: 'wrap',
    },
    colorSwatch: {
      width: 48,
      height: 48,
      borderRadius: radius.md,
    },
    colorSwatchLabel: {
      fontSize: scale.xs,
      color: colors.textTertiary,
      marginTop: spacing[1],
      fontFamily: families.mono.regular,
      textAlign: 'center',
    },
    colorSwatchWrap: {
      ...merge(align.center),
      width: 50,
    },

    // ─── Typography showcase ──────────────────────────────────────────────────
    // LEARN: every font property comes from t.typography — no hardcoded values
    typoRow: {
      marginBottom: spacing[3],
      ...merge(borderB(t, 'border')),
      paddingBottom: spacing[3],
    },
    typoMeta: {
      ...textStyle(t, 'xs', 'regular', 'textTertiary', 'mono'),
      marginBottom: spacing[1],
    },
    typo5xl: { ...merge(textStyle(t, '5xl', 'medium', 'info', 'body')) },
    typo4xl: { ...merge(textStyle(t, '4xl', 'bold', 'textPrimary', 'display')) },
    typo3xl: { ...merge(textStyle(t, '3xl', 'semibold', 'textPrimary', 'display')) },
    typo2xl: { ...merge(textStyle(t, '2xl', 'semibold', 'textPrimary', 'body')) },
    typoXl: { ...merge(textStyle(t, 'xl', 'medium', 'textPrimary', 'body')) },
    typoLg: { ...merge(textStyle(t, 'lg', 'regular', 'textPrimary', 'body')) },
    typoMd: { ...merge(textStyle(t, 'md', 'regular', 'textSecondary', 'body')) },
    typoSm: { ...merge(textStyle(t, 'sm', 'regular', 'textTertiary', 'body')) },
    typoXs: { ...merge(textStyle(t, 'xs', 'regular', 'textTertiary', 'mono')) },

    // ─── Spacing showcase ─────────────────────────────────────────────────────
    spacingRow: {
      ...merge(layout.rowCenter, gap(t, 3)),
      marginBottom: spacing[2],
      flexWrap: 'wrap',
    },
    spacingBlock: {
      ...merge(align.center, gap(t, 1)),
    },
    spacingBar: {
      backgroundColor: colors.textPrimary,
      borderRadius: radius.xs,
      height: 8,
    },
    spacingValue: {
      fontSize: scale.xs,
      color: colors.textTertiary,
      fontFamily: families.mono.regular,
    },

    // ─── Shadow showcase ──────────────────────────────────────────────────────
    shadowRow: {
      ...merge(layout.row, gap(t, 4)),
      flexWrap: 'wrap',
    },
    shadowCard: {
      ...merge(center, rounded(t, 'lg')),
      width: 72,
      height: 72,
      backgroundColor: colors.surface,
    },
    shadowLabel: {
      fontSize: scale.xs,
      color: colors.textTertiary,
      marginTop: spacing[2],
      textAlign: 'center',
    },
    shadowWrap: {
      ...merge(align.center),
    },

    // ─── Radius showcase ──────────────────────────────────────────────────────
    radiusRow: {
      ...merge(layout.row, gap(t, 3)),
      flexWrap: 'wrap',
    },
    radiusBox: {
      width: 52,
      height: 52,
      backgroundColor: palette.primary[50],
      ...merge(align.center, center),
    },
    radiusLabel: {
      fontSize: scale.xs,
      color: colors.textTertiary,
      marginTop: spacing[1],
      textAlign: 'center',
    },
    radiusWrap: {
      ...merge(align.center),
    },

    // ─── Button variants ──────────────────────────────────────────────────────
    // LEARN: conditional styles — function inside createStyles, called with args
    //        replaces inline ternaries in component JSX
    btnRow: {
      ...merge(layout.row, gap(t, 3)),
      flexWrap: 'wrap',
    },
    btn: (variant: 'primary' | 'secondary' | 'ghost' | 'danger') => ({
      ...merge(center, rounded(t, 'lg'), px(t, 4), py(t, 2.5)),
      backgroundColor: {
        primary: colors.textPrimary,
        secondary: colors.backgroundSecondary,
        ghost: 'transparent',
        danger: colors.errorSubtle,
      }[variant],
      borderWidth: variant === 'ghost' ? 1 : 0,
      borderColor: variant === 'ghost' ? colors.border : 'transparent',
    }),
    btnText: (variant: 'primary' | 'secondary' | 'ghost' | 'danger') => ({
      fontSize: scale.sm,
      fontWeight: weights.semibold,
      fontFamily: families.body.semibold,
      color: {
        primary: colors.textInverse,
        secondary: colors.textPrimary,
        ghost: colors.textSecondary,
        danger: colors.error,
      }[variant],
    }),

    // ─── Badge variants ───────────────────────────────────────────────────────
    badgeRow: {
      ...merge(layout.row, gap(t, 2)),
      flexWrap: 'wrap',
    },
    badge: (variant: 'success' | 'warning' | 'error' | 'info' | 'muted') => ({
      ...merge(rounded(t, 'full'), px(t, 2), py(t, 0.5)),
      backgroundColor: {
        success: colors.successSubtle,
        warning: colors.warningSubtle,
        error: colors.errorSubtle,
        info: colors.infoSubtle,
        muted: colors.backgroundTertiary,
      }[variant],
    }),
    badgeText: (variant: 'success' | 'warning' | 'error' | 'info' | 'muted') => ({
      fontSize: scale.xs,
      fontWeight: weights.semibold,
      fontFamily: families.body.semibold,
      color: {
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        muted: colors.textTertiary,
      }[variant],
    }),

    // ─── Card variants ────────────────────────────────────────────────────────
    card: {
      ...merge(border(t, 'border'), rounded(t, 'xl'), px(t, 4), py(t, 4)),
      backgroundColor: colors.surface,
      marginBottom: spacing[3],
    },
    cardElevated: {
      ...merge(rounded(t, 'xl'), px(t, 4), py(t, 4)),
      backgroundColor: colors.surface,
      marginBottom: spacing[3],
      ...shadows.md,
    },
    cardTitle: {
      fontSize: scale.md,
      fontWeight: weights.semibold,
      color: colors.textPrimary,
      fontFamily: families.body.semibold,
      marginBottom: spacing[1],
    },
    cardBody: {
      fontSize: scale.sm,
      color: colors.textSecondary,
      fontFamily: families.body.regular,
      lineHeight: scale.sm * lineHeights.relaxed,
    },

    // ─── Input ────────────────────────────────────────────────────────────────
    inputWrap: {
      marginBottom: spacing[4],
    },
    inputLabel: {
      fontSize: scale.xs,
      fontWeight: weights.medium,
      color: colors.textSecondary,
      fontFamily: families.body.medium,
      marginBottom: spacing[1.5],
    },
    input: (focused: boolean) => ({
      ...merge(border(t, focused ? 'borderFocus' : 'border', focused ? 2 : 1), rounded(t, 'lg'), px(t, 3), py(t, 2.5)),
      backgroundColor: colors.surface,
      fontSize: scale.md,
      color: colors.textPrimary,
      fontFamily: families.body.regular,
    }),

    // ─── Responsive showcase ──────────────────────────────────────────────────
    // LEARN: useLayout() gives you breakpoint — used in component, not here
    responsiveBox: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => ({
      ...merge(center, rounded(t, 'lg'), py(t, 3)),
      backgroundColor: {
        xs: colors.backgroundTertiary,
        sm: colors.infoSubtle,
        md: colors.successSubtle,
        lg: colors.warningSubtle,
        xl: colors.errorSubtle,
      }[breakpoint],
      marginBottom: spacing[3],
    }),
    responsiveText: {
      fontSize: scale.sm,
      fontWeight: weights.semibold,
      color: colors.textPrimary,
      fontFamily: families.mono.regular,
    },

    // ─── Accessibility showcase ───────────────────────────────────────────────
    a11yCard: {
      ...merge(border(t, 'border'), rounded(t, 'xl'), px(t, 4), py(t, 4)),
      backgroundColor: colors.surface,
      marginBottom: spacing[3],
    },
    a11yRow: {
      ...merge(layout.rowBetween, align.center),
    },
    a11yLabel: {
      fontSize: scale.sm,
      color: colors.textPrimary,
      fontFamily: families.display.semibold,
      fontWeight: weights.medium,
    },
    a11yValue: {
      fontSize: scale.sm,
      color: colors.interactive,
      fontFamily: families.mono.medium,
    },
  }
});

// ─── tiny helper needed for divider mx ───────────────────────────────────────
function mx(t: any, k: any) {
  return { marginHorizontal: t.spacing[k] };
}

