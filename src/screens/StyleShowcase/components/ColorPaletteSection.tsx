/**
 * ColorPaletteSection.tsx
 * WHAT A JUNIOR LEARNS:
 *   - t.colors gives all semantic tokens
 *   - useTheme() to read isDark, colors, palette directly
 *   - generateScale auto-built the 50–900 stops from one hex
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@ds';
import { showcaseStyles } from '../StyleShowcase.styles';
import { Section } from './Section';

const SEMANTIC_COLORS: Array<{ key: string; label: string }> = [
  { key: 'interactive', label: 'Interactive' },
  { key: 'interactiveHover', label: 'Hover' },
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'surfaceElevated', label: 'Elevated' },
  { key: 'textPrimary', label: 'Text Pri' },
  { key: 'textSecondary', label: 'Text Sec' },
  { key: 'textTertiary', label: 'Text Ter' },
  { key: 'border', label: 'Border' },
  { key: 'borderFocus', label: 'Focus' },
  { key: 'success', label: 'Success' },
  { key: 'successSubtle', label: 'Succ Sub' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
  { key: 'info', label: 'Info' },
];

export function ColorPaletteSection() {
  const styles = showcaseStyles.useStyles();
  const { theme } = useTheme();

  return (
    <>
      <Section title="Semantic Colors">
        <View style={styles.colorRow}>
          {SEMANTIC_COLORS.map(({ key, label }) => (
            <View key={key} style={styles.colorSwatchWrap}>
              <View style={[styles.colorSwatch, { backgroundColor: (theme.colors as any)[key] }]} />
              <Text style={styles.colorSwatchLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title={`Primary Scale (auto-generated from ${theme.palette.primary})`}>
        <View style={styles.colorRow}>
          {([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]).map(stop => (
            <View key={stop} style={styles.colorSwatchWrap}>
              <View style={[styles.colorSwatch, { backgroundColor: theme.palette.primary[stop] }]} />
              <Text style={styles.colorSwatchLabel}>{stop}</Text>
            </View>
          ))}
        </View>
      </Section>
    </>
  );
}
