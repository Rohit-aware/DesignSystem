import { useCallback, useEffect, useRef, useState } from "react";
import { Appearance } from "react-native";

function getSystemMode(): "light" | "dark" {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

export type ThemeModeResult = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

// Module-level singleton — survives component re-mounts (rotation, fold/unfold)
let persistedMode: "light" | "dark" | null = null;
let isManualOverride = false;

export function useThemeMode(
  initialMode: "light" | "dark" | undefined,
  followSystem: boolean
): ThemeModeResult {
  const [mode, setMode] = useState<"light" | "dark">(
    () => {
      if (persistedMode !== null) return persistedMode;
      const resolved = initialMode ?? (followSystem ? getSystemMode() : "light");
      persistedMode = resolved;
      return resolved;
    }
  );

  const followSystemRef = useRef(followSystem);
  followSystemRef.current = followSystem;

  useEffect(() => {
    if (!followSystem) return;
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isManualOverride && followSystemRef.current) {
        const next = colorScheme === "dark" ? "dark" : "light";
        persistedMode = next;
        setMode(next);
      }
    });
    return () => sub.remove();
  }, [followSystem]);

  const toggleTheme = useCallback(() => {
    isManualOverride = true;
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      persistedMode = next;
      return next;
    });
  }, []);

  return { mode, toggleTheme };
}
