export const baseLightColors = {
  background: "#F8F8F8",
  surface: "#FFFFFF",
  surfaceRaised: "#FFFFFF",
  primary: "#111111",
  accent: "#FF4D00",
  accentSoft: "#FFF0EB",
  text: "#111111",
  textMuted: "#888888",
  textInverse: "#FFFFFF",
  border: "#E5E5E5",
  error: "#E53935",
  success: "#43A047",
  card: "#FFFFFF",
  overlay: "rgba(0,0,0,0.4)",
} as const;

export const baseDarkColors = {
  background: "#0A0A0A",
  surface: "#141414",
  surfaceRaised: "#1E1E1E",
  primary: "#FFFFFF",
  accent: "#FF6B35",
  accentSoft: "#2A1500",
  text: "#F0F0F0",
  textMuted: "#666666",
  textInverse: "#111111",
  border: "#2A2A2A",
  error: "#EF5350",
  success: "#66BB6A",
  card: "#1A1A1A",
  overlay: "rgba(0,0,0,0.7)",
} as const;

export type BaseColors = typeof baseLightColors;
