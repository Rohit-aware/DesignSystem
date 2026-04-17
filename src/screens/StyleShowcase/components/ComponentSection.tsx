/**
 * ComponentSection.tsx — Buttons, Badges, Cards, Input
 * WHAT A JUNIOR LEARNS:
 *   - Conditional styles: styles.btn('primary') — function defined in createStyles
 *     replaces inline ternaries completely
 *   - Press animation: Animated.spring with useReduceMotion() for a11y
 *   - No inline styles anywhere — everything comes from showcaseStyles
 */
import React, { useRef, useCallback, useState } from 'react';
import { View, Text, Pressable, Animated, TextInput } from 'react-native';
import { useReduceMotion, animDuration, durations } from '@ds/utils/accessibility';
import { showcaseStyles } from '../StyleShowcase.styles';
import { Section } from './Section';

// ─── Animated Button ──────────────────────────────────────────────────────────
type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

function ShowcaseButton({ variant, label }: { variant: BtnVariant; label: string }) {
  const styles = showcaseStyles.useStyles();
  const noMotion = useReduceMotion();
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.85, useNativeDriver: true, speed: 60, bounciness: 0,
    }).start();
  }, []);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6,
    }).start();
  }, []);

  return (
    <Pressable
      onPressIn={noMotion ? undefined : pressIn}
      onPressOut={noMotion ? undefined : pressOut}
      accessibilityRole="button"
    >
      <Animated.View style={[styles.btn(variant), { transform: [{ scale }] }]}>
        <Text style={styles.btnText(variant)}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Input with focus state ───────────────────────────────────────────────────
function ShowcaseInput() {
  const styles = showcaseStyles.useStyles();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>Email address</Text>
      {/* LEARN: styles.input(focused) — conditional style, no inline ternary */}
      <TextInput
        style={styles.input(focused)}
        placeholder="you@example.com"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ComponentSection() {
  const styles = showcaseStyles.useStyles();

  return (
    <>
      <Section title="Buttons — conditional styles">
        <View style={styles.btnRow}>
          <ShowcaseButton variant="primary" label="Primary" />
          <ShowcaseButton variant="secondary" label="Secondary" />
          <ShowcaseButton variant="ghost" label="Ghost" />
          <ShowcaseButton variant="danger" label="Danger" />
        </View>
      </Section>

      <Section title="Badges — conditional styles">
        <View style={styles.badgeRow}>
          {(['success', 'warning', 'error', 'info', 'muted'] as const).map(v => (
            <View key={v} style={styles.badge(v)}>
              <Text style={styles.badgeText(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Cards">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bordered Card</Text>
          <Text style={styles.cardBody}>
            Uses border(t, 'border') + rounded(t, 'xl'). Token-driven — adapts to light/dark automatically.
          </Text>
        </View>
        <View style={styles.cardElevated}>
          <Text style={styles.cardTitle}>Elevated Card</Text>
          <Text style={styles.cardBody}>
            Uses ...t.shadows.md spread. Shadow tokens include elevation for Android.
          </Text>
        </View>
      </Section>

      <Section title="Input — focus state via conditional style">
        <ShowcaseInput />
      </Section>
    </>
  );
}
