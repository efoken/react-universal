import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { StyleValues } from '../types';

type PositionProp<
  T,
  K extends keyof Theme | undefined = undefined,
> = BreakpointValue<K extends string ? T | ThemeValue<Theme[K]> : T>;

export interface PositionProps {
  position?: PositionProp<StyleValues['position']>;
  zIndex?: PositionProp<StyleValues['zIndex'], 'zIndices'>;
  top?: PositionProp<StyleValues['top']>;
  right?: PositionProp<StyleValues['top']>;
  bottom?: PositionProp<StyleValues['top']>;
  left?: PositionProp<StyleValues['top']>;
  start?: PositionProp<StyleValues['start']>;
  end?: PositionProp<StyleValues['end']>;
}
