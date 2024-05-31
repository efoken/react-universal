import type { BreakpointValue } from '../breakpoints';
import type { Theme, ThemeValue } from '../theme/defaultTheme';
import type { RNStyle } from '../types';

type BorderProp<T, K extends keyof Theme | undefined = undefined> = BreakpointValue<
  K extends string ? T | ThemeValue<Theme[K]> : T
>;

export interface BorderPropsWeb {
  /** @platform web */
  outlineColor?: BorderProp<React.CSSProperties['outlineColor'], 'colors'>;
  /** @platform web */
  outlineOffset?: BorderProp<React.CSSProperties['outlineOffset']>;
  /** @platform web */
  outlineWidth?: BorderProp<React.CSSProperties['outlineWidth']>;
}

export interface BorderProps extends BorderPropsWeb {
  borderBottomColor?: BorderProp<RNStyle['borderBottomColor'], 'colors'>;
  borderBottomWidth?: BorderProp<RNStyle['borderBottomWidth']>;
  borderColor?: BorderProp<RNStyle['borderColor'], 'colors'>;
  borderEndColor?: BorderProp<RNStyle['borderEndColor'], 'colors'>;
  borderEndWidth?: BorderProp<RNStyle['borderEndWidth']>;
  borderLeftColor?: BorderProp<RNStyle['borderLeftColor'], 'colors'>;
  borderLeftWidth?: BorderProp<RNStyle['borderLeftWidth']>;
  borderRadius?: BorderProp<RNStyle['borderRadius'], 'radii'>;
  borderRightColor?: BorderProp<RNStyle['borderRightColor'], 'colors'>;
  borderRightWidth?: BorderProp<RNStyle['borderRightWidth']>;
  borderStartColor?: BorderProp<RNStyle['borderStartColor'], 'colors'>;
  borderStartWidth?: BorderProp<RNStyle['borderStartWidth']>;
  borderStyle?: BorderProp<RNStyle['borderStyle']>;
  borderTopColor?: BorderProp<RNStyle['borderTopColor'], 'colors'>;
  borderTopWidth?: BorderProp<RNStyle['borderTopWidth']>;
  borderWidth?: BorderProp<RNStyle['borderWidth']>;
}
