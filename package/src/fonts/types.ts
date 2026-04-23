import type { TextStyle } from "react-native";

export type FontWeight = NonNullable<TextStyle["fontWeight"]>;

export type FontStyle = NonNullable<TextStyle["fontStyle"]>;

export type FontVariantObject = {
  name: string;
  style?: FontStyle;
  weight?: FontWeight;
};

export type FontVariantInput = string | FontVariantObject;

export type FontFamilyConfig = {
  variants: Record<string, FontVariantInput>;
};

export type FontFamiliesConfig = Record<string, FontFamilyConfig>;

export type FontSizeConfig = Record<string, number>;

export type NormalizedVariant = {
  postscriptName: string;
  fontStyle: FontStyle;
  fontWeight: FontWeight | undefined;
};

export type FontConfigInput<
  TFamilies extends FontFamiliesConfig,
  TSizes extends FontSizeConfig
> = {
  families: TFamilies;
  sizes: TSizes;
};

export type StaticFontKey<
  TFamilies extends FontFamiliesConfig,
  TSizes extends FontSizeConfig
> = {
  [FamilyName in keyof TFamilies]: {
    [VariantName in keyof TFamilies[FamilyName]["variants"]]: {
      [SizeName in keyof TSizes]: `${FamilyName & string}${Capitalize<VariantName & string>}${Capitalize<SizeName & string>}`;
    }[keyof TSizes];
  }[keyof TFamilies[FamilyName]["variants"]];
}[keyof TFamilies];

export type DynamicFontKey<TFamilies extends FontFamiliesConfig> = {
  [FamilyName in keyof TFamilies]: {
    [VariantName in keyof TFamilies[FamilyName]["variants"]]: `_${FamilyName & string}${Capitalize<VariantName & string>}`;
  }[keyof TFamilies[FamilyName]["variants"]];
}[keyof TFamilies];

export type FontStyleValue = Pick<
  TextStyle,
  "fontFamily" | "fontWeight" | "fontStyle" | "fontSize"
>;

export type DynamicFontFn = (size: number) => FontStyleValue;

export type StaticFontStyles<
  TFamilies extends FontFamiliesConfig,
  TSizes extends FontSizeConfig
> = {
  [K in StaticFontKey<TFamilies, TSizes>]: FontStyleValue;
};

export type DynamicFontStyles<TFamilies extends FontFamiliesConfig> = {
  [K in DynamicFontKey<TFamilies>]: DynamicFontFn;
};

export type FontStyles<
  TFamilies extends FontFamiliesConfig,
  TSizes extends FontSizeConfig
> = StaticFontStyles<TFamilies, TSizes> & DynamicFontStyles<TFamilies>;
