import { useMemo } from "react";
import type { ColorScaleMap, Theme } from "../../types";
import { buildAccessibilityInfo } from "../../utils/accessibility/accessibility";
import { resolveResponsive } from "../../utils/layout/scaling";
import type { LayoutInfo, AccessibilitySnapshot } from "../../utils";

export function useComposedTheme<TColors extends ColorScaleMap<string>>(
  baseTheme: Omit<Theme<TColors>, "layout" | "accessibility" | "responsive">,
  layout: LayoutInfo,
  a11ySnapshot: AccessibilitySnapshot
): Theme<TColors> {
  const accessibility = useMemo(
    () => buildAccessibilityInfo(a11ySnapshot),
    [a11ySnapshot]
  );

  return useMemo<Theme<TColors>>(() => {
    const responsive = (values: Parameters<Theme<TColors>["responsive"]>[0]): number =>
      resolveResponsive(values, layout.breakpoint);

    return { ...baseTheme, layout, accessibility, responsive };
  }, [baseTheme, layout, accessibility]);
}
