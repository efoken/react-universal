import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type BackgroundProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface BackgroundPropsWeb {
  /** @platform web */
  backgroundClip?: BackgroundProp<RNStyle['backgroundClip']>;
  /** @platform web */
  backgroundImage?: BackgroundProp<RNStyle['backgroundImage']>;
  /** @platform web */
  bgClip?: BackgroundProp<RNStyle['backgroundClip']>;
  /** @platform web */
  bgImage?: BackgroundProp<RNStyle['backgroundImage']>;
}

export interface BackgroundProps extends BackgroundPropsWeb {
  backgroundColor?: BackgroundProp<RNStyle['backgroundColor'], 'colors'>;
  bgColor?: BackgroundProp<RNStyle['backgroundColor'], 'colors'>;
}
