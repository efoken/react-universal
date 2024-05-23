import type { ViewStyle as RNViewStyle } from 'react-native';
import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';

type FlexboxProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface FlexboxProps {
  flexBasis?: FlexboxProp<RNViewStyle['flexBasis']>;
  flexDir?: FlexboxProp<RNViewStyle['flexDirection']>;
  flexDirection?: FlexboxProp<RNViewStyle['flexDirection']>;
  flexWrap?: FlexboxProp<RNViewStyle['flexWrap']>;
  /** @platform web */
  justifyItems?: FlexboxProp<React.CSSProperties['justifyItems']>;
  justifyContent?: FlexboxProp<RNViewStyle['justifyContent']>;
  alignItems?: FlexboxProp<RNViewStyle['alignItems']>;
  alignContent?: FlexboxProp<RNViewStyle['alignContent']>;
  /** @platform web */
  order?: FlexboxProp<React.CSSProperties['order']>;
  flex?: FlexboxProp<RNViewStyle['flex']>;
  flexGrow?: FlexboxProp<RNViewStyle['flexGrow']>;
  flexShrink?: FlexboxProp<RNViewStyle['flexShrink']>;
  alignSelf?: FlexboxProp<RNViewStyle['alignSelf']>;
  /** @platform web */
  justifySelf?: FlexboxProp<React.CSSProperties['justifySelf']>;
}
