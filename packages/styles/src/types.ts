import { UnistylesValues } from 'react-native-unistyles';
import { Theme } from './defaultTheme';

export type AnyProps<T = any> = Record<string, T>;

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

type OverrideProps<P extends AnyProps, T extends React.ElementType> = P &
  Omit<React.ComponentPropsWithRef<T>, keyof P>;

export interface OverridableComponent<
  P extends AnyProps,
  DefaultComponent extends React.ElementType,
> {
  <T extends React.ElementType>(
    props: { as: T } & OverrideProps<P, T>,
  ): React.ReactNode;
  (props: OverrideProps<P, DefaultComponent>): React.ReactNode;
  displayName?: string;
  propTypes?: any;
}
