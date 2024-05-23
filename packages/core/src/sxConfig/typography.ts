import type { TextStyle as RNTextStyle } from 'react-native';
import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';

type TypographyProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface TypographyProps {
  fontFamily?: TypographyProp<RNTextStyle['fontFamily']>;
  fontSize?: TypographyProp<RNTextStyle['fontSize']>;
  fontStyle?: TypographyProp<RNTextStyle['fontStyle']>;
  fontWeight?: TypographyProp<RNTextStyle['fontWeight']>;
  letterSpacing?: TypographyProp<RNTextStyle['letterSpacing']>;
  textTransform?: TypographyProp<RNTextStyle['textTransform']>;
  lineHeight?: TypographyProp<RNTextStyle['lineHeight']>;
  textAlign?: TypographyProp<RNTextStyle['textAlign']>;
  /** @platform web */
  textWrap?: TypographyProp<React.CSSProperties['textWrap']>;
}
