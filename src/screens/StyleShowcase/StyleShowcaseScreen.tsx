/**
 * StyleShowcaseScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT A JUNIOR LEARNS HERE (master summary):
 *
 *   1. showcaseStyles.useStyles()
 *      → all styles memoized, no object created on re-render
 *
 *   2. useTheme()
 *      → { theme, mode, toggleTheme } — theme switches without re-render cascade
 *
 *   3. useLayout()
 *      → reactive to rotation / foldable / split-view, bail-out on no-op
 *
 *   4. styles.scrollContent(isTablet)
 *      → conditional style defined inside createStyles — no inline style objects
 *
 *   5. Animated.spring + useReduceMotion()
 *      → buttery press animation, stops when OS reduce motion is on
 *
 *   6. Every section below is a self-contained mini-lesson
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React, { useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Animated, StatusBar } from 'react-native';
import { useTheme, useLayout, useReduceMotion } from '@ds';
import { showcaseStyles } from './StyleShowcase.styles';
import { ColorPaletteSection } from './components/ColorPaletteSection';
import { TypographySection } from './components/TypographySection';
import { SpacingSection, ShadowSection, RadiusSection } from './components/TokenSection';
import { ComponentSection } from './components/ComponentSection';
import { UtilsSection } from './components/UtilsSection';
import { SafeAreaView } from 'react-native-safe-area-context';

export function StyleShowcaseScreen() {
  const styles = showcaseStyles.useStyles();
  const { theme, mode, toggleTheme } = useTheme();
  const layout = useLayout();
  const noMotion = useReduceMotion();
  const isTablet = layout.breakpoint !== 'xs';

  // Header entrance animation
  const headerY = useRef(new Animated.Value(noMotion ? 0 : -16)).current;
  const headerOp = useRef(new Animated.Value(noMotion ? 1 : 0)).current;

  React.useEffect(() => {
    if (noMotion) return;
    Animated.parallel([
      Animated.timing(headerY, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(headerOp, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }], opacity: headerOp }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Style System</Text>
            <Text style={styles.headerSub}>
              {mode === 'dark' ? 'Dark mode' : 'Light mode'} · {layout.breakpoint} · {layout.deviceForm}
            </Text>
          </View>
          {/* LEARN: toggleTheme() switches mode, ThemeProvider rebuilds, WeakMap serves cached styles */}
          <Pressable style={styles.themeToggle} onPress={toggleTheme} accessibilityRole="button">
            <Text style={styles.themeToggleText}>{mode === 'dark' ? '☀ Light' : '☾ Dark'}</Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* ── Scrollable content ─────────────────────────────────────────────── */}
      {/* LEARN: styles.scrollContent(isTablet) — conditional style, no inline object */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent(isTablet)}
        showsVerticalScrollIndicator={false}
      >
        <ColorPaletteSection />
        <TypographySection />
        <SpacingSection />
        <ShadowSection />
        <RadiusSection />
        <ComponentSection />
        <UtilsSection />
      </ScrollView>
    </SafeAreaView>
  );
}
