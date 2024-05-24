import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type PositionProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface PositionProps {
  position?: PositionProp<RNStyle['position']>;
  zIndex?: PositionProp<RNStyle['zIndex'], 'zIndices'>;
  top?: PositionProp<RNStyle['top']>;
  right?: PositionProp<RNStyle['top']>;
  bottom?: PositionProp<RNStyle['top']>;
  left?: PositionProp<RNStyle['top']>;
}
