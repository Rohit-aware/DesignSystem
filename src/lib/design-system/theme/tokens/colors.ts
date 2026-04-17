import type { ColorPalette, ColorScale, OpacityStep } from '../../types';

const OPACITY_STEPS = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
  55, 60, 65, 70, 75, 80, 85, 90, 95, 100
] as const;

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const withOpacity = (hex: string): ColorScale => {
  const { r, g, b } = hexToRgb(hex);

  const result = {} as Record<OpacityStep, string>;

  for (const step of OPACITY_STEPS) {
    result[step] = `rgba(${r}, ${g}, ${b}, ${step / 100})`;
  }

  return Object.freeze(result) as ColorScale;
};

export const palette: ColorPalette = Object.freeze({
  primary: withOpacity('#01A48F'),
  secondary: withOpacity('#8B5CF6'),
  neutral: withOpacity('#6B7280'),
  success: withOpacity('#22C55E'),
  warning: withOpacity('#F59E0B'),
  error: withOpacity('#F43F5E'),
  info: withOpacity('#0EA5E9'),
});