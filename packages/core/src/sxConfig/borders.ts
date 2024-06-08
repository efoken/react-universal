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
  borderBlockColor?: BorderProp<RNStyle['borderBlockColor'], 'colors'>;
  borderBlockEndColor?: BorderProp<RNStyle['borderBlockEndColor'], 'colors'>;
  borderBlockEndStyle?: BorderProp<RNStyle['borderBlockEndStyle']>;
  borderBlockEndWidth?: BorderProp<RNStyle['borderBlockEndWidth'], 'colors'>;
  borderBlockStartColor?: BorderProp<RNStyle['borderBlockStartColor'], 'colors'>;
  borderBlockStartStyle?: BorderProp<RNStyle['borderBlockStartStyle']>;
  borderBlockStartWidth?: BorderProp<RNStyle['borderBlockStartWidth']>;
  borderBlockStyle?: BorderProp<RNStyle['borderBlockStyle'], 'colors'>;
  borderBlockWidth?: BorderProp<RNStyle['borderBlockWidth']>;
  borderBottomColor?: BorderProp<RNStyle['borderBottomColor'], 'colors'>;
  borderBottomWidth?: BorderProp<RNStyle['borderBottomWidth']>;
  borderColor?: BorderProp<RNStyle['borderColor'], 'colors'>;
  borderEndColor?: BorderProp<RNStyle['borderInlineEndColor'], 'colors'>;
  borderEndStyle?: BorderProp<RNStyle['borderInlineEndStyle']>;
  borderEndWidth?: BorderProp<RNStyle['borderInlineEndWidth']>;
  borderInlineColor?: BorderProp<RNStyle['borderInlineColor'], 'colors'>;
  borderInlineEndColor?: BorderProp<RNStyle['borderInlineEndColor'], 'colors'>;
  borderInlineEndStyle?: BorderProp<RNStyle['borderInlineEndStyle']>;
  borderInlineEndWidth?: BorderProp<RNStyle['borderInlineEndWidth']>;
  borderInlineStartColor?: BorderProp<RNStyle['borderInlineStartColor'], 'colors'>;
  borderInlineStartStyle?: BorderProp<RNStyle['borderInlineStartStyle']>;
  borderInlineStartWidth?: BorderProp<RNStyle['borderInlineStartWidth']>;
  borderInlineStyle?: BorderProp<RNStyle['borderInlineStyle']>;
  borderInlineWidth?: BorderProp<RNStyle['borderInlineWidth']>;
  borderLeftColor?: BorderProp<RNStyle['borderLeftColor'], 'colors'>;
  borderLeftWidth?: BorderProp<RNStyle['borderLeftWidth']>;
  borderRadius?: BorderProp<RNStyle['borderRadius'], 'radii'>;
  borderRightColor?: BorderProp<RNStyle['borderRightColor'], 'colors'>;
  borderRightWidth?: BorderProp<RNStyle['borderRightWidth']>;
  borderStartColor?: BorderProp<RNStyle['borderInlineStartColor'], 'colors'>;
  borderStartStyle?: BorderProp<RNStyle['borderInlineStartStyle']>;
  borderStartWidth?: BorderProp<RNStyle['borderInlineStartWidth']>;
  borderStyle?: BorderProp<RNStyle['borderStyle']>;
  borderTopColor?: BorderProp<RNStyle['borderTopColor'], 'colors'>;
  borderTopWidth?: BorderProp<RNStyle['borderTopWidth']>;
  borderWidth?: BorderProp<RNStyle['borderWidth']>;
}
