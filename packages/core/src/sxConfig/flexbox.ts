import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type FlexboxProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface FlexboxProps {
  flexBasis?: FlexboxProp<RNStyle['flexBasis']>;
  flexDir?: FlexboxProp<RNStyle['flexDirection']>;
  flexDirection?: FlexboxProp<RNStyle['flexDirection']>;
  flexWrap?: FlexboxProp<RNStyle['flexWrap']>;
  /** @platform web */
  justifyItems?: FlexboxProp<React.CSSProperties['justifyItems']>;
  justifyContent?: FlexboxProp<RNStyle['justifyContent']>;
  alignItems?: FlexboxProp<RNStyle['alignItems']>;
  alignContent?: FlexboxProp<RNStyle['alignContent']>;
  /** @platform web */
  order?: FlexboxProp<React.CSSProperties['order']>;
  flex?: FlexboxProp<RNStyle['flex']>;
  flexGrow?: FlexboxProp<RNStyle['flexGrow']>;
  flexShrink?: FlexboxProp<RNStyle['flexShrink']>;
  alignSelf?: FlexboxProp<RNStyle['alignSelf']>;
  /** @platform web */
  justifySelf?: FlexboxProp<React.CSSProperties['justifySelf']>;
}
