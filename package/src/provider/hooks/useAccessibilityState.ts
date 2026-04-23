import { useEffect, useState } from "react";
import { readAccessibilitySnapshot } from "../../utils/accessibility/accessibility";
import type { AccessibilitySnapshot } from "../../utils";

const defaultSnapshot: AccessibilitySnapshot = {
  isRTL: false,
  reduceMotion: false,
  fontScale: 1,
};

export function useAccessibilityState(): AccessibilitySnapshot {
  const [a11ySnapshot, setA11ySnapshot] = useState<AccessibilitySnapshot>(defaultSnapshot);

  useEffect(() => {
    readAccessibilitySnapshot().then(setA11ySnapshot).catch(() => undefined);
  }, []);

  return a11ySnapshot;
}
