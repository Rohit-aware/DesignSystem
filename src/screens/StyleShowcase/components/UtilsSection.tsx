/**
 * UtilsSection.tsx — Responsive + Accessibility utils showcase
 * WHAT A JUNIOR LEARNS:
 *   - useLayout()        → reactive to rotation, foldable, split-view
 *   - useBreakpoint()    → current breakpoint name
 *   - useResponsive()    → pick value by breakpoint
 *   - useReduceMotion()  → disable animations for accessibility
 *   - useBoldText()      → iOS bold text setting
 *   - useIsDark()        → current theme mode
 *   - clampedFont()      → prevent extreme font scaling
 */
import React from 'react';
import { View, Text } from 'react-native';
import {
  useLayout, useBreakpoint, useResponsive,
  useReduceMotion, useBoldText, useIsDark,
  clampedFont,
} from '@ds';
import { showcaseStyles } from '../StyleShowcase.styles';
import { Section } from './Section';

export function UtilsSection() {
  const styles = showcaseStyles.useStyles();
  const layout = useLayout();
  const breakpoint = useBreakpoint();
  const noMotion = useReduceMotion();
  const boldText = useBoldText();
  const isDark = useIsDark();

  // LEARN: useResponsive — picks value for current breakpoint, falls back to smaller
  const responsiveCols = useResponsive({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 });
  const responsivePad = useResponsive({ xs: 16, md: 24, xl: 32 });

  // LEARN: clampedFont — caps font size so accessibility scaling doesn't break layout
  const clampedSize = clampedFont(16, layout.fontScale, 14, 22);

  const rows = [
    { label: 'Breakpoint', value: breakpoint },
    { label: 'Screen width', value: `${Math.round(layout.width)}px` },
    { label: 'Screen height', value: `${Math.round(layout.height)}px` },
    { label: 'Pixel density', value: `${layout.scale}x` },
    { label: 'Font scale', value: `${layout.fontScale}x` },
    { label: 'Device form', value: layout.deviceForm },
    { label: 'Is landscape', value: String(layout.isLandscape) },
    { label: 'Is folded', value: String(layout.isFolded) },
    { label: 'Reduce motion', value: String(noMotion) },
    { label: 'Bold text (iOS)', value: String(boldText) },
    { label: 'Is dark mode', value: String(isDark) },
    { label: 'Responsive cols', value: String(responsiveCols) },
    { label: 'Responsive pad', value: `${responsivePad}px` },
    { label: 'Clamped font', value: `${clampedSize.toFixed(1)}px` },
  ];

  return (
    <Section title="Responsive + Device Utils">
      {/* LEARN: styles.responsiveBox(breakpoint) — conditional style with breakpoint arg */}
      <View style={styles.responsiveBox(breakpoint)}>
        <Text style={styles.responsiveText}>
          Current breakpoint: {breakpoint.toUpperCase()}
        </Text>
      </View>

      <View style={styles.a11yCard}>
        {rows.map(({ label, value, }) => (
          <View key={label} style={[styles.a11yRow, { marginBottom: 8 }]}>
            <Text style={[styles.a11yLabel, styles.utilLable]}>{label}</Text>
            <Text style={[styles.a11yValue]}>{value}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
