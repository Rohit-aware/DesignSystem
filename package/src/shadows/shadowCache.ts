import type { ShadowScale } from "../types";
import { createShadowScale } from "./createShadowScale";

const shadowScaleCache = new Map<string, ShadowScale>();

export function getShadowScale(color: string): ShadowScale {
  const cached = shadowScaleCache.get(color);
  if (cached) return cached;
  const scale = createShadowScale(color);
  shadowScaleCache.set(color, scale);
  return scale;
}
