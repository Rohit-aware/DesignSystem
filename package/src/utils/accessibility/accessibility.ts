import { AccessibilityInfo, I18nManager, ImageStyle, PixelRatio, Platform, TextStyle, ViewStyle } from "react-native";

export type A11yInfo = {
  isRTL: boolean;
  reduceMotion: boolean;
  fontScale: number;
  dir: () => "ltr" | "rtl";
  rtlStyle: <T extends Record<string, unknown>>(style: T) => T;
};

export type AccessibilitySnapshot = {
  isRTL: boolean;
  reduceMotion: boolean;
  fontScale: number;
};

export function buildAccessibilityInfo(snapshot: AccessibilitySnapshot): A11yInfo {
  const { isRTL, reduceMotion, fontScale } = snapshot;

  const dir = (): "ltr" | "rtl" => (isRTL ? "rtl" : "ltr");

  function rtlStyle<T extends Record<string, unknown>>(style: T): T {
    if (!isRTL) return style;
    const s = { ...style } as Record<string, unknown>;
    if ("marginLeft" in s && "marginRight" in s) {
      const tmp = s["marginLeft"];
      s["marginLeft"] = s["marginRight"];
      s["marginRight"] = tmp;
    }
    if ("paddingLeft" in s && "paddingRight" in s) {
      const tmp = s["paddingLeft"];
      s["paddingLeft"] = s["paddingRight"];
      s["paddingRight"] = tmp;
    }
    if ("left" in s && "right" in s) {
      const tmp = s["left"];
      s["left"] = s["right"];
      s["right"] = tmp;
    }
    return s as T;
  }

  return { isRTL, reduceMotion, fontScale, dir, rtlStyle };
}

export async function readAccessibilitySnapshot(): Promise<AccessibilitySnapshot> {
  const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
  return {
    isRTL: I18nManager.isRTL,
    reduceMotion,
    fontScale: PixelRatio.getFontScale(),
  };
}


export function platform<T extends ViewStyle | TextStyle | ImageStyle>(opts: {
  ios?: Partial<T>;
  android?: Partial<T>;
  default?: Partial<T>;
}): Partial<T> {
  return (
    (Platform.OS === 'ios' ? opts.ios : undefined) ??
    (Platform.OS === 'android' ? opts.android : undefined) ??
    opts.default ??
    {}
  ) as Partial<T>;
}