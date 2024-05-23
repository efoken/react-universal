import type { ViewStyle as RNViewStyle } from 'react-native';
import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';

type PositionProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface PositionProps {
  position?: PositionProp<RNViewStyle['position']>;
  zIndex?: PositionProp<RNViewStyle['zIndex'], 'zIndices'>;
  top?: PositionProp<RNViewStyle['top']>;
  right?: PositionProp<RNViewStyle['top']>;
  bottom?: PositionProp<RNViewStyle['top']>;
  left?: PositionProp<RNViewStyle['top']>;
  start?: PositionProp<RNViewStyle['start']>;
  end?: PositionProp<RNViewStyle['end']>;
}
