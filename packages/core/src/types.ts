import type {
  ImageStyle as RNImageStyle,
  TextStyle as RNTextStyle,
  TransformsStyle as RNTransformsStyle,
  ViewStyle as RNViewStyle,
} from 'react-native';
import type { Breakpoints } from './breakpoints';
import type { Theme } from './theme/defaultTheme';

export type AnyProps<T = any> = Record<string, T>;

export type ColorMode = 'light' | 'dark';

type BreakpointValue<T> = {
  [K in keyof T]?: T[K] | { [B in keyof Breakpoints]?: T[K] };
};

// These props are treated differently to nest breakpoints and Media Queries
interface RNNestedStyle {
  shadowOffset?: BreakpointValue<{ height: number; width: number }>;
  textShadowOffset?: BreakpointValue<{ height: number; width: number }>;
}

export type RNStyle = Omit<
  RNImageStyle & RNTextStyle & RNViewStyle,
  | keyof RNNestedStyle
  | keyof RNTransformsStyle
  | 'bottom'
  | 'columnGap'
  | 'end'
  | 'flexBasis'
  | 'gap'
  | 'height'
  | 'left'
  | 'margin'
  | 'marginBottom'
  | 'marginEnd'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginStart'
  | 'marginTop'
  | 'marginVertical'
  | 'maxHeight'
  | 'maxWidth'
  | 'minHeight'
  | 'minWidth'
  | 'padding'
  | 'paddingBottom'
  | 'paddingEnd'
  | 'paddingHorizontal'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingStart'
  | 'paddingTop'
  | 'paddingVertical'
  | 'position'
  | 'right'
  | 'rowGap'
  | 'start'
  | 'textAlignVertical'
  | 'top'
  | 'width'
> &
  RNNestedStyle & {
    bottom?: NonNullable<RNViewStyle['bottom']> | (string & {});
    columnGap?: number | string;
    flexBasis?: NonNullable<RNViewStyle['flexBasis']> | (string & {});
    gap?: number | string;
    height?: NonNullable<RNViewStyle['height']> | (string & {});
    left?: NonNullable<RNViewStyle['left']> | (string & {});
    margin?: NonNullable<RNViewStyle['margin']> | (string & {});
    marginBottom?: NonNullable<RNViewStyle['marginBottom']> | (string & {});
    marginLeft?: NonNullable<RNViewStyle['marginLeft']> | (string & {});
    marginRight?: NonNullable<RNViewStyle['marginRight']> | (string & {});
    marginTop?: NonNullable<RNViewStyle['marginTop']> | (string & {});
    maxHeight?: NonNullable<RNViewStyle['maxHeight']> | (string & {});
    maxWidth?: NonNullable<RNViewStyle['maxWidth']> | (string & {});
    minHeight?: NonNullable<RNViewStyle['minHeight']> | (string & {});
    minWidth?: NonNullable<RNViewStyle['minWidth']> | (string & {});
    padding?: NonNullable<RNViewStyle['padding']> | (string & {});
    paddingBottom?: NonNullable<RNViewStyle['paddingBottom']> | (string & {});
    paddingLeft?: NonNullable<RNViewStyle['paddingLeft']> | (string & {});
    paddingRight?: NonNullable<RNViewStyle['paddingRight']> | (string & {});
    paddingTop?: NonNullable<RNViewStyle['paddingTop']> | (string & {});
    position?: NonNullable<RNViewStyle['position']> | 'fixed';
    right?: NonNullable<RNViewStyle['right']> | (string & {});
    rowGap?: number | string;
    top?: NonNullable<RNViewStyle['top']> | (string & {});
    transform?: string;
    transformOrigin?: string;
    width?: NonNullable<RNViewStyle['width']> | (string & {});
  };

type RNStyleKeys = Exclude<keyof RNStyle, keyof RNNestedStyle>;

export type StyleValues = {
  [K in RNStyleKeys]?: RNStyle[K] | { [B in keyof Breakpoints]?: RNStyle[K] };
} & {
  [K in keyof RNNestedStyle]?: RNNestedStyle[K];
};

export type StyleSheet = Record<string, StyleValues>;

export type StyleInterpolation<P extends AnyProps> =
  | null
  | undefined
  | boolean
  | StyleValues
  | StyleInterpolation<P>[]
  | ((props: P) => StyleInterpolation<P>);

export type StyleFunction<P extends AnyProps> = (
  props: P,
) => StyleValues | undefined | (StyleValues | undefined)[];

export type SimpleStyleFunction<K extends string> = StyleFunction<
  { theme: Theme } & Partial<Record<K, any>>
> & { filterProps: string[] };

export type OverridableProps<
  P extends AnyProps,
  T extends React.ElementType,
> = P & Omit<React.ComponentPropsWithRef<T>, keyof P>;

export interface OverridableComponent<
  P extends AnyProps,
  C extends React.ElementType,
> {
  <T extends React.ElementType>(
    // FIXME:
    props: { as?: T } & OverridableProps<P, T>,
  ): React.ReactNode;
  (props: OverridableProps<P, C>): React.ReactNode;
  displayName?: string;
  propTypes?: any;
}
