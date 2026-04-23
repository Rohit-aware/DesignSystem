import type {
  FontFamiliesConfig,
  FontSizeConfig,
  FontConfigInput,
  FontStyles,
  FontStyleValue,
  DynamicFontFn,
  NormalizedVariant,
  FontVariantInput,
  FontWeight,
} from "./types";

const VARIANT_WEIGHT_MAP: Record<string, FontWeight> = {
  thin: "100",
  extralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

function inferWeightFromName(variantName: string): FontWeight | undefined {
  return VARIANT_WEIGHT_MAP[variantName.toLowerCase()];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function normalizeVariant(input: FontVariantInput, variantName: string): NormalizedVariant {
  if (typeof input === "string") {
    return {
      postscriptName: input,
      fontStyle: "normal",
      fontWeight: inferWeightFromName(variantName),
    };
  }
  return {
    postscriptName: input.name,
    fontStyle: input.style ?? "normal",
    fontWeight: input.weight ?? inferWeightFromName(variantName),
  };
}

function buildStaticValue(norm: NormalizedVariant, fontSize: number): FontStyleValue {
  const value: FontStyleValue = {
    fontFamily: norm.postscriptName,
    fontStyle: norm.fontStyle,
    fontSize,
  };
  if (norm.fontWeight !== undefined) {
    value.fontWeight = norm.fontWeight;
  }
  return value;
}

const fontConfigCache = new WeakMap<object, FontStyles<FontFamiliesConfig, FontSizeConfig>>();
const dynamicFnCache = new Map<string, DynamicFontFn>();

export function createFontConfig<
  TFamilies extends FontFamiliesConfig,
  TSizes extends FontSizeConfig
>(
  config: FontConfigInput<TFamilies, TSizes>
): FontStyles<TFamilies, TSizes> {
  const cached = fontConfigCache.get(config);
  if (cached) return cached as FontStyles<TFamilies, TSizes>;

  const result: Record<string, FontStyleValue | DynamicFontFn> = {};

  for (const familyName of Object.keys(config.families)) {
    const family = config.families[familyName];
    if (!family) continue;

    for (const variantName of Object.keys(family.variants)) {
      const variantInput = family.variants[variantName] as FontVariantInput | undefined;
      if (variantInput === undefined) continue;

      const norm = normalizeVariant(variantInput, variantName);
      const capVariant = capitalize(variantName);

      for (const sizeName of Object.keys(config.sizes)) {
        const fontSize = config.sizes[sizeName];
        if (fontSize === undefined) continue;
        const staticKey = `${familyName}${capVariant}${capitalize(sizeName)}`;
        result[staticKey] = buildStaticValue(norm, fontSize);
      }

      const dynamicKey = `_${familyName}${capVariant}`;
      const cacheKey = `${norm.postscriptName}__${norm.fontStyle}__${norm.fontWeight ?? ""}`;

      let dynFn = dynamicFnCache.get(cacheKey);
      if (!dynFn) {
        const captured = norm;
        dynFn = (size: number): FontStyleValue => {
          const v: FontStyleValue = {
            fontFamily: captured.postscriptName,
            fontStyle: captured.fontStyle,
            fontSize: size,
          };
          if (captured.fontWeight !== undefined) {
            v.fontWeight = captured.fontWeight as FontWeight;
          }
          return v;
        };
        dynamicFnCache.set(cacheKey, dynFn);
      }

      result[dynamicKey] = dynFn;
    }
  }

  fontConfigCache.set(config, result as FontStyles<FontFamiliesConfig, FontSizeConfig>);
  return result as FontStyles<TFamilies, TSizes>;
}
