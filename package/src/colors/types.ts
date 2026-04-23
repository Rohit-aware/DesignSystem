export type ColorMap = Record<string, string>;

export type ColorScaleMap<TKeys extends string> = {
  readonly [K in TKeys]: string;
};
