import type { ColorScale } from '@ds';
import { OpacityStep } from '@ds/types';

// ─── Internal helpers ─────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));
        switch (max) {
            case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / delta + 2) / 6; break;
            case b: h = ((r - g) / delta + 4) / 6; break;
        }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
    const sn = s / 100;
    const ln = l / 100;
    const a = sn * Math.min(ln, 1 - ln);

    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = ln - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };

    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// ─── Internal computation (not exported) ──────────────────────────────────────

const OPACITY_STEPS: readonly OpacityStep[] = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
    55, 60, 65, 70, 75, 80, 85, 90, 95, 100
] as const;

function percentToHex(percent: number): string {
    const intValue = Math.round((percent / 100) * 255);
    return intValue.toString(16).padStart(2, '0').toUpperCase();
}

function computeAlphaScale(hex: string): ColorScale {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error(`Invalid hex color: ${hex}`);
    }
    const clean = hex.replace('#', '').toUpperCase();
    const normalizedHex = `#${clean}`;
    const scale = {} as Record<OpacityStep, string>;

    for (const step of OPACITY_STEPS) {
        scale[step] = `${normalizedHex}${percentToHex(step)}`;
    }

    const result = Object.assign(scale, {
        toString: () => normalizedHex,
        valueOf: () => normalizedHex,
    });

    return Object.freeze(result) as ColorScale;
}
// ─── Cache ────────────────────────────────────────────────────────────────────
// Bounded — never more entries than distinct brand colors (2–3 per project)

const scaleCache = new Map<string, ColorScale>();

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * createHexScale — converts one hex color into a full 50–900 scale.
 * Result is cached — calling with the same hex twice returns the same object.
 *
 * @example
 * const primary = createHexScale('#01A48F');
 * primary[500]  // '#01A48F' — your original color
 * primary[50]   // very light tint
 * primary[900]  // very dark shade
 */

export function createHexScale(hex: string): ColorScale {
    const key = hex.toLowerCase();
    const cached = scaleCache.get(key);
    if (cached) return cached;

    const scale = computeAlphaScale(hex);
    scaleCache.set(key, scale);
    return scale;
}
/**
 * generateScales — convenience wrapper for multiple colors at once.
 *
 * @example
 * const { primary, secondary } = generateScales({
 *   primary:   '#01A48F',
 *   secondary: '#1F6CDF',
 * });
 */
export function generateScales<K extends string>(
    colors: Record<K, string>
): Record<K, ColorScale> {
    const result = {} as Record<K, ColorScale>;
    for (const [key, hex] of Object.entries(colors) as [K, string][]) {
        result[key] = createHexScale(hex);  // each goes through the cache
    }
    return result;
}

