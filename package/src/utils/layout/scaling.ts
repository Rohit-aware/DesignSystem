import { Dimensions, PixelRatio } from "react-native";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type DeviceForm = "phone" | "tablet" | "desktop";

export type LayoutInfo = {
  breakpoint: Breakpoint;
  deviceForm: DeviceForm;
  isFolded: boolean;
  isLandscape: boolean;
  width: number;
  height: number;
  scaleW: (size: number) => number;
  scaleH: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
};

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>> & { xs: T };

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 360,
  md: 480,
  lg: 768,
  xl: 1024,
};

function classifyBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

function classifyDeviceForm(width: number, height: number): DeviceForm {
  const larger = Math.max(width, height);
  if (larger >= 1024) return "desktop";
  if (larger >= 768) return "tablet";
  return "phone";
}

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export function buildLayoutInfo(): LayoutInfo {
  const { width, height } = Dimensions.get("window");
  const breakpoint = classifyBreakpoint(width);
  const deviceForm = classifyDeviceForm(width, height);
  const isLandscape = width > height;
  const isFolded = deviceForm === "tablet" && Math.min(width, height) < 360;

  const scaleW = (size: number): number =>
    PixelRatio.roundToNearestPixel((width / BASE_WIDTH) * size);

  const scaleH = (size: number): number =>
    PixelRatio.roundToNearestPixel((height / BASE_HEIGHT) * size);

  const moderateScale = (size: number, factor = 0.5): number =>
    PixelRatio.roundToNearestPixel(size + (scaleW(size) - size) * factor);

  return { breakpoint, deviceForm, isFolded, isLandscape, width, height, scaleW, scaleH, moderateScale };
}

export function resolveResponsive<T>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint
): T {
  const order: Breakpoint[] = ["xl", "lg", "md", "sm", "xs"];
  const idx = order.indexOf(breakpoint);
  for (let i = idx; i < order.length; i++) {
    const bp = order[i];
    if (bp !== undefined && bp in value) {
      return value[bp] as T;
    }
  }
  return value.xs;
}
