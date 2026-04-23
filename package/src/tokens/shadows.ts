import type { ShadowToken } from "../types";

export const shadowLevels: Record<ShadowToken, number> = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;
