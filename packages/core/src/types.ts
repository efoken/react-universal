import type {
  ImageStyle as RNImageStyle,
  TextStyle as RNTextStyle,
  ViewStyle as RNViewStyle,
} from 'react-native';
import type { Breakpoints } from './breakpoints';
import type { Theme } from './theme/defaultTheme';

export type AnyProps<T = any> = Record<string, T>;

type BreakpointValue<T> = {
  [K in keyof T]?: T[K] | { [B in keyof Breakpoints]?: T[K] };
};

// These props are treated differently to nest breakpoints and Media Queries
interface RNNestedStyle {
  shadowOffset?: BreakpointValue<{ height: number; width: number }>;
  textShadowOffset?: BreakpointValue<{ height: number; width: number }>;
}

type RNStyle = Omit<
  RNImageStyle & RNTextStyle & RNViewStyle,
  keyof RNNestedStyle | 'position' | 'transform'
> &
  RNNestedStyle & {
    position: RNViewStyle['position'] | 'fixed';
    transform?: string;
  };

type RNStyleKeys = Exclude<keyof RNStyle, keyof RNNestedStyle>;

export type StyleValues = {
  [K in RNStyleKeys]?: RNStyle[K] | { [B in keyof Breakpoints]?: RNStyle[K] };
} & {
  [K in keyof RNNestedStyle]?: RNNestedStyle[K];
};

export type StyleObject = Record<string, StyleValues>;

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
    props: { as: T } & OverridableProps<P, T>,
  ): React.ReactNode;
  (props: OverridableProps<P, C>): React.ReactNode;
  displayName?: string;
  propTypes?: any;
}
