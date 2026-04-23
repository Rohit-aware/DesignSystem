import type { ShadowScale } from "../types";
import { shadowLevels } from "../tokens/shadows";
import { createShadow } from "./createShadow";

let cachedShadowScale: ShadowScale | null = null;

export function createShadowScale(color = "#000"): ShadowScale {
  if (color === "#000" && cachedShadowScale) return cachedShadowScale;
  const scale = Object.freeze({
    none: createShadow(shadowLevels.none, color),
    xs: createShadow(shadowLevels.xs, color),
    sm: createShadow(shadowLevels.sm, color),
    md: createShadow(shadowLevels.md, color),
    lg: createShadow(shadowLevels.lg, color),
    xl: createShadow(shadowLevels.xl, color),
  }) as ShadowScale;
  if (color === "#000") cachedShadowScale = scale;
  return scale;
}
