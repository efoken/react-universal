import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type TypographyProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface TypographyProps {
  fontFamily?: TypographyProp<RNStyle['fontFamily']>;
  fontSize?: TypographyProp<RNStyle['fontSize']>;
  fontStyle?: TypographyProp<RNStyle['fontStyle']>;
  fontWeight?: TypographyProp<RNStyle['fontWeight']>;
  letterSpacing?: TypographyProp<RNStyle['letterSpacing']>;
  textTransform?: TypographyProp<RNStyle['textTransform']>;
  lineHeight?: TypographyProp<RNStyle['lineHeight']>;
  textAlign?: TypographyProp<RNStyle['textAlign']>;
  /** @platform web */
  textWrap?: TypographyProp<React.CSSProperties['textWrap']>;
}
