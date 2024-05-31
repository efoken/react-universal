import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type PositionProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface PositionProps {
  bottom?: PositionProp<RNStyle['top']>;
  inset?: PositionProp<RNStyle['inset']>;
  insetBlock?: PositionProp<RNStyle['insetBlock']>;
  insetBlockEnd?: PositionProp<RNStyle['insetBlockEnd']>;
  insetBlockStart?: PositionProp<RNStyle['insetBlockStart']>;
  insetEnd?: PositionProp<RNStyle['insetInlineEnd']>;
  insetInline?: PositionProp<RNStyle['insetInline']>;
  insetInlineEnd?: PositionProp<RNStyle['insetInlineEnd']>;
  insetInlineStart?: PositionProp<RNStyle['insetInlineStart']>;
  insetStart?: PositionProp<RNStyle['insetInlineStart']>;
  left?: PositionProp<RNStyle['top']>;
  position?: PositionProp<RNStyle['position']>;
  right?: PositionProp<RNStyle['top']>;
  top?: PositionProp<RNStyle['top']>;
  zIndex?: PositionProp<RNStyle['zIndex'], 'zIndices'>;
}
