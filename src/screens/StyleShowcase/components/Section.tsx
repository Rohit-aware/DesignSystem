import React from 'react';
import { View, Text } from 'react-native';
import { showcaseStyles } from '../StyleShowcase.styles';

type Props = { title: string; children: React.ReactNode };

export function Section({ title, children }: Props) {
  const styles = showcaseStyles.useStyles();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      {children}
    </View>
  );
}
