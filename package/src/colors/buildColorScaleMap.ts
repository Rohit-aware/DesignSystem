import type { ColorScaleMap } from "./types";

export function buildColorScaleMap<TKeys extends string>(
  colors: Record<TKeys, string>
): ColorScaleMap<TKeys> {
  return Object.freeze({ ...colors }) as ColorScaleMap<TKeys>;
}
