import type { UnistylesValues } from 'react-native-unistyles';
import type { Theme } from './theme/defaultTheme';

export type AnyProps<T = any> = Record<string, T>;

export type StyleObject = Record<string, UnistylesValues>;

export type StyleInterpolation<P extends AnyProps> =
  | null
  | undefined
  | boolean
  | UnistylesValues
  | StyleInterpolation<P>[]
  | ((props: P) => StyleInterpolation<P>);

export type StyleFunction<P extends AnyProps> = (
  props: P,
) => UnistylesValues | undefined | (UnistylesValues | undefined)[];

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
    props: { as: T } & OverridableProps<P, T>,
  ): React.ReactNode;
  (props: OverridableProps<P, C>): React.ReactNode;
  displayName?: string;
  propTypes?: any;
}
