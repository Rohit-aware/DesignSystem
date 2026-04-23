import type { ColorScaleMap, ProjectTheme } from "../types";

export const themeCache = new WeakMap<object, ProjectTheme<ColorScaleMap<string>>>();
