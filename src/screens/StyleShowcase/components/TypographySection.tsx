/**
 * TypographySection.tsx
 * WHAT A JUNIOR LEARNS:
 *   - t.typography.scale.*   → font sizes
 *   - t.typography.weights.* → font weights
 *   - t.typography.families.display/body/mono → your project fonts
 *   - All font values come from theme — zero hardcoded numbers
 */
import React from 'react';
import { View, Text } from 'react-native';
import { showcaseStyles } from '../StyleShowcase.styles';
import { Section } from './Section';

const TYPE_ROWS = [
  { styleKey: 'typo5xl', meta: 'scale.5xl · bold · display', sample: 'Display 5XL' },
  { styleKey: 'typo4xl', meta: 'scale.4xl · bold · display', sample: 'Heading 4XL' },
  { styleKey: 'typo3xl', meta: 'scale.3xl · semibold · display', sample: 'Heading 3XL' },
  { styleKey: 'typo2xl', meta: 'scale.2xl · semibold · body', sample: 'Title 2XL' },
  { styleKey: 'typoXl', meta: 'scale.xl · medium · body', sample: 'Title XL' },
  { styleKey: 'typoLg', meta: 'scale.lg · regular · body', sample: 'Body Large' },
  { styleKey: 'typoMd', meta: 'scale.md · regular · body', sample: 'Body Medium — default paragraph size' },
  { styleKey: 'typoSm', meta: 'scale.sm · regular · body', sample: 'Body Small — captions, helper text' },
  { styleKey: 'typoXs', meta: 'scale.xs · regular · mono', sample: 'XS · LABELS · MONO' },
] as const;

export function TypographySection() {
  const styles = showcaseStyles.useStyles();

  return (
    <Section title="Typography Scale">
      {TYPE_ROWS.map(({ styleKey, meta, sample }) => (
        <View key={styleKey} style={styles.typoRow}>
          <Text style={styles.typoMeta}>{meta}</Text>
          <Text style={styles[styleKey]} numberOfLines={1}>{sample}</Text>
        </View>
      ))}
    </Section>
  );
}
