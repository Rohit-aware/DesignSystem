/**
 * TokenSection.tsx — Spacing, Shadow, Radius in one file (all token showcases)
 * WHAT A JUNIOR LEARNS:
 *   - t.spacing[key]  → spacing scale (4px grid)
 *   - t.shadows.*     → shadow tokens (spread into style with ...t.shadows.md)
 *   - t.radius.*      → border radius tokens
 */
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@ds';
import { showcaseStyles } from '../StyleShowcase.styles';
import { Section } from './Section';

// ─── Spacing ──────────────────────────────────────────────────────────────────
const SPACING_KEYS = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const;

export function SpacingSection() {
  const styles = showcaseStyles.useStyles();
  const { theme } = useTheme();
  return (
    <Section title="Spacing Scale (4px grid)">
      <View style={styles.spacingRow}>
        {SPACING_KEYS.map(k => (
          <View key={k} style={styles.spacingBlock}>
            <View style={[styles.spacingBar, { width: theme.spacing[k] }]} />
            <Text style={styles.spacingValue}>{k}</Text>
            <Text style={styles.spacingValue}>{theme.spacing[k]}px</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

// ─── Shadows ──────────────────────────────────────────────────────────────────
const SHADOW_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export function ShadowSection() {
  const styles = showcaseStyles.useStyles();
  const { theme } = useTheme();
  return (
    <Section title="Shadow Scale">
      <View style={styles.shadowRow}>
        {SHADOW_KEYS.map(k => (
          <View key={k} style={styles.shadowWrap}>
            <View style={[styles.shadowCard, { ...theme.shadows[k] }]} />
            <Text style={styles.shadowLabel}>{k}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

// ─── Border Radius ────────────────────────────────────────────────────────────
const RADIUS_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

export function RadiusSection() {
  const styles = showcaseStyles.useStyles();
  const { theme } = useTheme();
  return (
    <Section title="Border Radius Scale">
      <View style={styles.radiusRow}>
        {RADIUS_KEYS.map((k) => {
          return (
            <View key={k} style={styles.radiusWrap}>
              <View style={[styles.radiusBox, { borderRadius: theme.radius[k] }]} />
              <Text style={styles.radiusLabel}>{k}</Text>
            </View>
          )
        })}
      </View>
    </Section>
  );
}
