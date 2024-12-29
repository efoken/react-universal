import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type TypographyProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface TypographyPropsWeb {
  /** @platform web */
  textWrap?: TypographyProp<RNStyle['textWrap']>;
  /** @platform web */
  whiteSpace?: TypographyProp<RNStyle['whiteSpace']>;
}

export interface TypographyProps extends TypographyPropsWeb {
  color?: TypographyProp<RNStyle['color'], 'colors'>;
  fontFamily?: TypographyProp<RNStyle['fontFamily'], 'fonts'>;
  fontSize?: TypographyProp<RNStyle['fontSize']>;
  fontStyle?: TypographyProp<RNStyle['fontStyle']>;
  fontWeight?: TypographyProp<RNStyle['fontWeight']>;
  letterSpacing?: TypographyProp<RNStyle['letterSpacing']>;
  lineHeight?: TypographyProp<RNStyle['lineHeight']>;
  textAlign?: TypographyProp<RNStyle['textAlign']>;
  textTransform?: TypographyProp<RNStyle['textTransform']>;
}
