import { Dimensions, PixelRatio, type ScaledSize } from 'react-native';
import { useState, useEffect } from 'react';
import type { Breakpoint, DeviceForm, LayoutState } from '../types';

/* ────────────────────────────────────────────────────────────────
   📐 LAYOUT SYSTEM (RESPONSIVE ENGINE)
   ────────────────────────────────────────────────────────────────
   Provides:
   - breakpoint detection
   - device classification (phone / tablet / foldable)
   - scaling utilities
   - responsive hooks

   Philosophy:
   → Layout is treated as a reactive “design context”
   → Everything derives from screen dimensions
────────────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────────
   🔢 BREAKPOINT SYSTEM
────────────────────────────────────────────────────────────────── */

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 360,
  md: 768,
  lg: 1024,
  xl: 1280,
};

/**
 * Returns the active breakpoint for a given screen width.
 *
 * Breakpoints:
 * xs → mobile (default)
 * sm → large phones
 * md → small tablets
 * lg → tablets / small laptops
 * xl → desktop / large screens
 */
function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
}

/* ────────────────────────────────────────────────────────────────
   📱 FOLDABLE DEVICE DETECTION (HEURISTIC ENGINE)
────────────────────────────────────────────────────────────────── */

/**
 * Internal snapshot used to detect fold/unfold transitions.
 * Persisted across re-renders for session-level classification.
 */
type DimSnapshot = { width: number; height: number };
let _prevDims: DimSnapshot | null = null;
let _isFoldable: boolean = false;

/**
 * Classifies device form factor using screen geometry heuristics.
 *
 * ⚠️ Important limitation:
 * Foldables cannot be reliably detected from static dimensions alone.
 * This system detects foldable devices by observing transitions:
 *
 * - phone → tablet transition
 * - tablet → phone transition
 *
 * Once detected, device is permanently marked as "foldable" for session.
 *
 * Device classification rules:
 * - phone:   small width (< 600 logical px)
 * - tablet:  medium screens
 * - desktop: large screens (web / emulator / external display)
 * - foldable: detected via transition heuristic
 */
function classifyDims(
  prev: DimSnapshot | null,
  next: DimSnapshot,
): { deviceForm: DeviceForm; isFolded: boolean } {
  const { width, height } = next;
  const shorter = Math.min(width, height);
  const longer = Math.max(width, height);
  const ratio = longer / shorter;

  // ── Fold transition detection ────────────────────────────────
  if (prev !== null) {
    const prevShorter = Math.min(prev.width, prev.height);
    const prevLonger = Math.max(prev.width, prev.height);
    const prevRatio = prevLonger / prevShorter;

    const wasPhone = prevRatio >= 1.8 && prevShorter < 500;
    const nowTablet = ratio <= 1.5 && shorter >= 600;

    const wasTablet = prevRatio <= 1.5 && prevShorter >= 600;
    const nowPhone = ratio >= 1.8 && shorter < 500;

    if ((wasPhone && nowTablet) || (wasTablet && nowPhone)) {
      _isFoldable = true;
    }
  }

  const isFolded =
    _isFoldable && ratio >= 1.8 && shorter < 500;

  // ── Device classification ────────────────────────────────────
  let deviceForm: DeviceForm;

  if (_isFoldable) deviceForm = 'foldable';
  else if (shorter >= 1024) deviceForm = 'desktop';
  else if (shorter >= 600) deviceForm = 'tablet';
  else deviceForm = 'phone';

  return { deviceForm, isFolded };
}

/* ────────────────────────────────────────────────────────────────
   🧱 LAYOUT BUILDER
────────────────────────────────────────────────────────────────── */

/**
 * Builds a complete LayoutState object from screen dimensions.
 *
 * Includes:
 * - breakpoint
 * - orientation
 * - device form factor
 * - fold state
 * - pixel scaling metadata
 */
