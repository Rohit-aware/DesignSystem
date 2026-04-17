/**
 * @module Accessibility & Layout Utilities
 *
 * @group Core SDK › Accessibility
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ACCESSIBILITY + RTL + MOTION SYSTEM
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This module provides platform-level utilities for:
 *
 * 1. Right-to-left (RTL) layout handling
 * 2. Accessibility preferences (reduce motion, bold text)
 * 3. Font scaling safety helpers
 * 4. Animation timing tokens
 *
 * All APIs are:
 *   ✔ Pure (no side effects unless explicitly stated)
 *   ✔ React Native compatible
 *   ✔ Safe for SSR-like reuse (where applicable)
 */

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

import { I18nManager, AccessibilityInfo } from 'react-native';
import { useState, useEffect } from 'react';
import type { ViewStyle } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// RTL SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Core SDK › Accessibility › RTL
 *
 * Current RTL direction state of the application.
 *
 * Source:
 *   React Native I18nManager
 */
export const isRTL: boolean = I18nManager.isRTL;

/**
 * @group Core SDK › Accessibility › RTL
 *
 * Flips layout-sensitive style properties for RTL support.
 *
 * Handles:
 *   - marginLeft ↔ marginRight
 *   - paddingLeft ↔ paddingRight
 *   - borderLeftWidth ↔ borderRightWidth
 *   - left ↔ right
 *
 * @example
 * const style = rtlStyle({ marginLeft: 10 });
 */
export function rtlStyle<T extends ViewStyle>(style: T): T {
  if (!isRTL) return style;

  const s = { ...style } as Record<string, unknown>;

  const pairs: [string, string][] = [
    ['marginLeft', 'marginRight'],
    ['paddingLeft', 'paddingRight'],
    ['borderLeftWidth', 'borderRightWidth'],
    ['left', 'right'],
  ];

  for (const [a, b] of pairs) {
    if (a in s || b in s) {
      [s[a], s[b]] = [s[b], s[a]];
    }
  }

  return s as T;
}

/**
 * @group Core SDK › Accessibility › RTL
 *
 * Returns directional value based on layout direction.
 *
 * @example
 * const padding = dir(12, 16); // LTR → 12, RTL → 16
 */
export function dir<T>(ltr: T, rtl: T): T {
  return isRTL ? rtl : ltr;
}

// ─────────────────────────────────────────────────────────────────────────────
// FONT SCALING SAFETY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Core SDK › Accessibility › Typography
 *
 * Clamps dynamically scaled font sizes to safe UI bounds.
 *
 * Prevents extreme scaling caused by:
 *   - system accessibility font increase
 *   - user OS-level text scaling settings
 *
 * Formula:
 *   scaled = base * fontScale
 *   clamped between min/max thresholds
 */
export function clampedFont(
  base: number,
  fontScale: number,
  min?: number,
  max?: number,
): number {
  const scaled = base * fontScale;

  return Math.min(
    Math.max(scaled, min ?? base * 0.75),
    max ?? base * 1.5,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Core SDK › Accessibility › Hooks
 *
 * Returns whether "Reduce Motion" is enabled on the device.
 *
 * Useful for:
 *   - disabling animations
 *   - simplifying transitions
 */
export function useReduceMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);

    const sub = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduced,
    );

    return () => sub.remove();
  }, []);

  return reduced;
}

/**
 * @group Core SDK › Accessibility › Hooks
 *
 * Returns whether system bold text accessibility is enabled.
 */
export function useBoldText(): boolean {
  const [bold, setBold] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isBoldTextEnabled().then(setBold);

    const sub = AccessibilityInfo.addEventListener(
      'boldTextChanged',
      setBold,
    );

    return () => sub.remove();
  }, []);

  return bold;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION TOKENS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @group Core SDK › Animation
 *
 * Standard animation duration scale used across the system.
 */
export const durations = Object.freeze({
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
});

/**
 * @group Core SDK › Animation
 *
 * Standard easing curves for motion design consistency.
 *
 * Format:
 *   cubic-bezier represented as [x1, y1, x2, y2]
 */
type Easing = [number, number, number, number];
type EasingKey = 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';
export const easings = Object.freeze({
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
}) as Record<EasingKey, Easing>;

/**
 * @group Core SDK › Animation
 *
 * Utility to respect accessibility motion preferences.
 *
 * If reduce motion is enabled → returns 0ms
 * Otherwise → returns original duration
 */
export const animDuration = (ms: number, reduceMotion: boolean): number =>
  reduceMotion ? 0 : ms;