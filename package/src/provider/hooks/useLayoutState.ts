import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { buildLayoutInfo } from "../../utils/layout/scaling";
import type { LayoutInfo } from "../../utils";

export function useLayoutState(): LayoutInfo {
  const [layout, setLayout] = useState<LayoutInfo>(buildLayoutInfo);

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", () => {
      const next = buildLayoutInfo();
      setLayout((prev) => {
        if (
          prev.breakpoint === next.breakpoint &&
          prev.isLandscape === next.isLandscape &&
          prev.isFolded === next.isFolded
        ) {
          return prev;
        }
        return next;
      });
    });
    return () => sub.remove();
  }, []);

  return layout;
}