function build(dims: ScaledSize, prev: DimSnapshot | null): LayoutState {
  const { width, height, scale, fontScale } = dims;
  const { deviceForm, isFolded } = classifyDims(prev, { width, height });

  return {
    width,
    height,
    scale,
    fontScale,
    isLandscape: width > height,
    breakpoint: getBreakpoint(width),
    deviceForm,
    isFolded,
  };
}

/* ────────────────────────────────────────────────────────────────
   📸 STATIC LAYOUT SNAPSHOT
────────────────────────────────────────────────────────────────── */

/**
 * Returns the current layout state (non-reactive snapshot).
 *
 * Use when:
 * - outside React components
 * - navigation configs
 * - static computations
 */
export function getLayoutState(): LayoutState {
  return build(Dimensions.get('window'), _prevDims);
}

/* ────────────────────────────────────────────────────────────────
   📏 SCALING UTILITIES
────────────────────────────────────────────────────────────────── */

/** Scales width proportionally to base design width */
export function scaleW(size: number, base = 375): number {
  return (size / base) * Dimensions.get('window').width;
}

/** Scales height proportionally to base design height */
export function scaleH(size: number, base = 812): number {
  return (size / base) * Dimensions.get('window').height;
}

/** Moderated scale to avoid extreme resizing */
export function moderateScale(size: number, factor = 0.5, base = 375): number {
  return size + (scaleW(size, base) - size) * factor;
}

/** Returns a 1px hairline regardless of pixel density */
export function hairline(): number {
  return 1 / PixelRatio.get();
}

/** Converts density-independent pixels (dp) → physical pixels */
export function dpToPx(dp: number): number {
  return PixelRatio.getPixelSizeForLayoutSize(dp);
}

/* ────────────────────────────────────────────────────────────────
   📱 RESPONSIVE VALUE RESOLUTION
────────────────────────────────────────────────────────────────── */

/**
 * Responsive value map per breakpoint.
 *
 * Example:
 * {
 *   xs: 12,
 *   md: 14,
 *   lg: 16
 * }
 */
export type ResponsiveValues<T> =
  Partial<Record<Breakpoint, T>> & { xs: T };

/**
 * Resolves a responsive value based on screen width.
 *
 * Resolution strategy:
 * - starts from current breakpoint
 * - falls back to smaller breakpoints
 * - always guarantees xs fallback
 */
export function responsive<T>(
  values: ResponsiveValues<T>,
  width?: number,
): T {
  const w = width ?? Dimensions.get('window').width;
  const bp = getBreakpoint(w);

  const order: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];

  for (let i = order.indexOf(bp); i < order.length; i++) {
    const v = values[order[i]];
    if (v !== undefined) return v;
  }

  return values.xs;
}

/* ────────────────────────────────────────────────────────────────
   ⚛️ REACT HOOKS
────────────────────────────────────────────────────────────────── */

/**
 * Reactive layout state hook.
 *
 * Subscribes to screen changes and updates:
 * - breakpoint
 * - orientation
 * - device form
 * - fold state
 *
 * Performance:
 * - avoids re-renders when dimensions are unchanged
 * - updates only on meaningful layout shifts
 */
export function useLayout(): LayoutState {
  const [state, setState] = useState<LayoutState>(() =>
    build(Dimensions.get('window'), null),
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setState(prev => {
        const next = build(window, {
          width: prev.width,
          height: prev.height,
        });

        if (
          prev.width === next.width &&
          prev.height === next.height &&
          prev.fontScale === next.fontScale
        ) {
          return prev;
        }

        _prevDims = { width: prev.width, height: prev.height };
        return next;
      });
    });

    return () => sub.remove();
  }, []);

  return state;
}

/**
 * Returns current breakpoint only.
 */
export function useBreakpoint(): Breakpoint {
  return useLayout().breakpoint;
}

/**
 * Responsive hook for breakpoint-based values.
 */
export function useResponsive<T>(values: ResponsiveValues<T>): T {
  const { width } = useLayout();
  return responsive(values, width);
}