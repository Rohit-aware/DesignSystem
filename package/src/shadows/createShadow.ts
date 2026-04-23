import { Platform } from "react-native";
import type { ShadowStyle } from "../types";

export function createShadow(level: number, color = "#000"): ShadowStyle {
  if (level === 0) {
    return { elevation: 0 };
  }
  if (Platform.OS === "android") {
    return { elevation: level };
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: level },
    shadowOpacity: Math.min(0.05 + level * 0.02, 0.3),
    shadowRadius: level * 1.5,
    elevation: level,
  };
}
